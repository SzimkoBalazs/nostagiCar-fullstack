import React, { useState, useEffect } from 'react'
import { Modal, Container, Stepper } from '@mantine/core'
import AddLocation from '../AddLocation/AddLocation';
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from '../UploadImage/UploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';

const AddCarModal = ({ opened, setOpened }) => {

    const [active, setActive] = useState(0);
    const { user } = useAuth0();
    console.log(user?.email)

    const [carDetails, setCarDetails] = useState({
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
        userEmail: "",
      });

      useEffect(() => {
        if (user) {
          setCarDetails((prev) => ({
            ...prev,
            userEmail: user?.email,
          }));
        }
      }, [user]);

      console.log(carDetails)

      const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current));
      };
    
      const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
      };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>

      <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Address">
            <AddLocation
              nextStep={nextStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
            />
          </Stepper.Step>
          
          <Stepper.Step label="Images" description="Upload ">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
            />
          </Stepper.Step>
          
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
            />
          </Stepper.Step>

          <Stepper.Step>
            <Facilities
              prevStep={prevStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>
  
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        

      </Container>
    </Modal>
  )
}

export default AddCarModal