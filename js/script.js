let inputName = null;
let btnPesquisa =null;

let arrayPeople = [];

let countFoundPeople = null;

let tabListPeople = null;
let tabSumaryPeople = null;
let numberFormat = null;
const prevebtFormSubmit = ()=>{
    const form = document.querySelector('form');
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
    })
}   
window.addEventListener('load',()=>{
    // Inputs
    inputName = document.querySelector('#search-bar');
    btnPesquisa = document.querySelector('#btn-search');
    // Tabs
    tabListPeople = document.querySelector('#tabPeoples');
    tabSumaryPeople = document.querySelector('#tabSumary');
    // Count
    countFoundPeople = document.querySelector('#countPeople');
    numberFormat = Intl.NumberFormat('pt-br',{ minimumFractionDigits: 0, maximumFractionDigits: 2 });

    prevebtFormSubmit();
    getPeopleApi();
    searchPerson();
});

async function getPeopleApi(){
    const data  = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await data.json();
    arrayPeople = json.results.map((person)=>{
        return{
            name: person.name.first+' '+person.name.last ,
            age: person.dob.age,
            picture:person.picture.large,
            gender: person.gender

        };
    });
}

function searchPerson(){
    inputName.addEventListener('keyup',(event)=>{             
        if(event){

            btnPesquisa.disabled = false; 

        }else{
            btnPesquisa.disabled = true;
        }
    });
    btnPesquisa.addEventListener('click',(event)=>{
        renderPeopleList(inputName.value);
    })
}

function renderPeopleList(char){
    const peopleFoundArray = [];
    let count = 0;
    arrayPeople.forEach((person)=>{
        if(char.length>1){   
            if(person.name.includes(char)){
              peopleFoundArray.push(person);
              ++count;
            }
        }else{
            if(person.name.startsWith(char)){
                peopleFoundArray.push(person);
                ++count;
              }
        }
    
    });

    countFoundPeople.textContent = count;
    buildHtmlList(peopleFoundArray)
    renderSumary(peopleFoundArray);
}
function buildHtmlList(peopleFoundArray){
    let listPeopleHtml = '<div>';
    peopleFoundArray.forEach((person)=>{
        const {name,age,picture} = person;

        const html =`
            <div class="person">
                <div> 
                    <img src="${picture}" alt="${name}">
                </div> 
                <div>
                   <ul>
                    <li>${name}, ${age}</li>
                   </ul>
                </div>
                   
            </div>
        `;
        listPeopleHtml += html;
    });
    listPeopleHtml += '</div>';
    tabListPeople.innerHTML = listPeopleHtml;
}


function renderSumary(peopleFoundArray){
    let countMen = 0;
    let countWoman = 0;
    let totalAge = 0;
    let midle = 0;
    peopleFoundArray.forEach((person)=>{    
        if(person.gender ==='female'){
            ++countWoman;
        }else{
            ++countMen;
        }
    });
    totalAge = peopleFoundArray.reduce((acc,curr)=>acc+curr.age,0);    
    midle =FormatNumber(totalAge/(countMen+countWoman)) ;
   
    buildSumaryHtml(countWoman,countMen,totalAge,midle);
}

function buildSumaryHtml(countWoman,countMen,totalAge,midle){
    let sumaryHtml = '<div>';
    const html =`
            <div>
               <ul>
                <li>${countWoman}</li>
                <li>${countMen}</li>
                <li>${totalAge}</li>
                <li>${midle}</li>
               </ul>
            </div>`;
    sumaryHtml += html;
    sumaryHtml += '</div>';
    tabSumaryPeople.innerHTML = sumaryHtml;
}

function FormatNumber(number){
    return numberFormat.format(number);
}