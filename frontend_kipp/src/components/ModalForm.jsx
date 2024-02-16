import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import CustomButton from "./Button";

const ModalForm = ({ isOpen, onClose }) => {
  const [x1, setx1] = useState("");
  const [y1, sety1] = useState("");
  const [x2, setx2] = useState("");
  const [y2, sety2] = useState("");
  const [x3, setx3] = useState("");
  const [y3, sety3] = useState("");

  const sendCoordinates = (event) => {
    event.preventDefault();
    if (!x1 || !x2 || !x3 || !y1 || !y2 || !y3) {
      alert("Please fill out all fields.");
      return;
    }
    console.log(x1, x2, x3, y1, y2, y3);
    //send to backend
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Coordinates</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={sendCoordinates}>
            <Heading as="h4" size="md">
              First Point
            </Heading>
            <Flex mb={4}>
              <FormControl id="x1" mr={4}>
                <FormLabel>X Coordinate</FormLabel>
                <Input
                  type="number"
                  value={x1}
                  onChange={(e) => setx1(e.target.value)}
                />
              </FormControl>

              <FormControl id="y1">
                <FormLabel>Y Coordinate</FormLabel>
                <Input
                  type="number"
                  value={y1}
                  onChange={(e) => sety1(e.target.value)}
                />
              </FormControl>
            </Flex>

            <Heading as="h4" size="md">
              Second Point
            </Heading>
            <Flex mb={4}>
              <FormControl id="x2" mr={4}>
                <FormLabel>X Coordinate</FormLabel>
                <Input
                  type="number"
                  value={x2}
                  onChange={(e) => setx2(e.target.value)}
                />
              </FormControl>

              <FormControl id="y2">
                <FormLabel>Y Coordinate</FormLabel>
                <Input
                  type="number"
                  value={y2}
                  onChange={(e) => sety2(e.target.value)}
                />
              </FormControl>
            </Flex>

            <Heading as="h4" size="md">
              Third Point
            </Heading>
            <Flex mb={4}>
              <FormControl id="x3" mr={4}>
                <FormLabel>X Coordinate</FormLabel>
                <Input
                  type="number"
                  value={x3}
                  onChange={(e) => setx3(e.target.value)}
                />
              </FormControl>

              <FormControl id="y3">
                <FormLabel>Y Coordinate</FormLabel>
                <Input
                  type="number"
                  value={y3}
                  onChange={(e) => sety3(e.target.value)}
                />
              </FormControl>
            </Flex>

            <CustomButton
              colorScheme={"teal"}
              text={"Submit"}
              onClick={sendCoordinates}
            ></CustomButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
