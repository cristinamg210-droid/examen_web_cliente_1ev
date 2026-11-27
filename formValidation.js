
/* --------------------------------
   1. ELEMENTOS DEL FORMULARIO
-------------------------------- */

// Formulario.
// const guarda una referencia que no se volverá a asignar.
const formulario = document.getElementById("form-inscripcion");

// Datos personales.
// getElementById obtiene un elemento por el id asignado en el HTML.
// Cada variable guarda el input correspondiente del formulario.
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellidos");
const dniInput = document.getElementById("dni");
const fechaNacimientoInput = document.getElementById("fecha-nac");
const sexoInput = document.getElementById("sexo");
const estadoCivilInput = document.getElementById("estado-civil");

// Contacto y dirección.
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");

// querySelectorAll busca todos los inputs con ese name y devuelve una lista.
const contactoInputs = document.querySelectorAll('input[name="contacto_pref"]');
// parentElement sube un nivel en el HTML; se suben dos para obtener el contenedor del grupo.
const contactoChips = contactoInputs[0].parentElement.parentElement;

const direccionInput = document.getElementById("direccion");
const ciudadInput = document.getElementById("ciudad");
const codigoPostalInput = document.getElementById("cp");

// Salud y objetivos.
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const nivelInput = document.getElementById("nivel");
const objetivosInput = document.getElementById("objetivos");

// [] en el name indica que estos campos pertenecen a un grupo de opciones.
const condicionesInputs = document.querySelectorAll('input[name="condiciones[]"]');
// El contenedor .chips se utiliza para colocar debajo el mensaje del grupo.
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
// submit se ejecuta al pulsar Enviar; reset se ejecuta al pulsar Limpiar.
// addEventListener registra qué función se ejecuta cuando ocurre un evento.
formulario.addEventListener("submit", handleEnviar);
formulario.addEventListener("reset", handleLimpiar);

// Datos personales.
// blur ocurre al salir del campo; change ocurre cuando cambia su valor.
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
// querySelectorAll devuelve un conjunto; el bucle registra el evento en cada opción.
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

// FUNCIÓN PARA VALIDAR NOMBRE Y APELLIDOS
function validarNombreApellidos(campo, valor, tipo) {

    // Esta expresión regular permite letras y separadores como espacios, guiones y apóstrofos.
    const letras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

    // let crea una variable cuyo valor puede cambiar.
    // Valores iniciales para el nombre
    let maximo = 40;

    let mensajeObligatorio = "El nombre es obligatorio";
    let mensajeNumeros = "El nombre no puede contener números";
    let mensajeMinimo = "El nombre debe tener al menos 3 caracteres";
    let mensajeMaximo = "El nombre no puede superar los 40 caracteres";
    let mensajeLetras = "El nombre solo puede contener letras";

    // Si estamos validando los apellidos, cambiamos los valores
    // === compara valores sin convertir sus tipos.
    if (tipo === "apellidos") {

        maximo = 80;

        mensajeObligatorio = "Los apellidos son obligatorios";
        mensajeNumeros = "Los apellidos no pueden contener números";
        mensajeMinimo = "Los apellidos deben tener al menos 3 caracteres";
        mensajeMaximo = "Los apellidos no pueden superar los 80 caracteres";
        mensajeLetras = "Los apellidos solo pueden contener letras";
    }

    // Comprobamos que el campo no esté vacío
    // === compara si son iguales; aquí se comprueba si el texto está vacío.
    if (valor === "") {
        mostrarError(campo, mensajeObligatorio);
    }

    // Comprobamos que no tenga números
    else if (/[0-9]/.test(valor) === true) {
        mostrarError(campo, mensajeNumeros);
    }

    // Comprobamos que tenga al menos 3 caracteres
    else if (valor.length < 3) {
        mostrarError(campo, mensajeMinimo);
    }

    // Comprobamos que no supere el máximo de caracteres
    else if (valor.length > maximo) {
        mostrarError(campo, mensajeMaximo);
    }

    // Comprobamos que solo utilice los caracteres permitidos
    else if (letras.test(valor) === false) {
        mostrarError(campo, mensajeLetras);
    }

    // Si cumple todas las condiciones, quitamos el error
    else {
        quitarError(campo);
    }
}


