import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadItem from "./pages/UploadItem";
import ContactSeller from "./pages/ContactSeller";
import { ToastContainer } from "react-toastify";
import SellPage from "./pages/SellPage";
import ItemPage from "./pages/ItemPage";
import ItemDetail from "./pages/ItemDetail";
import SellerProfile from './pages/SellerProfile'; // adjust the path as needed
import "react-toastify/dist/ReactToastify.css";
import "./components/ProfileForm";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <AuthProvider>
            <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/upload" element={<UploadItem />} />
        <Route path="/contact/:sellerId" element={<ContactSeller />} />
       <Route path="/seller" element={<SellerProfile />} />


<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-panel" element={<AdminPanel />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/sell" element={<SellPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/items/:id" element={<ItemDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
