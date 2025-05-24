import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="login-page bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_medium.jpg)] bg-cover h-[100vh] overflow-hidden flex justify-center">
      <h2 className="text-red-600 text-4xl relative left-2 top-8 underline">
        Netflix gpt
      </h2>
      <form
        action=""
        className="z-1 text-white flex-col bg-black/80 p-4 py-20 h-max relative top-40 w-[600px] items-center flex gap-4 -translate-x-20"
      >
        <h4 className="text-2xl -translate-y-10">Sign in</h4>
        <input
          type="email"
          placeholder="email"
          className="bg-gray-500 px-2 rounded-t-md  w-[60%] py-1"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-500 px-2 rounded-b-md py-1 w-[60%]"
        />
        <button
          type="submit"
          className="bg-red-900 hover:cursor-pointer px-4 py-1 rounded-sm "
        >
          Sign in
        </button>
        <Link to="/" className="underline hover:text-red-600 translate-y-4">
          Sign Up
        </Link>
      </form>
    </div>
  );
}
