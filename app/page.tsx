'use client';
import { getUsers } from "@/server/server";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Home() {
  const query = useQuery({ queryKey: ["users"], queryFn: getUsers });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const { data } = query;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Tanstack Query</h1>
      <div className="flex flex-col gap-4">
        {data.map((user : User) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
