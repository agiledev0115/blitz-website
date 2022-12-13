import db from "./index"
import { faker } from "@faker-js/faker"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 10; i++) {
    await db.company.create({
      data: {
        name: faker.name.jobArea(),
        owner: {
          connect: {
            id: 5,
          },
        },
      },
    })
  }
}

seed()

export default seed
