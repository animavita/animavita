# Database Seeding

This directory contains scripts to seed the database with initial data for development.

## Running the Seed Script

### Option 1: Using Docker Compose (Recommended)

When you start the project with `docker-compose up`, you can seed the database by running:

```bash
docker-compose exec backend pnpm seed
```

### Option 2: Local Development (Without Docker)

If you're running the backend locally without Docker:

```bash
cd apps/backend
pnpm seed
```

## Seeded Data

The seed script creates:

### Users

1. **Owner Account**
   - Email: `owner@email.com`
   - Password: `Password123`
   - Location: Central Park, New York (40.7829, -73.9654)
   - Phone: +12125551234

2. **Adopter Account**
   - Email: `adopter@email.com`
   - Password: `Password123`
   - Location: Lower Manhattan, New York (40.7061, -73.9862)
   - Phone: +12125555678
   - Distance from owner: ~10km

### Pets

5 pets are created and associated with the owner:

1. **Max** - Golden Retriever (Adult, Male, Big)
2. **Luna** - Siamese Cat (Young, Female, Small)
3. **Buddy** - Beagle (Puppy, Male, Medium)
4. **Mittens** - Persian Cat (Senior, Female, Small)
5. **Rocky** - German Shepherd (Adult, Male, Big)

All pets have the same location as the owner and should appear in the adopter's feed.

## Notes

- The seed script is **idempotent** - you can run it multiple times safely
- It will delete and recreate the seed users and their pets on each run
- Other data in the database will not be affected
- The locations are real New York coordinates approximately 10km apart
