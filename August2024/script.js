const player= document.querySelector('.player');
const conteo= document.querySelector('.conteo');
const ganarElement= document.querySelector('.ganar');
const btnEl=ganarElement.querySelector('button');
let puntos, tiempo, necesarios;
puntos=0;
tiempo=60;
necesarios=30;
let dataset=[];
player.addEventListener('mouseover', function(){
    sumarPuntos();
    setDataset();
});
function sumarPuntos(){
    puntos++;
    document.getElementById('puntos').innerHTML=puntos;
    randNum=Math.round(Math.random()*500);
    randNum2=Math.round(Math.random()*500);
    player.style.left=randNum+'px';
    player.style.top=randNum2+'px';
    if(puntos===10){
        player.style.backgroundColor='green';
        setInterval(()=>{
            player.style.left=`${randNum+Math.random()*10}px`;
            player.style.top=`${randNum2+Math.random()*10}px`;   
        },100);
    }else if(puntos===20){
        player.style.backgroundColor='red';
        setInterval(()=>{
            player.style.left=`${randNum+Math.random()*50}px`;
            player.style.top=`${randNum2+Math.random()*50}px`;   
        },100);
    }
    if(puntos==30){
        ganarElement.style.display='block';
        btnEl.addEventListener('click', ()=>{
            ganarElement.style.display='none';
            puntos=0;
            tiempo=60;
            necesarios+=10;
            document.getElementById('puntos').innerHTML=puntos;
            document.getElementById('tiempo').innerHTML=tiempo;
            document.getElementById('necesarios').innerHTML=necesarios;
            randNum= Math.random()*500;
            randNum2= Math.random()*500;
            player.style.left=`${randNum}px`;
            player.style.top=`${randNum2}px`;
        });
    }
}
function restarTiempo(){
    tiempo--;
    document.getElementById('tiempo').innerHTML=tiempo;
    if(tiempo==0){
        alert('Perdiste');
        puntos=0;
        tiempo=60;
        necesarios=30;
        document.getElementById('puntos').innerHTML=puntos;
        document.getElementById('tiempo').innerHTML=tiempo;
        document.getElementById('necesarios').innerHTML=necesarios;
    }
}
setInterval(restarTiempo,1000);

function setDataset(){
    const data= {point: puntos, time: tiempo, required: necesarios};
    dataset.push(data);
    localStorage.setItem('data', JSON.stringify(dataset));
    conteo.innerHTML='';
    dataset.forEach((data, index)=>{
        let dataDiv=document.createElement('div');
        dataDiv.classList.add('data');
        dataDiv.innerHTML=`
            <p>Puntos: ${data.point}</p>
            <p>Tiempo: ${data.time}</p>
            <p>Requeridos: ${data.required}</p>
        `;
        conteo.appendChild(dataDiv);
    });
}