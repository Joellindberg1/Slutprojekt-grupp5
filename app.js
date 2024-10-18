// ==============================FUNCTIONS=================================

// ==========CUSTOM ALERT-WINDOW=============
const customAlert = () => {

    // Create alert div and set styles
    const parent = document.querySelector('body');
    const customAlert = document.createElement('div');
    customAlert.id = "alertDiv";


    // Create and add image
    const imgSrc = document.createElement('img');
    imgSrc.alt = "Image";
    imgSrc.src = 'https://i.postimg.cc/1zbjGtDC/Monster-DB.jpg';

    // Create and add text
    const p = document.createElement('p');
    p.textContent = "Monster has been spliced!";

    // Create and add button
    const alertButton = document.createElement('button');
    alertButton.textContent = "Close";
    alertButton.id = "alertButton";


    // Append all elements
    customAlert.appendChild(imgSrc);
    customAlert.appendChild(p);
    customAlert.appendChild(alertButton);
    parent.appendChild(customAlert);

    alertButton.addEventListener('click', (e) => {

        parent.removeChild(customAlert);
    });
};

// Function to close the alert


// ===============================================


const alertDiv = document.getElementById("alertDiv");
function invokeAlert() {
    alertDiv.style.display = "block";
}
function closeDialog() {
    alertDiv.style.display = "none";
}

// ===============MONSTER CARDS===============
// Funktion som skapar dynamiska monsterkort.
// ===========================================

const renderMonsterCard = () => {
  // Tömmer section class="collection"
  const monsterArticle = document.querySelector(".collection");
  monsterArticle.innerHTML = "";

  // Tömmer section class="collection"
  const monsterSection = document.querySelector(".collection");
  monsterSection.innerHTML = "";

  // loopar igenom state för att skapa monster-kort av innehållet

  // for (const m of state.collection) {
  state.collection.forEach((object) => {
    // Skapar ny article-tag
    const monster = document.createElement("article");
    monster.className = "monster";
    monster.id = object.name.replaceAll(" ", "-");

    // Skapar tabell till den nyskapade article-tag'en
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    const h3 = document.createElement("h3");
    table.className = object.name.replaceAll(" ", "-") + "-table";
    h3.innerHTML = object.name;
    caption.appendChild(h3);
    table.appendChild(caption);

    // Stödfunktion för att skapa rader i tabellen
    const addRow = (label, value) => {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.innerHTML = `${label}: `;
      const td = document.createElement("td");
      td.innerHTML = value;
      td.className = value;
      row.appendChild(th);
      row.appendChild(td);
      table.appendChild(row);
    };

    addRow("Type", object.type);
    addRow("Color", object.color);

    i = 0; // DEN FUNKAR, DO NOT FUCK WITH UNLESS YOU WANT TO GET FUCKED
    for (element of monsterAttributes) {
      addRow("Number of " + [element], object[element]);

      i++;
    }

    monster.appendChild(table);

    // // Skapar en knapp för att redigera monster-attributen
    // const editButton = document.createElement("button");
    // editButton.className = "edit-button";
    // editButton.id = "edit-" + allKeys[0].replaceAll(" ", '-');
    // editButton.type = "button";
    // editButton.innerHTML = "Edit monster";

    // table.appendChild(editButton);

    // editButton.addEventListener('click', (e) => {
    //     e.preventDefault

    //     const editType = document.createElement('select');
    //     editType.innerHTML =
    //         document.insertBefore /// ??? Är denna bättre än det jag började med?

    //     // <input type = "text" name = "name" id = "name" />
    //     //     <select name="monster.Colours" id="monster-Colors"></select>
    //     //     <select name="monster-types" id="monster-Types"></select>
    //     //     <input type="number" name="eyes" value="0" main="0" />
    //     //     <input type="number" name="arms" value="0" main="0" />
    //     //     <input type="number" name="tentacles" value="0" main="0" />
    //     //     <input type="number" name="horn" value="0" main="0" />
    //     //     <button type="button" id="form-button">Confirm</button>
    // }

    // //Lägger till monster-article i rätt container

    monsterSection.appendChild(monster);
  });
};

