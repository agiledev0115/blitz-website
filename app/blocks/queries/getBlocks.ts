import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBlocksInput
  extends Pick<Prisma.BlockFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBlocksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: blocks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.block.count({ where }),
      query: (paginateArgs) => db.block.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      blocks,
      nextPage,
      hasMore,
      count,
    }
  }
)
