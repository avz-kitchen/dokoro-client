/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import plantService from "../services/plant.service";
function GardenModal({ plant, gardens }) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const handleAddToGarden = (selectedGarden) => {
    plantService.addToGarden(plant, selectedGarden);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to garden</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Select the garden to add {plant.plantName}:</p>
            <Select
              placeholder="Select garden"
              onChange={(e) => handleAddToGarden(e.target.value)}
            >
              {gardens.map((garden) => (
                <option key={garden} value={garden}>
                  {garden}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GardenModal;
