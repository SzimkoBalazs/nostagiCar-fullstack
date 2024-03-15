import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, carDetails, setCarDetails }) => {
  const form = useForm({
    initialValues: {
      manufacturer: carDetails.manufacturer,
      model: carDetails.model,
      description: carDetails.description,
      price: carDetails.price,
    },
    validate: {
      manufacturer: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
          value < 1000 ? "Must be greater than 999 dollars" : null,
    },
  });

  const {manufacturer, model, description, price} = form.values


  const handleSubmit = ()=> {
    const {hasErrors} = form.validate()
    if(!hasErrors) {
     setCarDetails((prev)=> ({...prev, manufacturer, model, description, price}))
     nextStep()
    }
   }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          withAsterisk
          label="Manufacturer"
          placeholder="Car's manufacturer"
          {...form.getInputProps("manufacturer")}
        />
         <TextInput
          withAsterisk
          label="Model"
          placeholder="Car's model"
          {...form.getInputProps("model")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next step
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;