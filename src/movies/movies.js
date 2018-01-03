import { Menu } from './components/menu/menu.js'
import { Grid } from './components/grid/grid.js'
import data from './moviesData.js'
/* eslint-disable */
const grid = new Grid (data, document.querySelector('.grid'))
new Menu (data, document.querySelector('.menu__buttons'), grid.filterCardByCategory.bind(grid), grid.showAllCategories.bind(grid))
/* eslint-disable */
