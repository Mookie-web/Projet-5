//*****************RECUPERATION ID*****************//
const query = window.location.search;
const urlParams = new URLSearchParams( query );
const id = urlParams.get( "id" );

let button = document.getElementById( "addToCart" );
let colorInput = document.getElementById( "colors" );
let quantity = document.getElementById( "quantity" );
//*****************DECLARATION VARIABLES*****************//
let image = document.getElementsByClassName( "item__img" );
let titlePrice = document.getElementsByClassName( "item__content__titlePrice" );
let descriptionTitle = document.getElementsByClassName( "item__content__description__title" );
let colors = document.getElementById( "colors" );
//*****************AJOUT ELEMENT*****************//
fetch( "http://localhost:3000/api/products/" + id )
    .then( ( getId ) => {
        return getId.json();
    } ).then( ( getProduct ) => {
    let imageElement = document.createElement( "img" );
    imageElement.src = getProduct.imageUrl;
    imageElement.alt = getProduct.altTxt;
    imageElement.id = "productImage";
    image[0].appendChild( imageElement );
    let titleElement = document.getElementById( "title" );
    let price = document.getElementById( "price" );
    let description = document.getElementById( "description" );
    titleElement.innerText = getProduct.name;
    titleElement.id = "productName";
    price.innerText = getProduct.price;
    price.id = "productPrice";
    description.innerText = getProduct.description;
    description.id = "productDescription";
//*****************BOUCLE FOREACH*****************//
    getProduct.colors.forEach( ( getColors ) => {
        let option = document.createElement( "option" );
        option.innerText = `${ getColors }`;
        option.value = `${ getColors }`;
        option.id = "productColors";
        colors.appendChild( option );
    } );
    titlePrice[0].appendChild( titleElement );
    titlePrice[0].appendChild( titleElement );
    descriptionTitle[0].appendChild( description );

} );
button.addEventListener( "click", function () {

//*****************RECUPERATION INFORMATION*****************//
    let color = colorInput.value;
    let quantityValue = parseInt( quantity.value );

    if (quantity.value <= 0 && colorInput.value === "") {
        window.confirm( "Ajouter une quantité et une couleur" );
        // window.location.reload();
    } else if (quantity.value <= 0) {
        window.confirm( "Ajouter une quantité" );
        // window.location.reload();

    } else if (colorInput.value === "") {
        window.confirm( "Ajouter une couleur" );
        // window.location.reload();

        // J'ai rajouter le ELSE  // DEGAGE LES WINDOW RELOAD :D ok

    } else {

        // }else {
        // //     // window.confirm('Produit ajouté au panier vous allez être redirigé vers la page panier')
        // // }

//**********************************************************//
        let productOrder = {
            id:id,
            quantity:quantityValue,
            color:color
        };
        let cart = localStorage.getItem( "basket" );
        console.log( cart );
        let newItem = true;
        if (cart === null) {
            cart = [];
        } else {
            cart = JSON.parse( cart );
        }
        for (let product of cart) {
            if (product.id === productOrder.id && product.color === productOrder.color) {
                product.quantity = product.quantity + quantityValue;
                newItem = false;
            }
        }
        if (newItem === true) {
            cart.push( productOrder );
        }
        alert("Produit ajouté au panier")
        localStorage.setItem( "basket", JSON.stringify( cart ) );
// FERMETURE DU ELSE
    }
} );
