// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateUrl() {

  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to randomly be picked
  let collection = []
  collection = collection.concat(lowerCaseLetters.split('')).concat(upperCaseLetters.split('')).concat(numbers.split(''))

  let newUrl = ''
  for (let i = 0; i < 5; i++) {
    newUrl += sample(collection)
  }
  // return the generated newUrl
  return newUrl

}

module.exports = generateUrl