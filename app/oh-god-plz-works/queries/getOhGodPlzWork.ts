import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetOhGodPlzWork = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetOhGodPlzWork),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ohGodPlzWork = await db.ohGodPlzWork.findFirst({ where: { id } })

    if (!ohGodPlzWork) throw new NotFoundError()

    return ohGodPlzWork
  }
)
