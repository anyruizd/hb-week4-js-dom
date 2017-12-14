import { Button } from './components/button/button.js'
import { Display } from './components/display/display.js'

/* eslint-disable */
const display = new Display('.display','I am a display!')
new Button('.button', 'Click me!', display.setText.bind(display))
