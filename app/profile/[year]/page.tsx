import { MongoClient } from 'mongodb';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // You'll need to install next-auth
import BatchYearButton from '@/app/components/ShiftButton';
import { Suspense } from 'react';
import VHSLoading from '@/app/components/VHSLoading';

const ValidYears = ["2022", "2023", "2024"]

// Optimize MongoDB connection by reusing the client
let client: MongoClient | null = null;

async function getMongoClient() {
  if (!client) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

async function getProfiles(year: string) {
  try {
    const client = await getMongoClient();
    const database = client.db('student_store');
    const collection = database.collection(year);
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return [];
  }
}

// Profile list component
async function ProfileList({ year }: { year: string }) {
  const profiles = await getProfiles(year);
  
  return (
    <div className="profiles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {profiles.map((profile: any) => (
        <div key={profile._id.toString()} className="profile-card p-4 border rounded-lg">
          <h2>{profile.name}, {profile.id}, {profile.year}</h2>
        </div>
      ))}
    </div>
  );
}

export default async function YearPage({ params }: { params: { year: string } }) {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  if(!ValidYears.includes(params.year)){
    redirect('/profile'); // Redirect to year selection instead of showing 404
  }
  
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-8 vhs-title">
          {`YEAR ${params.year}`.split('').map((char, i) => (
            <span key={i} className="char" style={{ '--char-index': i } as any}>
              {char}
            </span>
          ))}
        </h1>
        <div className="flex flex-row gap-8 justify-center">
          {ValidYears.map((year) => (
            <BatchYearButton key={year} year={year} />
          ))}
        </div>
      </div>
      <Suspense fallback={<VHSLoading />}>
        <ProfileList year={params.year} />
      </Suspense>
    </div>
  );
} 