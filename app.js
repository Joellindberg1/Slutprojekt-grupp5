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
    const monsterSection = document.querySelector(".collection");
    monsterSection.innerHTML = "";

    // loopar igenom state.collection för att skapa monster-kort av innehållet
    state.collection.forEach(object => {

        // Skapar ny article-tag
        const monster = document.createElement("article");
        monster.className = "monster";
        monster.id = object.name.replaceAll(" ", '-');

        // Skapar tabell till den nyskapade article-tag'en
        const table = document.createElement("table");
        const caption = document.createElement("caption");
        const h3 = document.createElement("h3");
        table.className = object.name.replaceAll(" ", '-') + "-table";
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
            td.id = object.name + "-" + label.replaceAll(" ", '-');
            row.appendChild(th);
            row.appendChild(td);
            table.appendChild(row);
        }

        // Skapar radernas innehåll
        addRow("Type", object.type);
        addRow("Color", object.color);
        i = 0;
        for (element of monsterAttributes) {

            addRow("Number of " + [element], object[element]);

            i++;

        }

        monster.appendChild(table);

        // Edit button
        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.id = "edit-" + object.name.replaceAll(" ", '-');
        editButton.type = "button";
        editButton.innerHTML = "Edit monster";

        monster.appendChild(editButton);

        // Edit button event
        editButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Lagrar ursprungliga värden för monsterattribut så att de kan återställas ifall användaren klickar på Cancel
            const originalAttributeValues = {};
            for (let element of monsterAttributes) {
                const td = document.getElementById(`${object.name}-Number-of-${element.replaceAll(" ", '-')}`);
                originalAttributeValues[element] = td.textContent;
            }

            // Gör om kortets table till formulär för att redigera
            for (let element of monsterAttributes) {

                const td = document.getElementById(`${object.name}-Number-of-${element.replaceAll(" ", '-')}`);

                if (td.id !== `${object.name}-color` || `${object.name}-type`) {
                    const editInput = document.createElement('input');
                    editInput.value = td.textContent;
                    editInput.id = td.id;
                    editInput.type = "number";
                    td.parentNode.replaceChild(editInput, td);
                }
            }

            // Confirm button
            const getEditButton = document.getElementById(`edit-${object.name.replaceAll(" ", '-')}`);
            const confirmButton = document.createElement('button');
            confirmButton.innerHTML = "Confirm";
            confirmButton.className = "confirm-button";
            confirmButton.type = "button";
            getEditButton.parentNode.replaceChild(confirmButton, getEditButton);



            // Cancel button
            const cancelButton = document.createElement("button");
            cancelButton.className = "cancel-button";
            cancelButton.id = "cancel-edit-" + object.name.replaceAll(" ", '-');
            cancelButton.type = "button";
            cancelButton.innerHTML = "Cancel";
            monster.appendChild(cancelButton);





            // "Remove" monster button
            const removeMonsterButton = document.createElement("button");
            removeMonsterButton.className = "remove-button";
            removeMonsterButton.id = "remove-" + object.name.replaceAll(" ", '-');
            removeMonsterButton.type = "button";
            removeMonsterButton.innerHTML = '"Remove" monster';
            monster.appendChild(removeMonsterButton);




            // Confirm button click event
            confirmButton.addEventListener('click', (e) => {
                e.preventDefault();
                

                // Hittar rätt objekt att uppdatera med nya värden
                const monsterIndex = state.collection.findIndex(monster => monster.name === `${object.name}`);

                // Skapar uppdaterat monster-objekt
                if (monsterIndex !== -1) {

                    // Skapar objektet
                    const updatedMonster = { ...state.collection[monsterIndex] };

                    // Loopar igenom attributen och ändrar värdena
                    for (let element of monsterAttributes) {
                        const editInput = document.getElementById(`${object.name}-Number-of-${element.replaceAll(" ", '-')}`);
                        updatedMonster[element] = editInput.value;
                    }

                    // Byter ut det gamla monstret mot det nya
                    state.collection.splice(monsterIndex, 1, updatedMonster);

                    renderMonsterCard();

                    window.alert("The monster has been updated!");

                }

                confirmButton.parentNode.replaceChild(editButton, confirmButton);
                monster.removeChild(cancelButton);
                monster.removeChild(removeMonsterButton);
            })


            // Cancel button click event
            cancelButton.addEventListener('click', (e) => {
                e.preventDefault();

                // Ändrar tillbaka inputs till td i tabellen
                for (let element of monsterAttributes) {

                    const editInput = document.getElementById(`${object.name}-Number-of-${element.replaceAll(" ", '-')}`);

                    if (editInput.id !== `${object.name}-color` || `${object.name}-type`) {
                        const td = document.createElement('td');
                        td.textContent = originalAttributeValues[element];
                        td.id = editInput.id;
                        editInput.parentNode.replaceChild(td, editInput);
                    }

                }

                //Ersätter knapparna Confirm, Cancel och "Remove" monster med Edit monster-knapp
                confirmButton.parentNode.replaceChild(editButton, confirmButton);
                monster.removeChild(cancelButton);
                monster.removeChild(removeMonsterButton);

            })

            // "Remove" monster button click event
            removeMonsterButton.addEventListener('click', (e) => {
                e.preventDefault();


                const monsterIndex = state.collection.findIndex(monster => monster.name === `${object.name}`);

                state.collection.splice(monsterIndex, 1);

                console.log(state.collection);
                confirmButton.parentNode.replaceChild(editButton, confirmButton);
                monster.removeChild(cancelButton);
                monster.removeChild(removeMonsterButton);

                renderMonsterCard();

                customAlert();
            })


        })
        monsterSection.appendChild(monster);
    })
}

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
        input.className = "attribut";
        input.min = "0";
        input.max = "99";
        input.type = "number";
        input.value = "";
        input.name = element;

        const label = document.createElement("label");

        label.for = element;
        label.textContent = element;

        monsterForm.appendChild(label);
        monsterForm.appendChild(input);

        i++;
    }
    
});
// bara att använda bokstaver inte cifror
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    let filteredValue = inputValue.replace(/[^A-Za-zÅÄÖåäö\s]/g, "");
    event.target.value = filteredValue;
});


