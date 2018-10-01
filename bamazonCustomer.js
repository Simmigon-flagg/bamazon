var mysql = require("mysql");
var inquirer = require("inquirer");

var customer = [];
var grandtotal = 0;
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
showAllFormattedItems();
function selectMoreItems() {
    inquirer
        .prompt([{
            name: "continue",
            type: "confirm",
            message: "Would you like to continue shopping?"

        }]
        )
        .then(function (answer) {
            if (answer.continue) {
                showAllFormattedItems();
               

            } else {

                console.log("Thanks for shopping with B-amazon!");
                console.log("Your grandtotal: " + grandtotal.toFixed(2));
                connection.end();

            }
        });
}



// UPDATE `bamazon`.`products` SET `product_name`='September ' WHERE `id`='20';
function showAllFormattedItems() {
    var showquery = connection.query("SELECT * FROM bamazon.products;", function (err, results) {
        if (err) throw err;
        // console.table(results);

        for (var i = 0; i < results.length; i++) {

            console.log(results[i].id + ":" + results[i].product_name + " | " + results[i].department_name + " |\tcost " + results[i].price + " |\t" + results[i].quantity);
        }
        console.log("-----------------------------------");
        questions();
    });
}


function questions() {

    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "Which product do you want to buy? Enter an ID!",

        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of the product they would like to buy? Enter a number",

        }]
        )
        .then(function (answer) {
            findProduct(answer.id, answer.quantity);

        });
}

function findProduct(idNumber, numberOfQuantity) {
    // console.log(typeof (idNumber));
    idNumber = parseInt(idNumber);
    // console.log(typeof (idNumber));
    console.log("\n\n");

    connection.query("SELECT * FROM bamazon.products WHERE id = " + idNumber + ";", function (err, results) {
        if (err) throw err;
        //Find product by ID

        for (var i = 0; i < results.length; i++) {
            if (results[i].id === idNumber && results[i].quantity > 0) {
                // console.log(numberOfQuantity <= results[i].quantity);
                if (numberOfQuantity <= results[i].quantity) {

                    var total = results[i].price * numberOfQuantity;
                    var newquantity = results[i].quantity - numberOfQuantity;
                    updateQuantity(idNumber, newquantity);

                    console.log(results[i].id + ":" + results[i].product_name + " | " + results[i].department_name + " |\tcost " + results[i].price + " |\t" + numberOfQuantity);
                    console.log("Your total is " + total + "\n\n");
                    grandtotal += total

                } else {
                    console.log("Sorry, There are only " + results[i].quantity + " " + results[i].product_name + " remaining.");

                }

            } else {
                console.log("Sorry, Insufficient quantity!");
                console.log("\n");
                console.log(results[i].id + ":" + results[i].product_name + " | " + results[i].department_name + " |\tcost " + results[i].price + " |\t" + results[i].quantity);
            }
            var order = {
                id: results[i].id,
                product: results[i].product_name,
                price: results[i].price,
                items: numberOfQuantity,
                total: total,
                grandtotal: grandtotal
            };

            customer.push(order);
            // console.log(customer);
            selectMoreItems();

        }
    });
}
function updateQuantity(itemid, quantityNumber) {

    var showquery = connection.query("UPDATE bamazon.products SET quantity=" + quantityNumber + " WHERE id=" + itemid + ";", function (err, results) {
        if (err) throw err;
    });

}


