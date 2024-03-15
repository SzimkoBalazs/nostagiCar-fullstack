import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "https://nostagi-car-server.vercel.app/api",
  });

export const getAllCars = async () => {
    try {
      const response = await api.get("/car/allcars", {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

  export const getCar = async (id) => {
    try {
      const response = await api.get(`/car/${id}`, {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

  export const createUser = async (email, token) => {
    try {
      await api.post(
        `/user/register`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
  };

  export const bookVisit = async (date, carId, email, token) => {
    try {
      await api.post(
        `/user/bookVisit/${carId}`,
        {
          email,
          id: carId,
          date: dayjs(date).format("DD/MM/YYYY"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
  };

  export const removeBooking = async (id, email, token) => {
    try {
      await api.post(
        `/user/removeBooking/${id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
  
      throw error;
    }
  };

  export const toFav = async (id, email, token) => {
    try {
      await api.post(
        `/user/toFav/${id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      throw e;
    }
  };
  
  export const getAllFav = async (email, token) => {
    if(!token) return 
    try{
  
      const res = await api.post(
        `/user/allFav`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       
      return res.data["favCarsiD"]
  
    }catch(e)
    {
      toast.error("Something went wrong while fetching favs");
      throw e
    }
  } 

  export const getAllBookings = async (email, token) => {
  
    if(!token) return 
    try {
      const res = await api.post(
        `/user/allBookings`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data["bookedVisits"];
  
      
    } catch (error) {
      toast.error("Something went wrong while fetching bookings");
      throw error
    }
  }

  export const createCar = async (data, token) => {
    console.log('Request Payload:', data); // Log the request payload
    try{
      const res = await api.post(
        `/car/create`,
        {
          data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('API Response:', res.data); // Log the API response
      
    }catch(error)
    {
      console.error('API Error:', error); // Log any errors
      throw error
    }
  }

  export const getAllCarsOfUser = async (email, token) => {
    if(!token) return 
    try{
  
      const res = await api.post(
        `/car/allCarsOfUser`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("i have run yes")
      console.log(res.data) 
      return res.data
  
    }catch(e)
    {
      console.error("Error in API call:", e);
      toast.error("Something went wrong while fetching favs");
      throw e
    }
  } 

  export const softDeleteCar = async (id, token) => {
    try {
      await api.put(`/car/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

  export const getAllDeletedCarsOfUser = async (email, token) => {
    if(!token) return 
    try{
  
      const res = await api.post(
        `/car/allDeletedCarsOfUser`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("i have run yes")
      console.log(res.data) 
      return res.data
  
    }catch(e)
    {
      console.error("Error in API call:", e);
      toast.error("Something went wrong while fetching favs");
      throw e
    }
  } 

  export const recoverDeletedCar = async (id, token) => {
    try {
      await api.put(`/car/recover/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

  export const updateCar = async (data, token) => {
    console.log('Request Payload:', data); // Log the request payload
    console.log(token)
    try {
      const res = await api.put(
        `/car/update/${data.id}`, // Assuming the API endpoint to update a car is like "/car/update/:carId"
        {
          data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Response:', res.data); // Log the API response
    } catch (error) {
      console.error('API Error:', error); // Log any errors
      throw error;
    }
  };

  export const sendMessage = async (content, carId, senderId, receiverId, token) => {
    try {
      const response = await api.post(
        `/messages/create`, 
        {
          content,
          carId,
          senderId,
          receiverId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong while sending the message");
      throw error;
    }
  };

  export const getMessagesForUser = async (userId, token) => {
    const response = await api.get(`/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  export const getUser = async (email, token) => {
    const response = await api.post('/user/getUser', { email }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };