
/* --------------------------------
   1. ELEMENTOS DEL FORMULARIO
-------------------------------- */

// Formulario.
const formulario = document.getElementById("form-inscripcion");

// Datos personales.
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellidos");
const dniInput = document.getElementById("dni");
const fechaNacimientoInput = document.getElementById("fecha-nac");
const sexoInput = document.getElementById("sexo");
const estadoCivilInput = document.getElementById("estado-civil");

// Contacto y dirección.
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");

const contactoInputs = document.querySelectorAll('input[name="contacto_pref"]');
const contactoChips = contactoInputs[0].parentElement.parentElement;

const direccionInput = document.getElementById("direccion");
const ciudadInput = document.getElementById("ciudad");
const codigoPostalInput = document.getElementById("cp");

// Salud y objetivos.
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const nivelInput = document.getElementById("nivel");
const objetivosInput = document.getElementById("objetivos");

const condicionesInputs = document.querySelectorAll('input[name="condiciones[]"]');
const condicionesChips = condicionesInputs[0].parentElement.parentElement;

// Plan y horarios.
const planInput = document.getElementById("plan");

const diasInputs = document.querySelectorAll('input[name="dias[]"]');
const diasChips = diasInputs[0].parentElement.parentElement;

const horaInput = document.getElementById("hora");
const clasesInput = document.getElementById("clases");
const referidoInput = document.getElementById("referido");

// Facturación.
const nifFacturaInput = document.getElementById("nif-fac");
const direccionFacturaInput = document.getElementById("dir-fac");
const ibanInput = document.getElementById("iban");

// Consentimientos.
const tosInput = document.querySelector('input[name="tos"]');
const rgpdInput = document.querySelector('input[name="rgpd"]');


// --------------------------------
// 2. EVENTOS DEL FORMULARIO
// --------------------------------

// Eventos de envío y limpieza.
formulario.addEventListener("submit", handleEnviar);
formulario.addEventListener("reset", handleLimpiar);

// Datos personales.
nombreInput.addEventListener("blur", function () {
    validarCampo(nombreInput, "nombre");
});

apellidoInput.addEventListener("blur", function () {
    validarCampo(apellidoInput, "apellidos");
});

dniInput.addEventListener("blur", function () {
    validarCampo(dniInput, "dni");
});

fechaNacimientoInput.addEventListener("blur", function () {
    validarCampo(fechaNacimientoInput, "fecha");
});

sexoInput.addEventListener("change", function () {
    validarCampo(sexoInput, "sexo");
});

estadoCivilInput.addEventListener("change", function () {
    validarCampo(estadoCivilInput, "estado");
});

// Contacto y dirección.
emailInput.addEventListener("blur", function () {
    validarCampo(emailInput, "email");
});

telefonoInput.addEventListener("blur", function () {
    validarCampo(telefonoInput, "telefono");
});

// Añadimos un evento a cada opción de contacto.
for (let i = 0; i < contactoInputs.length; i++) {
    contactoInputs[i].addEventListener("change", validarContacto);
}

direccionInput.addEventListener("blur", function () {
    validarCampo(direccionInput, "direccion");
});

ciudadInput.addEventListener("blur", function () {
    validarCampo(ciudadInput, "ciudad");
});

codigoPostalInput.addEventListener("blur", function () {
    validarCampo(codigoPostalInput, "cp");
});

// Salud y objetivos.
alturaInput.addEventListener("blur", function () {
    validarCampo(alturaInput, "altura");
});

pesoInput.addEventListener("blur", function () {
    validarCampo(pesoInput, "peso");
});

nivelInput.addEventListener("change", function () {
    validarCampo(nivelInput, "nivel");
});

objetivosInput.addEventListener("blur", function () {
    validarCampo(objetivosInput, "objetivos");
});

// Añadimos un evento a cada condición médica.
for (let i = 0; i < condicionesInputs.length; i++) {
    condicionesInputs[i].addEventListener("change", validarCondiciones);
}

// Plan y horarios.
planInput.addEventListener("change", function () {
    validarCampo(planInput, "plan");
});

