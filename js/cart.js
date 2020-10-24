//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (result) {
        if (result.status == "ok") {

            let cartArticle = result.data.articles;

            let articleName = document.getElementById("cartArticleName");
            let articleCount = document.getElementById("cartArticleCount");
            let articleCost = document.getElementById("cartArticleCost");
            let articleCurrency = document.getElementById("cartArticleCurrency");
            let articleImage = document.getElementById("cartArticleImage");
            let articleContainer = document.getElementById("cartArticleContainer");
            var subTotal = 0;
            var totalPrice1 = 0
            var totalPrice2 = 0
            let formulario = document.getElementById("sendType");
            let sendCostHTML = document.getElementById("comissionText");
            let totalCostHTML = document.getElementById("totalCostText");

            for (let i = 0; i < cartArticle.length; i++) {
                if (cartArticle[i].currency === "USD") {
                    totalPrice = cartArticle[i].unitCost * cartArticle[i].count * 40;
                } else {
                    totalPrice = cartArticle[i].unitCost * cartArticle[i].count;
                }
                subTotal += totalPrice;
                articleContainer.innerHTML += `
                <div class=" list-group-item list-group-item-action">
                <input type="button" class="deleteButton" value="X" id="boton`+ i + `">
                <hr>
                    <div class="row">
                        <div class="col-3">
                            <img src="` + cartArticle[i].src + `" alt="` + cartArticle[i].description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ cartArticle[i].name + `</h4>
                                 <h4>` + cartArticle[i].unitCost + " " + cartArticle[i].currency + ` </h4>
                            </div>
                            <input type="number" min="0" id="cantidadEleccion`+ i + `" value="` + cartArticle[i].count + `">
                            <h6 id="totalUnitario`+ i + `">Total: ` + totalPrice + ` UYU</h6>
                        </div>
                    </div>
                </div>
                `
                document.getElementById("subTotal").innerHTML = subTotal + " " + "UYU";
                let totalCost = (subTotal * formulario.value) / 100;
                sendCostHTML.innerHTML = totalCost + " UYU"
                totalCostHTML.innerHTML = subTotal + totalCost + " UYU";
            }
            //----Método para borrar un artículo----
            for (let i = 0; i < cartArticle.length; i++) {

                let borrar = document.getElementById("boton" + i);
                borrar.addEventListener("click", function () {

                    cartArticle.splice(i, 1);
                    if (cartArticle[0].currency === "USD") {
                        totalPrice1 = cartArticle[0].unitCost * cartArticle[0].count * 40;
                        subTotal = totalPrice1;
                        document.getElementById("subTotal").innerHTML = totalPrice1 + " UYU";
                        let totalCost = (subTotal * formulario.value) / 100;
                        sendCostHTML.innerHTML = totalCost + " UYU"
                        totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

                    } else {
                        totalPrice2 = cartArticle[0].unitCost * cartArticle[0].count;
                        subTotal = totalPrice2;
                        document.getElementById("subTotal").innerHTML = totalPrice2 + " UYU";
                        let totalCost = (subTotal * formulario.value) / 100;
                        sendCostHTML.innerHTML = totalCost + " UYU"
                        totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

                    }

                    articleContainer.innerHTML =
                        `    
                    <div class=" list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + cartArticle[0].src + `" alt="` + cartArticle[0].description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ cartArticle[0].name + `</h4>
                                    <h4>` + cartArticle[0].unitCost + " " + cartArticle[0].currency + ` </h4>
                                </div>
                                <input type="number" min="0" id="cantidadEleccion`+ 0 + `" value="` + cartArticle[0].count + `">
                                <h6 id="totalUnitario`+ 0 + `">Total: ` + totalPrice + ` UYU</h6> 
                            </div>
                        </div>
                    </div>
                    `
                    for (let i = 0; i < cartArticle.length; i++) {
                        const element = cartArticle[i];
                        document.getElementById("cantidadEleccion" + i).addEventListener("change", function () {
                            var cantidadnueva = document.getElementById("cantidadEleccion" + i).value;
                            document.getElementById("totalUnitario" + i).innerHTML = "Total: " + cantidadnueva * element.unitCost + " " + cartArticle[i].currency
                            for (let j = 0; j < cartArticle.length; j++) {
                                const article = cartArticle[j]
                                if (article.currency === "USD") {
                                    totalPrice1 = article.unitCost * document.getElementById("cantidadEleccion" + j).value * 40;
                                    subTotal = totalPrice1;
                                } else {
                                    totalPrice2 = article.unitCost * document.getElementById("cantidadEleccion" + j).value;
                                    subTotal = totalPrice2;
                                }
                            }
                            document.getElementById("subTotal").innerHTML = subTotal + " UYU";

                            let totalCost = (subTotal * formulario.value) / 100;


                            sendCostHTML.innerHTML = totalCost + " UYU"
                            totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

                        })
                    }
                })
            }
            //-----Fin del método para eliminar uno de los artículos----

            for (let i = 0; i < cartArticle.length; i++) {
                const element = cartArticle[i];
                document.getElementById("cantidadEleccion" + i).addEventListener("change", function () {
                    var cantidadnueva = document.getElementById("cantidadEleccion" + i).value;
                    document.getElementById("totalUnitario" + i).innerHTML = "Total: " + cantidadnueva * element.unitCost + " " + cartArticle[i].currency
                    for (let j = 0; j < cartArticle.length; j++) {
                        const article = cartArticle[j]
                        if (article.currency === "USD") {
                            totalPrice1 = article.unitCost * document.getElementById("cantidadEleccion" + j).value * 40;
                        } else {
                            totalPrice2 = article.unitCost * document.getElementById("cantidadEleccion" + j).value;
                        }
                        subTotal = totalPrice1 + totalPrice2;
                    }
                    document.getElementById("subTotal").innerHTML = subTotal + " UYU";

                    let totalCost = (subTotal * formulario.value) / 100;

                    sendCostHTML.innerHTML = totalCost + " UYU"
                    totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

                })
            }
            formulario.addEventListener("change", function () {

                let totalCost = (subTotal * formulario.value) / 100;
                sendCostHTML.innerHTML = totalCost + " UYU"
                totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

            })
        }

        let transferSelected = document.getElementById("transfer");
        let visa = document.getElementById("visa");
        let master = document.getElementById("masterCard");
        let creditCardNumber = document.getElementById("numeroTarjeta");
        let cvv = document.getElementById("cvv");
        let month = document.getElementById("month");
        let year = document.getElementById("year");
        let accountNumber = document.getElementById("accountNumber");

        transferSelected.addEventListener("input", function () {
            creditCardNumber.setAttribute("disabled", "");
            cvv.setAttribute("disabled", "");
            month.setAttribute("disabled", "");
            year.setAttribute("disabled", "");
            accountNumber.removeAttribute("disabled");
        })
        visa.addEventListener("input", function () {
            accountNumber.setAttribute("disabled", "");
            creditCardNumber.removeAttribute("disabled");
            cvv.removeAttribute("disabled");
            month.removeAttribute("disabled");
            year.removeAttribute("disabled");
        })
        master.addEventListener("input", function () {
            accountNumber.setAttribute("disabled", "");
            creditCardNumber.removeAttribute("disabled");
            cvv.removeAttribute("disabled");
            month.removeAttribute("disabled");
            year.removeAttribute("disabled");
        })
    })

    let modalButton = document.getElementById("modalButton");
    modalButton.addEventListener("click", function () {
        sessionStorage.setItem("payMethodComplete", "1");
    })

    let purchaseButton = document.getElementById("makePurchase");
    purchaseButton.addEventListener("click", function (event) {
        event.preventDefault();
        let payMethodComplete = sessionStorage.getItem("payMethodComplete");
        if (payMethodComplete === "1") {
            sessionStorage.setItem("payMethodComplete", "0");
            return true;
        } else {
            alert("Rellena los datos de pago");
            return false;
        }
    })
});