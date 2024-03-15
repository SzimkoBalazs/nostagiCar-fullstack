import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAllUsersDeletedCars from "../../hooks/useAllUsersDeletedCars";
import { PuffLoader } from "react-spinners";
import "../Cars/Cars.css";
import UserDetailContext from "../../context/UserDetailContext";
import MyDeletedCarsCard from "../../components/MyDeletedCarsCard/MyDeletedCarsCard";

const MyInactiveCars = () => {
  const { data, isError, isLoading, refetch } = useAllUsersDeletedCars();
  console.log(data)
  const [filter, setFilter] = useState("");
  const {
    userDetails: { deletedCars },
  } = useContext(UserDetailContext);
console.log(deletedCars)
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
           
           deletedCars?.length === 0 ? (
            <p style={{ margin: '20px', padding: '20px', fontSize: '18px', textAlign: 'center', color: '#555', background: '#f0f0f0', borderRadius: '8px' }} >You don't have any deleted cars .</p>
          ) : (

            deletedCars && deletedCars
            
              .filter(
                (car) =>
                  car.manufacturer.toLowerCase().includes(filter.toLowerCase()) ||
                  car.model.toLowerCase().includes(filter.toLowerCase()) ||
                  car.city.toLowerCase().includes(filter.toLowerCase()) ||
                  car.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <MyDeletedCarsCard card={card} key={i} refetch={refetch}/>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInactiveCars;