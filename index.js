let switche;
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

// inputs turno mañana
let cupos_morning = document.getElementById('cupos_morning');
let intv_morning = document.getElementById('intv_morning');
// Mandar hora al iniciar página
(function () {
  // Desactivar Calculo doble
  check_hf.checked = false;

  // Horas matutinas
  mornings.value = "06:00";
  morninge.value = "12:00";
  // Horas Jornada Vespertina
  afternoons.value = "14:00";
  afternoone.value = "18:00";

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
  cupos_morning.value = "";
  intv_morning.value = "";
  if (check_hf.checked) {
    morninge.disabled = true;
    morninge.value = "";
    afternoone.disabled = true;
    afternoone.value = "";
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
          cupos_morning.disabled = false;
          intv_morning.disabled = false;
        } else {
          mornings.disabled = false;
          morninge.disabled = false;
          cupos_morning.disabled = false;
          intv_morning.disabled = false;
        }
      } else {
        mornings.disabled = true;
        morninge.disabled = true;
        cupos_morning.disabled = true;
        intv_morning.disabled = true;
      }
      break;
    case 2:
      if (turno_vesp.checked) {
        if (check_hf.checked) {
          afternoons.disabled = false;
          afternoone.disabled = true;
          cupos.disabled = false;
          intervalos.disabled = false;
        } else {
          afternoons.disabled = false;
          afternoone.disabled = false;
          cupos.disabled = false;
          intervalos.disabled = false;
        }
      } else {
        afternoons.disabled = true;
        afternoone.disabled = true;
        cupos.disabled = true;
        intervalos.disabled = true;
      }
      break;
    default:
      break;
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
function calcular_intervalos(hora1, hora2, switche) {
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
  if (switche === 1) {
    intv_morning.value = totalint;
  } else {
    intervalos.value = totalint;
  }
}


// Función calculos intervalos por jornada
function calcular_intervalos_jornada(switche) {

  if (switche === 1) {
    setTimeout(() => {
      num = cupos_morning.value;
      morning_start = document.getElementById("hora1").value;
      morning_end = document.getElementById("hora2").value;
      calcular_intervalos(morning_start, morning_end, switche);
    }, 50);
  }
  if (switche === 2) {
    setTimeout(() => {
      num = document.getElementById("cupos").value;
      afternoon_start = document.getElementById("horat1").value;
      afternoon_end = document.getElementById("horat2").value;
      calcular_intervalos(afternoon_start, afternoon_end);
    }, 50);
  }
}

// jornada calculo hora final
function jornada_hora_final(switche) {
  if (switche === 1) {
    setTimeout(() => {
      let cuposhf = cupos_morning.value;
      let intervhf = intv_morning.value;
      if (cuposhf && intervhf) {
        calcular_hora_final(cuposhf, intervhf, morninge)
      }
    }, 5);
  } else if (switche === 2) {
    setTimeout(() => {
      let cuposhf = cupos.value;
      let intervhf = intervalos.value;
      if (cuposhf && intervhf) {
        calcular_hora_final(cuposhf, intervhf, afternoone)
      }
    }, 5);
  }
}

// Calculos de hora final
function calcular_hora_final(cuposhf, intervhf, jornada) {
  let horams = mornings.value;
  let horats = afternoons.value;
  setTimeout(() => {
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

// Calcular intervalos Jornada Vespertina
cupos.addEventListener("keypress", function (valor) {
  if (!solo_numeros(valor)) {
    valor.preventDefault();
  }
  if (valor.key >= 0 && valor.key <= 9) {
    switche = 2;
    check_hf.checked ? jornada_hora_final(switche) : calcular_intervalos_jornada(switche);
  }
});

// Calcular intervalos Jornada Matutina
cupos_morning.addEventListener('keypress', (event) => {
  if (!solo_numeros(event)) {
    event.preventDefault();
  }
  if (event.key >= 0 && event.key <= 9) {
    switche = 1;
    check_hf.checked ? jornada_hora_final(switche) : calcular_intervalos_jornada(switche);
  }
});

//Calcular cupos Jornada Vespertina
intervalos.addEventListener("keypress", function (e) {
  if (!solo_numeros(e)) {
    e.preventDefault();
  }
  if (e.key >= 0 && e.key <= 9) {
    switche = 2;
    check_hf.checked ? jornada_hora_final(switche) : calular_cupos_jornada(switche);
  }
});

// Calcular cupos Jornada Matutina
intv_morning.addEventListener('keypress', (event) => {
  if (!solo_numeros(event)) {
    event.preventDefault();
  }
  if (event.key >= 0 && event.key <= 9) {
    switche = 1;
    check_hf.checked ? jornada_hora_final(switche) : calular_cupos_jornada(switche);
  }
})

// Calcular al pegar Jornada Vespertina
cupos.addEventListener("paste", function () {
  setTimeout(() => {
    switche = 2;
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
        num += "";
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_intervalos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(num)) {
        cupos.value = "";
      } else {
        jornada_hora_final(switche);
      }
    }
  }, 5);
});

// Calcular al pegar Jornada Matutina
cupos_morning.addEventListener("paste", function () {
  setTimeout(() => {
    switche = 1;
    num = parseInt(document.getElementById("cupos_morning").value);
    if (!check_hf.checked) {
      if (Number.isNaN(num)) {
        intv = "";
        num = "";
        cupos_morning.value = "";
        intv_morning.value = "";
      } else {
        num += "";
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_intervalos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(num)) {
        cupos_morning.value = "";
      } else {
        jornada_hora_final(switche);
      }
    }
  }, 5);
});

//Calcular al presionar delete Jornada Vespertina
cupos.addEventListener("keyup", function (event) {
  switche = 2;
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
      if (num != "") {
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_intervalos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      let cupo = document.getElementById("cupos").value;
      cupo ? jornada_hora_final(switche) : afternoone.value = "";
    }
  }
});

//Calcular al presionar delete Jornada Matutina
cupos_morning.addEventListener("keyup", function (event) {
  switche = 1;
  if (event.key == "Backspace") {
    if (!check_hf.checked) {
      num = num.substring(0, num.length - 1);
      cupos_valor = document.getElementById("cupos_morning").value;
      num = cupos_valor;
      if (cupos_valor == "") {
        intv_morning.value = "";
        num = "";
        intv = "";
      }
      if (num != "") {
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_intervalos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      let cupo = document.getElementById("cupos_morning").value;
      cupo
        ? jornada_hora_final(switche)
        : morninge.value = "";
    }
  }
});

//Calcular al presionar control+z Jornada Vespertina
function KeyPressCupo(e) {
  switche = 2;
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
          num += "";
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_intervalos(afternoon_start, afternoon_end, switche);
        }
      }, 50);
    } else if (check_hf.checked) {
      setTimeout(() => {
        cupos.value
          ? jornada_hora_final(switche) : afternoone.value = "";
      }, 1);
    }
  }
  // Calcular al dar enter
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos").value;
      if (cupos_valor != "") {
        num = document.getElementById("cupos").value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_intervalos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      jornada_hora_final(switche);
    }
  }
}
cupos.onkeydown = KeyPressCupo;

