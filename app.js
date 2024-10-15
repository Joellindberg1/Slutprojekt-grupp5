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
    const monsterSection = document.querySelector(".collection");
    monsterSection.innerHTML = "";

    // loopar igenom state för att skapa monster-kort av innehållet

    for (const m of state.collection) {
        // Skapar ny article-tag
        const monster = document.createElement("article");
        monster.className = "monster";
        monster.id = m.name.replaceAll(" ", '-');

        // Skapar tabell till den nyskapade article-tag'en
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        const h3 = document.createElement("h3");
        table.className = m.name.replaceAll(" ", '-') + "-table";
        h3.innerHTML = m.name;
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
        }

        addRow("Type", m.type);
        addRow("Color", m.color);

        i = 0; // DEN FUNKAR, DO NOT FUCK WITH UNLESS YOU WANT TO GET FUCKED
        for (element of monsterAttributes) {

            addRow("Number of " + [element], m[element]);

            i++;

        }

        monster.appendChild(table);

        // // Skapar en knapp för att redigera monster-attributen
        // const editButton = document.createElement("button");
        // editButton.className = "edit-button";
        // editButton.id = "edit-" + m.name.replaceAll(" ", '-');
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
        colors.innerHTML = monsterColors[i]
        i++;
        const option = document.createElement("option");
        option.text = element;
        colors.add(option);
    }

    i = 0;
    for (const element of monsterTypes) {
        const types = document.getElementById("monster-Types");
        types.value = i;
        types.innerHTML = monsterTypes[i]
        i++;
        const option = document.createElement("option");
        option.text = element;
        types.add(option);
    }

    i = 0;
    for (const element of monsterAttributes) {
        const monsterForm = document.getElementById("add-monster-form");
        const input = document.createElement("input");
        input.type = "number";
        input.value = "0";
        input.main = element;
        // input.name = `"+ ${element} + "`;
        input.name = element;
        const label = document.createElement("label");
        label.for = element;
        label.innerHTML = element;

        monsterForm.appendChild(label);
        monsterForm.appendChild(input);
        i++;
    }

});


// ==============APP STARTAR HÄR==============

// Arrays som lagrar möjliga färger och typer för monster
const monsterColors = ["Blue", "Green", "Red", "Brown", "Purple"];
const monsterTypes = ["Firemonster", "Skymonster", "Watermonster"];
const monsterAttributes = ["eyes", "arms", "tentacles", "horns", "balls"]; // OBS! Endast gemener för att matcha objektets nycklar

/// !!! MÅSTE SKAPA ARRAY FÖR DE FYRA UTSEENDEATTRIBUTEN


// State innehåller datan från användarens input samt standardvärdena för appen

const state = {

    collection: [
        { name: "Grimblot", type: monsterTypes[1], color: monsterColors[1], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute, index) { 2 } },
        { name: "Zarok the Devourer", type: monsterTypes[0], color: monsterColors[0], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute) { 4 } },
        { name: "Blisterfang", type: monsterTypes[1], color: monsterColors[1], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute) { 4 } },
        { name: "Thraxxis", type: monsterTypes[2], color: monsterColors[2], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute) { 4 } },
        { name: "Murkspawn", type: monsterTypes[0], color: monsterColors[3], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute) { 4 } },
        { name: "Vorrgath", type: monsterTypes[1], color: monsterColors[4], addmonster(attribute) { 1 }, addmonster(attribute) { 2 }, addmonster(attribute) { 3 }, addmonster(attribute) { 4 } },
    ],
    createNewMonster: [],


    addMonster: function (name, type, color, attributeValues) {
        const newMonster = {
            name: name, // OBS! SKA VARA USER INPUT
            type: type, // OBS! SKA VARA USER INPUT
            color: color, // OBS! SKA VARA USER INPUT
        };

        monsterAttributes.forEach((attribute, index) => {
            newMonster[attribute] = attributeValues[2, 3, 4, 5, 6] || 0; // OBS! attributeValues ska vara user input
        });

        this.collection.push(newMonster);

    }
};

console.log(state.collection[0]);
// state.addMonster("Test", monsterTypes[1], monsterColors[2], monsterAttributes[0], 3, 4, 5);
renderMonsterCard();


document.getElementById("test").addEventListener("click", () => {
    // Hardcoded test values for name, type, color, and attributes
    const name = "Test Monster";
    const type = monsterTypes[0]; // First type from monsterTypes array
    const color = monsterColors[0]; // First color from monsterColors array

    // Hardcoded attribute values for testing (e.g., 2 eyes, 3 arms, 4 tentacles, 1 horn)
    const attributeValues = [2, 3, 4, 1, 2];

    // Call the addMonster function to add a new monster to the state
    state.addMonster(name, type, color, attributeValues);

    // Re-render the monster cards after adding a new monster
    renderMonsterCard();

    console.log("Monster added:", state.collection);
});
