
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

fetch(`${url}/request`)
.then((res) => res.json())
.then((data) => {
  const y = data.length - 1;
  let x = data[y].tosee
  fetch(`${url}/hotels/${x}`)
.then((res) => {return res.json()})
.then((data) => {
  cityInput.value = data.city;
  nameInput.value = data.name;
  regionInput.value = data.region;
  priceInput.value = data.price;
  personsInput.value = data.persons;
  addressInput.value = data.address;
  roomInput.value = data.room;
  ratingInput.value = data.rating;
  descriptionInput.value = data.description;
  })
})






//Upload Image Get base64 Url
let file = document.getElementById('file')
let imageUrl2;
file.addEventListener('change', function (){


  const reader = new FileReader();
  reader.addEventListener('load', () => {
    imageUrl2 = reader.result;

  })


  reader.readAsDataURL(this.files[0])


  
})
// Damateba
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  patch(13);
  location.replace("/index.html")
})
// post Request
function patch(e) {

    fetch(`${url}/hotels/${e}`, {
    method: 'PATCH',
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