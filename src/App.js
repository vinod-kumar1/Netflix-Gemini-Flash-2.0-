import { useEffect } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";

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

  function logOut() {
    signOutUser()
      .then(() => {
        console.log("User SignedOut");
      })
      .catch(console.log);
  }

  return (
    <div className="App">
      <h2>App</h2>
      <button
        onClick={logOut}
        className="bg-red-800 text-white px-2 py1 rounded-sm cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
