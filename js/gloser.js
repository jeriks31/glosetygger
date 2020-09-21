let inpLang1 = document.getElementById("inpLang1");
let inpLang2 = document.getElementById("inpLang2");
let outGloseDisplay = document.getElementById("outGloseDisplay");
let windowEdit = document.getElementById("windowEdit");
let windowTest = document.getElementById("windowTest");
let outGloseTest = document.getElementById("outGloseTest");

let gloseliste = {
    navn:null,
    lang1:null,
    lang2:null,
    gloser:[]
};

function addGlose(){
    if(inpLang1.value && inpLang2.value){
        gloseliste.gloser.push([inpLang1.value, inpLang2.value]);
        updateLocalStorage();
        updateGloseDisplay();
    }else{
        alert("Vennligst skriv inn en glose før du trykker på knappen");
    }
}

function fjernGlose(index){
    gloseliste.gloser.splice(index, 1);
    updateLocalStorage();
    updateGloseDisplay();
}

function updateGloseDisplay(){
    outGloseDisplay.innerHTML = "";
    let index = 0;
    for(let glose of gloseliste.gloser){
        outGloseDisplay.innerHTML += `<tr><td>${glose[0]}</td><td>${glose[1]}</td><td><button onclick="fjernGlose(${index})">Fjern</button></td></tr>`;
        index++;
    }
}

function goToTest(){
    windowEdit.style.display = "none";
    windowTest.style.display = "block";
    startTest();
}

function goToEdit(){
    windowTest.style.display = "none";
    windowEdit.style.display = "block";
    updateGloseDisplay();
}

function sjekkSvar(){
    for(let i=0; i<gloseliste.gloser.length; i++){
        if(gloseliste.gloser[i][1].toLowerCase() == document.getElementById("inpTest"+i).value.toLowerCase()){
            document.getElementById("inpTest"+i).style.borderColor = "green";
        }else{
            document.getElementById("inpTest"+i).style.borderColor = "red";
        }
    }
}

function startTest(){
    outGloseTest.innerHTML = "";
    gloseliste.gloser = shuffle(gloseliste.gloser);
    let index = 0;
    for(let glose of gloseliste.gloser){
        outGloseTest.innerHTML += `<tr><td>${glose[0]}</td><td><input type="text" id="inpTest${index}"></td></tr>`;
        index++;
    }
}

function shuffle(array) {
    let ctr = array.length;
    let temp;
    let index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

function checkLocalStorage(){
    if(localStorage.getItem("gloseliste")){
        gloseliste = JSON.parse(localStorage.getItem("gloseliste"));
    }
}

function updateLocalStorage(){
    localStorage.setItem("gloseliste", JSON.stringify(gloseliste));
}