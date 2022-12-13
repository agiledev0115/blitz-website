import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSectionsInput
  extends Pick<Prisma.SectionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async (topics: any) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log("THIS IS TOPICS PARAM", topics)
  const sections = await db.section.findMany({
    where: {
      topicId: {
        in: topics.map((topic) => topic.id),
      },
    },
  })

  return {
    sections,
  }
})
