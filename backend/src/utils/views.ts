import { SLACK_BOT_ACCESS_TOKEN } from '../config';
import { SlackActionRequestBody } from '../types/actions';
import { SLACK_API } from '.';

/**
 * Sends a view.open request to Slack with view payload.
 * @param view Layout (Slack's block-kit)
 * @param triggerId Trigger ID of action that triggered this action
 */
export const openView = (view: object, triggerId: SlackActionRequestBody['trigger_id']) => {
  const args = {
    token: SLACK_BOT_ACCESS_TOKEN,
    trigger_id: triggerId,
    view,
  };

  return SLACK_API.post<void>('https://slack.com/api/views.open', args);
};

/**
 * Sends a view.update request to Slack with view payload.
 * @param view Layout (Slack's block-kit)
 * @param triggerId Trigger ID of action that triggered this action
 */
export const updateView = (view: object, viewId: string) => {
  const args = {
    view_id: viewId,
    view: view,
  };

  return SLACK_API.post<void>('views.update', args);
};
