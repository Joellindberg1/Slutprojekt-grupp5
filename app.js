// ==================OBJEKT==================

// const monsterObject = {
// const monsterObject = {

//     Name: Lorem Ipsum ;// Behöver hämtas från formuläret
//     Type: monsterTypes;
//     Color: monsterColors;
//     Number of tentacles: 4; // Behöver hämtas från formuläret
//     Number of eyes: 1; // Behöver hämtas från formuläret
//     Number of arms: 2; // Behöver hämtas från formuläret
//     Number of horns: 2; // Behöver hämtas från formuläret
//     colorMap: {
//         color1: monsterColors[0],
//         color2: monsterColors[1],
//         color3: monsterColors[2],
//         color4: monsterColors[3],
//         color5: monsterColors[4]
//     }
// }
//     Name: Lorem Ipsum ;// Behöver hämtas från formuläret
//     Type: monsterTypes;
//     Color: monsterColors;
//     Number of tentacles: 4; // Behöver hämtas från formuläret
//     Number of eyes: 1; // Behöver hämtas från formuläret
//     Number of arms: 2; // Behöver hämtas från formuläret
//     Number of horns: 2; // Behöver hämtas från formuläret
//     colorMap: {
//         color1: monsterColors[0],
//         color2: monsterColors[1],
//         color3: monsterColors[2],
//         color4: monsterColors[3],
//         color5: monsterColors[4]
//     }
// }

// ===========================================

// Ändrar färgen av monster-kortets box-shadow till en ton av monstrets färg
// switch (monsterObject.Color) {

//     case monsterColors[0]:

//         break;

//     case monsterColors[1]:
//         break;

//     case monsterColors[2]:
//         break;

//     case monsterColors[3]:
//         break;

//     case monsterColors[4]:
//         break;
// }

// ==============================FUNCTIONS=================================

// ===============MONSTER CARDS===============
// Funktion som skapar dynamiska monsterkort.
// ===========================================

const renderMonsterCard = () => {
  // Tömmer section class="collection"
  const monsterArticle = document.querySelector(".collection");
  monsterArticle.innerHTML = "";

  // loopar igenom state för att skapa monster-kort av innehållet
  for (const m of state.collection) {
    // Skapar ny article-tag
    const monster = document.createElement("article");

    // Skapar tabell och caption till den nyskapade article-tag'en
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    const h3 = document.createElement("h3");
    h3.textContent = m.name;
    caption.appendChild(h3);
    table.appendChild(caption);

    // Skapar rader till tabellen
    const addRow = (label, value) => {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = `${label}: `;
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(th);
      row.appendChild(td);
      table.appendChild(row);
    };

    // Lägger till rader till den nyskapade tabellen
    addRow("Type", m.type);
    addRow("Color", m.color);
    addRow("Number of eyes", m.eyes);
    addRow("Number of arms", m.arms);
    addRow("Number of horns", m.horns);
    addRow("Number of tentacles", m.tentacles);

    // Lägger till tabellen i monster-containern
    monster.appendChild(table);

    // Skapar en knapp för att redigera monster-attributen
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.type = "button";
    editButton.innerHTML = "Edit monster";

    // Ger monster-containern en class (så att önskad CSS kan appliceras)
    monster.className = "monster";

    // Lägger till redigeringsknappen i monster-containern
    monster.appendChild(editButton);

    //Lägger till monster-containern i DOM
    monsterArticle.appendChild(monster);
  }
};

// ========LÄGGER IN ARRAYS I FORMULÄR========
// Funktion som skapar dynamiska monsterkort.
// ===========================================
window.addEventListener("load", (event) => {
  i = 0;
  for (const element of monsterColors) {
    const colors = document.getElementById("monster-Colors");
    colors.value = i;
    colors.innerHtml = monsterColors[i];
    i++;
    const option = document.createElement("option");
    option.text = element;
    colors.add(option);
  }

  i = 0;
  for (const element of monsterTypes) {
    const types = document.getElementById("monster-Types");
    types.value = i;
    types.innerHtml = monsterTypes[i];
    i++;
    
    const option = document.createElement("option");
    option.text = element;
    types.add(option);
  }
});

// ==============APP STARTAR HÄR==============

// Arrays som lagrar möjliga färger och typer för monster
const monsterColors = ["Blue", "Green", "Red", "Brown", "Purple"];
const monsterTypes = ["Firemonster", "Skymonster", "Watermonster"];

// State innehåller datan från användarens input samt standardvärdena för appen
const state = {
  collection: [
    {
      name: "Grimblot",
      type: monsterTypes[1],
      color: monsterColors[1],
      eyes: 1,
      arms: 2,
      horns: 2,
      tentacles: 0,
    },
    {
      name: "Zarok the Devourer",
      type: monsterTypes[0],
      color: monsterColors[0],
      eyes: 2,
      arms: 0,
      horns: 1,
      tentacles: 4,
    },
    {
      name: "Blisterfang",
      type: monsterTypes[1],
      color: monsterColors[1],
      eyes: 3,
      arms: 4,
      horns: 0,
      tentacles: 1,
    },
    {
      name: "Thraxxis",
      type: monsterTypes[2],
      color: monsterColors[2],
      eyes: 5,
      arms: 8,
      horns: 1,
      tentacles: 0,
    },
    {
      name: "Murkspawn",
      type: monsterTypes[0],
      color: monsterColors[3],
      eyes: 2,
      arms: 2,
      horns: 0,
      tentacles: 6,
    },
    {
      name: "Vorrgath",
      type: monsterTypes[1],
      color: monsterColors[4],
      eyes: 1,
      arms: 1,
      horns: 1,
      tentacles: 1,
    },
  ],
  createNewMonster: [],
  addMonster: (name, type, color, eyes, arms, horns, tentacles) => {
    state.collection.push({ name, type, color, eyes, arms, horns, tentacles });
    // state.addMonster(
    //   name,
    //   type,
    //   color,
    //   parseInt(eyes),
    //   parseInt(arms),
    //   parseInt(horns),
    //   parseInt(tentacles)
    // );
  },
};

state.addMonster("Test", monsterTypes[1], monsterColors[2], 2, 3, 4, 5);
renderMonsterCard();

const button = document.getElementById("form-button");
button.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const color = document.getElementById("monster-Colors").value;
  const type = document.getElementById("monster-Types").value;
  const eyes = document.querySelector('input[name="eyes"]').value;
  const arms = document.querySelector('input[name="arms"]').value;
  const horns = document.querySelector('input[name="horn"]').value;
  const tentacles = document.querySelector('input[name="tentacles"]').value;

  document.getElementById("output").textContent = "Done!";
});
document.querySelector(".edit-button").addEventListener("click", (e) => {
  e.preventDefault();
  // Anropa funktion som ersätter monsterkortets innehåll med ett formulär för att redigera monstrets attribut. Nuvarande data ska behållas i inputrutorna. (OBS! Jag har inte börjat bygga funktionen ännu)
});

// Lägg till funktion här som tar information från formuläret och lägger in som ett monster-objekt i state.collection
