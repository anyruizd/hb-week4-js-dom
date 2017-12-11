export class Gallery {
  constructor (node, data) {
    this.node = node
    // 1. ------------------------------------ Set template
    this.galleryTemplate = {
      containers: (
              `<ul class="gallery__images"></ul>
               <div class ="gallery__controls">
                <button class="gallery__control gallery__control--right">&#62</button>
                <button class="gallery__control gallery__control--left">&#60</button>
                <ul class ="gallery__dots"></ul>
               </div>`
            )
    }
    this.node.innerHTML = this.galleryTemplate.containers // to de DOM
    this.node.tabIndex = 0
        // bring DOM references of elements created
    this.galleryElements = {}
    this.galleryElements.galleryImages = this.node.querySelector('.gallery__images')
    this.galleryElements.galleryControlRight = this.node.querySelector('.gallery__control--right')
    this.galleryElements.galleryControlLeft = this.node.querySelector('.gallery__control--left')
    this.galleryElements.galleryDots = this.node.querySelector('.gallery__dots')

        // 2. ------------------------------------ Set images
    this.imagesTemplate = data.map(({url}, index) => {
      return (
            `<li>
                <img class="gallery-images__element" src="${url}"/>
            </li>`
      )
    }).join('')

    this.galleryElements.galleryImages.innerHTML = this.imagesTemplate
    this.galleryElements.imagesList = this.node.querySelectorAll('.gallery-images__element')

    // 3. ------------------------------------ Set dots

    this.dotsTemplate = data.map((_, index) => {
      return (
            `<li class="gallery__dot">
                <button class="gallery-dot__button"></button>
            </li>`
      )
    }).join('')

    this.galleryElements.galleryDots.innerHTML = this.dotsTemplate
    this.galleryElements.dotsList = this.node.querySelectorAll('.gallery-dot__button')

    this.currentIndex = 0
    this.testIndex = 0
    this.galleryElements.imagesList[this.currentIndex].classList.add('gallery-images__element--showing')
    this.galleryElements.dotsList[this.currentIndex].classList.add('gallery-dot__button--selected')
    this.galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')

    this.galleryElements.galleryControlLeft.addEventListener('click', this.goPrevious.bind(this))
    this.galleryElements.galleryControlRight.addEventListener('click', this.goNext.bind(this))
    this.node.addEventListener('keydown', this.keyArrows.bind(this))
    this.galleryElements.galleryDots.addEventListener('click', this.changeDot.bind(this))
  } // constructor

  goPrevious () {
    this.testIndex = this.currentIndex - 1
    this.checkStatus(this.testIndex) && (this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex))
  }

  goNext () {
    this.testIndex = this.currentIndex + 1
    this.checkStatus(this.testIndex) && (this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex))
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
    this.galleryElements.imagesList[current].classList.remove('gallery-images__element--showing')
    this.galleryElements.dotsList[current].classList.remove('gallery-dot__button--selected')
    current = test
    this.galleryElements.imagesList[current].classList.add('gallery-images__element--showing')
    this.galleryElements.dotsList[current].classList.add('gallery-dot__button--selected')
    this.galleryElements.dotsList[current].focus()
    return current
  }
    // ------------------------------------ Dots Controler
  changeDot (event) {
    const clickedElement = event.target
    if (clickedElement.classList.contains('gallery-dot__button')) {
      this.testIndex = Array.from(this.galleryElements.dotsList).indexOf(clickedElement)
      this.checkStatus(this.testIndex) && (this.currentIndex = this.updateStatus(this.currentIndex, this.testIndex))
    }
  }

    // ------------------------------------ keyBoard Controler

  keyArrows (event) {
    if (event.key === 'ArrowLeft') {
      this.goPrevious()
    } else if (event.key === 'ArrowRight') {
      this.goNext()
    }
  }
}
