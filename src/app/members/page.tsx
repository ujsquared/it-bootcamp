import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import MemberCard from "../components/MemberCard"

interface User {
  id: string;
  name?: string;
  hobbies?: string[];
  image?: string;
}

export default async function Members() {
  const session = await getServerSession()
  if (!session) {
    redirect("/api/auth/signin")
  }

  // Example static data or you can fetch from your backend API
  const members: User[] = [
    // Add sample member data or fetch from your API
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Our Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

