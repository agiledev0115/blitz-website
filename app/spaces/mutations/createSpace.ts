import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSpace = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateSpace), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const space = await db.space.create({ data: input })

  return space
})
