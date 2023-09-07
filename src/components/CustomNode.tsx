import { Center, Icon, Text, VStack } from '@chakra-ui/react'
import { memo } from 'react'
import { IconType } from 'react-icons'
import { NodeProps, Position } from 'reactflow'
import Handle from './CustomHandle'

export type NodeData = {
  title: string
  icon?: IconType
  subline?: string
  type?: string
  selected?: boolean
}

const CustomNode = memo(({ data }: NodeProps<NodeData>) => {
  const handleStyle = {
    width: '2px',
    height: '2px',
    borderRadius: '0px',
    marginRight: '1px',
    transform: 'rotate(45deg)',
    backgroundColor: '#2c344c',
  }

  const color = () => {
    if (data.type === 'input') {
      return 'red'
    } else if (data.type === 'output') {
      return 'blue'
    } else {
      return 'green'
    }
  }

  const showType = (nodeType: string | undefined) => {
    if (nodeType === 'input') {
      return (
        <Handle
          style={handleStyle}
          maxConnections={1}
          isConnectable={true}
          type='source'
          position={Position.Bottom}
        />
      )
    } else if (nodeType === 'output') {
      return (
        <Handle
          style={handleStyle}
          maxConnections={1}
          isConnectable={true}
          type='target'
          position={Position.Top}
        />
      )
    } else {
      return (
        <>
          <Handle
            style={handleStyle}
            maxConnections={2}
            isConnectable={true}
            type='target'
            position={Position.Top}
          />
          <Handle
            style={handleStyle}
            type='source'
            position={Position.Bottom}
            maxConnections={2}
            isConnectable={true}
          />
        </>
      )
    }
  }

  return (
    <VStack w={28} p={1} bg='darkBg' borderRadius='lg'>
      <Center w='full' bg={color()} borderRadius='md'>
        <Center w='97%' ml={1} bg='gray.800' borderRadius='md'>
          <Icon as={data.icon} boxSize={3} ml={2} />
          <Text w='100%' fontSize={12} p={1}>
            {data.title}
          </Text>
        </Center>
      </Center>

      <Text w='100%' fontSize={12} p={1}>
        {data.subline}
      </Text>

      {showType(data.type)}
    </VStack>
  )
})

export default CustomNode
