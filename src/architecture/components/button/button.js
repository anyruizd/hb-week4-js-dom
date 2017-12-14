export class Button {
    constructor (selector, text, callback) {
        this.callback = callback
        this.text = text
        this.node = document.querySelector(selector)
        this.buildUI()
    }

    buildUI () {
        this.node.innerText = this.text
        this.node.addEventListener('click', this.callback)
    }
}