function validarCampo(campo, tipo) {

    // trim elimina espacios al principio y al final antes de comprobar el valor.
    // campo.value es el texto del input; valor guarda ese texto ya sin espacios sobrantes.
    const valor = campo.value.trim();

    // VALIDAR NOMBRE
    if (tipo === "nombre") {  // === comprueba que tipo sea exactamente igual a "nombre".
        validarNombreApellidos(campo, valor, "nombre");
    }

    // VALIDAR APELLIDOS
    else if (tipo === "apellidos") {    // === comprueba que tipo sea exactamente igual a "apellidos".
        validarNombreApellidos(campo, valor, "apellidos");
    }

    // VALIDAR DNI, NIE O PASAPORTE
    else if (tipo === "dni") {

        // const crea una variable que no se reasigna; regex es el patrón que se comprobará.
        // ^ y $ marcan el principio y el final; {5,15} exige entre 5 y 15 caracteres.
        const regex = /^[A-Za-z0-9]{5,15}$/;

        if (valor === "") {
            mostrarError(campo, "El DNI es obligatorio");
        }
        // test devuelve true si valor cumple el patrón; === false comprueba que no lo cumpla.
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El DNI debe tener entre 5 y 15 caracteres alfanuméricos");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR FECHA DE NACIMIENTO
    else if (tipo === "fecha") {

        // La expresión regular comprueba el formato AAAA-MM-DD; después se verifica que la fecha exista.
        if (valor === "") {
            mostrarError(campo, "La fecha de nacimiento es obligatoria");
        }
        else if (/^\d{4}-\d{2}-\d{2}$/.test(valor) === false) {
            mostrarError(campo, "Introduce una fecha de nacimiento válida");
        }
        else {

            // split separa el texto por guiones y crea un array: año, mes y día.
            const partes = valor.split("-");

            // Number convierte cada parte del texto en un número.
            const anio = Number(partes[0]);
            const mes = Number(partes[1]);
            const dia = Number(partes[2]);

            // Date crea una fecha; los meses empiezan en 0, por eso se resta 1 al mes.
            const fecha = new Date(anio, mes - 1, dia);
            const hoy = new Date();

            let fechaCorrecta = true;

            // !== significa "distinto de"; se compara la fecha creada con los datos escritos.
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

                // Se quita la hora actual para comparar solamente las fechas.
                hoy.setHours(0, 0, 0, 0);

                let edad = hoy.getFullYear() - anio;

                // Se ajusta la edad si todavía no ha llegado el cumpleaños de este año.
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

        // || significa "o": basta con que una de estas opciones sea verdadera.
        if (valor === "" || valor === "f" || valor === "m" || valor === "x") {
            quitarError(campo);
        }
        else {
            mostrarError(campo, "El sexo seleccionado no es válido");
        }

    }

    // VALIDAR ESTADO CIVIL
    else if (tipo === "estado") {

        // Se acepta el texto vacío o cualquiera de las opciones indicadas.
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
            mostrarError(campo, "El correo electrónico es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "Introduce un correo electrónico válido");
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
            mostrarError(campo, "Introduce un teléfono válido de 9 cifras que empiece por 6 o 7");
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

        const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+([ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

        if (valor === "") {
            mostrarError(campo, "La ciudad es obligatoria");
        }
        else if (valor.length < 3) {
            mostrarError(campo, "La ciudad debe tener al menos 3 caracteres");
        }
        else if (valor.length > 40) {
            mostrarError(campo, "La ciudad no puede superar los 40 caracteres");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "La ciudad no puede contener símbolos especiales");
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
            mostrarError(campo, "El código postal debe tener 5 cifras");
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
            mostrarError(campo, "La altura solo puede contener números enteros");
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
            mostrarError(campo, "Introduce un peso válido. Puedes utilizar un decimal");
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
            mostrarError(campo, "Selecciona un nivel de actividad válido");
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
            mostrarError(campo, "Debes seleccionar un plan");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR HORA PREFERIDA
    else if (tipo === "hora") {

        if (valor === "" || valor === "6:00–9:00" || valor === "9:00–12:00" || valor === "12:00–16:00" || valor === "16:00–19:00" || valor === "19:00–22:00") {
            if (valor === "") {
                mostrarError(campo, "Debes seleccionar una hora preferida");
            }
            else {
                quitarError(campo);
            }
        }
        else {
            mostrarError(campo, "Selecciona una hora válida");
        }

    }

    // VALIDAR QUIÉN NOS HA RECOMENDADO
    else if (tipo === "referido") {

        const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]{3,30}$/;

        if (valor === "") {
            quitarError(campo);
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "Introduce entre 3 y 30 caracteres, sin símbolos especiales");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR NIF DE FACTURACIÓN
    else if (tipo === "nif") {

        const regex = /^[A-Za-z0-9]{8,15}$/;

        if (valor === "") {
            quitarError(campo);
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "El NIF debe tener entre 8 y 15 caracteres");
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
            mostrarError(campo, "La dirección debe tener al menos 5 caracteres");
        }
        else {
            quitarError(campo);
        }

    }

    // VALIDAR IBAN
    else if (tipo === "iban") {

        const regex = /^[0-9]{4}$/;

        if (valor === "") {
            mostrarError(campo, "El IBAN es obligatorio");
        }
        else if (regex.test(valor) === false) {
            mostrarError(campo, "Introduce los 4 últimos dígitos del IBAN");
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

    // let permite cambiar el valor; empezamos suponiendo que no hay ninguna opción marcada.
    let marcado = false;

    // for repite el bloque una vez por cada opción; i es la posición actual de la lista.
    for (let i = 0; i < contactoInputs.length; i++) {

        // checked indica si la casilla está seleccionada.
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

    // Recorremos las condiciones para contar las seleccionadas y detectar "ninguna".
    for (let i = 0; i < condicionesInputs.length; i++) {

        if (condicionesInputs[i].checked === true) {
            // Suma una condición al total cuando está marcada.
            cantidadMarcadas = cantidadMarcadas + 1;
        }

        if (condicionesInputs[i].value === "ninguna") {

            if (condicionesInputs[i].checked === true) {
                ningunaMarcada = true;
            }

        }

    }

    // Si "ninguna" está marcada, no se puede combinar con otra condición.
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

    // Contamos cuántos días se han seleccionado.
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

    // options contiene las opciones del desplegable de clases.
    for (let i = 0; i < clasesInput.options.length; i++) {

        if (clasesInput.options[i].selected === true) {
            cantidadClases = cantidadClases + 1;
        }

    }

    // > significa "mayor que"; aquí se limita la selección a tres clases.
    if (cantidadClases > 3) {

        // Desmarcamos la última opción seleccionada.
        // Este bucle va desde el final hacia el principio; -- resta 1 en cada vuelta.
        for (let i = clasesInput.options.length - 1; i >= 0; i--) {

            if (clasesInput.options[i].selected === true) {
                clasesInput.options[i].selected = false;

                // break termina el bucle al encontrar la última opción marcada.
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

    // Si la casilla no está marcada, se muestra el error; si no, se quita.
    if (tosInput.checked === false) {
        mostrarError(tosInput, "Debes aceptar los términos y condiciones");
    }
    else {
        quitarError(tosInput);
    }

}


// Validar protección de datos.
function validarRgpd() {

    // === false comprueba que la casilla no esté marcada.
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

    // Evita que el navegador envíe el formulario de la forma predeterminada.
    event.preventDefault();

    // Busca el mensaje general anterior para quitarlo antes de validar de nuevo.
    const mensajeAnterior = formulario.querySelector(".form-message");

    // !== significa "distinto de"; null indica que no se encontró el elemento.
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

    // Busca todos los mensajes de error que hayan dejado las validaciones.
    const errores = formulario.querySelectorAll(".error-msg");

    // Si hay uno o más errores, no se envía el formulario.
    if (errores.length > 0) {

        mostrarMensaje("No se ha podido enviar el formulario. Revisa los campos marcados en rojo.");

        // Busca el primer campo marcado como inválido.
        const primerError = formulario.querySelector("[aria-invalid='true']");

        if (primerError !== null) {

            // Si el error está en un grupo, buscamos su primer elemento.
            // contains comprueba si el elemento tiene la clase "chips".
            if (primerError.classList.contains("chips")) {
                primerError.querySelector("input").focus();
            }
            else {
                primerError.focus();
            }

        }

    }
    else {

        // Si no hay errores, cambia a la página de confirmación.
        window.location.href = "correcto.html";

    }

}


// --------------------------------
// 6. LIMPIAR EL FORMULARIO
// --------------------------------

function handleLimpiar() {

    // Busca todos los mensajes de error del formulario.
    const errores = formulario.querySelectorAll(".error-msg");

    // Elimina cada mensaje de error encontrado.
    for (let i = 0; i < errores.length; i++) {
        errores[i].remove();
    }

    // Busca y, si existe, elimina el mensaje general de envío.
    const mensaje = formulario.querySelector(".form-message");

    if (mensaje !== null) {
        mensaje.remove();
    }

    // Busca campos que tengan cualquiera de estos atributos; la coma significa "o".
    const campos = formulario.querySelectorAll('[aria-invalid="true"], [data-valid="true"]');

    for (let i = 0; i < campos.length; i++) {

        // Quita los atributos visuales de válido/inválido para dejar el formulario limpio.
        campos[i].removeAttribute("aria-invalid");
        campos[i].removeAttribute("data-valid");

    }

}


// --------------------------------
// 7. FUNCIONES PARA LOS MENSAJES
// --------------------------------


// Mostrar un mensaje de error.
function mostrarError(campo, mensaje) {

    // parentElement obtiene el elemento HTML que contiene el campo.
    const contenedor = campo.parentElement;

    // Busca si ya existe un mensaje de error dentro de ese contenedor.
    let error = contenedor.querySelector(".error-msg");

    // Solo crea un mensaje nuevo si todavía no existe.
    if (error === null) {

        // document.createElement crea un elemento HTML nuevo.
        error = document.createElement("p");

        // classList.add añade clases CSS; setAttribute establece un atributo HTML.
        error.classList.add("error-msg");
        error.setAttribute("role", "alert");

        contenedor.appendChild(error);

    }

    // Muestra el texto y marca el campo como inválido para estilos y accesibilidad.
    error.innerText = mensaje;

    campo.setAttribute("aria-invalid", "true");

    campo.removeAttribute("data-valid");

}


// Quitar un mensaje de error.
function quitarError(campo) {

    const contenedor = campo.parentElement;

    // Busca el mensaje de error para eliminarlo si existe.
    const error = contenedor.querySelector(".error-msg");

    if (error !== null) {
        error.remove();
    }

    // Quita el estado de inválido y marca el campo como validado correctamente.
    campo.removeAttribute("aria-invalid");

    campo.setAttribute("data-valid", "true");

}


// Mostrar un mensaje general al enviar.
function mostrarMensaje(mensaje) {

    // Crea un párrafo para mostrar un mensaje general del formulario.
    const nuevoMensaje = document.createElement("p");

    nuevoMensaje.classList.add("form-message", "error");

    nuevoMensaje.innerText = mensaje;

    // Busca el contenedor de botones y coloca el mensaje justo antes de él.
    const botones = formulario.querySelector(".actions");

    formulario.insertBefore(nuevoMensaje, botones);

}
