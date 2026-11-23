
// Seleccionamos el formulario.
const formulario = document.getElementById("form-inscripcion");

// Seleccionamos los campos que vamos a validar.
const campos = [
    document.getElementById("nombre"),
    document.getElementById("apellidos"),
    document.getElementById("dni"),
    document.getElementById("fecha-nac"),
    document.getElementById("email"),
    document.getElementById("telefono"),
    document.getElementById("direccion"),
    document.getElementById("ciudad"),
    document.getElementById("cp"),
    document.getElementById("altura"),
    document.getElementById("peso"),
    document.getElementById("objetivos"),
    document.getElementById("plan"),
    document.getElementById("nif-fac"),
    document.getElementById("dir-fac"),
    document.getElementById("iban")
];

// Buscamos el contenedor de cada campo.
function buscarContenedor(campo) {

    return campo.closest(".control") || campo.parentElement;

}

// Mostramos el mensaje de error.
function mostrarError(campo, mensaje) {

    const contenedor = buscarContenedor(campo);

    // Quitamos el mensaje anterior si existe.
    quitarError(campo);

    // Creamos el mensaje.
    const error = document.createElement("p");

    error.className = "error";
    error.textContent = mensaje;

    // Añadimos el mensaje debajo del campo.
    contenedor.appendChild(error);

    // Marcamos el campo como incorrecto.
    campo.setAttribute("aria-invalid", "true");

}

// Eliminamos el mensaje de error.
function quitarError(campo) {

    const contenedor = buscarContenedor(campo);

    const error = contenedor.querySelector(".error");

    if (error) {

        error.remove();

    }

    // Quitamos la marca de error.
    campo.removeAttribute("aria-invalid");

}

// Comprobamos la edad.
function comprobarEdad(campo) {

    const fecha = new Date(campo.value);

    const hoy = new Date();

    // Calculamos la edad.
    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mes = hoy.getMonth() - fecha.getMonth();

    // Ajustamos la edad si todavía no ha cumplido años.
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {

        edad--;

    }

    // Comprobamos que la edad esté entre 16 y 120.
    if (edad < 16 || edad > 120) {

        return false;

    }

    return true;

}

// Comprobamos cada campo.
function validarCampo(campo) {

    quitarError(campo);

    // Si el campo está vacío y es obligatorio.
    if (campo.required && campo.value.trim() === "") {

        mostrarError(campo, "Este campo es obligatorio.");

        return false;

    }

    // Si el campo tiene un patrón o formato incorrecto.
    if (!campo.checkValidity()) {

        let mensaje = "El campo no tiene un formato válido.";

        // Mensajes según el campo.
        switch (campo.id) {

            case "nombre":
                mensaje = "Introduce un nombre válido.";
                break;

            case "apellidos":
                mensaje = "Introduce unos apellidos válidos.";
                break;

            case "dni":
                mensaje = "Introduce un documento válido.";
                break;

            case "email":
                mensaje = "Introduce un correo electrónico válido.";
                break;

            case "telefono":
                mensaje = "Introduce un teléfono válido.";
                break;

            case "direccion":
                mensaje = "Introduce una dirección válida.";
                break;

            case "ciudad":
                mensaje = "Introduce una ciudad válida.";
                break;

            case "cp":
                mensaje = "El código postal debe tener 5 números.";
                break;

            case "altura":
                mensaje = "La altura debe estar entre 140 y 220 cm.";
                break;

            case "peso":
                mensaje = "El peso debe estar entre 35 y 250 kg.";
                break;

            case "objetivos":
                mensaje = "Escribe tus objetivos.";
                break;

            case "plan":
                mensaje = "Selecciona un plan.";
                break;

            case "nif-fac":
                mensaje = "Introduce un NIF válido.";
                break;

            case "dir-fac":
                mensaje = "Introduce una dirección válida.";
                break;

            case "iban":
                mensaje = "Introduce los 4 últimos números.";
                break;

        }

        mostrarError(campo, mensaje);

        return false;

    }

    // Comprobamos la fecha de nacimiento.
    if (campo.id === "fecha-nac") {

        if (!comprobarEdad(campo)) {

            mostrarError(campo, "Debes tener entre 16 y 120 años.");

            return false;

        }

    }

    return true;

}

// Comprobamos que no se seleccionen Ninguna y otras condiciones.
function validarCondiciones() {

    const condiciones = document.querySelectorAll(
        'input[name="condiciones[]"]'
    );

    const ninguna = document.querySelector(
        'input[name="condiciones[]"][value="ninguna"]'
    );

    // Comprobamos si se ha marcado Ninguna.
    if (ninguna.checked) {

        for (let i = 0; i < condiciones.length; i++) {

            if (condiciones[i] !== ninguna && condiciones[i].checked) {

                ninguna.checked = false;

                mostrarError(
                    condiciones[0],
                    "No puedes seleccionar Ninguna junto a otras condiciones."
                );

                return false;

            }

        }

    }

    // Quitamos el mensaje si las selecciones son correctas.
    const contenedor = condiciones[0].closest(".chips");

    const error = contenedor.querySelector(".error");

    if (error) {

        error.remove();

    }

    return true;

}

