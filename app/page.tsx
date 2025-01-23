import Image from "next/image";
import Hello from "@/app/components/hello";
import { LoginButton, SignupButton } from "@/components/AuthButtons";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <LoginButton />
      <SignupButton />
    </div>
  );
}
