import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSection = z.object({
  name: z.string(),
  title: z.string()
})

export default resolver.pipe(resolver.zod(CreateSection), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const section = await db.section.create({ data: input })

  return section
})
