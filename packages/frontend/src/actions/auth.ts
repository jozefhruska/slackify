import { User } from '../types/generated/graphql';

export type StoreUser = {
  type: '[AUTH] STORE_USER';
  payload: {
    user: User;
  };
};

export type SignOut = {
  type: '[AUTH] SIGN_OUT';
};

export type AuthAction = StoreUser | SignOut;
