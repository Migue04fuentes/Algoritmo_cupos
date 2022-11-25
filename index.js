let morning_start = document.getElementById('hora1').value.split(':');
let morning_end = document.getElementById('hora2').value.split(':');

let h1 = new Date();
let h2 = new Date();
let ht = new Date();


h1.setHours(morning_start[0],morning_start[1]);
h2.setHours(morning_end[0],morning_end[1]);


ht.setHours(h2.getHours()-h1.getHours(),h2.getMinutes()-h1.getMinutes(),h2.getSeconds()-h1.getSeconds());
let minutes = ((h2.getHours()-h1.getHours())*60)+h2.getMinutes()-h1.getMinutes();

let resultado = document.getElementById('resultado');
resultado.innerHTML = "Total de horas: " + (ht.getHours() ? ht.getHours() + (ht.getHours() > 1 ? " horas":"hora"): "") +"" +(ht.getMinutes() ? ht.getMinutes()+(ht.getMinutes() > 1 ? " Minutos":" Minuto"): "");


let cupos = document.getElementById('cupos');
cupos.addEventListener('keyup', function(valor){

      minutes *=valor.key;
      console.log(minutes);
      document.getElementById('intervalos').value = minutes;

})


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
resultado.innerHTML += "\n La diferencia es de: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : "");