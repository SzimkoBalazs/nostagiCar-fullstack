import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useCars from "../../hooks/useCars.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createCar } from "../../utils/api";
import './Specifications.css'
const Facilities = ({
  prevStep,
  carDetails,
  setCarDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      year: carDetails.details.year,
      mileage: carDetails.details.mileage,
      power: carDetails.details.power,
    },
    validate: {
      year: (value) => (value < 1899 ? "Must have made after 1900" : null),
      mileage: (value) =>
        value < 1 ? "Must have atleast one km" : null,
    },
  });

  const { year, mileage, power } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setCarDetails((prev) => ({
        ...prev,
        details: { year, mileage, power },
      }));
      mutate();
    }
  };

  console.log(carDetails)

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useCars();

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=> createCar({
        ...carDetails, details: {year, mileage , power},
    }, token),
    onError: ({ response }) => toast.error(response.data.message, {position: "bottom-right"}),
    onSettled: ()=> {
      toast.success("Added Successfully", {position: "bottom-right"});
      setCarDetails({
        manufacturer: "",
        model: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        details: {
          year: 0,
          mileage: 0,
          power: 0,
        },
        userEmail: user?.email,
      })
      setOpened(false)
      setActiveStep(0)
      refetchProperties()
    }

  })

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="Year of make"
          min={0}
          {...form.getInputProps("year")}
        />
        <NumberInput
          label="Mileage"
          min={0}
          {...form.getInputProps("mileage")}
        />
        <NumberInput
          withAsterisk
          label="Horsepower"
          min={0}
          {...form.getInputProps("power")}
        />
        
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Car"}
          </Button>
        </Group>
        
        {/* 
        <div className="button-container">
          <button className="back-button" onClick={prevStep}>Back</button>
          <button type="submit" className="submit-button" disabled={isLoading}>{isLoading ? "Submitting" : "Add Car"}</button>
        </div>
        */}
      </form>
    </Box>
  );
};

export default Facilities;