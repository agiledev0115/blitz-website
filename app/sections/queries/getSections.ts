import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSectionsInput
  extends Pick<Prisma.SectionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSectionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: sections,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.section.count({ where }),
      query: (paginateArgs) => db.section.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      sections,
      nextPage,
      hasMore,
      count,
    }
  }
)
