import Navbar from "./components/Navbar";
import HomeSection from "./pages/Home";
import About from "./pages/About";
import Comparision from "./pages/Comparision";
import Upload from "./components/Upload";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
import { Home } from "lucide-react";


function RootLayout() {
  return (
    <div className="min-h-screen bg-[#090d14]">
      <Navbar /> 
      <Outlet /> 
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeSection />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "upload",
        element: <Upload />
      },
      {
        path: "comparision/:fileUploadId",  
        element: <Comparision />
      }
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}
