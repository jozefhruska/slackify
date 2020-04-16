import { objectType, unionType } from 'nexus';
import { ComponentType } from '@prisma/client';

export const ComponentData = unionType({
  name: 'ComponentData',
  definition(t) {
    t.members('PlainTextComponentData', 'ArticleComponentData', 'LinkComponentData');
    t.resolveType((data) => {
      if ('title' in data) {
        return 'ArticleComponentData';
      }

      if ('url' in data) {
        return 'LinkComponentData';
      }

      return 'PlainTextComponentData';
    });
  },
});

export const PlainTextComponentData = objectType({
  name: 'PlainTextComponentData',
  definition(t) {
    t.model.text();
  },
});

export const ArticleComponentData = objectType({
  name: 'ArticleComponentData',
  definition(t) {
    t.model.title();
    t.model.lead();
    t.model.content();
  },
});

export const LinkComponentData = objectType({
  name: 'LinkComponentData',
  definition(t) {
    t.model.url();
    t.model.text();
  },
});

export const Component = objectType({
  name: 'Component',
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.published();
    t.model.collection();

    t.field('data', {
      type: 'ComponentData',
      nullable: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      resolve: async (parent, _args, { prisma }) => {
        const componentDataRelations = await prisma.component.findOne({
          where: {
            id: parent.id,
          },
          select: {
            plainTextData: true,
            articleData: true,
            linkData: true,
          },
        });

        switch (parent.type) {
          case ComponentType.PLAIN_TEXT: {
            return prisma.plainTextComponentData.findOne({
              where: {
                id: componentDataRelations?.plainTextData?.id,
              },
              select: {
                text: true,
              },
            });
          }

          case ComponentType.ARTICLE: {
            return prisma.articleComponentData.findOne({
              where: {
                id: componentDataRelations?.articleData?.id,
              },
              select: {
                title: true,
                lead: true,
                content: true,
              },
            });
          }

          case ComponentType.LINK: {
            return prisma.linkComponentData.findOne({
              where: {
                id: componentDataRelations?.linkData?.id,
              },
            });
          }
        }
      },
    });

    t.model.updatedAt();
    t.model.createdAt();
  },
});
