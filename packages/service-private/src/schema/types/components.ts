import { objectType, enumType } from 'nexus';

export const ComponentType = enumType({
  name: 'ComponentType',
  members: ['PLAIN_TEXT', 'ARTICLE', 'LINK'],
});

export const PlainTextComponentData = objectType({
  name: 'PlainTextComponentData',
  definition(t) {
    t.model.id();
    t.model.text();
  },
});

export const ArticleComponentData = objectType({
  name: 'ArticleComponentData',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.lead();
    t.model.content();
  },
});

export const LinkComponentData = objectType({
  name: 'LinkComponentData',
  definition(t) {
    t.model.id();
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
    t.model.author();
    t.model.team();
    t.model.collection();

    t.model.plainTextData();
    t.model.articleData();
    t.model.linkData();

    t.model.updatedAt();
    t.model.createdAt();
  },
});
