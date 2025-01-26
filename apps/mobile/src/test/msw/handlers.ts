import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/v1/pets/my', () => {
    return HttpResponse.json([]);
  }),

  http.post('*/api/v1/pets', () => {
    return HttpResponse.json({
      name: 'Bob',
      gender: 'male',
      breed: 'pitbull',
      type: 'dog',
      age: 2,
      size: 'big',
      photos: [],
    });
  }),

  http.post('*/api/v1/auth/signIn', () => {
    return HttpResponse.json({
      accessToken: '123',
      refreshToken: 'abc',
      name: 'John Due',
    });
  }),
];
