// import { useEffect, useState } from "react";
// import { auth, signOutUser } from "./utils/validate";
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { removeUser } from "./utils/userDetails";
// import GeminiSearch from "./Components/GeminiSearch";
// import MoviesPage from "./Components/MoviesPage";

// export default function App() {
//   let dispatch = useDispatch();
//   let navigate = useNavigate();
//   let [Gemini, setGemini] = useState(false);
//   let photo = useSelector((state) => state.user.profile_photo);
//   let [alert, setAlert] = useState(true);

//   useEffect(() => {
//     let unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate("/");
//         dispatch(removeUser());
//       }
//     });
//     // unsubscribe when comp unmounts in same session
//     return () => unsub();
//   }, []);

//   let logOut = () => signOutUser().catch(console.log);

//   useEffect(() => {
//     setTimeout(() => {
//       setAlert(false);
//     }, [5000]);
//     return () => setAlert(false);
//   }, []);

//   return (
//     <div className="h-max">
//       {alert && (
//         <i className="w-screen z-9999 bg-amber-200 absolute top-0">
//           ℹ Please refresh the page if the movies doesn't load. API might've hit
//           the rate limit
//         </i>
//       )}
//       <button
//         className="absolute sm:w-max z-1000 py-1 bg-gradient-to-r from-white to-50% to-red-900 px-4 top-20 sm:right-40 sm:top-5 rounded-md cursor-pointer"
//         onClick={() => setGemini((p) => !p)}
//       >
//         Gemini Search
//       </button>
//       <div>
//         <div className="z-999 bg-gradient-to-b from-black to-trasparent sticky w-screen flex-col flex items-center px-4 py-4 h-30">
//           <h2 className="bg-gradient-to-r sm:absolute sm:top-5 from-red-700 to-red-500 bg-clip-text text-transparent text-4xl font-serif  hover:underline">
//             NETFLIX
//           </h2>
//           <div className="flex gap-1 relative sm:-top-3 justify-end w-full top-10 -translate-y-3">
//             <img className="h-8 rounded-md" src={photo} alt="user-icon" />
//             <button
//               onClick={logOut}
//               className="bg-red-800 border-white text-white px-2 h-max py-0.5 ml-1 hover:bg-white hover:text-red-600 rounded-sm cursor-pointer"
//             >
//               Sign out
//             </button>
//           </div>
//         </div>
//         {Gemini ? <GeminiSearch setGemini={setGemini} /> : <MoviesPage />}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { auth, signOutUser } from "./utils/validate";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "./utils/userDetails";
import GeminiSearch from "./Components/GeminiSearch";
import MoviesPage from "./Components/MoviesPage";

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
    <div className="min-h-screen bg-black text-white relative">
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
            className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-white to-red-900 text-black font-medium rounded-md hover:opacity-90 transition"
            onClick={() => setGemini((prev) => !prev)}
          >
            Gemini Search
          </button>
        </div>
      </header>

      {/* Gemini button on mobile (fixed bottom) */}
      <button
        className="sm:hidden fixed bottom-6 right-6 z-50 px-4 py-2 bg-gradient-to-r from-white to-red-900 text-black font-medium rounded-md shadow hover:opacity-90 transition"
        onClick={() => setGemini((prev) => !prev)}
      >
        Gemini Search
      </button>

      {/* Page content */}
      <main className="p-4">
        {Gemini ? <GeminiSearch setGemini={setGemini} /> : <MoviesPage />}
      </main>
    </div>
  );
}
