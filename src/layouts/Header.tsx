import {
  Center,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  MdSaveAlt,
  MdOutlineOpenInBrowser,
  MdOutlineSave,
} from 'react-icons/md'
import { useReactFlow } from 'reactflow'
import Analysis from '../components/Analysis'
import Analyzer from '../utils/checkFlow'

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isData, setIsData] = useState<boolean>(true)

  const alert = useToast({position: 'top'})
  const refFlow = useReactFlow()
  const onSubmit = () => {
    const analyzer = new Analyzer(refFlow.toObject())

    if (analyzer.checkFlow()) {
			setIsData(analyzer.getInputData())
      onOpen()
    } else {
      alert({
        title: '模型错误',
        description: "一个模型只有一个输入和输出，并连接正常!",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex
      position='fixed'
      top={0}
      left={0}
      h={12}
      w='full'
      bg='darkBg'
      color='textColor'
      justifyContent='space-between'
    >
      <Flex h='100%' align='center' ml={4}>
        <Heading as='h1' size='md'>
          AI模拟器
        </Heading>
      </Flex>
      <Flex h='100%' align='center' mr={4}>
        <Center as='button' onClick={onSubmit}>
          <Icon as={MdOutlineOpenInBrowser} boxSize={7} />
          <Text>提交模型</Text>
        </Center>
        <Center as='button' onClick={onSubmit}>
          <Icon as={MdSaveAlt} boxSize={7} ml={3} />
          <Text>载入模型</Text>
        </Center>
        <Center as='button' onClick={onSubmit}>
          <Icon as={MdOutlineSave} boxSize={7} ml={3} />
          <Text>保存模型</Text>
        </Center>
      </Flex>
      <Analysis isOpen={isOpen} onClose={onClose} isData={isData} />
    </Flex>
  )
}

export default Header
