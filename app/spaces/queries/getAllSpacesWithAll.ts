import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAllSpacesWithAll = z.object({
  // This accepts type of undefined, but is required at runtime
})

export default resolver.pipe(resolver.zod(GetAllSpacesWithAll), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const spaces = await db.space.findMany({})
  const topics = await db.topic.findMany({})
  const sections = await db.section.findMany({})

  if (!spaces || !topics || !sections) throw new NotFoundError()

  return {spaces, topics, sections}
})
