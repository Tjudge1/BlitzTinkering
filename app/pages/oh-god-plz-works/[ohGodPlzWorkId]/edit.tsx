import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOhGodPlzWork from "app/oh-god-plz-works/queries/getOhGodPlzWork"
import updateOhGodPlzWork from "app/oh-god-plz-works/mutations/updateOhGodPlzWork"
import { OhGodPlzWorkForm, FORM_ERROR } from "app/oh-god-plz-works/components/OhGodPlzWorkForm"

export const EditOhGodPlzWork = () => {
  const router = useRouter()
  const ohGodPlzWorkId = useParam("ohGodPlzWorkId", "number")
  const [ohGodPlzWork, { setQueryData }] = useQuery(getOhGodPlzWork, { id: ohGodPlzWorkId })
  const [updateOhGodPlzWorkMutation] = useMutation(updateOhGodPlzWork)

  return (
    <>
      <Head>
        <title>Edit OhGodPlzWork {ohGodPlzWork.id}</title>
      </Head>

      <div>
        <h1>Edit OhGodPlzWork {ohGodPlzWork.id}</h1>
        <pre>{JSON.stringify(ohGodPlzWork)}</pre>

        <OhGodPlzWorkForm
          submitText="Update OhGodPlzWork"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOhGodPlzWork}
          initialValues={ohGodPlzWork}
          onSubmit={async (values) => {
            try {
              const updated = await updateOhGodPlzWorkMutation({
                id: ohGodPlzWork.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/ohGodPlzWorks/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditOhGodPlzWorkPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOhGodPlzWork />
      </Suspense>

      <p>
        <Link href="/ohGodPlzWorks">
          <a>OhGodPlzWorks</a>
        </Link>
      </p>
    </div>
  )
}

EditOhGodPlzWorkPage.authenticate = true
EditOhGodPlzWorkPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOhGodPlzWorkPage
