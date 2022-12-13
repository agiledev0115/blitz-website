import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSpace = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteSpace), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const space = await db.space.deleteMany({ where: { id } })

  return space
})
