'use client';

import { useState } from "react";

type GithubUser = {
  avatar_url: string;
  name: string | null;
  login: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export default function GithubSearch() {
  const [searchUser, setSearchUser] = useState('');
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchUser.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${searchUser}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data: GithubUser = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 font-semibold min-h-screen p-4 text-white">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h3 className="text-white font-semibold text-2xl uppercase tracking-wider">Github User Finder</h3>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex justify-center items-center mt-4 gap-2">
        <input
          type="text"
          placeholder="Search User"
          className="bg-gray-700 text-white p-2 rounded-md w-1/3 border border-gray-600 outline-none placeholder:font-bold placeholder:text-gray-400"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors uppercase text-sm font-bold"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Status Messages */}
      <div className="flex justify-center mt-6">
        {loading && <p className="text-blue-400 animate-pulse">Loading profile...</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>

      {/* User Profile Card */}
      {userData && (
        <div className="flex justify-center mt-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-sm w-full border border-gray-700 normal-case">
            <div className="flex flex-col items-center">
              <img
                src={userData.avatar_url}
                alt={userData.name ?? userData.login}
                className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4"
              />
              <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline text-sm mb-4"
              >
                @{userData.login}
              </a>

              {userData.bio && (
                <p className="text-gray-400 text-center text-sm mb-4 italic">
                  "{userData.bio}"
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 text-center w-full border-t border-gray-700 pt-4 text-xs uppercase tracking-wide">
                <div>
                  <p className="text-gray-400">Repos</p>
                  <p className="text-lg font-bold text-white">{userData.public_repos}</p>
                </div>
                <div>
                  <p className="text-gray-400">Followers</p>
                  <p className="text-lg font-bold text-white">{userData.followers}</p>
                </div>
                <div>
                  <p className="text-gray-400">Following</p>
                  <p className="text-lg font-bold text-white">{userData.following}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
