// VARIBLES
let turno_mat = document.getElementById("switch_label");
let turno_vesp = document.getElementById("switch_turno_vesp");

// HORAS TURNO MAÑANA
let mornings = document.getElementById("hora1");
let morninge = document.getElementById("hora2");
let morning_start = document.getElementById("hora1").value;
let morning_end = document.getElementById("hora2").value;

//  HORAS TURNO VESPERTINO
let afternoon_start = document.getElementById("horat1").value;
let afternoon_end = document.getElementById("horat2").value;

// input de cupos
let num = "";
let cupos = document.getElementById("cupos");
let cupos_valor = document.getElementById("cupos").value;

//input de intervalos
let intv = "";
let intervalos = document.getElementById("intervalos");
let interv_valor = document.getElementById("intervalos").value;

// Etiqueta de fulltime
let fulltime = document.getElementById("fulltime");

// Mandar hora al iniciar página
(function () {
  // Horas matutinas
  document.getElementById("hora1").value = "06:00";
  document.getElementById("hora2").value = "12:00";
  // Horas Jornada Vespertina
  document.getElementById("horat1").value = "13:00";
  document.getElementById("horat2").value = "17:00";

  // Hora Inicial para el cálculo de la hora final
  document.getElementById('horainicio').value = "06:00"

  // Activación de turnos
  turno_mat.checked = true;
  turno_vesp.checked = true;
})();

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
        document.getElementById("hora1").disabled = false;
        document.getElementById("hora2").disabled = false;
      } else {
        document.getElementById("hora1").disabled = true;
        document.getElementById("hora2").disabled = true;
      }
      break;
    case 2:
      if (turno_vesp.checked) {
        document.getElementById("horat1").disabled = false;
        document.getElementById("horat2").disabled = false;
      } else {
        document.getElementById("horat1").disabled = true;
        document.getElementById("horat2").disabled = true;
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
turno_mat.addEventListener("click", () => {
  setTimeout(() => {
    let valor = 1;
    activacion_turnos(valor);
  }, 10);
});

turno_vesp.addEventListener("click", () => {
  setTimeout(() => {
    let valor = 2;
    activacion_turnos(valor);
  });
});

//Cálculo de intervalos
function calcular_intervalos(hora1, hora2) {
  let horai = hora1.split(":");
  let horaf = hora2.split(":");

  let h1 = new Date();
  let h2 = new Date();
  let ht = new Date();

  h1.setHours(horai[0], horai[1]);
  h2.setHours(horaf[0], horaf[1]);

  ht.setHours(
    h2.getHours() - h1.getHours(),
    h2.getMinutes() - h1.getMinutes(),
    h2.getSeconds() - h1.getSeconds()
  );
  let minutes =
    (h2.getHours() - h1.getHours()) * 60 + h2.getMinutes() - h1.getMinutes();

  let totalint = minutes / num;
  intv = totalint + "";
  intervalos.value = totalint;

  let resultado = document.getElementById("resultado");
  resultado.innerHTML =
    "Total de horas: " +
    (ht.getHours()
      ? ht.getHours() + (ht.getHours() > 1 ? " horas" : "hora")
      : "") +
    "" +
    (ht.getMinutes()
      ? ht.getMinutes() + (ht.getMinutes() > 1 ? " Minutos" : " Minuto")
      : "") +
    "  Que es igual a= " +
    (minutes ? minutes + (minutes > 1 ? "Minutos" : "Minuto") : "");
}

// Cáculo de intervalos en los dos turno activos
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
  let minutes =
    (h2.getHours() - h1.getHours() + (h4.getHours() - h3.getHours())) * 60 +
    (h2.getMinutes() - h1.getMinutes() + (h4.getMinutes() - h3.getMinutes()));
  let total_int = minutes / num;
  intv = total_int + "";
  intervalos.value = total_int;
}

