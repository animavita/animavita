import axios from 'axios';

require('dotenv').config();

const onesignal = axios.create({
  baseURL: 'https://onesignal.com/api/v1/'
});

onesignal.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Basic ${process.env.ONE_SIGNAL_KEY}`;
  config.data.app_id = process.env.ONE_SIGNAL_APP_KEY;
  return config;
});

export default onesignal;
