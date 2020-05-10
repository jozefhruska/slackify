import { User } from '@prisma/client';

export type SlackAuthResponse = {
  ok: boolean;
  error?: string;
  token_type?: 'bot';
  access_token?: string;
  team: SlackTeam;
  authed_user: {
    id: string;
    token_type?: 'user';
    access_token: string;
  };
};

export type SlackUserIdentityResponse = {
  ok: boolean;
  user: SlackUser;
};

export type SlackUser = {
  id: string;
  name: string;
  email: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_72?: string;
  image_192?: string;
  image_512?: string;
  image_1024?: string;
};

export type SlackTeam = {
  id: string;
  name?: string;
};

export type JWTUser = {
  data: Pick<User, 'id' | 'email' | 'accessToken'>;
};
