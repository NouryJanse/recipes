import { createGlobalStyle } from 'styled-components'
import { OpenSans300 } from './OpenSans-300'
import { OpenSans300Italic } from './OpenSans-300-Italic'
import { OpenSans400 } from './OpenSans-400'
import { OpenSans500 } from './OpenSans-500'
import { OpenSans600 } from './OpenSans-600'
import { OpenSans700 } from './OpenSans-700'
import { OpenSans800 } from './OpenSans-800'

export default createGlobalStyle`
  ${OpenSans300} 
  ${OpenSans300Italic} 
  ${OpenSans400} 
  ${OpenSans500} 
  ${OpenSans600} 
  ${OpenSans700} 
  ${OpenSans800}
`
