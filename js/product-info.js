var commentsArray = [];
var productObj = {};
var commentBox = document.getElementById("productComments");
var commentText = document.getElementById("mensaje");
var sendComment = document.getElementById("sendComment");
var codedURL = window.location.search;
let decodedURL = decodeURI(codedURL);

function showRelatedProducts(arrayProductsURL, arrayProductsInfoURL) {
    let htmlContentToAppend = ``;
    for (let i = 0; i < arrayProductsInfoURL.length; i++) {
        let relatedProduct = arrayProductsURL[arrayProductsInfoURL[i]];
        htmlContentToAppend +=
            `
        <div class="card col-3">
            <div class="view overlay">
                <a href="product-info.html?nombre=`+ relatedProduct.name + `"> <img  class="card-img-top" src=` + relatedProduct.imgSrc + `
                alt="Imagen del vehículo"></a>
            </div>
            <div class="card-body">
                <h4 class="card-title">`+ relatedProduct.name + `</h4>
                <p class="card-text">`+ relatedProduct.description + `</p>
            </div>
        </div>
        `
    }
    document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
}
function getCommentJSON() {
    let html = "";
    for (i = 0; i < productObj.length; i++) {
        let comentario = productObj[i];
        let score = comentario.score;
        let comment = comentario.description;
        let container = document.getElementById("commentBox");
        let user = comentario.user;
        let dateAndHour = comentario.dateTime;

        let html = ``;
        html = `<br>
            <hr>
            <p> ` + user + ` </p>
            <p> ` + comment + ` </p>
            <p> ` + dateAndHour + ` </p>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <hr>
            `
        let newCommentContainer = createNode("div");
        newCommentContainer.innerHTML += html;
        var stars = newCommentContainer.getElementsByClassName('fa-star');
        for (let i = 0; i < score; i++) {
            stars[i].classList.add('checked');
        }
        append(container, newCommentContainer);

        html +=
            `
        <p> ` + comentario.user + ` </p>
        <p> ` + comentario.description + ` </p>
        <p> ` + comentario.score + ` </p>
        <p> ` + comentario.dateTime + ` </p>
        `
    }
    document.getElementById("productComments").innerHTML = html;
}

function createNode(element) {
    return document.createElement(element);
};
function append(parent, el) {
    return parent.appendChild(el);
};

//Funcion para obtener el name desde la URL
function getQueryVariable(variable) {
    var query = decodedURL.substring(1);
    var querySp = query.split("=");

    var pair1 = querySp[0];
    var pair2 = querySp[1];

    if (pair1 == variable) {
        return pair2;
    }
    return false;
}
let productNameURL = getQueryVariable("nombre");

//Función que muestra galería de imágenes.
function productImagesCarousel(array) {

    let htmlContentToAppend = `
    <div id="carouselExampleIndicators" class="carousel slide col-8 mt-3 mb-3 align-right" data-ride="carousel">
    <ol class="carousel-indicators">
    `
    for (let i = 0; i < array.length; i++) {
        if (i > 0) {
            htmlContentToAppend += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `"></li>`
        } else {
            htmlContentToAppend += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" class="active"></li>`
        }
    }
    htmlContentToAppend += `
    </ol>
    <div class="carousel-inner">`
    for (let i = 0; i < array.length; i++) {
        let imagen = array[i];
        if (i > 0) {
            htmlContentToAppend += `
        <div class="carousel-item">
          <img src="`+ imagen + `" class="rounded d-block w-100" alt="Imagen de vehículo">
        </div>`
        } else {
            htmlContentToAppend += `
        <div class="carousel-item active">
          <img src="`+ imagen + `" class="rounded d-block w-100" alt="Imagen de vehículo">
        </div>`
        }
    }
    htmlContentToAppend += `</div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>`;

    document.getElementById("productGallery").innerHTML = htmlContentToAppend;

}
//Función que añade un comentario nuevo a la sección de comentarios.
function addComment(e) {
    e.preventDefault();
    let score = document.getElementById("score").value;
    let comment = document.getElementById("mensaje").value;
    let container = document.getElementById("productComments");
    let user = localStorage.getItem("user");
    let todayDate = new Date();
    let actualDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
    let actualHour = todayDate.getHours() + ':' + todayDate.getMinutes() + ':' + todayDate.getSeconds();
    let dateAndHour = actualDate + ` ` + actualHour;

    let html = ``;
    html =
        `
    <p> ` + user + ` </p>
    <p> ` + comment + ` </p>
    <p> ` + dateAndHour + ` </p>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <hr>
    `
    let newCommentContainer = createNode("div");
    newCommentContainer.innerHTML += html;
    var stars = newCommentContainer.getElementsByClassName('fa-star');
    for (let i = 0; i < score; i++) {
        stars[i].classList.add('checked');
    }
    append(container, newCommentContainer);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let producttCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
            let relatedProductsHTML = document.getElementById("relatedProducts");

            productCategoryHTML.innerHTML = product.category;
            productCost.innerHTML = product.cost + " " + product.currency;
            productNameHTML.innerHTML = productNameURL;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de carousel.
            productImagesCarousel(product.images);

            getJSONData(PRODUCTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    let relatedProduct = resultObj.data;
                    showRelatedProducts(relatedProduct, product.relatedProducts);
                }
            })
        }
    });
    //Obtener datos del JSON de la URL especificada e imprimirlos en el HTML.
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status = "ok") {
            productObj = result.data;
            getCommentJSON();
        }
    })
});