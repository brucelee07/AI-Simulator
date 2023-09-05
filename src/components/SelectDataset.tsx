import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Select,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import PredictImage from './PredictImage'

const SelectDataset: React.FC = () => {
  const [predict, setPredict] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      dataset: 'number',
    },
    onSubmit: (values) => {
      console.log(values.dataset)
      console.log('upload')
      // TODO upload file to servr
      setPredict(true)
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
                value={formik.values.dataset}
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
