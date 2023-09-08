import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import PredictImage from './PredictImage'
import { Node } from '../utils/analizeFlow'
import { uploadImage } from '../utils/apis'

interface Props {
  nodeLink: Node | undefined
}

const SelectDataset: React.FC<Props> = ({ nodeLink }) => {
  const [predict, setPredict] = useState<boolean>(false)
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
      title: 'number',
    },
    onSubmit: async (values) => {
      const data = { title: values.title, node: nodeLink }
      const res = await uploadImage(data, handleError)
      if (res !== undefined) {
        if (res.status! === 200) {
          if ('error' in res.data) {
            alert({
              title: '模型设计错误',
              description: '模型和数据不匹配!',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
          } else {
            localStorage.setItem('model_path', res.data.model)
            setPredict(true)
          }
        } else {
          alert({
            title: '连接服务器出错',
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
    <VStack w='full' h='full' justify='center'>
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
                选择数据类型
              </FormLabel>
              <Select
                value={formik.values.title}
                name='dataset'
                onChange={formik.handleChange}
              >
                <option value='animal'>动物识别</option>
                <option value='number'>手写数字</option>
              </Select>
            </HStack>
          </FormControl>
          <Button type='submit' colorScheme='blue' width='full'>
            上传
          </Button>
        </VStack>
      </form>
      {predict && <PredictImage />}
    </VStack>
  )
}

export default SelectDataset
