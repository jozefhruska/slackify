import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ArticleComponentData = {
   __typename?: 'ArticleComponentData';
  id: Scalars['String'];
  title: Scalars['String'];
  lead?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export type ArticleComponentDataCreateOneWithoutComponentInput = {
  create?: Maybe<ArticleComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<ArticleComponentDataWhereUniqueInput>;
};

export type ArticleComponentDataCreateWithoutComponentInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  lead?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export type ArticleComponentDataUpdateOneWithoutComponentInput = {
  create?: Maybe<ArticleComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<ArticleComponentDataWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<ArticleComponentDataUpdateWithoutComponentDataInput>;
  upsert?: Maybe<ArticleComponentDataUpsertWithoutComponentInput>;
};

export type ArticleComponentDataUpdateWithoutComponentDataInput = {
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  lead?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type ArticleComponentDataUpsertWithoutComponentInput = {
  update: ArticleComponentDataUpdateWithoutComponentDataInput;
  create: ArticleComponentDataCreateWithoutComponentInput;
};

export type ArticleComponentDataWhereInput = {
  id?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  lead?: Maybe<NullableStringFilter>;
  content?: Maybe<StringFilter>;
  componentId?: Maybe<StringFilter>;
  AND?: Maybe<Array<ArticleComponentDataWhereInput>>;
  OR?: Maybe<Array<ArticleComponentDataWhereInput>>;
  NOT?: Maybe<Array<ArticleComponentDataWhereInput>>;
  component?: Maybe<ComponentWhereInput>;
};

export type ArticleComponentDataWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type Collection = {
   __typename?: 'Collection';
  id: Scalars['String'];
  name: Scalars['String'];
  type: ComponentType;
  published: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  team: Team;
  components: Array<Component>;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  componentsCount: Scalars['Int'];
};


export type CollectionComponentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ComponentWhereUniqueInput>;
  before?: Maybe<ComponentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type CollectionCreateInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: ComponentType;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  team: TeamCreateOneWithoutCollectionsInput;
  components?: Maybe<ComponentCreateManyWithoutCollectionInput>;
};

export type CollectionCreateManyWithoutTeamInput = {
  create?: Maybe<Array<CollectionCreateWithoutTeamInput>>;
  connect?: Maybe<Array<CollectionWhereUniqueInput>>;
};

export type CollectionCreateOneWithoutComponentsInput = {
  create?: Maybe<CollectionCreateWithoutComponentsInput>;
  connect?: Maybe<CollectionWhereUniqueInput>;
};

export type CollectionCreateWithoutComponentsInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: ComponentType;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  team: TeamCreateOneWithoutCollectionsInput;
};

export type CollectionCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: ComponentType;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  components?: Maybe<ComponentCreateManyWithoutCollectionInput>;
};

export type CollectionFilter = {
  every?: Maybe<CollectionWhereInput>;
  some?: Maybe<CollectionWhereInput>;
  none?: Maybe<CollectionWhereInput>;
};

export type CollectionScalarWhereInput = {
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  type?: Maybe<ComponentType>;
  published?: Maybe<BooleanFilter>;
  description?: Maybe<NullableStringFilter>;
  teamId?: Maybe<StringFilter>;
  components?: Maybe<ComponentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<CollectionScalarWhereInput>>;
  OR?: Maybe<Array<CollectionScalarWhereInput>>;
  NOT?: Maybe<Array<CollectionScalarWhereInput>>;
};

export type CollectionsListingInput = {
  pagination?: Maybe<PaginationInput>;
};

export type CollectionUpdateInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  team?: Maybe<TeamUpdateOneRequiredWithoutCollectionsInput>;
  components?: Maybe<ComponentUpdateManyWithoutCollectionInput>;
};

export type CollectionUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CollectionUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<CollectionCreateWithoutTeamInput>>;
  connect?: Maybe<Array<CollectionWhereUniqueInput>>;
  set?: Maybe<Array<CollectionWhereUniqueInput>>;
  disconnect?: Maybe<Array<CollectionWhereUniqueInput>>;
  delete?: Maybe<Array<CollectionWhereUniqueInput>>;
  update?: Maybe<Array<CollectionUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<CollectionUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CollectionScalarWhereInput>>;
  upsert?: Maybe<Array<CollectionUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type CollectionUpdateManyWithWhereNestedInput = {
  where: CollectionScalarWhereInput;
  data: CollectionUpdateManyDataInput;
};

export type CollectionUpdateOneRequiredWithoutComponentsInput = {
  create?: Maybe<CollectionCreateWithoutComponentsInput>;
  connect?: Maybe<CollectionWhereUniqueInput>;
  update?: Maybe<CollectionUpdateWithoutComponentsDataInput>;
  upsert?: Maybe<CollectionUpsertWithoutComponentsInput>;
};

export type CollectionUpdateWithoutComponentsDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  team?: Maybe<TeamUpdateOneRequiredWithoutCollectionsInput>;
};

export type CollectionUpdateWithoutTeamDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  components?: Maybe<ComponentUpdateManyWithoutCollectionInput>;
};

