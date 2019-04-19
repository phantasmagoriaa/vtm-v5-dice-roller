// ------------------------- Functions

const rollDie = () => { // Function to roll dice
    return Math.floor((Math.random() * 10) + 1);
};

// Building the dice pools
const basePool = 10;
const hungerDice = 3;
const difficulty = 7;

// If the base pool is higher than the amount of hunger dice, keep the difference as base pool.
// If the base pool is lower or equal to the hunger dice, keep only hunger dice.
let normalDice = 0; 
if (basePool - hungerDice > 0) { 
    normalDice = basePool - hungerDice;
} else if (basePool - hungerDice <= 0) {
    normalDice = 0;
}

// Rolling the dice

let normalResults = [];
let hungerResults = [];

for (let i = 0; i < normalDice; i++) {
    normalResults[i] = rollDie();
};

if (hungerDice > 0) {
    for (let i = 0; i < hungerDice; i++) {
        hungerResults[i] = rollDie();
    }
}

// for debug
console.log(`Normal results: ${normalResults}`);
console.log(`Hunger results: ${hungerResults}`);

const normalSuccesses = normalResults.filter(number => {
    return number >= 6 && number < 10;
});

const normalTens = normalResults.filter(number => {
    return number === 10;
});

const hungerSuccesses = hungerResults.filter(number => {
    return number >= 6 && number < 10;
});

const hungerFailures = hungerResults.filter(number => {
    return number === 1;
});

const hungerTens = hungerResults.filter(number => {
    return number === 10;
});

// debug block
console.log(`Normal successes: ${normalSuccesses.toString()}`);
console.log(`Normal tens: ${normalTens.toString()}`);
console.log(`Hunger successes: ${hungerSuccesses.toString()}`);
console.log(`Hunger tens: ${hungerTens.toString()}`);
console.log(`Hunger failures: ${hungerFailures.toString()}`);

const criticals = Math.floor((normalTens.length + hungerTens.length) / 2);
let messyCritical = false;

// Check for criticals or messy criticals (messy criticals: a critical happens with at least 1 ten on a hunger die)
if (normalTens.length > 0 || hungerTens.length > 0) {
    if (criticals === 1 && hungerTens.length === 0) {
        console.log(`You have one critical success, with a bonus of ${criticals * 2} successes.`);
    } else if (criticals === 1 && hungerTens.length > 0) {
        messyCritical = true;
        console.log(`You have one critical success, with a bonus of ${criticals * 2} successes.`);
    } else if (criticals > 1 && hungerTens.length === 0) {
        console.log(`You have ${criticals} critical successes, with a bonus of ${criticals * 2} successes.`);
    } else if (criticals > 1 && hungerTens.length > 0) {
        messyCritical = true;
        console.log(`You have ${criticals} critical successes, with a bonus of ${criticals * 2} successes.`);
    };
};
// criticals must actually be multiplied by 2 in the end!

// check total amount of successes
const finalSuccesses = normalSuccesses.length + normalTens.length + hungerSuccesses.length + hungerTens.length + criticals * 2;

// check for bestial failure (no successes at all and at least 1 hunger die came out as 1)
if (finalSuccesses < difficulty && hungerFailures.length > 0) {
    if (finalSuccesses === 1) {
        console.log(`You have scored ${finalSuccesses} total success. You have a bestial failure.`);
    } else if (finalSuccesses > 1) {
        console.log(`You have scored ${finalSuccesses} total successes. You have a bestial failure.`);
    } else if (finalSuccesses === 0) {
        console.log(`You have scored no successes. You have a bestial failure.`);
    };
};

// Check for failure (no successes at all)
if (finalSuccesses < difficulty && hungerFailures.length === 0) {
    if (finalSuccesses === 1) {
        console.log(`You have scored ${finalSuccesses} total success. You fail the roll.`);
    } else if (finalSuccesses > 1) {
        console.log(`You have scored ${finalSuccesses} total successes. You fail the roll.`);
    } else if (finalSuccesses === 0) {
        console.log(`You have scored no successes. You fail the roll.`);
    };
};

// Check for final success and note messy critical if present
if (finalSuccesses >= difficulty && messyCritical === false) {
    if (finalSuccesses === 1) {
        console.log(`You have scored ${finalSuccesses} total success. You pass the roll.`);
    } else if (finalSuccesses > 1) {
        console.log(`You have scored ${finalSuccesses} total successes. You pass the roll.`);
    };
};

if (finalSuccesses >= difficulty && messyCritical) {
    if (finalSuccesses === 1) {
        console.log(`You have scored ${finalSuccesses} total success. You pass the roll with a messy critical.`);
    } else if (finalSuccesses > 1) {
        console.log(`You have scored ${finalSuccesses} total successes. You pass the roll with a messy critical.`);
    };
};
