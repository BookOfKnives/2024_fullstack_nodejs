const htmlElem = document.getElementById("fakerNameList-p");
let fakerUsers = {};

fetch("/../faker")
.then( (response) => (response.json()) )
//  .then( result => console.log(result.data["1"]))
.then( (result) => ( fakerUsers = {...result.data} ) )
//  .then(fakerUsers => console.log(fakerUsers))
.then(fakerUsers => htmlElem.textContent = fakerUsers[1].name); //this works -- endelig! bracket-notation på objektet for at tilgå objektets navn, det er IKKE et array, det er et JS data objekt.

//fetch(faker) duer ikke, den henter fra localhost.../faker/faker
//fetch ../faker duer... vist heller ikke?
//fetch /../faker duer! it gets the json

//jeg bliver ved med at få object object når jeg forsøger at proppe min json fra Faker ind i teksten.