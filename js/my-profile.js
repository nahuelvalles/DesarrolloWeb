var editButton = document.getElementById("fullfilData");
var formToComplete = document.getElementById("formToComplete");
var showName = document.getElementById("fullName");
var showAge = document.getElementById("userAge");
var showEmail = document.getElementById("userEmail");
var showTlf = document.getElementById("userTlf");
var userData = {
    'user': []
};

//Función que pinta un formulario para editar datos personales del perfil, una vez se presiona el botón "editar".
editButton.addEventListener("click", function () {
    let formHTML = "";
    formHTML =
        `
        <hr>
        <h5> Completa tu información </h5>
        <form id="profileForm" action="#" method="GET">
        <input class="editInformationInput" id="profileName" type="text" name="name" placeholder="Nombre completo" pattern="[a-zA-Z ]{2,254}"  title="El nombre debe contener al menos una letra mayúscula y una minúscula" required>
        <input class="editInformationInput" id="profileAge" type="number" name="age" placeholder="Edad" min="18" max="100" title="1 o 2 dígitos">
        <input class="editInformationInput" id="profileEmail" type="mail" name="email" placeholder="e-Mail"  title="ej. nombre@dominio.com" required>
        <input class="editInformationInput" id="profileTlf" type="text" name="tlfNumber" placeholder="Número de teléfono" pattern="[0-9]{9}" title="9 dígitos sin espacios" required>
        <input class="editInformationInput" value="Guardar" type="submit">
        </form>
    `
    formToComplete.innerHTML = formHTML;

    var profileName = document.getElementById("profileName");
    var profileAge = document.getElementById("profileAge");
    var profileEmail = document.getElementById("profileEmail");
    var profileTlf = document.getElementById("profileTlf");
    var formID = document.getElementById("profileForm");

    // Funcion que guarda los datos de los input del form, en el sessionStorage.
    formID.addEventListener("submit", function () {

        userData.user.push({ 'name': profileName.value, 'age': profileAge.value, 'email': profileEmail.value, 'tlf': profileTlf.value });
        localStorage.setItem("userData", JSON.stringify(userData));
        var retakeData = JSON.parse(localStorage.getItem("userData"));

        document.getElementById("fullName").innerHTML = 'Nombre: ' + retakeData.user[0].name;
        document.getElementById("userAge").innerHTML = 'Edad: ' + retakeData.user[0].age;
        document.getElementById("userEmail").innerHTML = 'e-Mail: ' + retakeData.user[0].email;
        document.getElementById("userTlf").innerHTML = 'Tlf: ' + retakeData.user[0].tlf;

    })

})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    const recentImageDataURL = localStorage.getItem("recent-image");
    if (recentImageDataURL) {
        document.querySelector("#previewImage").setAttribute("src", recentImageDataURL);
    }

});
//Funcion que crea reader y una vez que la imagen este cargada la guarda en el local storage
//luego de seleccionar el archivo
document.querySelector("#myFileInput").addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    window.location.reload();

});

var retakeData = JSON.parse(localStorage.getItem("userData"));

showName.innerHTML = 'Nombre: ' + retakeData.user[0].name;
showAge.innerHTML = 'Edad: ' + retakeData.user[0].age;
showEmail.innerHTML = 'e-Mail: ' + retakeData.user[0].email;
showTlf.innerHTML = 'Tlf: ' + retakeData.user[0].tlf;