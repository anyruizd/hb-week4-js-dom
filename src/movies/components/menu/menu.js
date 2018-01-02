export class Menu {
  constructor (data, node, callback) {
    this.node = node
    this.callback = callback
    this.buttonCategories = data.map(({category}, index) => category)
    this.setButtonCategories()
    this.initialTest()
  }
  setButtonCategories () {
    let categoriesFiltered = Array.from(new Set(this.buttonCategories)) // Set is a collection of values that allows to save unique values
    this.buttonsTemplate = categoriesFiltered.map((buttonId, index) => {
      return (
        `<li>
          <button class="menu__button" data-button-id = "${buttonId.toLowerCase()}">${buttonId}</button>
        </li>`
      )
    }).join('')
    this.node.innerHTML = this.buttonsTemplate
    // I need to bring DOM references for buttons created
  }
  initialTest () {
    this.node.addEventListener('click', this.callback)
  }
}
