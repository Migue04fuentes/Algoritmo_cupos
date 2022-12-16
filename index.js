// VARIBLES
let turno_mat = document.getElementById('switch_label');
let turno_vesp = document.getElementById('switch_turno_vesp');

// HORAS TURNO MAÑANA
let morning_start = document.getElementById('hora1').value;
let morning_end = document.getElementById('hora2').value;

// input de cupos
let num = "";
let cupos = document.getElementById('cupos');
let cupos_valor = document.getElementById('cupos').value;

//input de intervalos
let intv = "";
let intervalos = document.getElementById('intervalos');
let interv_valor = document.getElementById('intervalos').value;

// Etiqueta de fulltime
let fulltime = document.getElementById('fulltime');

// Mandar hora al iniciar página
(function () {
    // Horas matutinas
    document.getElementById('hora1').value = "06:00";
    document.getElementById('hora2').value = "12:00";
    // Horas Jornada Vespertina
    document.getElementById('horat1').value = "13:00";
    document.getElementById('horat2').value = "17:00";

    // Activación de turnos
    turno_mat.checked = true;
    turno_vesp.checked = true;

}());

// Solo números en los input
function solo_numeros(e) {
    let keys = e.key;
    return keys >= 0 && keys <= 9;
}

// Disabled & Enabled inputs 
function activacion_turnos(valor) {
    switch (valor) {
        case 1:
            if (turno_mat.checked) {
                document.getElementById('hora1').disabled = false;
                document.getElementById('hora2').disabled = false;
            } else {
                document.getElementById('hora1').disabled = true;
                document.getElementById('hora2').disabled = true;
            }
            break;
        case 2:
            if (turno_vesp.checked) {
                document.getElementById('horat1').disabled = false;
                document.getElementById('horat2').disabled = false;
            } else {
                document.getElementById('horat1').disabled = true;
                document.getElementById('horat2').disabled = true;
            }
            break;
        default:
            break;
    }
    if (turno_mat.checked == false && turno_vesp.checked == false) {
        cupos.disabled = true;
        intervalos.disabled = true;
    } else {
        cupos.disabled = false;
        intervalos.disabled = false;
    }
}

// Activación de turnos
turno_mat.addEventListener('click', () => {
    setTimeout(() => {
        let valor = 1;
        activacion_turnos(valor);
    }, 10);
});

turno_vesp.addEventListener('click', () => {
    setTimeout(() => {
        let valor = 2;
        activacion_turnos(valor);
    });
});



//Cálculo de intervalos
function calcular_intervalos(hora1, hora2) {


    let horai = hora1.split(':');
    let horaf = hora2.split(':');

    let h1 = new Date();
    let h2 = new Date();
    let ht = new Date();


    h1.setHours(horai[0], horai[1]);
    h2.setHours(horaf[0], horaf[1]);


    ht.setHours(h2.getHours() - h1.getHours(), h2.getMinutes() - h1.getMinutes(), h2.getSeconds() - h1.getSeconds());
    let minutes = ((h2.getHours() - h1.getHours()) * 60) + h2.getMinutes() - h1.getMinutes();

    let totalint = minutes / num;
    intv = totalint + "";
    intervalos.value = totalint;


    let resultado = document.getElementById('resultado');
    resultado.innerHTML = "Total de horas: " + (ht.getHours() ? ht.getHours() + (ht.getHours() > 1 ? " horas" : "hora") : "")
        + "" + (ht.getMinutes() ? ht.getMinutes() + (ht.getMinutes() > 1 ? " Minutos" : " Minuto") : "")
        + "  Que es igual a= " + (minutes ? minutes + (minutes > 1 ? "Minutos" : "Minuto") : "");
}

function calcular_fulltime_intervalos(hr1, hr2, hr3, hr4) {
    let horai = hr1.split(":");
    let horaf = hr2.split(":");
    let horati = hr3.split(":");
    let horatf = hr4.split(":");

    let h1 = new Date();
    let h2 = new Date();
    let h3 = new Date();
    let h4 = new Date();
    let ht = new Date();

    h1.setHours(horai[0], horai[1]);
    h2.setHours(horaf[0], horaf[1]);
    h3.setHours(horati[0], horati[1]);
    h4.setHours(horatf[0], horatf[1]);

    ht.setHours(h2.getHours() - h1.getHours(), h2.getMinutes() - h1.getMinutes());
    let minutes = (((h2.getHours() - h1.getHours()) + (h4.getHours() - h3.getHours())) * 60) + ((h2.getMinutes() - h1.getMinutes()) + (h4.getMinutes() - h3.getMinutes()));
    let total_int = minutes / num;
    intv = total_int + "";
    intervalos.value = total_int;
}


