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
  ),
  dot: (
    `<li class="gallery__dot">
      <button class="gallery-dot__button"></button>
    </li>`
  )
}
const node = document.querySelector('.gallery')
node.innerHTML = galleryTemplate.containers // to de DOM

// bring DOM references of elements created
const galleryElements = {}
galleryElements.galleryImages = node.querySelector('.gallery__images')
galleryElements.galleryControlRight = node.querySelector('.gallery-control__right')
galleryElements.galleryControlLeft = node.querySelector('.gallery-control__left')
galleryElements.galleryDots = node.querySelector('.gallery__dots')

// 2. ------------------------------------ Set images
// TODO: Falta poner selectedClass
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

// ------------------------------------ Arrow Controlers

let currentIndex = 0
galleryElements.imagesList[currentIndex].classList.add('gallery-images__element--showing')
galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
galleryElements.galleryControlLeft.addEventListener('click', goPrevious)
galleryElements.galleryControlRight.addEventListener('click', goNext)

function goPrevious () {
  let testIndex = currentIndex - 1
  checkStatus(testIndex) && (currentIndex = updateStatus(currentIndex, testIndex))
}

function goNext () {
  let testIndex = currentIndex + 1
  checkStatus(testIndex) && (currentIndex = updateStatus(currentIndex, testIndex))
}

function checkStatus (index) {
  const isPositive = index >= 0
  const isLessThanLength = index < galleryElements.imagesList.length
  const isDifferentThanCurrent = index !== currentIndex
  if (index === 0) {
    galleryElements.galleryControlLeft.classList.add('gallery__control--disabled')
  } else if (index === galleryElements.imagesList.length - 1) {
    galleryElements.galleryControlRight.classList.add('gallery__control--disabled')
  } else {
    galleryElements.galleryControlLeft.classList.remove('gallery__control--disabled')
    galleryElements.galleryControlRight.classList.remove('gallery__control--disabled')
  }
  if (isPositive && isLessThanLength && isDifferentThanCurrent) {
    return true
  }
}

function updateStatus (current, test) {
  galleryElements.imagesList[current].classList.remove('gallery-images__element--showing')
  current = test
  galleryElements.imagesList[current].classList.add('gallery-images__element--showing')
  return current
}

// ------------------------------------ Dots Controlers
galleryElements.galleryDots.addEventListener('click', changeDot)

function changeDot (event) {
  var clickedElement = event.target
  if (clickedElement.classList.contains('gallery-dot__button')) {
    console.log('clickedElement button!!')
  }
}
