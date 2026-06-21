import Navbar from "./components/Navbar";
import HomeSection from "./pages/Home";
import About from "./pages/About";
import Results from "./pages/Comparision";
import Upload from "./components/Upload";

export default function App() {
  return (
    <div className="min-h-screen bg-[#090d14]">
      <Upload />
      {/* The rest of your page content will go here */}
    </div>
  );
}
