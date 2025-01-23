"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name || "")
  const [hobbies, setHobbies] = useState(user.hobbies?.join(", ") || "")
  const [image, setImage] = useState(user.image || "")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hobbies: hobbies.split(",").map((h) => h.trim()), image }),
    })
    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-black rounded"
        />
      </div>
      <div>
        <label htmlFor="hobbies" className="block mb-2">
          Hobbies (comma-separated):
        </label>
        <input
          type="text"
          id="hobbies"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          className="w-full p-2 border border-black rounded"
        />
      </div>
      <div>
        <label htmlFor="image" className="block mb-2">
          Profile Image URL:
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border border-black rounded"
        />
      </div>
      {image && (
        <Image src={image || "/placeholder.svg"} alt="Profile" width={100} height={100} className="rounded-full" />
      )}
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </form>
  )
}

export default ProfileForm

