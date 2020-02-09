import Axios from 'axios';

import { SLACK_BOT_ACCESS_TOKEN } from '../config';

export const SLACK_API = Axios.create({
  baseURL: 'https://slack.com/api/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${SLACK_BOT_ACCESS_TOKEN}`,
  },
});

/* Response interceptor */
SLACK_API.interceptors.response.use(response => {
  if (!response?.data?.ok) {
    throw response?.data?.error;
  }

  return response;
});
