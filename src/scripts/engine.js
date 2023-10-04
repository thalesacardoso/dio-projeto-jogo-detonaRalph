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
      speed: 500,
      position: 0,
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

   // Armazena a posição que o inimigo aparece
   states.values.position = enemy.id
}

function moveEnemy(){
   states.values.timerID = setInterval(randomEnemy,states.values.speed)
}

function addListenerHitBox() {

   states.view.square.forEach((square) => {
      square.addEventListener('mousedown', () => {
         // verifica se o id do click é igual a posição que o inimigo se encontra na tela
         if (square.id == states.values.position){
            // soma 1 ponto no total do score
            states.values.score++
            // altera o valor do html com o valor total do score
            states.view.score.textContent = states.values.score
            // reseta a posição do inimigo para que não tenha como ficar clicando e somando pontos no mesmo lugar
            states.values.position = null;
         }
      })
   })

}

function main() {
   moveEnemy()
   addListenerHitBox()
}

main()