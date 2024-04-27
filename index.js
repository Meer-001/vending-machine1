#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let machineState = "inactive";
let coinInserted = 0;
let selectedProduct;
const allProduct = [
    { name: "Soda", price: 10, inventory: 5 },
    { name: "Chips", price: 5, inventory: 3 },
    { name: "Candies", price: 2, inventory: 10 },
];
let userAction;
let keepLooping = true;
while (keepLooping) {
    userAction = await inquirer.prompt({
        name: "action",
        type: "list",
        choices: ["Insert Coin", "Select Product", "Dispense Item", "Exit"],
        message: "Select one operation from the following to perform action!",
    });
    if (userAction?.action === "Insert Coin") {
        userAction.action = "Insert Coin";
        const coin = await inquirer.prompt({
            name: "coin",
            type: "list",
            choices: ["1", "5", "10"],
            message: "Insert coin!",
        });
        coinInserted += parseInt(coin.coin);
        console.log(`Coin inserted: ${coinInserted}`);
    }
    else if (userAction?.action === "Select Product") {
        userAction.action = "Select Product";
        const productSelection = await inquirer.prompt({
            name: "product",
            type: "list",
            choices: allProduct.map((product) => product.name),
            message: "Select a product!",
        });
        selectedProduct = allProduct.find((product) => product.name === productSelection.product);
        if (selectedProduct) {
            console.log(`You selected: ${selectedProduct.name}`);
        }
        else {
            console.log(chalk.red("Product not found!"));
        }
    }
    else if (userAction?.action === "Dispense Item") {
        userAction.action = "Dispense Item";
        if (selectedProduct && coinInserted >= selectedProduct.price) {
            coinInserted -= selectedProduct.price;
            selectedProduct.inventory--;
            console.log(chalk.green(`Enjoy your ${selectedProduct.name}!`));
            console.log(`Coin inserted: ${coinInserted}`);
        }
        else {
            console.log(chalk.red("Insufficient coins or product out of stock!"));
        }
    }
    else if (userAction?.action === "Exit") {
        keepLooping = false;
    }
    ;
}
;
console.log(chalk.bold("Thanks for using the vending machine!", "\n") + chalk.bgRed("Developed By: Ahmer Shaikh"));
