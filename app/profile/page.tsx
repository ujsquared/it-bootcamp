import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
        <h1 className="text-3xl font-light text-white mb-8 tracking-[0.15em]" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          Profile
        </h1>
        <div className="space-y-4">
          <div className="text-gray-300">
            <p className="text-sm tracking-wide text-gray-400 mb-1">Name</p>
            <p className="font-light tracking-wider" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              {session.user?.name}
            </p>
          </div>
          <div className="text-gray-300">
            <p className="text-sm tracking-wide text-gray-400 mb-1">Email</p>
            <p className="font-light tracking-wider" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              {session.user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
