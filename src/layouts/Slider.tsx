import React, { DragEvent } from 'react'
import { Flex, Text, VStack } from '@chakra-ui/react'
import {
  MdFolderOpen,
  MdOutlineReceiptLong,
  MdOutlineOutput,
} from 'react-icons/md'

import NodeInputs from '../components/NodeInputs'
import { IconType } from 'react-icons'

interface Props {
  onDrop: (
    event: DragEvent,
    title: string,
    subtitle: string,
    icon: IconType,
  ) => void
}

const Slider: React.FC<Props> = ({ onDrop }) => {
  return (
    <Flex
      position='fixed'
      direction='column'
      top='52px'
      left={0}
      bg='darkBg'
      color='textColor'
      h='100vh'
      w={48}
      justifyContent='space-between'
    >
      <VStack>
        <NodeInputs
          title='数据输入'
          color='red'
          icon={MdFolderOpen}
          subtitles={['数据输入', '图像输入', '文本输入']}
          onDrop={onDrop}
        />

        <NodeInputs
          title='基础模型'
          color='green'
          icon={MdOutlineReceiptLong}
          subtitles={[
            '线性回归',
            '分类器',
            '神经元',
            '决策树',
            '随机森林',
            '朴素贝叶斯',
            'SVM',
          ]}
          onDrop={onDrop}
        />
        <NodeInputs
          title='预测结果'
          color='blue'
          icon={MdOutlineOutput}
          subtitles={['预测数据', '预测类别']}
          onDrop={onDrop}
        />
      </VStack>
      <VStack p={2} h='100' w='100%'>
        <Text bg='rootBg' p={2} fontSize='xs' borderRadius='md'>
          联系@wx: labnetworks
        </Text>
      </VStack>
    </Flex>
  )
}

export default Slider
