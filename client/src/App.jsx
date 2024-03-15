import { useState } from "react";
import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Cars from "./pages/Cars/Cars";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarPage from "./pages/CarPage/CarPage";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import MyCars from "./pages/MyCars/MyCars";
import MyInactiveCars from "./pages/MyInactiveCars/MyInactiveCars";
import ErrorPage from "./pages/ErrorPage/ErrorPage";


function App() {

const queryClient = new QueryClient();

const [userDetails, setUserDetails] = useState({
  favourites: [],
  bookings: [],
  ownedCars: [],
  deletedCars: [],
  token: null,
});

  return (
  <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
           <Route element={<Layout/>}>
             <Route path="/" element={<Website/>}/>
             <Route path="/cars" >
                <Route index element={<Cars />} />
                <Route path=":carId" element={<CarPage />} />
             </Route>
             <Route path="/bookings" element={<Bookings />} />
             <Route path="/favourites" element={<Favourites />} />
             <Route path="/myCars" element={<MyCars />} />
             <Route path="/myDeletedCars" element={<MyInactiveCars />} />
             <Route path="/*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    <ToastContainer/>
  </QueryClientProvider>
  </UserDetailContext.Provider>
    
  );
}

export default App;
