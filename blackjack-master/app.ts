interface ICarta { value:number, key:string }
document.body.onload = () => {
    const nombreUsuarioPh = document.getElementById("usuario-nombre-ph");
    const btnNew = document.getElementById("btn-new");
    const btnCard = document.getElementById("btn-card");
    const btnStop = document.getElementById("btn-stop");
    const cartasHijos = document.getElementById("user-cards");
    const cartasPc = document.getElementById("cpu-cards");
    const userContPh = document.querySelector('#user-container small') as HTMLElement;
    const pcContPh = document.querySelector('#cpu-container small') as HTMLElement;
    
    let userValueCont = 0;
    let pcValueCont = 0;
    let nombreUsuario: string | null;



    btnCard?.addEventListener('click', () => {
        const carta = mazoBarajado.pop();
        if(carta) {
            const img = crearImagen(carta);
            userValueCont += carta.value;
            cartasHijos?.appendChild(img);
            userContPh.innerText = userValueCont + '';
            console.log(userValueCont);
            if(userValueCont > 21) {
                btnCard.setAttribute('disabled','')
                jugarPc();
            }
        }
    })

    const jugarPc = (): void => {
        while(pcValueCont<userValueCont) {
            const carta = mazoBarajado.pop();
            if(carta) {
                    const img = crearImagen(carta)
                    pcValueCont += carta.value;
                    cartasPc?.appendChild(img);
                    pcContPh.innerText = pcValueCont+'';
                    console.log(pcValueCont);
            if(pcValueCont > userValueCont) {
               alert('El Compiutador ha perdido')
            }

                    //console.log(pcValueCont);
            }
        }
    }



    btnNew?.addEventListener('click', () => {
        location.reload()
       
    })
    btnStop?.addEventListener('click', () => {
        btnCard?.setAttribute('disabled','')
        alert('se ha parado')
        jugarPc();
    btnCard?.setAttribute('disabled','');
        
    })
    const crearImagen = (carta: ICarta): HTMLElement => {
        var imagen = document.createElement("img");
        imagen.setAttribute("src", "assets/img/cards/"+carta.key+".png");
        imagen.setAttribute("class","gcard");
        return imagen;
    }
    
    const calcularValorcarta = (numero: string): number => {
        let valor = 0;
        if(numero == "J" || numero == "Q" || numero == "K" ) {
            valor = 10
        } else if(numero == "A") {
            valor = 11
        } else {
            valor = parseInt(numero, 10);
        }
        return valor;
    }
    const barajarMazo = (mazo: ICarta[]): ICarta[] => {
        const nuevoMazo = [...mazo]
        return nuevoMazo.sort( (a:ICarta, b: ICarta): number =>  Math.random() - 0.5 );
    }
    do {
        nombreUsuario = prompt('Escribe el nombre');
    } while (nombreUsuario == null ||  !/^[A-Za-z]{2,}$/.test(nombreUsuario))
    nombreUsuario = nombreUsuario.charAt(0).toUpperCase().concat(nombreUsuario.substring(1).toLocaleLowerCase());
    if(nombreUsuarioPh != null) {
        nombreUsuarioPh.innerText = nombreUsuario as string;
    }
    const numeros: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const figuras: string[] = ['C', 'D', 'H', 'S'];
    const mazo: ICarta[] = [];
    /*
    for (let i = 0; i < numeros.length; i++) {
        for(let j = 0; j < figuras.length; j++) {
            mazo.push(numeros[i]+ figuras[j])
        }
    }*/
    for(let numero of numeros) {
        for(let figura of figuras) {
            mazo.push( {key:numero + figura, value:calcularValorcarta(numero)} );
        }
    }
    const mazoBarajado = barajarMazo(mazo)
}



