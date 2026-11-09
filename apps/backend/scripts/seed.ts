import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/modules/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoUser } from '../src/infra/mongo/schemas/user.schema';
import { MongoPet } from '../src/infra/mongo/schemas/pet.schema';
import { hash } from 'argon2';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readdir, readFile } from 'fs/promises';
import * as path from 'path';

// Seed accounts configuration
const SEED_ACCOUNTS = {
  owner: {
    email: 'owner@email.com',
    password: 'Password123',
    name: 'John Owner',
    phoneNumber: '+12125551234',
    photoUri: 'https://i.pravatar.cc/300?img=12',
  },
  adopter: {
    email: 'adopter@email.com',
    password: 'Password123',
    name: 'Jane Adopter',
    phoneNumber: '+12125555678',
    photoUri: 'https://i.pravatar.cc/300?img=47',
  },
} as const;

// New York coordinates with ~10km distance
const LOCATIONS = {
  centralPark: { longitude: -73.9654, latitude: 40.7829 },
  lowerManhattan: { longitude: -73.9862, latitude: 40.7061 },
} as const;

function createPetData(ownerId: string, photoUrls: Record<string, string>) {
  const ownerLocation = {
    type: 'Point' as const,
    coordinates: [
      LOCATIONS.centralPark.longitude,
      LOCATIONS.centralPark.latitude,
    ],
  };

  return [
    {
      name: 'Max',
      breed: 'Golden Retriever',
      gender: 'male' as const,
      type: 'dog' as const,
      maturity: 'adult' as const,
      size: 'big' as const,
      observations: 'Friendly and energetic dog, loves to play fetch!',
      photos: [photoUrls['max-1.jpg'], photoUrls['max-2.jpg']],
      user: ownerId,
      location: ownerLocation,
    },
    {
      name: 'Luna',
      breed: 'Siamese',
      gender: 'female' as const,
      type: 'cat' as const,
      maturity: 'young' as const,
      size: 'small' as const,
      observations: 'Calm and affectionate cat, perfect for apartments.',
      photos: [photoUrls['luna.jpg']],
      user: ownerId,
      location: ownerLocation,
    },
    {
      name: 'Buddy',
      breed: 'Beagle',
      gender: 'male' as const,
      type: 'dog' as const,
      maturity: 'puppy' as const,
      size: 'medium' as const,
      observations: 'Playful puppy looking for an active family.',
      photos: [photoUrls['buddy.jpg']],
      user: ownerId,
      location: ownerLocation,
    },
    {
      name: 'Mittens',
      breed: 'Persian',
      gender: 'female' as const,
      type: 'cat' as const,
      maturity: 'senior' as const,
      size: 'small' as const,
      observations: 'Gentle senior cat, loves quiet environments.',
      photos: [photoUrls['mittens.jpg']],
      user: ownerId,
      location: ownerLocation,
    },
    {
      name: 'Rocky',
      breed: 'German Shepherd',
      gender: 'male' as const,
      type: 'dog' as const,
      maturity: 'adult' as const,
      size: 'big' as const,
      observations: 'Well-trained guard dog, great with kids.',
      photos: [photoUrls['rocky.jpg']],
      user: ownerId,
      location: ownerLocation,
    },
  ];
}

// Pet photos live in scripts/seed-photos (from Unsplash) and are uploaded to the
// same bucket as user uploads, so the app never needs the internet to show them.
const PHOTOS_DIR = path.join(__dirname, 'seed-photos');

