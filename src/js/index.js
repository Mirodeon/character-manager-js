
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
        })
        .catch(error => {
            console.log('Noob !', error);
        });
};

const getName = () => {
    let name = document.getElementById('name').value;
    let url = `https://character-database.becode.xyz/characters[?name=:${name}]`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(`data get by name: ${name}`)
            /*characterList(data);*/
        })
        .catch(error => {
            console.log('Noob !', error);
        });
};

const characterList = (data) => {
    let listSection = document.querySelector('#listCharachter');
    listSection.innerHTML = data
        .map((character, idx) => {
            if (idx < data.length) {
                /*console.log(`add card ${idx+1}`)*/
                return `<div>Pingouin ${idx + 1}: ${character.name}<img src="data:image/png;base64,${character.image}"></div>`;
            }
        })
        .join(' ');
    console.log(`add and join character cards`);
    let cardAdd = document.createElement('div');
    listSection.append(cardAdd);
    listSection.lastChild.innerHTML = `Le dernier Pingouin`;
    console.log(`add last card`);
};

/*const inputBtn = () => {
    document.getElementById('btnList').addEventListener('click', getList);
};*/
const inputKey = () => {
    document.getElementById('name').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            getName();
        }
    });
}

const appInit = () => {
    /*inputBtn();*/
    console.log("bonjour!");
    getList();
    inputKey();
};
appInit();