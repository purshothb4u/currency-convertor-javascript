fetch("https://api.frankfurter.app/currencies")
  .then(res => res.json())
  .then(res => displayDropDown(res));

let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let warn = document.getElementById("warn");

function displayDropDown(res) {
  let currencies = Object.entries(res);
  for (let i = 0; i < currencies.length; i++) {
    let opt1 = `<option value="${currencies[i][0]}">${currencies[i][0]}</option>`;
    let opt2 = `<option value="${currencies[i][0]}">${currencies[i][0]}</option>`;
    select1.innerHTML += opt1;
    select2.innerHTML += opt2;
  }
}

// Event listeners for input1, select2
input1.addEventListener('input', () => {
  convert();
});



select2.addEventListener('change', () => {
  convert();
});

function convert() {
  let curr1 = select1.value;
  let curr2 = select2.value;
  let input1Val = input1.value;

  if (curr1 === curr2) {
    warn.style.display="block"
    warn.innerText = "Choose different currencies";
  } 
  else if (isNaN(input1Val)) {
     warn.style.display = "block";
     warn.innerText = "Enter digits only";
  } 
  else {
     warn.style.display = "none";

    const host = "api.frankfurter.app";
    fetch(
      `https://${host}/latest?amount=${input1Val}&from=${curr1}&to=${curr2}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        input2.value = Object.values(data.rates)[0];
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// Event listener for input2, select1
input2.addEventListener("input", () => {
  convertInput2();
});

select1.addEventListener("change", () => {
  convertInput2();
});



function convertInput2() {
  let curr2 = select1.value;
  let curr1 = select2.value;
  let input2Val = input2.value;

  if (curr1 === curr2) {
     warn.style.display = "block";
     warn.innerText = "Choose different currencies";
  } 
  else if (isNaN(input2Val)) {
    warn.style.display = "block";
    warn.innerText = "Enter digits only";
  } 
  else {
    warn.style.display = "none";

    const host = "api.frankfurter.app";
    fetch(
      `https://${host}/latest?amount=${input2Val}&from=${curr1}&to=${curr2}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        input1.value = Object.values(data.rates)[0];
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