// ========LÄGGER IN ARRAYS I FORMULÄR========
// Funktion som skapar dynamiska monsterkort.
// ===========================================
window.addEventListener("load", (event) => {
  i = 0;
  const colors = document.getElementById("monster-Colors");
  for (const element of monsterColors) {
    const option = document.createElement("option");
    colors.value = i;
    option.text = element;
    colors.add(option);
    i++;
  }

  i = 0;
  const types = document.getElementById("monster-Types");
  for (const element of monsterTypes) {
    const option = document.createElement("option");
    types.value = i;
    option.text = element;
    types.add(option);
    i++;
  }

  i = 0;
  const monsterForm = document.getElementById("add-monster-form");
  for (const element of monsterAttributes) {
    const input = document.createElement("input");
    input.className = "attribut-";
    input.min = "0";
    input.max = "99";
    input.type = "number";
    input.value = "";
    // input.main = element;
    input.name = element;

    const label = document.createElement("label");
    label.for = element;
    label.textContent = element;

    monsterForm.appendChild(label);
    monsterForm.appendChild(input);

    i++;
  }
});
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;
  let filteredValue = inputValue.replace(/[^A-Za-zÅÄÖåäö\s]/g, "");
  event.target.value = filteredValue;
});

// ==============APP STARTAR HÄR==============

// Arrays som lagrar möjliga färger och typer för monster
const monsterColors = ["Blue", "Green", "Red", "Brown", "Purple"];
const monsterTypes = ["Firemonster", "Skymonster", "Watermonster"];
const monsterAttributes = ["Eyes", "Arms", "Tentacles", "Horns"];

const allKeys = ["name", "color", "type", ...monsterAttributes];
const values = [];
const allValues = [...values];

/// !!! MÅSTE SKAPA ARRAY FÖR DE FYRA UTSEENDEATTRIBUTEN

// State innehåller datan från användarens input samt standardvärdena för appen

const state = {
  collection: [
    { name: "Grimblot", type: monsterTypes[1], color: monsterColors[1] },
    {
      name: "Zarok the Devourer",
      type: monsterTypes[0],
      color: monsterColors[0],
    },
    { name: "Blisterfang", type: monsterTypes[1], color: monsterColors[1] },
    { name: "Thraxxis", type: monsterTypes[2], color: monsterColors[2] },
    { name: "Murkspawn", type: monsterTypes[0], color: monsterColors[3] },
    { name: "Vorrgath", type: monsterTypes[1], color: monsterColors[4] },
  ],
};

renderMonsterCard();

collection: [
  { name: "Grimblot", type: monsterTypes[1], color: monsterColors[1], },
  { name: "Zarok the Devourer", type: monsterTypes[0], color: monsterColors[0], },
  { name: "Blisterfang", type: monsterTypes[1], color: monsterColors[1], },
  { name: "Thraxxis", type: monsterTypes[2], color: monsterColors[2], },
  { name: "Murkspawn", type: monsterTypes[0], color: monsterColors[3], },
  { name: "Vorrgath", type: monsterTypes[1], color: monsterColors[4], },

],


  renderMonsterCard();


document.getElementById("form-button").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const color = document.getElementById("monster-Colors").value;
  const type = document.getElementById("monster-Types").value;



  const values = [name, color, type,];


  monsterAttributes.forEach(attribute => {
    const input = document.getElementsByName(attribute)[0];
    values.push(parseInt(input.value));
  });

  const result = allKeys.reduce((obj, key, index) => {

    obj[key] = values[index];
    return obj;

  }, {});



  state.collection.push(result);


  renderMonsterCard();

  console.log(state.collection);

  document.getElementById("form-button").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const color = document.getElementById("monster-Colors").value;
    const type = document.getElementById("monster-Types").value;

    const values = [name, color, type];

    monsterAttributes.forEach((attribute) => {
      const input = document.getElementsByName(attribute)[0];
      values.push(parseInt(input.value));
    });

    const result = allKeys.reduce((obj, key, index) => {
      obj[key] = values[index];
      return obj;
    }, {});

    state.collection.push(result);

    renderMonsterCard();

    // Rensar formulär efter submit
    document.getElementById("add-monster-form").reset();
  });


renderMonsterCard();