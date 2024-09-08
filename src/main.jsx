import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import UserContextProvider from "./context/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
