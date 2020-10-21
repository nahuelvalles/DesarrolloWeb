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
                            <h6 id="totalUnitario`+ i + `">Total:` + totalPrice + ` UYU</h6> 
                        </div>
                    </div>
                </div>
            `
                document.getElementById("subTotal").innerHTML = subTotal + " " + "UYU";
                let totalCost = (subTotal * formulario.value) / 100;
                sendCostHTML.innerHTML = totalCost + " UYU"
                totalCostHTML.innerHTML = subTotal + totalCost + " UYU";

            }
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
        let purchaseButton = document.getElementById("purchaseButton");
        let purchaseInformation = document.getElementById("purchaseInformation");
        purchaseButton.addEventListener("click", function () {
            purchaseInformation.innerHTML = `
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">¡El paso final!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form method="GET">
                      <input type="radio" id="VISA" name="creditCard" value="VISA" required>
                      <label for="visa">VISA</label><br>
                      <input type="radio" id="masterCard" name="creditCard" value="MasterCard">
                      <label for="masterCard"> MasterCard </label><br>
                      <input type="text" placeholder="Nº de Tarjeta" pattern="\\d{13}|\\d{16}" name="cardNumber" required>
                      <input minlength="3" maxlength="3" size="5" type="text" placeholder="CVV" name="cardCVV" required>
                      <input minlength="1" maxlength="2" size="5" type="number" placeholder="Mes" min="1" max="12" name="month"
                        required>
                      <input minlength="4" maxlength="4" size="5" type="text" placeholder="Año" pattern="202([0-9])" name="year"
                        required>
                      <hr>
                      <input type="radio" id="" name="transfer" value="True">
                      <label for="transfer">Prefiero hacer una transferencia...</label>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Aceptar</button>
                    </form>
                  </div>
                </div>
              </div>
            `
        })
    })
});