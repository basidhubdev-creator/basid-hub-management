import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand opacity-90" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent shadow-lg">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">ShopFlow</h1>
              <p className="text-sm text-primary-foreground/70">Phone Shop Manager</p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-primary-foreground leading-tight mb-6">
              Manage your phone business with confidence
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Complete inventory, sales, repairs, and investor management – all in one powerful platform built for Nigerian businesses.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "Inventory & POS",
                "Repair Tracking",
                "Investor Portal",
                "NGN & Multi-currency",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-primary-foreground/90"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-primary-foreground/50">
            © 2024 ShopFlow. Built for Nigerian entrepreneurs.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent shadow-lg">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ShopFlow</h1>
              <p className="text-xs text-muted-foreground">Phone Shop Manager</p>
            </div>
          </div>

          <Card className="border-border/50 shadow-card">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or Phone</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="you@example.com"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => navigate("/investor/login")}
              >
                Sign in as Investor
              </Button>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="text-accent hover:text-accent/80 font-medium transition-colors">
              Contact admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
