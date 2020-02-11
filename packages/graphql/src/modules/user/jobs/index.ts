import EmailWelcome from './EmailWelcome';

export const USER_JOBS = {
  USER: {
    EMAIL_WELCOME: 'USER:EMAIL_WELCOME',
  },
};

export default {
  [USER_JOBS.USER.EMAIL_WELCOME]: EmailWelcome,
};
