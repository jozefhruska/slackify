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
  componentId?: Maybe<NullableStringFilter>;
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
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  author: UserCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordCreateManyWithoutComponentInput>;
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
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordCreateManyWithoutComponentInput>;
};

export type ComponentCreateWithoutCollectionInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author: UserCreateOneWithoutComponentsInput;
  team: TeamCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordCreateManyWithoutComponentInput>;
};

export type ComponentCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection: CollectionCreateOneWithoutComponentsInput;
  author: UserCreateOneWithoutComponentsInput;
  plainTextData?: Maybe<PlainTextComponentDataCreateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataCreateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataCreateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordCreateManyWithoutComponentInput>;
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
  plainTextDataId?: Maybe<NullableStringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  statRecord?: Maybe<StatRecordFilter>;
  AND?: Maybe<Array<ComponentScalarWhereInput>>;
  OR?: Maybe<Array<ComponentScalarWhereInput>>;
  NOT?: Maybe<Array<ComponentScalarWhereInput>>;
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
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordUpdateManyWithoutComponentInput>;
};

export type ComponentUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  plainTextDataId?: Maybe<Scalars['String']>;
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
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordUpdateManyWithoutComponentInput>;
};

export type ComponentUpdateWithoutCollectionDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordUpdateManyWithoutComponentInput>;
};

export type ComponentUpdateWithoutTeamDataInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<ComponentType>;
  published?: Maybe<Scalars['Boolean']>;
  plainTextDataId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  collection?: Maybe<CollectionUpdateOneRequiredWithoutComponentsInput>;
  author?: Maybe<UserUpdateOneRequiredWithoutComponentsInput>;
  plainTextData?: Maybe<PlainTextComponentDataUpdateOneWithoutComponentInput>;
  articleData?: Maybe<ArticleComponentDataUpdateOneWithoutComponentInput>;
  linkData?: Maybe<LinkComponentDataUpdateOneWithoutComponentInput>;
  statRecord?: Maybe<StatRecordUpdateManyWithoutComponentInput>;
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
  plainTextDataId?: Maybe<NullableStringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  statRecord?: Maybe<StatRecordFilter>;
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

export type CreatedAtComponentIdCompoundUniqueInput = {
  createdAt: Scalars['DateTime'];
  componentId: Scalars['String'];
};

export type DashData = {
   __typename?: 'DashData';
  requestedComponents: Array<Component>;
  createdComponents: Array<Component>;
  createdCollections: Array<Collection>;
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
  componentId?: Maybe<NullableStringFilter>;
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
  addToSlack?: Maybe<Scalars['Boolean']>;
  updateOneUser?: Maybe<User>;
  createOneCollection: Collection;
  updateOneCollection?: Maybe<Collection>;
  deleteOneCollection: Collection;
  createOneComponent: Component;
  updateOneComponent?: Maybe<Component>;
  deleteOneComponent?: Maybe<Component>;
};


export type MutationSignInArgs = {
  code: Scalars['String'];
  redirect_host?: Maybe<Scalars['String']>;
};


export type MutationAddToSlackArgs = {
  code: Scalars['String'];
  redirect_host?: Maybe<Scalars['String']>;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
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
  componentId?: Maybe<NullableStringFilter>;
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
  users: Array<User>;
  getUser?: Maybe<User>;
  collections: Array<Collection>;
  collection?: Maybe<Collection>;
  components: Array<Component>;
  component?: Maybe<Component>;
  statRecords: Array<StatRecord>;
  dashData: DashData;
};


