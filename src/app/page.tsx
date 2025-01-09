import { Header } from "@/components/Header/Header";
import { getUser } from "@/lib/dal/queries/users";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <Header />
      <div className="p-8">
        <h2 className="mb-4">Home Page</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
}
