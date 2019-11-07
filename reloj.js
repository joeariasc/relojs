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
    var angulo = CalcAngle(horas, minutos);
    console.log({
        horas: horas,
        minutos: minutos,
        Angulo: angulo
    });
};

function CalcAngle(hours, minutes) {
    //1 hora posee 30 grados
    var hour = 30;
    //1 min tiene 6 grados
    var min = 6;

    hours = hours > 12 ? parseInt(hours) - 12 : hours;

    var degreeHours = parseInt(hours) * hour;
    var degreeMinutes = parseInt(minutes) * min;

    if (hours > 0) {
        return (degreeMinutes - degreeHours);
    }

    return degreeMinutes;
}