import { Menu } from './components/menu/menu.js'
import { Grid } from './components/grid/grid.js'
import dataMovies from './moviesData.js'
import './_movies.scss'
/* eslint-disable */
const grid = new Grid (dataMovies, document.querySelector('.grid'))
new Menu (dataMovies, document.querySelector('.menu__buttons'), grid.filterCardByCategory.bind(grid), grid.showAllCategories.bind(grid))
/* eslint-disable */
