import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-light">Profile</h1>
      <div className="mt-4">
        <p>Welcome, {session.user?.name}</p>
        <p>Email: {session.user?.email}</p>
      </div>
    </div>
  );
}
