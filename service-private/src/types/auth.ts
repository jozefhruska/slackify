import { User } from '@prisma/client';

export type SlackAuthResponse = {
  ok: boolean;
  error?: string;
  access_token?: string;
  user_id?: string;
  team_id?: string;
  enterprise_id?: string;
  user: SlackUser;
  team: SlackTeam;
};

export type SlackUser = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
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
  name: string;
};

export type JWTUser = {
  data: User;
};
