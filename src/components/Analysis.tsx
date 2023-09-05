import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

interface Props {
  isOpen: boolean
	isData: boolean
  onClose: () => void
}

const Analysis: React.FC<Props> = ({ isOpen, onClose, isData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent height='600px' bg='rootBg' color='textColor'>
        <ModalHeader>
          <Heading fontSize='md' textAlign='center'>提交数据</Heading>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Analysis
