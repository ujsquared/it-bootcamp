export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10">
        <h1 className="text-3xl font-light text-white mb-4 tracking-[0.15em]">
          Access Denied
        </h1>
        <p className="text-gray-300">
          Your email is not authorized to access this application. Please contact your administrator for access.
        </p>
      </div>
    </div>
  );
} 