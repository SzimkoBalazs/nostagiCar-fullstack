import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useAllUsersCars from "../../hooks/useAllUsersCars";
import { PuffLoader } from "react-spinners";
import "../Cars/Cars.css";
import UserDetailContext from "../../context/UserDetailContext";
import MyCarCard from "../../components/MyCarCard/MyCarCard";
import EditCarModal from "../../components/EditCarModal/EditCarModal";

const MyCars = () => {
  const { data, isError, isLoading, refetch } = useAllUsersCars();
  console.log(data)
  const [carToEdit, setCarToEdit] = useState(null);
  const [filter, setFilter] = useState("");
  const {
    userDetails: { ownedCars },
  } = useContext(UserDetailContext);
console.log(ownedCars)
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
           
           ownedCars?.length === 0 ? (
            <p style={{ margin: '20px', padding: '20px', fontSize: '18px', textAlign: 'center', color: '#555', background: '#f0f0f0' }} >You don't have any cars to sell.</p>
          ) : (

            ownedCars && ownedCars
            
              .filter(
                (car) =>
                  car.manufacturer.toLowerCase().includes(filter.toLowerCase()) ||
                  car.model.toLowerCase().includes(filter.toLowerCase()) ||
                  car.city.toLowerCase().includes(filter.toLowerCase()) ||
                  car.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <MyCarCard card={card} key={i} refetch={refetch} onEdit={setCarToEdit}/>
              ))
          )}
          {carToEdit && <EditCarModal car={carToEdit} onClose={() => setCarToEdit(null)} refetch={refetch}/>}
        </div>
      </div>
    </div>
  );
};

export default MyCars;