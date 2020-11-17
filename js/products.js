const ORDER_ASC_BY_PRICE = "Precios Bajos";
const ORDER_DESC_BY_PRICE = "Precios Altos";
const ORDER_BY_PROD_COUNT = "Mas Relevantes";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            
            htmlContentToAppend+= `
            
            <div class="col-12 col-sm-6 col-md-3">
            <a href="product-info.html?nombre=`+ product.name + `"class="card list-group-item list-group-item-action">
            
                 <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                 <hr>
                 <h4 class="mb-1">`+ product.name + `</h4>
                 <hr>
              <div class="card-body">
              <p class="mb-1">` + product.description + `</p>
              <span class="align-bottom">` + "Vendidos:" + " " + product.soldCount + `</span>
              <hr>
              <h4>` + product.cost + " " + product.currency + ` </h4>
              </div>
            </a>
            </div>
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

const formulario = document.querySelector('#formulario');
const resultado = document.getElementById("cat-list-container");
const filtrar = () => {

    const texto = formulario.value.toLowerCase();
    resultado.innerHTML = '';

    for (let product of currentProductsArray) {
        let nombre = product.name.toLowerCase();
        let descripcion = product.description.toLowerCase();
        if (nombre.indexOf(texto) !== -1 || descripcion.indexOf(texto) !== -1) {

            resultado.innerHTML += `
            <div class="col-12 col-sm-6 col-md-3">
            <a href="product-info.html?nombre=`+ product.name + `"class="card list-group-item list-group-item-action">
            
                 <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                 <hr>
                 <h4 class="mb-1">`+ product.name + `</h4>
                 <hr>
              <div class="card-body">
              <p class="mb-1">` + product.description + `</p>
              <span class="align-bottom">` + "Vendidos:" + " " + product.soldCount + `</span>
              <hr>
              <h4>` + product.cost + " " + product.currency + ` </h4>
              </div>
            </a>
            </div>
            `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML = `<p> No se han encontrado resultados... </p> `
    }
}
formulario.addEventListener('keyup', filtrar);