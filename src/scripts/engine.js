/*
DESENVOLVIDO POR: Thales Cardoso
GITHUB: https://github.com/thalesacardoso
DATA: 
*/

function print(txt) {
   console.log(txt)
}

const states = {
   view: {
      time: document.getElementById('time'),
      score: document.getElementById('score'),
      life: document.getElementById('life'),
      square: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy')
   },
   values: {
      time: 60,
      timerID: 0,
      score: 0,
      life: 3,
      velocidade: 1000
   },
   action: {}
};



function randomEnemy() {
   // remove a classe enemy de dentro de todos os squares
   states.view.square.forEach((values) => {
      values.classList.remove('enemy')
   })

   // Gera um número aleatório de 0 até 9
   let x = Math.floor((Math.random() * 9))

   // Pega o square aleatóriamente e adiciona a classe Enemy
   let enemy = states.view.square[x]
   enemy.classList.add('enemy')
}

function moveEnemy(){
   states.values.timerID = setInterval(randomEnemy,states.values.velocidade)
}

function addListenerHitBox() {

}

function main() {
   moveEnemy()
}

main()