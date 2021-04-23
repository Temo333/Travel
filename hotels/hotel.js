let online = false;
let getIn = document.getElementById("getIn")
let urlT = "http://127.0.0.1:3000"   


    function checkActive(){
    
    
    fetch(`${urlT}/users`)
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
    }



getIn.addEventListener('click', function(){
    event.preventDefault()
    if(online == true){
    fetch(`${urlT}/users`)
    .then((res) => {
    return res.json()
        })
    .then((data) => {
        data.forEach(element => {
        if(element.active == true){
            function loggingOut (n) {
                fetch(`${urlT}/users/${n}`, {
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
checkActive()

    function letIn(){
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
    }
    letIn()



export default function getHotel(id){
const logo = document.getElementsByClassName("logo")
const images = document.getElementById("hotelimg");
const hotelName = document.getElementById("hotelname");
const hotelCity = document.getElementById("hotelcity");
const hotelAddress = document.getElementById("hoteladdress");
const hotelPrice = document.getElementById("hotelprice");
const hotelRoom = document.getElementById("hotelroom");
const hotelRating = document.getElementById("hotelrating");
const descript = document.getElementById("agwera");
const imageparent = document.getElementById("imgslider")
let submit = document.getElementById("dajavshna");
const nextSlide = document.getElementById("right")
const prevSlide = document.getElementById("left")
const before = document.getElementById("sliderbtns")
const toEdit = document.getElementById("toedit")
    let mainid = id;


    const url = "http://127.0.0.1:3000"
    const logoLink = logo[0].childNodes[1]
    logoLink.setAttribute("href", "/index.html")

    fetch(`${url}/hotels/`)
    .then((res) => {return res.json()})
    .then((data) => {
        function content(z){
            hotelName.innerHTML = data[z].name
            hotelCity.innerHTML = data[z].city
            hotelAddress.innerHTML = data[z].address
            hotelPrice.innerHTML = data[z].price
            hotelRoom.innerHTML = data[z].room
            hotelRating.innerHTML = data[z].rating
            descript.innerHTML = data[z].description
        }
        content(mainid)

        // ADD HERE
        function checkIfManager(gadasacemi){
            let getIn = document.getElementById("getIn")
            const toEdit = document.getElementById("toedit")
            let urlF = "http://127.0.0.1:3000"
            let editLink = document.createElement("li")
            editLink.setAttribute("id", "intext")
            toEdit.appendChild(editLink)
            let linkToGo = document.createElement("a")
            linkToGo.setAttribute("href", "/Patch/patch.html")
            linkToGo.innerHTML = "Edit"
            let some = document.getElementById("intext");
            
            fetch(`${urlF}/users`)
            .then((res) => {return res.json()})
            .then((data) => {
                let ideal = data.id;
                if(data[2].active == true){
                    some.appendChild(linkToGo)

                    let saremovo = some.children[0]
                    let saremovovo = some.children[2]

                   saremovo.setAttribute("style", "display: none;")
                   saremovovo.setAttribute("style", "display:none;")
                    linkToGo.addEventListener('click' ,(e) => { 
                        vergavige(mainid)
                    })}    
                    else{
                    while (some.firstChild) {
                        parent.removeChild(some.firstChild);
                    }
                }
            })
        }
        checkIfManager(mainid)



function vergavige (gadasacemi) {
    let urlF = "http://127.0.0.1:3000"
    fetch(`${urlF}/request`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tosee: gadasacemi
        })
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            function deleteTrace(gadasacemi){
                fetch(`${urlF}/request/${gadasacemi}`, {
                    method: "DELETE"
                })
            }

            setTimeout(() => {console.log("WORKS ? ")}, 3000)}





        )}

        // STOP HERE
        function placeimage(j){
            let imgarr = [];
            data[j].images.forEach((e) => {
                imgarr.push(e)                
            })
            // SLIDER

            let counter = 0;
        nextSlide.onclick = function(){
            next("next")
        }
        prevSlide.onclick = function(){
            next("prev");
        }

        function next(direction){
            if(direction == "next"){
                counter++
                if(counter == imgarr.length){
                    counter = 0;
                }
            }
            else{
                if(counter==0){
                    counter = imgarr.length - 1;
                }
                else{
                    counter--;
                }
            }
            images.setAttribute("src", imgarr[counter]);
        }
            next()
        }
        placeimage(mainid)
    })
    
}
// ის თუ რომელი სასტუმროს ინფო დაბრუნდება
// დამოკიდებულია getHotel()-ში გადაცემულ არგუმენტის აიდზე
// მაგალითად ამ შემთხვევაში არგუნემტი არის 0 ანუ ჰოტელსის 
// არაიდან აიღებს მენულე ინდექსს და დააბრუნებს ინფოს მასზე

getHotel(0)

