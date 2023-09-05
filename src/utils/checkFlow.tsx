import * as _ from 'lodash'
import { ReactFlowJsonObject } from 'reactflow'

// interface FlowChart {
//   edges: object[]
//   nodes: object[]
//   viewport: {
//     x: string
//     y: string
//     zoom: string
//   }
// }

class Analyzer {
  _flowChart: ReactFlowJsonObject

  constructor(flowChart: ReactFlowJsonObject) {
    this._flowChart = flowChart
  }

  checkHealth(): boolean {
		const nodesExist = [this.checkInput(), this.checkOutput(), this.checkDefault()]
		console.log(nodesExist)
    return true
  }

  checkInput(): boolean {
		return this.checkType('input')
  }

  checkOutput(): boolean {
		return this.checkType('output')
  }

  checkDefault(): boolean {
		return this.checkType('default')
  }

	checkType(key:string) :boolean{
    const v = _.find(this._flowChart.nodes, function (o) {
      return o.data.type === key
    })
    return Boolean(v)
	}
}

export default Analyzer
