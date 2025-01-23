export default function ProfilePage({
  params,
}: {
  params: { year: string; id: string };
}) {
  return (
    <div>
      <h1>
        Profile for year: {params.year}, ID: {params.id}
      </h1>
    </div>
  );
} 