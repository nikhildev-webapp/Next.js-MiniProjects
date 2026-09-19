import Image from "next/image";
import profileImage from "../img/image.png";

export const ProfileCard = () => {
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-center shadow-2xl shadow-cyan-950/40">
      <div className="relative h-56 w-full">
        <Image
          src={profileImage}
          alt="Goku powering up"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-cyan-200/30 bg-cyan-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
          Available
        </span>
      </div>

      <div className="relative px-6 pb-7">
        <div className="-mt-12 mb-4 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-cyan-400 text-3xl font-black text-slate-950 shadow-lg shadow-cyan-400/30">
            G
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white">Son Goku</h1>
        <p className="mt-1 text-sm font-medium text-cyan-300">@goku_power</p>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-slate-400">
          Saiyan warrior, martial artist, and lifelong student. Always ready for
          the next challenge.
        </p>

        <div className="my-6 grid grid-cols-3 divide-x divide-slate-700 border-y border-slate-700 py-4">
          <div>
            <p className="text-lg font-bold text-white">1.2K</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">Posts</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">48.6K</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">342</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">Following</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Follow
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl border border-slate-600 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Message
          </button>
        </div>
      </div>
    </article>
  );
};
