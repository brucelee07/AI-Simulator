import {
  Button,
  Flex,
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
import { predictData, predictText } from '../utils/apis'

interface Props {
  inputs: string[]
  isText: boolean
}

const Predict: React.FC<Props> = ({ inputs, isText }) => {
  const [result, setResult] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

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
      x: inputs.join(' '),
    },
    onSubmit: async (values) => {
      const middle_path = localStorage.getItem('model_path')
      if (middle_path) {
        let res
        if (isText) {
          res = await predictText(
            { text: values.x, middle_path: middle_path },
            handleError,
          )
        } else {
          const datas = values.x.split(' ')
          const array = []
          for (let i = 0; i < datas.length; i++) {
            if (inputs[i] === 'number') {
              array.push(parseFloat(datas[i]))
            } else {
              array.push(datas[i])
            }
          }
          res = await predictData(
            { data: array, middle_path: middle_path },
            handleError,
          )
        }
        if (res?.status === 200) {
          setValue(res.data!.result)
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
    <Flex
      w='80%'
      h='full'
      justify='center'
      bg='gray.700'
      mt={7}
      py={3}
      borderRadius='lg'
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
              <FormLabel w='10%' fontSize='sm'>
                输入(X)
              </FormLabel>
              <Input
                type='text'
                value={formik.values.x}
                name='x'
                w='300px'
                p={1}
                onChange={formik.handleChange}
              />
            </HStack>
          </FormControl>

          {result && <Text>预测结果: {value}</Text>}

          <Button type='submit' colorScheme='blue' width='full'>
            预测
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

export default Predict
