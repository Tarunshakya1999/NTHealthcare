import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import Login from "./Login";
import Registeration from "./Registeration";
import WeatherApp from "./Wheather";
import ProductForm from "./SendDataWithimage";
import UpdateProducts from "./UpdateProducts";
import ProductDetail from "./ProductDetail";
import CartPage from "./CartPage";
import PaymentQR from "./Payment";


function App() {
  return (
    <div>
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registeration/>}/>
        <Route path="/weather" element={<WeatherApp />}/>
        <Route path="/addproduct"element={<ProductForm/>}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/update/:id" element={<UpdateProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentQR />} />
       


      </Routes>
    </BrowserRouter>
   
    </div>

  );
}

export default App;
