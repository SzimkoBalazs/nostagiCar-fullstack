import { useContext } from "react"
import { recoverDeletedCar } from '../../utils/api';
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../../hooks/useAuthCheck"
import UserDetailContext from "../../context/UserDetailContext"
import { toast } from "react-toastify";


const Recover = ({ id, refetch }) => {
  const {validateLogin} = useAuthCheck()
  const { user } = useAuth0();

  const {
    userDetails: { token },
    } = useContext(UserDetailContext);

  const handleClick = async (id) => {
if (validateLogin()){
  await recoverDeletedCar(id, token);
  try {
    await recoverDeletedCar(id, token);
    toast.success("Recovered Successfully", { position: "bottom-right" });
    refetch()
  } catch (error) {
    toast.error("Failed to recover the car", { position: "bottom-right" });
  }
}
    
    
  }

  return (
    <img className="trash-icon" src='./recovery.png' alt='bin' onClick={ (e) => {
        e.stopPropagation()
        handleClick(id)
     }}/>
  );
}
export default Recover