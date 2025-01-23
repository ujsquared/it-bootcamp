"use client"

import { useState } from "react"
import Image from "next/image"

const MemberCard = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`bg-white border border-black p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isExpanded ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`bg-white p-4 rounded-lg ${isExpanded ? "max-w-md w-full" : ""}`}>
        <Image
          src={member.image || "/default-avatar.png"}
          alt={member.name}
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-center mb-2">{member.name}</h2>
        {isExpanded && (
          <div>
            <h3 className="font-semibold mt-4 mb-2">Hobbies:</h3>
            <ul className="list-disc list-inside">
              {member.hobbies?.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberCard

