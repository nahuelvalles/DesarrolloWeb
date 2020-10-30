let userName = document.getElementById("user");
function loggin(e) {
    e.preventDefault();
    sessionStorage.setItem("visitado", "true");
    localStorage.setItem("user", userName.value);
    window.location.href = 'index.html'
    return true;
}
document.getElementById("formularioLogin").addEventListener("submit", loggin);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});