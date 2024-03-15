import React, {useState, useContext, useEffect} from 'react'
import { useMutation, useQuery } from "react-query";
import { useLocation } from 'react-router-dom';
import { getCar, removeBooking, api } from '../../utils/api';
import { PuffLoader } from "react-spinners";
import './CarPage.css'
import Map from '../../components/Map/Map';
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillDashboard, AiFillThunderbolt, AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import BookingModal from '../../components/BookingModal/BookingModal';
import UserDetailContext from "../../context/UserDetailContext.js";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from '../../components/Heart/Heart';



const CarPage = () => {

    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
    const { data, isLoading, isError } = useQuery(["car", id], () =>
      getCar(id)
    );

    
    const [modalOpened, setModalOpened] = useState(false);
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const { validateLogin } = useAuthCheck();
    const { user } = useAuth0();
    const receiverUserEmail = data?.userEmail
    const senderUserEmail = user?.email
   
    

    const {
        userDetails: { token, bookings },
        setUserDetails,
      } = useContext(UserDetailContext);

      useEffect(() => {
        const fetchUserData = async () => {
          const senderUserData = await api.post('/user/getUser', { email: senderUserEmail }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const receiverUserData = await api.post('/user/getUser', { email: receiverUserEmail }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          setSenderId(senderUserData.data.id);
          setReceiverId(receiverUserData.data.id);
        };
      
        fetchUserData();
      }, [senderUserEmail, receiverUserEmail, token]);


      const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
        mutationFn: () => removeBooking(id, user?.email, token),
        onSuccess: () => {
          setUserDetails((prev) => ({
            ...prev,
            bookings: prev.bookings.filter((booking) => booking?.id !== id),
          }));
    
          toast.success("Booking cancelled", { position: "bottom-right" });
        },
      });


    if (isLoading) {
        return (
          <div className="wrapper">
            <div className="flexCenter paddings">
              <PuffLoader />
            </div>
          </div>
        );
      }
    
      if (isError) {
        return (
          <div className="wrapper">
            <div className="flexCenter paddings">
              <span>Error while fetching the property details</span>
            </div>
          </div>
        );
      }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth car-container">
        {/* like button */}
        <div className="like">
          <Heart id={id}/>
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter car-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
            <span className="primaryText">{`${data?.manufacturer} ${data?.model}`}</span>
            <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart specifications">
              {/* bathrooms */}
              <div className="flexStart specification">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.details?.year} Year</span>
              </div>

              {/* parkings */}
              <div className="flexStart specification">
                <AiFillDashboard size={20} color="#1F3E72" />
                
                <span>{data?.details.mileage} Mileage</span>
              </div>

              {/* rooms */}
              <div className="flexStart specification">
                <AiFillThunderbolt size={20} color="#1F3E72" />
                <span>{data?.details.power} Horsepower</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{" "}
                {data?.city}{" "}
                {data?.country}
              </span>
            </div>

            {/* booking button */}
           
           { 
           bookings?.map((booking) => booking.id).includes(id) ? (
            <>
            <Button
            variant="outline"
            w={"100%"}
            color="red"
            onClick={() => cancelBooking()}
            disabled={cancelling}
          >
            <span>Cancel booking</span>
          </Button>
          <span>
          Your visit already booked for date{" "}
          {bookings?.filter((booking) => booking?.id === id)[0].date}
        </span>
        </>
           ) : (
           <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>)}
            
              <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              carId={id}
              email={user?.email}
            />
           
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarPage