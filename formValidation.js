/* --------------------------------
   ELEMENTOS DEL FORMULARIO
-------------------------------- */

// Formulario y botón
const formulario = document.getElementById("form-inscripcion");
const botonEnviar = formulario.querySelector("button[type='submit']");

// Campos del formulario
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const dni = document.getElementById("dni");
const fechaNac = document.getElementById("fecha-nac");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const ciudad = document.getElementById("ciudad");
const cp = document.getElementById("cp");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const objetivos = document.getElementById("objetivos");
const plan = document.getElementById("plan");
const nifFac = document.getElementById("nif-fac");
const dirFac = document.getElementById("dir-fac");
const iban = document.getElementById("iban");

// Consentimientos
const tos = document.getElementById("tos");
const rgpd = document.getElementById("rgpd");

// Condiciones médicas
const condiciones = document.querySelectorAll("input[name='condiciones[]']");
const ninguna = document.querySelector("input[value='ninguna']");

// Array con todos los campos que debemos validar
const campos = [
    nombre, apellidos, dni, fechaNac, email, telefono,
    direccion, ciudad, cp, altura, peso, objetivos,
    plan, nifFac, dirFac, iban
];


/* --------------------------------
   FUNCIONES DE VALIDACIÓN
-------------------------------- */

// Buscar el contenedor de un campo
function buscarContenedor(campo) {
    return campo.closest(".control");
}

// Quitar el mensaje de error de un campo
function quitarError(campo) {
    const contenedor = buscarContenedor(campo);
    const error = contenedor.querySelector(".error-msg");

    if (error) {
        error.remove();
    }

    campo.removeAttribute("aria-invalid");
}

// Mostrar un mensaje de error
function mostrarError(campo, mensaje) {
    quitarError(campo);

    const error = document.createElement("p");
    error.className = "error-msg";
    error.textContent = mensaje;

    buscarContenedor(campo).appendChild(error);
    campo.setAttribute("aria-invalid", "true");
}

// Comprobar que la persona tiene entre 16 y 120 años
function comprobarEdad(fecha) {
    const partes = fecha.split("-");
    const anio = Number(partes[0]);
    const mes = Number(partes[1]);
    const dia = Number(partes[2]);

    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;

    if (hoy.getMonth() + 1 < mes) {
        edad--;
    } else if (hoy.getMonth() + 1 === mes) {
        if (hoy.getDate() < dia) {
            edad--;
        }
    }

    return edad >= 16 && edad <= 120;
}

// Validar un campo individual
function validarCampo(campo) {
    quitarError(campo);

    // Comprobar si está vacío y es obligatorio
    if (campo.required && campo.value.trim() === "") {
        mostrarError(campo, "Este campo es obligatorio.");
        return false;
    }

    // Comprobar las restricciones del HTML
    if (campo.value !== "" && campo.checkValidity() === false) {
        mostrarError(campo, "El valor introducido no es válido.");
        return false;
    }

    // Comprobar la edad
    if (campo.id === "fecha-nac" && campo.value !== "") {
        if (comprobarEdad(campo.value) === false) {
            mostrarError(campo, "Debes tener entre 16 y 120 años.");
            return false;
        }
    }

    return true;
}

// Comprobar las condiciones médicas
function validarCondiciones() {
    let otrasSeleccionadas = false;

    condiciones.forEach(function(campo) {
        if (campo.value !== "ninguna" && campo.checked) {
            otrasSeleccionadas = true;
        }
    });

    const contenedor = ninguna.closest(".chips");
    const errorAnterior = contenedor.querySelector(".error-msg");

    if (errorAnterior) {
        errorAnterior.remove();
    }

    ninguna.removeAttribute("aria-invalid");

    // No se puede marcar Ninguna junto con otra condición
    if (ninguna.checked && otrasSeleccionadas) {
        const error = document.createElement("p");
        error.className = "error-msg";
        error.textContent = "No puedes seleccionar Ninguna junto a otras condiciones.";

        contenedor.appendChild(error);
        ninguna.setAttribute("aria-invalid", "true");

        return false;
    }

    return true;
}

