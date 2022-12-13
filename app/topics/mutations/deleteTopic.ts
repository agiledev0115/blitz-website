import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTopic = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTopic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const topic = await db.topic.deleteMany({ where: { id } })

  return topic
})
