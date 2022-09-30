var ini;
var sec;
var min;
var hr;
var interval;
var check;
var btn = document.getElementById('btn-ini').innerText;

//atribui valor as variaveis
function atr(){
    ini = document.getElementById('time');
    ini = ini.value;
    if(((ini.substr(6,2)).indexOf(":"))>-1){
      sec = Number(ini.substr(6,1)); 
    }else{
      sec = Number(ini.substr(6,2));
    }
    if(((ini.substr(3,2)).indexOf(":"))>-1){
        min = Number(ini.substr(3,1)); 
    }else{
        min = Number(ini.substr(3,2));
    }
    if(((ini.substr(0,2)).indexOf(":"))>-1){
        hr = Number(ini.substr(0,1)); 
    }else{
        hr = Number(ini.substr(0,2));
    }
}

//valida os campos
function valid(){

   if(!isNaN(sec) && !isNaN(min) && !isNaN(hr)){
      check = 'ok'
   }
   else{
     check = 'invalido'
     window.alert("Digite apenas numeros");
   }
}

//gerencia que funcao o botao deve chamar
function callFunc(){

    atr()
    valid()
    if(btn == "Iniciar"){
        if(sec != 0 || min != 0 ||  hr != 0){
            document.getElementById('btn-ini').innerText = "Parar";
            start();
        }
    }
    else if(btn == "Parar"){
        document.getElementById('btn-ini').innerText = "Iniciar";
        pause()
        
    }
}

//acrescenta um digito ao lado do numero menor que 10
function twoDigits(digit){
    if(digit<10){
        return('0'+digit)
    }else{
        return(digit)
    }
}

//funcao que inicia a contagem regressiva
function start(){
     controlTime()
     //chama a funcao a cada 1000 milésimos
     interval = setInterval(controlTime,1000)

}

// zera a contagem
function stop(){
    clearInterval(interval)
    sec=0
    min=0
    window.alert("Você Parou em: "+document.getElementById('time').value)
    document.getElementById('time').value = '00:00:00'

}

//congela a contagem
function pause(){
    clearInterval(interval)

}


// controla a contagem do tempo
function controlTime(){

  
        if(sec <= 0){
            if(min > 0){
              min--
              sec = 59;
            }
         }else{
            sec--
         }
         if(min <= 0){
             if(hr>0){
                 hr--
                 min = 60;
             }
         }
         if(min === 0 && hr === 0 && sec === 0){
             document.getElementById('sound').play();
             pause()
        }

        


    document.getElementById('time').value = twoDigits(hr)+':'+twoDigits(min)+':'+twoDigits(sec);
}
document.querySelector('body').addEventListener('keydown', function(event){

    if(event.key === 'i' ||  event.keyCode == 13){
        btn = "Iniciar";
        callFunc()
    }
    if(event.key === 'p'){
        btn = "Parar"
        callFunc()
    }
    if(event.key != 'i' && event.key != 'p' && event.keyCode != 13)
    {
        document.getElementById('sound').pause();
    }

});