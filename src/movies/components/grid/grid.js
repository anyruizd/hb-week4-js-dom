export class Grid {
  constructor (data, node) {
    this.node = node
    this.cardCategories = data.map(({category}, index) => category)
    this.cardTitles = data.map(({title}, index) => title)
    this.cardUrl = data.map(({url}, index) => url)
    this.cardYear = data.map(({year}, index) => year)
    this.cardDirector = data.map(({director}, index) => director)
    this.setTemplate()
  }
  setTemplate () {
    var a = 1
    console.log(a)
  }
  setText () {
    console.log(this.cardYear)
  }
}
