// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAlZKaK-4VXGPUQL83ds59OpWS8-THBVJM",
  authDomain: "prj2021.firebaseapp.com",
  databaseURL: "https://prj2021-default-rtdb.firebaseio.com",
  projectId: "prj2021",
  storageBucket: "prj2021.appspot.com",
  messagingSenderId: "258399862793",
  appId: "1:258399862793:web:6ef9838f2eb365c0dc38d8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database().ref();

database.on("value", (retrievedData) => {
  const data = retrievedData.val();
});

let finalEntries = JSON.parse(localStorage.getItem("allEntries"));

function showShoppingList(arr) {
  let table = document.querySelector("table tbody");
  table.innerHTML = "";

  function createTd(text) {
    let td = document.createElement("td");
    td.innerHTML = text;
    return td;
  }

  arr.forEach((element, key) => {
    let row = document.createElement("tr");

    let img = `<img src = '${element.image}'/>`;
    row.appendChild(createTd(img));

    let btn = `<a href='Page-Details.html?id=${element.id}'><button>${element.name}</button></a>`;
    row.appendChild(createTd(btn));

    row.appendChild(
      createTd(parseInt(element.price) + `<span>&nbsp;RON</span>`)
    );

    row.appendChild(
      createTd(
        `<button onclick='setQty("-",${key})'>&#9866;&nbsp;</button>` +
          element.qtyty +
          `<button onclick='setQty("+",${key})'>&nbsp;&#10010;</button>`
      )
    );

    row.appendChild(
      createTd(
        parseInt(element.price) * parseInt(element.qtyty) +
          `<span>&nbsp;RON</span>`
      )
    );

    row.appendChild(
      createTd(
        `<button class = 'removebutton' onclick='remove(${element.id})'>Remove</button>`
      )
    );

    table.appendChild(row);
  });

  table, (sumVal = 0);

  for (var i = 0; i < table.rows.length; i++) {
    sumVal = sumVal + parseInt(table.rows[i].cells[4].innerHTML);
  }
  document.getElementById("total").innerHTML =
    "Total:&nbsp;" + sumVal + "&nbsp;RON";
  console.log(sumVal);
}
showShoppingList(finalEntries);

function remove(id) {
  let index = finalEntries.findIndex((item) => (item.id = id));
  finalEntries.splice(index, 1);
  localStorage.setItem("allEntries", JSON.stringify(finalEntries));
  showShoppingList(finalEntries);
}

function setQty(val, key) {
  let increasedStock = finalEntries[key].stock;
  let qty = finalEntries[key].qtyty;
  if ((val === "+") & (qty < increasedStock)) {
    qty++;
  } else if ((val === "-") & (qty > 1)) {
    qty--;
  }
  finalEntries[key].qtyty = qty;
  localStorage.setItem("allEntries", JSON.stringify(finalEntries));
  showShoppingList(finalEntries);
}
