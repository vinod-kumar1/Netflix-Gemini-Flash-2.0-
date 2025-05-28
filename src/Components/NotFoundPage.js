import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-[120px] font-extrabold text-red-600 tracking-tight leading-none sm:text-[160px]">
        404
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-400 text-center max-w-md mb-6">
        The page you're looking for doesn’t exist or has been moved. Don’t worry
        — the show must go on!
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-medium transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
