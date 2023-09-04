import React, { useCallback, useState, DragEvent, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import ReactFlow, {
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  MarkerType,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode, { NodeData } from './CustomNode'
import {
  MdFolderOpen,
  MdOutlineReceiptLong,
  MdOutlineOutput,
} from 'react-icons/md'
import Slider from '../layouts/Slider'
import { IconType } from 'react-icons'

const nodeTypes = {
  custom: CustomNode,
}

let id = 0
const getID = () => `c_${id++}`

const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: 'lightgray' },
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'lightgray',
  },
}

const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      title: '数据输入',
      icon: MdFolderOpen,
      subline: '图像输入',
      type: 'input',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 0, y: 100 },
    data: {
      title: '基础模型',
      icon: MdOutlineReceiptLong,
      subline: '分类器',
      type: 'default',
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 0, y: 200 },
    data: {
      title: '预测结果',
      icon: MdOutlineOutput,
      subline: '预测类别',
      type: 'output',
    },
  },
]
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
]

const FlowChart: React.FC = () => {
  const flowRef = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent, title: string, subtitle: string, icon: IconType) => {
      if (event.clientX < 200) return

      event.dataTransfer.effectAllowed = 'none'
      const type = event.dataTransfer!.getData('application/reactflow')
      if (typeof type === 'undefined' || !type) {
        return
      }
      let nodeType = 'input'
      if (type === '基础模型') {
        nodeType = 'default'
      } else if (type === '预测结果') {
        nodeType = 'output'
      }
      // eslint-disable-next-line
      // @ts-ignore
      const reactFlowBounds = flowRef.current.getBoundingClientRect()
      // eslint-disable-next-line
      // @ts-ignore
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: getID().toString(),
        type: 'custom',
        position,
        data: { title: title, subline: subtitle, icon: icon, type: nodeType },
      }
      setNodes((nodes) => nodes.concat(newNode))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactFlowInstance],
  )

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  return (
    <Box
      position='relative'
      left={0}
      top={0}
      color='textColor'
      p={2}
      w='100%'
      h='100%'
    >
      <Slider onDrop={onDrop} />
      <ReactFlow
        ref={flowRef}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        onDragOver={onDragOver}
        // eslint-disable-next-line
        // @ts-ignore
        onInit={setReactFlowInstance}
        proOptions={{ hideAttribution: true }}
      />
    </Box>
  )
}

export default FlowChart