export type CollectionUpdateWithWhereUniqueWithoutTeamInput = {
  where: CollectionWhereUniqueInput;
  data: CollectionUpdateWithoutTeamDataInput;
};

export type CollectionUpsertWithoutComponentsInput = {
  update: CollectionUpdateWithoutComponentsDataInput;
  create: CollectionCreateWithoutComponentsInput;
};

export type CollectionUpsertWithWhereUniqueWithoutTeamInput = {
  where: CollectionWhereUniqueInput;
  update: CollectionUpdateWithoutTeamDataInput;
  create: CollectionCreateWithoutTeamInput;
};

export type CollectionWhereInput = {
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  type?: Maybe<ComponentType>;
  published?: Maybe<BooleanFilter>;
  description?: Maybe<NullableStringFilter>;
  teamId?: Maybe<StringFilter>;
  components?: Maybe<ComponentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<CollectionWhereInput>>;
  OR?: Maybe<Array<CollectionWhereInput>>;
  NOT?: Maybe<Array<CollectionWhereInput>>;
  team?: Maybe<TeamWhereInput>;
};

export type CollectionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Component = {
   __typename?: 'Component';
  id: Scalars['String'];
  type: ComponentType;
  published: Scalars['Boolean'];
  author: User;
  team: Team;
  collection: Collection;
  plainTextData?: Maybe<PlainTextComponentData>;
  articleData?: Maybe<ArticleComponentData>;
  linkData?: Maybe<LinkComponentData>;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type ComponentCreateInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  author: UserCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
};

export type ComponentCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<ComponentCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
};

export type ComponentCreateManyWithoutCollectionInput = {
  create?: Maybe<Array<ComponentCreateWithoutCollectionInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
};

export type ComponentCreateManyWithoutTeamInput = {
  create?: Maybe<Array<ComponentCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
};

export type ComponentCreateWithoutAuthorInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
};

export type ComponentCreateWithoutCollectionInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author: UserCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
};

export type ComponentCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  author: UserCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
};

export type ComponentFilter = {
  every?: Maybe<ComponentWhereInput>;
  some?: Maybe<ComponentWhereInput>;
  none?: Maybe<ComponentWhereInput>;
};

export type ComponentScalarWhereInput = {
  id?: Maybe<StringFilter>;
  type?: Maybe<ComponentType>;
  published?: Maybe<BooleanFilter>;
  collectionId?: Maybe<StringFilter>;
  authorId?: Maybe<StringFilter>;
  teamId?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<ComponentScalarWhereInput>>;
  OR?: Maybe<Array<ComponentScalarWhereInput>>;
  NOT?: Maybe<Array<ComponentScalarWhereInput>>;
};

export type ComponentsListingInput = {
  collectionId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  pagination?: Maybe<PaginationInput>;
};

export enum ComponentType {
  PlainText = 'PLAIN_TEXT',
  Article = 'ARTICLE',
  Link = 'LINK'
}

export type ComponentUpdateInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
};

export type ComponentUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ComponentUpdateManyWithoutAuthorInput = {
  create?: Maybe<Array<ComponentCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
  set?: Maybe<Array<ComponentWhereUniqueInput>>;
  disconnect?: Maybe<Array<ComponentWhereUniqueInput>>;
  delete?: Maybe<Array<ComponentWhereUniqueInput>>;
  update?: Maybe<Array<ComponentUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<ComponentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ComponentScalarWhereInput>>;
  upsert?: Maybe<Array<ComponentUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type ComponentUpdateManyWithoutCollectionInput = {
  create?: Maybe<Array<ComponentCreateWithoutCollectionInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
  set?: Maybe<Array<ComponentWhereUniqueInput>>;
  disconnect?: Maybe<Array<ComponentWhereUniqueInput>>;
  delete?: Maybe<Array<ComponentWhereUniqueInput>>;
  update?: Maybe<Array<ComponentUpdateWithWhereUniqueWithoutCollectionInput>>;
  updateMany?: Maybe<Array<ComponentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ComponentScalarWhereInput>>;
  upsert?: Maybe<Array<ComponentUpsertWithWhereUniqueWithoutCollectionInput>>;
};

export type ComponentUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<ComponentCreateWithoutTeamInput>>;
  connect?: Maybe<Array<ComponentWhereUniqueInput>>;
  set?: Maybe<Array<ComponentWhereUniqueInput>>;
  disconnect?: Maybe<Array<ComponentWhereUniqueInput>>;
  delete?: Maybe<Array<ComponentWhereUniqueInput>>;
  update?: Maybe<Array<ComponentUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<ComponentUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ComponentScalarWhereInput>>;
  upsert?: Maybe<Array<ComponentUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type ComponentUpdateManyWithWhereNestedInput = {
  where: ComponentScalarWhereInput;
  data: ComponentUpdateManyDataInput;
};

export type ComponentUpdateWithoutAuthorDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
};

export type ComponentUpdateWithoutCollectionDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
};

export type ComponentUpdateWithoutTeamDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
};

