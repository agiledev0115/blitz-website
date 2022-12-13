import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBlock = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBlock), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const block = await db.block.findFirst({ where: { id } })

  if (!block) throw new NotFoundError()

  return block
})
