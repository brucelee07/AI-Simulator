import React, { DragEvent } from 'react'
import { Box, Center, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface Props {
  title: string
  subtitle: string
  color: string
  icon: IconType
  onDrop: (
    event: DragEvent,
    title: string,
    subtitle: string,
    icon: IconType,
  ) => void
}

const NodeInput: React.FC<Props> = ({
  title,
  subtitle,
  color,
  icon,
  onDrop,
}) => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <Box
      w='90%'
      draggable
      bg={color}
      borderRadius={5}
      _hover={{ cursor: 'grab' }}
      onDragStart={(event) => onDragStart(event, title)}
      onDragEnd={(event) => onDrop(event, title, subtitle, icon)}
    >
      <Center w='99%' borderRadius={3} ml={1} bg='darkBg'>
        <Icon as={icon} boxSize={3} ml={2} />
        <Text w='100%' fontSize={12} p={1}>
          {subtitle}
        </Text>
      </Center>
    </Box>
  )
}

export default NodeInput