// Añadimos un evento a cada día.
for (let i = 0; i < diasInputs.length; i++) {
    diasInputs[i].addEventListener("change", validarDias);
}

horaInput.addEventListener("change", function () {
    validarCampo(horaInput, "hora");
});

clasesInput.addEventListener("change", validarClases);

referidoInput.addEventListener("blur", function () {
    validarCampo(referidoInput, "referido");
});

// Facturación y consentimientos.
nifFacturaInput.addEventListener("blur", function () {
    validarCampo(nifFacturaInput, "nif");
});

direccionFacturaInput.addEventListener("blur", function () {
    validarCampo(direccionFacturaInput, "direccionFactura");
});

ibanInput.addEventListener("blur", function () {
    validarCampo(ibanInput, "iban");
});

tosInput.addEventListener("change", validarTos);
rgpdInput.addEventListener("change", validarRgpd);


// --------------------------------
// 3. FUNCIÓN GENERAL DE VALIDACIÓN
// --------------------------------

function validarCampo(campo, tipo) {

    // Obtenemos el valor y quitamos los espacios del principio y del final.
    const valor = campo.value.trim();

    // VALIDAR NOMBRE
    if (tipo === "nombre") {

        const letras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

        if (valor === "") {
            mostrarError(campo, "El nombre es obligatorio");
        }
        else if (/[0-9]/.test(valor) === true) {
            mostrarError(campo, "El nombre no puede contener números");
        }
        else if (valor.length < 3) {
            mostrarError(campo, "El nombre debe tener al menos 3 caracteres");
        }
        else if (valor.length > 40) {
            mostrarError(campo, "El nombre no puede superar los 40 caracteres");
        }
        else if (letras.test(valor) === false) {
            mostrarError(campo, "El nombre solo puede contener letras");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR APELLIDOS
    else if (tipo === "apellidos") {

        const letras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

        if (valor === "") {
            mostrarError(campo, "Los apellidos son obligatorios");
        }
        else if (/[0-9]/.test(valor) === true) {
            mostrarError(campo, "Los apellidos no pueden contener números");
        }
        else if (valor.length < 3) {
            mostrarError(campo, "Los apellidos deben tener al menos 3 caracteres");
        }
        else if (valor.length > 80) {
            mostrarError(campo, "Los apellidos no pueden superar los 80 caracteres");
        }
        else if (letras.test(valor) === false) {
            mostrarError(campo, "Los apellidos solo pueden contener letras");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR DNI, NIE O PASAPORTE
    else if (tipo === "dni") {

        const regex = /^[A-Za-z0-9]{5,15}$/;

        if (valor === "") {
            mostrarError(campo, "El DNI es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El DNI debe tener entre 5 y 15 caracteres alfanuméricos");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR FECHA DE NACIMIENTO
    else if (tipo === "fecha") {

        if (valor === "") {
            mostrarError(campo, "La fecha de nacimiento es obligatoria");
        }
        else if (/^\d{4}-\d{2}-\d{2}$/.test(valor) === false) {
            mostrarError(campo, "Introduce una fecha de nacimiento válida");
        }
        else {

            const partes = valor.split("-");

            const anio = Number(partes[0]);
            const mes = Number(partes[1]);
            const dia = Number(partes[2]);

            const fecha = new Date(anio, mes - 1, dia);
            const hoy = new Date();

            let fechaCorrecta = true;

            if (fecha.getFullYear() !== anio) {
                fechaCorrecta = false;
            }
            else if (fecha.getMonth() !== mes - 1) {
                fechaCorrecta = false;
            }
            else if (fecha.getDate() !== dia) {
                fechaCorrecta = false;
            }

            if (fechaCorrecta === false) {
                mostrarError(campo, "La fecha de nacimiento no es válida");
            }
            else {

                hoy.setHours(0, 0, 0, 0);

                let edad = hoy.getFullYear() - anio;

                if (hoy.getMonth() + 1 < mes) {
                    edad = edad - 1;
                }
                else if (hoy.getMonth() + 1 === mes) {

                    if (hoy.getDate() < dia) {
                        edad = edad - 1;
                    }

                }

                if (fecha > hoy) {
                    mostrarError(campo, "La fecha de nacimiento no puede ser futura");
                }
                else if (edad < 16) {
                    mostrarError(campo, "Debes tener al menos 16 años");
                }
                else if (edad > 100) {
                    mostrarError(campo, "La edad no puede superar los 100 años");
                }
                else {
                    quitarError(campo);
                }

            }

        }

    }

    // VALIDAR SEXO
    else if (tipo === "sexo") {

        if (valor === "" || valor === "f" || valor === "m" || valor === "x") {
            quitarError(campo);
        }
        else {
            mostrarError(campo, "El sexo seleccionado no es válido");
        }

    }

    // VALIDAR ESTADO CIVIL
    else if (tipo === "estado") {

        if (valor === "" || valor === "Soltero/a" || valor === "Casado/a" || valor === "Pareja de hecho" || valor === "Divorciado/a" || valor === "Viudo/a") {
            quitarError(campo);
        }
        else {
            mostrarError(campo, "El estado civil seleccionado no es válido");
        }

    }

    // VALIDAR CORREO ELECTRÓNICO
    else if (tipo === "email") {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === "") {
            mostrarError(campo, "El email es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El email no es válido");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR TELÉFONO
    else if (tipo === "telefono") {

        const regex = /^[67][0-9]{8}$/;

        if (valor === "") {
            mostrarError(campo, "El teléfono es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El teléfono debe tener 9 cifras y empezar por 6 o 7");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR DIRECCIÓN
    else if (tipo === "direccion") {

        if (valor === "") {
            mostrarError(campo, "La dirección es obligatoria");
        }
        else if (valor.length < 5) {
            mostrarError(campo, "La dirección debe tener al menos 5 caracteres");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR CIUDAD
    else if (tipo === "ciudad") {

        if (valor === "") {
            mostrarError(campo, "La ciudad es obligatoria");
        }
        else if (/[0-9]/.test(valor) === true) {
            mostrarError(campo, "La ciudad no puede contener números");
        }
        else if (valor.length < 3) {
            mostrarError(campo, "La ciudad debe tener al menos 3 caracteres");
        }
        else if (valor.length > 50) {
            mostrarError(campo, "La ciudad no puede superar los 50 caracteres");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR CÓDIGO POSTAL
    else if (tipo === "cp") {

        const regex = /^[0-9]{5}$/;

        if (valor === "") {
            mostrarError(campo, "El código postal es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El código postal debe tener 5 dígitos");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR ALTURA
    else if (tipo === "altura") {

        const regex = /^[0-9]+$/;

        if (valor === "") {
            mostrarError(campo, "La altura es obligatoria");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "La altura debe ser un número entero");
        }
        else if (Number(valor) < 140 || Number(valor) > 230) {
            mostrarError(campo, "La altura debe estar entre 140 y 230 cm");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR PESO
    else if (tipo === "peso") {

        const regex = /^[0-9]+(\.[0-9])?$/;

        if (valor === "") {
            mostrarError(campo, "El peso es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El peso no es válido. Utiliza como máximo un decimal");
        }
        else if (Number(valor) < 35 || Number(valor) > 250) {
            mostrarError(campo, "El peso debe estar entre 35 y 250 kg");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR NIVEL DE ACTIVIDAD
    else if (tipo === "nivel") {

        if (valor === "" || valor === "Sedentario" || valor === "Ligero (1–2 días/sem)" || valor === "Moderado (3–4 días/sem)" || valor === "Intenso (5–6 días/sem)" || valor === "Atleta") {
            quitarError(campo);
        }
        else {
            mostrarError(campo, "El nivel de actividad no es válido");
        }

    }

    // VALIDAR OBJETIVOS
    else if (tipo === "objetivos") {

        if (valor.length > 500) {
            mostrarError(campo, "Los objetivos no pueden superar los 500 caracteres");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR PLAN
    else if (tipo === "plan") {

        if (valor === "") {
            mostrarError(campo, "El plan es obligatorio");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR HORARIO
    else if (tipo === "hora") {

        if (valor === "6:00–9:00" || valor === "9:00–12:00" || valor === "12:00–16:00" || valor === "16:00–19:00" || valor === "19:00–22:00") {
            quitarError(campo);
        }
        else {
            mostrarError(campo, "Elige una franja horaria válida");
        }

    }

    // VALIDAR REFERIDO
    else if (tipo === "referido") {

        const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]{3,30}$/;

        if (valor === "") {
            quitarError(campo);
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El referido debe tener entre 3 y 30 letras o números");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR NIF/NIE DE FACTURACIÓN
    else if (tipo === "nif") {

        const regex = /^[A-Za-z0-9]{8,15}$/;

        if (valor === "") {
            quitarError(campo);
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El NIF/NIE debe tener entre 8 y 15 caracteres alfanuméricos");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR DIRECCIÓN DE FACTURACIÓN
    else if (tipo === "direccionFactura") {

        if (valor === "") {
            quitarError(campo);
        }
        else if (valor.length < 5) {
            mostrarError(campo, "La dirección de facturación debe tener al menos 5 caracteres");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR IBAN
    else if (tipo === "iban") {

        const regex = /^[0-9]{4}$/;

        if (valor === "") {
            mostrarError(campo, "Los cuatro últimos dígitos son obligatorios");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "Escribe solo los 4 últimos dígitos del IBAN");
        }
        else {
            quitarError(campo);
        }

    }

}


// --------------------------------
// 4. VALIDACIONES ESPECIALES
// --------------------------------


// Validar preferencia de contacto.
function validarContacto() {

    let marcado = false;

    for (let i = 0; i < contactoInputs.length; i++) {

        if (contactoInputs[i].checked === true) {
            marcado = true;
        }

    }

    if (marcado === false) {
        mostrarError(contactoChips, "Elige una preferencia de contacto");
    }
    else {
        quitarError(contactoChips);
    }

}


// Validar condiciones médicas.
function validarCondiciones() {

    let ningunaMarcada = false;
    let cantidadMarcadas = 0;

    for (let i = 0; i < condicionesInputs.length; i++) {

        if (condicionesInputs[i].checked === true) {
            cantidadMarcadas = cantidadMarcadas + 1;
        }

        if (condicionesInputs[i].value === "ninguna") {

            if (condicionesInputs[i].checked === true) {
                ningunaMarcada = true;
            }

        }

    }

    if (ningunaMarcada === true) {

        if (cantidadMarcadas > 1) {
            mostrarError(condicionesChips, "Si marcas «Ninguna» no puedes marcar otras condiciones");
        }
        else {
            quitarError(condicionesChips);
        }

    }
    else {
        quitarError(condicionesChips);
    }

}


// Validar días preferidos.
function validarDias() {

    let cantidadMarcados = 0;

    for (let i = 0; i < diasInputs.length; i++) {

        if (diasInputs[i].checked === true) {
            cantidadMarcados = cantidadMarcados + 1;
        }

    }

    if (cantidadMarcados === 0) {
        mostrarError(diasChips, "Elige al menos un día");
    }
    else {
        quitarError(diasChips);
    }

}


// Validar número de clases.
function validarClases() {

    let cantidadClases = 0;

    for (let i = 0; i < clasesInput.options.length; i++) {

        if (clasesInput.options[i].selected === true) {
            cantidadClases = cantidadClases + 1;
        }

    }

    if (cantidadClases > 3) {

        // Desmarcamos la última opción seleccionada.
        for (let i = clasesInput.options.length - 1; i >= 0; i--) {

            if (clasesInput.options[i].selected === true) {
                clasesInput.options[i].selected = false;
                break;
            }

        }

        mostrarError(clasesInput, "Puedes elegir como máximo 3 clases");

    }
    else {
        quitarError(clasesInput);
    }

}


// Validar términos y condiciones.
function validarTos() {

    if (tosInput.checked === false) {
        mostrarError(tosInput, "Debes aceptar los términos y condiciones");
    }
    else {
        quitarError(tosInput);
    }

}


// Validar protección de datos.
function validarRgpd() {

    if (rgpdInput.checked === false) {
        mostrarError(rgpdInput, "Debes autorizar el tratamiento de tus datos");
    }
    else {
        quitarError(rgpdInput);
    }

}


// --------------------------------
// 5. ENVÍO DEL FORMULARIO
// --------------------------------

function handleEnviar(event) {

    event.preventDefault();

    const mensajeAnterior = formulario.querySelector(".form-message");

    if (mensajeAnterior !== null) {
        mensajeAnterior.remove();
    }

    // Comprobamos los datos personales.
    validarCampo(nombreInput, "nombre");
    validarCampo(apellidoInput, "apellidos");
    validarCampo(dniInput, "dni");
    validarCampo(fechaNacimientoInput, "fecha");
    validarCampo(sexoInput, "sexo");
    validarCampo(estadoCivilInput, "estado");

    // Comprobamos el contacto y la dirección.
    validarCampo(emailInput, "email");
    validarCampo(telefonoInput, "telefono");
    validarContacto();
    validarCampo(direccionInput, "direccion");
    validarCampo(ciudadInput, "ciudad");
    validarCampo(codigoPostalInput, "cp");

    // Comprobamos la salud y los objetivos.
    validarCampo(alturaInput, "altura");
    validarCampo(pesoInput, "peso");
    validarCampo(nivelInput, "nivel");
    validarCampo(objetivosInput, "objetivos");
    validarCondiciones();

    // Comprobamos el plan y los horarios.
    validarCampo(planInput, "plan");
    validarDias();
    validarCampo(horaInput, "hora");
    validarClases();
    validarCampo(referidoInput, "referido");

    // Comprobamos la facturación y los consentimientos.
    validarCampo(nifFacturaInput, "nif");
    validarCampo(direccionFacturaInput, "direccionFactura");
    validarCampo(ibanInput, "iban");
    validarTos();
    validarRgpd();

    const errores = formulario.querySelectorAll(".error-msg");

    if (errores.length > 0) {

        mostrarMensaje("No se ha podido enviar el formulario. Revisa los campos marcados en rojo.");

        // Buscamos el primer campo que tenga un error.
        const primerError = formulario.querySelector("[aria-invalid='true']");

        if (primerError !== null) {

            // Si el error está en un grupo, buscamos su primer elemento.
            if (primerError.classList.contains("chips")) {
                primerError.querySelector("input").focus();
            }
            else {
                primerError.focus();
            }

        }

    }
    else {

        window.location.href = "correcto.html";

    }

}


// --------------------------------
// 6. LIMPIAR EL FORMULARIO
// --------------------------------

function handleLimpiar() {

    const errores = formulario.querySelectorAll(".error-msg");

    for (let i = 0; i < errores.length; i++) {
        errores[i].remove();
    }

    const mensaje = formulario.querySelector(".form-message");

    if (mensaje !== null) {
        mensaje.remove();
    }

    const campos = formulario.querySelectorAll('[aria-invalid="true"], [data-valid="true"]');

    for (let i = 0; i < campos.length; i++) {

        campos[i].removeAttribute("aria-invalid");
        campos[i].removeAttribute("data-valid");

    }

}


// --------------------------------
// 7. FUNCIONES PARA LOS MENSAJES
// --------------------------------


// Mostrar un mensaje de error.
function mostrarError(campo, mensaje) {

    const contenedor = campo.parentElement;

    let error = contenedor.querySelector(".error-msg");

    if (error === null) {

        error = document.createElement("p");

        error.classList.add("error-msg");
        error.setAttribute("role", "alert");

        contenedor.appendChild(error);

    }

    error.innerText = mensaje;

    campo.setAttribute("aria-invalid", "true");

    campo.removeAttribute("data-valid");

}


// Quitar un mensaje de error.
function quitarError(campo) {

    const contenedor = campo.parentElement;

    const error = contenedor.querySelector(".error-msg");

    if (error !== null) {
        error.remove();
    }

    campo.removeAttribute("aria-invalid");

    campo.setAttribute("data-valid", "true");

}


// Mostrar un mensaje general al enviar.
function mostrarMensaje(mensaje) {

    const nuevoMensaje = document.createElement("p");

    nuevoMensaje.classList.add("form-message", "error");

    nuevoMensaje.innerText = mensaje;

    const botones = formulario.querySelector(".actions");

    formulario.insertBefore(nuevoMensaje, botones);

}
