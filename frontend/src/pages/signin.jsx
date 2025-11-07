import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/img/logo.svg";
import "../index.css";

function Signin() {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Handles actual sign-in request
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/hello/signin", {
        username,
        password,
      });

      // If login is successful
      if (response.status === 200) {
        setAuthentication(true);
        localStorage.setItem("employee_id", response.data.employee_id);
        localStorage.setItem("position", response.data.position);
        alert(String(localStorage.getItem("position")))
        navigate("/test")
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleSignout = () => {
    setAuthentication(false);
    localStorage.removeItem("employee_id");
  };

  return (
    <div className="header finisher-header min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-sm bg-white shadow-lg">
        <div className="card-body space-y-2">
          <div className="flex items-center pl-5 gap-2">
            <img
              src={logo}
              className="w-20 h-20 grayscale contrast-200"
              alt="logo"
            />
            <h1 className="text-5xl font-bold text-black inter">Sentrix</h1>
          </div>

          <p className="text-sm text-black/60">
            Sign in to continue to your account.
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="input input-bordered w-full border-black focus:border-black focus:ring-black text-black bg-white"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full border-black focus:border-black focus:ring-black text-black bg-white"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="checkbox border-black"
                />
                <span className="text-black/60">Show Password</span>
              </label>
              <a
                href="#"
                className="link link-hover text-black/60 hover:text-black underline"
              >
                Forgot?
              </a>
            </div>

            <div className="form-control mt-2 flex gap-3 flex-col">
              <button
                type="submit"
                className="btn w-full bg-black text-white border-none hover:bg-gray-900"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleSignout}
                className="btn w-full bg-black text-white border-none hover:bg-gray-900"
              >
                Signout
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-black/40">
            Don’t have an account?{" "}
            <a href="#" className="link text-black hover:underline">
              Create
            </a>
          </div>

          <div className="text-xs text-center mt-2 text-black/40">
            Authenticated: <b>{String(isAuthenticated)}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
