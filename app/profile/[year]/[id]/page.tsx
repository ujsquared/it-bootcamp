'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { use } from 'react';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  id: string;
  year: string;
  bio: string;
}

export default function ProfilePage({ params }: { params: Promise<{ year: string, id: string }> }) {
  const { year, id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`/api/user?email=${id}&year=${year}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchProfile();
    }
  }, [session, year, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-['Press_Start_2P'] text-white text-sm">Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-['Press_Start_2P'] text-white text-sm">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-6">
            <CldImage
              src={userProfile.profile_pic || 'default-pfp'}
              alt="Profile picture" 
              width={128}
              height={128}
              className="mx-auto rounded-full "
            />
            <h1 className="type-animation font-['Press_Start_2P'] text-xl text-white">
              {userProfile.name}
            </h1>
            <div className="type-animation delay-1 font-['Press_Start_2P'] text-xs text-gray-400">
              {userProfile.email}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="type-animation delay-2 space-y-4">
                <h2 className="font-['Press_Start_2P'] text-lg text-white">Student Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-['Press_Start_2P'] text-sm text-white">Student ID</h3>
                    <p className="font-['Press_Start_2P'] text-xs text-gray-400">{userProfile.id}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-['Press_Start_2P'] text-sm text-white">Year</h3>
                    <p className="font-['Press_Start_2P'] text-xs text-gray-400">{userProfile.year}</p>
                  </div>
                </div>
              </div>

              {userProfile.bio && (
                <div className="type-animation delay-3 space-y-2">
                  <h3 className="font-['Press_Start_2P'] text-sm text-white">Bio</h3>
                  <p className="font-['Press_Start_2P'] text-xs text-gray-300 leading-relaxed">
                    {userProfile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}