window.addEventListener("load", start);

let $searchInput = null;
let $searchButton = null;
let $numberOfUsers = null;
let $results = null;

let $totalMasc = null;
let $totalFem = null;
let $sumAge = null;
let $avgAge = null;

let users = [];
let resultsHTML = "";

function filterByName(input) {
  return users.filter((user) => user.name.toLowerCase().includes(input));
}

async function start() {
  $searchInput = document.querySelector("#searchInput");
  $searchButton = document.querySelector("#searchButton");
  $numberOfUsers = document.querySelector("#numberOfUsers");
  $results = document.querySelector("#results");

  $totalMasc = document.querySelector("#totalMasc");
  $totalFem = document.querySelector("#totalFem");
  $sumAge = document.querySelector("#sumAge");
  $avgAge = document.querySelector("#avgAge");

  handleListeners();

  // LOADING DATA
  const { results: rawUsers } = await getUsers();

  // REMOVING NOISE
  users = rawUsers.map((user) => ({
    name: [user.name.first, user.name.last].join(" "),
    picture: user.picture,
    age: user.dob.age,
    gender: user.gender,
  }));
}

function handleSearch(event) {
  if (event.keyCode !== 13 && event.type !== "click") return;

  let users = [];
  let input = event.target.value || $searchInput.value;

  users = filterByName(input);
  console.log(users);

  $numberOfUsers.textContent = users.length;

  updateUsers(users);
  updateStats(users);
}

function handleListeners() {
  $searchInput.addEventListener("keyup", handleSearch);
  $searchButton.addEventListener("click", handleSearch);
}

function updateUsers(users) {
  resultsHTML = "";
  resultsHTML += "<div>";

  users.forEach((user) => {
    const resultHTML = `
      <div class="result">
        <img src="${user.picture.thumbnail}" alt="${user.name}"/>
        <span>${user.name}, ${user.age} anos</span>
      </div>
    `;

    resultsHTML += resultHTML;
  });

  resultsHTML += "</div>";
  $results.innerHTML = resultsHTML;
}

function updateStats(users) {
  $totalMasc.textContent = filterByGender(
    users.map((user) => user.gender),
    "male"
  );
  $totalFem.textContent = filterByGender(
    users.map((user) => user.gender),
    "female"
  );
  $sumAge.textContent = sum(users.map((user) => user.age));
  $avgAge.textContent = avg(users.map((user) => user.age));
}
