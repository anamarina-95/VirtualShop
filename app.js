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

let wrapper = document.querySelector(".wrapper2");
let database = firebase.database().ref();

let arrayProducts = [];

database.on("value", (retrievedData) => {
  const data = retrievedData.val();
  for (let key in data.Products) {
    let element = data.Products[key];
    console.log(element);
    createDiv(element);

    let filterInput = document.querySelector(".search-text");
    filterInput.addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        filterSearch();
      } else {
        document.querySelector(".search-btn").onclick = (e) => {
          e.preventDefault();
          filterSearch();
        };
      }
    });

    function filterSearch() {
      let filterInput = document.querySelector(".search-text").value;
      // const regex = new RegExp("\\b" + filterInput + "\\b", "i");

      const result = Object.values(data.Products).filter((obj) =>
        obj.name.toLowerCase().includes(filterInput.toLowerCase())
      );

      if (result.length === 0) {
        wrapper.innerHTML = "";
        let div = document.createElement("div");
        div.className = "no-results";
        div.innerHTML = `
                <h2>No results found!</h2>
                <h4>Please try again</h4>`;
        wrapper.appendChild(div);
      } else {
        wrapper.innerHTML = "";
        for (let key in result) {
          let filteredEl = result[key];
          console.log(filteredEl);
          createDiv(filteredEl);
        }
      }
    }
  }
  function createDiv(el) {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class='div-data-container'>
            <img src='${el.image}' alt='${el.name}'/>
                <h6>${el.name}</h6>
                  <div class = 'cards-subcontainer'>
				            <div><b>${parseInt(el.price)}&nbsp;RON</b></div>
                      <a href='Page-Details.html?id=${
                        el.id
                      }'><button>DETAILS</button><a/>
                  </div>
        </div>`;
    wrapper.appendChild(div);
  }
});
