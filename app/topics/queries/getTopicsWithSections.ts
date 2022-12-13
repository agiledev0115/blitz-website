import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAllTopicsWithSections = z.object({
  // This accepts type of undefined, but is required at runtime
})

export default resolver.pipe(resolver.zod(GetAllTopicsWithSections), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const topics = await db.topic.findMany({
    include: {
      sections: true
    }
  })
  const sections = await db.section.findMany({})

  if (!topics || !sections) throw new NotFoundError()

  return {topics, sections}
})
