module.exports = async () => {
  process.env.TZ = 'UTC';
  process.env.JWT_REFRESH_TOKEN_EXPIRATION = '14d';
};
