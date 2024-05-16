import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let loginModal;
let signupModal;
let baseUrl = "http://localhost:8000/users/";

function createSignUpForm() {
  var modal = document.createElement("div");
  modal.id = "signupModal";
  modal.classList.add("auth-modal");
  // Create main element
  var mainElement = document.createElement("div");
  mainElement.id = "main";
  mainElement.className = "auth-container";

  // Create section element
  var sectionElement = document.createElement("section");

  // Create paragraph element for welcome message
  var welcomeParagraph = document.createElement("p");
  welcomeParagraph.className = "welcome";
  welcomeParagraph.textContent = "Welcome to IMDB Movies. Please Log In";

  // Append welcome paragraph to section
  sectionElement.appendChild(welcomeParagraph);

  // Append section to main
  mainElement.appendChild(sectionElement);

  // Create form element
  var formElement = document.createElement("form");
  formElement.id = "signupForm";
  formElement.className = "signup-form";
  // Create div for user Name input
  var userNamediv = document.createElement("div");
  userNamediv.className = "mb-3";

  // Create label for user ID input
  var userNamelabel = document.createElement("label");
  userNamelabel.setAttribute("for", "userName");
  userNamelabel.className = "form-label";
  userNamelabel.textContent = "User Name";

  // Create user ID input
  var userNameInput = document.createElement("input");
  userNameInput.name = "userName";
  userNameInput.className = "form-control";
  userNameInput.id = "userName";
  userNameInput.setAttribute("aria-describedby", "userName");
  userNameInput.required = true;

  // Append label and input to div
  userNamediv.appendChild(userNamelabel);
  userNamediv.appendChild(userNameInput);

  // Append div to form
  formElement.appendChild(userNamediv);

  // Create div for user ID input
  var userIdDiv = document.createElement("div");
  userIdDiv.className = "mb-3";

  // Create label for user ID input
  var userIdLabel = document.createElement("label");
  userIdLabel.setAttribute("for", "userId");
  userIdLabel.className = "form-label";
  userIdLabel.textContent = "User ID";

  // Create user ID input
  var userIdInput = document.createElement("input");
  userIdInput.name = "userId";
  userIdInput.className = "form-control";
  userIdInput.id = "userId";
  userIdInput.setAttribute("aria-describedby", "userId");
  userIdInput.required = true;

  // Append label and input to div
  userIdDiv.appendChild(userIdLabel);
  userIdDiv.appendChild(userIdInput);

  // Append div to form
  formElement.appendChild(userIdDiv);

  // Create div for password input
  var passwordDiv = document.createElement("div");
  passwordDiv.className = "mb-3";

  // Create label for password input
  var passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.className = "form-label";
  passwordLabel.textContent = "Password";

  // Create password input
  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.className = "form-control";
  passwordInput.id = "password";
  passwordInput.required = true;

  // Append label and input to div
  passwordDiv.appendChild(passwordLabel);
  passwordDiv.appendChild(passwordInput);

  // Append div to form
  formElement.appendChild(passwordDiv);

  var confirmpasswordDiv = document.createElement("div");
  confirmpasswordDiv.className = "mb-3";

  // Create label for password input
  var confirmpasswordLabel = document.createElement("label");
  confirmpasswordLabel.setAttribute("for", "confirmPassword");
  confirmpasswordLabel.className = "form-label";
  confirmpasswordLabel.textContent = "Password";

  // Create password input
  var confirmpasswordInput = document.createElement("input");
  confirmpasswordInput.type = "password";
  confirmpasswordInput.name = "confirmPassword";
  confirmpasswordInput.className = "form-control";
  confirmpasswordInput.id = "confirmPassword";
  confirmpasswordInput.required = true;

  // Append label and input to div
  confirmpasswordDiv.appendChild(confirmpasswordLabel);
  confirmpasswordDiv.appendChild(confirmpasswordInput);

  // Append div to form
  formElement.appendChild(confirmpasswordDiv);

  // Create submit button
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary";
  submitButton.textContent = "Sign Up";

  // Create cancel button
  var cancelButton = document.createElement("button");
  cancelButton.className = "btn btn-danger";
  cancelButton.textContent = "Cancel";

  // Append buttons to form
  formElement.appendChild(submitButton);
  formElement.appendChild(cancelButton);

  // Append form to main
  mainElement.appendChild(formElement);

  // Create paragraph element for sign up link
  var signUpParagraph = document.createElement("p");
  signUpParagraph.className = "card-text";
  signUpParagraph.innerHTML =
    'Already have an account? <a class="card-link"> Log In</a>';
  signUpParagraph.addEventListener("click", () => {
    signupModal.style.display = "none";
    document.body.appendChild(createLoginForm());
    loginModal = document.getElementById("loginModal");
    loginModal.style.display = "block";
  });
  // Append paragraph to main
  mainElement.appendChild(signUpParagraph);

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const user = {
        id: uuidv4(),
        userId: signUpForm.userId.value,
        name: signUpForm.userName.value,
        password: signUpForm.password.value,
        movies: [],
      };
      const createURL = `${baseUrl}/create`;
      let response = await axios.post(createURL, user);
      alert("Succesfully Registered. Please Log In");
      return response;
    } catch (error) {
      console.log("Could not sign up", error);
    }
  });

  modal.appendChild(mainElement);
  // Append the modal to the body
  return modal;
}
function createLoginForm() {
  // Create the necessary elements
  var modal = document.createElement("div");
  modal.id = "loginModal";
  modal.classList.add("auth-modal");
  // Create main element
  var mainElement = document.createElement("div");
  mainElement.id = "main";
  mainElement.className = "auth-container";

  // Create section element
  var sectionElement = document.createElement("section");

  // Create paragraph element for welcome message
  var welcomeParagraph = document.createElement("p");
  welcomeParagraph.className = "welcome";
  welcomeParagraph.textContent = "Welcome to IMDB Movies. Please Log In";

  // Append welcome paragraph to section
  sectionElement.appendChild(welcomeParagraph);

  // Append section to main
  mainElement.appendChild(sectionElement);

  // Create form element
  var formElement = document.createElement("form");
  formElement.id = "loginform";
  formElement.className = "login-form";
  // Create div for user ID input
  var userIdDiv = document.createElement("div");
  userIdDiv.className = "mb-3";

  // Create label for user ID input
  var userIdLabel = document.createElement("label");
  userIdLabel.setAttribute("for", "userId");
  userIdLabel.className = "form-label";
  userIdLabel.textContent = "User ID";

  // Create user ID input
  var userIdInput = document.createElement("input");
  userIdInput.name = "userId";
  userIdInput.className = "form-control";
  userIdInput.id = "userId";
  userIdInput.setAttribute("aria-describedby", "userId");
  userIdInput.required = true;

  // Append label and input to div
  userIdDiv.appendChild(userIdLabel);
  userIdDiv.appendChild(userIdInput);

  // Append div to form
  formElement.appendChild(userIdDiv);

  // Create div for password input
  var passwordDiv = document.createElement("div");
  passwordDiv.className = "mb-3";

  // Create label for password input
  var passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.className = "form-label";
  passwordLabel.textContent = "Password";

  // Create password input
  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.className = "form-control";
  passwordInput.id = "password";
  passwordInput.required = true;

  // Append label and input to div
  passwordDiv.appendChild(passwordLabel);
  passwordDiv.appendChild(passwordInput);

  // Append div to form
  formElement.appendChild(passwordDiv);

  // Create submit button
  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary";
  submitButton.textContent = "Log In";

  // Create cancel button
  var cancelButton = document.createElement("button");
  cancelButton.className = "btn btn-danger";
  cancelButton.textContent = "Cancel";

  // Append buttons to form
  formElement.appendChild(submitButton);
  formElement.appendChild(cancelButton);

  // Append form to main
  mainElement.appendChild(formElement);

  // Create paragraph element for sign up link
  var signUpParagraph = document.createElement("p");
  signUpParagraph.className = "card-text";
  signUpParagraph.innerHTML =
    'Do not have an account? <a class="card-link"> Create one</a>';
  signUpParagraph.addEventListener("click", () => {
    loginModal.style.display = "none";
    document.body.appendChild(createSignUpForm());
    signupModal = document.getElementById("signupModal");
    signupModal.style.display = "block";
  });
  // Append paragraph to main
  mainElement.appendChild(signUpParagraph);

  formElement.addEventListener("submit", async (event) => {
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
      window.location.href = "/index.html";
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });

  modal.appendChild(mainElement);
  // Append the modal to the body
  return modal;
}