export type ComponentUpdateWithWhereUniqueWithoutAuthorInput = {
  where: ComponentWhereUniqueInput;
  data: ComponentUpdateWithoutAuthorDataInput;
};

export type ComponentUpdateWithWhereUniqueWithoutCollectionInput = {
  where: ComponentWhereUniqueInput;
  data: ComponentUpdateWithoutCollectionDataInput;
};

export type ComponentUpdateWithWhereUniqueWithoutTeamInput = {
  where: ComponentWhereUniqueInput;
  data: ComponentUpdateWithoutTeamDataInput;
};

export type ComponentUpsertWithWhereUniqueWithoutAuthorInput = {
  where: ComponentWhereUniqueInput;
  update: ComponentUpdateWithoutAuthorDataInput;
  create: ComponentCreateWithoutAuthorInput;
};

export type ComponentUpsertWithWhereUniqueWithoutCollectionInput = {
  where: ComponentWhereUniqueInput;
  update: ComponentUpdateWithoutCollectionDataInput;
  create: ComponentCreateWithoutCollectionInput;
};

export type ComponentUpsertWithWhereUniqueWithoutTeamInput = {
  where: ComponentWhereUniqueInput;
  update: ComponentUpdateWithoutTeamDataInput;
  create: ComponentCreateWithoutTeamInput;
};

export type ComponentWhereInput = {
  id?: Maybe<StringFilter>;
  type?: Maybe<ComponentType>;
  published?: Maybe<BooleanFilter>;
  collectionId?: Maybe<StringFilter>;
  authorId?: Maybe<StringFilter>;
  teamId?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  AND?: Maybe<Array<ComponentWhereInput>>;
  OR?: Maybe<Array<ComponentWhereInput>>;
  NOT?: Maybe<Array<ComponentWhereInput>>;
  collection?: Maybe<CollectionWhereInput>;
  author?: Maybe<UserWhereInput>;
  team?: Maybe<TeamWhereInput>;
  plainTextData?: Maybe<PlainTextComponentDataWhereInput>;
  articleData?: Maybe<ArticleComponentDataWhereInput>;
  linkData?: Maybe<LinkComponentDataWhereInput>;
};

