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

const renderMonsterCard = (filterColor = null, filterType = null) => {
    // Tömmer section class="collection"
    const monsterArticle = document.querySelector(".collection");
    monsterArticle.innerHTML = "";

    // loopar igenom state för att skapa monster-kort av innehållet
    for (const m of state.collection) {
        // Filtrera monsterkort baserat på färg och typ
        if ((filterColor && m.color !== filterColor) || (filterType && m.type !== filterType)) {
            continue; // Hoppa över detta monster om det inte matchar filtreringen
        }

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
        }

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
    let i = 0;
    for (const element of monsterColors) {
        const colors = document.getElementById("monster-Colors");
        colors.value = i;
        colors.innerHTML = monsterColors[i];
        i++;
        const option = document.createElement("option");
        option.text = element;
        colors.add(option);
    }

    i = 0;
    for (const element of monsterTypes) {
        const types = document.getElementById("monster-Types");
        types.value = i;
        types.innerHTML = monsterTypes[i];
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
        { name: "Grimblot", type: monsterTypes[1], color: monsterColors[1], eyes: 1, arms: 2, horns: 2, tentacles: 0 },
        { name: "Zarok the Devourer", type: monsterTypes[0], color: monsterColors[1], eyes: 2, arms: 0, horns: 1, tentacles: 4 },
        { name: "Blisterfang", type: monsterTypes[1], color: monsterColors[1], eyes: 3, arms: 4, horns: 0, tentacles: 1 },
        { name: "Thraxxis", type: monsterTypes[2], color: monsterColors[2], eyes: 5, arms: 8, horns: 1, tentacles: 0 },
        { name: "Murkspawn", type: monsterTypes[0], color: monsterColors[3], eyes: 2, arms: 2, horns: 0, tentacles: 6 },
        { name: "Vorrgath", type: monsterTypes[1], color: monsterColors[4], eyes: 1, arms: 1, horns: 1, tentacles: 1 },
    ],
    createNewMonster: [],
    addMonster: (name, type, color, eyes, arms, horns, tentacles) => {
        state.collection.push({ name, type, color, eyes, arms, horns, tentacles });
    },
};

state.addMonster("Test", monsterTypes[1], monsterColors[2], 2, 3, 4, 5);
renderMonsterCard(); // Rendera alla monster kort från början


// Skapa arrays för räkning av färger och typer av monster
const colorCount = new Array(monsterColors.length).fill(0);  // Initierar med 0
const typeCount = new Array(monsterTypes.length).fill(0);    // Initierar med 0

// Loopa igenom collection-arrayen för att räkna färger och typer
state.collection.forEach(monster => {
    // Tar reda på index i arryen monsterColor och type för att matcha räknaren och arryen med färger och typer. 
    const colorIndex = monsterColors.indexOf(monster.color);
    const typeIndex = monsterTypes.indexOf(monster.type);
    
    // Om index inte är -1, plussa på en. Detta för färg. 
    if (colorIndex !== -1) {
        colorCount[colorIndex]++;
    }
    
    // Om index inte är -1, plussa på en. Detta för typ. 
    if (typeIndex !== -1) {
        typeCount[typeIndex]++;
    }
});



// Skapa knappar för varje färg och inkludera räkningen från colorCount igenom att hålla reda på index. 
// Kontrollera om reset-knappen redan finns
let resetButton; // Reset-knappen definieras globalt

//Hämtar från dom-trädet - För att appenda barn till dessa som är föräldrar.
const filterContainer = document.querySelector(".filter-container");
const filterContainerColor = document.querySelector(".filters-color");
const filterContainerType = document.querySelector(".filters-monster");

// Skapa filterknappar för färger
monsterColors.forEach((color, index) => {
    //Skapar elementet "Button"
    const filterButtonColor = document.createElement("button");
    //Ger knappen ett klassnamn - "Filter-button"
    filterButtonColor.className = "filter-button";
    //Bestämmer att "FilterbuttonType" ska bli typen "Button"
    filterButtonColor.type = "button";
    
    // Texten på knappen visar färgen och antal monster som matchar
    filterButtonColor.innerHTML = `${color} (${colorCount[index]})`;

    // knappen jag har skapat nu sätter jag som barn till "filters-color" classen i index.html
    filterContainerColor.appendChild(filterButtonColor);

    // Lägg till en event listener för när användaren klickar på knappen
    filterButtonColor.addEventListener("click", () => {
        renderMonsterCard(color); // Kallar på renderMonsterCard som då endast visar färg som är klickad på då färg är definerad tidigare i innerHTML. 

        // Kontrollera om reset-knappen redan finns
        if (!resetButton) {
            // Skapa en ny div-container för reset-knappen
            const resetContainer = document.createElement("div");
            resetContainer.className = "reset-filter-container"; // Klass för CSS-styling

            // Skapa reset-knappen
            resetButton = document.createElement("button");
            resetButton.className = "reset-filter-button"; // Klass för knappen
            resetButton.innerText = "Reset Filter"; // Text på reset-knappen

            // Lägg till reset-knappen i resetContainer
            resetContainer.appendChild(resetButton); // Lägg knappen i containern

            // Lägg till resetContainer i filterContainer (eller resetFilter om du föredrar det)
            filterContainer.appendChild(resetContainer); // Lägg till containern i griden

            // Event listener för reset-knappen, som visar alla monster igen
            resetButton.addEventListener("click", () => {
                renderMonsterCard(); // Rendera om alla monster
                resetContainer.remove(); // Ta bort containern och knappen efter att den har tryckts
                resetButton = null; // Återställ resetButton till null
            });
        }
    });
});

// Skapa filterknappar för monster typer
monsterTypes.forEach((type, index) => {
    //Skapar elementet "Button"
    const filterButtonType = document.createElement("button");
    //Ger knappen ett klassnamn - "Filter-button"
    filterButtonType.className = "filter-button";
    //Bestämmer att "FilterbuttonType" ska bli typen "Button"
    filterButtonType.type = "button";

    // Texten på knappen visar typen och antal monster som matchar
    filterButtonType.innerHTML = `${type} (${typeCount[index]})`;

    // knappen jag har skapat nu sätter jag som barn till "filters-monster" classen i index.html
    filterContainerType.appendChild(filterButtonType);

    // Lägg till en event listener för när användaren klickar på knappen
    filterButtonType.addEventListener("click", () => {
        renderMonsterCard(null, type); // Filtrera monster baserat på vald typ

        // Kontrollera om reset-knappen redan finns
        if (!resetButton) {
            // Skapa en ny div-container för reset-knappen
            const resetContainer = document.createElement("div");
            resetContainer.className = "reset-filter-container"; // Klass för CSS-styling

            // Skapa reset-knappen
            resetButton = document.createElement("button");
            resetButton.className = "reset-filter-button"; // Klass för knappen
            resetButton.innerText = "Reset Filter"; // Text på reset-knappen

            // Lägg till reset-knappen i resetContainer
            resetContainer.appendChild(resetButton); // Lägg knappen i containern

            // Lägg till resetContainer i filterContainer (eller resetFilter om du föredrar det)
            filterContainer.appendChild(resetContainer); // Lägg till containern i griden

            // Event listener för reset-knappen, som visar alla monster igen
            resetButton.addEventListener("click", () => {
                renderMonsterCard(); // Rendera om alla monster
                resetContainer.remove(); // Ta bort containern och knappen efter att den har tryckts
                resetButton = null; // Återställ resetButton till null
            });
        }
    });
});



