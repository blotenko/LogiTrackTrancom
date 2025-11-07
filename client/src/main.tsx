import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root")!);

root.render(
    <Auth0Provider
        domain="dev-gtorato5cdkd8s3j.eu.auth0.com"
        clientId="xnuslhUH4HkdOlh0QbDwL5PkdybouyF9"
        authorizationParams={{ redirect_uri: window.location.origin }}
    >
        <App />
    </Auth0Provider>
);
