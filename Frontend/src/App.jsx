import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Component/Register';
import Home from './Component/Home';
import Contact from './Component/Contact';
import About from './Component/About';
import Table from './Component/Table';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Login from './Component/Login';
import NotFound from './Component/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <Table />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
