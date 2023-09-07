import React, { useCallback } from 'react'
import {
  getConnectedEdges,
  Handle,
  useNodeId,
  useStore,
  ReactFlowState,
  Position,
  HandleType,
} from 'reactflow'

type SelectorFunction = (
  nodeId: string,
  isConnectable?: boolean,
  maxConnections?: number,
) => (s: ReactFlowState) => boolean

const selector: SelectorFunction =
  (nodeId, isConnectable = true, maxConnections = Infinity) =>
  (s) => {
    if (!isConnectable) return false

    const node = s.nodeInternals.get(nodeId)
    const connectedEdges = getConnectedEdges([node!], s.edges)

    return connectedEdges.length < maxConnections
  }

type HandleProps = {
  maxConnections: number
  isConnectable: boolean
  type: HandleType
  position: Position
	style: object
}

const CustomHandle: React.FC<HandleProps> = ({ maxConnections, ...props }) => {
  const nodeId = useNodeId()
  const isConnectable = useStore(
    // eslint-disable-next-line
    useCallback(selector(nodeId!, props.isConnectable, maxConnections), [
      nodeId,
      props.isConnectable,
      maxConnections,
    ]),
  )

  return <Handle {...props} isConnectable={isConnectable} />
}

export default CustomHandle
