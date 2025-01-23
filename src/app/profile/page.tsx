import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import ProfileForm from "../components/ProfileForm"
import clientPromise from "@/lib/mongodb"

export default async function Profile() {
  const session = await getServerSession()
  if (!session) {
    redirect("/api/auth/signin")
  }

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection("users").findOne({ email: session.user.email })

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Your Profile</h1>
      <ProfileForm user={user} />
    </div>
  )
}


