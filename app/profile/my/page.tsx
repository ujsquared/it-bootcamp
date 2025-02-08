'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  id: string;
  year: string;
  bio: string;
}

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.user?.email) {
        try {
          const year = '20' + session.user?.email?.slice(2, 4);
          const response = await fetch(`/api/user?email=${session.user.email}&year=${year}`);
          if (response.ok) {
            const data = await response.json();
            setUserProfile(data);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile?.id) return;

    try {
      // Create FormData to send the image
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userProfile.id);

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      // Update the userProfile state with the new image URL
      setUserProfile(prev => prev ? { ...prev, image: data.url } : null);

    } catch (error) {
      console.error('Error uploading image:', error);
      // You might want to add some error handling UI here
    }
  };

  const handleUpdateBio = async () => {
    if (!userProfile?.id) return;

    try {
      const response = await fetch(`/api/user/update/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userProfile.id,
          bio: editedBio,
        }),
      });

      if (response.ok) {
        setUserProfile(prev => prev ? { ...prev, bio: editedBio } : null);
        setIsEditingBio(false);
      }
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };


  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }
  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-6">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 cursor-pointer"
              onClick={handleImageClick}
            >
              <CldImage
                src={userProfile?.profile_pic || 'default-pfp' }
                alt="Profile picture"
                width={128}
                height={128}
                className="object-fill"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-2xl" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            {/* Rest of the component remains the same */}
            <div className="type-animation font-['Press_Start_2P'] text-xl text-white">
              {userProfile?.name || session.user?.name}
            </div>
            <div className="type-animation delay-1 font-['Press_Start_2P'] text-xs text-gray-400">
              {session.user?.email}
            </div>
            {userProfile && (
              <div className="flex justify-center gap-4 font-['Press_Start_2P'] text-xs text-gray-400">
                <span className="type-animation delay-2">ID: {userProfile.id}</span>
                <span>•</span>
                <span className="type-animation delay-2">Year: {userProfile.year}</span>
              </div>
            )}
          </div>
          <div className='text-sm'>
            {isEditingBio ? (
              <div className="space-y-4">
                <h2 className="type-animation delay-3 font-['Press_Start_2P'] text-sm text-white">Edit Bio</h2>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full h-32 bg-white/5 text-white p-3 text-xs font-['Press_Start_2P'] resize-none"
                  placeholder="Write your bio here..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateBio}
                    className="font-['Press_Start_2P'] text-xs bg-green-500/40 hover:bg-green-500/30 text-white py-2 px-4 transition-colors"
                  >
                    Save Bio
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="font-['Press_Start_2P'] text-xs bg-red-500/40 hover:bg-red-500/30 text-white py-2 px-4 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              userProfile?.bio && (
                <div className="space-y-4">
                  <h2 className="type-animation delay-3 font-['Press_Start_2P'] text-sm text-white">Bio</h2>
                  <p className="type-animation delay-3 font-['Press_Start_2P'] text-xs text-gray-300 leading-relaxed">
                    {userProfile.bio}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="space-y-4">
            <h2 className="type-animation delay-4 font-['Press_Start_2P'] text-sm text-white">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => {
                  setIsEditingBio(true);
                  setEditedBio(userProfile?.bio || '');
                }}
                className="font-['Press_Start_2P'] text-xs bg-white/5 hover:bg-white/10 text-white py-3 px-4 transition-colors"
              >
                Edit Bio
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}