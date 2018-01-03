export class Grid {
  constructor (data, node) {
    this.node = node
    this.gridElements = {}
    this.setTemplate(data)
  }
  setTemplate (data) {
    this.gridElements.template = data.map(({title, year, url, category, director}, index) => {
      return (
        `<li class = "grid__card grid__card--showing" data-card-id = "${category.toLowerCase()}">
          <img class = "grid__card-element" src="${url}">
          <ul class = "grid__card-infos">
            <li class = "grid__card-info">
              <h2>Title:</h2>
              <h2>Genre:</h2>
              <h2>Year:</h2>
              <h2>Director:</h2>
            </li>
            <li class = "grid__card-info">
              <h3>${title}</h3>
              <h3>${category}</h3>
              <h3>${year}</h3>
              <h3>${director}</h3>
            </li>
          </ul>
        </li>`
      )
    }).join('')
    this.node.innerHTML = this.gridElements.template
    this.gridElements.cardsList = Array.from(this.node.querySelectorAll('.grid__card'))
  }
  filterCardByCategory (category) {
    this.gridElements.cardsList.map((element) => {
      if (element.dataset.cardId !== category) {
        element.classList.remove('grid__card--showing')
        element.classList.add('grid__card--hidden')
      }
      if (element.dataset.cardId === category) {
        element.classList.remove('grid__card--hidden')
        element.classList.add('grid__card--showing')
      }
    })
  }
  showAllCategories () {
    this.gridElements.cardsList.map((element) => {
      element.classList.remove('grid__card--hidden')
      element.classList.add('grid__card--showing')
    })
  }
}

export default Grid
