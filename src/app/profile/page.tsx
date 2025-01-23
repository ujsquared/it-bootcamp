import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import ProfileForm from "../components/ProfileForm"

export default async function Profile() {
  const session = await getServerSession()
  if (!session) {
    redirect("/api/auth/signin")
  }

  // You can fetch user data from your backend API here
  const user = {} // Replace with API call when ready

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Your Profile</h1>
      <ProfileForm user={user} />
    </div>
  )
}


