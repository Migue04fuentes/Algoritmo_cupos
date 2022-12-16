// Mandar hora al iniciar página
(function () {
    // Horas matutinas
    document.getElementById('hora1').value = "06:00";
    document.getElementById('hora2').value = "12:00";
    // Horas Jornada Vespertina
    document.getElementById('horat1').value = "13:00";
    document.getElementById('horat2').value = "17:00";
}());

// Solo números en los input
function solo_numeros(e) {
    let keys = e.key;
    return keys >= 0 && keys <= 9;
}


// input de cupos
let num = "";
let cupos = document.getElementById('cupos');
let cupos_valor = document.getElementById('cupos').value;

//input de intervalos
let intv = "";
let intervalos = document.getElementById('intervalos');
let interv_valor = document.getElementById('intervalos').valor;

//Cálculo de intervalos
function calcular_intervalos() {

    let checktime = document.getElementById('switch_label');
    console.log(checktime.checked);
    let morning_start = document.getElementById('hora1').value.split(':');
    let morning_end = document.getElementById('hora2').value.split(':');

    let h1 = new Date();
    let h2 = new Date();
    let ht = new Date();


    h1.setHours(morning_start[0], morning_start[1]);
    h2.setHours(morning_end[0], morning_end[1]);


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


// Admitir solo números y llamado de la funciona de cálculo de intervalos
cupos.addEventListener('keypress', function (valor) {
    if (!solo_numeros(valor)) {
        valor.preventDefault();
    }

    if (valor.key >= 0 && valor.key <= 9) {
        setTimeout(() => {
            num = document.getElementById('cupos').value;
            calcular_intervalos();
        }, 50);
    }
});

// Activar función al pegar en input cupos
cupos.addEventListener('paste',function(){
    setTimeout(()=>{
        num = parseInt(document.getElementById('cupos').value);
        if(Number.isNaN(num)){
            intv = "";
            num = '';
            cupos.innerHTML= "";
            cupos.value = "";
            intervalos.innertHTML = "";
            intervalos.value = "";
        }else{
            num += "";
            calcular_intervalos();
        }
    },50);
});


//Cálculo para cupos
function calcular_cupos() {
    let morning_start = document.getElementById('hora1').value.split(':');
    let morning_end = document.getElementById('hora2').value.split(':');

    let h1 = new Date();
    let h2 = new Date();
    let ht = new Date();


    h1.setHours(morning_start[0], morning_start[1]);
    h2.setHours(morning_end[0], morning_end[1]);


    ht.setHours(h2.getHours() - h1.getHours(), h2.getMinutes() - h1.getMinutes(), h2.getSeconds() - h1.getSeconds());
    let minutes = ((h2.getHours() - h1.getHours()) * 60) + h2.getMinutes() - h1.getMinutes();

    let totalcup = minutes / intv;
    num = totalcup + "";
    cupos.value = totalcup;


    let resultado = document.getElementById('resultado');
    resultado.innerHTML = (ht.getHours() ? ht.getHours() + (ht.getHours() > 1 ? " horas" : "hora") : "")
        + "" + (ht.getMinutes() ? ht.getMinutes() + (ht.getMinutes() > 1 ? " Minutos" : " Minuto") : "");
}

// Admitir solo números y llamado de la función de Cálculo de Cupos
intervalos.addEventListener('keypress', function (e) {

    if (!solo_numeros(e)) {
        e.preventDefault();
    }
    if (e.key >= 0 && e.key <= 9) {
        // intv += e.key;
        setTimeout(() => {
            intv = document.getElementById('intervalos').value;
            calcular_cupos();
        }, 50);
    }
});


//Activar función al pegar
intervalos.addEventListener('paste', function () {
    setTimeout(() => {
        intv = parseInt(document.getElementById('intervalos').value);
        if(Number.isNaN(intv)){
            intv = "";
            num = '';
            cupos.innerHTML= "";
            intervalos.innertHTML = "";
            intervalos.value = "";
        }else{
            calcular_cupos();
        }
    },50);
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
        if (num != "") {
            calcular_intervalos();
        }
    }
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
        if (intv != "") {
            calcular_cupos();
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
            if(Number.isNaN(intv) || intv == ""){
                intv = "";
                num = '';
                cupos.innerHTML= "";
                cupos.value = "";
                intervalos.innertHTML = "";
                intervalos.value = "";
            }else{
                intv += "";
                calcular_cupos();
            }
        },50);
    };
}
cupos.onkeydown = KeyPressCupo;

// función de control z en el input cupos
function KeyPressCupo(e){
    // var evtobj = window.event ? event : e
    if (e.keyCode == 90 && e.ctrlKey){
        setTimeout(()=>{
            num = parseInt(document.getElementById('cupos').value);
            if(Number.isNaN(num) || num == ""){
                intv = "";
                num = '';
                cupos.innerHTML= "";
                cupos.value = "";
                intervalos.innertHTML = "";
                intervalos.value = "";
            }else{
                num += "";
                calcular_intervalos();
            }
        },50);
    }
}
intervalos.onkeydown = KeyPressInt;


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