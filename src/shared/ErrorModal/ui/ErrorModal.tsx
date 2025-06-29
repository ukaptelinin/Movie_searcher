import { FC, useContext, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { MoviesListContext } from "@/entities/movies-list/model/context";

export const ErrorModal:FC = () => {
       const {isOpen, onOpen, onOpenChange } = useDisclosure();
const { error, resetError } = useContext(MoviesListContext);

useEffect(() => {
    if (error) {
      onOpen();
    } 
  }, [error]);

  const onCloseModal = () => {
    if(error){
        resetError();
    }
    onOpenChange();
  };

   return (
<>
      
      <Modal isOpen={isOpen} onOpenChange={onCloseModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-danger">Ошибка</ModalHeader>
              <ModalBody>              
                <p>
                 {error}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );  
};
