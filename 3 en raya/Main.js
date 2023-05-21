let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach(x => x.addEventListener("click", ponerFicha));

function ponerFicha(event){
    let botonPulsado = event.target;
    if(!partidaAcabada && botonPulsado.innerHTML == ""){
        botonPulsado.innerHTML = fichas[turno];
        puestas += 1;

        let estadoPartida = estado();
        if(estadoPartida == 0){
            cambiarTurno();
            if(puestas < 9){
                cpu();
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }

        if(estadoPartida == 1){
            textoVictoria.style.visibility = "visible";
            partidaAcabada = true;
        }
        else if(estadoPartida == -1){
            textoVictoria.innerHTML = "Has perdido...";
            partidaAcabada = true;
            textoVictoria.style.visibility = "visible";
        }
    }
}

function cambiarTurno(){
    if(turno == 1){
        turno = 0;
    }
    else{
        turno = 1;
    }
}

function estado(){
    posicionVictoria = 0;
    estadoFinal = 0;

    function sonIguales(...args){
        valores = args.map(x => x.innerHTML);
        if(valores[0] != "" && valores.every((x, i, arr) => x === arr[0])){
            args.forEach(x => x.style.backgroundColor = "blueviolet")
            return true;
        }
        else{
            return false;
        }
    }

    //Comprobamos si hay alguna fila
    if(sonIguales(botones[0], botones[1], botones[2])){
        posicionVictoria = 1;
    }

    else if(sonIguales(botones[3], botones[4], botones[5])){
        posicionVictoria = 2;
    }

    else if(sonIguales(botones[6], botones[7], botones[8])){
        posicionVictoria = 3;
    }

    //Comprobamos si hay alguna columna
    else if(sonIguales(botones[0], botones[3], botones[6])){
        posicionVictoria = 4;
    }

    else if(sonIguales(botones[1], botones[4], botones[7])){
        posicionVictoria = 5;
    }

    else if(sonIguales(botones[2], botones[5], botones[8])){
        posicionVictoria = 6;
    }

    //Comprobamos si hay alguna diagonal
    else if(sonIguales(botones[0], botones[4], botones[8])){
        posicionVictoria = 7;
    }

    else if(sonIguales(botones[2], botones[4], botones[6])){
        posicionVictoria = 8;
    }

    //Comprobamos quien ha ganado
    if(posicionVictoria > 0){
        if(turno == 1){
            estadoFinal = 1;
        }
        else{
            estadoFinal = -1;
        }
    }

    return estadoFinal;
}


//Función para que la cpu realice su turno
function cpu(){
    function aleatorio(min, max){
        return Math.floor(Math.random() * (max -min +1)) + min;
    }

    let valores = botones.map(x => x.innerHTML);
    let pos = -1;

    //Comprueba si el centro está vacio y si lo está, ocupa esa posición
    if(valores[4] == ""){
        pos = 4;
    }
    //Si el centro está ocupado busca una posición aleatoria dentro de la longitud max de los botones.
    //De nuevo una vez elegida la posición comprueba si está vacia, si lo está, ocupa dicha posición.
    //Si está ocupada realiza de nuevo la búsqueda aleatoria.
    else{
        let n = aleatorio(0, botones.length - 1);
        while(valores[n] != ""){
            n = aleatorio(0, botones.length - 1);
        }
        pos = n;
    }

    //Rellena el texto de la posición con "O" (ficha de la cpu).
    botones[pos].innerHTML = "O";
    return pos;
}

//Para reiniciar recargamos la página
function reset(){
    window.location.reload()
    }