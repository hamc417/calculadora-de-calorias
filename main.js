const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit',(event) =>{
    event.preventDefault();
    calcularCalorias();
}) 

function lipiaFormulario(){
    edad.value = null;
    peso.value = null;
    altura.value = null;
    actividad.value = null;
    nombre.value = null;
    apellido.value = null;
    identidad.value = null;
    numeroIdentidad.value = null;
}



function calcularCalorias() {
    aparecerResultado();
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const actividad = document.querySelector('#actividad');
    const genero = document.querySelector('input[name=genero]:checked');

    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const identidad = document.querySelector('#identidad');
    const numeroIdentidad = document.querySelector('#numeroIdentidad');

    let grupoPoblacional;
    let calculoCalorias;

    const multiplicadorTMB ={
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if(!(edad.value && peso.value && altura.value &&nombre.value && apellido.value && identidad.value && numeroIdentidad.value)){
        mostrarMensajeDeError('Por favor digite todos los campos');
        lipiaFormulario();
        return
    }

    
    if (edad.value<29){
        grupoPoblacional = "Jóvenes";
     }else if(edad.value> 30 && edad.value <59){
        grupoPoblacional = "Adultos"
     }else{
        grupoPoblacional = " Adulto mayor"
     }

   

    if(genero.id === 'masculino'){
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso*peso.value)+(multiplicadorTMB.altura * altura.value)-(multiplicadorTMB.edad))-5;
    }else {calculoCalorias = actividad.value * ((multiplicadorTMB.peso*peso.value)+(multiplicadorTMB.altura * altura.value)-(multiplicadorTMB.edad))-161;}

    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <p class="card-title h2 text-center color-warning">Paciente <span class="text-primary">${nombre.value} ${apellido.value}</span> con número de ${identidad.value} <span class="text-primary">${numeroIdentidad.value}</span></p>  
        <p class="card-title h2">Requiere un total de:</p>          
        <div class="mb-3 w-100 d-flex flex-column justify-content-center align-items-center">
            <input class="form-control text-center w-50"  value ="${Math.floor(calculoCalorias)} kcal" style="font-size: 2rem" disable></input>
            <p class="card-title h2 text-center">Para el sostenimiento de su TMB</p>
            <br>
            <p class="card-title h2 text-center">Paciente pertenece al grupo poblacional de <span class="text-primary">${grupoPoblacional}</span></p>
        </div>
        </div> `      


    //Limpiar formulario
   lipiaFormulario();
    

    }

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}