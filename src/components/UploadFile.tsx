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
import Predict from './Predict'
import { Node } from '../utils/analizeFlow'
import { upload } from '../utils/apis'

interface Props {
  nodeLink: Node | undefined
}

const UploadFile: React.FC<Props> = ({ nodeLink }) => {
  const [error, setError] = useState<boolean>(false)
  const [predict, setPredict] = useState<boolean>(false)
  const [inputs, setInputs] = useState<string[]>([])
  const [isText, setIsText] = useState<boolean>(false)

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
      if (values.files[0].type !== 'text/csv') {
        setError(true)
        return
      }
      const data = new FormData()
      data.append('file', values.files[0])
      data.append('data', JSON.stringify(nodeLink))
      const res = await upload(data, handleError)
      if (res?.status === 200) {
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
          setInputs(res.data.inputs)
          if (nodeLink?.subtitle === '文本输入') {
            setIsText(true)
          } else {
            setIsText(false)
          }
          setPredict(true)
        }
      } else {
        alert({
          title: '服务器出错',
          description: '连接服务器出错!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
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
                name='files'
                p={1}
                onChange={(event) => {
                  setError(false)
                  formik.setFieldValue('files', event.target.files)
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
      {predict && <Predict inputs={inputs} isText={isText} />}
    </VStack>
  )
}

export default UploadFile
