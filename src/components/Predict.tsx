import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'

const Predict: React.FC = () => {
  const [result, setResult] = useState<boolean>(false)
  const [value, setValue] = useState<number>(0)

  const formik = useFormik({
    initialValues: {
      x1: '',
      x2: '',
      x3: '',
    },
    onSubmit: (values) => {
      console.log(values)
      // TODO upload file to servr
      setValue(3.14)
      setResult(true)
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
              <FormLabel w='70px' fontSize='sm'>
                x1:
              </FormLabel>
              <Input
                type='text'
                name='x1'
                value={formik.values.x1}
                p={1}
                onChange={formik.handleChange}
              />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack
              w='full'
              verticalAlign='center'
              my={2}
              justifyContent='center'
            >
              <FormLabel w='70px' fontSize='sm'>
                x2:
              </FormLabel>
              <Input
                type='text'
                name='x2'
                value={formik.values.x2}
                p={1}
                onChange={formik.handleChange}
              />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack
              w='full'
              verticalAlign='center'
              my={2}
              justifyContent='center'
            >
              <FormLabel w='70px' fontSize='sm'>
                x3:
              </FormLabel>
              <Input
                type='text'
                name='x3'
                value={formik.values.x3}
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
