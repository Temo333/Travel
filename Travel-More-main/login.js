

const user = document.getElementById("user");
const pass = document.getElementById("pass");
const submit = document.getElementById("submit");
let loggedIn = false;
let id = 0;
const userUrl = "http://127.0.0.1:3000";
const sae = "wooork!";
export default sae;


submit.addEventListener("click", function s(){

    event.preventDefault();
    fetch("http://127.0.0.1:3000/users")
    .then((res) => {
        return res.json()
    }).then((data) => {

        function active (n) {
            fetch(`${userUrl}/users/${id}`, {
                method:'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user: data[n].user,
                    pass: data[n].pass,
                    id: data[n].id,
                    active: true
                })
            })
            .then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data)
            })
        }
        


        if(user.value == data[0].user && pass.value === data[0].pass){
            console.log("welcome", data[0].user)
            loggedIn = true;
            id = data[0].id
            active(0);
            location.replace("/index.html")

        }
        else if(user.value == data[1].user && pass.value === data[1].pass){
            console.log("welcome", data[1].user)
            loggedIn = true;
            id = data[1].id
            active(1);
            location.replace("/index.html")
        }       
        else if(user.value == data[2].user && pass.value === data[2].pass){
            console.log("welcome", data[2].user)
            loggedIn = true;
            id = data[2].id
            active(2);
            location.replace("/index.html")
        }       
        else{
            user.style.border = "2px solid red"
            pass.style.border = "2px solid red"
        }
    })
})

// if(user.value === "user" && pass.value === "pass"){
//     console.log("Welcome")
// }else{
//     console.log("Try Agin")
// }