// Admitir solo números y llamado de la funciona de cálculo de intervalos
cupos.addEventListener('keypress', function (valor) {

    if (!solo_numeros(valor)) {
        valor.preventDefault();
    }
    if (turno_mat.checked && turno_vesp.checked) {
        if (valor.key >= 0 && valor.key <= 9) {
            setTimeout(() => {
                num = document.getElementById('cupos').value;
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_fulltime_intervalos(morning_start, morning_end, afternoon_start, afternoon_end);
            }, 50);
        }
    }
    if (turno_mat && turno_vesp.checked == false) {
        if (valor.key >= 0 && valor.key <= 9) {
            setTimeout(() => {
                num = document.getElementById('cupos').value;
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                calcular_intervalos(morning_start, morning_end);
            }, 50);
        }
    }
    if (turno_vesp && turno_mat.checked == false) {
        if (valor.key >= 0 && valor.key <= 9) {
            setTimeout(() => {
                num = document.getElementById('cupos').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_intervalos(afternoon_start, afternoon_end);
            }, 50);
        }
    }
});

// Activar función al pegar en input cupos
cupos.addEventListener('paste', function () {
    setTimeout(() => {
        num = parseInt(document.getElementById('cupos').value);
        if (Number.isNaN(num)) {
            intv = "";
            num = '';
            cupos.innerHTML = "";
            cupos.value = "";
            intervalos.innertHTML = "";
            intervalos.value = "";
        } else {
            if (turno_mat.checked && turno_vesp.checked) {
                num += "";
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_fulltime_intervalos(morning_start, morning_end, afternoon_start, afternoon_end);
            }
            if (turno_mat && turno_vesp.checked == false) {
                num += "";
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                calcular_intervalos(morning_start, morning_end);
            }
            if (turno_vesp && turno_mat.checked == false) {
                num += "";
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_intervalos(afternoon_start, afternoon_end);
            }
        }
    }, 50);
});


// Realizar Funciones al hacer DELETE
cupos.addEventListener('keyup', function (event) {
    if (event.key == "Backspace") {
        num = num.substring(0, num.length - 1);
        cupos_valor = document.getElementById('cupos').value;
        num = cupos_valor;
        if (cupos_valor == "") {
            intervalos.innerHTML = "";
            intervalos.value = "";
            num = "";
            intv = "";
        }
        if (num != "" && turno_mat.checked && turno_vesp.checked) {
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            let afternoon_start = document.getElementById('horat1').value;
            let afternoon_end = document.getElementById('horat2').value;
            calcular_fulltime_intervalos(morning_start, morning_end, afternoon_start, afternoon_end);
        }
        if (num != "" && turno_mat && turno_vesp.checked == false) {
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            calcular_intervalos(morning_start, morning_end);
        }
        if (num != "" && turno_vesp && turno_mat.checked == false) {
            let morning_start = document.getElementById('horat1').value;
            let morning_end = document.getElementById('horat2').value;
            calcular_intervalos(morning_start, morning_end);
        }
    }
});

