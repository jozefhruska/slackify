/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import * as prisma from "@prisma/client"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostWhereUniqueInput: { // input type
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Category: prisma.Category;
  Post: prisma.Post;
  Query: {};
  Team: prisma.Team;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Category: { // field return type
    handle: string; // String!
    id: string; // String!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    team: NexusGenRootTypes['Team']; // Team!
  }
  Post: { // field return type
    category: NexusGenRootTypes['Category']; // Category!
    content: string | null; // String
    createdAt: any; // DateTime!
    id: string; // String!
    isPublished: boolean; // Boolean!
    short: string; // String!
    title: string; // String!
    type: string; // String!
    updatedAt: any; // DateTime!
  }
  Query: { // field return type
    getCategories: NexusGenRootTypes['Category'][]; // [Category!]!
    getCategory: NexusGenRootTypes['Category'] | null; // Category
    getPost: NexusGenRootTypes['Post'] | null; // Post
    getPosts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
  Team: { // field return type
    domain: string; // String!
    id: string; // String!
    name: string; // String!
  }
}

export interface NexusGenArgTypes {
  Category: {
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Query: {
    getCategories: { // args
      teamId?: string | null; // String
    }
    getCategory: { // args
      categoryId?: string | null; // String
    }
    getPost: { // args
      postId?: string | null; // String
    }
    getPosts: { // args
      categoryId?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Category" | "Post" | "Query" | "Team";

export type NexusGenInputNames = "PostWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}