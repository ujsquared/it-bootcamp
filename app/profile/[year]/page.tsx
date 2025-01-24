import { MongoClient } from 'mongodb';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next'; // You'll need to install next-auth

// MongoDB connection function
async function getProfiles(year: string) {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('student_store');
    const collection = database.collection('twenty_three');
    
    // Fetch all documents from the collection without any filter
    const profiles = await collection.find({}).toArray();
    
    await client.close();
    return profiles;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return [];
  }
}

export default async function YearPage({ params }: { params: { year: string } }) {
  // Check authentication status
  const waited_params = await params;
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  const profiles = await getProfiles(waited_params.year);

  return (
    <div>
      <h1>Profile for year: {waited_params.year}</h1>
      <div className="profiles-grid">
        {profiles.map((profile: any) => (
          <div key={profile._id.toString()} className="profile-card">
            <h2>{profile.name}, {profile.id}, {profile.year}</h2>
          </div>
        ))}
      </div>
    </div>
  );
} 