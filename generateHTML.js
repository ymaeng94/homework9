const fs=require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


var generateHTML = require ("generatehtml");
var pdfConverter = require("htm-pdf");
var htmltopdf = require('htmltopdf');


var pdf = require('html-pdf');
var html = fs.readFileSync('./test/businesscard.html', 'utf8');


let data = {};
let questions = [
    {
        type: "input",
        message: 'What is your github username?',
        name: 'username',
    },
    {
        type: "input",
        message: "what is your favorite color?",
        name: "color",
        type: "list",
        choices: ['green', 'blue','pink', 'red'],
    }
]



function writeFile(fileName, htmlContent )


function int() {
    inquirer
    .prompt(questions)
    .then(function({username, color}){
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios
            .get(queryUrl)
            .then((res)=> {
            console.log(res.data)

                switch (color){
                    case 'green':
                    data.color = 0;
                    break;

                    case 'blue':
                    data.color= 1;
                    break;

                    case 'pink':
                    data.color = 2;
                    break;

                    case 'red':
                    data.color =3;
                    break;
                }

                console.log("chcek the background color")


                const repoNames = res.data.map(function(repo) {
                    return repo.name;
                  });
                


                const repoNamesStr = repoNames.join("\n");
                    fs.writeFile("yurim.pdf", repoNamesStr, function(err) {
                        if (err) {
                        throw err;
                        }
                    console.log(`Saved ${repoNames.length} repos`);
                });
            

            });

        });

}   

        