export type QueryUsersArgs = {
  where?: Maybe<QueryUsersWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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


export type QueryStatRecordsArgs = {
  where?: Maybe<StatRecordWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<StatRecordWhereUniqueInput>;
  before?: Maybe<StatRecordWhereUniqueInput>;
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

export type SlackIdTeamIdCompoundUniqueInput = {
  slackId: Scalars['String'];
  teamId: Scalars['String'];
};

export type StatRecord = {
   __typename?: 'StatRecord';
  createdAt: Scalars['DateTime'];
  componentId?: Maybe<Scalars['String']>;
  component?: Maybe<Component>;
};

export type StatRecordCreateManyWithoutComponentInput = {
  create?: Maybe<Array<StatRecordCreateWithoutComponentInput>>;
  connect?: Maybe<Array<StatRecordWhereUniqueInput>>;
};

export type StatRecordCreateWithoutComponentInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type StatRecordFilter = {
  every?: Maybe<StatRecordWhereInput>;
  some?: Maybe<StatRecordWhereInput>;
  none?: Maybe<StatRecordWhereInput>;
};

export type StatRecordScalarWhereInput = {
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  componentId?: Maybe<NullableStringFilter>;
  AND?: Maybe<Array<StatRecordScalarWhereInput>>;
  OR?: Maybe<Array<StatRecordScalarWhereInput>>;
  NOT?: Maybe<Array<StatRecordScalarWhereInput>>;
};

export type StatRecordUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type StatRecordUpdateManyWithoutComponentInput = {
  create?: Maybe<Array<StatRecordCreateWithoutComponentInput>>;
  connect?: Maybe<Array<StatRecordWhereUniqueInput>>;
  set?: Maybe<Array<StatRecordWhereUniqueInput>>;
  disconnect?: Maybe<Array<StatRecordWhereUniqueInput>>;
  delete?: Maybe<Array<StatRecordWhereUniqueInput>>;
  update?: Maybe<Array<StatRecordUpdateWithWhereUniqueWithoutComponentInput>>;
  updateMany?: Maybe<Array<StatRecordUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<StatRecordScalarWhereInput>>;
  upsert?: Maybe<Array<StatRecordUpsertWithWhereUniqueWithoutComponentInput>>;
};

export type StatRecordUpdateManyWithWhereNestedInput = {
  where: StatRecordScalarWhereInput;
  data: StatRecordUpdateManyDataInput;
};

export type StatRecordUpdateWithoutComponentDataInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type StatRecordUpdateWithWhereUniqueWithoutComponentInput = {
  where: StatRecordWhereUniqueInput;
  data: StatRecordUpdateWithoutComponentDataInput;
};

export type StatRecordUpsertWithWhereUniqueWithoutComponentInput = {
  where: StatRecordWhereUniqueInput;
  update: StatRecordUpdateWithoutComponentDataInput;
  create: StatRecordCreateWithoutComponentInput;
};

export type StatRecordWhereInput = {
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  componentId?: Maybe<NullableStringFilter>;
  AND?: Maybe<Array<StatRecordWhereInput>>;
  OR?: Maybe<Array<StatRecordWhereInput>>;
  NOT?: Maybe<Array<StatRecordWhereInput>>;
  component?: Maybe<ComponentWhereInput>;
};

export type StatRecordWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  createdAt_componentId?: Maybe<CreatedAtComponentIdCompoundUniqueInput>;
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
  botToken: Scalars['String'];
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
  botId: Scalars['String'];
  botToken: Scalars['String'];
  accessToken: Scalars['String'];
  users?: Maybe<UserCreateManyWithoutTeamInput>;
  components?: Maybe<ComponentCreateManyWithoutTeamInput>;
};

export type TeamCreateWithoutComponentsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  botId: Scalars['String'];
  botToken: Scalars['String'];
  accessToken: Scalars['String'];
  collections?: Maybe<CollectionCreateManyWithoutTeamInput>;
  users?: Maybe<UserCreateManyWithoutTeamInput>;
};

export type TeamCreateWithoutUsersInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  botId: Scalars['String'];
  botToken: Scalars['String'];
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
  botId?: Maybe<Scalars['String']>;
  botToken?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  users?: Maybe<UserUpdateManyWithoutTeamInput>;
  components?: Maybe<ComponentUpdateManyWithoutTeamInput>;
};

export type TeamUpdateWithoutComponentsDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  botId?: Maybe<Scalars['String']>;
  botToken?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  collections?: Maybe<CollectionUpdateManyWithoutTeamInput>;
  users?: Maybe<UserUpdateManyWithoutTeamInput>;
};

export type TeamUpdateWithoutUsersDataInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  botId?: Maybe<Scalars['String']>;
  botToken?: Maybe<Scalars['String']>;
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
  botId?: Maybe<StringFilter>;
  botToken?: Maybe<StringFilter>;
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
  botToken?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  role: UserRole;
  accessToken: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
  slackId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  role?: Maybe<UserRole>;
  accessToken: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutUsersInput;
};

export type UserCreateWithoutTeamInput = {
  id?: Maybe<Scalars['String']>;
  slackId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  role?: Maybe<UserRole>;
  accessToken: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  components?: Maybe<ComponentCreateManyWithoutAuthorInput>;
};

export type UserFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export enum UserRole {
  Owner = 'OWNER',
  Editor = 'EDITOR',
  Author = 'AUTHOR',
  Viewer = 'VIEWER'
}

export type UserScalarWhereInput = {
  id?: Maybe<StringFilter>;
  slackId?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<StringFilter>;
  avatar?: Maybe<NullableStringFilter>;
  teamId?: Maybe<StringFilter>;
  components?: Maybe<ComponentFilter>;
  AND?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
};

