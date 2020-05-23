const apiURL =
  "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";

function request(url, ...rest) {
  return fetch(url, ...rest).then((res) => res.json());
}

function getUsers() {
  return request(apiURL);
}

function filterByGender(arr, gender) {
  return arr.filter((item) => item === gender).length;
}

function sum(arr) {
  return arr.reduce((prev, acc) => (acc += prev), 0);
}

function avg(arr) {
  return sum(arr) / arr.length;
}
