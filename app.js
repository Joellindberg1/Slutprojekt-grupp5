// ==================OBJEKT==================

const monsterObject = {

    Name: Lorem Ipsum ;// Behöver hämtas från formuläret
    Type: monsterTypes;
    Color: monsterColors;
    Number of tentacles: 4; // Behöver hämtas från formuläret
    Number of eyes: 1; // Behöver hämtas från formuläret
    Number of arms: 2; // Behöver hämtas från formuläret
    Number of horns: 2; // Behöver hämtas från formuläret
    colorMap: {
        color1: monsterColors[0],
        color2: monsterColors[1],
        color3: monsterColors[2],
        color4: monsterColors[3],
        color5: monsterColors[4]
    }
}

//===========================================

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


const monsterColors = ["Blue", "Green", "Red", "Brown", "Purple"];
const monsterTypes = ["Firemonster", "Skymonster", "Watermonster"];
