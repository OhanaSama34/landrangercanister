import { Routes, Route, Router } from "react-router";
import "./App.css";
import Home from "./Home";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./Admin";
import CreateNFT from "./CreateNFT";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div data-theme="cerah">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create-nft" element={<CreateNFT />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