// ========PUSH MONSTERS TO COLLECTION========
// Gör monsterobjekt av monsterdata från
// forumlären och pushar dem till array Collection
// ===========================================
function pushMonsters() {

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

    }, {})

    state.collection.push(result);

};


// ==============APP STARTAR HÄR==============

// Arrays som lagrar möjliga färger och typer för monster
const monsterColors = ["Blue", "Green", "Red", "Brown", "Purple"];
const monsterTypes = ["Firemonster", "Skymonster", "Watermonster"];
const monsterAttributes = ["Eyes", "Arms", "Tentacles", "Horns"];

const allKeys = ["name", "color", "type", ...monsterAttributes];
const values = [];
const allValues = [...values];






//<=========================================================================>//
//<========Försök till att göra om all html till JS som skapar html=========>//
//<=========================================================================>//

// document.addEventListener("DOMContentLoaded", () => {
//     const mainContainer = document.getElementById("container");

//     const asideStatistik = document.createElement("aside");
//     asideStatistik.className = "database"; // Klass för CSS-styling
//     const footer = document.createElement("footer");

//     const statistikHeader = document.createElement("div");
//     statistikHeader.className = "statistik";
//     statistikHeader.innerHTML = "Filter";

//     const filterContainer = document.createElement("div");
//     filterContainer.className = "filter-container";

//     const headerColor = document.createElement("h4");
//     headerColor.innerHTML = "Färg";

//     const filterColors = document.createElement("div");
//     filterColors.className = "filters-color";

//     const headerType = document.createElement("h4");
//     headerType.innerHTML = "Typ";

//     const filterType = document.createElement("div");
//     filterType.className = "filters-monster";

//     mainContainer.appendChild(asideStatistik);
//     mainContainer.appendChild(footer);

//     asideStatistik.appendChild(statistikHeader);
//     asideStatistik.appendChild(filterContainer);

//     filterContainer.appendChild(headerColor);
//     filterContainer.appendChild(filterColors);
//     filterContainer.appendChild(headerType);
// });

//<=========================================================================>//
//<========Färsök till att göra om all html till JS som skapar html=========>//
//<=========================================================================>//

