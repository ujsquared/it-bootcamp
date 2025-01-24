import { MongoClient } from 'mongodb';

async function checkAllowedEmail(email: string) {
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
    return false;
  }
}

export { checkAllowedEmail }; 