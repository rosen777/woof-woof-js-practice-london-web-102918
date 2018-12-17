document.addEventListener('DOMContentLoaded', () => {
const apiURL = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

const fetchDogs = () => {
  fetch(apiURL)
  .then(response => response.json())
  .then(renderDogs)
}

const renderDogs = (dogsArray) => {
  console.log(dogsArray)
  dogsArray.forEach(renderSingleDog)

}

const renderSingleDog = (dog) => {
  const dogEl = document.createElement('span')
  dogEl.innerText = `${dog.name}`
  dogBar.append(dogEl)

  dogEl.addEventListener('click', () => {
    dogInfo.innerHTML = ''
    const dogEl = document.createElement('el')
    dogEl.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button id='dog-btn' data-id='${dog.id}'>${dog.isGoodDog}</button>`

    dogInfo.append(dogEl)

    const dogButton = document.querySelector('#dog-btn')
    if(dog.isGoodDog === true) {
      dogButton.innerText = 'Good Dog!'
    } else if (dog.isGoodDog === false){
      dogButton.innerText = 'Bad Dog!'
    }

    dogButton.addEventListener('click', () => {
      if(dogButton.innerText.includes('Good')) {
        dogButton.innerText = 'Bad Dog!'
        updateDogStatus(dog.id, false)
      } else if(dogButton.innerText.includes('Bad')) {
        dogButton.innerText = 'Good Dog!'
        updateDogStatus(dog.id, true)
      }
    })

  })
}

const renderDogPage = (dog) => {
  const dogEl = document.createElement('el')
  dogEl.innerHTML = `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  <button>${dog.isGoodDog}</button>`
  dogInfo.append(dogEl)
}

// const addClickDogStatus = () => {
//   document.addEventListener('click', (e) => {
//     if(e.target.id === 'dog-btn') {
//       updateDogStatus(e.target.dataset.id).then(console.log)
//     }
//   })
// }

const updateDogStatus = (dogId, data) => {
  return fetch(apiURL + `/${dogId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({isGoodDog: data})
  }).then(res => res.json())

}

fetchDogs()


})