export type UserUpdateInput = {
  id?: Maybe<Scalars['String']>;
  slackId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  team?: Maybe<TeamUpdateOneRequiredWithoutUsersInput>;
  components?: Maybe<ComponentUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyDataInput = {
  id?: Maybe<Scalars['String']>;
  slackId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
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
  slackId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  team?: Maybe<TeamUpdateOneRequiredWithoutUsersInput>;
};

export type UserUpdateWithoutTeamDataInput = {
  id?: Maybe<Scalars['String']>;
  slackId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
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
  slackId?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  role?: Maybe<UserRole>;
  accessToken?: Maybe<StringFilter>;
  avatar?: Maybe<NullableStringFilter>;
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
  slackId_teamId?: Maybe<SlackIdTeamIdCompoundUniqueInput>;
};

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

export type UserDetailFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'role' | 'name' | 'email' | 'accessToken' | 'avatar'>
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'accessToken'>
  ) }
);

export type UserPreviewFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'role' | 'avatar'>
);

export type AddToSlackMutationVariables = {
  code: Scalars['String'];
  redirect_host?: Maybe<Scalars['String']>;
};


export type AddToSlackMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addToSlack'>
);

export type CreateOneCollectionMutationVariables = {
  data: CollectionCreateInput;
};


export type CreateOneCollectionMutation = (
  { __typename?: 'Mutation' }
  & { createOneCollection: (
    { __typename?: 'Collection' }
    & CollectionListingFragment
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
    & CollectionListingFragment
  )> }
);

export type DeleteOneCollectionMutationVariables = {
  where: CollectionWhereUniqueInput;
};


export type DeleteOneCollectionMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneCollection: (
    { __typename?: 'Collection' }
    & CollectionListingFragment
  ) }
);

export type CreateOneComponentMutationVariables = {
  data: ComponentCreateInput;
};


export type CreateOneComponentMutation = (
  { __typename?: 'Mutation' }
  & { createOneComponent: (
    { __typename?: 'Component' }
    & ComponentListingFragment
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
    & ComponentListingFragment
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

export type SignInMutationVariables = {
  code: Scalars['String'];
  redirect_host?: Maybe<Scalars['String']>;
};


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'SignInOutput' }
    & Pick<SignInOutput, 'authToken'>
    & { user: (
      { __typename?: 'User' }
      & UserDetailFragment
    ) }
  )> }
);

