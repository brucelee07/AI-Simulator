import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Predict from './Predict'

const UploadFile: React.FC = () => {
  const [error, setError] = useState<boolean>(false)
  const [predict, setPredict] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      file: [],
    },
    onSubmit: (values) => {
      if (values.file.length === 0) {
        setError(true)
        return
      }
      // eslint-disable-next-line
      // @ts-ignore
      if (values.file[0].type !== 'text/csv') {
        setError(true)
        return
      }
      console.log('upload')
      // TODO upload file to servr
      setPredict(true)
    },
  })

  return (
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
                上传的数据(*.csv):
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
                只支持CSV文件格式!
              </Text>
            )}
          </FormControl>
          <Button type='submit' colorScheme='blue' width='full'>
            上传
          </Button>
        </VStack>
      </form>
      {predict && <Predict />}
    </VStack>
  )
}

export default UploadFile
