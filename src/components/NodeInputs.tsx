import {VStack, Text, HStack, Icon } from '@chakra-ui/react'
import React, { DragEvent } from 'react'
import NodeInput from './NodeInput'
import { IconType } from 'react-icons'

interface Props {
  title: string
  color: string
  icon: IconType
  subtitles: string[]
  onDrop: (
    event: DragEvent,
    title: string,
    subtitle: string,
    icon: IconType,
  ) => void
}

const NodeInputs: React.FC<Props> = ({
  title,
  color,
  icon,
  subtitles,
  onDrop,
}) => {
  return (
    <VStack w='97%' bg='rootBg' pl={1} mt={1} py={2}>
      <HStack w='100%' verticalAlign='center' mt={2}>
        <Icon as={icon} boxSize={6} ml={2} />
        <Text w='100%'>{title}</Text>
      </HStack>
      {subtitles.map((subtitle) => {
        return (
          <NodeInput
            key={subtitle}
            title={title}
            subtitle={subtitle}
            icon={icon}
            color={color}
            onDrop={onDrop}
          />
        )
      })}
    </VStack>
  )
}

export default NodeInputs