// función de control z en el input cupos
function KeyPressCupo(e) {
    // var evtobj = window.event ? event : e
    if (e.keyCode == 90 && e.ctrlKey) {
        setTimeout(() => {
            num = parseInt(document.getElementById('cupos').value);
            if (Number.isNaN(num) || num == "") {
                intv = "";
                num = '';
                cupos.innerHTML = "";
                cupos.value = "";
                intervalos.innertHTML = "";
                intervalos.value = "";
            } else {
                if (turno_mat.checked && turno_vesp.checked) {
                    num += "";
                    let morning_start = document.getElementById('hora1').value;
                    let morning_end = document.getElementById('hora2').value;
                    let afternoon_start = document.getElementById('horat1').value;
                    let afternoon_end = document.getElementById('horat2').value;
                    calcular_fulltime_intervalos(morning_start, morning_end, afternoon_start, afternoon_end);
                }
                if (turno_mat && turno_vesp.checked == false) {
                    num += "";
                    let morning_start = document.getElementById('hora1').value;
                    let morning_end = document.getElementById('hora2').value;
                    calcular_intervalos(morning_start, morning_end);
                }
                if (turno_vesp && turno_mat.checked == false) {
                    num += "";
                    let morning_start = document.getElementById('horat1').value;
                    let morning_end = document.getElementById('horat2').value;
                    calcular_intervalos(morning_start, morning_end);
                }
            }
        }, 50);
    }
    if (e.keyCode == 13) {
        cupos_valor = document.getElementById('cupos').value;
        if (cupos_valor != "" && turno_mat.checked == false) {
            num = document.getElementById('cupos').value;
            let afternoon_start = document.getElementById('horat1').value;
            let afternoon_end = document.getElementById('horat2').value;
            calcular_intervalos(afternoon_start, afternoon_end);
        }else if (cupos_valor != "" && turno_vesp.checked == false) {
            num = document.getElementById('cupos').value;
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            calcular_intervalos(morning_start, morning_end);
        }else if (cupos_valor != "" && turno_mat.checked && turno_vesp.checked) {
            num = document.getElementById('cupos').value;
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            let afternoon_start = document.getElementById('horat1').value;
            let afternoon_end = document.getElementById('horat2').value;
            calcular_fulltime_intervalos(morning_start, morning_end, afternoon_start, afternoon_end);
        }
    }
}
intervalos.onkeydown = KeyPressInt;


//CALCULAR CUPOS
function calcular_cupos(hora1, hora2) {
    let horai = hora1.split(':');
    let horaf = hora2.split(':');

    let h1 = new Date();
    let h2 = new Date();
    let ht = new Date();


    h1.setHours(horai[0], horai[1]);
    h2.setHours(horaf[0], horaf[1]);


    ht.setHours(h2.getHours() - h1.getHours(), h2.getMinutes() - h1.getMinutes(), h2.getSeconds() - h1.getSeconds());
    let minutes = ((h2.getHours() - h1.getHours()) * 60) + h2.getMinutes() - h1.getMinutes();

    let totalcup = minutes / intv;
    num = totalcup + "";
    cupos.value = totalcup;


    let resultado = document.getElementById('resultado');
    resultado.innerHTML = (ht.getHours() ? ht.getHours() + (ht.getHours() > 1 ? " horas" : "hora") : "")
        + "" + (ht.getMinutes() ? ht.getMinutes() + (ht.getMinutes() > 1 ? " Minutos" : " Minuto") : "");
}


// Cálculos fulltime de cupos
function calcular_fulltime_cupos(hr1, hr2, hr3, hr4) {

    let horai = hr1.split(":");
    let horaf = hr2.split(":");
    let horati = hr3.split(":");
    let horatf = hr4.split(":");

    let h1 = new Date();
    let h2 = new Date();
    let h3 = new Date();
    let h4 = new Date();
    let ht = new Date();

    h1.setHours(horai[0], horai[1]);
    h2.setHours(horaf[0], horaf[1]);
    h3.setHours(horati[0], horati[1]);
    h4.setHours(horatf[0], horatf[1]);

    ht.setHours(h2.getHours() - h1.getHours(), h2.getMinutes() - h1.getMinutes());
    let minutes = (((h2.getHours() - h1.getHours()) + (h4.getHours() - h3.getHours())) * 60) + ((h2.getMinutes() - h1.getMinutes()) + (h4.getMinutes() - h3.getMinutes()));
    let total_cupos = minutes / intv;
    num = total_cupos + "";
    cupos.value = total_cupos;
}

// Admitir solo números y llamado de la función de Cálculo de Cupos
intervalos.addEventListener('keypress', function (e) {

    if (!solo_numeros(e)) {
        e.preventDefault();
    }
    if (turno_mat && turno_vesp) {
        if (e.key >= 0 && e.key <= 9) {
            setTimeout(() => {
                intv = document.getElementById('intervalos').value;
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_fulltime_cupos(morning_start, morning_end, afternoon_start, afternoon_end);
            }, 50);
        }
    }
    if (turno_mat && turno_vesp.checked == false) {
        if (e.key >= 0 && e.key <= 9) {
            setTimeout(() => {
                intv = document.getElementById('intervalos').value;
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                calcular_cupos(morning_start, morning_end);
            }, 50);
        }
    }
    if (turno_vesp && turno_mat.checked == false) {
        if (e.key >= 0 && e.key <= 9) {
            setTimeout(() => {
                intv = document.getElementById('intervalos').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_cupos(afternoon_start, afternoon_end);
            }, 50);
        }
    }
});


