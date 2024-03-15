import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useCars from "../../hooks/useCars";
import { PuffLoader } from "react-spinners";
import CarCard from "../../components/CarCard/CarCard";
import "../Cars/Cars.css";
import UserDetailContext from "../../context/UserDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useCars();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth cars-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter cars"
            style={{minHeight: '25rem'}}
        >
          {

              favourites?.length === 0 ? (
                <p style={{ margin: '20px', padding: '20px', fontSize: '18px', textAlign: 'center', color: '#555', background: '#f0f0f0', borderRadius: '8px' }} >You don't have any cars added to favourites .</p>
              ) : (

            data
              .filter((car) => favourites?.includes(car.id))

              .filter(
                (car) =>
                  car.manufacturer.toLowerCase().includes(filter.toLowerCase()) ||
                  car.model.toLowerCase().includes(filter.toLowerCase()) ||
                  car.city.toLowerCase().includes(filter.toLowerCase()) ||
                  car.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <CarCard card={card} key={i} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;