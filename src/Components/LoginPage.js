import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { validateRegex } from "../utils/validate";
import { useNavigate } from "react-router";

export default function LoginPage() {
  let formData = useRef(null);
  let navigate = useNavigate();
  let [error, setError] = useState({ isTrue: false, message: "" });
  let [signIn, setSignIn] = useState(true);

  useEffect(() => {
    if (signIn) navigate("/");
  }, [signIn]);

  function validateForm(e) {
    e.preventDefault();
    if (signIn) {
      let email = "";
      let password = "";

      Array.from(formData.current.elements).forEach((ele) => {
        if (ele.name == "email") email = ele.value;
        if (ele.name == "password") password = ele.value;
      });
      let checkValid = validateRegex(email, password);
      console.log("message", checkValid);
      if (checkValid == true) navigate("/browse");
      else setError({ isTrue: true, message: checkValid });
    } else {
    }
  }

  return (
    <div className="login-page bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_medium.jpg)] bg-cover min-h-screen overflow-hidden flex justify-center">
      <h2 className=" text-red-600 text-4xl relative left-2 top-8 underline">
        Netflix gpt
      </h2>
      <form
        name="login-form"
        ref={formData}
        className="z-1 text-white flex-col bg-black/80 p-4 py-20 h-max relative top-40 w-[600px] items-center flex gap-4 -translate-x-20"
      >
        <h4 className="text-2xl -translate-y-10">
          {signIn ? "Sign in" : "Sign Up"}
        </h4>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          className="bg-gray-500 px-2 rounded-t-md  w-[60%] py-1"
        />
        <input
          type="email"
          placeholder="email"
          value={"vinu22149@gmail.com"}
          name="email"
          className="bg-gray-500 px-2 rounded-t-md  w-[60%] py-1"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="bg-gray-500 px-2 rounded-b-md py-1 w-[60%]"
        />
        {!signIn && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="bg-gray-500 px-2 rounded-b-md py-1 w-[60%]"
          />
        )}
        <button
          onClick={validateForm}
          className="bg-red-900 hover:cursor-pointer px-4 py-1 rounded-sm "
        >
          {signIn ? "Sign In" : "Sign Up"}
        </button>
        <Link
          to="?signup"
          className="underline"
          onClick={() => setSignIn((p) => !p)}
        >
          {signIn ? "Sign Up" : "Sign In"}
        </Link>
        {error.isTrue && (
          <i className="text-red-700">Invalid input! {error.message}</i>
        )}
      </form>
    </div>
  );
}
