function CalcAngle(hours, minutes) {
    //Indicamos que 1 hora posee 30 grados
    var hour = 30;
    //1 min tiene 2 grados
    var min = 2;

    hours = hours > 12 ? parseInt(hours) - 12 : hours;

    var degreeHours = parseInt(hours) * hour;
    var degreeMinutes = parseInt(minutes) * min;

    if (hours > 0) {
        return (degreeMinutes - degreeHours);
    }

    return degreeMinutes;
}