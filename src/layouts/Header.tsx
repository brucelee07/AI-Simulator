import { Flex, Heading, Icon } from '@chakra-ui/react'
import React from 'react'
import { MdSaveAlt, MdOutlineOpenInBrowser } from 'react-icons/md'
import { useReactFlow } from 'reactflow'

const Header: React.FC = () => {
	const refFlow = useReactFlow()
	const onSubmit = () => {
		console.log(JSON.stringify(refFlow.toObject()))
		// TODO upload file and analysis
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
        <Icon onClick={onSubmit} as={MdOutlineOpenInBrowser} boxSize={7} />
        <Icon as={MdSaveAlt} boxSize={7} ml={3} />
      </Flex>
    </Flex>
  )
}

export default Header
