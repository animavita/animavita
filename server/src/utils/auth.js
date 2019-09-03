import jwt from 'jsonwebtoken';
import FB from 'fb';

import UserModel from '~/modules/user/UserModel';

require('dotenv').config();

const { APP_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

export const generateToken = payload => jwt.sign(payload, APP_SECRET);

export const getUser = async (token) => {
  if (!token) return { user: null };
  try {
    const decodedToken = jwt.verify(token.substring(7), APP_SECRET);
    const user = await UserModel.findOne({ _id: decodedToken.id });

    return {
      user
    };
  } catch (err) {
    return { user: null };
  }
};

export const signInFacebook = async (accessToken) => {
  const facebookData = await FB.api('oauth/access_token', {
    client_id: FACEBOOK_CLIENT_ID,
    client_secret: FACEBOOK_CLIENT_SECRET,
    grant_type: 'fb_exchange_token',
    fb_exchange_token: accessToken
  });

  const newAccessToken = facebookData.access_token;

  FB.setAccessToken(newAccessToken);

  const me = await FB.api('me', {
    fields: ['id', 'name', 'email', 'picture.type(large)'],
    access_token: newAccessToken
  });

  return me;
};
