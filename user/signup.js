import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let baseUrl = "http://localhost:8000/users";
let signUpForm = document.getElementById("signupform");
//event listener for sign up form

signUpForm.addEventListener("submit", signUpAction);
async function signUp() {
  const user = {
    id: uuidv4(),
    userId: signUpForm.userId.value,
    name: signUpForm.userName.value,
    password: signUpForm.password.value,
    movies: [],
  };
  const createURL = `${baseUrl}/create`;
  let response = await axios.post(createURL, user);
  return response;
}

function signUpAction() {
  signUp()
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      window.location.href = "login.html";
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
