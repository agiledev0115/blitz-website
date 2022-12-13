import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTopic = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTopic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const topic = await db.topic.findFirst({ where: { id } })

  if (!topic) throw new NotFoundError()

  return topic
})
