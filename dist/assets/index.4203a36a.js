const f=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}};f();var u="/assets/addCard.cd67a536.png";const p=()=>{let e=document.getElementById("popup");e.innerHTML="",fetch("https://character-database.becode.xyz/characters").then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()}).then(r=>{console.log(r),m(r)}).catch(r=>{console.log("Noob !",r)})},m=e=>{let t=document.querySelector("#listCharacter");t.innerHTML=e.map((a,i)=>{if(i<e.length)try{let o=a.name.replace("script>","Je suis un caca qui a \xE9crit du script ici <3"),n=a.shortDescription.replace("script>","Je suis un caca qui a \xE9crit du script ici <3");return`<article class="listCard">
                    <div class="container-img__listCard">
                    <img class="img__listCard" src="data:image/png;base64,${a.image}">
                    </div>
                    <h1 class="title__listCard">${o}</h1>
                    <p class="txt__listCard">${n}</p>
                    <div class="container-btn__listCard">
                    <btn class="btn__listCard addController">ADD</btn>
                    <btn class="btn__listCard profile-btn">PROFILE</btn>
                    </div>
                    </article>`}catch{axios({method:"delete",url:`https://character-database.becode.xyz/characters/${a.id}`}).then(o=>{console.log(o)}).catch(o=>{console.log("Noob!",o)});return}}).join(" "),T();let r=document.createElement("article");t.append(r),t.lastChild.classList.add("addController","listCard"),t.lastChild.innerHTML=`<div class="container-img__cardAdd">
    <img class="img__cardAdd" src="${N("addCard")}">
    </div>`,v(),k(e)},g=()=>{document.getElementById("name").addEventListener("keyup",e=>{if(e.key==="Enter"){let t=document.getElementById("popup");t.innerHTML="";let a=`https://character-database.becode.xyz/characters?name=${document.getElementById("name").value}`;axios({method:"get",url:a}).then(i=>{console.log(i.data),m(i.data)}).catch(i=>{console.log("Noob!",i)})}})},y=()=>{document.getElementById("id").addEventListener("keyup",e=>{if(e.key==="Enter"){let t=document.getElementById("popup");t.innerHTML="";let a=`https://character-database.becode.xyz/characters/${document.getElementById("id").value}`;axios({method:"get",url:a}).then(i=>{console.log(i.data);var o={0:i.data};console.log(o),h(o,0)}).catch(i=>{console.log("Noob!",i)})}})},w=()=>{g(),y()},C=()=>{document.querySelector(".resetController").addEventListener("click",p)},v=()=>{[...document.querySelectorAll(".addController")].forEach(t=>{t.addEventListener("click",()=>{P()})})},k=e=>{[...document.querySelectorAll(".profile-btn")].forEach((r,a)=>{r.addEventListener("click",()=>{h(e,a)})})},B=(e,t)=>{document.querySelector(".delBtn").addEventListener("click",()=>{s(),D(e,t)})},s=()=>{let e=document.getElementById("popup");e.innerHTML=`<article class="popupDel">
    <p class="txt__popupDel">Are you sure?</p>
    <div class="container-btn__popupDel">
    <btn class="btn__popupDel noBtn">NO</btn>
    <btn class="btn__popupDel yesBtn">YES</btn>
    </div>
    </article>`,document.querySelector(".noBtn").addEventListener("click",()=>{e.innerHTML=""})},D=(e,t)=>{document.querySelector(".yesBtn").addEventListener("click",()=>{axios({method:"delete",url:`https://character-database.becode.xyz/characters/${e[t].id}`}).then(a=>{console.log(a),p()}).catch(a=>{console.log("Noob!",a)})})},E=()=>{let e="https://character-database.becode.xyz/characters",t=document.getElementById("formName").value,r=document.getElementById("formDescription").value,a=document.getElementById("formShortDescription").value,o=document.getElementById("output").src.replace("data:image/png;base64,","").replace("data:image/jpeg;base64,","");var n={description:r,image:o,name:t,shortDescription:a};console.log(n),axios({method:"post",url:e,data:n}).then(d=>{console.log(d),p()}).catch(d=>{console.log("Noob!",d)})},x=()=>{let e=document.getElementById("status"),t=document.getElementById("output");window.FileList&&window.File&&window.FileReader&&document.getElementById("formAvatar").addEventListener("change",r=>{t.src="",e.textContent="";const a=r.target.files[0];if(!a.type){e.textContent="Error: The File.type property does not appear to be supported on this browser.";return}if(!a.type.match("image.*")){e.textContent="Error: The selected file does not appear to be an image.";return}const i=new FileReader;i.addEventListener("load",o=>{t.src=o.target.result}),i.readAsDataURL(a)})},P=()=>{let e=document.getElementById("popup");e.innerHTML="";let t=document.querySelector("#listCharacter");t.innerHTML=`<article class="addProfile__article">
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
    </div></article>`,x(),z(),document.querySelector(".quitBtn").addEventListener("click",p)},z=()=>{document.querySelector(".submitBtn").addEventListener("click",()=>{s(),I()})},I=()=>{document.querySelector(".yesBtn").addEventListener("click",()=>{E()})},h=(e,t)=>{let r=e[t].name.replace("script>","Je suis un caca qui a \xE9crit du script ici <3"),a=e[t].description.replace("script>","Je suis un caca qui a \xE9crit du script ici <3"),i=document.querySelector("#listCharacter");i.innerHTML=`<article class="profile__article">
    <div class="container-pictural__profile">
    <div class="container-img__profile">
    <img class="img__profile" src="data:image/png;base64,${e[t].image}">
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
    <h1 class="title__profile">${r}</h1>
    <div class="txt__profile">${j(a)}</div>
    <input type="text" id="editName" name="name" placeholder="${e[t].name}">
    <textarea type="text" id="editShortDescription" name="shortDescription" placeholder="${e[t].shortDescription}"></textarea>
    <textarea type="text" id="editDescription" name="description" placeholder="${e[t].description}"></textarea>
    </div></article>`,B(e,t),S(),L(e,t)},L=(e,t)=>{let r=document.querySelector(".sendBtn");x(),r.addEventListener("click",()=>{s(),q(e,t)})},q=(e,t)=>{document.querySelector(".yesBtn").addEventListener("click",()=>{let a=`https://character-database.becode.xyz/characters/${e[t].id}`,i=document.getElementById("editName").value,o=document.getElementById("editDescription").value,n=document.getElementById("editShortDescription").value,d=document.getElementById("output").src,_=d.replace("data:image/png;base64,","").replace("data:image/jpeg;base64,","");i==""&&(i=e[t].name),n==""&&(n=e[t].shortDescription),o==""&&(o=e[t].description),d==""&&(_=e[t].image);var b={description:o,image:_,name:i,shortDescription:n};axios({method:"put",url:a,data:b}).then(c=>{console.log(c),p()}).catch(c=>{console.log(c)})})},S=()=>{let e=document.querySelector(".editorBtn"),t=document.querySelector(".cancelBtn"),r=document.querySelector(".container-btn__profile"),a=document.querySelector(".container-txt__profile"),i=document.querySelector(".container-img__profile");e.addEventListener("click",()=>{let o=document.getElementById("popup");o.innerHTML="",l(r),l(a),l(i)}),t.addEventListener("click",()=>{l(r),l(a),l(i)})},N=e=>new URL({"../../src/img/addCard.png":u}[`../../src/img/${e}.png`],self.location).href,l=e=>{e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")},T=()=>{let e=[...document.querySelectorAll(".listCard")];e.forEach((t,r)=>{t.addEventListener("click",()=>{t.classList.contains("active")?t.classList.remove("active"):e[r].classList.add("active")})})},j=e=>{try{var t=new showdown.Converter,r=e,a=t.makeHtml(r);return a}catch{return}},A=()=>{p(),C(),w()};A();
