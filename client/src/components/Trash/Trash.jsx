import { useContext } from "react"
import { softDeleteCar } from '../../utils/api';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../../hooks/useAuthCheck"
import UserDetailContext from "../../context/UserDetailContext"
import { toast } from "react-toastify";


const Trash = ({ id, refetch }) => {
  const {validateLogin} = useAuthCheck()
  const { user } = useAuth0();

  const {
    userDetails: { token },
    } = useContext(UserDetailContext);

  const handleClick = async (id) => {
if (validateLogin()){
  await softDeleteCar(id, token);
  try {
    await softDeleteCar(id, token);
    toast.success("Deleted Successfully", { position: "bottom-right" });
    refetch()
  } catch (error) {
    toast.error("Failed to delete the car", { position: "bottom-right" });
  }
}
    
    
  }

  return (
    <img className="trash-icon" src='./trash-bin.png' alt='bin' onClick={ (e) => {
        e.stopPropagation()
        handleClick(id)
     }}/>
  );
}
export default Trash