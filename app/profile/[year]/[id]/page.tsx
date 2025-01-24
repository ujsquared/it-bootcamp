import { MongoClient } from 'mongodb';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // You'll need to install next-auth

// MongoDB connection function
async function getProfile(year: string,  id: string) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('student_store');
    const collection = database.collection(year);
    
    const profile = await collection.find({id: id}).toArray();
    
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
    <div>
      <h1>Profile for id, year: {year}, {id} </h1>
      <div className="profiles-grid">
        {profile.map((profile: any) => (
          <div key={profile._id.toString()} className="profile-card">
            <h2>{profile.name}, {profile.id}, {profile.year}</h2>
          </div>
        ))}
      </div>
    </div>
  );
} 