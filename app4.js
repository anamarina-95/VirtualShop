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

let admincontainer = document.querySelector(".showallproducts");

let database = firebase.database().ref();

database.on("value", (retrievedData) => {
  const data = retrievedData.val();

  let ar = [];
  for (item in data.Products) {
    ar.push(data.Products[item]);
  }

  console.log(ar);

  function adminList(arr) {
    let table = document.querySelector("table tbody");
    table.innerHTML = "";

    function createTd(text) {
      let td = document.createElement("td");
      td.innerHTML = text;
      return td;
    }

    arr.forEach((element) => {
      let row = document.createElement("tr");

      let img = `<img src = '${element.image}'/>`;
      row.appendChild(createTd(img));

      const stringifiedEl = JSON.stringify(element);
      let btn = `<button onclick='updateproduct(${stringifiedEl})'>${element.name}</button>`;
      row.appendChild(createTd(btn));

      row.appendChild(
        createTd(parseInt(element.price) + `<span>&nbsp;RON</span>`)
      );

      row.appendChild(createTd(element.stock));

      row.appendChild(
        createTd(
          `<button class = 'removebutton' onclick='removedata(${element.id})'>Remove</button>`
        )
      );

      table.appendChild(row);
    });
  }
  admincontainer.appendChild(table);
  adminList(ar);
});

function removedata(element) {
  firebase
    .database()
    .ref("Products/" + `product${element}`)
    .remove();
}

function updateproduct(el) {
  document.getElementById("table").style.display = "none";
  document.getElementById("addproduct").style.display = "none";
  let div = document.createElement("div");
  div.id = "arrangeform";
  div.innerHTML = `<form id = "formstyle">
      <div>
      <h3>Edit Product:</h4>
      <button id = "button1">Cancel</button>
      <button id = "button2">Save</button>
      </div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" value='${el.name}'>
      <label for="image">Image</label>
      <input type="text" id="image" name="image" value=${el.image}>
      <label for="description">Description</label>
      <input type="text" id="description" name="description" value='${
        el.description
      }'>
      <label for="price">Price</label>
      <input type="text" id="price" name="price" value=${el.price}>
      <label for="stock">Stock</label>
      <input type="number" id="stock" name="stock" value='${parseInt(
        el.stock
      )}'/>
  </form>`;
  admincontainer.appendChild(div);
  let cancelbutton = document.getElementById("button1");
  cancelbutton.onclick = function () {
    let cancelform = document.getElementById("arrangeform");
    cancelform.onclick = function (e) {
      e.preventDefault();
    };
    document.getElementById("arrangeform").style.display = "none";
    document.getElementById("table").style.display = "table";
    document.getElementById("addproduct").style.display = "block";
  };

  let savebutton = document.getElementById("button2");
  savebutton.onclick = function () {
    let saveform = document.getElementById("arrangeform");
    saveform.onclick = function (e) {
      e.preventDefault();
    };
    function writeUserData() {
      firebase
        .database()
        .ref(`Products/product${el.id}`)
        .update({
          id: `${el.id}`,
          name: `${document.getElementById("name").value}`,
          image: `${document.getElementById("image").value}`,
          description: `${document.getElementById("description").value}`,
          price: `${document.getElementById("price").value}`,
          stock: `${document.getElementById("stock").value}`,
        });
    }
    writeUserData();
    document.getElementById("arrangeform").style.display = "none";
    document.getElementById("table").style.display = "table";
    document.getElementById("addproduct").style.display = "block";
  };
}

let addproduct = document.getElementById("addproduct");
addproduct.onclick = function () {
  document.getElementById("table").style.display = "none";
  document.getElementById("addproduct").style.display = "none";
  let div = document.createElement("div");
  div.id = "arrangeform2";
  div.innerHTML = `<form id = "formstyle2">
      <div>
      <h3>Add Product:</h4>
      <button id = "button3">Cancel</button>
      <button id = "button4">Save</button>
      </div>
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
      <label for="image">Image</label>
      <input type="text" id="image" name="image">
      <label for="description">Description</label>
      <input type="text" id="description" name="description">
      <label for="price">Price</label>
      <input type="text" id="price" name="price">
      <label for="stock">Stock</label>
      <input type="number" id="stock" name="stock"></input>
  </form>`;
  admincontainer.appendChild(div);

  let cancelbuttonadd = document.getElementById("button3");
  cancelbuttonadd.onclick = function () {
    let cancelformadd = document.getElementById("arrangeform2");
    cancelformadd.onclick = function (e) {
      e.preventDefault();
    };
    document.getElementById("arrangeform2").style.display = "none";
    document.getElementById("table").style.display = "table";
    document.getElementById("addproduct").style.display = "block";
  };

  let savebuttonadd = document.getElementById("button4");

  database.on("value", (retrievedData) => {
    const data = retrievedData.val();
    let array = [];
    for (let key in data.Products) {
      let element = data.Products[key];
      array.push(element);
      let getproduct = array[array.length - 1].id;
      let newproduct = parseInt(getproduct) + 1;

      savebuttonadd.onclick = function () {
        let saveformadd = document.getElementById("arrangeform2");
        saveformadd.onclick = function (e) {
          e.preventDefault();
        };
        firebase
          .database()
          .ref(`Products/product${newproduct}`)
          .set({
            id: `${newproduct}`,
            name: `${document.getElementById("name").value}`,
            image: `${document.getElementById("image").value}`,
            description: `${document.getElementById("description").value}`,
            price: `${document.getElementById("price").value}`,
            stock: `${document.getElementById("stock").value}`,
          });
        document.getElementById("arrangeform2").style.display = "none";
        document.getElementById("table").style.display = "table";
        document.getElementById("addproduct").style.display = "block";
      };
    }
  });
};
