const usuarios = [
  {
    nombre: "Sofia",
    edad: 16,
    documento: 375247,
    tipo: 1,
    contraseña: 111,
  },
  {
    nombre: "Carmen",
    edad: 50,
    documento: 375242,
    tipo: 2,
    contraseña: 222,
  },
];

class Billete {
  constructor(d, c) {
    this.denominacion = d;
    this.cantidad = c;
  }
}

let caja = [], entregado = [];

let dinero, division = 0, papeles = 0;
let suma = 0;

let pedidoCinco,acumCinco= 0;
let pedidoDiez,acumDiez = 0;
let pedidoVeinte,acumVeinte = 0;
let pedidoCincuenta,acumCincuenta = 0;
let pedidoCien,acumCien = 0;

iniciar();

function iniciar() {

  let solicitado = parseInt(prompt("Ingrese el documento"));

  const doc = usuarios.find((u) => {
    
    if (u.documento == solicitado) {
      console.log("Usuario encontrado");
      let psw = prompt("Ingresa la contraseña");

      if (u.contraseña == psw) {
        console.log("Contraseña hallada");

        if (u.tipo == 1) {
          caja = [];
          solicitarBillete(caja);
        }
        if (u.tipo == 2) {
          if (caja.length == 0) {
            alert("Cajero en mantenimiento, vuelva pronto");
            iniciar();
          } else {
            entregarDinero(caja);
          }
        }
      }else {
          alert("Contraseña incorrecta, intente nuevamente");
         iniciar();
      }
    }
    
  });
  alert("Documento no encontrado, intente nuevamente");
   iniciar();
}

function solicitarBillete(caja) {
  pedidoCien = parseInt(prompt("Cantidad de billetes de 100"));
  acumCien += pedidoCien;
  caja.push(new Billete(100000, acumCien));

  pedidoCincuenta = parseInt(prompt("Cantidad de billetes de 50"));
  acumCincuenta += pedidoCincuenta;
  caja.push(new Billete(50000, acumCincuenta));

  pedidoVeinte = parseInt(prompt("Cantidad de billetes de 20"));
  acumVeinte += pedidoVeinte;
  caja.push(new Billete(20000, acumVeinte));

  pedidoDiez = parseInt(prompt("Cantidad de billetes de 10"));
  acumDiez += pedidoDiez;
  caja.push(new Billete(10000, acumDiez));

  pedidoCinco = parseInt(prompt("Cantidad de billetes de 5"));
  acumCinco += pedidoCinco;
  caja.push(new Billete(5000, acumCinco));

  sumaM(caja);
}

function sumaM(caja) {
    
    caja.forEach((billete)=>{
        let producto = (billete.denominacion)*(billete.cantidad);
        console.log(`Total en billetes de ${billete.denominacion} -> ${producto} en cajero`)
        suma+= producto;
    })
    console.log("Valor total  $" + suma);
    suma=0;

    if(caja.length>0){
      acumCien=caja[0].cantidad; 
      acumCincuenta=caja[1].cantidad;
      acumVeinte=caja[2].cantidad;
      acumDiez=caja[3].cantidad;
      acumCinco=caja[4].cantidad;
    }

iniciar();
}

function entregarDinero(caja){
    dinero = parseInt(prompt("¿Cuánto desea retirar?"));

    for( let billete of caja)
    {
    if(dinero>0)
    {
    division = Math.floor(dinero / billete.denominacion);

    if ( division > billete.cantidad )
    {
        papeles = billete.cantidad;
    }
    else
    {
        papeles = division;
    }
    entregado.push (new Billete(billete.denominacion, papeles));
    dinero = dinero - (billete.denominacion * papeles);
    }

    }

    if(dinero > 0)
    {
       alert("Valor solicitado insuficiente en cajero");
       entregado=[];
       iniciar();
    }
    else{
        entregado.forEach((dado)=>{
            if(dado.cantidad>0){
                console.log(`${dado.cantidad}  billete(s) de $ ${dado.denominacion} entregado(s)`);
                caja.find((bi)=>{
                    if(dado.denominacion==bi.denominacion){
                        bi.cantidad-=dado.cantidad;
                    }
                })
            }
        })
        
       entregado=[];
       sumaM(caja);
    }
}


