// pages/profile/[year].js
import { useRouter } from "next/router";

export default function ProfileYear() {
  const router = useRouter();
  const { year } = router.query;

  return <h1>Hello</h1>;
}
