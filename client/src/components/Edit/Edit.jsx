import React, { useState } from 'react'
import { useQuery } from "react-query";
import EditCarModal from '../EditCarModal/EditCarModal';
import useAuthCheck from "../../hooks/useAuthCheck.jsx";

const Edit = ({id, onEdit}) => {

    const { validateLogin } = useAuthCheck();
    

    
  

  return (
    <>
    <img className="edit-icon" src='./pen.png' alt='bin' onClick={ (e) => {
        e.stopPropagation()
        onEdit()
        
     }}/>

     
     
     </>
  )
}

export default Edit