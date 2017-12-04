
// Arrows events
const leftArrow = document.querySelector('.gallery-control__left')
const rightArrow = document.querySelector('.gallery-control__right')
const imagesList = document.querySelectorAll('.gallery-images__element')
let currentIndex = 0
imagesList[currentIndex].classList.add('gallery-images__element--showing')
leftArrow.classList.add('gallery__control--disabled')

leftArrow.addEventListener('click', goPrevious)
rightArrow.addEventListener('click', goNext)

function goPrevious () {
  let testIndex = currentIndex - 1
  if (checkStatus(testIndex)) {
    imagesList[currentIndex].classList.remove('gallery-images__element--showing')
    currentIndex = testIndex
    imagesList[currentIndex].classList.add('gallery-images__element--showing')
  }
}

function goNext () {
  let testIndex = currentIndex + 1
  if (checkStatus(testIndex)) {
    imagesList[currentIndex].classList.remove('gallery-images__element--showing')
    currentIndex = testIndex
    imagesList[currentIndex].classList.add('gallery-images__element--showing')
  }
}

function checkStatus (index) {
  const isPositive = index >= 0
  const isLessThanLength = index < imagesList.length
  const isDifferentThanCurrent = index !== currentIndex
  if (index === 0) {
    leftArrow.classList.add('gallery__control--disabled')
  } else if (index === imagesList.length - 1) {
    rightArrow.classList.add('gallery__control--disabled')
  } else {
    leftArrow.classList.remove('gallery__control--disabled')
    rightArrow.classList.remove('gallery__control--disabled')
  }
  if (isPositive && isLessThanLength && isDifferentThanCurrent) {
    return true
  } else return false
}
