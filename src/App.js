import { useEffect } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";
import MoviesPage from "./Components/MoviesPage";

export default function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
  return (
    <div>
      <div
        className="bg-gradient-to-b z-10 sticky w-screen 
from-black flex justify-between px-4 py-4"
      >
        <h2 className="text-5xl text-red-600 hover:underline">Netflix'GPT</h2>
        <div className="flex gap-1 relative top-2 -translate-y-3">
          <img
            className="h-8 rounded-md"
            src="https://avatars.githubusercontent.com/u/101015037?v=4"
            alt="user-icon"
          />
          <button
            onClick={logOut}
            className="bg-red-800 border-white border-[0.5px] text-white px-2 h-max py-0.5 ml-1  hover:bg-white hover:text-red-600 rounded-sm cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="container">
        <MoviesPage />
      </div>
    </div>
  );
}
