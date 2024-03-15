import React, { useState } from 'react'
import './Cars.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import useCars from '../../hooks/useCars'
import { PuffLoader } from "react-spinners";
import CarCard from '../../components/CarCard/CarCard';


const Cars = () => {

const {data, isError, isLoading} = useCars()
const [filter, setFilter] = useState('')

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
      <SearchBar filter={filter} setFilter={setFilter}/>

      <div className="paddings flexCenter cars">
      {
            // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))

            data
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
          }
       </div>
      </div>
     </div> 
  )
}

export default Cars