// Calcular al Presinar en cupos Jornada Matutina
function KeyPressCupojm(e) {
  //Control+z
  switche = 1;
  if (e.keyCode == 90 && e.ctrlKey) {
    if (!check_hf.checked) {
      setTimeout(() => {
        num = parseInt(document.getElementById("cupos_morning").value);
        if (Number.isNaN(num) || num == "") {
          intv = "";
          num = "";
          cupos_morning.value = "";
          intv_morning.value = "";
        } else {
          num += "";
          morning_start = mornings.value;
          morning_end = morninge.value;
          calcular_intervalos(morning_start, morning_end, switche);
        }
      }, 1);
    } else if (check_hf.checked) {
      setTimeout(() => {
        cupos_morning.value
          ? jornada_hora_final(switche)
          : morninge.value = "";
      }, 1);
    }
  }
  //Enter
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos_morning").value;
      if (cupos_valor != "") {
        num = document.getElementById("cupos_morning").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_intervalos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      jornada_hora_final(switche);
    }
  }
}
cupos_morning.onkeydown = KeyPressCupojm;



//CALCULAR CUPOS
function calcular_cupos(hora1, hora2, switche) {
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
  if (switche === 1) {
    cupos_morning.value = totalcup;
  } else if (switche === 2) {
    cupos.value = totalcup;
  }
}

// Calcular cupos por jornada
function calular_cupos_jornada(switche) {
  if (switche === 1) {
    setTimeout(() => {
      intv = document.getElementById("intv_morning").value;
      morning_start = mornings.value;
      morning_end = morninge.value;
      calcular_cupos(morning_start, morning_end, switche);
    }, 50);
  }
  if (switche === 2) {
    setTimeout(() => {
      intv = document.getElementById("intervalos").value;
      afternoon_start = afternoons.value;
      afternoon_end = afternoone.value;
      calcular_cupos(afternoon_start, afternoon_end, switche);
    }, 50);
  }
}


