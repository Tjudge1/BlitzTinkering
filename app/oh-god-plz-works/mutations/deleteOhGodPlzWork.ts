import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteOhGodPlzWork = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteOhGodPlzWork),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ohGodPlzWork = await db.ohGodPlzWork.deleteMany({ where: { id } })

    return ohGodPlzWork
  }
)
