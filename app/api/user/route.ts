import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
    try {
        // Get email from search params
        const { searchParams } = new URL(request.url);
        const year = searchParams.get('year');
        const email = searchParams.get('email');
        if (!email || !year) {
            return NextResponse.json({ error: 'Email and year parameters are required' }, { status: 400 });
        }
        const college_id = email.slice(0, 7)

        // Connect to MongoDB
        const client = await getMongoClient();
        const db = client.db('student_store');

        // Find user by email
        const user = await db.collection(year).findOne({ id: college_id});
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Remove sensitive information before sending response
        const { ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);

    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}