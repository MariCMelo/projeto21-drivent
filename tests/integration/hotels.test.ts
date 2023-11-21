import app, { init } from '@/app';
import { cleanDb, generateValidToken } from '../helpers';
import supertest from 'supertest';
import httpStatus from 'http-status';
import faker from '@faker-js/faker';
import { createTicket } from '@/controllers';


beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const sever = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await sever.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await sever.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when user doesnt have an enrollment yet', async () => {
      const token = await generateValidToken();

      const response = await sever.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
it('should respond with status 404 when there are no hotels', async () => {
  const token = faker.lorem.word();

  const response = await sever.get('/hotels').set('Authorization', `Bearer ${token}`);
  expect(response.status).toEqual(httpStatus.NOT_FOUND);
})


  });


});

describe('GET /hotels/:hotelId', () => {});
