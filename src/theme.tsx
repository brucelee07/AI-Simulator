import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	colors:{
		darkBg: "#2c344c",
		textColor: "#dadcdd",
		rootBg: "#1c232d",
	},
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export default theme