//Activar función al pegar
intervalos.addEventListener('paste', function () {
    setTimeout(() => {
        intv = parseInt(document.getElementById('intervalos').value);
        if (Number.isNaN(intv)) {
            intv = "";
            num = '';
            cupos.innerHTML = "";
            intervalos.innertHTML = "";
            intervalos.value = "";
        } else {
            if (turno_mat.checked && turno_vesp.checked) {
                intv += "";
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_fulltime_cupos(morning_start, morning_end, afternoon_start, afternoon_end);
            }
            if (turno_mat && turno_vesp.checked == false) {
                intv += "";
                let morning_start = document.getElementById('hora1').value;
                let morning_end = document.getElementById('hora2').value;
                calcular_cupos(morning_start, morning_end);
            }
            if (turno_vesp && turno_mat.checked == false) {
                intv += "";
                let afternoon_start = document.getElementById('horat1').value;
                let afternoon_end = document.getElementById('horat2').value;
                calcular_cupos(afternoon_start, afternoon_end);
            }
        }
    }, 50);
});



// DELETE en intervalos 
intervalos.addEventListener('keyup', function (event) {
    if (event.key == "Backspace") {
        intv = intv.substring(0, intv.length - 1);
        interv_valor = document.getElementById('intervalos').value;
        intv = interv_valor;
        if (interv_valor == "") {
            cupos.innerHTML = "";
            cupos.value = "";
            intv = "";
            num = "";
        }
        if (intv != "" && turno_mat.checked && turno_vesp.checked) {
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            let afternoon_start = document.getElementById('horat1').value;
            let afternoon_end = document.getElementById('horat2').value;
            calcular_fulltime_cupos(morning_start, morning_end, afternoon_start, afternoon_end);
        }
        if (intv != "" && turno_mat && turno_vesp.checked == false) {
            let morning_start = document.getElementById('hora1').value;
            let morning_end = document.getElementById('hora2').value;
            calcular_cupos(morning_start, morning_end);
        }
        if (intv != "" && turno_vesp && turno_mat.checked == false) {
            let afternoon_start = document.getElementById('horat1').value;
            let afternoon_end = document.getElementById('horat2').value;
            calcular_cupos(afternoon_start, afternoon_end);
        }
    }
});


// función de control z en el input intervalos 
function KeyPressInt(e) {
    // var evtobj = window.evt? evt : e
    // console.log(evtobj);
    if (e.keyCode == 90 && e.ctrlKey) {
        setTimeout(() => {
            intv = parseInt(document.getElementById('intervalos').value);
            if (Number.isNaN(intv) || intv == "") {
                intv = "";
                num = '';
                cupos.innerHTML = "";
                cupos.value = "";
                intervalos.innertHTML = "";
                intervalos.value = "";
            } else {
                if (turno_mat.checked && turno_vesp.checked) {
                    intv += "";
                    let morning_start = document.getElementById('hora1').value;
                    let morning_end = document.getElementById('hora2').value;
                    let afternoon_start = document.getElementById('horat1').value;
                    let afternoon_end = document.getElementById('horat2').value;
                    calcular_fulltime_cupos(morning_start, morning_end, afternoon_start, afternoon_end);
                }
                if (turno_mat && turno_vesp.checked == false) {
                    intv += "";
                    let morning_start = document.getElementById('hora1').value;
                    let morning_end = document.getElementById('hora2').value;
                    calcular_cupos(morning_start, morning_end);
                }
                if (turno_vesp && turno_mat.checked == false) {
                    intv += "";
                    let afternoon_start = document.getElementById('horat1').value;
                    let afternoon_end = document.getElementById('horat2').value;
                    calcular_cupos(afternoon_start, afternoon_end);
                }
            }
        }, 50);
    };
}
cupos.onkeydown = KeyPressCupo;

/* 

var hora1 = ("04:29:01").split(":"),
    hora2 = ("03:28:56").split(":"),
    t1 = new Date(),
    t2 = new Date();

t1.setHours(hora1[0], hora1[1], hora1[2]);
t2.setHours(hora2[0], hora2[1], hora2[2]);
console.log(t1);
//Aquí hago la resta
t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
//Imprimo el resultado
// let resultado = document.getElementById('resultado');
resultado.innerHTML += "\n La diferencia es de: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : ""); */