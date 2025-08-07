const jogadores = ["palio", "prato", "papai" , "pou", "memphis" , "depasto"]; // Jogadores disponíveis na pasta images/

let cards = [...jogadores, ...jogadores]; // Duas cópias de cada jogador
cards = cards.sort(() => Math.random() - 0.5); // Embaralha as cartas

const gameContainer = document.querySelector(".memory-game");

// Criando as cartas dinamicamente
cards.forEach(jogador => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = jogador;
    
    card.innerHTML = `
        <div class="front">
            <img src="images/${jogador}.png" alt="${jogador}" width="100%" height="100%">
        </div>
        <div class="back">
            <img src="images/sccp.png" alt="Verso da carta" width="100%" height="100%">
        </div>
    `;

    gameContainer.appendChild(card);
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0; // Contador de pares encontrados

// Função para virar carta
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

// Verifica se as cartas são iguais
function checkMatch() {
    lockBoard = true;
    
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    
    if (isMatch) {
        disableCards();
        matches++;

        // Verifica se o jogador venceu
        if (matches === jogadores.length) {
            setTimeout(() => alert("🏆 Você venceu!"), 500);
        }
    } else {
        unflipCards();
    }
}

// Desabilita cartas acertadas
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

// Vira as cartas de volta se errar
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

// Reseta variáveis do jogo
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Adiciona evento de clique em todas as cartas
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", flipCard);
});

// Botão de reiniciar o jogo
document.getElementById("restart").addEventListener("click", () => {
    location.reload();
});
