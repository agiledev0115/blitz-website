import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const search = z.object({
  keyword: z.string().optional(),
  type: z.enum(["topic", "section"]).optional(),
  tags: z.string().array().optional(),
  lastModified: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  location: z.number().optional(),
  sortBy: z
    .enum(["LM-desc", "LM-asc", "LC-desc", "LC-asc", "ABC-desc", "ABC-asc"])
    .optional()
    .default("LM-desc"),
})

export default resolver.pipe(resolver.zod(search), resolver.authorize(), async (searchData) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const topics = await db.topic.findMany({
    where: {
      name: {
        search: searchData.keyword ?? "",
      },
    },
  })
  const sections = await db.section.findMany({
    where: {
      title: {
        search: searchData.keyword ?? "",
      },
    },
  })

  if (!topics || !sections) throw new NotFoundError()

  return [...topics, ...sections]
})
