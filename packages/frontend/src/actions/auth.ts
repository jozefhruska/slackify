import { UserDetailFragment } from '../types/generated/graphql';

export type StoreUser = {
  type: '[AUTH] STORE_USER';
  payload: {
    user: UserDetailFragment;
  };
};

export type SignOut = {
  type: '[AUTH] SIGN_OUT';
};

export type AuthAction = StoreUser | SignOut;
