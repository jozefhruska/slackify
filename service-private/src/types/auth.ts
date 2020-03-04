import {} from '@slack/bolt';

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
};

export type SlackTeam = {
  id: string;
  name: string;
};
