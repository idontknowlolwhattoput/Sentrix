import { useState } from "react";
import logo from "../assets/img/logo.svg"
import { useAuth } from "../context/AuthProvider";

import "../index.css"

function Signin({ onLogin }) {
    const [authenticated, setAuthentication] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        setError("");
   
        if (onLogin) {
            onLogin({ email, password, remember });
        }
    };

    const handleTest = (e) => {
       setAuthentication(!authenticated)
       alert(localStorage.getItem("auth"))
    }

    return (
        <div className="header finisher-header min-h-screen  flex items-center justify-center p-4">
            <div className="card w-full max-w-sm bg-white shadow-lg  ">
                <div className="card-body space-y-2">
                   <div className="flex items-center pl-5 gap-2">
                     <img src={logo} className="w-20 h-20 grayscale contrast-200" alt="logo"/>
                     <h1 className="text-5xl font-bold text-black inter">Sentrix</h1>
                   </div>
                <div className="flex items-center gap-3"></div>

                <p className="text-sm text-black/60">Sign in to continue to your account.</p>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Email</span>
                    </label>
                    <input
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
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
                    <a href="#" className="link link-hover text-black/60 hover:text-black underline">Forgot?</a>
                    </div>

                    <div className="form-control mt-2 flex gap-3 flex-col">
                    <button
                        type="submit"
                        className="btn w-full bg-black text-white border-none hover:bg-gray-900"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={handleTest}
                        className="btn w-full bg-black text-white border-none hover:bg-gray-900"
                    >
                        Test
                    </button>
                    </div>
                </form>

                <div className="text-center text-xs text-black/40">
                    Don’t have an account? <a href="#" className="link text-black hover:underline">Create</a>
                </div>
    
                </div>
            </div>
        </div>  
    );
}

export default Signin;
