import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const getSpacesWithAll = z.object({
  // This accepts type of undefined, but is required at runtime
})

export default resolver.pipe(resolver.zod(getSpacesWithAll), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const spaces = await db.space.findMany({
    include: {
      topics: {
        include: {
          sections: true,
        },
      },
    },
  })

  if (!spaces) throw new NotFoundError()

  return spaces
})
