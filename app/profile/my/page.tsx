'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

import { FaCamera } from 'react-icons/fa';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  image: string;
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}`);
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
    if (!file || !userProfile?._id) return;

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', userProfile._id);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(prev => prev ? { ...prev, image: data.imageUrl } : null);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = () => {
    router.push('/');  // Redirect to home page
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
        <div className="backdrop-blur-sm bg-white/5 p-8 rounded-lg border border-white/10 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div
              className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-white/20 group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={userProfile?.image || session.user?.image || '/default-avatar.png'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
            <h1 className="text-3xl font-light text-white mb-2">
              {userProfile?.name || session.user?.name}
            </h1>
            <p className="text-gray-400 mb-2">
              {session.user?.email}
            </p>
            {userProfile && (
              <div className="flex justify-center gap-4 text-sm text-gray-400">
                <span>ID: {userProfile.id}</span>
                <span>•</span>
                <span>Year: {userProfile.year}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {userProfile?.bio && (
              <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
                <h2 className="text-white text-lg mb-3">Bio</h2>
                <p className="text-gray-300 leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>
            )}

            <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
              <h2 className="text-white text-lg mb-3">Account Information</h2>
              <div className="space-y-2 text-gray-300">
                <p>Member since: {new Date().toLocaleDateString()}</p>
                <p>Status: Active</p>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-black/20 p-6 rounded-lg">
              <h2 className="text-white text-lg mb-3">Quick Actions</h2>
              <div className="grid grid-cols-3 gap-4">
                <button className="text-sm bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded transition-colors">
                  Edit Profile
                </button>
                <button className="text-sm bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded transition-colors">
                  Settings
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm bg-green-500/20 hover:bg-green-500/30 text-white py-3 px-4 rounded transition-colors"
                >
                  Save & Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
