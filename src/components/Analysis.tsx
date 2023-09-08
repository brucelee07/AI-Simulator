import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import UploadFile from './UploadFile'
import SelectDataset from './SelectDataset'
import { Node } from '../utils/analizeFlow'

interface Props {
  isOpen: boolean
  isData: boolean
  onClose: () => void
  nodeLink: Node | undefined
}

const Analysis: React.FC<Props> = ({ isOpen, onClose, isData, nodeLink }) => {
  console.log(nodeLink)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent py={3} bg='rootBg' color='textColor'>
        <ModalHeader>
          <Heading fontSize='md' textAlign='center'>
            提交数据
          </Heading>
        </ModalHeader>
        <ModalBody>
          {isData ? (
            <UploadFile nodeLink={nodeLink} />
          ) : (
            <SelectDataset nodeLink={nodeLink} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Analysis
