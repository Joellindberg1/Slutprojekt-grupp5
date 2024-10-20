// ==============================FUNCTIONS=================================

// ============CUSTOM ALERT-WINDOW==============
// Används som bekräftelse för borttaget monster
// =============================================
const customAlert = () => {

    const parent = document.querySelector('body');
    const customAlert = document.createElement('div');
    customAlert.id = "alertDiv";

    const imgSrc = document.createElement('img');
    imgSrc.alt = "Image";
    imgSrc.src = 'https://i.postimg.cc/1zbjGtDC/Monster-DB.jpg';

    const p = document.createElement('p');
    p.textContent = "Monster has been spliced!";


    const alertButton = document.createElement('button');
    alertButton.textContent = "Close";
    alertButton.id = "alertButton";



    customAlert.appendChild(imgSrc);
    customAlert.appendChild(p);
    customAlert.appendChild(alertButton);
    parent.appendChild(customAlert);

    alertButton.addEventListener('click', (e) => {

        parent.removeChild(customAlert);
    });
};


// ===============CLOSE ALERT=================

const alertDiv = document.getElementById("alertDiv");
function invokeAlert() {
    alertDiv.style.display = "block";
}
function closeDialog() {
    alertDiv.style.display = "none";
}


// ===============MONSTER CARDS===============
// Funktion som renderar dynamiska monsterkort.
// ===========================================

//Låter renderMonsterCard ta emot lista av monster för filtering av färg och typ. Skickas ingen lista så används hela state.collection. 
const renderMonsterCard = (monstersToRender = state.collection) => {

    // Tömmer section class="collection" innan ny rendering
    const monsterSection = document.querySelector(".collection");
    monsterSection.innerHTML = "";

    // Loopar igenom den angivna arrayen för att skapa monsterkort
    monstersToRender.forEach(object => {
        // Skapar ny article-tag
        const monster = document.createElement("article");
        monster.className = "monster";
        monster.id = object.name.replaceAll(" ", '-');

        // Tags för att vända kort i mobil
        const monsterInner = document.createElement("div");
        monsterInner.className = "monster-inner";
        monster.appendChild(monsterInner);

        const monsterFront = document.createElement("div");
        monsterFront.className = "monster-front";
        monsterInner.appendChild(monsterFront);

        const monsterBack = document.createElement("div");
        monsterBack.className = "monster-back";
        monsterInner.appendChild(monsterBack);


        // Skapar tabell till den nyskapade article-tag'en
        const table = document.createElement("table");
        table.className = object.name.replaceAll(" ", '-') + "-table";
        monsterBack.appendChild(table);

        // const caption = document.createElement("caption");
        // table.appendChild(caption);

        const h3 = document.createElement("h3");
        h3.innerHTML = object.name;
        monsterFront.appendChild(h3);


        // Stödfunktion för att skapa rader i tabellen
        const addRow = (label, value) => {
            const row = document.createElement("tr");
            row.className = "hide-on-mobile";
            table.appendChild(row);

            const th = document.createElement("th");
            th.scope = "row";
            th.innerHTML = `${label}: `;
            row.appendChild(th);

            const td = document.createElement("td");
            td.innerHTML = value;
            td.className = value;
            td.id = object.name + "-" + label.replaceAll(" ", '-');
            row.appendChild(td);

        }

        // Skapar radernas innehåll
        addRow("Color", object.color);
        addRow("Type", object.type);

        let i = 0;
        for (element of monsterAttributes) {
            addRow("Number of " + [element], object[element]);
            i++;
        }


        // Skapar knapp-container
        const cardButtonContainer = document.createElement('div');
        cardButtonContainer.className = "card-button-container";

        // KNAPP: Edit
        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.id = "edit-" + object.name.replaceAll(" ", '-');
        editButton.type = "button";
        editButton.innerHTML = "Edit monster";
        cardButtonContainer.appendChild(editButton);
        monsterBack.appendChild(cardButtonContainer);

        // EVENT: Edit
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

            // KNAPP: Confirm
            const getEditButton = document.getElementById(`edit-${object.name.replaceAll(" ", '-')}`);
            const confirmButton = document.createElement('button');
            confirmButton.innerHTML = "Confirm";
            confirmButton.className = "confirm-button";
            confirmButton.type = "button";
            getEditButton.parentNode.replaceChild(confirmButton, getEditButton);



            // KNAPP: Cancel
            const cancelButton = document.createElement("button");
            cancelButton.className = "cancel-button";
            cancelButton.id = "cancel-edit-" + object.name.replaceAll(" ", '-');
            cancelButton.type = "button";
            cancelButton.innerHTML = "Cancel";
            cardButtonContainer.appendChild(cancelButton);





            // KNAPP: "Remove" monster
            const removeMonsterButton = document.createElement("button");
            removeMonsterButton.className = "remove-button";
            removeMonsterButton.id = "remove-" + object.name.replaceAll(" ", '-');
            removeMonsterButton.type = "button";
            removeMonsterButton.innerHTML = '"Remove" monster';
            cardButtonContainer.appendChild(removeMonsterButton);







            // EVENT: Confirm
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
                cardButtonContainer.removeChild(cancelButton);
                cardButtonContainer.removeChild(removeMonsterButton);
            })


            // EVENT: Cancel
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
                cardButtonContainer.removeChild(cancelButton);
                cardButtonContainer.removeChild(removeMonsterButton);

            })

            // EVENT: "Remove" monster
            removeMonsterButton.addEventListener('click', (e) => {
                e.preventDefault();


                const monsterIndex = state.collection.findIndex(monster => monster.name === `${object.name}`);

                state.collection.splice(monsterIndex, 1);


                confirmButton.parentNode.replaceChild(editButton, confirmButton);
                cardButtonContainer.removeChild(cancelButton);
                cardButtonContainer.removeChild(removeMonsterButton);

                renderMonsterCard();

                customAlert();
            })


        })
        monsterSection.appendChild(monster);
    })
}


