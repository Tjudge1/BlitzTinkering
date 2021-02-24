import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOhGodPlzWorksInput
  extends Pick<Prisma.OhGodPlzWorkFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOhGodPlzWorksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: ohGodPlzWorks, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.ohGodPlzWork.count({ where }),
      query: (paginateArgs) => db.ohGodPlzWork.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      ohGodPlzWorks,
      nextPage,
      hasMore,
      count,
    }
  }
)
