// Obtener referencias a los elementos del HTML con ayuda de los respectivos id's asignados
const encriptarBtn = document.getElementById('encriptar');
const desencriptarBtn = document.getElementById('desencriptar');
const copiarBtn = document.getElementById('copiar-texto');
let ingreso = document.getElementById("textoEntrada");
let salida = document.getElementById("textoSalida");


//Constante donde se almacenan los datos a intercambiar, ufnciona en ambos sentidos
const sustituciones ={'a':'ai',
                      'e':'enter',
                      'i':'imes',
                      'o':'ober',
                      'u':'ufat'
                      };
//Esta funcion se encarga de poner la animación en la que los textarea giran 360 Grados
function animarTexto(texto, elemento) {
    elemento.innerText = texto;
    elemento.style.display = "block";
    elemento.style.animation = "desplazar 1.5s";

    // Reinicia la animación después de completarse
    setTimeout(() => {
        elemento.style.animation = "";
    }, 1500);
}

// Función para encriptar un mensaje que recibe como parametro un mensaje tipo string
function encriptar(mensaje) {
    
    let mensajeEncriptado = ""; //creamos una variable tipo String
    for (let i = 0; i < mensaje.length; i++) {  // recorremos la longitud del texto que se ingreso al inicio
        let letra = mensaje.charAt(i); //se revisa letra por letra si existe en la constante susticiones
        if (sustituciones[letra]) {
            mensajeEncriptado += sustituciones[letra];  // si existe en sustituciones es reemplazada por el otro valor
        } else {
            mensajeEncriptado += letra; // sino se deja la letra igual
        }
    }
    return mensajeEncriptado; // se devuelve el mensaje ya con los cambios
    
}

//Función para desencriptar un mensaje que recibe como parametro un mensaje tipo string
function desencriptar(mensajeEncriptado) {
    let mensajeDesencriptado = "";
    const invSustituciones = {};
    for (const letra in sustituciones) {
        const sustitucion = sustituciones[letra];
        invSustituciones[sustitucion] = letra;
    }
    let i = 0;
    while (i < mensajeEncriptado.length) {
        let letraDesencriptada = false;
        for (let j = mensajeEncriptado.length - i; j > 0; j--) {
            const sustitucion = mensajeEncriptado.substr(i, j);
            if (invSustituciones[sustitucion]) {
                mensajeDesencriptado += invSustituciones[sustitucion];
                i += sustitucion.length;
                letraDesencriptada = true;
                break;
            }
        }
        if (!letraDesencriptada) {
            mensajeDesencriptado += mensajeEncriptado.charAt(i);
            i++;
        }
    }

    return mensajeDesencriptado;
}

//evento de click al botón "Encriptar"
encriptarBtn.addEventListener('click', () => {
    let mensaje = ingreso.value;
    if (mensaje.trim().length === 0) {
       alert("no se ingreso un mensaje");
    } else {
        let mensajeEncriptado = encriptar(mensaje);
        animarTexto(mensajeEncriptado, salida);
        animarTexto(ingreso, ingreso);
    }
});

// evento de click al botón "Desencriptar"
desencriptarBtn.addEventListener('click', () => {
    let mensaje = ingreso.value;
    if (mensaje.trim().length === 0) {
        alert("no se ingreso un mensaje");
    } else {
        let mensajeEncriptado = ingreso.value;
        let mensajeDesencriptado = desencriptar(mensajeEncriptado);
        animarTexto(mensajeDesencriptado,salida)
        animarTexto(ingreso,ingreso);
    }
});

copiarBtn.addEventListener('click', () => {
    // Selecciona el contenido del textarea
    salida.select();
  
    // Copia el contenido seleccionado al portapapeles
    document.execCommand("copy");
  });



