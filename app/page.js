"use client";

import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div >
        <h1 className="text-white text-6xl m-10">Welcome</h1>

        <button onClick={() => router.push('/cycling/dashboard')} type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Open Dashboard
        </button>

        <button onClick={() => router.push('/cycling/station/list')} type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Open Station List
        </button>

      </div>
    </main>
  );
}
