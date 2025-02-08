// // app/api/cloudinary/upload/route.ts
// import { v2 as cloudinary } from 'cloudinary';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export async function POST(request: Request) {
//   try {
//     // Check authentication
//     const session = await getServerSession(authOptions);
    
//     if (!session || !session.user) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }
//     // Parse the form data first
//     let formData;
//     console.log(request)
//     try {
//       formData = await request.formData();
//     } catch (error) {
//       console.log('formdata not able to parse')
//       return NextResponse.json(
//         { error: 'Failed to parse form data' },
//         { status: 400 }
//       );
//     }

//     // Get form data from request
//     const file = formData.get('file') as File;
//     const userId = formData.get('userId') as string;

//     // Verify that the user is uploading their own image
//     if (!userId) {
//       console.log('User ID is not provided')
//       return NextResponse.json(
//         { error: 'User ID is required' },
//         { status: 400 }
//       );
//     }

//     // You might want to add additional verification here to ensure
//     // the userId matches the authenticated user's ID

//     if (!file) {
//       console.log('File is not provided')
//       return NextResponse.json(
//         { error: 'No file provided' },
//         { status: 400 }
//       );
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Upload to Cloudinary with user-specific folder
//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         {
//           folder: `user-profiles/${userId}`, // Organize by user ID
//           public_id: `profile_${Date.now()}`, // Unique identifier for each upload
//           overwrite: true,
//           resource_type: 'auto',
//           allowed_formats: ['jpg', 'png', 'gif', 'webp'], // Restrict file types
//           max_file_size: 5000000, // 5MB limit
//         },
//         (error, result) => {
//           if (error) reject(error);
//           resolve(result);
//         }
//       ).end(buffer);
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Error in upload:', error);
//     return NextResponse.json(
//       { error: 'Failed to upload image' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'File and userId are required' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileStr = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'profile-pictures',
      public_id: `user_${userId}`,
      overwrite: true,
      allowed_formats: ['jpg', 'png', 'gif', 'webp'],
      transformation: [
      { width: 200, height: 200, crop: 'fill' },
      { quality: 'auto' },
      ]
    });

    // Connect to MongoDB and update the user's image URL
    const year = '20' + userId.slice(2, 4);
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('student_store');
    const usersCollection = db.collection(year);

    await usersCollection.updateOne(
      { id: (userId) },
      { $set: { profile_pic: uploadResponse.secure_url } }
    );

    await client.close();

    return NextResponse.json({ 
      url: uploadResponse.secure_url,
      message: 'Image uploaded successfully' 
    });

  } catch (error) {
    console.error('Error in /api/cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}