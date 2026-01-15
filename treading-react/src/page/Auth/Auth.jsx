import { Button } from "@/components/ui";
import "./Auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Center box with blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      flex flex-col justify-center items-center h-[35rem] w-[30rem] 
                      rounded-2xl z-50 bg-black/40 backdrop-blur-lg shadow-2xl border border-white/20 p-8">

        <h1 className="text-5xl font-bold pb-9 text-white">Crypto Trading</h1>

        {location.pathname === "/signup" ? (
          <section className="w-full">
            <SignupForm />
            <div className="flex items-center justify-center mt-4 text-white">
              <span>Already have an account?</span>
              <Button onClick={() => navigate("/signin")} variant="ghost">
                Sign In
              </Button>
            </div>
          </section>
        ) : location.pathname === "/forgot-password" ? (
          <section className="w-full">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center mt-4 text-white">
              <span>Back to login?</span>
              <Button onClick={() => navigate("/signin")} variant="ghost">
                Sign In
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <SigninForm />
            <div className="flex items-center justify-center mt-4 text-white">
              <span>Don't have an account?</span>
              <Button onClick={() => navigate("/signup")} variant="ghost">
                Sign Up
              </Button>
            </div>

            <div className="mt-4">
              <Button
                className="w-full py-5"
                onClick={() => navigate("/forgot-password")}
                variant="outline"
              >
                Forgot Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Auth;
