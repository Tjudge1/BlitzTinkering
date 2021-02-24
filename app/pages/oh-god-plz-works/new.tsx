import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOhGodPlzWork from "app/oh-god-plz-works/mutations/createOhGodPlzWork"
import { OhGodPlzWorkForm, FORM_ERROR } from "app/oh-god-plz-works/components/OhGodPlzWorkForm"

const NewOhGodPlzWorkPage: BlitzPage = () => {
  const router = useRouter()
  const [createOhGodPlzWorkMutation] = useMutation(createOhGodPlzWork)

  return (
    <div>
      <h1>Create New OhGodPlzWork</h1>

      <OhGodPlzWorkForm
        submitText="Create OhGodPlzWork"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOhGodPlzWork}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const ohGodPlzWork = await createOhGodPlzWorkMutation(values)
            router.push(`/ohGodPlzWorks/${ohGodPlzWork.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href="/ohGodPlzWorks">
          <a>OhGodPlzWorks</a>
        </Link>
      </p>
    </div>
  )
}

NewOhGodPlzWorkPage.authenticate = true
NewOhGodPlzWorkPage.getLayout = (page) => <Layout title={"Create New OhGodPlzWork"}>{page}</Layout>

export default NewOhGodPlzWorkPage
