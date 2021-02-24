import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOhGodPlzWork from "app/oh-god-plz-works/queries/getOhGodPlzWork"
import deleteOhGodPlzWork from "app/oh-god-plz-works/mutations/deleteOhGodPlzWork"

export const OhGodPlzWork = () => {
  const router = useRouter()
  const ohGodPlzWorkId = useParam("ohGodPlzWorkId", "number")
  const [deleteOhGodPlzWorkMutation] = useMutation(deleteOhGodPlzWork)
  const [ohGodPlzWork] = useQuery(getOhGodPlzWork, { id: ohGodPlzWorkId })

  return (
    <>
      <Head>
        <title>OhGodPlzWork {ohGodPlzWork.id}</title>
      </Head>

      <div>
        <h1>OhGodPlzWork {ohGodPlzWork.id}</h1>
        <pre>{JSON.stringify(ohGodPlzWork, null, 2)}</pre>

        <Link href={`/ohGodPlzWorks/${ohGodPlzWork.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOhGodPlzWorkMutation({ id: ohGodPlzWork.id })
              router.push("/ohGodPlzWorks")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowOhGodPlzWorkPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/ohGodPlzWorks">
          <a>OhGodPlzWorks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OhGodPlzWork />
      </Suspense>
    </div>
  )
}

ShowOhGodPlzWorkPage.authenticate = true
ShowOhGodPlzWorkPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOhGodPlzWorkPage
