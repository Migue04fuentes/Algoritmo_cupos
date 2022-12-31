// VARIBLES
let turno_mat = document.getElementById("switch_label");
let turno_vesp = document.getElementById("switch_turno_vesp");

// HORAS TURNO MAÑANA
let mornings = document.getElementById("hora1");
let morninge = document.getElementById("hora2");
let morning_start;
let morning_end;

//  HORAS TURNO VESPERTINO
let afternoons = document.getElementById("horat1");
let afternoone = document.getElementById("horat2");
let afternoon_start;
let afternoon_end;

// input de cupos
let num = "";
let cupos = document.getElementById("cupos");
let cupos_valor;

//input de intervalos
let intv = "";
let intervalos = document.getElementById("intervalos");
let interv_valor;

// Etiqueta de fulltime
let fulltime = document.getElementById("fulltime");

// Check para realizar cálculo hora final
let check_hf = document.getElementById("check_hf");

// Mandar hora al iniciar página
(function () {
  // Desacticvar Calculo doble
  check_hf.checked = false;

  // Horas matutinas
  mornings.value = "06:00";
  morninge.value = "12:00";
  // Horas Jornada Vespertina
  afternoons.value = "14:00";
  afternoone.value = "18:00";

  // Hora Inicial para el cálculo de la hora final
  document.getElementById("horainicio").value = "06:00";

  // Activación de turnos
  turno_mat.checked = true;
  turno_vesp.checked = true;

  //Input vacios
  cupos.value = "";
  intervalos.value = "";
})();

// Solo números en los input
function solo_numeros(e) {
  let keys = e.key;
  return keys >= 0 && keys <= 9;
}

// Disabled & Enabled check hora final
check_hf.addEventListener("click", () => {
  cupos.value = "";
  intervalos.value = "";
  if (check_hf.checked) {
    morninge.disabled = true;
    morninge.value = "";
    afternoone.disabled = true;
    afternoone.value = "";
    turno_vesp.checked = false;
    afternoons.disabled = true;
  } else if (!check_hf.checked) {
    turno_mat.checked
      ? ((morninge.disabled = false),
        morninge.value == "" ? (morninge.value = "12:00") : "")
      : (morninge.disabled = true),
      morninge.value == ""
        ? (morninge.value = "12:00")
        : morninge.value == ""
        ? (morninge.value = "12:00")
        : "";
    turno_vesp.checked
      ? ((afternoone.disabled = false),
        afternoone.value == "" ? (afternoone.value = "18:00") : "")
      : (afternoone.disabled = true),
      afternoone.value == ""
        ? (afternoone.value = "18:00")
        : afternoone.value == ""
        ? (afternoone.value = "18:00")
        : "";
  }
});

// Disabled & Enabled inputs
function activacion_turnos(valor) {
  switch (valor) {
    case 1:
      if (turno_mat.checked) {
        if (check_hf.checked) {
          morninge.disabled = true;
          mornings.disabled = false;
        } else {
          mornings.disabled = false;
          morninge.disabled = false;
        }
      } else {
        mornings.disabled = true;
        morninge.disabled = true;
      }
      break;
    case 2:
      if (turno_vesp.checked) {
        if (check_hf.checked) {
          afternoons.disabled = false;
          afternoone.disabled = true;
        } else {
          afternoons.disabled = false;
          afternoone.disabled = false;
        }
      } else {
        afternoons.disabled = true;
        afternoone.disabled = true;
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
  totalint += "";
  totalint.length > 4 ? (totalint = totalint.slice(0, 4)) : "";
  intv = totalint + "";
  intervalos.value = totalint;
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
  total_int += "";
  total_int.length > 4 ? (total_int = total_int.slice(0, 4)) : "";
  intv = total_int + "";
  intervalos.value = total_int;
}

// Función calculos intervalos por jornada
function calcular_intervalos_jornada() {
  if (turno_mat.checked && turno_vesp.checked) {
    setTimeout(() => {
      num = document.getElementById("cupos").value;
      morning_start = mornings.value;
      morning_end = morninge.value;
      afternoon_start = afternoons.value;
      afternoon_end = afternoone.value;
      calcular_fulltime_intervalos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }, 50);
  }
  if (turno_mat && turno_vesp.checked == false) {
    setTimeout(() => {
      num = document.getElementById("cupos").value;
      morning_start = document.getElementById("hora1").value;
      morning_end = document.getElementById("hora2").value;
      calcular_intervalos(morning_start, morning_end);
    }, 50);
  }
  if (turno_vesp && turno_mat.checked == false) {
    setTimeout(() => {
      num = document.getElementById("cupos").value;
      afternoon_start = document.getElementById("horat1").value;
      afternoon_end = document.getElementById("horat2").value;
      calcular_intervalos(afternoon_start, afternoon_end);
    }, 50);
  }
}

// jornada calculo hora final
function jornada_hora_final() {
  setTimeout(() => {
    let cuposhf = cupos.value;
    let intervhf = intervalos.value;
    if (cuposhf && intervhf) {
      turno_mat.checked && !turno_vesp.checked
        ? calcular_hora_final(morninge)
        : !turno_mat.checked && turno_vesp.checked
        ? calcular_hora_final(afternoone)
        : turno_mat.checked && turno_vesp.checked
        ? calcular_hf_fulltime()
        : "";
    }
  }, 5);
}

// Calculos de hora final
function calcular_hora_final(jornada) {
  let horams = mornings.value;
  let horats = afternoons.value;
  setTimeout(() => {
    let cuposhf = cupos.value;
    let intervhf = intervalos.value;
    let horacal;
    let hora_final;
    if (jornada.id == "hora2") {
      horacal = horams;
      hora_final = morninge;
    }
    if (jornada.id == "horat2") {
      horacal = horats;
      hora_final = afternoone;
    }

    let horahf = horacal.split(":");

    let hi = new Date();
    let hf = new Date();

    hi.setHours(horahf[0], horahf[1]);

    let minutes = cuposhf * intervhf;

    hf.setHours(hi.getHours(), hi.getMinutes());
    hf.setMinutes(hf.getMinutes() + minutes);

    let hour = `${hf.getHours()}`;
    let minute = `${hf.getMinutes()}`;
    hora_final.value =
      (hour ? (hour <= 9 ? `0${hour}:` : `${hour}:`) : "") +
      (minute ? (minute <= 9 ? `0${minute}` : minute) : "");
  }, 5);
}

function calcular_hf_fulltime() {
  console.log("Debe calcular uno a la vez.");
}

// Admitir solo números y llamado de la funciona de cálculo de intervalos
cupos.addEventListener("keypress", function (valor) {
  if (!solo_numeros(valor)) {
    valor.preventDefault();
  }
  if (valor.key >= 0 && valor.key <= 9) {
    check_hf.checked ? jornada_hora_final() : calcular_intervalos_jornada();
  }
});

// Activar función al pegar en input cupos
cupos.addEventListener("paste", function () {
  setTimeout(() => {
    num = parseInt(document.getElementById("cupos").value);
    if (!check_hf.checked) {
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
          morning_start = mornings.value;
          morning_end = morninge.value;
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_fulltime_intervalos(
            morning_start,
            morning_end,
            afternoon_start,
            afternoon_end
          );
        }
        if (turno_mat && turno_vesp.checked == false) {
          num += "";
          morning_start = mornings.value;
          morning_end = morninge.value;
          calcular_intervalos(morning_start, morning_end);
        }
        if (turno_vesp && turno_mat.checked == false) {
          num += "";
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_intervalos(afternoon_start, afternoon_end);
        }
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(num)) {
        cupos.value = "";
      } else {
        jornada_hora_final();
      }
    }
  }, 5);
});

//DELETE en cupos
cupos.addEventListener("keyup", function (event) {
  if (event.key == "Backspace") {
    if (!check_hf.checked) {
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
        morning_start = mornings.value;
        morning_end = morninge.value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_fulltime_intervalos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
      if (num != "" && turno_mat && turno_vesp.checked == false) {
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_intervalos(morning_start, morning_end);
      }
      if (num != "" && turno_vesp && turno_mat.checked == false) {
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_intervalos(afternoon_start, afternoon_end);
      }
    } else if (check_hf.checked) {
      let cupo = document.getElementById("cupos").value;
      cupo
        ? jornada_hora_final()
        : turno_mat.checked
        ? (morninge.value = "")
        : turno_vesp.checked
        ? (afternoone.value = "")
        : "";
    }
  }
});

// función de control z en el input cupos
function KeyPressCupo(e) {
  // var evtobj = window.event ? event : e
  if (e.keyCode == 90 && e.ctrlKey) {
    if (!check_hf.checked) {
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
            morning_start = mornings.value;
            morning_end = morninge.value;
            afternoon_start = afternoons.value;
            afternoon_end = afternoone.value;
            calcular_fulltime_intervalos(
              morning_start,
              morning_end,
              afternoon_start,
              afternoon_end
            );
          }
          if (turno_mat && turno_vesp.checked == false) {
            num += "";
            morning_start = mornings.value;
            morning_end = morninge.value;
            calcular_intervalos(morning_start, morning_end);
          }
          if (turno_vesp && turno_mat.checked == false) {
            num += "";
            afternoon_start = afternoons.value;
            afternoon_end = afternoone.value;
            calcular_intervalos(afternoon_start, afternoon_end);
          }
        }
      }, 50);
    } else if (check_hf.checked) {
      setTimeout(() => {
        cupos.value
          ? jornada_hora_final()
          : turno_mat.checked
          ? (morninge.value = "")
          : turno_vesp.checked
          ? (afternoone.value = "")
          : "";
      }, 1);
    }
  }
  // Calcular al dar enter
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos").value;
      if (cupos_valor != "" && turno_mat.checked == false) {
        num = document.getElementById("cupos").value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_intervalos(afternoon_start, afternoon_end);
      } else if (cupos_valor != "" && turno_vesp.checked == false) {
        num = document.getElementById("cupos").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_intervalos(morning_start, morning_end);
      } else if (cupos_valor != "" && turno_mat.checked && turno_vesp.checked) {
        num = document.getElementById("cupos").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        afternoon_start = afternoons.value;
        let afternoon_end = afternoone.value;
        calcular_fulltime_intervalos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
    } else if (check_hf.checked) {
      jornada_hora_final();
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
  totalcup += "";
  totalcup.length > 4 ? (totalcup = totalcup.slice(0, 4)) : "";
  num = totalcup + "";
  cupos.value = totalcup;
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
  total_cupos += "";
  total_cupos.length > 4 ? (total_cupos = total_cupos.slice(0, 4)) : "";
  num = total_cupos + "";
  cupos.value = total_cupos;
}

// Calcular cupos por jornada
function calular_cupos_jornada() {
  if (turno_mat && turno_vesp) {
    setTimeout(() => {
      intv = document.getElementById("intervalos").value;
      morning_start = mornings.value;
      morning_end = morninge.value;
      afternoon_start = afternoons.value;
      afternoon_end = afternoone.value;
      calcular_fulltime_cupos(
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end
      );
    }, 50);
  }
  if (turno_mat && turno_vesp.checked == false) {
    setTimeout(() => {
      intv = document.getElementById("intervalos").value;
      morning_start = mornings.value;
      morning_end = morninge.value;
      calcular_cupos(morning_start, morning_end);
    }, 50);
  }
  if (turno_vesp && turno_mat.checked == false) {
    setTimeout(() => {
      intv = document.getElementById("intervalos").value;
      afternoon_start = afternoons.value;
      afternoon_end = afternoone.value;
      calcular_cupos(afternoon_start, afternoon_end);
    }, 50);
  }
}

// Admitir solo números y llamado de la función de Cálculo de Cupos
intervalos.addEventListener("keypress", function (e) {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    check_hf.checked ? jornada_hora_final() : calular_cupos_jornada();
  }
});

//Activar función al pegar
intervalos.addEventListener("paste", function () {
  setTimeout(() => {
    intv = parseInt(document.getElementById("intervalos").value);
    if (!check_hf.checked) {
      if (Number.isNaN(intv)) {
        intv = "";
        num = "";
        cupos.innerHTML = "";
        intervalos.innertHTML = "";
        intervalos.value = "";
      } else {
        if (turno_mat.checked && turno_vesp.checked) {
          intv += "";
          morning_start = mornings.value;
          morning_end = morninge.value;
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_fulltime_cupos(
            morning_start,
            morning_end,
            afternoon_start,
            afternoon_end
          );
        }
        if (turno_mat && turno_vesp.checked == false) {
          intv += "";
          morning_start = mornings.value;
          morning_end = morninge.value;
          calcular_cupos(morning_start, morning_end);
        }
        if (turno_vesp && turno_mat.checked == false) {
          intv += "";
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_cupos(afternoon_start, afternoon_end);
        }
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(intv)) {
        intervalos.value = "";
      } else {
        jornada_hora_final();
      }
    }
  }, 5);
});

// DELETE en intervalos
intervalos.addEventListener("keyup", function (event) {
  if (event.key == "Backspace") {
    if (!check_hf.checked) {
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
        morning_start = mornings.value;
        morning_end = morninge.value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_fulltime_cupos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
      if (intv != "" && turno_mat && turno_vesp.checked == false) {
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_cupos(morning_start, morning_end);
      }
      if (intv != "" && turno_vesp && turno_mat.checked == false) {
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_cupos(afternoon_start, afternoon_end);
      }
    } else if (check_hf.checked) {
      let intv_delete = document.getElementById("intervalos").value;
      intv_delete
        ? jornada_hora_final()
        : turno_mat.checked
        ? (morninge.value = "")
        : turno_vesp.checked
        ? (afternoone.value = "")
        : "";
    }
  }
});

// función de control z en el input intervalos
function KeyPressInt(e) {
  if (e.keyCode == 90 && e.ctrlKey) {
    if (!check_hf.checked) {
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
            morning_start = mornings.value;
            morning_end = morninge.value;
            afternoon_start = afternoons.value;
            afternoon_end = afternoone.value;
            calcular_fulltime_cupos(
              morning_start,
              morning_end,
              afternoon_start,
              afternoon_end
            );
          }
          if (turno_mat && turno_vesp.checked == false) {
            intv += "";
            morning_start = mornings.value;
            morning_end = morninge.value;
            calcular_cupos(morning_start, morning_end);
          }
          if (turno_vesp && turno_mat.checked == false) {
            intv += "";
            afternoon_start = afternoons.value;
            afternoon_end = afternoone.value;
            calcular_cupos(afternoon_start, afternoon_end);
          }
        }
      }, 50);
    } else if (check_hf.checked) {
      setTimeout(() => {
        intervalos.value
          ? jornada_hora_final()
          : turno_mat.checked
          ? (morninge.value = "")
          : turno_vesp.checked
          ? (afternoone.value = "")
          : "";
      }, 1);
    }
  }
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos").value;
      if (cupos_valor != "" && turno_mat.checked == false) {
        num = document.getElementById("cupos").value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_cupos(afternoon_start, afternoon_end);
      } else if (cupos_valor != "" && turno_vesp.checked == false) {
        num = document.getElementById("cupos").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_cupos(morning_start, morning_end);
      } else if (cupos_valor != "" && turno_mat.checked && turno_vesp.checked) {
        num = document.getElementById("cupos").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_fulltime_cupos(
          morning_start,
          morning_end,
          afternoon_start,
          afternoon_end
        );
      }
    } else if (check_hf.checked) {
      jornada_hora_final();
    }
  }
}
cupos.onkeydown = KeyPressCupo;

// CÁLCULO DE HORA FINAL MODAL

// variables horas
let hora_inicio_valor;
let hora_inicio = document.getElementById("horainicio");
let hora_final_valor = document.getElementById("horafinal").value;
let hora_final = document.getElementById("horafinal");
//  variables input
let input_cupos_valor;
let input_cupos = document.getElementById("cuposhf");
let input_intervalos_valor;
let input_intervalos = document.getElementById("intervaloshf");

// botó aceptar
let btn_hora_final = document.getElementById("btn_hora_final");

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
  hora_final.value =
    (hour ? (hour <= 9 ? `0${hour}:` : `${hour}:`) : "") +
    (minute ? (minute <= 9 ? `0${minute}` : minute) : "");
}

// Calcular al hacer cambios en hora inicio
hora_inicio.addEventListener("change", () => {
  input_cupos_valor = input_cupos.value;
  input_intervalos_valor = input_intervalos.value;
  hora_inicio_valor = hora_inicio.value;
  if (input_cupos_valor && input_intervalos_valor) {
    cal_hora_final(
      hora_inicio_valor,
      input_cupos_valor,
      input_intervalos_valor
    );
  }
});

