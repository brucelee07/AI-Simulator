import {
	Center,
	Flex,
	Heading,
	Icon,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import {
	MdSaveAlt,
	MdOutlineOpenInBrowser,
	MdOutlineSave,
} from 'react-icons/md'
import { useReactFlow } from 'reactflow'
import Analysis from '../components/Analysis'
import Analyzer, { Node } from '../utils/analizeFlow'
import LoadModel from '../components/LoadModel'

const Header: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen: isOpenLoad,
		onOpen: onOpenLoad,
		onClose: onCloseLoad,
	} = useDisclosure()

	const [isData, setIsData] = useState<boolean>(true)
	const [nodeLink, setNodeLink] = useState<Node>()

	const alert = useToast({ position: 'top' })
	const refFlow = useReactFlow()
	const onSubmit = () => {
		const analyzer = new Analyzer(refFlow.toObject())

		if (analyzer.checkFlow()) {
			setIsData(analyzer.getInputData())
			setNodeLink(analyzer.getNodeLink())
			onOpen()
		} else {
			alert({
				title: '模型错误',
				description: '一个模型只有一个输入和输出，并连接正常!',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}
	}

	const onRestore = useCallback(
		(flowData: string | ArrayBuffer | null) => {
			const restoreFlow = async (flowData: string) => {
				const flow = JSON.parse(flowData)

				if (flow) {
					const { x = 0, y = 0, zoom = 1 } = flow.viewport
					refFlow.setNodes(flow.nodes || [])
					refFlow.setEdges(flow.edges || [])
					refFlow.setViewport({ x, y, zoom })
				}
			}
			if (typeof flowData !== 'string') {
				alert({
					title: '模型格式错误',
					description: '载入模型无法使用！',
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
			} else {
				restoreFlow(flowData)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[refFlow],
	)

	const loadModel = () => {
		onOpenLoad()
	}

	const saveModel = () => {
		const data = JSON.stringify(refFlow.toObject())
		const fileName = 'model.txt'
		const blob = new Blob([data], { type: 'text/plain' })
		const dataUrl = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = dataUrl
		a.download = fileName
		a.click()
		window.URL.revokeObjectURL(dataUrl)
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
					机器学习乐园
				</Heading>
			</Flex>
			<Flex h='100%' align='center' mr={4}>
				<Center as='button' onClick={onSubmit}>
					<Icon as={MdOutlineOpenInBrowser} boxSize={7} />
					<Text>提交模型</Text>
				</Center>
				<Center as='button' onClick={loadModel}>
					<Icon as={MdSaveAlt} boxSize={7} ml={3} />
					<Text>载入模型</Text>
				</Center>
				<Center as='button' onClick={saveModel}>
					<Icon as={MdOutlineSave} boxSize={7} ml={3} />
					<Text>保存模型</Text>
				</Center>
			</Flex>
			<Analysis isOpen={isOpen} onClose={onClose} isData={isData} nodeLink={nodeLink} />
			<LoadModel
				isOpen={isOpenLoad}
				onClose={onCloseLoad}
				handleRestore={onRestore}
			/>
		</Flex>
	)
}

export default Header
