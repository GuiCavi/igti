window.addEventListener("load", init);

let r = 0,
  g = 0,
  b = 0;
let $inputs = null,
  $previews = null,
  $previewFinal = null;

function init() {
  $inputs = document.querySelectorAll("input[type=range]");
  $previews = document.querySelectorAll(
    "input[type=range] ~ .preview-single-color"
  );
  $previewFinal = document.querySelector(".preview-final-color");

  Array.from($inputs).forEach(($input) => {
    $input.addEventListener("input", (e) => {
      changeValue(e.target.value, e.target.name);
      render();
    });
  });

  // render();
}

const changeValue = (value, name) => {
  switch (name) {
    case "rValue":
      r = value;
      break;
    case "gValue":
      g = value;
      break;
    case "bValue":
      b = value;
      break;
  }
};

function render() {
  Array.from($previews)[0].style.backgroundColor = `rgb(${r}, ${0}, ${0})`;
  Array.from($previews)[1].style.backgroundColor = `rgb(${0}, ${g}, ${0})`;
  Array.from($previews)[2].style.backgroundColor = `rgb(${0}, ${0}, ${b})`;

  $previewFinal.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
