/*
DESENVOLVEDOR: Thales Cardoso
GITHUB: https://github.com/thalesacardoso
LINKEDIN: https://www.linkedin.com/in/thalesacardoso/
DATA: 05/10/2023
*/

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
      timeTotal: 30,
      scoreTotal: 0,
      lifeTotal: 3,
      position: 0,
   },
   action: {
      contador: setInterval(mudarTempo, 1000),
      enemy: setInterval(randomEnemy, 1000),
   }
};

// Função que reinicia o jogo
function reiniciarJogo() {
   // Configura o novo valor de tempo total
   states.values.timeTotal = 30;
   states.action.contador = setInterval(mudarTempo, 1000)
   states.action.enemy = setInterval(randomEnemy, 1000)
   mudarVida()
}

// Função que toca um som quando acerta o inimigo no jogo
function tocarSom(nomeAudio) {
   let som = new Audio(`./src/audios/${nomeAudio}.m4a`);
   som.volume = 0.2
   som.play()
}

// Função que altera a vida no jogo
function mudarVida() {
   states.view.life.innerText = states.values.lifeTotal--
   let vida = states.view.life.innerText
   let pontos = states.view.score.innerText
   let contador = states.view.time.innerText
   let btn = states.view.button

   if (vida <= 0 && contador <= 0) {
      alert(`Você marcou ${pontos} pontos no total.\n Reinicie a página para tentar novamente`)

      // Remove o botão de continuar
      btn.classList.remove('ativo')

      // Mantém a vida zerada até reiniciar a página
      states.view.life.innerText = 0;

      // Para a execução do SetInterval quando o contador chega a Zero
      clearInterval(states.action.contador)
      clearInterval(states.action.enemy)
   }
}

// Função que altera o tempo no jogo
function mudarTempo() {
   states.view.time.innerText = states.values.timeTotal--
   let contador = states.view.time.innerText
   let btn = states.view.button
   btn.classList.remove('ativo')

   // Verifica se o contador chegou a zero
   if (contador <= 0) {

      // Mostra o botão continuar
      btn.classList.add('ativo')

      // alert('Game Over')
      // Para a execução do SetInterval quando o contador chega a Zero
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

            tocarSom('hit')
         }
      })
   })

}

// Função principal autoexecutável
function main() {
   alert('ACERTE O ALVO PARA MARCAR PONTOS')
   addListenerHitBox()
   mudarVida()
}

main()
