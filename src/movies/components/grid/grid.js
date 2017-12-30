export class Grid {
  constructor (data, node) {
    this.node = node
    this.data = data
  }
  setText () {
    this.node.innerHTML = this.data
  }
}
