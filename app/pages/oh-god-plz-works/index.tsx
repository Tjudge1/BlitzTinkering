import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOhGodPlzWorks from "app/oh-god-plz-works/queries/getOhGodPlzWorks"

const ITEMS_PER_PAGE = 100

export const OhGodPlzWorksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ ohGodPlzWorks, hasMore }] = usePaginatedQuery(getOhGodPlzWorks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {ohGodPlzWorks.map((ohGodPlzWork) => (
          <li key={ohGodPlzWork.id}>
            <Link href={`/ohGodPlzWorks/${ohGodPlzWork.id}`}>
              <a>{ohGodPlzWork.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const OhGodPlzWorksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>OhGodPlzWorks</title>
      </Head>

      <div>
        <p>
          <Link href="/ohGodPlzWorks/new">
            <a>Create OhGodPlzWork</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OhGodPlzWorksList />
        </Suspense>
      </div>
    </>
  )
}

OhGodPlzWorksPage.authenticate = true
OhGodPlzWorksPage.getLayout = (page) => <Layout>{page}</Layout>

export default OhGodPlzWorksPage
