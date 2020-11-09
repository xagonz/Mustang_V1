/**
 * Author: Xavier Gonzalez
 * Class: Web & Distributed Programming
 * Project: Mustang V1
 * Description: Load and Show contacts in webpage and console that are pulled from an array of jsons.
 * File: index.html
 */

var cURLArray = [];
var cArray = [];
var loadingContact = 0;

// Initializes Website with a greeting in both console and alert.
function initApp() {
    console.log('Mustang Lite - Starting!');
    window.alert("Welcome to Mustang V1! Please click on instructions.") 
}

// Gives user the instructions on how to use Mustang V1
function instructions() {
    window.alert("Load Index: Loads an index of json contacts. \n" +
                "Load Contacts: Loads in individual json contact information. \n" +
                "Log Contacts: Logs each contact in console.");
}

async function loadIndex() {
    // Fetch API using async and await
    const response = await fetch("https://mustang-index.azurewebsites.net/index.json");
    const data = await response.json();

    // Code to display index on webpage
    let output = '<h2>Contacts</h2>';
    output += '<ol>';
    data.forEach(function (dataz) {
        output += `
            <li>
                <b>Name:</b>
                ${dataz.Name}
                <b>Email:</b>
                ${dataz.Email}
                <b>Contact URL:</b>
                ${dataz.ContactURL}
            </li>
            <br>
        `;
    });
    output += '</ul>'
    document.getElementById("resp").innerHTML = output;

// Code to display index in console
console.log("Index JSON: ");
for (const d of data) {
    console.log(d);
    cURLArray.push(d.ContactURL);
}
console.log("ContactURLArray: " + JSON.stringify(cURLArray));
}

function loadContacts() {
    for (i = 0; i < cURLArray.length; i++) {
        loadNextContact(cURLArray[i]); 
    }
}

async function loadNextContact(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("Name: " + data.firstName + " URL: " + URL);
    console.log(data);
    cArray.push(data);
    document.getElementById("contactsID").innerHTML += `<b>Name:</b> ${data.firstName} ${data.lastName} <b>Preferred Name:</b> ${data.preferredName} <b>Email:</b> ${data.email}<br>`;
}

function displayIndex(data) {
    document.getElementById("contactsID").innerHTML = data[1].firstname;
}
async function logContacts() {
    console.log(cArray);
}

