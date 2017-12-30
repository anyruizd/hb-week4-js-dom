import { Menu } from './components/menu/menu.js'
import { Grid } from './components/grid/grid.js'

/* eslint-disable */
const grid = new Grid ('I am a stupid!', document.querySelector('.grid__card'))
new Menu ('Holi Any', document.querySelector('.header__button'), grid.setText.bind(grid))
