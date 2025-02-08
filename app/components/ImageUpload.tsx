'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setIsLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isLoading}
      />
      
      {isLoading && <p>Uploading...</p>}
      
      {imageUrl && (
        <div className="mt-4">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}