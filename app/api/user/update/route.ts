import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { userId, bio } = await request.json();
    const year = '20' + userId.slice(2, 4);

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('student_store');
    const collection = db.collection(year);

    const result = await collection.updateOne(
      { id: (userId) },
      { $set: { bio: bio } }
    );

    await client.close();

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
