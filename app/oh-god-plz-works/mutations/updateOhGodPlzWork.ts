import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateOhGodPlzWork = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateOhGodPlzWork),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ohGodPlzWork = await db.ohGodPlzWork.update({ where: { id }, data })

    return ohGodPlzWork
  }
)
