import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/in-memory-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionsModule } from '../../src/adoptions/adoptions.module';
import { AdoptionSchema } from '../../src/adoptions/adoption.schema';
import { pet1Mock, pet2Mock, pet3Mock } from '../../test/mocks/adoptions';
import { AdoptionsService } from '../../src/adoptions/adoptions.service';

describe('AdoptionsController (e2e)', () => {
  let app: INestApplication;
  let service: AdoptionsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Adoption', schema: AdoptionSchema },
        ]),
        AdoptionsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<AdoptionsService>(AdoptionsService);

    await app.init();
  });

  it('/GET adoptions', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);

    const {
      _id: mongoId,
      name,
      breed,
      gender,
      observations,
      photos,
      age,
    } = await service.createAdoption(pet1Mock);
    const _id = mongoId.toString();

    return request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect((res) => {
        return expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id,
              name,
              breed,
              gender,
              observations,
              photos,
              age,
            }),
          ]),
        );
      });
  });

  it('/POST adoptions', () => {
    return request(app.getHttpServer())
      .post('/api/v1/adoptions')
      .send(pet2Mock)
      .expect(201)
      .expect((res) =>
        expect(res.body).toEqual(
          expect.objectContaining({
            ...pet2Mock,
            _id: res.body._id,
          }),
        ),
      );
  });

  it('/PATCH adoptions', async () => {
    const { _id: mongoId } = await service.createAdoption(pet2Mock);
    const id = mongoId.toString();

    return request(app.getHttpServer())
      .patch('/api/v1/adoptions')
      .send({ id, name: 'Marley' })
      .expect(200)
      .expect((res) =>
        expect(res.body).toEqual(
          expect.objectContaining({
            ...pet2Mock,
            _id: id,
            name: 'Marley',
          }),
        ),
      );
  });

  it('/DELETE adoptions', async () => {
    request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);

    const expectedPet = await service.createAdoption(pet3Mock);
    const targetId = expectedPet._id.toString();

    await request(app.getHttpServer())
      .delete(`/api/v1/adoptions/${targetId}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/api/v1/adoptions')
      .expect(200)
      .expect([]);
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
