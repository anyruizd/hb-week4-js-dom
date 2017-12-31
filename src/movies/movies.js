import { Menu } from './components/menu/menu.js'
import { Grid } from './components/grid/grid.js'
import data from './moviesData.js'
/* eslint-disable */
const grid = new Grid ('I am a stupid!', document.querySelector('.grid__card'))
new Menu (data, document.querySelector('.menu__buttons'), grid.setText.bind(grid))
/* eslint-disable */
