import axios from 'axios';

import { DISCORD_API_URL } from '@/constants';

const discordApiClient = axios.create({
  baseURL: DISCORD_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default discordApiClient;
