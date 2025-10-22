import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGoogle } from "react-icons/si";
import { Package } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginForm() {
  const { loginWithRedirect } = useAuth0();
  console.log("Auth0 Domain:", import.meta.env.VITE_AUTH0_DOMAIN);
console.log("Auth0 Client ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log("Redirect URI:", import.meta.env.VITE_AUTH0_BASE_URL);


  return (
    
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
      

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl">Logistics Manager</CardTitle>
            <CardDescription>Sign in to manage your projects</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => loginWithRedirect()}
              className="w-full"
              data-testid="button-login"
            >
             Log in with Auth0</Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Securely powered by <span className="text-primary font-medium">Auth0</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
