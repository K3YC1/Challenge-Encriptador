const d = document;
const textArea = d.querySelector(".form_input");
const imagenFound = d.querySelector(".resultado_img");
const loaderPunto = d.querySelector(".loader")
const resultadoTitulo = d.querySelector(".resultado_titulo")
const resultadoText = d.querySelector(".resultado_text");
const btnEncriptar = d.querySelector(".form_btn");
const btnDesencriptar = d.querySelectorAll(".form_btn");
const btnCopiar = d.querySelector(".resultado__btn")

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//Funcion para Encriptar
function encriptarmensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                //Reemplazamos la letra por su equivalente encriptado
                encriptada = llaves[j][1];
                //Terminamos el bucle 
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

//Funcion para Desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

//Ocultar Elementos
textArea.addEventListener("input", (e) => {
    imagenFound.style.display = "none";
    loaderPunto.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando Mensaje";
    resultadoText.textContent = "";
})

//Boton Encriptar
btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarmensaje(mensaje);
    resultadoText.textContent = mensajeEncriptado;
    loaderPunto.classList.add("hidden");
    btnCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = " ";
})

btnDesencriptar[1].addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    loaderPunto.classList.add("hidden");
    btnCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "";
})

btnCopiar.addEventListener('click', () => {
    let textoCopiado = resultadoText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        imagenFound.style.display = "block";
        loaderPunto.classList.add("hidden");
        resultadoTitulo.textContent = "El texto se copio";
        btnCopiar.classList.add("hidden");
        resultadoText.textContent = "";

    });
})