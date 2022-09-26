console.log("app.js agregado");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA8Mg_-Eo3owNriQEuE6DMQPSbqMVlJvtI",
  authDomain: "cajadiaria-4746a.firebaseapp.com",
  projectId: "cajadiaria-4746a",
});

var db = firebase.firestore();

//Agregar Ventas
function guardar(rubro) {
  var fecha = new Date();
  if (rubro == "Libreria") {
    var detalle = document.getElementById("txtDetalleLibreria").value;
    var contado = document.getElementById("txtContadoLibreria").value;
    var debito = document.getElementById("txtDebitoLibreria").value;
    var credito = document.getElementById("txtCreditoLibreria").value;
  } else {
    var detalle = document.getElementById("txtDetalleInformatica").value;
    var contado = document.getElementById("txtContadoInformatica").value;
    var debito = document.getElementById("txtDebitoInformatica").value;
    var credito = document.getElementById("txtCreditoInformatica").value;
  }

  //var fecha = document.getElementById("fecha").value
  db.collection("ventas")
    .add({
      //.add agrega un id automatico
      rubro: rubro,
      fecha: fecha,
      detalle: detalle,
      contado: contado,
      debito: debito,
      credito: credito,
    })
    .then((docRef) => {
      limpiarTxt();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

////******** GUARDAR AL PRECIONAR ENTER **********/////
// obtenemos el elemento donde vamos a agregar al listener
var inputLibreria = document.getElementById("grupoLibreria");
// Execute a function when the user releases a key on the keyboard
inputLibreria.addEventListener("keyup", function (KeyboardEvent) {
  //console.log("Apretaste enter " + KeyboardEvent.key)
  if (KeyboardEvent.key === "Enter") {
    // Cancel the default action, if needed
    //console.log("Apretaste enter " + KeyboardEvent.key)
    KeyboardEvent.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnGuardarLibreria").click();
  }
});
var inputLibreria = document.getElementById("grupoInformatica");
// Execute a function when the user releases a key on the keyboard
inputLibreria.addEventListener("keyup", function (KeyboardEvent) {
  //console.log("Apretaste enter " + KeyboardEvent.key)
  if (KeyboardEvent.key === "Enter") {
    // Cancel the default action, if needed
    //console.log("Apretaste enter " + KeyboardEvent.key)
    KeyboardEvent.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnGuardarInformatica").click();
  }
});


//today.getFullYear(),(today.getMonth()+1),today.getDate()
var txtFecha = (document.getElementById("txtFecha").valueAsDate = new Date()); //ponemos la fecha al txtDAte del form
//var today = new Date(); //obtenemos la fecha de hoy
//obtenemos la fecha del txtDate del form
var fechaParaFiltrar = new Date(
  txtFecha.getFullYear(),
  txtFecha.getMonth(),
  txtFecha.getDate()
); //asignamos solamente la fecha

//console.log(hoy + "SIIIII")
//const expirationDate = admin.firestore.Timestamp.fromDate(hoy);
//const query = collectionRef.where('startTime', '<=', hoy)
//Leer documentos

var tabla = document.getElementById("tabla");

db.collection("ventas")
  .where("fecha", ">=", fechaParaFiltrar)
  .orderBy("fecha", "desc")
  .onSnapshot((querySnapshot) => {
    //db.collection("ventas").orderBy("fecha").onSnapshot((querySnapshot) => { //se unsa onSnapshot() en lugar de get() para q actualice en tiempo real
    tabla.innerHTML = "";
    totalLibreriaContado = 0;
    var totalLibreriaDebito = 0;
    var totalLibreriaCredito = 0;
    var totalInformaticaContado = 0;
    var totalInformaticaDebito = 0;
    var totalInformaticaCredito = 0;
    var cliente = querySnapshot.docs.length
    var clienteLib= 0
    var clienteInf = 0
    querySnapshot.forEach((doc) => {
      
      //console.log(`${doc.id} => ${doc.data()}`);

      tabla.innerHTML += `
        <tr ${doc.data().rubro=='Libreria' ? 'class="table-success"' : 'class="table-primary"'}>
        <th scope="row">${doc.data().rubro}</th>
        <td>${doc.data().detalle}</td>
        <td>${doc.data().contado}</td>
        <td>${doc.data().debito}</td>
        <td>${doc.data().credito}</td>
        <td>${doc.data().fecha.toDate().toLocaleString()}</td>
        <td><button class="btn btn-danger pb-1 mb-1" onclick="eliminar('${
          doc.id
        }')"><i class="fa fa-trash-alt" aria-hidden="true"></i></button>
        <button class="btn btn-success pb-1 mb-1" onclick="editar('${
          doc.id
        }','${doc.data().rubro}','${doc.data().detalle}','${
        doc.data().contado
      }','${doc.data().debito}','${doc.data().credito}')"><i class="fa fa-pencil-alt" aria-hidden="true"></i></button></td>
        <td>${cliente--}</td>
        </tr>`;

      rubro = doc.data().rubro;

      if (rubro == "Libreria") {
        //console.log(typeof((doc.data().contado) | 0))
        //console.log(doc.data().contado)
        totalLibreriaContado =
          Number(totalLibreriaContado) + Number(doc.data().contado);
        //console.log(totalLibreriaContado)
        totalLibreriaDebito =
          Number(totalLibreriaDebito) + Number(doc.data().debito);
        totalLibreriaCredito =
          Number(totalLibreriaCredito) + Number(doc.data().credito);
        clienteLib++
      }
      if (rubro == "Informatica") {
        console.log(totalInformaticaDebito);
        totalInformaticaContado =
          Number(totalInformaticaContado) + Number(doc.data().contado);
        totalInformaticaDebito =
          Number(totalInformaticaDebito) + Number(doc.data().debito);
        totalInformaticaCredito =
          Number(totalInformaticaCredito) + Number(doc.data().credito);
        clienteInf++
      }
    });
    tabla.innerHTML += `
      
      <tr class="table-light">
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr class="table-dark">
          <th></th>
          <th></th>
          <th>Contado</th>
          <th>Debito</th>
          <th>Credito</th>
          <th></th>
          <th></th>
          <th></th>
      </tr>
        <tr class="table-success">
            <th>SubTotales  </th>
            <th>LIBRERIA</th>
            <th>$ ${totalLibreriaContado} </th>
            <th>$ ${totalLibreriaDebito} </th>
            <th>$ ${totalLibreriaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalLibreriaContado + totalLibreriaDebito + totalLibreriaCredito}</th>
            <th>${clienteLib}</th>
        </tr>        
        <tr class="table-primary">
            <th>SubTotales  </th>
            <th>INFORMATICA</th>
            <th>$ ${totalInformaticaContado} </th>
            <th>$ ${totalInformaticaDebito} </th>
            <th>$ ${totalInformaticaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalInformaticaContado + totalInformaticaDebito + totalInformaticaCredito} </th>
            <th>${clienteInf}</th>
        </tr>`;
  });

// Filtrar por fecha:
function filtrarPorFecha() {
  var tabla = document.getElementById("tabla");
  var txtFechaSeleccionada = document.getElementById("txtFecha").valueAsDate;
  var fechaDesde = new Date(
    txtFechaSeleccionada.getFullYear(),
    txtFechaSeleccionada.getMonth(),
    txtFechaSeleccionada.getDate() + 1
  );
  var fechaHasta = new Date(
    txtFechaSeleccionada.getFullYear(),
    txtFechaSeleccionada.getMonth(),
    txtFechaSeleccionada.getDate() + 2
  );
  console.log("Fecha seleccionada: " + fechaDesde);

  db.collection("ventas")
    .where("fecha", ">=", fechaDesde)
    .where("fecha", "<", fechaHasta)
    .orderBy("fecha", "desc")
    .onSnapshot((querySnapshot) => {
      //db.collection("ventas").orderBy("fecha").onSnapshot((querySnapshot) => { //se unsa onSnapshot() en lugar de get() para q actualice en tiempo real
      tabla.innerHTML = "";
      totalLibreriaContado = 0;
      var totalLibreriaDebito = 0;
      var totalLibreriaCredito = 0;
      var totalInformaticaContado = 0;
      var totalInformaticaDebito = 0;
      var totalInformaticaCredito = 0;
      var cliente = querySnapshot.docs.length
      var clienteLib= 0
      var clienteInf = 0

      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr ${doc.data().rubro=="Libreria" ? 'class="table-success"' : 'class="table-primary"'}>
        <th scope="row">${doc.data().rubro}</th>
        <td>${doc.data().detalle}</td>
        <td>${doc.data().contado}</td>
        <td>${doc.data().debito}</td>
        <td>${doc.data().credito}</td>
        <td>${doc.data().fecha.toDate().toLocaleString()}</td>
        <td><button class="btn btn-danger pb-1 mb-1" onclick="eliminar('${
          doc.id
        }')"><i class="fa fa-trash-alt" aria-hidden="true"></i></button>
        <button class="btn btn-success pb-1 mb-1" onclick="editar('${
          doc.id
        }','${doc.data().rubro}','${doc.data().detalle}','${
          doc.data().contado
        }','${doc.data().debito}','${doc.data().credito}')"><i class="fa fa-pencil-alt" aria-hidden="true"></i>
        </button></td>
        <td>${cliente--}</td>
        </tr>`;

        rubro = doc.data().rubro;

        if (rubro == "Libreria") {
          //console.log(typeof((doc.data().contado) | 0))
          //console.log(doc.data().contado)
          totalLibreriaContado =
            Number(totalLibreriaContado) + Number(doc.data().contado);
          //console.log(totalLibreriaContado)
          totalLibreriaDebito =
            Number(totalLibreriaDebito) + Number(doc.data().debito);
          totalLibreriaCredito =
            Number(totalLibreriaCredito) + Number(doc.data().credito);
          clienteLib++
        }
        if (rubro == "Informatica") {
          console.log(totalInformaticaDebito);
          totalInformaticaContado =
            Number(totalInformaticaContado) + Number(doc.data().contado);
          totalInformaticaDebito =
            Number(totalInformaticaDebito) + Number(doc.data().debito);
          totalInformaticaCredito =
            Number(totalInformaticaCredito) + Number(doc.data().credito);
          clienteInf++
        }
      });
      tabla.innerHTML += `
        <tr class="table-light">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>          
        </tr>
        <tr class="table-dark">
            <th></th>
            <th></th>
            <th>Contado</th>
            <th>Debito</th>
            <th>Credito</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        <tr class="table-success">
            <th>TOTALES  </th>
            <th>LIBRERIA</th>
            <th>$ ${totalLibreriaContado} </th>
            <th>$ ${totalLibreriaDebito} </th>
            <th>$ ${totalLibreriaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalLibreriaContado + totalLibreriaDebito + totalLibreriaCredito}</th>
            <th> ${clienteLib}</th>
        </tr>
        <tr class="table-primary">
            <th>TOTALES  </th>
            <th>INFORMATICA</th>
            <th>$ ${totalInformaticaContado} </th>
            <th>$ ${totalInformaticaDebito} </th>
            <th>$ ${totalInformaticaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalInformaticaContado + totalInformaticaDebito + totalInformaticaCredito} </th>
            <th>${clienteInf}</th>
        </tr>`;
    });
}

// Borrar documentos
function eliminar(id) {
  db.collection("ventas")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

//Actualizar Documento

function editar(id, rubro, detalle, contado, debito, credito) {
  //Obtengo los datos de las celdas y asigno a los input
  if (rubro == "Libreria") {
    document.getElementById("txtDetalleLibreria").value = detalle;
    document.getElementById("txtContadoLibreria").value = contado;
    document.getElementById("txtDebitoLibreria").value = debito;
    document.getElementById("txtCreditoLibreria").value = credito;
    var boton = document.getElementById("btnGuardarLibreria");
    boton.innerHTML = "Editar";
  } else {
    document.getElementById("txtDetalleInformatica").value = detalle;
    document.getElementById("txtContadoInformatica").value = contado;
    document.getElementById("txtDebitoInformatica").value = debito;
    document.getElementById("txtCreditoInformatica").value = credito;
    var boton = document.getElementById("btnGuardarInformatica");
    boton.innerHTML = "Editar";
  }

  ///ahora al click del boton guardado en la variable boton le creamos una funcion anonima para q guarde
  boton.onclick = function () {
    var venta = db.collection("ventas").doc(id);
    // Set the campos a cada variable q quiero actualizar
    if (rubro == "Libreria") {
      var detalle = document.getElementById("txtDetalleLibreria").value;
      var contado = document.getElementById("txtContadoLibreria").value;
      var debito = document.getElementById("txtDebitoLibreria").value;
      var credito = document.getElementById("txtCreditoLibreria").value;
    } else {
      var detalle = document.getElementById("txtDetalleInformatica").value;
      var contado = document.getElementById("txtContadoInformatica").value;
      var debito = document.getElementById("txtDebitoInformatica").value;
      var credito = document.getElementById("txtCreditoInformatica").value;
    }

    return venta
      .update({
        detalle: detalle,
        contado: contado,
        debito: debito,
        credito: credito,
      })
      .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML = "Guardar";
        boton.onclick = guardar; //asi vuelve  a llamar a guardar la proxima vez q se quiera guardar uno doc nuevo
        limpiarTxt();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

// var fecha = new Date();
// console.log(fecha);
// fecha.getTimezoneOffset();
// console.log(fecha);

function limpiarTxt() {
  //limpiar campos
  document.getElementById("txtDetalleLibreria").value = "Articulos de Librería";
  document.getElementById("txtContadoLibreria").value = "";
  document.getElementById("txtDebitoLibreria").value = "";
  document.getElementById("txtCreditoLibreria").value = "";
  document.getElementById("txtDetalleInformatica").value =
    "Articulos de Informática";
  document.getElementById("txtContadoInformatica").value = "";
  document.getElementById("txtDebitoInformatica").value = "";
  document.getElementById("txtCreditoInformatica").value = "";
}



//-------------REÑPORTE--------//

// Filtrar por fecha:
function reportePorFechas() {
  var tabla = document.getElementById("tabla");
  var txtFechaDesde = document.getElementById("txtFechaDesde").valueAsDate;
  var txtFechaHasta = document.getElementById("txtFechaHasta").valueAsDate;

  var fechaDesde = new Date(
    txtFechaDesde.getFullYear(),
    txtFechaDesde.getMonth(),
    txtFechaDesde.getDate() + 1
  );
  var fechaHasta = new Date(
    txtFechaHasta.getFullYear(),
    txtFechaHasta.getMonth(),
    txtFechaHasta.getDate() + 1
  );
  console.log("Fecha Desde: " + fechaDesde);
  console.log("Fecha Hasta: " + fechaHasta);

  db.collection("ventas")
    .where("fecha", ">=", fechaDesde)
    .where("fecha", "<=", fechaHasta)
    .orderBy("fecha", "desc")
    .onSnapshot((querySnapshot) => {
      //db.collection("ventas").orderBy("fecha").onSnapshot((querySnapshot) => { //se unsa onSnapshot() en lugar de get() para q actualice en tiempo real
      tabla.innerHTML = "";
      totalLibreriaContado = 0;
      var totalLibreriaDebito = 0;
      var totalLibreriaCredito = 0;
      var totalInformaticaContado = 0;
      var totalInformaticaDebito = 0;
      var totalInformaticaCredito = 0;

      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.data().rubro}</th>
        <td>${doc.data().detalle}</td>
        <td>${doc.data().contado}</td>
        <td>${doc.data().debito}</td>
        <td>${doc.data().credito}</td>
        <td>${doc.data().fecha.toDate().toLocaleString()}</td>
        <td><button class="btn btn-danger pb-1 mb-1" onclick="eliminar('${
          doc.id
        }')"><i class="fa fa-trash-alt" aria-hidden="true"></i></button>
        <button class="btn btn-success pb-1 mb-1" onclick="editar('${
          doc.id
        }','${doc.data().rubro}','${doc.data().detalle}','${
          doc.data().contado
        }','${doc.data().debito}','${doc.data().credito}')"><i class="fa fa-pencil-alt" aria-hidden="true"></i>
        </button></td>
        </tr>`;

        rubro = doc.data().rubro;

        if (rubro == "Libreria") {
          //console.log(typeof((doc.data().contado) | 0))
          //console.log(doc.data().contado)
          totalLibreriaContado =
            Number(totalLibreriaContado) + Number(doc.data().contado);
          //console.log(totalLibreriaContado)
          totalLibreriaDebito =
            Number(totalLibreriaDebito) + Number(doc.data().debito);
          totalLibreriaCredito =
            Number(totalLibreriaCredito) + Number(doc.data().credito);
        }
        if (rubro == "Informatica") {
          console.log(totalInformaticaDebito);
          totalInformaticaContado =
            Number(totalInformaticaContado) + Number(doc.data().contado);
          totalInformaticaDebito =
            Number(totalInformaticaDebito) + Number(doc.data().debito);
          totalInformaticaCredito =
            Number(totalInformaticaCredito) + Number(doc.data().credito);
        }
      });
      tabla.innerHTML += `
        <tr class="table-dark">
            <th></th>
            <th></th>
            <th>Contado</th>
            <th>Debito</th>
            <th>Credito</th>
            <th></th>
            <th></th>
        </tr>
        <tr class="table-success">
            <th>TOTALES  </th>
            <th>LIBRERIA</th>
            <th>$ ${totalLibreriaContado} </th>
            <th>$ ${totalLibreriaDebito} </th>
            <th>$ ${totalLibreriaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalLibreriaContado + totalLibreriaDebito + totalLibreriaCredito}</th>
        </tr>
        <tr class="table-primary">
            <th>TOTALES  </th>
            <th>INFORMATICA</th>
            <th>$ ${totalInformaticaContado} </th>
            <th>$ ${totalInformaticaDebito} </th>
            <th>$ ${totalInformaticaCredito} </th>
            <th>TOTAL:</th>
            <th>$ ${totalInformaticaContado + totalInformaticaDebito + totalInformaticaCredito} </th>
        </tr>`;
    });
}