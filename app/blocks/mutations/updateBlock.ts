import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBlock = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBlock),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const block = await db.block.update({ where: { id }, data })

    return block
  }
)
