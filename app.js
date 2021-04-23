const search = document.getElementById("search")
const cardParent = document.getElementById("cards-flex")
const cardbox = document.getElementsByClassName("card")
const img = document.getElementById("innerimg")
const title = document.getElementById("titleiner")
const city = document.getElementById("city")
const price = document.getElementById("price")
const rate = document.getElementById("inerrate")
const descript = document.getElementById("inerdescript")
const address = document.getElementById("addressiner")
const submit = document.getElementById("hotelsub");
const addhotel = document.getElementById("addhotel");
let online = false;
const url = "http://127.0.0.1:3000";
const getIn = document.getElementById("getIn");



fetch(`${url}/users`)
.then((res) => {
    return res.json()
})
.then((data) => {
    data.forEach(element => {
        if(element.active == true){
            online = true;
            getIn.innerHTML = "გამოსვლა"
        }
    });
})

addhotel.addEventListener('click', function(){
    event.preventDefault();
    fetch(`${url}/users`)
    .then((res) => {return res.json()})
    .then((data) => {
        if(data[0].active == true || data[1].active == true || data[2].active == true){
            location.replace("/Post/add.html")
        }else{
            location.replace("/loginForm.html")
        }
    })
})

getIn.addEventListener('click', function(){
    event.preventDefault()
    if(online == true){
    fetch(`${url}/users`)
    .then((res) => {
    return res.json()
        })
    .then((data) => {
        data.forEach(element => {
        if(element.active == true){
            function loggingOut (n) {
                fetch(`${url}/users/${n}`, {
                    method:'PATCH',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        user: data[n - 1].user,
                        pass: data[n - 1].pass,
                        id: data[n -1].id,
                        active: false
                    })
                })
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    console.log(data)
                })
            }
            let toLogOut = element.id;
             loggingOut(toLogOut);
        }
    });
})
    }else{
        location.replace("/loginForm.html")
    }
})



const searchHotel = async searchText => {
    const res = await fetch("http://127.0.0.1:3000/hotels");
    const answer = await res.json();

    let filtered = answer.filter(element => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return element.name.match(regex) || element.city.match(regex);
    })
    if(searchText.length === 0){
        filtered = [];
        cardParent.innerHTML = "";
        if(searchText.length++){
        cardParent.innerHTML = ""
    }
    }
    else{
        cardParent.innerHTML = ""
    } 
    
    showCards(filtered);
}


// Show Searched Cards function
const showCards = filtered => {
    if(filtered.length > 0){
        let html = filtered
        .map(element => `
        <div class="card">
   <div class="img">
        <img src="${element.images[0]}" alt="" id="innerimg">
        </div>
        <div class="title" id="cardTitle">
        <h3 id="titleiner">${element.name}</h3>
        <div class="titledescript">
            <p id="city">${element.city}</p>
            <p id="addressiner">${element.address}</p>
        <div class="cardlast">
            <div class="pricing">
                <p id="price">${element.price}</p>
                <span>GEL</span>
            </div>
            <div class="rating">
                <i class="fas fa-star"></i>
                <p id="inerrate">${element.rating}</p>
        </div> 
            </div>
        </div>
       </div>
       <div class="link">
        <a id="mainbtn" href="/hotels/hotel${element.id}.html"> <p>გაგრძელება</p><i class="fas fa-angle-right"></i></a>
        </div>
        </div>
        <script>test();</script>`)
        cardParent.innerHTML += html;
    }
}

search.addEventListener("input", () => searchHotel(search.value)) 

