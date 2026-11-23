
// Seleccionamos el formulario
const formulario = document.getElementById("form-inscripcion");

// Seleccionamos todos los campos del formulario
const campos = formulario.querySelectorAll("input, select, textarea");


// Función para mostrar un mensaje de error
function mostrarError(campo, mensaje) {

    // Quitamos primero el error anterior, si existe
    quitarError(campo);

    // Buscamos el contenedor del campo
    const contenedor = campo.closest(".control");

    // Creamos un elemento div para el mensaje
    const error = document.createElement("div");

    // Le ponemos la clase que existe en el CSS
    error.className = "error-msg";

    // Escribimos el mensaje de error
    error.textContent = mensaje;

    // Añadimos el mensaje al contenedor
    contenedor.appendChild(error);

    // Indicamos que el campo tiene un error
    campo.setAttribute("aria-invalid", "true");
}


// Función para quitar un mensaje de error
function quitarError(campo) {

    // Buscamos el contenedor del campo
    const contenedor = campo.closest(".control");

    // Buscamos el mensaje de error
    const error = contenedor.querySelector(".error-msg");

    // Si existe un mensaje, lo eliminamos
    if (error) {
        error.remove();
    }

    // Quitamos la indicación de campo incorrecto
    campo.removeAttribute("aria-invalid");
}


// Función para comprobar la edad
function comprobarEdad(fecha) {

    // Obtenemos la fecha actual
    const hoy = new Date();

    // Convertimos la fecha de nacimiento en una fecha
    const nacimiento = new Date(fecha + "T00:00:00");

    // Calculamos la edad restando los años
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    // Comprobamos si todavía no ha cumplido años este año
    if (
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() &&
        hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    // Devolvemos la edad calculada
    return edad;
}


// Función para validar un campo
function validarCampo(campo) {

    // Quitamos el error anterior
    quitarError(campo);

    // Guardamos el mensaje de error
    let mensaje = "";

    // Obtenemos el valor del campo sin espacios al principio y al final
    const valor = campo.value.trim();


    // Comprobamos que los campos obligatorios no estén vacíos
    if (campo.required && valor === "") {
        mensaje = "Este campo es obligatorio.";
    }


    // Validamos el nombre
    else if (
        (campo.id === "nombre" || campo.id === "apellidos") &&
        valor !== "" &&
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(valor)
    ) {
        mensaje = "Introduce solo letras.";
    }


    // Validamos el documento
    else if (campo.id === "dni" && !campo.checkValidity()) {
        mensaje = "Introduce entre 5 y 15 letras o números.";
    }


    // Validamos la fecha de nacimiento
    else if (campo.id === "fecha-nac" && valor !== "") {

        const edad = comprobarEdad(valor);

        if (new Date(valor + "T00:00:00") > new Date()) {
            mensaje = "La fecha de nacimiento no puede ser futura.";
        } else if (edad < 16 || edad > 120) {
            mensaje = "Debes tener entre 16 y 120 años.";
        }
    }


    // Validamos el correo electrónico
    else if (campo.id === "email" && !campo.checkValidity()) {
        mensaje = "Introduce un correo electrónico válido.";
    }


    // Validamos el teléfono
    else if (campo.id === "telefono" && valor !== "") {

        // Quitamos espacios, guiones y paréntesis
        const telefono = valor.replace(/[\s()-]/g, "");

        if (!/^(?:\+34)?[6789]\d{8}$/.test(telefono)) {
            mensaje = "Introduce un teléfono móvil español válido.";
        }
    }


    // Validamos la dirección
    else if (campo.id === "direccion" && !campo.checkValidity()) {
        mensaje = "Introduce una dirección válida.";
    }


    // Validamos la ciudad
    else if (
        campo.id === "ciudad" &&
        valor !== "" &&
        !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(valor)
    ) {
        mensaje = "Introduce un nombre de ciudad válido.";
    }


    // Validamos el código postal
    else if (campo.id === "cp" && !campo.checkValidity()) {
        mensaje = "El código postal debe tener 5 números.";
    }


    // Validamos la altura
    else if (campo.id === "altura" && !campo.checkValidity()) {
        mensaje = "La altura debe estar entre 140 y 220 cm.";
    }


    // Validamos el peso
    else if (campo.id === "peso" && !campo.checkValidity()) {
        mensaje = "El peso debe estar entre 35 y 250 kg.";
    }


    // Validamos los objetivos
    else if (campo.id === "objetivos" && !campo.checkValidity()) {
        mensaje = "Escribe tus objetivos (máximo 500 caracteres).";
    }


    // Validamos el plan
    else if (campo.id === "plan" && !campo.checkValidity()) {
        mensaje = "Selecciona un plan de membresía.";
    }


    // Validamos los campos de facturación si se han rellenado
    else if (
        (campo.id === "nif-fac" || campo.id === "dir-fac") &&
        valor !== "" &&
        !campo.checkValidity()
    ) {
        mensaje = "Comprueba el formato y la longitud del campo.";
    }


    // Validamos los últimos cuatro números del IBAN
    else if (campo.id === "iban" && !campo.checkValidity()) {
        mensaje = "Introduce exactamente 4 números.";
    }


    // Comprobamos el resto de condiciones del HTML
    else if (!campo.checkValidity()) {
        mensaje = campo.validationMessage;
    }


    // Si hay un error, mostramos el mensaje
    if (mensaje !== "") {
        mostrarError(campo, mensaje);
        return false;
    }

    // Si todo está correcto, devolvemos true
    return true;
}


// Comprobamos los campos al salir de ellos
campos.forEach(function(campo) {

    campo.addEventListener("blur", function() {
        validarCampo(campo);
    });


    // Volvemos a comprobar el campo cuando se modifica
    campo.addEventListener("input", function() {

        // Solo validamos si ya tenía un error
        if (campo.getAttribute("aria-invalid") === "true") {
            validarCampo(campo);
        }

    });


    // Comprobamos también los campos de selección
    campo.addEventListener("change", function() {

        if (campo.getAttribute("aria-invalid") === "true") {
            validarCampo(campo);
        }

    });

});


// Validamos todos los campos al enviar el formulario
formulario.addEventListener("submit", function(event) {

    // Evitamos que se envíe automáticamente
    event.preventDefault();

    // Guardamos si todos los campos son correctos
    let formularioValido = true;

    // Recorremos todos los campos
    campos.forEach(function(campo) {

        // Si algún campo no es válido, cambiamos el resultado
        if (!validarCampo(campo)) {
            formularioValido = false;
        }

    });


    // Si hay errores, buscamos el primero
    if (!formularioValido) {

        const primerError = formulario.querySelector('[aria-invalid="true"]');

        // Llevamos el cursor al primer campo incorrecto
        if (primerError) {
            primerError.focus();
        }

    } else {

        // Si todo está correcto, mostramos un mensaje
        alert("¡Formulario validado correctamente!");

    }

});
