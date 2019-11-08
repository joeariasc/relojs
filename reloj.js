//Verifying if the document has been loaded correctly
//replace -> $(function(){}) JQuery
docReady(function() {
    //console.log('Loading!');
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

//function that is called when initializing the document to verify if it is fully loaded
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

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
        alert('Missing data!!');
    } else {
        if (isNaN(horas) || isNaN(minutos)) {
            alert('Some values are not numbers!!!');
            return;
        }
        var angulo = CalcAngle(horas, minutos);
        if (isNaN(angulo)) {
            alert('Some values are not numbers!!!');
            return;
        }
        var infoDegree = document.getElementById('degree_text');
        infoDegree.innerHTML = angulo;
        // console.log({
        //     horas: horas,
        //     minutos: minutos,
        //     Angulo: angulo
        // });
    }

};

function CalcAngle(hours, minutes) {
    /*
    Hour hand
    1 hour has 30 degrees => 360/12
    after 1 min, the hand has move 0.5 degrees
    30/60 => 0,5 degrees
    */
    var hour = 30;


    /*
    Minute hand, 1 min has 6 degrees
    */
    var min = 6;

    /*
    Consider how much the hour hand has moved after the minute hand starts moving
    */

    hours = hours > 12 ? parseInt(hours) - 12 : hours;

    var degreeHours = (parseInt(hours) * hour) + (0.5 * minutes);
    var degreeMinutes = parseInt(minutes) * min;

    if (hours > 0) {
        return Math.abs((degreeMinutes - degreeHours));
    }

    return degreeMinutes;
}