//Tar emot färg eller typ och lägger in istället för Null, om inget värde så blir värdet null så färg eller typ kommer bli null.
const filterMonsters = (filterColor = null, filterType = null) => {
    //Här kollar vi filterMonsters och kollar igenom state.collection. Vi använder filter metoden. Vi skapar en ny array på de med samma färg som vi angav med filterMonsters. 
    const filteredMonsters = state.collection.filter(monster => {
        //Kollar igenom monstrenas färger i state.collection och matchar mot sökt färg, finns färgen = true. om ingen färg är sökt så blir värde true för att alla färger är okej. Samma gäller type. 
        const matchesColor = filterColor ? monster.color === filterColor : true;
        const matchesType = filterType ? monster.type === filterType : true;
        //True i vår app = 1 typ eller färg som vi söker efter finns i state.collection och den andra blir true då inget var varlt för denna. Dessa objekt får visas. 
        //Väljer blå - Då får alla blåa visas men också alla typer som har färgen blå i. 
        return matchesColor && matchesType;
    });
    renderMonsterCard(filteredMonsters);  // Skicka den filtrerade listan till render
};

// ========LÄGGER IN ARRAYS I FORMULÄR========
// Hämtar arrays och lägger in i rullistor.
// ===========================================
window.addEventListener("load", (event) => {


    updateCounts();       // Uppdatera räkningen av färger och typer baserat på initial state.collection

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
        input.value = "0";
        input.name = element;

        const label = document.createElement("label");

        label.for = element;
        label.textContent = element;

        monsterForm.appendChild(label);
        monsterForm.appendChild(input);

        i++;
    }

});

// ================FORM RULES================
// Regler för inputs i formulär
// ==========================================
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    let filteredValue = inputValue.replace(/[^A-Za-zÅÄÖåäö\s]/g, "");
    event.target.value = filteredValue;
});
// ==========================================


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


// State innehåller datan från användarens input samt standardvärdena för appen

const state = {
    collection: [
        { name: "Grimblot", color: monsterColors[1], type: monsterTypes[1], },
        { name: "Zarok", color: monsterColors[0], type: monsterTypes[0], },
        { name: "Blisterfang", color: monsterColors[1], type: monsterTypes[1], },
        { name: "Thraxxis", color: monsterColors[2], type: monsterTypes[2], },
        { name: "Murkspawn", color: monsterColors[3], type: monsterTypes[0], },
        { name: "Vorrgath", color: monsterColors[4], type: monsterTypes[1], },

    ],
};




document.getElementById("form-button").addEventListener("click", () => {


    pushMonsters();

    updateCounts();

    renderMonsterCard();



    // Rensar formulär efter submit
    document.getElementById("add-monster-form").reset();
});


renderMonsterCard();




// Skapa arrays för räkning av färger och typer av monster - Detta används senare i skapande av knappar - arrayerna är lika långa som arrayerna för typ och färg och fyller arrayerna med 0:or
const colorCount = new Array(monsterColors.length).fill(0);  // Initierar med 0
const typeCount = new Array(monsterTypes.length).fill(0);    // Initierar med 0

function updateCounts() {

    //Återställer räknarna. 
    colorCount.fill(0);
    typeCount.fill(0);

    // Loopa igenom collection-arrayen för att jämföra index från arrayer "monsterColors och monsterTypes" 
    // om samma index = Samma färg och lägg till i counter array för att skickas till korten när dem skapas
    state.collection.forEach(monster => {
        const colorIndex = monsterColors.indexOf(monster.color);
        const typeIndex = monsterTypes.indexOf(monster.type);

        // Om index inte är -1, plussa på en. -1 = färg/typ finns inte i array och är felaktig och räknas då inte.
        if (colorIndex !== -1) {
            colorCount[colorIndex]++;
        }

        if (typeIndex !== -1) {
            typeCount[typeIndex]++;
        }
    });

    updateFilterButtons();
}


// Skapa knappar för varje färg och inkludera räkningen från colorCount igenom att hålla reda på index. 
// Kontrollera om reset-knappen redan finns
let resetButton; // Reset-knappen definieras globalt

//Hämtar från dom-trädet - För att appenda barn till dessa som är föräldrar.
const filterContainer = document.querySelector(".filter-container");
const filterContainerColor = document.querySelector(".filters-color");
const filterContainerType = document.querySelector(".filters-monster");
function updateFilterButtons() {
    //rensa tidigare knappar - Detta då filtering sker hela tiden
    filterContainerColor.innerHTML = "";
    filterContainerType.innerHTML = "";
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
            // Kallar på filterMOnsters som då endast visar färg som är klickad på då färg är definerad tidigare i forEach lopen.
            filterMonsters(color, null);

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
            filterMonsters(null, type);
            createResetButton();
        });
    });
};


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


renderMonsterCard();

