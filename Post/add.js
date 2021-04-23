const imagehref = document.getElementById("mainlogo")


let nameInput = document.getElementById('name')
let cityInput = document.getElementById('city')
let regionInput = document.getElementById('region')
let priceInput = document.getElementById('price')
let personsInput = document.getElementById('persons')
let addressInput = document.getElementById('address')
let roomInput = document.getElementById('room')
let ratingInput = document.getElementById('rating')
let descriptionInput = document.getElementById('description')
const submitBtn = document.getElementById('submit')
let url = "http://127.0.0.1:3000"

console.log(nameInput, cityInput, regionInput)
//Upload Image Get base64 Url
let file = document.getElementById('file')
let imageUrl2;
file.addEventListener('change', function (){

  // selectedFile = file.files[0]
  // imageUrl = URL.createObjectURL(selectedFile)
  // imaagee.src =`${imageUrl}`
  // document.body.append(imaagee)

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log(reader.result);
    imageUrl2 = reader.result;
    console.log(imageUrl2)

  })


  reader.readAsDataURL(this.files[0])


  
})
// Damateba
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
console.log("clicked")
  poost();
  location.replace("/index.html")
})
// post Request
function poost() {

    fetch(`${url}/hotels`, {
    method: 'POST',
    body: JSON.stringify({
      name: `${nameInput.value}`,
      city: `${cityInput.value}`,
      region: `${regionInput.value}`,
      price: `${priceInput.value}`,
      persons: `${personsInput.value}`,
      address: `${addressInput.value}`,
      room: `${roomInput.value}`,
      rating: `${ratingInput.value}`,
      description: `${descriptionInput.value}`,
      images: [imageUrl2]
    }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

}

imagehref.addEventListener("click", () => {
    location.replace("/index.html")
})