import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { Toaster } from "sonner";

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/Sign-In"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster/>
    </>
  );
}

export default App;
