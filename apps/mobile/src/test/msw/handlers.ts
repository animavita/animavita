import { rest } from 'msw';

export const handlers = [
  rest.get('*/api/v1/pets/my', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post('*/api/v1/pets', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Bob',
        gender: 'male',
        breed: 'pitbull',
        type: 'dog',
        age: 2,
        size: 'big',
        photos: [],
      })
    );
  }),

  rest.post('*/api/v1/auth/signIn', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: '123',
        refreshToken: 'abc',
        name: 'John Due',
      })
    );
  }),
];