// Comprobar que se han aceptado los consentimientos
function validarConsentimientos() {
    let correcto = true;

    if (tos.checked === false) {
        correcto = false;
    }

    if (rgpd.checked === false) {
        correcto = false;
    }

    return correcto;
}


/* --------------------------------
   COMPROBAR TODO EL FORMULARIO
-------------------------------- */

// Comprobar todos los campos y las condiciones
function comprobarFormulario() {
    let correcto = true;

    campos.forEach(function(campo) {
        if (campo.checkValidity() === false) {
            correcto = false;
        }

        if (campo.id === "fecha-nac" && campo.value !== "") {
            if (comprobarEdad(campo.value) === false) {
                correcto = false;
            }
        }
    });

    if (validarCondiciones() === false) {
        correcto = false;
    }

    if (validarConsentimientos() === false) {
        correcto = false;
    }

    return correcto;
}

// Activar o desactivar el botón de enviar
function actualizarBoton() {
    if (comprobarFormulario()) {
        botonEnviar.disabled = false;
        botonEnviar.setAttribute("aria-disabled", "false");
    } else {
        botonEnviar.disabled = true;
        botonEnviar.setAttribute("aria-disabled", "true");
    }
}


/* --------------------------------
   EVENTOS DEL FORMULARIO
-------------------------------- */

// Validar los campos al escribir, cambiar o salir de ellos
campos.forEach(function(campo) {

    campo.addEventListener("blur", function() {
        validarCampo(campo);
        actualizarBoton();
    });

    campo.addEventListener("input", function() {
        validarCampo(campo);
        actualizarBoton();
    });

    campo.addEventListener("change", function() {
        validarCampo(campo);
        actualizarBoton();
    });

});

// Validar las condiciones médicas al seleccionarlas
condiciones.forEach(function(campo) {
    campo.addEventListener("change", function() {
        validarCondiciones();
        actualizarBoton();
    });
});

// Actualizar el botón al aceptar los consentimientos
tos.addEventListener("change", actualizarBoton);
rgpd.addEventListener("change", actualizarBoton);


/* --------------------------------
   ENVÍO DEL FORMULARIO
-------------------------------- */

formulario.addEventListener("submit", function(event) {

    // Evitar que se envíe el formulario directamente
    event.preventDefault();

    let correcto = true;

    // Validar todos los campos
    campos.forEach(function(campo) {
        if (validarCampo(campo) === false) {
            correcto = false;
        }
    });

    // Validar condiciones y consentimientos
    if (validarCondiciones() === false) {
        correcto = false;
    }

    if (validarConsentimientos() === false) {
        correcto = false;
    }

    // Mostrar el resultado
    if (correcto) {
        alert("¡Formulario validado correctamente!");
    } else {
        actualizarBoton();

        // Llevar el cursor al primer campo incorrecto
        const primerError = formulario.querySelector("[aria-invalid='true']");

        if (primerError) {
            primerError.focus();
        }
    }

});


/* --------------------------------
   LIMPIAR EL FORMULARIO
-------------------------------- */

formulario.addEventListener("reset", function() {

    setTimeout(function() {

        // Eliminar todos los mensajes de error
        document.querySelectorAll(".error-msg").forEach(function(error) {
            error.remove();
        });

        // Quitar las marcas de campos incorrectos
        document.querySelectorAll("[aria-invalid]").forEach(function(campo) {
            campo.removeAttribute("aria-invalid");
        });

        // Desactivar el botón de enviar
        botonEnviar.disabled = true;
        botonEnviar.setAttribute("aria-disabled", "true");

    }, 10);

});

// Comprobar el estado del botón al cargar la página
actualizarBoton();
