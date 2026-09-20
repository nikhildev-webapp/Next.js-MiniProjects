"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserCards = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users",);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load users",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  if (error) {
    return (
      <p className="mx-auto w-full max-w-7xl px-4 py-8 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-semibold uppercase tracking-wide text-gray-500 sm:text-4xl">
        User Cards
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <div key={user.id} className="h-full rounded-lg border border-gray-200 bg-gray p-6 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-400">
                <span className="font-semibold text-white">Name:</span>{user.name}
              </h2>
              <p className="mt-2 wrap-break-word text-sm text-gray-400">
               <span className="font-semibold text-white">Email:</span>{user.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default UserCards;
