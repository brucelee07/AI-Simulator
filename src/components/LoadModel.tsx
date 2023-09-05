import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleRestore: (flowData: string | ArrayBuffer | null) => void
}

const LoadModel: React.FC<Props> = ({ isOpen, onClose, handleRestore }) => {
  const [error, setError] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      file: [],
    },
    onSubmit: (values) => {
      if (values.file.length === 0) {
        setError(true)
        return
      }
      const selectedFile = values.file[0]
      // eslint-disable-next-line
      // @ts-ignore
      if (selectedFile.type !== 'text/plain') {
        setError(true)
        return
      }

      if (selectedFile) {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          const fileContents = e.target!.result
          handleRestore(fileContents)
          onClose()
        }
        fileReader.readAsText(selectedFile)
      }
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent py={3} bg='rootBg' color='textColor'>
        <ModalHeader>
          <Heading fontSize='md' textAlign='center'>
            载入模型
          </Heading>
        </ModalHeader>
        <ModalBody>
          <VStack w='full' h='full' justifyContent='center'>
            <form onSubmit={formik.handleSubmit}>
              <VStack>
                <FormControl>
                  <HStack
                    w='full'
                    verticalAlign='center'
                    my={2}
                    justifyContent='center'
                  >
                    <FormLabel w='200px' fontSize='sm'>
                      载入的模型(*.txt):
                    </FormLabel>
                    <Input
                      type='file'
                      name='file'
                      p={1}
                      onChange={(event) => {
                        setError(false)
                        formik.setFieldValue('file', event.target.files)
                      }}
                    />
                  </HStack>
                  {error && (
                    <Text color='red' fontSize='xs' align='center'>
                      只支持txt文件格式!
                    </Text>
                  )}
                </FormControl>
                <Button type='submit' colorScheme='blue' width='full'>
                  载入
                </Button>
              </VStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoadModel
