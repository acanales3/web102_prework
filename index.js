/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
            <div>
                <img src="${game.img}" alt="${game.name} Image" class="game-img" />
                <h1>${game.name}</h1>
                <p>Description: ${game.description}</p>
                <h3>${game.backers}</h3>
            </div>
        `;

    document.getElementById("games-container").append(gameCard);
  }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

let totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString("en-US");

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalPledged = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);

raisedCard.innerHTML = "$" + totalPledged.toLocaleString("en-US");

// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let totalGames = GAMES_JSON.reduce((total, game) => {
  return total + 1;
}, 0);

gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  let unfundedGames = GAMES_JSON.filter((game) => {
    return game.goal > game.pledged;
  });
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  let fundedGames = GAMES_JSON.filter((game) => {
    return game.goal <= game.pledged;
  });
  addGamesToPage(fundedGames);
}

function showAllGames() {
  deleteChildElements(gamesContainer);

  let allGames = GAMES_JSON.filter((game) => {
    return game;
  });
  addGamesToPage(allGames);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfunded = GAMES_JSON.reduce((total, game) => {
  if (game.pledged < game.goal) {
    return total + 1;
  } else {
    return total + 0;
  }
}, 0);

let displayStr = `There is a total of $${totalPledged.toLocaleString(
  "en-US"
)} for ${totalGames - numUnfunded} games. Currently, ${
  numUnfunded === 1
    ? "1 game remains unfunded"
    : `${numUnfunded} games remain unfunded`
}. We need your help to fund these amazing games!`;
// create a string that explains the number of unfunded games using the ternary operator

const unfundedMessage = document.createElement("div");
unfundedMessage.innerHTML = `
    <p>
    ${displayStr}
    </p>
`;

descriptionContainer.append(unfundedMessage);
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// create a new element to hold the name of the top pledge game, then append it to the correct element
let [gameOne, ...others] = sortedGames;
let [gameTwo, ...rest] = others;

let [gameOneName, gameTwoName] = [gameOne.name, gameTwo.name];

const firstGame = document.createElement("div");
firstGame.innerHTML = `
    <div>
        ${gameOneName}
    </div>
`;

firstGameContainer.append(firstGame);

// do the same for the runner up item
const secondGame = document.createElement("div");
secondGame.innerHTML = `
    <div>
        ${gameTwoName}
    </div>
`;

secondGameContainer.append(secondGame);

/*
    ADDED FEATURE - NAVBAR WITH SMOOTH SCROLL
*/

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(target);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
