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
      enemy: document.querySelector('.enemy'),
      button: document.getElementById('btn-continuar')
   },
   values: {
      timeTotal: 5,
      scoreTotal: 0,
      lifeTotal: 5,
      position: 0,
   },
   action: {
      contador: setInterval(mudarTempo, 1000),
      enemy: setInterval(randomEnemy, 1000),
   }
};


function mudarVida(){
   states.view.life.innerText = states.values.lifeTotal--
   let vida = states.view.life.innerText

   if(vida <= 0){
      print('Total de vidas '+ vida)
      states.view.life.innerText = 0;
   }
}

// Função que altera o tempo no jogo
function mudarTempo() {
      states.view.time.innerText = states.values.timeTotal--
      let contador = states.view.time.innerText

      // Verifica se o contador chegou a zero
      if(contador <= 0) {
         print('Game Over')
         // Para a execução da função SetInterval quando o contador chega a Zero
         clearInterval(states.action.contador)
         clearInterval(states.action.enemy)
      }
}

// Função que cria o movimento do inimigo de forma aleatória
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

// Função que faz marcar os pontos com o click do mouse
function addListenerHitBox() {

   states.view.square.forEach((square) => {
      square.addEventListener('mousedown', () => {
         // verifica se o id do click é igual a posição que o inimigo se encontra na tela
         if (square.id == states.values.position) {
            
            // soma 1 ponto no total do score
            states.values.scoreTotal++

            // altera o valor do html com o valor total do score
            states.view.score.textContent = states.values.scoreTotal

            // reseta a posição do inimigo para que não tenha como ficar clicando e somando pontos no mesmo lugar
            states.values.position = null;
         }
      })
   })

}

function main() {
   addListenerHitBox()
   mudarVida()
}

main()