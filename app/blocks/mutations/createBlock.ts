import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBlock = z.object({
  name: z.string(),
  type: z.string(),
  content: z.string(),
  sectionId: z.number(),
  row: z.number(),
})

export default resolver.pipe(resolver.zod(CreateBlock), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const block = await db.block.create({ data: input })

  return block
})
