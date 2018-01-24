import './_gallery.scss'
export class Gallery {
  constructor (node, data) {
    this.node = node
    this.galleryElements = {}
    this.setGallery(data)
    this.galleryEvents()
    this.galleryPreSet()
  }

  static get setTemplate () {
    return (
              `<ul class="gallery__images"></ul>
               <div class ="gallery__controls-container">
               <section class = "gallery__controls">
                <button class="gallery__control gallery__control--left">&#60</button>
                <button class="gallery__control gallery__control--right">&#62</button>
              </section>
                <ul class ="gallery__dots"></ul>
               </div>`
    )
  }

  static setImages (data) {
    return (
      data.map(({url}, index) => {
        return (
            `<li class="gallery__images-item">
                <img class="gallery__images-element" src="${url}"/>
            </li>`
        )
      }).join(''))
  }

  static setDots (data) {
    return (
      data.map((_, index) => {
        return (
          `<li class="gallery__dot">
            <button class="gallery__dot-button"></button>
          </li>`
        )
      }).join('')
    )
  }

  setGallery (data) {
    this.node.innerHTML = Gallery.setTemplate
    this.node.tabIndex = 0
    this.galleryElements.galleryImages = this.node.querySelector('.gallery__images')

    this.galleryElements.galleryImages.innerHTML = Gallery.setImages(data)
    this.galleryElements.imagesList = this.node.querySelectorAll('.gallery__images-element')

    this.galleryElements.galleryControlRight = this.node.querySelector('.gallery__control--right')
    this.galleryElements.galleryControlLeft = this.node.querySelector('.gallery__control--left')
    this.galleryElements.galleryDots = this.node.querySelector('.gallery__dots')

    this.galleryElements.galleryDots.innerHTML = Gallery.setDots(data)
    this.galleryElements.dotsList = this.node.querySelectorAll('.gallery__dot-button')
  }

  galleryEvents () {
    this.galleryElements.galleryControlLeft.addEventListener('click', this.goPrevious.bind(this))
    this.galleryElements.galleryControlRight.addEventListener('click', this.goNext.bind(this))
    this.node.addEventListener('keydown', this.keyArrows.bind(this))
    this.galleryElements.galleryDots.addEventListener('click', this.changeDot.bind(this))
  }

  galleryPreSet () {
    this.currentIndex = 0
    this.testIndex = 0
    this.galleryElements.imagesList[this.currentIndex].classList.add('gallery__images-element--showing')
    this.galleryElements.dotsList[this.currentIndex].classList.add('gallery__dot-button--selected')
    this.galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
  }

  goPrevious () {
    this.testIndex = this.currentIndex - 1
    if (this.checkStatus(this.testIndex)) {
      this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex)
    }
  }

  goNext () {
    this.testIndex = this.currentIndex + 1
    if (this.checkStatus(this.testIndex)) {
      this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex)
    }
  }

  checkStatus (index) {
    const isPositive = index >= 0
    const isLessThanLength = index < this.galleryElements.imagesList.length
    const isDifferentThanCurrent = index !== this.currentIndex
    if (index === 0) {
      this.galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
      this.galleryElements.galleryControlRight.classList.remove('gallery__control--disabled')
      return true
    } else if (index === this.galleryElements.imagesList.length - 1) {
      this.galleryElements.galleryControlRight.classList.add('gallery__control--disabled')
      this.galleryElements.galleryControlLeft.classList.remove('gallery__control--disabled')
      return true
    }
    if (isPositive && isLessThanLength) {
      this.galleryElements.galleryControlRight.classList.remove('gallery__control--disabled')
      this.galleryElements.galleryControlLeft.classList.remove('gallery__control--disabled')
      if (isDifferentThanCurrent) {
        return true
      }
    }
  }

  updateStatus (current, test) {
    this.galleryElements.imagesList[current].classList.remove('gallery__images-element--showing')
    this.galleryElements.dotsList[current].classList.remove('gallery__dot-button--selected')
    current = test
    this.galleryElements.imagesList[current].classList.add('gallery__images-element--showing')
    this.galleryElements.dotsList[current].classList.add('gallery__dot-button--selected')
    this.galleryElements.dotsList[current].focus()
    return current
  }

  changeDot (event) {
    const clickedElement = event.target
    if (clickedElement.classList.contains('gallery__dot-button')) {
      this.testIndex = Array.from(this.galleryElements.dotsList).indexOf(clickedElement)
      this.checkStatus(this.testIndex) && (this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex))
    }
  }

  keyArrows (event) {
    if (event.key === 'ArrowLeft') {
      this.goPrevious()
    } else if (event.key === 'ArrowRight') {
      this.goNext()
    }
  }
}

export default Gallery
