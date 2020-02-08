export type SlackCreateNewCategoryAction = {
  action_id: 'app_home_manage_categories_open';
  type: 'button';
};

export type SlackAction = SlackCreateNewCategoryAction;

export type SlackActionRequestBody = {
  type: 'block_actions';
  team: {
    id: 'string';
    domain: 'string';
  };
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  trigger_id: string;
  actions: SlackCreateNewCategoryAction[];
};
