import * as _ from 'lodash'
import { ReactFlowJsonObject } from 'reactflow'

export interface Node {
	id: string
	title: string
	subtitle: string
	type: 'input' | 'output' | 'default'
	next: Node | undefined
}

class Analyzer {
	private _flowChart: ReactFlowJsonObject
	private _head: Node | undefined

	constructor(flowChart: ReactFlowJsonObject) {
		this._flowChart = flowChart
		if (this.checkHealth()) this.makeLink()
	}

	checkFlow(): boolean {
		if (this._head === undefined || this._head?.type !== 'input') return false
		if (this._head.next?.type !== 'default') return false
		return this.checkEndNode(this._head)
	}

	checkEndNode(currentNode: Node): boolean {
		if (currentNode.next !== undefined) {
			return this.checkEndNode(currentNode.next)
		} else {
			return currentNode.type === 'output'
		}
	}

	getNodeLink(): Node {
		return this._head!
	}

	checkHealth(): boolean {
		const nodesExist = [
			this.checkInput(),
			this.checkOutput(),
			this.checkDefault(),
		]
		return nodesExist.every((value) => value === true)
	}

	checkEdge(): boolean {
		return true
	}

	getInputData(): boolean {
		if (this._head?.subtitle !== '图像输入') {
			return true
		}
		return false
	}

	makeLink(): void {
		this.getHeadNode()
		if (this._head) this.makeLineHelper(this._head)
	}

	makeLineHelper(currentNode: Node): void {
		for (const edge of this._flowChart.edges) {
			if (edge.source === currentNode.id) {
				currentNode.next = this.getTargetNode(edge.target)
				this.makeLineHelper(currentNode.next)
			}
		}
	}

	getTargetNode(id: string): Node {
		const head = _.filter(this._flowChart.nodes, function(o) {
			return o.id === id
		})[0]

		return {
			id: head.id,
			title: head.data.title,
			subtitle: head.data.subline,
			type: head.data.type,
			next: undefined,
		}
	}

	getHeadNode(): void {
		const head = _.filter(this._flowChart.nodes, function(o) {
			return o.data.type === 'input'
		})[0]
		this._head = {
			id: head.id,
			title: head.data.title,
			subtitle: head.data.subline,
			type: 'input',
			next: undefined,
		}
	}

	checkInput(): boolean {
		const result = this.checkType('input')
		return result.length === 1
	}

	checkOutput(): boolean {
		const result = this.checkType('output')
		return result.length === 1
	}

	checkDefault(): boolean {
		const result = this.checkType('default')
		return result.length >= 1
	}

	checkType(key: string): object[] {
		const v = _.filter(this._flowChart.nodes, function(o) {
			return o.data.type === key
		})
		return v
	}
}

export default Analyzer
