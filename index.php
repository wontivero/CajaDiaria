<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <!-- Font Awesome 5 -->
    <script src="https://kit.fontawesome.com/217e7108aa.js" crossorigin="anonymous"></script>

    <title>INFO TECH</title>

    <!-- FIRESTORE -->
    <script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-firestore.js"></script>


  </head>
  <body>
    <div class="container">
      <div class="row my-3">
        <!-- LIBRERIA -->
        <div class="col-md-6">
          
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative p-4" id="grupoLibreria">
            <h1 class="mb-3">Librería</h1>
            <div class="input-group mb-3">
              <span class="input-group-text col-md-4"><i class="fas fa-shopping-bag mx-2"></i>Detalles:  </span>
              <textarea class="form-control" id="txtDetalleLibreria" aria-label="With textarea"> Articulos de Librería</textarea>
            </div>
            <div class="input-group">
              <span class="input-group-text col-md-4"> <i class="far fa-money-bill-alt mx-2"></i>Contado $</span>
              <input type="number" class="form-control" id="txtContadoLibreria">
              <span class="input-group-text">.00</span>
            </div>
            <div class="input-group my-3">
              <span class="input-group-text col-md-4"><i class="far fa-credit-card mx-2"></i>Debito $</span>
              <input type="number" class="form-control" id="txtDebitoLibreria">
              <span class="input-group-text">.00</span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text col-md-4"><i class="far fa-credit-card mx-2"></i>Credito $</span>
              <input type="number" class="form-control" id="txtCreditoLibreria">
              <span class="input-group-text">.00</span>
            </div>
            <button class="btn btn-success" value="submit" id="btnGuardarLibreria" onclick="guardar('Libreria')">Guardar</button>
          </div>  
     
        </div>
        
        <!-- INFORMATICA -->
        <div class="col-md-6">
          
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative p-4" id="grupoInformatica">
            <h1 class="mb-3">Informática</h1>
            <div class="input-group mb-3">
              <span class="input-group-text col-md-4"><i class="fas fa-shopping-bag mx-2"></i>Detalles:  </span>
              <textarea class="form-control" aria-label="With textarea" id="txtDetalleInformatica"> Articulos de informática</textarea>
            </div>
            <div class="input-group ">
              <span class="input-group-text col-md-4"><i class="far fa-money-bill-alt mx-2"></i>Contado $</span>
              <input type="number" class="form-control" id="txtContadoInformatica">
              <span class="input-group-text">.00</span>
            </div>
            <div class="input-group my-3">
              <span class="input-group-text col-md-4"><i class="far fa-credit-card mx-2"></i>Debito $</span>
              <input type="number" class="form-control" id="txtDebitoInformatica">
              <span class="input-group-text">.00</span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text col-md-4"><i class="far fa-credit-card mx-2"></i>Credito $</span>
              <input type="number" class="form-control" id="txtCreditoInformatica">
              <span class="input-group-text">.00</span>
            </div>
            <button class="btn btn-primary" value="submit" id="btnGuardarInformatica" onclick="guardar('Informatica')">Guardar</button>
          </div>          
        </div>          
        </div>
      </div>  
    </div>
    <div class="container">
        <!-- <h1>Caja Diaria</h1>
        <input type="text" id="nombre" placeholder="Nombre" class="form-control my-3">
        <input type="text" id="apellido" placeholder="Apellido" class="form-control my-3">
        <input type="text" id="fecha" placeholder="Fecha" class="form-control my-3">
        <button class="btn btn-info" value="submit" id="btnGuardar" onclick="guardar()">Guardar</button>
       -->
       <div class="row">
          <div class='col-sm-6'>
                <div class='input-group date' id='datetimepicker1'>
                    <input type='date' class="form-control" id="txtFecha" />
                    <button class="btn btn-primary col-sm-4" onclick="filtrarPorFecha()">Buscar</button>
                </div>
          </div>
       </div>
        <table class="table table-secundary  table-hover my-5">
            <thead>
              <tr class="table-dark">
                <th scope="col" class="col-md-1">Rubro</th>
                <th scope="col"class="col-md-3">Detalles</th>
                <th scope="col"class="col-md-1">Contado</th>
                <th scope="col"class="col-md-1">Debito</th>
                <th scope="col"class="col-md-1">Credito</th>
                <th scope="col" class="col-md-2">Fecha </th>
                <th scope="col" class="col-md-2">Editar</th>
                <th scope="col" class="col-md-1">Clientes</th>
              </tr>
            </thead>
            <tbody id="tabla"> 
            </tbody>
          </table>
    </div>




    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
    -->

    <script src="app.js"></script>
  </body>
</html>