export type ComponentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type LinkComponentData = {
   __typename?: 'LinkComponentData';
  id: Scalars['String'];
  url: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type LinkComponentDataCreateOneWithoutComponentInput = {
  create?: Maybe<LinkComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<LinkComponentDataWhereUniqueInput>;
};

export type LinkComponentDataCreateWithoutComponentInput = {
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type LinkComponentDataUpdateOneWithoutComponentInput = {
  create?: Maybe<LinkComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<LinkComponentDataWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<LinkComponentDataUpdateWithoutComponentDataInput>;
  upsert?: Maybe<LinkComponentDataUpsertWithoutComponentInput>;
};

export type LinkComponentDataUpdateWithoutComponentDataInput = {
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LinkComponentDataUpsertWithoutComponentInput = {
  update: LinkComponentDataUpdateWithoutComponentDataInput;
  create: LinkComponentDataCreateWithoutComponentInput;
};

export type LinkComponentDataWhereInput = {
  id?: Maybe<StringFilter>;
  text?: Maybe<NullableStringFilter>;
  url?: Maybe<StringFilter>;
  componentId?: Maybe<StringFilter>;
  AND?: Maybe<Array<LinkComponentDataWhereInput>>;
  OR?: Maybe<Array<LinkComponentDataWhereInput>>;
  NOT?: Maybe<Array<LinkComponentDataWhereInput>>;
  component?: Maybe<ComponentWhereInput>;
};

export type LinkComponentDataWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  signIn?: Maybe<SignInOutput>;
  createOneCollection: Collection;
  updateOneCollection?: Maybe<Collection>;
  deleteOneCollection?: Maybe<Collection>;
  createOneComponent: Component;
  updateOneComponent?: Maybe<Component>;
  deleteOneComponent?: Maybe<Component>;
};


export type MutationSignInArgs = {
  code: Scalars['String'];
};


export type MutationCreateOneCollectionArgs = {
  data: CollectionCreateInput;
};


export type MutationUpdateOneCollectionArgs = {
  data: CollectionUpdateInput;
  where: CollectionWhereUniqueInput;
};


export type MutationDeleteOneCollectionArgs = {
  where: CollectionWhereUniqueInput;
};


export type MutationCreateOneComponentArgs = {
  data: ComponentCreateInput;
};


export type MutationUpdateOneComponentArgs = {
  data: ComponentUpdateInput;
  where: ComponentWhereUniqueInput;
};


export type MutationDeleteOneComponentArgs = {
  where: ComponentWhereUniqueInput;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type PaginationInput = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<CollectionWhereUniqueInput>;
  before?: Maybe<CollectionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type PlainTextComponentData = {
   __typename?: 'PlainTextComponentData';
  id: Scalars['String'];
  text: Scalars['String'];
};

export type PlainTextComponentDataCreateOneWithoutComponentInput = {
  create?: Maybe<PlainTextComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<PlainTextComponentDataWhereUniqueInput>;
};

export type PlainTextComponentDataCreateWithoutComponentInput = {
  id?: Maybe<Scalars['String']>;
  text: Scalars['String'];
};

export type PlainTextComponentDataUpdateOneWithoutComponentInput = {
  create?: Maybe<PlainTextComponentDataCreateWithoutComponentInput>;
  connect?: Maybe<PlainTextComponentDataWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<PlainTextComponentDataUpdateWithoutComponentDataInput>;
  upsert?: Maybe<PlainTextComponentDataUpsertWithoutComponentInput>;
};

export type PlainTextComponentDataUpdateWithoutComponentDataInput = {
  id?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type PlainTextComponentDataUpsertWithoutComponentInput = {
  update: PlainTextComponentDataUpdateWithoutComponentDataInput;
  create: PlainTextComponentDataCreateWithoutComponentInput;
};

export type PlainTextComponentDataWhereInput = {
  id?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  componentId?: Maybe<StringFilter>;
  AND?: Maybe<Array<PlainTextComponentDataWhereInput>>;
  OR?: Maybe<Array<PlainTextComponentDataWhereInput>>;
  NOT?: Maybe<Array<PlainTextComponentDataWhereInput>>;
  component?: Maybe<ComponentWhereInput>;
};

export type PlainTextComponentDataWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  getUser?: Maybe<User>;
  collections: Array<Collection>;
  collection?: Maybe<Collection>;
  components: Array<Component>;
  component?: Maybe<Component>;
  users: Array<User>;
};


export type QueryCollectionsArgs = {
  where?: Maybe<QueryCollectionsWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<CollectionWhereUniqueInput>;
  before?: Maybe<CollectionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCollectionArgs = {
  where: CollectionWhereUniqueInput;
};


export type QueryComponentsArgs = {
  where?: Maybe<QueryComponentsWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ComponentWhereUniqueInput>;
  before?: Maybe<ComponentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryComponentArgs = {
  where: ComponentWhereUniqueInput;
};


export type QueryUsersArgs = {
  where?: Maybe<QueryUsersWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryCollectionsWhereInput = {
  id?: Maybe<StringFilter>;
  team?: Maybe<TeamWhereInput>;
};

export type QueryComponentsWhereInput = {
  id?: Maybe<StringFilter>;
  collection?: Maybe<CollectionWhereInput>;
  author?: Maybe<UserWhereInput>;
  team?: Maybe<TeamWhereInput>;
};

export type QueryUsersWhereInput = {
  team?: Maybe<TeamWhereInput>;
};

export type SignInOutput = {
   __typename?: 'SignInOutput';
  authToken: Scalars['String'];
  user: User;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Team = {
   __typename?: 'Team';
  id: Scalars['String'];
  name: Scalars['String'];
  domain: Scalars['String'];
  accessToken: Scalars['String'];
};

export type TeamCreateOneWithoutCollectionsInput = {
  create?: Maybe<TeamCreateWithoutCollectionsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type TeamCreateOneWithoutComponentsInput = {
  create?: Maybe<TeamCreateWithoutComponentsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type TeamCreateOneWithoutUsersInput = {
  create?: Maybe<TeamCreateWithoutUsersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
};

export type TeamCreateWithoutCollectionsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  domain: Scalars['String'];
  accessToken: Scalars['String'];
  users?: Maybe<UserCreateManyWithoutTeamInput>;
  components?: Maybe<ComponentCreateManyWithoutTeamInput>;
};

export type TeamCreateWithoutComponentsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  domain: Scalars['String'];
  accessToken: Scalars['String'];
  collections?: Maybe<CollectionCreateManyWithoutTeamInput>;
  users?: Maybe<UserCreateManyWithoutTeamInput>;
};

export type TeamCreateWithoutUsersInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  domain: Scalars['String'];
  accessToken: Scalars['String'];
  collections?: Maybe<CollectionCreateManyWithoutTeamInput>;
  components?: Maybe<ComponentCreateManyWithoutTeamInput>;
};

export type TeamUpdateOneRequiredWithoutCollectionsInput = {
  create?: Maybe<TeamCreateWithoutCollectionsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  update?: Maybe<TeamUpdateWithoutCollectionsDataInput>;
  upsert?: Maybe<TeamUpsertWithoutCollectionsInput>;
};

export type TeamUpdateOneRequiredWithoutComponentsInput = {
  create?: Maybe<TeamCreateWithoutComponentsInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  update?: Maybe<TeamUpdateWithoutComponentsDataInput>;
  upsert?: Maybe<TeamUpsertWithoutComponentsInput>;
};

export type TeamUpdateOneRequiredWithoutUsersInput = {
  create?: Maybe<TeamCreateWithoutUsersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
  update?: Maybe<TeamUpdateWithoutUsersDataInput>;
  upsert?: Maybe<TeamUpsertWithoutUsersInput>;
};

export type TeamUpdateWithoutCollectionsDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  users?: Maybe<UserUpdateManyWithoutTeamInput>;
  components?: Maybe<ComponentUpdateManyWithoutTeamInput>;
};

export type TeamUpdateWithoutComponentsDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  collections?: Maybe<CollectionUpdateManyWithoutTeamInput>;
  users?: Maybe<UserUpdateManyWithoutTeamInput>;
};

export type TeamUpdateWithoutUsersDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  collections?: Maybe<CollectionUpdateManyWithoutTeamInput>;
  components?: Maybe<ComponentUpdateManyWithoutTeamInput>;
};

export type TeamUpsertWithoutCollectionsInput = {
  update: TeamUpdateWithoutCollectionsDataInput;
  create: TeamCreateWithoutCollectionsInput;
};

export type TeamUpsertWithoutComponentsInput = {
  update: TeamUpdateWithoutComponentsDataInput;
  create: TeamCreateWithoutComponentsInput;
};

export type TeamUpsertWithoutUsersInput = {
  update: TeamUpdateWithoutUsersDataInput;
  create: TeamCreateWithoutUsersInput;
};

export type TeamWhereInput = {
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  domain?: Maybe<StringFilter>;
  accessToken?: Maybe<StringFilter>;
  collections?: Maybe<CollectionFilter>;
  users?: Maybe<UserFilter>;
  components?: Maybe<ComponentFilter>;
  AND?: Maybe<Array<TeamWhereInput>>;
  OR?: Maybe<Array<TeamWhereInput>>;
  NOT?: Maybe<Array<TeamWhereInput>>;
};

export type TeamWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  accessToken: Scalars['String'];
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
  team: Team;
};

export type UserCreateManyWithoutTeamInput = {
  create?: Maybe<Array<UserCreateWithoutTeamInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneWithoutComponentsInput = {
  create?: Maybe<UserCreateWithoutComponentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutComponentsInput = {
  id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  accessToken: Scalars['String'];
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutUsersInput;
};

export type UserCreateWithoutTeamInput = {
  id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  accessToken: Scalars['String'];
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
  components?: Maybe<ComponentCreateManyWithoutAuthorInput>;
};

export type UserFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type UserScalarWhereInput = {
  id?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  accessToken?: Maybe<StringFilter>;
  image_24?: Maybe<NullableStringFilter>;
  image_32?: Maybe<NullableStringFilter>;
  image_48?: Maybe<NullableStringFilter>;
  image_72?: Maybe<NullableStringFilter>;
  image_192?: Maybe<NullableStringFilter>;
  image_512?: Maybe<NullableStringFilter>;
  teamId?: Maybe<StringFilter>;
  components?: Maybe<ComponentFilter>;
  AND?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
};

export type UserUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
};

export type UserUpdateManyWithoutTeamInput = {
  create?: Maybe<Array<UserCreateWithoutTeamInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type UserUpdateManyWithWhereNestedInput = {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
};

export type UserUpdateOneRequiredWithoutComponentsInput = {
  create?: Maybe<UserCreateWithoutComponentsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUpdateWithoutComponentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutComponentsInput>;
};

export type UserUpdateWithoutComponentsDataInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
  team?: Maybe<TeamUpdateOneRequiredWithoutUsersInput>;
};

export type UserUpdateWithoutTeamDataInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  image_24?: Maybe<Scalars['String']>;
  image_32?: Maybe<Scalars['String']>;
  image_48?: Maybe<Scalars['String']>;
  image_72?: Maybe<Scalars['String']>;
  image_192?: Maybe<Scalars['String']>;
  image_512?: Maybe<Scalars['String']>;
  components?: Maybe<ComponentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithWhereUniqueWithoutTeamInput = {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutTeamDataInput;
};

export type UserUpsertWithoutComponentsInput = {
  update: UserUpdateWithoutComponentsDataInput;
  create: UserCreateWithoutComponentsInput;
};

export type UserUpsertWithWhereUniqueWithoutTeamInput = {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutTeamDataInput;
  create: UserCreateWithoutTeamInput;
};

export type UserWhereInput = {
  id?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  accessToken?: Maybe<StringFilter>;
  image_24?: Maybe<NullableStringFilter>;
  image_32?: Maybe<NullableStringFilter>;
  image_48?: Maybe<NullableStringFilter>;
  image_72?: Maybe<NullableStringFilter>;
  image_192?: Maybe<NullableStringFilter>;
  image_512?: Maybe<NullableStringFilter>;
  teamId?: Maybe<StringFilter>;
  components?: Maybe<ComponentFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  team?: Maybe<TeamWhereInput>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type UserDetailFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'accessToken' | 'image_72'>
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'domain' | 'accessToken'>
  ) }
);

export type UserPreviewFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'image_72'>
);

