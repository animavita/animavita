import axios from 'axios';
import UserPushTokenModel from '~/modules/user/UserPushTokenModel';

require('dotenv').config();

const onesignal = axios.create({
  baseURL: 'https://onesignal.com/api/v1/'
});

onesignal.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Basic ${process.env.ONE_SIGNAL_KEY}`;
  config.data.app_id = process.env.ONE_SIGNAL_APP_KEY;
  return config;
});

const OneSignal = {
  notification: async (contents, user) => {
    let userPushTokens = await UserPushTokenModel.find({ user });
    userPushTokens = userPushTokens.map(token => token.playerId);
    if (userPushTokens.length > 0) {
      onesignal.post('notifications', {
        ...contents,
        include_player_ids: userPushTokens
      });
    }
  }
};

export default OneSignal;
