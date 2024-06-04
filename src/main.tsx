import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import AuthProvider from "./Providers/AuthProvider.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster  richColors />
    </Provider>
  </React.StrictMode>
);
