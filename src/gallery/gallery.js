// 1. ------------------------------------ Set template

import data from './galleryData.js'

const galleryTemplate = {
  containers: (
    `<ul class="gallery__images"></ul>
     <div class ="gallery__controls">
      <button class="gallery__control gallery-control__right">&#62</button>
      <button class="gallery__control gallery-control__left">&#60</button>
      <ul class ="gallery__dots"></ul>
     </div>`
  )
}
const node = document.querySelector('.gallery')
node.innerHTML = galleryTemplate.containers // to de DOM
node.tabIndex = 0
// bring DOM references of elements created
const galleryElements = {}
galleryElements.galleryImages = node.querySelector('.gallery__images')
galleryElements.galleryControlRight = node.querySelector('.gallery-control__right')
galleryElements.galleryControlLeft = node.querySelector('.gallery-control__left')
galleryElements.galleryDots = node.querySelector('.gallery__dots')

// 2. ------------------------------------ Set images
const imagesTemplate = data.map(({url}, index) => {
  return (
    `<li>
      <img class="gallery-images__element" src="${url}"/>
    </li>`
  )
}).join('')

galleryElements.galleryImages.innerHTML = imagesTemplate
galleryElements.imagesList = document.querySelectorAll('.gallery-images__element')

// 3. ------------------------------------ Set dots

const dotsTemplate = data.map((_, index) => {
  return (
    `<li class="gallery__dot">
      <button class="gallery-dot__button"></button>
    </li>`
  )
}).join('')

galleryElements.galleryDots.innerHTML = dotsTemplate
galleryElements.dotsList = document.querySelectorAll('.gallery-dot__button')
console.log('galleryElements.dotsList', galleryElements.dotsList)

// ------------------------------------ Arrow Controlers

let currentIndex = 0
let testIndex
galleryElements.imagesList[currentIndex].classList.add('gallery-images__element--showing')
galleryElements.dotsList[currentIndex].classList.add('gallery-dot__button--selected')
galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
galleryElements.galleryControlLeft.addEventListener('click', goPrevious)
galleryElements.galleryControlRight.addEventListener('click', goNext)

function goPrevious () {
  testIndex = currentIndex - 1
  checkStatus(testIndex) && (currentIndex = updateStatus(currentIndex, testIndex))
}

function goNext () {
  testIndex = currentIndex + 1
  checkStatus(testIndex) && (currentIndex = updateStatus(currentIndex, testIndex))
}

function checkStatus (index) {
  const isPositive = index >= 0
  const isLessThanLength = index < galleryElements.imagesList.length
  const isDifferentThanCurrent = index !== currentIndex
  if (index === 0) {
    galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
    galleryElements.galleryControlRight.classList.remove('gallery__control--disabled')
    return true
  } else if (index === galleryElements.imagesList.length - 1) {
    galleryElements.galleryControlRight.classList.add('gallery__control--disabled')
    galleryElements.galleryControlLeft.classList.remove('gallery__control--disabled')
    return true
  }
  if (isPositive && isLessThanLength) {
    galleryElements.galleryControlRight.classList.remove('gallery__control--disabled')
    galleryElements.galleryControlLeft.classList.remove('gallery__control--disabled')
    if (isDifferentThanCurrent) {
      return true
    }
  }
}

function updateStatus (current, test) {
  galleryElements.imagesList[current].classList.remove('gallery-images__element--showing')
  galleryElements.dotsList[current].classList.remove('gallery-dot__button--selected')
  current = test
  galleryElements.imagesList[current].classList.add('gallery-images__element--showing')
  galleryElements.dotsList[current].classList.add('gallery-dot__button--selected')
  galleryElements.dotsList[current].focus()
  return current
}

// ------------------------------------ Dots Controler
galleryElements.galleryDots.addEventListener('click', changeDot)

function changeDot (event) {
  const clickedElement = event.target
  if (clickedElement.classList.contains('gallery-dot__button')) {
    let testIndex = Array.from(galleryElements.dotsList).indexOf(clickedElement)
    checkStatus(testIndex) && (currentIndex = updateStatus(currentIndex, testIndex))
  }
}

// ------------------------------------ keyBoard Controler

node.addEventListener('keydown', keyArrows)

function keyArrows (event) {
  if (event.key === 'ArrowLeft') {
    goPrevious()
  } else if (event.key === 'ArrowRight') {
    goNext()
  }
}
