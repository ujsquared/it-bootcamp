import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, hobbies, image } = await req.json()

  const client = await clientPromise
  const db = client.db()

  await db.collection("users").updateOne({ email: session.user.email }, { $set: { name, hobbies, image } })

  return NextResponse.json({ message: "Profile updated successfully" })
}

