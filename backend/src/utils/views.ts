import Axios from 'axios';
import QueryString = require('qs');
import { SLACK_BOT_ACCESS_TOKEN } from '../config';
import { SlackActionRequestBody } from '../types/actions';

/**
 * Sends a view.open request to Slack with modal layout payload.
 * @param modal Modal layout (Slack's block-kit)
 * @param triggerId Trigger ID of action that triggered this modal
 */
export const openModal = (modal: object, triggerId: SlackActionRequestBody['trigger_id']) => {
  const args = {
    token: SLACK_BOT_ACCESS_TOKEN,
    trigger_id: triggerId,
    view: JSON.stringify(modal),
  };

  return Axios.post<void>('https://slack.com/api/views.open', QueryString.stringify(args));
};
