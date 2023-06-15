// hide the user card info
const user_card_info = document.getElementById("user_card_info");
user_card_info.style.display = "none";

// Function to searching users
async function searchUsers(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Error searching for user: ${error.message}`);
  }
}

// Function to handle the search button
async function handleSearch() {
  const usernameInput = document.getElementById("usernameInput");
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  try {
    const username = usernameInput.value.trim();
    if (username === "") {
      throw new Error("Please enter a username");
    }

    const user = await searchUsers(username);
    const userCard = createUserCard(user);
    // resultsDiv.appendChild(userCard);
  } catch (error) {
    resultsDiv.innerHTML = `<p>${error.message}</p>`;
  }
}

// Function to create a user card for showing the user information
function createUserCard(user) {
  console.log(user);
  user_card_info.style.display = "block";
  const user_name = document.getElementById("user_name");
  user_name.textContent = user.name;

  const user_img = document.getElementById("user_img");
  user_img.src = user.avatar_url;
  user_img.alt = `${user.login} avatar`;

  const user_location = document.getElementById("user_location");
  user_location.textContent = user.location;

  const user_company = document.getElementById("user_company");
  user_company.textContent = user.company;

  const user_bio = document.getElementById("user_bio");
  user_bio.textContent = user.bio;

  const user_followers = document.getElementById("user_followers");
  user_followers.textContent = user.followers;

  const user_following = document.getElementById("user_following");
  user_following.textContent = user.following;

  const user_repos = document.getElementById("user_repos");
  user_repos.textContent = user.public_repos;
  //converting date format
  const date = new Date(user.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(formattedDate);
  const joining_date = document.getElementById("joining_date");
  joining_date.textContent = formattedDate;

  const git_url = document.getElementById("git_url");
  git_url.textContent = user.html_url;

  //user_img.textContent = user.avatar_url;

  // card.classList.add('card-container');

  // const avatar = document.createElement('img');
  // avatar.src = user.avatar_url;
  // avatar.alt = `${user.login} avatar`;
  // card.appendChild(avatar);

  // const username = document.createElement('p');
  // username.textContent = user.login;
  // card.appendChild(username);

  // const companyname = document.createElement('p');
  // companyname.textContent = user.company;
  // card.appendChild(companyname);

  // return card;
}

// Add event listener to the search button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearch);
