import { useEffect, useState } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";
import GeminiSearch from "./Components/GeminiSearch";
import MoviesPage from "./Components/MoviesPage";

export default function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [Gemini, setGemini] = useState(false);
  let photo = useSelector((state) => state.user.profile_photo);
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    let unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        dispatch(removeUser());
      }
    });
    // unsubscribe when comp unmounts in same session
    return () => unsub();
  }, []);

  let logOut = () => signOutUser().catch(console.log);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, [5000]);
    return () => setAlert(false);
  }, []);

  return (
    <div className="h-40">
      {alert && (
        <i className="w-screen z-9999 bg-amber-200 absolute top-0">
          ℹ Please refresh the page if the movies doesn't load. API might've hit
          the rate limit
        </i>
      )}
      <button
        className="absolute z-1000 py-1 bg-gradient-to-r from-white to-50% to-red-900 px-4 top-5 rounded-md cursor-pointer right-40"
        onClick={() => setGemini((p) => !p)}
      >
        Gemini Search
      </button>
      <div>
        <div className="z-999  bg-gradient-to-b from-black to-trasparent sticky w-screen flex justify-between px-4 py-4 h-30">
          <h2 className="bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent text-4xl font-serif  hover:underline">
            NETFLIX
          </h2>
          <div className="flex gap-1 relative top-4 -translate-y-3">
            <img className="h-8 rounded-md" src={photo} alt="user-icon" />
            <button
              onClick={logOut}
              className="bg-red-800 border-white text-white px-2 h-max py-0.5 ml-1 hover:bg-white hover:text-red-600 rounded-sm cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
        {Gemini ? <GeminiSearch setGemini={setGemini} /> : <MoviesPage />}
      </div>
    </div>
  );
}
