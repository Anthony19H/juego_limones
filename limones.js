let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=40;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTO_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;

let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;


function iniciar(){
    intervalo=setInterval(bajarLimon,velocidadCaida);//primer parametro :solo el nombre de la funcion Segundo parametro :tiempo en milisegundos
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="purple";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="blue";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    if (personajeX>0){
    personajeX=personajeX-10;
    actualizarPantalla();
    }
}

function moverDerecha(){
    if(personajeX<600-ANCHO_PERSONAJE){
    personajeX=personajeX+10;
    actualizarPantalla();}
    
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();

}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}


function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX && 
        limonX < personajeX + ANCHO_PERSONAJE && 
        limonY + ALTO_LIMON > personajeY && 
        limonY < personajeY + ALTURA_PERSONAJE){
        
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje);
        if(puntaje == 3){
            velocidadCaida=150;
            clearInterval(intervalo);
            intervalo=setInterval(bajarLimon,velocidadCaida);
        }else if(puntaje == 6 ){
            velocidadCaida=100;
            clearInterval(intervalo);
            intervalo=setInterval(bajarLimon,velocidadCaida);
            
        }else if(puntaje == 10){
            clearInterval(intervalo);
            alert("ganaste Te gusta los limones ehhhh");
        }
        
    }

}

function detectarPiso(){
    if(limonY+ALTO_LIMON == canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas);
        if(vidas == 0){
            clearInterval(intervalo);
            alert("GAME OVER")
        }
    }
}


function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}


function reiniciar(){
    vidas= 3
    puntaje= 0
    velocidadCaida=200
    clearInterval(intervalo);
    mostrarEnSpan("txtPuntaje",puntaje);
    mostrarEnSpan("txtVidas",vidas);
    iniciar()
}