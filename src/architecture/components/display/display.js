export class Display {
    constructor(selector, text){
        this.text = text
        this.node = document.querySelector(selector)
    }
    setText(){
        this.node.innerHTML = this.text
    }
}
