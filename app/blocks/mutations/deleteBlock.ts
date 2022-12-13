import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBlock = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBlock), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const block = await db.block.deleteMany({ where: { id } })

  return block
})
