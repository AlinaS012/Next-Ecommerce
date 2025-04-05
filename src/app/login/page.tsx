"use client";

import { redirect, useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useSupabase from "@/hooks/useSupabase";
import { SupabaseClient } from "@supabase/supabase-js";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const router = useRouter();

  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  })
  const supabase = useSupabase();
  const [mode, setMode] = useState(MODE.LOGIN);

  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  console.log(emailCode)
  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify";

  useEffect(() => {
    if (message) {
      setError("")
    }
    if (error) {
      setMessage("")
    }
  }, [message, error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // let response;
      switch (mode) {
        case MODE.LOGIN:
          if (!email || !password) {
            return;
          }
          const { data: loginData, error: loginError } = await (supabase as SupabaseClient).auth.signInWithPassword({
            email: email,
            password: password
          });
          console.log(loginError, "loginError")
          if (loginError) {
            setError(loginError.message);
            return;
          } else {
            // response = loginData.session;
            console.log(loginData, "loginData")
            localStorage.setItem("token", loginData.session?.access_token as string)
            redirect('/')
          }
          break;

        case MODE.REGISTER:
          if (!email || !password) {
            return;
          }
          const { data: registerData, error: registerError } = await (supabase as SupabaseClient).auth.signUp({
            email: email,
            password: password
          });
          if (registerError) {
            setError(registerError.message);
            return;
          }
          console.log(registerData)
          // response = registerData.session;
          setMessage("Signed up successfully, please confirm your email");
          break;

        // case MODE.RESET_PASSWORD:
        //   let { data: resetData, error: resetError } = await (supabase as SupabaseClient).auth.resetPasswordForEmail(email);
        //   if (resetError) {
        //     setError(resetError.message);
        //     return;
        //   }
        //   response = resetData.session;
        //   setMessage("Password reset email sent. Please check your e-mail.");
        //   break;

        // case MODE.EMAIL_VERIFICATION:
        //   let { data: verificationData, error: verificationError } = await (supabase as SupabaseClient).auth.signInWithOtp({
        //     email: email
        //   });
        //   if (verificationError) {
        //     setError(verificationError.message);
        //     return;
        //   }
        //   response = verificationData.session;
        //   break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {/* {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="john"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null} */}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
          // onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}
        <button
          className="bg-black text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have and account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
