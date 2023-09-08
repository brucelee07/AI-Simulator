import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { predictImage } from '../utils/apis'

const PredictImage: React.FC = () => {
  const [result, setResult] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)

  const alert = useToast({ position: 'top' })

  const handleError = () => {
    alert({
      title: '服务器出错',
      description: '连接服务器出错!',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: async (values) => {
      if (values.files.length === 0) {
        setError(true)
        return
      }
      // eslint-disable-next-line
      // @ts-ignore
      if (!values.files[0].type.startsWith('image/')) {
        setError(true)
        return
      }
      const data = new FormData()
      data.append('file', values.files[0])
      const middle_path = localStorage.getItem('model_path')
      if (middle_path) {
        data.append('middle_path', middle_path)
        const res = await predictImage(data, middle_path, handleError)
        if (res?.status === 200) {
          setValue(res.data.result)
          setResult(true)
        } else {
          alert({
            title: '模型计算失败',
            description: '连接服务器出错!',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
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
                  formik.setFieldValue('files', event.target.files)
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