export type CollectionDetailFragment = (
  { __typename?: 'Collection' }
  & Pick<Collection, 'id' | 'name' | 'type' | 'published' | 'description' | 'componentsCount' | 'updatedAt' | 'createdAt'>
  & { components: Array<(
    { __typename?: 'Component' }
    & ComponentPreviewFragment
  )> }
);

export type CollectionListingFragment = (
  { __typename?: 'Collection' }
  & Pick<Collection, 'id' | 'name' | 'type' | 'published' | 'description' | 'componentsCount' | 'updatedAt'>
);

export type ComponentDetailFragment = (
  { __typename?: 'Component' }
  & Pick<Component, 'id' | 'type' | 'published' | 'updatedAt' | 'createdAt'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ), collection: (
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name'>
    & { components: Array<(
      { __typename?: 'Component' }
      & Pick<Component, 'id' | 'type' | 'updatedAt'>
    )> }
  ), plainTextData?: Maybe<(
    { __typename?: 'PlainTextComponentData' }
    & Pick<PlainTextComponentData, 'id' | 'text'>
  )>, articleData?: Maybe<(
    { __typename?: 'ArticleComponentData' }
    & Pick<ArticleComponentData, 'id' | 'title' | 'lead' | 'content'>
  )>, linkData?: Maybe<(
    { __typename?: 'LinkComponentData' }
    & Pick<LinkComponentData, 'id' | 'url' | 'text'>
  )> }
);

