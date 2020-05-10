import { Reducer } from 'redux';

import { UserDetailFragment } from '../types/generated/graphql';
import { AuthAction } from '../actions/auth';

/* State type - authReducer
============================================================================= */
export type AuthState = {
  user: UserDetailFragment;
};

/* Initial state - authReducer
============================================================================= */
const INITIAL_STATE: AuthState = {
  user: null,
};

/* authReducer
============================================================================= */
const authReducer: Reducer<AuthState, AuthAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '[AUTH] STORE_USER': {
      const { user } = action.payload;

      return Object.assign({}, state, {
        user,
      });
    }

    case '[AUTH] SIGN_OUT': {
      return Object.assign({}, state, {
        user: null,
      });
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
