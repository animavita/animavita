import { rest } from 'msw';

export const handlers = [
  rest.get('*/api/v1/adoptions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post('*/api/v1/adoptions', (req, res, ctx) => {
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
];
