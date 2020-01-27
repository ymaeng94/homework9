const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);




function promptUser() {
  return inquirer.prompt([
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
    },
    {
        type: "input",
        message: 'What is your bio?',
        name: 'bio',
    },
    {
        type: "input",
        message: 'Where are you from?',
        name: 'location',
    },
    {
        type: "input",
        message: 'how many do you have follower?',
        name: 'followers',
    },
    {
        type: "input",
        message: 'how many do you follow?',
        name: 'following',
    }
  ]);
}



function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>

  <style>
  @page {
      margin: 0;
    }
   *,
   *::after,
   *::before {
   box-sizing: border-box;
   }
   html, body {
   padding: 0;
   margin: 0;
   }
   html, body, .wrapper {
   height: 100%;
   }
   .wrapper {
   background-color: ${answers.color};
   padding-top: 100px;
   }
   body {
   background-color: white;
   -webkit-print-color-adjust: exact !important;
   font-family: 'Cabin', sans-serif;
   }
   main {
   background-color: #E9EDEE;
   height: auto;
   padding-top: 30px;
   }
   h1, h2, h3, h4, h5, h6 {
   font-family: 'BioRhyme', serif;
   margin: 0;
   }
   h1 {
   font-size: 3em;
   }
   h2 {
   font-size: 2.5em;
   }
   h3 {
   font-size: 2em;
   }
   h4 {
   font-size: 1.5em;
   }
   h5 {
   font-size: 1.3em;
   }
   h6 {
   font-size: 1.2em;
   }
   .photo-header {
   position: relative;
   margin: 0 auto;
   margin-bottom: -50px;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   background-color: ${answers.color};
   color: ${answers.color};
   padding: 10px;
   border-radius: 6px;
   }
   .photo-header img {
   width: 100px;
   height: 50px;
   border-radius: 50%;
   object-fit: cover;
   margin-top: -75px;
   border: 6px solid ${answers.color};
   box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
   }
   .photo-header h1, .photo-header h2 {
   width: 100%;
   text-align: center;
   }
   .photo-header h1 {
   margin-top: 10px;
   }
   .links-nav {
   width: 100%;
   text-align: center;
   padding: 20px 0;
   font-size: 1.1em;
   }
   .nav-link {
   display: inline-block;
   margin: 5px 10px;
   }
   .workExp-date {
   font-style: italic;
   font-size: .7em;
   text-align: right;
   margin-top: 10px;
   }
   .container {
   padding: 50px;
   padding-left: 100px;
   padding-right: 100px;
   }
   .row {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     margin-top: 20px;
     margin-bottom: 20px;
   }
   .card {
     padding: 20px;
     border-radius: 6px;
     background-color: ${answers.color};
     color: ${answers.color};
     margin: 20px;
   }
   .col {
   flex: 1;
   text-align: center;
   }
   a, a:hover {
   text-decoration: none;
   color: inherit;
   font-weight: bold;
   }
   @media print { 
    body { 
      zoom: .75; 
    } 
   }
</style>


</head>
<body>
  <header>
    <div class="head">
      <div class="profile-picture">
        <img src="profilePic2.jpeg"><br>
        <h1>Hello!</h1>
        <h2>My name is Yurim Maeng</h2>
        <h3>Currently I am currently working for a logistic company</h3>
        <a class="nav-link" href="https://github.com/${answers.username}">github</a>
      </div>
    </div>
  </header>

<div class="container">

    <div class="row">
      <div class="col">
         <h4>${answers.bio}</h4>
      </div>
    </div>

    <div class="row">
      <div class ="col card">
         <h2> Public repositories:</h2>
         ${answers.Repo} 
      </div>

      <div class="col card">
        <h2> Followers: <h2>
        ${answers.followers}
      </div>
    </div>  

    <div class="row">
      <div class="col card">
        <h2>Stars:</h2>
         4.5
      </div>
      <div class="col card">
      <h2>Following: </h2>
          ${answers.following}
      </div>
    </div>  

</div>    
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });






// var htmlContent = getHTML.generateHTML(answers);
// pdfConverter.create(htmlContent, options).tofile(`./{answers.username}.pdf`, 
// function(err,res){
//     if(err)
//     return console.log(err)
//     writetoFile("userProfile.html", htmlContent);
// });

// // var fs = require('fs')
// var conversion = require("html-to-pdf")();
// conversion({html: ""}, function(err, pdf) {
//   var output = fs.createWriteStream('yurim.pdf')
//   console.log(pdf.logs);
//   console.log(pdf.numberOfPages);
//     // since pdf.stream is a node.js stream you can use it
//     // to save the pdf to a file (like in this example) or to
//     // respond an http request.
//   pdf.stream.pipe(output);
// });