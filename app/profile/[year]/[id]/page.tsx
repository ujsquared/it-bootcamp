import { MongoClient } from 'mongodb';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // You'll need to install next-auth

// MongoDB connection function
async function getProfile(year: string, id: string) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db('student_store');
    const collection = database.collection(year);

    const profile = await collection.find({ id: id }).toArray();

    await client.close();
    return profile;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return [];
  }
}

export default async function ProfilePage({ params }: { params: { year: string, id: string } }) {
  const session = await getServerSession();
  const awaited_params = await params;
  const year = awaited_params.year
  const id = awaited_params.id
  if (!session) {
    redirect('/login');
  }

  const profile = await getProfile(year, id);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-6">
            <h1 className="type-animation font-['Press_Start_2P'] text-xl text-white">
              Profile Details
            </h1>
            <div className="type-animation delay-1 font-['Press_Start_2P'] text-xs text-gray-400">
              Year: {year} • ID: {id}
            </div>
          </div>

          <div className="space-y-8">
            {profile.map((profile: any) => (
              <div key={profile._id.toString()} className="space-y-6">
                <div className="type-animation delay-2 space-y-4">
                  <h2 className="font-['Press_Start_2P'] text-lg text-white">
                    {profile.name}
                  </h2>
                  <div className="font-['Press_Start_2P'] text-xs text-gray-400">
                    {profile.email}
                  </div>
                </div>

                <div className="type-animation delay-3 space-y-2">
                  <h3 className="font-['Press_Start_2P'] text-sm text-white">
                    Student Info
                  </h3>
                  <div className="font-['Press_Start_2P'] text-xs text-gray-400">
                    ID: {profile.id}
                  </div>
                  <div className="font-['Press_Start_2P'] text-xs text-gray-400">
                    Year: {profile.year}
                  </div>
                </div>

                {profile.bio && (
                  <div className="type-animation delay-4 space-y-2">
                    <h3 className="font-['Press_Start_2P'] text-sm text-white">
                      Bio
                    </h3>
                    <p className="font-['Press_Start_2P'] text-xs text-gray-300 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 