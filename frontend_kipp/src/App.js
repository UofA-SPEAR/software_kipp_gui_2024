import MapComponent from "./components/MapComponent";
import { useState } from "react";
import "./App.css";
import { ChakraProvider, HStack } from "@chakra-ui/react";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  WarningTwoIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import CustomButton from "./components/Button";
import { Text } from "@chakra-ui/react";
import { Button, useDisclosure } from "@chakra-ui/react";
import ModalForm from "./components/ModalForm";
import { Heading } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { set } from "ol/transform";

function App() {
  const [coordinates, setCoordinates] = useState([]);

  function handleCoordinates(coordinates) {
    setCoordinates(coordinates);
  }

  const displayModal = () => {
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <ModalForm
              isOpen={isOpen}
              onClose={onClose}
              handleCoordinates={handleCoordinates}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div style={{ background: "red", height: "50%" }}>Camera</div>
                <div
                  style={{
                    background: "white",
                    height: "50%",
                    padding: 10,
                  }}
                >
                  <Heading color={"black"} as="h1" size="lg">
                    Control Panel
                  </Heading>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginTop: 30,
                    }}
                  >
                    <div
                      style={{
                        width: "35%",
                        height: "100dp",
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "black",
                        minHeight: "90%",
                      }}
                    >
                      <VStack spacing={4}>
                        <CustomButton
                          text={"Add Coordinates"}
                          colorScheme={"teal"}
                          icon={<AddIcon />}
                          variant={"outline"}
                          onClick={() => {
                            displayModal();
                          }}
                        ></CustomButton>

                        <CustomButton
                          text={"Emergency Stop"}
                          colorScheme={"red"}
                          icon={<WarningTwoIcon />}
                          variant={"solid"}
                        ></CustomButton>
                      </VStack>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        height: "",
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "black",
                        minHeight: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <VStack spacing={4} align="flex-start">
                        <Heading color={"black"} as="h1" size="md">
                          Status:
                        </Heading>
                        <Heading color={"black"} as="h1" size="md">
                          Battery:
                        </Heading>
                        <Heading color={"black"} as="h1" size="md">
                          Speed:
                        </Heading>
                        <Heading color={"black"} as="h1" size="md">
                          Direction:
                        </Heading>
                      </VStack>
                      <VStack spacing={4}>
                        <Text fontSize="md" color={"black"}>
                          Autonomous
                        </Text>
                        <Text fontSize="md" color={"black"}>
                          25%
                        </Text>
                        <Text fontSize="md" color={"black"}>
                          25 Km/hr
                        </Text>
                        <Text fontSize="md" color={"black"}>
                          49° NW
                        </Text>
                      </VStack>
                    </div>
                  </div>
                </div>
              </div>
              <MapComponent coordinates={coordinates} />
            </div>
          </div>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