// Calcular la digitar en el input cupos
input_cupos.addEventListener("keypress", function (e) {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    setTimeout(() => {
      input_cupos_valor = input_cupos.value;
      input_intervalos_valor = input_intervalos.value;
      hora_inicio_valor = hora_inicio.value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    }, 10);
  }
});

// Calcular hora final al hacer delete en input cupos
input_cupos.addEventListener("keyup", (e) => {
  if (e.key == "Backspace") {
    input_cupos_valor = document.getElementById("cuposhf").value;
    if (input_cupos_valor != "") {
      input_intervalos_valor = input_intervalos.value;
      hora_inicio_valor = document.getElementById("horainicio").value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    } else {
      hora_final.value = "";
    }
  }
});

// Calcular al pegar en el input cupos
input_cupos.addEventListener("paste", function () {
  setTimeout(() => {
    input_cupos_valor = parseInt(document.getElementById("cuposhf").value);
    if (Number.isNaN(input_cupos_valor)) {
      input_cupos.value = "";
      input_intervalos.value = "";
    } else {
      input_intervalos_valor = input_intervalos.value;
      hora_inicio_valor = document.getElementById("horainicio").value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    }
  }, 10);
});

// Calcular al digitar en el input intervalos
input_intervalos.addEventListener("keypress", (e) => {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    setTimeout(() => {
      input_cupos_valor = document.getElementById("cuposhf").value;
      input_intervalos_valor = input_intervalos.value;
      hora_inicio_valor = document.getElementById("horainicio").value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    }, 10);
  }
});

// Calcular al pegar en input intervalos
input_intervalos.addEventListener("paste", function () {
  setTimeout(() => {
    input_cupos_valor = parseInt(document.getElementById("cuposhf").value);
    if (Number.isNaN(input_cupos_valor)) {
      input_cupos.value = "";
      input_intervalos.value = "";
    } else {
      input_intervalos_valor = input_intervalos.value;
      hora_inicio_valor = document.getElementById("horainicio").value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    }
  }, 10);
});

// Calcular hora final al hacer delete en input Intervalos
input_intervalos.addEventListener("keyup", (e) => {
  if (e.key == "Backspace") {
    input_intervalos_valor = input_intervalos.value;
    if (input_intervalos_valor != "") {
      input_cupos_valor = document.getElementById("cuposhf").value;
      hora_inicio_valor = document.getElementById("horainicio").value;
      if (input_cupos_valor && input_intervalos_valor) {
        cal_hora_final(
          hora_inicio_valor,
          input_cupos_valor,
          input_intervalos_valor
        );
      }
    } else {
      hora_final.value = "";
    }
  }
});

// limpiiar al cerrar modal
let clear_modal = document.getElementById("close");
clear_modal.addEventListener("click", () => {
  input_cupos.value = "";
  input_intervalos.value = "";
  hora_inicio.value = "06:00";
  hora_final.value = "--:--";
});

// Redireccionar si la jornada es matutina o vespertina
function validar_jornada(hora) {
  let horajr = hora.split(":");
  if (horajr[0] >= "00" && horajr[0] <= "11") {
    return 1;
  }
  if (horajr[0] >= "12" && horajr[0] <= "23") {
    return 2;
  }
}

// Botón aceptar del modal calcular hora final
btn_hora_final.addEventListener("click", () => {
  hora_inicio_valor = document.getElementById("horainicio").value;
  hora_final_valor = document.getElementById("horafinal").value;
  input_cupos_valor = document.getElementById("cuposhf").value;
  input_intervalos_valor = input_intervalos.value;

  if (
    hora_inicio_valor &&
    hora_final_valor &&
    input_cupos_valor &&
    input_intervalos_valor
  ) {
    console.log(validar_jornada(hora_inicio_valor));
  }
});

mornings.addEventListener("change", () => {
  console.log("Se ha detectado un cambio him");
});

// Hora final turno mañana
morninge.addEventListener("change", () => {
  console.log("Se ha detectado un cambio hfm");
});