export type UpdateOneUserMutationVariables = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type UpdateOneUserMutation = (
  { __typename?: 'Mutation' }
  & { updateOneUser?: Maybe<(
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

export type GetCollectionsOptionsQueryVariables = {
  where?: Maybe<QueryCollectionsWhereInput>;
};


export type GetCollectionsOptionsQuery = (
  { __typename?: 'Query' }
  & { collections: Array<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'name' | 'type'>
  )> }
);

export type GetDashDataQueryVariables = {};


export type GetDashDataQuery = (
  { __typename?: 'Query' }
  & { dashData: (
    { __typename?: 'DashData' }
    & { requestedComponents: Array<(
      { __typename?: 'Component' }
      & ComponentListingFragment
    )>, createdComponents: Array<(
      { __typename?: 'Component' }
      & ComponentListingFragment
    )>, createdCollections: Array<(
      { __typename?: 'Collection' }
      & CollectionListingFragment
    )> }
  ) }
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

export type GetComponentStatsQueryVariables = {
  where: StatRecordWhereInput;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<StatRecordWhereUniqueInput>;
  before?: Maybe<StatRecordWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type GetComponentStatsQuery = (
  { __typename?: 'Query' }
  & { statRecords: Array<(
    { __typename?: 'StatRecord' }
    & Pick<StatRecord, 'createdAt'>
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
export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  id
  role
  name
  email
  accessToken
  avatar
  team {
    id
    name
    accessToken
  }
}
    `;
export const UserPreviewFragmentDoc = gql`
    fragment UserPreview on User {
  id
  name
  role
  avatar
}
    `;
export const AddToSlackDocument = gql`
    mutation AddToSlack($code: String!, $redirect_host: String) {
  addToSlack(code: $code, redirect_host: $redirect_host)
}
    `;
export type AddToSlackMutationFn = ApolloReactCommon.MutationFunction<AddToSlackMutation, AddToSlackMutationVariables>;
export type AddToSlackMutationResult = ApolloReactCommon.MutationResult<AddToSlackMutation>;
export type AddToSlackMutationOptions = ApolloReactCommon.BaseMutationOptions<AddToSlackMutation, AddToSlackMutationVariables>;
export const CreateOneCollectionDocument = gql`
    mutation CreateOneCollection($data: CollectionCreateInput!) {
  createOneCollection(data: $data) {
    ...CollectionListing
  }
}
    ${CollectionListingFragmentDoc}`;
export type CreateOneCollectionMutationFn = ApolloReactCommon.MutationFunction<CreateOneCollectionMutation, CreateOneCollectionMutationVariables>;
export type CreateOneCollectionMutationResult = ApolloReactCommon.MutationResult<CreateOneCollectionMutation>;
export type CreateOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneCollectionMutation, CreateOneCollectionMutationVariables>;
export const UpdateOneCollectionDocument = gql`
    mutation UpdateOneCollection($data: CollectionUpdateInput!, $where: CollectionWhereUniqueInput!) {
  updateOneCollection(data: $data, where: $where) {
    ...CollectionListing
  }
}
    ${CollectionListingFragmentDoc}`;
export type UpdateOneCollectionMutationFn = ApolloReactCommon.MutationFunction<UpdateOneCollectionMutation, UpdateOneCollectionMutationVariables>;
export type UpdateOneCollectionMutationResult = ApolloReactCommon.MutationResult<UpdateOneCollectionMutation>;
export type UpdateOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneCollectionMutation, UpdateOneCollectionMutationVariables>;
export const DeleteOneCollectionDocument = gql`
    mutation DeleteOneCollection($where: CollectionWhereUniqueInput!) {
  deleteOneCollection(where: $where) {
    ...CollectionListing
  }
}
    ${CollectionListingFragmentDoc}`;
export type DeleteOneCollectionMutationFn = ApolloReactCommon.MutationFunction<DeleteOneCollectionMutation, DeleteOneCollectionMutationVariables>;
export type DeleteOneCollectionMutationResult = ApolloReactCommon.MutationResult<DeleteOneCollectionMutation>;
export type DeleteOneCollectionMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneCollectionMutation, DeleteOneCollectionMutationVariables>;
export const CreateOneComponentDocument = gql`
    mutation CreateOneComponent($data: ComponentCreateInput!) {
  createOneComponent(data: $data) {
    ...ComponentListing
  }
}
    ${ComponentListingFragmentDoc}`;
export type CreateOneComponentMutationFn = ApolloReactCommon.MutationFunction<CreateOneComponentMutation, CreateOneComponentMutationVariables>;
export type CreateOneComponentMutationResult = ApolloReactCommon.MutationResult<CreateOneComponentMutation>;
export type CreateOneComponentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneComponentMutation, CreateOneComponentMutationVariables>;
export const UpdateOneComponentDocument = gql`
    mutation UpdateOneComponent($data: ComponentUpdateInput!, $where: ComponentWhereUniqueInput!) {
  updateOneComponent(data: $data, where: $where) {
    ...ComponentListing
  }
}
    ${ComponentListingFragmentDoc}`;
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
export const SignInDocument = gql`
    mutation SignIn($code: String!, $redirect_host: String) {
  signIn(code: $code, redirect_host: $redirect_host) {
    authToken
    user {
      ...UserDetail
    }
  }
}
    ${UserDetailFragmentDoc}`;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const UpdateOneUserDocument = gql`
    mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateOneUser(data: $data, where: $where) {
    ...UserPreview
  }
}
    ${UserPreviewFragmentDoc}`;
export type UpdateOneUserMutationFn = ApolloReactCommon.MutationFunction<UpdateOneUserMutation, UpdateOneUserMutationVariables>;
export type UpdateOneUserMutationResult = ApolloReactCommon.MutationResult<UpdateOneUserMutation>;
export type UpdateOneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneUserMutation, UpdateOneUserMutationVariables>;
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
    query GetCollectionsOptions($where: QueryCollectionsWhereInput) {
  collections(where: $where) {
    id
    name
    type
  }
}
    `;
export type GetCollectionsOptionsQueryResult = ApolloReactCommon.QueryResult<GetCollectionsOptionsQuery, GetCollectionsOptionsQueryVariables>;
export const GetDashDataDocument = gql`
    query GetDashData {
  dashData {
    requestedComponents {
      ...ComponentListing
    }
    createdComponents {
      ...ComponentListing
    }
    createdCollections {
      ...CollectionListing
    }
  }
}
    ${ComponentListingFragmentDoc}
${CollectionListingFragmentDoc}`;
export type GetDashDataQueryResult = ApolloReactCommon.QueryResult<GetDashDataQuery, GetDashDataQueryVariables>;
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
export const GetComponentStatsDocument = gql`
    query GetComponentStats($where: StatRecordWhereInput!, $skip: Int, $after: StatRecordWhereUniqueInput, $before: StatRecordWhereUniqueInput, $first: Int, $last: Int) {
  statRecords(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
    createdAt
  }
}
    `;
export type GetComponentStatsQueryResult = ApolloReactCommon.QueryResult<GetComponentStatsQuery, GetComponentStatsQueryVariables>;
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