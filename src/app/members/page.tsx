import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import MemberCard from "../components/MemberCard"
import clientPromise from "@/lib/mongodb"

export default async function Members() {
  const session = await getServerSession()
  if (!session) {
    redirect("/api/auth/signin")
  }

  const client = await clientPromise
  const db = client.db()
  const members = await db.collection("users").find({}).toArray()

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Our Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard key={member._id.toString()} member={member} />
        ))}
      </div>
    </div>
  )
}

