export class Grid {
  constructor (data, node) {
    this.node = node
    this.gridElements = {}
    this.setTemplate(data)
    this.gridEvents()
  }
  setTemplate (data) {
    this.gridElements.template = data.map(({title, year, url, category, director, description}, index) => {
      return (
        `<li class = "grid__card" data-card-index = "${index}" data-card-id = "${category.toLowerCase()}">
          <div class = "grid__card--front">
            <img class = "grid__card-element" src="${url}">
            <ul class = "grid__card-infos">
              <li class = "grid__card-info">
                <h2>
                  <p>Title:</p>
                  <p>Genre:</p>
                  <p>Year:</p>
                  <p>Director:</p>
                </h2>
              </li>
              <li class = "grid__card-info">
                <h3>
                <p>${title}</p>
                <p>${category}</p>
                <p>${year}</p>
                <p>${director}</p>
                </h3>
            </li>
          </ul>
          </div>
          <div class = "grid__card--back">
          <h4>${title}</h4>
          <p>${description}</p>
          </div>
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

  gridEvents () {
    this.node.addEventListener('click', (event) => {
      // this.gridElements.cardsList.classList.toggle('grid__card--clicked')
      // var eventPath = Array.from(event.path)
      console.log(event)
      // const clickedElement = event.target
      // const holi = this.gridElements.cardsList.indexOf(clickedElement)
      // console.log(this.gridElements.cardsList)
      /* if ((Array.from(event.path)).contains('li.grid__card')) {
        console.log(event.path)
      } */
    })
  }
}

export default Grid
