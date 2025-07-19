import { Route, Routes } from "react-router-dom";
//css
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css"
//pages
import RegisterPage from "./pages/Register";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Details";
import Profile from "./pages/Profile";
import UserPage from "./pages/User";
//components
import MyNavbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { Home } from "lucide-react";

function App() {
  return (
    <div>
      <MyNavbar/>
      {/* <HeroSection></HeroSection> */}
      <Home className="hidden" ></Home>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book/list" element={<ListingPage />}></Route>
        <Route path="/book/view/:bookId" element={<BookDetailPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
