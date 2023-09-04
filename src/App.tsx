import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import Header from './layouts/Header'
import FlowChart from './components/FlowChart'
import { ReactFlowProvider } from 'reactflow'

import './index.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ReactFlowProvider>
        <Box bg='rootBg' w='full' h='100vh' position='absolute' pl={48} pt={12}>
          <Header />
          <FlowChart />
        </Box>
      </ReactFlowProvider>
    </ChakraProvider>
  )
}

export default App
