export class Menu {
  constructor (data, node, filterCategoryCallback, showAllCallback) {
    this.node = node
    this.filterCategoryCallback = filterCategoryCallback
    this.showAllCallback = showAllCallback
    this.elements = {}
    this.elements.buttonCategories = data.map(({category}, index) => category)
    this.setButtonCategories()
    this.menuEvents()
  }
  setButtonCategories () {
    let categoriesFiltered = Array.from(new Set(this.elements.buttonCategories)) // Set is a collection of values that allows to save unique values
    this.elements.buttonsTemplate = categoriesFiltered.map((buttonId, index) => {
      return (
        `<li>
          <button class="menu__button" data-button-id = "${buttonId.toLowerCase()}">${buttonId}</button>
        </li>`
      )
    }).join('').concat(
    `<li>
      <button class="menu__button menu__button--all">All</button>
    </li>`
    )
    this.node.innerHTML = this.elements.buttonsTemplate
    this.elements.buttonsList = Array.from(this.node.querySelectorAll('.menu__button'))
  }
  menuEvents () {
    this.node.addEventListener('click', (event) => {
      const clickedElement = event.target
      if (clickedElement.classList.contains('menu__button--all')) {
        this.showAllCallback()
      } else if (clickedElement.classList.contains('menu__button')) {
        this.filterCategoryCallback(clickedElement.dataset.buttonId)
      }
    })
  }
}

export default Menu
