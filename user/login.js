let baseUrl = "http://localhost:8000/users/";

let loginForm = document.getElementById("loginform");

//event listener for login form
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let userIdInput = document.getElementById("userId");
  let passwordInput = document.getElementById("password");
  const userId = userIdInput.value;
  const userURI = `${baseUrl}?userId=${userId}`;
  try {
    const response = await axios.get(userURI);
    const user = response.data[0];
    if (!user) {
      alert("Invalid User Name");
    } else if (passwordInput.value !== user.password) {
      alert("Invalid Credentials");
    }
    userIdInput.value = "";
    passwordInput.value = "";
    window.location.href = "../index.html";
    window.localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