// Función calculos por jornada
function calcular_intervalos_jornada(valor) {

  if (turno_mat.checked && turno_vesp.checked) {
    if (valor.key >= 0 && valor.key <= 9) {
      setTimeout(() => {
        num = document.getElementById("cupos").value;
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_fulltime_intervalos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }, 50);
    }
  }
  if (turno_mat && turno_vesp.checked == false) {
    if (valor.key >= 0 && valor.key <= 9) {
      setTimeout(() => {
        num = document.getElementById("cupos").value;
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        calcular_intervalos(morning_start, morning_end);
      }, 50);
    }
  }
  if (turno_vesp && turno_mat.checked == false) {
    if (valor.key >= 0 && valor.key <= 9) {
      setTimeout(() => {
        num = document.getElementById("cupos").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_intervalos(afternoon_start, afternoon_end);
      }, 50);
    }
  }
}

// Admitir solo números y llamado de la funciona de cálculo de intervalos
cupos.addEventListener("keypress", function (valor) {
  if (cupos.id == 'cupos') {
    if (!solo_numeros(valor)) {
      valor.preventDefault();
    }
    if (valor.key >= 0 && valor.key <= 9) {
      calcular_intervalos_jornada(valor);
    }
  }
});

// Activar función al pegar en input cupos
cupos.addEventListener("paste", function () {
  setTimeout(() => {
    num = parseInt(document.getElementById("cupos").value);
    if (Number.isNaN(num)) {
      intv = "";
      num = "";
      cupos.innerHTML = "";
      cupos.value = "";
      intervalos.innertHTML = "";
      intervalos.value = "";
    } else {
      if (turno_mat.checked && turno_vesp.checked) {
        num += "";
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_fulltime_intervalos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
      if (turno_mat && turno_vesp.checked == false) {
        num += "";
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        calcular_intervalos(morning_start, morning_end);
      }
      if (turno_vesp && turno_mat.checked == false) {
        num += "";
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_intervalos(afternoon_start, afternoon_end);
      }
    }
  }, 50);
});

// Realizar Funciones al hacer DELETE
cupos.addEventListener("keyup", function (event) {
  if (event.key == "Backspace") {
    num = num.substring(0, num.length - 1);
    cupos_valor = document.getElementById("cupos").value;
    num = cupos_valor;
    if (cupos_valor == "") {
      intervalos.innerHTML = "";
      intervalos.value = "";
      num = "";
      intv = "";
    }
    if (num != "" && turno_mat.checked && turno_vesp.checked) {
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_fulltime_intervalos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }
    if (num != "" && turno_mat && turno_vesp.checked == false) {
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      calcular_intervalos(morning_start, morning_end);
    }
    if (num != "" && turno_vesp && turno_mat.checked == false) {
      let morning_start = document.getElementById("horat1").value;
      let morning_end = document.getElementById("horat2").value;
      calcular_intervalos(morning_start, morning_end);
    }
  }
});

// función de control z en el input cupos
function KeyPressCupo(e) {
  // var evtobj = window.event ? event : e
  if (e.keyCode == 90 && e.ctrlKey) {
    setTimeout(() => {
      num = parseInt(document.getElementById("cupos").value);
      if (Number.isNaN(num) || num == "") {
        intv = "";
        num = "";
        cupos.innerHTML = "";
        cupos.value = "";
        intervalos.innertHTML = "";
        intervalos.value = "";
      } else {
        if (turno_mat.checked && turno_vesp.checked) {
          num += "";
          let morning_start = document.getElementById("hora1").value;
          let morning_end = document.getElementById("hora2").value;
          let afternoon_start = document.getElementById("horat1").value;
          let afternoon_end = document.getElementById("horat2").value;
          calcular_fulltime_intervalos(
            morning_start,
            morning_end,
            afternoon_start,
            afternoon_end
          );
        }
        if (turno_mat && turno_vesp.checked == false) {
          num += "";
          let morning_start = document.getElementById("hora1").value;
          let morning_end = document.getElementById("hora2").value;
          calcular_intervalos(morning_start, morning_end);
        }
        if (turno_vesp && turno_mat.checked == false) {
          num += "";
          let morning_start = document.getElementById("horat1").value;
          let morning_end = document.getElementById("horat2").value;
          calcular_intervalos(morning_start, morning_end);
        }
      }
    }, 50);
  }
  if (e.keyCode == 13) {
    cupos_valor = document.getElementById("cupos").value;
    if (cupos_valor != "" && turno_mat.checked == false) {
      num = document.getElementById("cupos").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_intervalos(afternoon_start, afternoon_end);
    } else if (cupos_valor != "" && turno_vesp.checked == false) {
      num = document.getElementById("cupos").value;
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      calcular_intervalos(morning_start, morning_end);
    } else if (cupos_valor != "" && turno_mat.checked && turno_vesp.checked) {
      num = document.getElementById("cupos").value;
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_fulltime_intervalos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }
  }
}
intervalos.onkeydown = KeyPressInt;

//CALCULAR CUPOS
function calcular_cupos(hora1, hora2) {
  let horai = hora1.split(":");
  let horaf = hora2.split(":");

  let h1 = new Date();
  let h2 = new Date();
  let ht = new Date();

  h1.setHours(horai[0], horai[1]);
  h2.setHours(horaf[0], horaf[1]);

  ht.setHours(
    h2.getHours() - h1.getHours(),
    h2.getMinutes() - h1.getMinutes(),
    h2.getSeconds() - h1.getSeconds()
  );
  let minutes =
    (h2.getHours() - h1.getHours()) * 60 + h2.getMinutes() - h1.getMinutes();

  let totalcup = minutes / intv;
  num = totalcup + "";
  cupos.value = totalcup;

  let resultado = document.getElementById("resultado");
  resultado.innerHTML =
    (ht.getHours()
      ? ht.getHours() + (ht.getHours() > 1 ? " horas" : "hora")
      : "") +
    "" +
    (ht.getMinutes()
      ? ht.getMinutes() + (ht.getMinutes() > 1 ? " Minutos" : " Minuto")
      : "");
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
  let minutes =
    (h2.getHours() - h1.getHours() + (h4.getHours() - h3.getHours())) * 60 +
    (h2.getMinutes() - h1.getMinutes() + (h4.getMinutes() - h3.getMinutes()));
  let total_cupos = minutes / intv;
  num = total_cupos + "";
  cupos.value = total_cupos;
}

// Admitir solo números y llamado de la función de Cálculo de Cupos
intervalos.addEventListener("keypress", function (e) {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (turno_mat && turno_vesp) {
    if (e.key >= 0 && e.key <= 9) {
      setTimeout(() => {
        intv = document.getElementById("intervalos").value;
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_fulltime_cupos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }, 50);
    }
  }
  if (turno_mat && turno_vesp.checked == false) {
    if (e.key >= 0 && e.key <= 9) {
      setTimeout(() => {
        intv = document.getElementById("intervalos").value;
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        calcular_cupos(morning_start, morning_end);
      }, 50);
    }
  }
  if (turno_vesp && turno_mat.checked == false) {
    if (e.key >= 0 && e.key <= 9) {
      setTimeout(() => {
        intv = document.getElementById("intervalos").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_cupos(afternoon_start, afternoon_end);
      }, 50);
    }
  }
});

//Activar función al pegar
intervalos.addEventListener("paste", function () {
  setTimeout(() => {
    intv = parseInt(document.getElementById("intervalos").value);
    if (Number.isNaN(intv)) {
      intv = "";
      num = "";
      cupos.innerHTML = "";
      intervalos.innertHTML = "";
      intervalos.value = "";
    } else {
      if (turno_mat.checked && turno_vesp.checked) {
        intv += "";
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_fulltime_cupos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
      if (turno_mat && turno_vesp.checked == false) {
        intv += "";
        let morning_start = document.getElementById("hora1").value;
        let morning_end = document.getElementById("hora2").value;
        calcular_cupos(morning_start, morning_end);
      }
      if (turno_vesp && turno_mat.checked == false) {
        intv += "";
        let afternoon_start = document.getElementById("horat1").value;
        let afternoon_end = document.getElementById("horat2").value;
        calcular_cupos(afternoon_start, afternoon_end);
      }
    }
  }, 50);
});

// DELETE en intervalos
intervalos.addEventListener("keyup", function (event) {
  if (event.key == "Backspace") {
    intv = intv.substring(0, intv.length - 1);
    interv_valor = document.getElementById("intervalos").value;
    intv = interv_valor;
    if (interv_valor == "") {
      cupos.innerHTML = "";
      cupos.value = "";
      intv = "";
      num = "";
    }
    if (intv != "" && turno_mat.checked && turno_vesp.checked) {
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_fulltime_cupos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }
    if (intv != "" && turno_mat && turno_vesp.checked == false) {
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      calcular_cupos(morning_start, morning_end);
    }
    if (intv != "" && turno_vesp && turno_mat.checked == false) {
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_cupos(afternoon_start, afternoon_end);
    }
  }
});

// función de control z en el input intervalos
function KeyPressInt(e) {
  if (e.keyCode == 90 && e.ctrlKey) {
    setTimeout(() => {
      intv = parseInt(document.getElementById("intervalos").value);
      if (Number.isNaN(intv) || intv == "") {
        intv = "";
        num = "";
        cupos.innerHTML = "";
        cupos.value = "";
        intervalos.innertHTML = "";
        intervalos.value = "";
      } else {
        if (turno_mat.checked && turno_vesp.checked) {
          intv += "";
          let morning_start = document.getElementById("hora1").value;
          let morning_end = document.getElementById("hora2").value;
          let afternoon_start = document.getElementById("horat1").value;
          let afternoon_end = document.getElementById("horat2").value;
          calcular_fulltime_cupos(
            morning_start,
            morning_end,
            afternoon_start,
            afternoon_end
          );
        }
        if (turno_mat && turno_vesp.checked == false) {
          intv += "";
          let morning_start = document.getElementById("hora1").value;
          let morning_end = document.getElementById("hora2").value;
          calcular_cupos(morning_start, morning_end);
        }
        if (turno_vesp && turno_mat.checked == false) {
          intv += "";
          let afternoon_start = document.getElementById("horat1").value;
          let afternoon_end = document.getElementById("horat2").value;
          calcular_cupos(afternoon_start, afternoon_end);
        }
      }
    }, 50);
  }
  if (e.keyCode == 13) {
    cupos_valor = document.getElementById("cupos").value;
    if (cupos_valor != "" && turno_mat.checked == false) {
      num = document.getElementById("cupos").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_cupos(afternoon_start, afternoon_end);
    } else if (cupos_valor != "" && turno_vesp.checked == false) {
      num = document.getElementById("cupos").value;
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      calcular_cupos(morning_start, morning_end);
    } else if (cupos_valor != "" && turno_mat.checked && turno_vesp.checked) {
      num = document.getElementById("cupos").value;
      let morning_start = document.getElementById("hora1").value;
      let morning_end = document.getElementById("hora2").value;
      let afternoon_start = document.getElementById("horat1").value;
      let afternoon_end = document.getElementById("horat2").value;
      calcular_fulltime_cupos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }
  }
}
cupos.onkeydown = KeyPressCupo;

// CÁLCULO DE HORA FINAL

// variables horas
let hora_inicio_valor = document.getElementById('horainicio').value;
let hora_inicio = document.getElementById('horainicio');
let hora_final_valor = document.getElementById('horafinal').value;
let hora_final = document.getElementById('horafinal');
//  variables input
let input_cupos_valor = document.getElementById('cuposhf').value;
let input_cupos = document.getElementById('cuposhf');
let input_intervalos_valor = document.getElementById('intervaloshf').value;
let input_intervalos = document.getElementById('intervaloshf');

// botó aceptar
let btn_hora_final = document.getElementById('btn_hora_final');


// CÁLCULOS POR CAMBIOS DE HORA
// hora inicio turno mañana
function cal_hora_final(horai, cupos, interv) {
  let horahf = horai.split(":");
  let cuposhf = cupos;
  let intervhf = interv;

  let hi = new Date();
  let hf = new Date();

  hi.setHours(horahf[0], horahf[1]);

  let minutes = cuposhf * intervhf;

  hf.setHours(hi.getHours(), hi.getMinutes());
  hf.setMinutes(hf.getMinutes() + minutes);
 
  let hour = `${hf.getHours()}`;
  let minute = `${hf.getMinutes()}`;
  hora_final.value = (hour ? hour <= 9  ? `0${hour}:`: `${hour}:` : "")+(minute ? minute <= 9  ? `0${minute}`: minute : "");
}

// Calcular al hacer cambios en hora inicio
hora_inicio.addEventListener('change', () => {
  input_cupos_valor = document.getElementById('cuposhf').value;
  input_intervalos_valor = document.getElementById('intervaloshf').value;
  hora_inicio_valor = document.getElementById('horainicio').value;
  if (input_cupos_valor && input_intervalos_valor) {
    cal_hora_final(hora_inicio_valor, input_cupos_valor, input_intervalos_valor);
  }
});


// Calcular la digitar en el input cupos
input_cupos.addEventListener('keypress', function(e){
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    input_cupos_valor = document.getElementById('cuposhf').value;
    input_intervalos_valor = document.getElementById('intervaloshf').value;
    hora_inicio_valor = document.getElementById('horainicio').value;
    if (input_cupos_valor && input_intervalos_valor) {
      cal_hora_final(hora_inicio_valor, input_cupos_valor, input_intervalos_valor);
    }
  }
});

input_cupos.addEventListener('paste', function(){
  setTimeout(() => {
    input_cupos_valor = parseInt(document.getElementById('cuposhf').value);
    if(Number.isNaN(input_cupos_valor)){
      input_cupos.value = ""
      input_intervalos.value = "";
    }else{
      input_intervalos_valor = document.getElementById('intervaloshf').value;
      hora_inicio_valor = document.getElementById('horainicio').value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(hora_inicio_valor, input_cupos_valor, input_intervalos_valor);
      }
    }
  },10);
});

