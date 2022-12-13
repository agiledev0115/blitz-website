import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTopicsInput
  extends Pick<Prisma.TopicFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTopicsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: topics,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.topic.count({ where }),
      query: (paginateArgs) => db.topic.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      topics,
      nextPage,
      hasMore,
      count,
    }
  }
)
