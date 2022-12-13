import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSpaceWithAll = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetSpaceWithAll),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const space = await db.space.findFirst({
      where: { id },
      include: {
        topics: {
          include: {
            sections: true,
          },
        },
      },
    })

    if (!space) throw new NotFoundError()

    return space
  }
)
