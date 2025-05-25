import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { auth } from "./utils/validate";

export default function App() {
  let storeToken = useSelector((state) => state.user.accessToken);
  let dupl = useSelector((state) => state);
  console.log("dupl", dupl);
  let navigate = useNavigate();

  useEffect(() => {
    //   let user = localStorage.getItem("accessToken");
    //   console.log("user", user);
    //   console.log("user token", auth.currentUser.accessToken);
    //   console.log(user == auth.currentUser.accessToken);
    //   // if (user == storeToken) navigate("browse");
    //   // else navigate("/");
    // console.log(auth.currentUser?.accessToken);
    if (auth?.currentUser?.accessToken == null) navigate("/");
  }, []);

  return (
    <div className="App">
      <h2>App</h2>
      <Link to="/">Logout</Link>
    </div>
  );
}
