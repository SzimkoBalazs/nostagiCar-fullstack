import React from 'react'
import './MyCarCard.css'

import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom'
import Edit from '../Edit/Edit'
import Trash from '../Trash/Trash'

const MyCarCard = ({ card, refetch, onEdit }) => {

const navigate = useNavigate()

  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../cars/${card.id}`)}
    >
                 
                <img className='r-card-image' src={card.image} alt="home" />
                 <Edit id={card?.id} car={card} onEdit={() => onEdit(card)}/>
                 <Trash id={card?.id} refetch={refetch}/>
                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText"> {truncate(`${card.manufacturer} ${card.model}`, { length: 20 })}</span>
                {/*
                 <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
               */}
              </div>
  )
}

export default MyCarCard