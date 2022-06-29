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
                <btn class="btn__listCard profile-btn">PROFILE</btn>
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
    addBtn();
    profileBtn(data);
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
                <btn class="btn__listCard profile-btn">PROFILE</btn>
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
    addBtn();
    profileBtn(data);
};

const listBtn = () => {
    document.querySelector('.resetController').addEventListener('click', getList);
};

const addBtn = () => {
    let addBtns = [...document.querySelectorAll('.addController')];
    addBtns.forEach((button) => {
        button.addEventListener('click', () => {
            addForm();
        });
    });
};

const profileBtn = (data) => {
    let profileBtns = [...document.querySelectorAll('.profile-btn')];
    profileBtns.forEach((button, i) => {
        button.addEventListener('click', () => {
            profileCharacter(data, i);
        });
    });
};


<<<<<<< HEAD
const delTab = (data, i) => {
    console.log(`Bye bye :'c`);
    console.log(data);
    console.log(i);
}; */

const editBtn = () => {
    let editBtns = document.querySelector('.editorBtn');
    editBtns.addEventListener('click', profileEditor);
};
=======
>>>>>>> 9377c689ec602aa4e71cc46e8acea6b8a3addce9

const delBtn = (data, i) => {
    let delBtns = document.querySelector('.delBtn');

    delBtns.addEventListener('click', () => {
        delTab(data, i);
    });

    console.log(`le boutton delete est sur ecoute`);
};

const delTab = (data, i) => {

    console.log(`ceci est la fonction pr delete un character`);
    alert(`${data[i].name} will be delete`)

    axios({
        method: 'delete',
        url: `https://character-database.becode.xyz/characters/${data[i].id}`,
        data: data[i]
    })
        .then(function () {
            console.log(`${data[i].name} has been deleted`);
            getList();
        })
        .catch(function (error) {
            console.log(error.response.data);
        });

    console.log(data[i].id);
};



const inputKey = (data) => {
    document.getElementById('name').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            /*getName();*/
            searchCharacter(data);
        }
    });
};

/* const addForm = () => {
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = `Yay!
    <br>You're here to add some character!
    <br>So incredible!
    <br>Waw!
    <br>Wouhou!
    <br>You'll be famous for that!
    <br>This is a symbolic create button.`;
}; */


const newCharacter = () => {

    console.log('form submited')

    let url = 'https://character-database.becode.xyz/characters';
    let name = document.getElementById(`formName`).value;
    let description = document.getElementById('formDescription').value;
    let shortDescription = document.getElementById('formShortDescription').value;
    let avatar = document.getElementById('output').src;
    let dataImg = avatar.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');

    alert(`the new charrater name is ${name}`);

    var character = {
        description: description,
        //id: "",
        image: dataImg,
        name: name,
        shortDescription: shortDescription
    };

    console.log(character);

    axios({
        method: 'post',
        url: url,
        data: character
    })
        .then(function (response) {
            console.log(response);
            getList();
        })
        .catch(function (error) {
            console.log(error);
        });

    alert(`${character.name}`);
};

const addForm = () => {
    let listSection = document.querySelector('#listCharacter');

    listSection.innerHTML = `
    <input type="file" id="formAvatar" name="avatar" accept="image/png, image/jpeg">
    <input type="text" id="formName" name="name" placeholder="name">
    <input type="text" id="formShortDescription" name="shortDescription" placeholder="Short description">
    <input type="text" id="formDescription" name="description" placeholder="Description">
    <input type="submit" id="submit" value="Submit">
    <p id="status"></p>
    <div><img id="output"></div>`;

<<<<<<< HEAD
    ///// test wysiwyg
    //const wysiwyg = document.querySelector(`input`);

    tinymce.init({
        selector: `input#formDescription`
    });
    /////////
    const viewImgFormat = () => {
        
        const status = document.getElementById('status');
        const output = document.getElementById('output');
            if (window.FileList && window.File && window.FileReader) {
                document.getElementById('formAvatar').addEventListener('change', event => {
                    output.src = '';
                    status.textContent = '';
                    const file = event.target.files[0];
                    if (!file.type) {
                    status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
                    return;
                    }
                    if (!file.type.match('image.*')) {
                    status.textContent = 'Error: The selected file does not appear to be an image.'
                    return;
                    }
                    const reader = new FileReader();
                    reader.addEventListener('load', event => {
                    output.src = event.target.result;
                    });
                    reader.readAsDataURL(file);
                }); 
            }
        };

=======
    const viewImgFormat = () => {

        const status = document.getElementById('status');
        const output = document.getElementById('output');
        if (window.FileList && window.File && window.FileReader) {
            document.getElementById('formAvatar').addEventListener('change', event => {
                output.src = '';
                status.textContent = '';
                const file = event.target.files[0];
                if (!file.type) {
                    status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
                    return;
                }
                if (!file.type.match('image.*')) {
                    status.textContent = 'Error: The selected file does not appear to be an image.'
                    return;
                }
                const reader = new FileReader();
                reader.addEventListener('load', event => {
                    output.src = event.target.result;
                });
                reader.readAsDataURL(file);
            });
        }

    };
>>>>>>> 9377c689ec602aa4e71cc46e8acea6b8a3addce9
    viewImgFormat();

    console.log('form created');

    document.getElementById('submit').addEventListener('click', newCharacter);
};

const profileCharacter = (data, i) => {

    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = `<article class="profile__article">
    <div class="container-pictural__profile">
    <div class="container-img__profile">
    <img class="img__profile" src="data:image/png;base64,${data[i].image}">
    </div>
    <div class="container-btn__profile">
    <btn class="btn__profile editorBtn">EDIT</btn>
    <btn class="btn__profile delBtn">DEL</btn>
    </div>
    </div>
    <div class="container-txt__profile">
    <h1 class="title__profile">${data[i].name}</h1>
    <div class="txt__profile">${converterMd(data[i].description)}</div>
    </div>`;
    delBtn(data, i);
    editBtn();
    console.log(`Voilà la description"${converterMd(data[i].description)}"`);
};

const editBtn = () => {
    let editBtns = document.querySelector('.editorBtn');
    editBtns.addEventListener('click', profilEditor);
};

const profilEditor = () => {
    console.log(`Make Up !!!!!`);
    let containerImg = document.querySelector('.container-img__profile');
    containerImg.addEventListener('click', () => {
        flip(containerImg);
    });
};
//dynamic URL
const getImageUrl = (name) => {
    return new URL(`../../src/img/${name}.png`, import.meta.url).href
};
const flip = (e) => {
    if (e.classList.contains('active')) {
        e.classList.remove('active');
    } else {
        e.classList.add('active');
    }
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
const converterMd = (mdTxt) => {
    try {
        var converter = new showdown.Converter(),
            text = mdTxt,
            html = converter.makeHtml(text);
        return html;
    } catch {
        return;
    }
};

const appInit = () => {
    console.log("bonjour!");
    getList();
    listBtn();
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