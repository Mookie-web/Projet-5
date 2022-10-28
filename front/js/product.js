//*****************RECUPERATION ID*****************//

// STEP  1 : Récupérer l'id courant ( produit.html?id=XXXXXX

const urlParams = new URLSearchParams(query);

const query = window.location.search;

const id = urlParams.get('id')
// console.log(id);

//*****************DECLARATION VARIABLES*****************//

let image = document.getElementsByClassName('item__img');
let titlePrice = document.getElementsByClassName('item__content__titlePrice');
let descriptionTitle = document.getElementsByClassName('item__content__description__title');
let colors = document.getElementById('colors');

//*****************AJOUT ELEMENT*****************//

// STEP 2 : Récupérer les infos du produit (via l'id) depuis l'API

fetch('http://localhost:3000/api/products/' + id)  // fetch("http://localhost:3000/api/products/XXXXX")
    .then((getId) =>{
        // console.log(getId);  // Vérifier le retour de l'api via un console.log
        return getId.json();
    }).then((getProduct)=> {
    console.log(getProduct);

// STEP 3 : Afficher les infos du produit dans le DOM

    let imageElement = document.createElement('img');
    imageElement.src = getProduct.imageUrl;
    imageElement.alt = getProduct.altTxt;
    imageElement.id = 'productImage';
    image[0].appendChild(imageElement);

    let titleElement = document.getElementById('title')
    let price = document.getElementById('price');
    let description = document.getElementById('description');


    titleElement.innerText = getProduct.name;
    titleElement.id = 'productName';

    price.innerText = getProduct.price;
    price.id = 'productPrice';

    description.innerText = getProduct.description;
    description.id ='productDescription';


    getProduct.colors.forEach((getColors) => {

      // console.log(document.createElement('option'));
      let option = document.createElement('option');
      option.innerText = `${getColors}`;
      option.value = `${getColors}`;
      option.id = 'productColors';

      colors.appendChild(option)
    })


    titlePrice[0].appendChild(titleElement);
    titlePrice[0].appendChild(titleElement);
    descriptionTitle[0].appendChild(description);


    })