async function uploadSeedPhotos(): Promise<Record<string, string>> {
  const endpoint = process.env.AWS_ENDPOINT;
  const bucket = process.env.AWS_S3_BUCKET_NAME || 'animavita-uploads';
  const region = process.env.AWS_REGION || 'us-east-1';
  if (!endpoint) {
    throw new Error('AWS_ENDPOINT must point at LocalStack to seed photos');
  }

  const s3 = new S3Client({ region, endpoint, forcePathStyle: true });
  // Same public host the app gets for uploads (see S3StorageProvider)
  const publicEndpoint = endpoint.replace('//localstack:', '//localhost:');

  const files = (await readdir(PHOTOS_DIR)).filter((file) => file.endsWith('.jpg'));
  const entries = await Promise.all(
    files.map(async (file) => {
      const key = `seed/${file}`;
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: await readFile(path.join(PHOTOS_DIR, file)),
          ContentType: 'image/jpeg',
        }),
      );
      return [file, `${publicEndpoint}/${bucket}/${key}`] as const;
    }),
  );
  return Object.fromEntries(entries);
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  const app = await NestFactory.create(AppModule, { logger: false });

  const userModel = app.get<Model<MongoUser>>(getModelToken(MongoUser.name));
  const petModel = app.get<Model<MongoPet>>(getModelToken(MongoPet.name));

  try {
    const hashedPassword = await hash(SEED_ACCOUNTS.owner.password);

    console.log('🖼️  Uploading pet photos...');
    const photoUrls = await uploadSeedPhotos();
    console.log(`   ✅ Uploaded ${Object.keys(photoUrls).length} photos\n`);

    console.log('🧹 Clearing existing seed data...');
    const seedEmails = [SEED_ACCOUNTS.owner.email, SEED_ACCOUNTS.adopter.email];

    const existingUsers = await userModel.find({ email: { $in: seedEmails } });

    if (existingUsers.length > 0) {
      const oldUserIds = existingUsers.map((u) => u._id.toString());
      const deletedPets = await petModel.deleteMany({
        user: { $in: oldUserIds },
      });
      console.log(`   🗑️  Deleted ${deletedPets.deletedCount} existing pets`);
    }

    const deletedUsers = await userModel.deleteMany({
      email: { $in: seedEmails },
    });
    console.log(`   🗑️  Deleted ${deletedUsers.deletedCount} existing users\n`);

    console.log('👤 Creating owner user...');
    const owner = await userModel.create({
      name: SEED_ACCOUNTS.owner.name,
      email: SEED_ACCOUNTS.owner.email,
      password: hashedPassword,
      phoneNumber: SEED_ACCOUNTS.owner.phoneNumber,
      role: 'owner',
      location: {
        type: 'Point',
        coordinates: [
          LOCATIONS.centralPark.longitude,
          LOCATIONS.centralPark.latitude,
        ],
      },
      photoUri: SEED_ACCOUNTS.owner.photoUri,
    });
    console.log(`   ✅ Owner created (ID: ${owner._id})\n`);

    console.log('👤 Creating adopter user...');
    const adopter = await userModel.create({
      name: SEED_ACCOUNTS.adopter.name,
      email: SEED_ACCOUNTS.adopter.email,
      password: hashedPassword,
      phoneNumber: SEED_ACCOUNTS.adopter.phoneNumber,
      role: 'adopter',
      location: {
        type: 'Point',
        coordinates: [
          LOCATIONS.lowerManhattan.longitude,
          LOCATIONS.lowerManhattan.latitude,
        ],
      },
      photoUri: SEED_ACCOUNTS.adopter.photoUri,
    });
    console.log(`   ✅ Adopter created (ID: ${adopter._id})\n`);

    console.log('🐕 Creating pets...');
    const pets = createPetData(owner._id.toString(), photoUrls);
    await petModel.insertMany(pets);
    console.log(`   ✅ Created ${pets.length} pets\n`);

    console.log('📊 Seed Summary:');
    console.log('═'.repeat(50));
    console.log('\n👤 Owner Account:');
    console.log(`   Email:    ${SEED_ACCOUNTS.owner.email}`);
    console.log(`   Password: ${SEED_ACCOUNTS.owner.password}`);
    console.log(
      `   Location: Central Park, NY (${LOCATIONS.centralPark.latitude}, ${LOCATIONS.centralPark.longitude})`,
    );
    console.log(`   ID:       ${owner._id}`);

    console.log('\n👤 Adopter Account:');
    console.log(`   Email:    ${SEED_ACCOUNTS.adopter.email}`);
    console.log(`   Password: ${SEED_ACCOUNTS.adopter.password}`);
    console.log(
      `   Location: Lower Manhattan, NY (${LOCATIONS.lowerManhattan.latitude}, ${LOCATIONS.lowerManhattan.longitude})`,
    );
    console.log(`   ID:       ${adopter._id}`);

    console.log(`\n🐕 Pets: ${pets.length} pets created for owner`);
    console.log('   • Max (Golden Retriever, Dog, Adult, Big)');
    console.log('   • Luna (Siamese, Cat, Young, Small)');
    console.log('   • Buddy (Beagle, Dog, Puppy, Medium)');
    console.log('   • Mittens (Persian, Cat, Senior, Small)');
    console.log('   • Rocky (German Shepherd, Dog, Adult, Big)');

    console.log('\n✨ Database seeded successfully!\n');
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message || error);
    throw error;
  } finally {
    await app.close();
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
