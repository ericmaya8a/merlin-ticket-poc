import { Header } from "@/components/Header/Header";

export default async function Home() {
  const result = await fetch("http://localhost:3000/api/user");
  const user = await result.json();

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
