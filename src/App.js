import { useEffect } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";
import { updateProfile } from "firebase/auth";

export default function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        dispatch(removeUser());
      }
    });
  }, []);

  let logOut = () =>
    signOutUser()
      .then(() => console.log("success"))
      .catch(console.log);
  return (
    <div className="bg-gradient-to-b z-10 absolute w-screen from-black flex justify-between px-4 py-4">
      <h2 className="text-5xl text-red-600 hover:underline">Netflix'GPT</h2>
      <div className="flex gap-1 relative top-2">
        <img
          className="h-8 rounded-md"
          src="https://avatars.githubusercontent.com/u/101015037?v=4"
          alt="user-icon"
        />
        <button
          onClick={logOut}
          className="bg-red-800 text-white px-2 h-max py-1  hover:bg-white hover:text-red-600 rounded-sm cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
