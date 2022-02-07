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

let wrapperdetails = document.querySelector(".wrapper3");

let database = firebase.database().ref();
let id = window.location.href.split("?")[1].split("=")[1];
database.child("Products/" + `product${id}`).on("value", (retrievedData) => {
  const data = retrievedData.val();
  showMore(data);
});

function showMore(element) {
  let div = document.createElement("div");
  div.innerHTML = `
          <img src='${element.image}' alt='${element.name}'/>
              <div class = 'div-detailsdisplay'>
                <h6>${element.name}</h6>
                  <div>${element.description}</div>
                    <div><b>${parseInt(element.price)}&nbsp;RON</b></div>
                      <div id = 'changedstock'>Stock:&nbsp;${
                        element.stock
                      }</div>
                        <div>Quantity <input id = 'inputclear' type='number' oninput='onInput(event)' value='${qtyty}'/></div>
                          <button onclick = 'addProduct()'>Add to Cart</button>
              </div>`;
  wrapperdetails.appendChild(div);
}

let qtyty = 1;
function onInput(e) {
  qtyty = e.target.value;
}

function addProduct() {
  database.child("Products/" + `product${id}`).on("value", (retrievedData) => {
    const data = retrievedData.val();
    data["qtyty"] = qtyty;
    let identifier = data.id;
    if (qtyty > data.stock) {
      data["qtyty"] = data.stock;
      createBanner(data);
    } else {
      createBanner(data);
    }

    let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) {
      existingEntries = [];
    }
    let index = existingEntries.findIndex((item) => item.id === identifier);
    if (index == -1) {
      existingEntries.push(data);
    } else {
      let finalqtyty = existingEntries[index].qtyty;
      let finalqty = (existingEntries[index].qtyty = +finalqtyty + +qtyty);
      if (finalqty > existingEntries[index].stock) {
        existingEntries[index].qtyty = data.stock;
      }
    }
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    function clear() {
      document.getElementById("inputclear").value = 1;
    }
    return clear();

    function createBanner(datacart) {
      let banner = document.createElement("div");
      banner.className = "btncartbanner";
      banner.innerHTML = `
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        The product ${datacart.name} has been added to the cart`;
      wrapperdetails.appendChild(banner);

      setTimeout(function () {
        banner.remove();
      }, 3500);
    }
  });
}
