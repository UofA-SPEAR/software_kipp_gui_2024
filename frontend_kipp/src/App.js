import MapComponent from "./components/MapComponent";
import { useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import CustomButton from "./components/Button";
import { Text } from "@chakra-ui/react";
import { Button, useDisclosure } from "@chakra-ui/react";
import ModalForm from "./components/ModalForm";
import { Heading } from "@chakra-ui/react";

function App() {
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
            <div style={{ height: "50px", background: "green" }}>Menu</div>

            <div style={{ height: "50px", background: "purple" }}>
              Battery, Speed, etc
            </div>

            <ModalForm isOpen={isOpen} onClose={onClose} />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div style={{ background: "red", height: "50%" }}>Camera</div>
                <div
                  style={{ background: "white", height: "50%", padding: 10 }}
                >
                  <Heading color={"black"} as="h1" size="lg">
                    Control Panel
                  </Heading>
                  <div
                    style={{
                      width: "30%",
                      height: "",
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "black",
                      minHeight: "90%",
                    }}
                  >
                    <CustomButton
                      text={"Add Coordinates"}
                      colorScheme={"teal"}
                      icon={<AddIcon />}
                      variant={"outline"}
                      onClick={() => {
                        displayModal();
                      }}
                    ></CustomButton>
                  </div>
                </div>
              </div>
              <MapComponent />
            </div>
          </div>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
