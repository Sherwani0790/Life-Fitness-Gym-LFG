import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/src/UI-Components/button";
import { Input } from "@/src/UI-Components/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/UI-Components/card";
import { Logo } from "@/src/components/Logo";
import { apiKB } from "@/src/services/api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handleSubmit API Integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);

    // Hardcoded login for now
    if (username === "director" && password === "Login@786") {
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userName", username);
      sessionStorage.setItem("userRole", JSON.stringify(["admin"]));
      navigate("/", { replace: true });
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);

    /*
    try {
      const response = await apiKB.post("login/billing", {
        username,
        password,
      });
      const data = response.data;
      if (response.status === 200 && data.message === "Login successfull.") {
        // Store user info in sessionStorage
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", username);
        sessionStorage.setItem("userRole", JSON.stringify(data.data || []));
        // onLoginSuccess(); // Not defined in current App structure, removing for now or could be added if needed
        navigate("/", { replace: true });
      } else if (data.message === "Authentication failed") {
        setError("Invalid username or password.");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? "Invalid username or password."
          : error.response?.data?.message ||
            "Authentication failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="border-border shadow-xl">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Logo className="h-16 w-16" showText={false} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Life Fitness Gym LFG
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Manage your fitness journey with LFG
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  User Name
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                  className={error && !username ? "border-destructive" : ""}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={error && !password ? "border-destructive" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-destructive text-sm font-medium">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* <div className="mt-8 pt-6 border-t border-border flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider"> */}
            {/* <span>Admin: director / Login@786</span> */}
            {/* </div> */}
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm">
            <p className="text-xs text-muted-foreground/70 m-0">
              &copy; {new Date().getFullYear()} Life Fitness Gym. All rights
              reserved.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