function createSidebar() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  // Create <aside> element
  var aside = document.createElement("aside");
  aside.setAttribute("id", "sidebar");

  // Create <div> element with class "d-flex"
  var div1 = document.createElement("div");
  div1.setAttribute("class", "d-flex");

  // Create toggle button <button> element
  var toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("class", "toggle-btn");
  toggleBtn.setAttribute("type", "button");

  // Create icon <i> element
  var icon1 = document.createElement("i");
  icon1.setAttribute("class", "lni lni-grid-alt");

  // Append icon to toggle button
  toggleBtn.appendChild(icon1);

  // Append toggle button to div1
  div1.appendChild(toggleBtn);

  // Create sidebar logo <div> element
  var sidebarLogo = document.createElement("div");
  sidebarLogo.setAttribute("class", "sidebar-logo");

  // Create anchor <a> element
  var anchor = document.createElement("a");
  anchor.setAttribute("href", "../index.html");
  anchor.innerHTML = "CineVerse";

  // Append anchor to sidebar logo
  sidebarLogo.appendChild(anchor);

  // Append sidebar logo to div1
  div1.appendChild(sidebarLogo);

  // Append div1 to aside
  aside.appendChild(div1);

  // Create <ul> element with class "sidebar-nav"
  var ul = document.createElement("ul");
  ul.setAttribute("class", "sidebar-nav");

  // Array to hold sidebar items
  var sidebarItems = [
    { href: "/media/movies.html", iconClass: "lni lni-video", text: "Movies" },
    {
      href: "/media/shows.html",
      iconClass: "lni lni-agenda",
      text: "TV Shows",
    },
  ];

  var loggedInUserSideBarItems = [
    {
      href: "/media/watchlist.html",
      iconClass: "lni lni-popup",
      text: "WatchList",
    },
  ];

  var loggedOutUserSideBarItems = [
    {
      iconClass: "lni lni-user",
      text: "Register",
    },
  ];

  // Loop through sidebar items
  sidebarItems.forEach(function (item) {
    // Create <li> element with class "sidebar-item"
    var li = document.createElement("li");
    li.setAttribute("class", "sidebar-item");

    // Create anchor <a> element
    var anchor = document.createElement("a");
    anchor.setAttribute("href", item.href);
    anchor.setAttribute("class", "sidebar-link");

    // Create icon <i> element
    var icon = document.createElement("i");
    icon.setAttribute("class", item.iconClass);

    // Create <span> element
    var span = document.createElement("span");
    span.innerHTML = item.text;

    // Append icon and span to anchor
    anchor.appendChild(icon);
    anchor.appendChild(span);

    // Append anchor to li
    li.appendChild(anchor);

    // Append li to ul
    ul.appendChild(li);
  });

  if (user === null) {
    loggedOutUserSideBarItems.forEach(function (item) {
      // Create <li> element with class "sidebar-item"
      var li = document.createElement("li");
      li.setAttribute("class", "sidebar-item");

      // Create anchor <a> element
      var anchor = document.createElement("a");
      anchor.setAttribute("class", "sidebar-link");
      anchor.addEventListener("click", () => {
        document.body.appendChild(createSignUpForm());
        signupModal = document.getElementById("signupModal");
        if (loginModal && loginModal.style.display === "block") {
          loginModal.style.display = "none";
        }
        signupModal.style.display = "block";
      });

      // Create icon <i> element
      var icon = document.createElement("i");
      icon.setAttribute("class", item.iconClass);

      // Create <span> element
      var span = document.createElement("span");
      span.innerHTML = item.text;

      // Append icon and span to anchor
      anchor.appendChild(icon);
      anchor.appendChild(span);

      // Append anchor to li
      li.appendChild(anchor);

      // Append li to ul
      ul.appendChild(li);
    });
  } else {
    loggedInUserSideBarItems.forEach(function (item) {
      // Create <li> element with class "sidebar-item"
      var li = document.createElement("li");
      li.setAttribute("class", "sidebar-item");

      // Create anchor <a> element
      var anchor = document.createElement("a");
      anchor.setAttribute("href", item.href);
      anchor.setAttribute("class", "sidebar-link");

      // Create icon <i> element
      var icon = document.createElement("i");
      icon.setAttribute("class", item.iconClass);

      // Create <span> element
      var span = document.createElement("span");
      span.innerHTML = item.text;

      // Append icon and span to anchor
      anchor.appendChild(icon);
      anchor.appendChild(span);

      // Append anchor to li
      li.appendChild(anchor);

      // Append li to ul
      ul.appendChild(li);
    });
  }

  // Append ul to aside
  aside.appendChild(ul);

  // Create <div> element with class "sidebar-footer"
  var div2 = document.createElement("div");
  div2.setAttribute("class", "sidebar-footer");

  // Create anchor <a> element
  var anchor2 = document.createElement("a");
  anchor2.setAttribute("class", "sidebar-link");
  anchor2.setAttribute("id", "auth");

  // Create icon <i> element
  var icon2 = document.createElement("i");
  var span2 = document.createElement("span");
  if (user === null) {
    // anchor2.setAttribute("href", "/user/login.html");
    icon2.setAttribute("class", "lni lni-enter");
    anchor2.addEventListener("click", handleLogin);
    span2.innerHTML = "Login";
  } else {
    icon2.setAttribute("class", "lni lni-exit");
    span2.innerHTML = "Logout";
    anchor2.addEventListener("click", handleLogOut);
  }
  anchor2.appendChild(icon2);
  anchor2.appendChild(span2);

  // Append anchor2 to div2
  div2.appendChild(anchor2);
  /**
   * <i class="lni lni-enter"></i>
   */

  // Append icon and span to anchor2
  anchor2.appendChild(icon2);
  anchor2.appendChild(span2);

  // Append div2 to aside
  aside.appendChild(div2);

  // Return the created <aside> element
  return aside;
}
function handleLogOut(event) {
  window.localStorage.removeItem("user");
  window.location.reload();
}
function handleLogin(event) {
  document.body.appendChild(createLoginForm());
  loginModal = document.getElementById("loginModal");
  if (signupModal) {
    signupModal.style.display = "none";
  }
  loginModal.style.display = "block";
}

window.addEventListener("click", (event) => {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target == signupModal) {
    signupModal.style.display = "none";
  }
});

export { createSidebar };