//Calcular cupos al pegar Jornada Matutina
intv_morning.addEventListener("paste", function () {
  switche = 1;
  setTimeout(() => {
    intv = parseInt(document.getElementById("intv_morning").value);
    if (!check_hf.checked) {
      if (Number.isNaN(intv)) {
        intv = "";
        num = "";
        cupos_morning.value = "";
        intv_morning.value = "";
      } else {
        intv += "";
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_cupos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(intv)) {
        intervalos.value = "";
      } else {
        jornada_hora_final(switche);
      }
    }
  }, 5);
});

//Calcular cupos al pegar Jornada Vespertina
intervalos.addEventListener("paste", function () {
  switche = 2;
  setTimeout(() => {
    intv = parseInt(document.getElementById("intervalos").value);
    if (!check_hf.checked) {
      if (Number.isNaN(intv)) {
        intv = "";
        num = "";
        cupos.value = "";
        intervalos.innertHTML = "";
        intervalos.value = "";
      } else {
        intv += "";
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_cupos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      if (Number.isNaN(intv)) {
        intervalos.value = "";
      } else {
        jornada_hora_final(switche);
      }
    }
  }, 5);
});

//Presionar Delete Jornada Matutina
intv_morning.addEventListener("keyup", function (event) {
  switche = 1;
  if (event.key == "Backspace") {
    if (!check_hf.checked) {
      intv = intv.substring(0, intv.length - 1);
      interv_valor = document.getElementById("intv_morning").value;
      intv = interv_valor;
      if (interv_valor == "") {
        cupos_morning.value = "";
        intv = "";
        num = "";
      }
      if (intv != "") {
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_cupos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      let intv_delete = document.getElementById("intv_morning").value;
      intv_delete
        ? jornada_hora_final(switche)
        : morninge.value = "";
    }
  }
});

//Presinar Delete Jornada Vespertina
intervalos.addEventListener("keyup", function (event) {
  switche = 2;
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
      if (intv != "") {
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_cupos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      let intv_delete = document.getElementById("intervalos").value;
      intv_delete
        ? jornada_hora_final(switche)
        : afternoone.value = "";
    }
  }
});

//Presionar control+z Jornada Matutina
function KeyPressIntjm(e) {
  switche = 1;
  if (e.keyCode == 90 && e.ctrlKey) {
    if (!check_hf.checked) {
      setTimeout(() => {
        intv = parseInt(document.getElementById("intv_morning").value);
        if (Number.isNaN(intv) || intv == "") {
          intv = "";
          num = "";
          cupos_morning.value = "";
          intv_morning.value = "";
        } else {
          intv += "";
          morning_start = mornings.value;
          morning_end = morninge.value;
          calcular_cupos(morning_start, morning_end, switche);
        }
      }, 50);
    } else if (check_hf.checked) {
      setTimeout(() => {
        intervalos.value
          ? jornada_hora_final(switche)
          : morninge.value = "";
      }, 1);
    }
  }
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos_morning").value;
      if (cupos_valor != "") {
        num = document.getElementById("cupos_morning").value;
        morning_start = mornings.value;
        morning_end = morninge.value;
        calcular_cupos(morning_start, morning_end, switche);
      }
    } else if (check_hf.checked) {
      jornada_hora_final(switche);
    }
  }
}
intv_morning.onkeydown = KeyPressIntjm;

//Presionar control+z Jornada Vespertina
function KeyPressInt(e) {
  switche = 2;
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
          intv += "";
          afternoon_start = afternoons.value;
          afternoon_end = afternoone.value;
          calcular_cupos(afternoon_start, afternoon_end, switche);
        }
      }, 50);
    } else if (check_hf.checked) {
      setTimeout(() => {
        intervalos.value
          ? jornada_hora_final(switche)
          : afternoone.value = "";
      }, 1);
    }
  }
  if (e.keyCode == 13) {
    if (!check_hf.checked) {
      cupos_valor = document.getElementById("cupos").value;
      if (cupos_valor != "") {
        switche = 2;
        num = document.getElementById("cupos").value;
        afternoon_start = afternoons.value;
        afternoon_end = afternoone.value;
        calcular_cupos(afternoon_start, afternoon_end, switche);
      }
    } else if (check_hf.checked) {
      jornada_hora_final(switche);
    }
  }
}
intervalos.onkeydown = KeyPressInt;