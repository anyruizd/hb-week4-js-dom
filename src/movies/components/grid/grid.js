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
        `<li class = "grid__card-container" data-card-id = "${category.toLowerCase()}">
        <div class = "grid__card"> 
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
    this.gridElements.cardsList = Array.from(this.node.querySelectorAll('.grid__card-container'))
  }
  filterCardByCategory (category) {
    this.gridElements.cardsList.map((element) => {
      element.classList.remove('grid__card--clicked')
      if (element.dataset.cardId !== category) {
        element.classList.remove('grid__card-container--showing')
        element.classList.add('grid__card-container--hidden')
      }
      if (element.dataset.cardId === category) {
        element.classList.remove('grid__card-container--hidden')
        element.classList.add('grid__card-container--showing')
      }
    })
  }
  showAllCategories () {
    this.gridElements.cardsList.map((element) => {
      element.classList.remove('grid__card--clicked')
      element.classList.remove('grid__card-container--hidden')
      element.classList.add('grid__card-container--showing')
    })
  }

  gridEvents () {
    this.node.addEventListener('click', (event) => {
      const clickedElement = event.target.closest('.grid__card-container')
      this.gridElements.cardsList.map((element) => {
        if (element === clickedElement) {
          clickedElement.classList.toggle('grid__card--clicked')
        } else {
          element.classList.remove('grid__card--clicked')
        }
      })
    })
  }
}

export default Grid