// Calcular al digitar en el input intervalos
input_intervalos.addEventListener('keypress', (e) => {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    setTimeout(() => {
      input_cupos_valor = document.getElementById('cuposhf').value;
      input_intervalos_valor = document.getElementById('intervaloshf').value;
      hora_inicio_valor = document.getElementById('horainicio').value;
      console.log(input_intervalos_valor);
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(hora_inicio_valor, input_cupos_valor, input_intervalos_valor);
      }
    }, 10);
  }
});

// Calcular al pegar en input intervalos
input_intervalos.addEventListener('paste', function(){
  setTimeout(() => {
    input_cupos_valor = parseInt(document.getElementById('cuposhf').value);
    if(Number.isNaN(input_cupos_valor)){
      input_cupos.value = ""
      input_intervalos.value = "";
    }else{
      input_intervalos_valor = document.getElementById('intervaloshf').value;
      hora_inicio_valor = document.getElementById('horainicio').value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(hora_inicio_valor, input_cupos_valor, input_intervalos_valor);
      }
    }
  },10);
});



// limpiiar al cerrar modal
let clear_modal = document.getElementById('close');
clear_modal.addEventListener('click', ()=>{
  input_cupos.value = "";
  input_intervalos.value = "";
  hora_inicio.value = "06:00";
  hora_final.value = "--:--";
})

function validar_jornada(hora){
  let horajr = hora.split(':');
  if(horajr[0] >= "00" && horajr[0] <= "11"){
    return 1;
  }
  if(horajr[0] >= "12" && horajr[0] <= "23"){
    return 2;
  }
}

// Botón aceptar del modal calcular hora final
btn_hora_final.addEventListener('click', ()=>{
  hora_inicio_valor = document.getElementById('horainicio').value;
  hora_final_valor = document.getElementById('horafinal').value;
  input_cupos_valor = document.getElementById('cuposhf').value;
  input_intervalos_valor = document.getElementById('intervaloshf').value;

  if(hora_inicio_valor && hora_final_valor && input_cupos_valor && input_intervalos_valor){
     console.log(validar_jornada(hora_inicio_valor));
  }
});


mornings.addEventListener('change', () => {
  console.log('Se ha detectado un cambio him');
});

// Hora final turno mañana
morninge.addEventListener('change', () => {
  console.log('Se ha detectado un cambio hfm');
});