export type ComponentPreviewFragment = (
  { __typename?: 'Component' }
  & Pick<Component, 'id' | 'type' | 'updatedAt'>
  & { collection: (
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name'>
  ) }
);

export type ComponentListingFragment = (
  { __typename?: 'Component' }
  & Pick<Component, 'id' | 'type' | 'published' | 'updatedAt' | 'createdAt'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ), plainTextData?: Maybe<(
    { __typename?: 'PlainTextComponentData' }
    & Pick<PlainTextComponentData, 'id' | 'text'>
  )>, articleData?: Maybe<(
    { __typename?: 'ArticleComponentData' }
    & Pick<ArticleComponentData, 'id' | 'title' | 'lead' | 'content'>
  )>, linkData?: Maybe<(
    { __typename?: 'LinkComponentData' }
    & Pick<LinkComponentData, 'id' | 'url' | 'text'>
  )> }
);

export type SignInMutationVariables = {
  code: Scalars['String'];
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'SignInOutput' }
    & Pick<SignInOutput, 'authToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'accessToken' | 'image_24' | 'image_32' | 'image_48' | 'image_72' | 'image_192' | 'image_512'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Team, 'id' | 'name' | 'domain' | 'accessToken'>
      ) }
    ) }
  )> }
);

export type CreateOneCollectionMutationVariables = {
  data: CollectionCreateInput;
};


export type CreateOneCollectionMutation = (
  { __typename?: 'Mutation' }
  & { createOneCollection: (
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name' | 'type' | 'published' | 'description' | 'componentsCount' | 'updatedAt'>
  ) }
);

export type UpdateOneCollectionMutationVariables = {
  data: CollectionUpdateInput;
  where: CollectionWhereUniqueInput;
};


export type UpdateOneCollectionMutation = (
  { __typename?: 'Mutation' }
  & { updateOneCollection?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name' | 'type' | 'published' | 'description' | 'componentsCount' | 'updatedAt'>
  )> }
);

export type DeleteOneCollectionMutationVariables = {
  where: CollectionWhereUniqueInput;
};


export type DeleteOneCollectionMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneCollection?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name'>
  )> }
);

export type CreateOneComponentMutationVariables = {
  data: ComponentCreateInput;
};


export type CreateOneComponentMutation = (
  { __typename?: 'Mutation' }
  & { createOneComponent: (
    { __typename?: 'Component' }
    & ComponentDetailFragment
  ) }
);

export type UpdateOneComponentMutationVariables = {
  data: ComponentUpdateInput;
  where: ComponentWhereUniqueInput;
};


export type UpdateOneComponentMutation = (
  { __typename?: 'Mutation' }
  & { updateOneComponent?: Maybe<(
    { __typename?: 'Component' }
    & ComponentDetailFragment
  )> }
);

export type DeleteOneComponentMutationVariables = {
  where: ComponentWhereUniqueInput;
};


export type DeleteOneComponentMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneComponent?: Maybe<(
    { __typename?: 'Component' }
    & Pick<Component, 'id'>
  )> }
);

export type GetUserQueryVariables = {};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & UserDetailFragment
  )> }
);

export type GetUsersListingQueryVariables = {
  where?: Maybe<QueryUsersWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GetUsersListingQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserPreviewFragment
  )> }
);

export type GetCollectionDetailQueryVariables = {
  where: CollectionWhereUniqueInput;
};


export type GetCollectionDetailQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & UserDetailFragment
  )>, collection?: Maybe<(
    { __typename?: 'Collection' }
    & CollectionDetailFragment
  )> }
);

export type GetCollectionsListingQueryVariables = {
  where?: Maybe<QueryCollectionsWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<CollectionWhereUniqueInput>;
  before?: Maybe<CollectionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GetCollectionsListingQuery = (
  { __typename?: 'Query' }
  & { collections: Array<(
    { __typename?: 'Collection' }
    & CollectionListingFragment
  )> }
);

export type GetCollectionsOptionsQueryVariables = {};


export type GetCollectionsOptionsQuery = (
  { __typename?: 'Query' }
  & { collections: Array<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name' | 'type'>
  )> }
);

