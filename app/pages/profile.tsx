import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import Profile from "../core/pageComponents/ProfilePage"
import { Suspense } from "react"

const ProfilePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Suspense fallback="Loading...">
      <Profile />
    </Suspense>
  )
}

ProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilePage
