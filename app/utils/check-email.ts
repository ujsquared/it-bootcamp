import { MongoClient } from 'mongodb';

export async function checkAllowedEmail(email: string) {
  if (!email) {
    console.error('No email provided for check');
    return false;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('student_store');
    const collection = database.collection('allowed_emails');
    
    const result = await collection.findOne({ email_id: email });
    await client.close();
    
    return result !== null;
  } catch (error) {
    console.error('Error checking allowed email:', error);
    throw error; // Propagate error to be handled by the auth callback
  }
}
