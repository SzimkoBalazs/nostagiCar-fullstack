import React, { useState, useEffect } from 'react'
import { Modal, Container, Stepper } from '@mantine/core'
import AddLocation from '../AddLocation/AddLocation';
import BasicDetails from '../BasicDetails/BasicDetails';
import EditedFacilities from '../EditedFacilities/EditedFacilities';

const EditCarModal = ({car, onClose, refetch}) => {

  const [carDetails, setCarDetails] = useState(car);
  const [active, setActive] = useState(0);
  console.log(carDetails);

  useEffect(() => {
    setCarDetails(car);
  }, [car]);


const nextStep = () => {
  setActive((current) => (current < 3 ? current + 1 : current));
};

const prevStep = () => {
  setActive((current) => (current > 0 ? current - 1 : current));
};


  return (
    <Modal
    opened
    onClose={onClose}
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
          
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Technical" description="Details"> 
            <EditedFacilities
              prevStep={prevStep}
              carDetails={carDetails}
              setCarDetails={setCarDetails}
              onClose={onClose}
              setActiveStep={setActive}
              refetch={refetch}
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

export default EditCarModal