import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSection = z.object({
  id: z.number(),
  title: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSection),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const section = await db.section.update({ where: { id }, data })

    return section
  }
)
