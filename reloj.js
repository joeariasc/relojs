$(function() {
    console.log('Documento Cargado correctamente');
    //elements
    inputHours = document.getElementById('hours');
    inputMinutes = document.getElementById('minutes');
    btnSendInformation = document.getElementById('btn_send_information')

    //bind events
    inputHours.addEventListener('keyup', ValidateHours);
    inputHours.addEventListener('keypress', ValidateNumber);

    inputMinutes.addEventListener('keyup', ValidateMinutes);
    inputMinutes.addEventListener('keypress', ValidateNumber);

    btnSendInformation.addEventListener('click', GetAngle)


});

var ValidateHours = function() {
    var hours = this.value;
    if (parseInt(hours) < 0 || parseInt(hours) >= 24) {
        this.value = '';
    }
};

var ValidateMinutes = function() {
    var minutes = this.value;
    if (parseInt(minutes) < 0 || parseInt(minutes) >= 60) {
        this.value = '';
    }
};

var ValidateNumber = function(e) {
    var keyCode = (e.which) ? e.which : e.keyCode
    if (keyCode != 46 && keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
        e.preventDefault();
    }
};

var GetAngle = function(e) {
    e.preventDefault();
    var horas = inputHours.value;
    var minutos = inputMinutes.value;
    if (horas.length === 0 || minutos.length === 0) {
        alert('Faltan Datos!!');
    } else {
        var angulo = CalcAngle(horas, minutos);
        if (isNaN(angulo)) {
            alert('los valores no son números!!!');
            return;
        }
        var infoDegree = document.getElementById('degree_text');
        infoDegree.innerHTML = angulo;
        console.log({
            horas: horas,
            minutos: minutos,
            Angulo: angulo
        });
    }

};

function CalcAngle(hours, minutes) {
    /*
    1 hora posee 30 grados => 360/12
    despues de 1 min, la manecilla se ha movido 0.5 grados
    30/60 => 0,5 grados
    */
    var hour = 30;


    /*
    Para la manecilla del minutero, 1 min tiene 6 grados
    */
    var min = 6;

    /*
    consideremos cuanto se ha desplazado la manecilla de la hora despues que el 
    minutero empieza a moverse
    */

    hours = hours > 12 ? parseInt(hours) - 12 : hours;

    var degreeHours = (parseInt(hours) * hour) + (0.5 * minutes);
    var degreeMinutes = parseInt(minutes) * min;

    if (hours > 0) {
        return Math.abs((degreeMinutes - degreeHours));
    }

    return degreeMinutes;
}