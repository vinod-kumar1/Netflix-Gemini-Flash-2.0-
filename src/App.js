import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function App() {
  let storeToken = useSelector((state) => state.user.accessToken);
  let dupl = useSelector((state) => state);
  console.log("dupl", dupl);
  let navigate = useNavigate();

  useEffect(() => {
    // let user = localStorage.getItem("accessToken");
    // if (user == storeToken) navigate("browse");
    // else navigate("/");

    return () => navigate("/");
  }, []);

  return <div className="App">App</div>;
}
