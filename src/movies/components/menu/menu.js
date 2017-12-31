export class Menu {
  constructor (data, node, callback) {
    // this.data = data
    this.node = node
    this.callback = callback
    this.buttonCategories = data.map(({category}, index) => category)
    this.setButtonCategories() // Set is a collection of values that allows to save unique values
    this.initialTest()
  }
  setButtonCategories () {
    let categoriesFiltered = Array.from(new Set(this.buttonCategories))
    this.buttonsTemplate = categoriesFiltered.map((item, index) => {
      return (
        `<li>
          <button class="menu__button">${item}</button>
        </li>`
      )
    }).join('')
    this.node.innerHTML = this.buttonsTemplate
  }
  initialTest () {
    // this.node.innerHTML = this.data
    this.node.addEventListener('click', this.callback)
  }
}
