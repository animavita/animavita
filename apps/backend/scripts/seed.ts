import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/modules/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoUser } from '../src/infra/mongo/schemas/user.schema';
import { MongoPet } from '../src/infra/mongo/schemas/pet.schema';
import { hash } from 'argon2';

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

function createPetData(ownerId: string) {
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
      photos: [
        'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      ],
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
      photos: [
        'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
      ],
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
      photos: [
        'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
      ],
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
      photos: [
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      ],
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
      photos: [
        'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
      ],
      user: ownerId,
      location: ownerLocation,
    },
  ];
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  const app = await NestFactory.create(AppModule, { logger: false });

  const userModel = app.get<Model<MongoUser>>(getModelToken(MongoUser.name));
  const petModel = app.get<Model<MongoPet>>(getModelToken(MongoPet.name));

  try {
    const hashedPassword = await hash(SEED_ACCOUNTS.owner.password);

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
    const pets = createPetData(owner._id.toString());
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
