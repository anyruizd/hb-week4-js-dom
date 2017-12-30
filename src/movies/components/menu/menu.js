export class Menu {
  constructor (data, node, callback) {
    this.data = data
    this.node = node
    this.callback = callback
    this.initialTest()
  }

  initialTest () {
    this.node.innerHTML = this.data
    this.node.addEventListener('click', this.callback)
  }
}
