let items = document.getElementById("items");

function getProductList() {
    fetch("http://localhost:3000/api/products/")
        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (products) {
            for (let product of products) {
                insertProductDom(product)
            }
        })
        .catch((error) => {
            alert('Impossible de se connecter au serveur, vérifier si le serveur est lancé');

        })
}
getProductList();
//*****************Create tag to dom *****************//
function insertProductDom(product) {

    let anchor = document.createElement('a');
    anchor.href = "./product.html?id=" + product._id;

    let article = document.createElement('article');//
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    let title = document.createElement('h3');
    title.classList.add('productName');
    title.innerHTML = product.name;

    let paraph = document.createElement('p');
    paraph.classList.add('productDescription');
    paraph.innerText = product.description;
    article.appendChild(img);
    article.appendChild(title)
    article.appendChild(paraph)
    anchor.appendChild(article)
    items.appendChild(anchor)
}


