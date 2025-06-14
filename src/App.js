import { useEffect, useState } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";
// import GeminiSearch from "./Components/GeminiSearch";
import MoviesPage from "./Components/MoviesPage";
import GeminiSearch from "./Components/GeminiSearch";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Gemini, setGemini] = useState(false);
  const photo = useSelector((state) => state.user.profile_photo);
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        dispatch(removeUser());
      }
    });
    return () => unsub();
  }, []);

  const logOut = () => signOutUser().catch(console.log);

  useEffect(() => {
    const timeout = setTimeout(() => setAlert(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=" min-h-screen bg-black text-white relative">
      {/* Alert Bar */}
      {alert && (
        <div className="w-full bg-amber-200 text-black p-2 text-sm text-center fixed top-0 z-50">
          ℹ Please refresh the page if the movies don't load. API might've hit
          the rate limit.
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-black via-transparent px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}

        <h2 className="text-3xl font-serif bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent hover:underline">
          NETFLIX
        </h2>
        {/* Right: user controls + Gemini (on desktop) */}
        <div className="flex items-center gap-2">
          {photo && (
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={photo}
              alt="user"
            />
          )}
          <button
            onClick={logOut}
            className="bg-red-700 hover:bg-white hover:text-red-700 text-white text-sm px-3 py-1 rounded transition-colors"
          >
            Sign out
          </button>

          {/* Gemini button on sm+ screens */}
          <button
            className="inline-block cursor-pointer px-4 py-2 bg-gradient-to-r from-white to-red-900 text-black font-medium rounded-md hover:opacity-90 transition"
            onClick={() => setGemini((prev) => !prev)}
          >
            Gemini Search
          </button>
        </div>
      </header>
      {/* Gemini button on mobile (fixed bottom) */}
      <button
        className="cursor-pointer sm:hidden fixed bottom-6 right-6 z-50 px-4 py-2 bg-gradient-to-r from-white to-red-900 text-black font-medium rounded-md shadow hover:opacity-90 transition"
        onClick={() => setGemini((prev) => !prev)}
      >
        Gemini Search
      </button>

      {!Gemini ? <MoviesPage /> : <GeminiSearch setGemini={setGemini} />}
    </div>
  );
}