// Validamos los campos al salir de ellos.
campos.forEach(function(campo) {

    campo.addEventListener("blur", function() {

        validarCampo(campo);

    });

});

// Validamos los campos mientras se escriben.
campos.forEach(function(campo) {

    campo.addEventListener("input", function() {

        validarCampo(campo);

    });

});

// Validamos los campos cuando cambian.
campos.forEach(function(campo) {

    campo.addEventListener("change", function() {

        validarCampo(campo);

    });

});

// Comprobamos las condiciones médicas al seleccionarlas.
const condiciones = document.querySelectorAll(
    'input[name="condiciones[]"]'
);

condiciones.forEach(function(condicion) {

    condicion.addEventListener("change", function() {

        validarCondiciones();

    });

});

// Validamos el formulario al enviarlo.
formulario.addEventListener("submit", function(event) {

    // Evitamos que se envíe automáticamente.
    event.preventDefault();

    let formularioValido = true;

    // Comprobamos todos los campos.
    campos.forEach(function(campo) {

        if (!validarCampo(campo)) {

            formularioValido = false;

        }

    });

    // Comprobamos las condiciones médicas.
    if (!validarCondiciones()) {

        formularioValido = false;

    }

    // Si hay errores, enfocamos el primer campo incorrecto.
    if (!formularioValido) {

        const primerError = formulario.querySelector(
            '[aria-invalid="true"]'
        );

        if (primerError) {

            primerError.focus();

        }

        return;

    }

    // Si todo es correcto.
    alert("¡Formulario validado correctamente!");

});

// Limpiamos los errores al pulsar Limpiar.
formulario.addEventListener("reset", function() {

    campos.forEach(function(campo) {

        quitarError(campo);

    });

    const errores = formulario.querySelectorAll(".error");

    errores.forEach(function(error) {

        error.remove();

    });

});

// --------------------------------------------------
// IMPEDIMOS ESCRIBIR CARACTERES INCORRECTOS
// --------------------------------------------------

// Nombre, apellidos y ciudad: solo letras y caracteres permitidos.
const camposTexto = ["nombre", "apellidos", "ciudad"];

camposTexto.forEach(function(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function() {

        campo.value = campo.value.replace(
            /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ '-]/g,
            ""
        );

    });

});

// DNI y NIF: solo letras y números.
const camposDocumento = ["dni", "nif-fac"];

camposDocumento.forEach(function(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function() {

        campo.value = campo.value.replace(/[^A-Za-z0-9]/g, "");

    });

});

// Teléfono: solo números y el símbolo +.
const telefono = document.getElementById("telefono");

telefono.addEventListener("input", function() {

    telefono.value = telefono.value.replace(/[^0-9+]/g, "");

});

// Código postal e IBAN: solo números.
const camposNumericos = ["cp", "iban"];

camposNumericos.forEach(function(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function() {

        campo.value = campo.value.replace(/[^0-9]/g, "");

    });

});

// Dirección y dirección de facturación.
const camposDireccion = ["direccion", "dir-fac"];

camposDireccion.forEach(function(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function() {

        campo.value = campo.value.replace(
            /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,.ºª/#'-]/g,
            ""
        );

    });

});

// Altura: solo números enteros.
const altura = document.getElementById("altura");

altura.addEventListener("input", function() {

    altura.value = altura.value.replace(/[^0-9]/g, "");

});

// Peso: permitimos números, coma y punto decimal.
const peso = document.getElementById("peso");

peso.addEventListener("input", function() {

    // Eliminamos los caracteres que no están permitidos.
    peso.value = peso.value.replace(/[^0-9.,]/g, "");

    // Evitamos que se escriban varias comas o puntos.
    if (peso.value.split(",").length > 2) {

        peso.value = peso.value.slice(0, -1);

    }

    if (peso.value.split(".").length > 2) {

        peso.value = peso.value.slice(0, -1);

    }

    // Evitamos mezclar la coma y el punto decimal.
    if (peso.value.includes(",") && peso.value.includes(".")) {

        peso.value = peso.value.slice(0, -1);

    }

});

// Referido: letras, números y caracteres habituales.
const referido = document.getElementById("referido");

referido.addEventListener("input", function() {

    referido.value = referido.value.replace(
        /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 '-]/g,
        ""
    );

});