// resetButton = document.createElement("button");
// resetButton.className = "reset-filter-button"; // Klass för knappen
// resetButton.type = "button"; // Definera type för element
// resetButton.innerText = "Ta bort filter"; // Text på reset-knappen


// State innehåller datan från användarens input samt standardvärdena för appen

const state = {
    collection: [
        { name: "Grimblot", type: monsterTypes[1], color: monsterColors[1], },
        { name: "Zarok the Devourer", type: monsterTypes[0], color: monsterColors[0], },
        { name: "Blisterfang", type: monsterTypes[1], color: monsterColors[1], },
        { name: "Thraxxis", type: monsterTypes[2], color: monsterColors[2], },
        { name: "Murkspawn", type: monsterTypes[0], color: monsterColors[3], },
        { name: "Vorrgath", type: monsterTypes[1], color: monsterColors[4], },

    ],
};




document.getElementById("form-button").addEventListener("click", () => {


    pushMonsters();

    renderMonsterCard();



    // Rensar formulär efter submit
    document.getElementById("add-monster-form").reset();
});


renderMonsterCard();
// Skapa arrays för räkning av färger och typer av monster - Detta används senare i skapande av knappar
const colorCount = new Array(monsterColors.length).fill(0);  // Initierar med 0
const typeCount = new Array(monsterTypes.length).fill(0);    // Initierar med 0

// Loopa igenom collection-arrayen för att jämföra index från arrayer "monsterColors och monsterTypes" 
// om samma index = Samma färg och lägg till i counter array för att skickas till korten när dem skapas
state.collection.forEach(monster => {
    const colorIndex = monsterColors.indexOf(monster.color);
    const typeIndex = monsterTypes.indexOf(monster.type);
    
    // Om index inte är -1, plussa på en. Detta för färg. -1 = färg finns inte i array och är felaktig och räknas då inte. 
    if (colorIndex !== -1) {
        colorCount[colorIndex]++;
    }
    
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

    // Lägg till en event listener för när användaren klickar på en färg filter knapp
    filterButtonColor.addEventListener("click", () => {
        // Kallar på renderMonsterCard som då endast visar färg som är klickad på då färg är definerad tidigare i innerHTML.
        renderMonsterCard(color);  

        //Kallar på en funktion som skapar en reset-filter knapp och som sedan tar bort den om den används. Check för ifall knapp redan finns, finns i global. 
        createResetButton();
    });
});

//Repeat från color fast till monster typ istället. 
monsterTypes.forEach((type, index) => {
    const filterButtonType = document.createElement("button");
    filterButtonType.className = "filter-button";
    filterButtonType.type = "button";

    filterButtonType.innerHTML = `${type} (${typeCount[index]})`;

    filterContainerType.appendChild(filterButtonType);

    filterButtonType.addEventListener("click", () => {
        renderMonsterCard(null, type); 
        createResetButton();
    });
});

// Funktion för att skapa och hantera reset-knappen
function createResetButton() {
    // Kontrollera om resetButton redan finns
    if (!resetButton) {
        // Skapa en ny div-container för reset-knappen 
        const resetContainer = document.createElement("div");
        resetContainer.className = "reset-filter-container"; // Klass för CSS-styling

        // Skapa reset-knappen
        resetButton = document.createElement("button");
        resetButton.className = "reset-filter-button"; // Klass för knappen
        resetButton.type = "button"; // Definera type för element
        resetButton.innerText = "Ta bort filter"; // Text på reset-knappen

        // knappen jag har skapat nu sätter jag som barn till "reset-filter-container" classen i index.html
        resetContainer.appendChild(resetButton);

        // knappen jag har skapat nu sätter jag som barn till "filter-container" classen i index.html
        filterContainer.appendChild(resetContainer);

        // Event listener för reset-knappen, som visar alla monster igen
        resetButton.addEventListener("click", () => {
            renderMonsterCard(); // Rendera monsterkort för inga filter
            resetContainer.remove(); // Ta bort containern och knappen efter att den har tryckts
            resetButton = null; // Återställ resetButton - Detta för att kunna återskapa resetknapp
        });
    }
}



