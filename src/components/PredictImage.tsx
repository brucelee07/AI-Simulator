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

const PredictImage: React.FC = () => {
  const [result, setResult] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)
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
      // eslint-disable-next-line
      // @ts-ignore
      if (!values.file[0].type.startsWith('image/')) {
        setError(true)
        return
      }
      console.log('upload')
      // TODO upload file to servr
      setResult(true)
    },
  })

  return (
    <VStack
      w='80%'
      h='full'
      justifyContent='center'
      bg='gray.700'
      py={5}
      mt={7}
      borderRadius='md'
    >
      <form onSubmit={formik.handleSubmit}>
        <VStack>
          <FormControl>
            <HStack
              w='full'
              verticalAlign='center'
              my={2}
              justifyContent='center'
            >
              <FormLabel w='100px' fontSize='sm'>
                提交图片:
              </FormLabel>
              <Input
                type='file'
                name='file'
                p={1}
                onChange={(event) => {
                  setError(false)
                  setResult(false)
                  formik.setFieldValue('file', event.target.files)
                }}
              />
            </HStack>
            {error && (
              <Text color='red' fontSize='xs' align='center'>
                只支持图片文件!
              </Text>
            )}
          </FormControl>

          {result && <Text>预测结果: {value}</Text>}
          <Button type='submit' colorScheme='blue' width='full'>
            预测
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}

export default PredictImage
