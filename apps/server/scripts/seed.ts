import * as dotenv from "dotenv";
import { PrismaClient, User, Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { Salt, parseSalt } from "../src/auth/password.service";
import { faker } from "@faker-js/faker";

async function seed(bcryptSalt: Salt) {
  const client = new PrismaClient();

  try {
    console.info("Seeding database...");

    // Create users
    const usersData = Array.from({ length: 3 }).map(() => ({
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
    }));

    const createdUsers: User[] = [];

    for (const userData of usersData) {
      userData.password = await hash(userData.password, bcryptSalt);
      const createdUser = await client.user.create({
        data: { ...userData, roles: ["user"] },
      });
      createdUsers.push(createdUser);
    }

    for (const user of createdUsers) {
      const userWishlist: Prisma.WishlistCreateManyInput[] = [];

      for (let i = 0; i < 20; i++) {
        const startDate = faker.date.recent(); // Random past or current date
        const endDate = faker.date.future({ refDate: startDate }); // Random future date

        const createdListing = await client.listing.create({
          data: {
            userId: user.id,
            title: faker.lorem.sentence(),
            address: faker.location.streetAddress(),
            amenities: {
              // Customize amenities data as needed
              hasWifi: faker.datatype.boolean(),
              hasParking: faker.datatype.boolean(),
              hasKitchen: faker.datatype.boolean(),
              hasAirConditioning: faker.datatype.boolean(),
              hasHeating: faker.datatype.boolean(),
              hasWashingMachine: faker.datatype.boolean(),
              hasDryer: faker.datatype.boolean(),
              hasDishwasher: faker.datatype.boolean(),
              hasBalcony: faker.datatype.boolean(),
              hasIron: faker.datatype.boolean(),
              hasTv: faker.datatype.boolean(),
              hasBreakfast: faker.datatype.boolean(),
              hasLaptopFriendlyWorkspace: faker.datatype.boolean(),
              hasElevator: faker.datatype.boolean(),
              hasPool: faker.datatype.boolean(),
              hasHotTub: faker.datatype.boolean(),
              hasGym: faker.datatype.boolean(),
              hasSmokeDetector: faker.datatype.boolean(),
              // Add other amenities
            },
            country: faker.location.country(),
            description: faker.lorem.paragraph({ min: 10, max: 40 }),
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
            maxGuests: faker.number.float({ min: 1, max: 10 }),
            numBaths: faker.number.float({ min: 1, max: 5 }),
            numBedrooms: faker.number.float({ min: 1, max: 5 }),
            numBeds: faker.number.float({ min: 1, max: 5 }).toString(),
            photos: [
              faker.image.urlLoremFlickr({ category: "city" }),
              faker.image.urlLoremFlickr({ category: "city" }),
              faker.image.urlLoremFlickr({ category: "city" }),
              faker.image.urlLoremFlickr({ category: "city" }),
            ],
            price: faker.number.float({ min: 50, max: 500 }),
            shortDescription: faker.lorem.sentence({ min: 15, max: 20 }),
            slug: faker.lorem.slug(),
            trips: {
              create: {
                user: { connect: { id: user.id } },
                startDate,
                endDate,
              },
            },
          },
        });

        // Create wishlists for a subset of listings for each user
        if (i % 2 === 0) {
          userWishlist.push({
            userId: user.id,
            listingId: createdListing.id,
          });
        }
      }

      // Create wishlists for the selected listings for the current user
      await client.wishlist.createMany({
        data: userWishlist,
      });
    }

    console.info("Seeding database complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.$disconnect();
  }
}

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }
  const salt = parseSalt(BCRYPT_SALT);

  seed(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
