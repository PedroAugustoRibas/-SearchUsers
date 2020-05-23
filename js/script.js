let inputName = null;
let btnPesquisa =null;

let arrayPeople = [];

let countFoundPeople = null;

let tabListPeople = null;

window.addEventListener('load',()=>{
    inputName = document.querySelector('#search-bar');
    btnPesquisa = document.querySelector('#btn-search');
    tabListPeople = document.querySelector('#tabPeoples');
    countFoundPeople= document.querySelector('#countPeople');

    prevebtFormSubmit();
    insertPeople();
    searchPerson();
});

async function insertPeople(){
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
       if(person.name.startsWith(char)){
        peopleFoundArray.push(person);
        ++count;
       }
    });
    countFoundPeople.textContent = count;
    let listPeopleHtml = '<div>';
    peopleFoundArray.forEach((person)=>{
        const {name,age,picture} = person;

        const html =`
            <div style="display: flex; flex-direction: row; align-items: center;">
                <div> 
                    <img style="border-radius: 50%;width: 50px;height: 50px; margin-right: 10px; margin-left: 10px;" src="${picture}" alt="${name}">
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

const prevebtFormSubmit = ()=>{
    const form = document.querySelector('form');
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
    })
}