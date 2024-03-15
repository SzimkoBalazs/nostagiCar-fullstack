import React from 'react'
import './CarCard.css'

import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom'
import Heart from '../Heart/Heart'

const CarCard = ({ card }) => {

const navigate = useNavigate()

  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../cars/${card.id}`)}
    >
                <img src={card.image} alt="home" />
                 <Heart id={card?.id}/>
                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText"> {truncate(`${card.manufacturer} ${card.model}`, { length: 20 })}</span>
                 <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
              </div>
  )
}

export default CarCard