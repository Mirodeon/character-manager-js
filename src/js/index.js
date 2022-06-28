
const getList = () => {
    let url = 'https://character-database.becode.xyz/characters';
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .then(data => {
            console.log(data);
            characterList(data);
            inputKey(data);
        })
        .catch(error => {
            console.log('Noob !', error);
        });
};

const characterList = (data) => {
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = data
        .map((character, idx) => {
            if (idx < data.length) {
                return `<article class="listCard">
                <div class="container-img__listCard">
                <img class="img__listCard" src="data:image/png;base64,${character.image}">
                </div>
                <h1 class="title__listCard">${character.name}</h1>
                <p class="txt__listCard">${character.shortDescription}</p>
                <div class="container-btn__listCard">
                <btn class="btn__listCard addController">ADD</btn>
                <btn class="btn__listCard">PROFILE</btn>
                </div>
                </article>`;
            }
        })
        .join(' ');
    console.log(`add and join character cards`);
    flipCard();
    let cardAdd = document.createElement('article');
    listSection.append(cardAdd);
    listSection.lastChild.classList.add(`addController`, `listCard`);
    listSection.lastChild.innerHTML = `<div class="container-img__cardAdd">
    <img class="img__cardAdd" src="${getImageUrl("addCard")}">
    </div>`;
    console.log(`add last card`);
    inputBtn();
};

const searchCharacter = (data) => {
    let inputName = document.getElementById('name').value;
    let i = 0
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = data
        .map((character, idx) => {
            if (character.name == inputName || character.id == inputName) {
                console.log(`add card ${idx + 1}`)
                return `<article class="listCard">
                <div class="container-img__listCard">
                <img class="img__listCard" src="data:image/png;base64,${character.image}">
                </div>
                <h1 class="title__listCard">${character.name}</h1>
                <p class="txt__listCard">${character.shortDescription}</p>
                <div class="container-btn__listCard">
                <btn class="btn__listCard addController">ADD</btn>
                <btn class="btn__listCard">PROFILE</btn>
                </div>
                </article>`;
            } else {
                i++;
                if (i == data.length) {
                    console.log(`doesn't match ${inputName} :c`);
                }
            }
        })
        .join(' ');
    flipCard();
};

const inputBtn = () => {
    document.querySelector('.resetController').addEventListener('click', getList);
    let addBtns = [...document.querySelectorAll('.addController')];
    addBtns.forEach((button, i) => {
        button.addEventListener('click', () => {
            addForm();
        });
    });
};

const inputKey = (data) => {
    document.getElementById('name').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            /*getName();*/
            searchCharacter(data);
        }
    });
};

const addForm = () => {
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = "Addform";
}

//dynamic URL
const getImageUrl = (name) => {
    return new URL(`../../src/img/${name}.png`, import.meta.url).href
};

const flipCard = () => {
    let cards = [...document.querySelectorAll(".listCard")];
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                /*console.log(`show front card ${i + 1}`);*/
            } else {
                cards[i].classList.add('active');
                /*console.log(`show back card ${i + 1}`);*/
            }
        });
        /*console.log(`add eventlistener flip on card ${i + 1}`);*/
    });
};

const appInit = () => {
    console.log("bonjour!");
    getList();
    /*inputKey();*/
};
appInit();

// get by name or id, 'cause error CORS, has been replaced by searchCharacter.
/*const getName = () => {
    let inputName = document.getElementById('name').value;
    let url = `https://character-database.becode.xyz/characters`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(`data get by name or id: ${inputName}`);
            searchCharacter(data);
        })
        .catch(error => {
            console.log('Noob !', error);
        });
};*/