export type GetComponentDetailQueryVariables = {
  where: ComponentWhereUniqueInput;
};


export type GetComponentDetailQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & UserDetailFragment
  )>, component?: Maybe<(
    { __typename?: 'Component' }
    & ComponentDetailFragment
  )> }
);

export type GetRecentComponentsQueryVariables = {
  where?: Maybe<QueryComponentsWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ComponentWhereUniqueInput>;
  before?: Maybe<ComponentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GetRecentComponentsQuery = (
  { __typename?: 'Query' }
  & { components: Array<(
    { __typename?: 'Component' }
    & ComponentPreviewFragment
  )> }
);

export type GetComponentsListingQueryVariables = {
  where?: Maybe<QueryComponentsWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ComponentWhereUniqueInput>;
  before?: Maybe<ComponentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GetComponentsListingQuery = (
  { __typename?: 'Query' }
  & { components: Array<(
    { __typename?: 'Component' }
    & ComponentListingFragment
  )> }
);

export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  id
  name
  email
  accessToken
  image_72
  team {
    id
    name
    domain
    accessToken
  }
}
    `;
export const UserPreviewFragmentDoc = gql`
    fragment UserPreview on User {
  id
  name
  image_72
}
    `;
export const ComponentPreviewFragmentDoc = gql`
    fragment ComponentPreview on Component {
  id
  type
  updatedAt
  collection {
    id
    name
  }
}
    `;
export const CollectionDetailFragmentDoc = gql`
    fragment CollectionDetail on Collection {
  id
  name
  type
  published
  description
  components(first: 40) {
    ...ComponentPreview
  }
  componentsCount
  updatedAt
  createdAt
}
    ${ComponentPreviewFragmentDoc}`;
export const CollectionListingFragmentDoc = gql`
    fragment CollectionListing on Collection {
  id
  name
  type
  published
  description
  componentsCount
  updatedAt
}
    `;
export const ComponentDetailFragmentDoc = gql`
    fragment ComponentDetail on Component {
  id
  type
  published
  author {
    id
    name
  }
  collection {
    id
    name
    components(first: 5) {
      id
      type
      updatedAt
    }
  }
  plainTextData {
    id
    text
  }
  articleData {
    id
    title
    lead
    content
  }
  linkData {
    id
    url
    text
  }
  updatedAt
  createdAt
}
    `;
export const ComponentListingFragmentDoc = gql`
    fragment ComponentListing on Component {
  id
  type
  published
  author {
    id
    name
  }
  plainTextData {
    id
    text
  }
  articleData {
    id
    title
    lead
    content
  }
  linkData {
    id
    url
    text
  }
  updatedAt
  createdAt
}
    `;
export const SignInDocument = gql`
    mutation SignIn($code: String!) {
  signIn(code: $code) {
    authToken
    user {
      id
      name
      email
      accessToken
      image_24
      image_32
      image_48
      image_72
      image_192
      image_512
      team {
        id
        name
        domain
        accessToken
      }
    }
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const CreateOneCollectionDocument = gql`
    mutation CreateOneCollection($data: CollectionCreateInput!) {
  createOneCollection(data: $data) {
    id
    name
    type
    published
    description
    componentsCount
    updatedAt
  }
}
    `;
export type CreateOneCollectionMutationFn = ApolloReactCommon.MutationFunction<CreateOneCollectionMutation, CreateOneCollectionMutationVariables>;
export type CreateOneCollectionMutationResult = ApolloReactCommon.MutationResult<CreateOneCollectionMutation>;
export type CreateOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneCollectionMutation, CreateOneCollectionMutationVariables>;
export const UpdateOneCollectionDocument = gql`
    mutation UpdateOneCollection($data: CollectionUpdateInput!, $where: CollectionWhereUniqueInput!) {
  updateOneCollection(data: $data, where: $where) {
    id
    name
    type
    published
    description
    componentsCount
    updatedAt
  }
}
    `;
export type UpdateOneCollectionMutationFn = ApolloReactCommon.MutationFunction<UpdateOneCollectionMutation, UpdateOneCollectionMutationVariables>;
export type UpdateOneCollectionMutationResult = ApolloReactCommon.MutationResult<UpdateOneCollectionMutation>;
export type UpdateOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneCollectionMutation, UpdateOneCollectionMutationVariables>;
export const DeleteOneCollectionDocument = gql`
    mutation DeleteOneCollection($where: CollectionWhereUniqueInput!) {
  deleteOneCollection(where: $where) {
    id
    name
  }
}
    `;
export type DeleteOneCollectionMutationFn = ApolloReactCommon.MutationFunction<DeleteOneCollectionMutation, DeleteOneCollectionMutationVariables>;
export type DeleteOneCollectionMutationResult = ApolloReactCommon.MutationResult<DeleteOneCollectionMutation>;
export type DeleteOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneCollectionMutation, DeleteOneCollectionMutationVariables>;
export const CreateOneComponentDocument = gql`
    mutation CreateOneComponent($data: ComponentCreateInput!) {
  createOneComponent(data: $data) {
    ...ComponentDetail
  }
}
    ${ComponentDetailFragmentDoc}`;
export type CreateOneComponentMutationFn = ApolloReactCommon.MutationFunction<CreateOneComponentMutation, CreateOneComponentMutationVariables>;
export type CreateOneComponentMutationResult = ApolloReactCommon.MutationResult<CreateOneComponentMutation>;
export type CreateOneComponentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneComponentMutation, CreateOneComponentMutationVariables>;
export const UpdateOneComponentDocument = gql`
    mutation UpdateOneComponent($data: ComponentUpdateInput!, $where: ComponentWhereUniqueInput!) {
  updateOneComponent(data: $data, where: $where) {
    ...ComponentDetail
  }
}
    ${ComponentDetailFragmentDoc}`;
export type UpdateOneComponentMutationFn = ApolloReactCommon.MutationFunction<UpdateOneComponentMutation, UpdateOneComponentMutationVariables>;
export type UpdateOneComponentMutationResult = ApolloReactCommon.MutationResult<UpdateOneComponentMutation>;
export type UpdateOneComponentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneComponentMutation, UpdateOneComponentMutationVariables>;
export const DeleteOneComponentDocument = gql`
    mutation DeleteOneComponent($where: ComponentWhereUniqueInput!) {
  deleteOneComponent(where: $where) {
    id
  }
}
    `;
export type DeleteOneComponentMutationFn = ApolloReactCommon.MutationFunction<DeleteOneComponentMutation, DeleteOneComponentMutationVariables>;
export type DeleteOneComponentMutationResult = ApolloReactCommon.MutationResult<DeleteOneComponentMutation>;
export type DeleteOneComponentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneComponentMutation, DeleteOneComponentMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    ...UserDetail
  }
}
    ${UserDetailFragmentDoc}`;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersListingDocument = gql`
    query GetUsersListing($where: QueryUsersWhereInput, $skip: Int, $after: UserWhereUniqueInput, $before: UserWhereUniqueInput, $first: Int, $last: Int) {
  users(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
    ...UserPreview
  }
}
    ${UserPreviewFragmentDoc}`;
export type GetUsersListingQueryResult = ApolloReactCommon.QueryResult<GetUsersListingQuery, GetUsersListingQueryVariables>;
export const GetCollectionDetailDocument = gql`
    query GetCollectionDetail($where: CollectionWhereUniqueInput!) {
  getUser {
    ...UserDetail
  }
  collection(where: $where) {
    ...CollectionDetail
  }
}
    ${UserDetailFragmentDoc}
${CollectionDetailFragmentDoc}`;
export type GetCollectionDetailQueryResult = ApolloReactCommon.QueryResult<GetCollectionDetailQuery, GetCollectionDetailQueryVariables>;
export const GetCollectionsListingDocument = gql`
    query GetCollectionsListing($where: QueryCollectionsWhereInput, $skip: Int, $after: CollectionWhereUniqueInput, $before: CollectionWhereUniqueInput, $first: Int, $last: Int) {
  collections(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
    ...CollectionListing
  }
}
    ${CollectionListingFragmentDoc}`;
export type GetCollectionsListingQueryResult = ApolloReactCommon.QueryResult<GetCollectionsListingQuery, GetCollectionsListingQueryVariables>;
export const GetCollectionsOptionsDocument = gql`
    query GetCollectionsOptions {
  collections {
    id
    name
    type
  }
}
    `;
export type GetCollectionsOptionsQueryResult = ApolloReactCommon.QueryResult<GetCollectionsOptionsQuery, GetCollectionsOptionsQueryVariables>;
export const GetComponentDetailDocument = gql`
    query GetComponentDetail($where: ComponentWhereUniqueInput!) {
  getUser {
    ...UserDetail
  }
  component(where: $where) {
    ...ComponentDetail
  }
}
    ${UserDetailFragmentDoc}
${ComponentDetailFragmentDoc}`;
export type GetComponentDetailQueryResult = ApolloReactCommon.QueryResult<GetComponentDetailQuery, GetComponentDetailQueryVariables>;
export const GetRecentComponentsDocument = gql`
    query GetRecentComponents($where: QueryComponentsWhereInput, $skip: Int, $after: ComponentWhereUniqueInput, $before: ComponentWhereUniqueInput, $first: Int, $last: Int) {
  components(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
    ...ComponentPreview
  }
}
    ${ComponentPreviewFragmentDoc}`;
export type GetRecentComponentsQueryResult = ApolloReactCommon.QueryResult<GetRecentComponentsQuery, GetRecentComponentsQueryVariables>;
export const GetComponentsListingDocument = gql`
    query GetComponentsListing($where: QueryComponentsWhereInput, $skip: Int, $after: ComponentWhereUniqueInput, $before: ComponentWhereUniqueInput, $first: Int, $last: Int) {
  components(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
    ...ComponentListing
  }
}
    ${ComponentListingFragmentDoc}`;
export type GetComponentsListingQueryResult = ApolloReactCommon.QueryResult<GetComponentsListingQuery, GetComponentsListingQueryVariables>;