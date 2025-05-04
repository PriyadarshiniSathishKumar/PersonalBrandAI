import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const [_, setLocation] = useLocation();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await signIn();
      if (user) {
        setLocation("/");
      }
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-white text-2xl font-bold mb-4">
            PB
          </div>
          <h1 className="text-2xl font-bold">Welcome to Personal Brand OS</h1>
          <p className="text-gray-600 mt-2">Your AI-powered brand management platform</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <SiGoogle className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          
          <p className="text-center text-sm text-gray-500 mt-6">
            By signing in, you agree to our
            <a href="#" className="text-primary hover:underline"> Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}