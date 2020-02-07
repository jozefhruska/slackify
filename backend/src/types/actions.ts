export type SlackCreateNewCategoryAction = {
  action_id: 'create_new_category';
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
