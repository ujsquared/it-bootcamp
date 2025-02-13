import { MongoClient } from 'mongodb';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // You'll need to install next-auth
import BatchYearButton from '@/app/components/ShiftButton';
import { Suspense } from 'react';
import VHSLoading from '@/app/components/VHSLoading';
import Link from 'next/link';


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

interface Profile {
  _id: string;
  name: string;
  id: string;
  year: string;
  profile_pic: string;
}

async function getProfiles(year: string) {
  try {
    const client = await getMongoClient();
    const database = client.db('student_store');
    const collection = database.collection(year);
    return (await collection.find({}).toArray()) as unknown as Profile[];
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
      {profiles.map((profile: Profile) => (
        <Link key={profile._id.toString()} href={`/profile/${year}/${profile.id}`}>
          <div className="profile-card p-4 border rounded-lg cursor-pointer h-32 w-full flex items-center justify-center">
              <img src={profile.profile_pic || '/default-pfp.webp' } alt="Profile picture" className="w-16 h-16 rounded-full" />
            <h2 className="text-sm text-center">{profile.name}, {profile.id}, {profile.year}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const session = await getServerSession();
  const { year } = await params; // Remove the await here

  if (!session) {
    redirect('/login');
  }

  if (!ValidYears.includes(year)) {
    redirect('/profile'); // Redirect to year selection instead of showing 404
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-8 vhs-title">
          {`YEAR ${year}`.split('').map((char, i) => (
            <span key={i} className="char" style={{ '--char-index': i } as React.CSSProperties}>
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
        <ProfileList year={year} />
      </Suspense>
    </div>
  );
}
