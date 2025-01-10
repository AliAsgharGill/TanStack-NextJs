"use client";
import { getUsers } from "@/clients/users";
import { createUser } from "@/server/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Home() {
  const query = useQuery({ queryKey: ["users"], queryFn: getUsers });

  // console.log(data);
  // Uncomment to see the fetched data in the console.  // This is a placeholder and should be replaced with the actual implementation.  // For example, you could use this data to render a list of users in a table or a grid.  // Be sure to handle loading, error states, and empty data appropriately.  // In a real-world application, you would also want to implement pagination, sorting, and filtering.  // This example is intentionally simple to help you get started.

  // You can also use the `useInfiniteQuery` hook for infinite scrolling,
  // or the `usePaginatedQuery` hook for pagination.
  // However, these hooks are beyond the scope of this example and should be used judiciously based on your specific requirements.

  // Here's an example of using the `useInfiniteQuery` hook for infinite scrolling:
  // const { data, hasNextPage, fetchMore } = useInfiniteQuery({
  //   queryKey: ["users"],
  //   queryFn: ({ pageParam = 1 }) => getUsers(pageParam),
  //   getNextPageParam: (lastPage) => {
  // Return the page number of the next page or `null` if there's no more pages.
  // In this example, we assume that the server returns the total number of users in the "total" field.
  //     const { data } = lastPage;
  //     if (!data || data.total <= pageParam * 10) {
  //       return null;
  //     }
  //     return pageParam + 1;
  //   },
  // });

  // Here's an example of using the `usePaginatedQuery` hook for pagination:
  // const { data, hasNextPage, fetchMore } = usePaginatedQuery({
  //   queryKey: ["users"],
  //   queryFn: ({ pageParam = 1 }) => getUsers(pageParam),
  //   getNextPageParam: (lastPage) => {
  // Return the page number of the next page or `null` if there's no more pages.
  // In this example, we assume that the server returns the total number of users in the "total" field.
  //     const { data } = lastPage;
  //     if (!data || data.total <= pageParam * 10) {
  //       return null;
  //     }
  //     return pageParam + 1;
  //   },

  // Optional: Configure the cache settings.
  // For example, you can set the cache time to 5 minutes.
  //   cacheTime: 5 * 60 * 1000,
  // });

  // If you're using the `useInfiniteQuery` hook, uncomment the following lines:
  // if (hasNextPage) {
  //   fetchMore();
  // }

  // If you're using the `usePaginatedQuery` hook, uncomment the following lines:
  // if (hasNextPage) {
  //   fetchMore();
  // }

  // Note: In a real-world application, you would also want to handle loading, error states, and empty data appropriately.
  // This example is intentionally simple to help you get started.
  // For example, you could use the `isLoading`, `isError`, and `data` props to display loading indicators, error messages, or empty data messages.
  // Additionally, you could implement pagination, sorting, and filtering using the `pageParam`, `hasNextPage`, and `fetchMore` props.

  // You can also use the `useQuery` hook to fetch data without the need for a query key.
  // For example, you could use this hook to fetch data that doesn't require any parameters.
  // Be sure to handle loading, error states, and empty data appropriately.
  // In a real-world application, you would want to implement caching, error handling, and pagination as needed.
  // This example is intentionally simple to help you get started.
  // For example, you could use the `useQuery` hook to fetch data from a remote API and display it in a list.
  // Be sure to handle loading, error states, and empty data appropriately.

  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => createUser(newUser),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Clear the form inputs here
    },
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  const { data } = query;

  if (!data) {
    return <div>No users found.</div>;
  }

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Tanstack Query</h1>
      <div className="flex flex-col gap-4">
        <button onClick={() => mutation.mutate({ name: "John Doe", username: "johndoe", email: "johndoe@example.com" })}>
          Create User
        </button>
        {data.map((user: User) => (
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
