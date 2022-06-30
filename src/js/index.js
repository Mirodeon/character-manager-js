const getList = () => {
    let popup = document.getElementById('popup');
    popup.innerHTML = ``;
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
    flipCard();
    let cardAdd = document.createElement('article');
    listSection.append(cardAdd);
    listSection.lastChild.classList.add(`addController`, `listCard`);
    listSection.lastChild.innerHTML = `<div class="container-img__cardAdd">
    <img class="img__cardAdd" src="${getImageUrl("addCard")}">
    </div>`;
    addBtn();
    profileBtn(data);
};

const inputKey = () => {
    document.getElementById('name').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            let inputName = document.getElementById('name').value;
            let url = `https://character-database.becode.xyz/characters?name=${inputName}`;
            axios({
                method: 'get',
                url: url,
            })
                .then(response => {
                    console.log(response.data);
                    characterList(response.data);
                })
                .catch(error => {
                    console.log('Noob!', error);
                });
        };
    });
    document.getElementById('id').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            let inputId = document.getElementById('id').value;
            let url = `https://character-database.becode.xyz/characters/${inputId}`;
            axios({
                method: 'get',
                url: url,
            })
                .then(response => {
                    console.log(response.data);
                    characterList(response.data);
                })
                .catch(error => {
                    console.log('Noob!', error);
                });
        };
    });
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

const delBtn = (data, i) => {
    let delBtns = document.querySelector('.delBtn');
    delBtns.addEventListener('click', () => {
        delPopup(data, i);
    });
};

const delPopup = (data, i) => {
    let popup = document.getElementById('popup');
    popup.innerHTML = `<article class="popupDel">
    <p class="txt__popupDel">Are you sure?</p>
    <div class="container-btn__popupDel">
    <btn class="btn__popupDel noBtn">NO</btn>
    <btn class="btn__popupDel yesBtn">YES</btn>
    </div>
    </article>`;
    let noBtns = document.querySelector('.noBtn');
    noBtns.addEventListener('click', () => {
        popup.innerHTML = ``;
    });
    let yesBtns = document.querySelector('.yesBtn');
    yesBtns.addEventListener('click', () => {
        axios({
            method: 'delete',
            url: `https://character-database.becode.xyz/characters/${data[i].id}`,
        })
            .then(response => {
                console.log(response);
                getList();
            })
            .catch(error => {
                console.log('Noob!', error);
            });
    });
};

const newCharacter = () => {
    let url = 'https://character-database.becode.xyz/characters';
    let name = document.getElementById(`formName`).value;
    let description = document.getElementById('formDescription').value;
    let shortDescription = document.getElementById('formShortDescription').value;
    let avatar = document.getElementById('output').src;
    let dataImg = avatar.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
    var character = {
        description: description,
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
        .then(response => {
            console.log(response);
            getList();
        })
        .catch(error => {
            console.log('Noob!', error);
        });
};

const viewImgFormat = () => {

    let status = document.getElementById('status');
    let output = document.getElementById('output');
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
    };
};

const addForm = () => {
    let popup = document.getElementById('popup');
    popup.innerHTML = ``;
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = `<article class="addProfile__article">
    <div class="container-pictural__addProfile">
    <div class="container-img__addProfile">
    <div class="container-inputImg__edit">
    <input class="inputImg__add" type="file" id="formAvatar" name="avatar" accept="image/png, image/jpeg">
    <p id="status"></p>
    <div class="container-img__add"><img class="img__add" id="output"></div>
    </div>
    </div>
    <div class="container-btn__addProfile">
    <btn class="btn__profile quitBtn">QUIT</btn>
    <btn class="btn__profile submitBtn">SEND</btn>
    </div>
    </div>
    <div class="container-txt__addProfile">
    <input type="text" id="formName" name="name" placeholder="name">
    <textarea type="text" id="formShortDescription" name="shortDescription" placeholder="Short description"></textarea>
    <textarea type="text" id="formDescription" name="description" placeholder="Description"></textarea>
    </div></article>`;
    viewImgFormat();
    document.querySelector('.submitBtn').addEventListener('click', newCharacter);
    document.querySelector('.quitBtn').addEventListener('click', getList);
};

const profileCharacter = (data, i) => {
    let listSection = document.querySelector('#listCharacter');
    listSection.innerHTML = `<article class="profile__article">
    <div class="container-pictural__profile">
    <div class="container-img__profile">
    <img class="img__profile" src="data:image/png;base64,${data[i].image}">
    <div class="container-inputImg__edit">
    <input class="inputImg__edit" type="file" id="formAvatar" name="avatar" accept="image/png, image/jpeg">
    <p id="status"></p>
    <div class="container-img__edit"><img class="img__edit" id="output"></div>
    </div>
    </div>
    <div class="container-btn__profile">
    <btn class="btn__profile editorBtn">EDIT</btn>
    <btn class="btn__profile delBtn">DEL</btn>
    <btn class="btn__profile cancelBtn">QUIT</btn>
    <btn class="btn__profile sendBtn">SEND</btn>
    </div>
    </div>
    <div class="container-txt__profile">
    <h1 class="title__profile">${data[i].name}</h1>
    <div class="txt__profile">${converterMd(data[i].description)}</div>
    <input type="text" id="editName" name="name" placeholder="${data[i].name}">
    <textarea type="text" id="editShortDescription" name="shortDescription" placeholder="${data[i].shortDescription}"></textarea>
    <textarea type="text" id="editDescription" name="description" placeholder="${data[i].description}"></textarea>
    </div></article>`;
    delBtn(data, i);
    editBtn();
    sendBtn(data, i);
};

const sendBtn = (data, i) => {
    let sendBtns = document.querySelector('.sendBtn');
    let url = `https://character-database.becode.xyz/characters/${data[i].id}`;
    viewImgFormat();
    sendBtns.addEventListener('click', () => {
        let name = document.getElementById(`editName`).value;
        let description = document.getElementById('editDescription').value;
        let shortDescription = document.getElementById('editShortDescription').value;
        let avatar = document.getElementById('output').src;
        let dataImg = avatar.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
        if (name == "") {
            name = data[i].name;
        };
        if (shortDescription == "") {
            shortDescription = data[i].shortDescription;
        };
        if (description == "") {
            description = data[i].description;
        };
        if (avatar == "") {
            dataImg = data[i].image;
        };
        var character = {
            description: description,
            image: dataImg,
            name: name,
            shortDescription: shortDescription
        };
        axios({
            method: 'put',
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
    });
};

const editBtn = () => {
    let editBtns = document.querySelector('.editorBtn');
    let quitBtns = document.querySelector('.cancelBtn');
    let containerBtn = document.querySelector('.container-btn__profile');
    let containerTxt = document.querySelector('.container-txt__profile');
    let containerImg = document.querySelector('.container-img__profile');
    editBtns.addEventListener('click', () => {
        let popup = document.getElementById('popup');
        popup.innerHTML = ``;
        flip(containerBtn);
        flip(containerTxt);
        flip(containerImg);
    });
    quitBtns.addEventListener('click', () => {
        flip(containerBtn);
        flip(containerTxt);
        flip(containerImg);
    });
};

const profilEditor = () => {
    viewImgFormat();
};

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
            } else {
                cards[i].classList.add('active');
            }
        });
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
    getList();
    listBtn();
    inputKey();
};
appInit();