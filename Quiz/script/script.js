const perguntas = [
    {
        pergunta: "Quem é o maior ídolo da história do Corinthians?",
        opcoes: ["Sócrates", "Marcelinho Carioca", "Rivelino", "Neto"],
        resposta: "Sócrates"
    },
    {
        pergunta: "Quantos títulos da Libertadores o Corinthians tem?",
        opcoes: ["1", "2", "3", "Nenhum"],
        resposta: "1"
    },
    {
        pergunta: "Qual foi o primeiro título mundial do Corinthians?",
        opcoes: ["2000", "2012", "1999", "2015"],
        resposta: "2000"
    },
    {
        pergunta: "Quem marcou o gol do título da Libertadores 2012?",
        opcoes: ["Paulinho", "Sheik", "Danilo", "Romarinho"],
        resposta: "Sheik"
    },
    {
        pergunta: "Quantos Brasileirões o Corinthians tem?",
        opcoes: ["4", "6", "7", "9"],
        resposta: "7"
    },
    {
        pergunta: "Qual é o jogador estrangeiro com mais gols com a camisa do Timão?",
        opcoes: ["A. Romero", "Guerrero", "Tevez", "F. Rincón"],
        resposta: "A. Romero"
    },
    {
        pergunta: "Qual é a data de fundação do Corinthians?",
        opcoes: ["8 de março de 1908", "1 de setembro de 1910", "4 de julho de 1920", "1 de agosto de 1905"],
        resposta: "1 de setembro de 1910"
    },
    {
        pergunta: "Qual é o jogador com mais jogos com a camisa do Corinthians?",
        opcoes: ["Cássio Ramos", "Wladimir", "Neto", "Ronaldo Giovanelli"],
        resposta: "Wladimir"
    }
];

let indicePergunta = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const resultadoEl = document.getElementById("resultado");
const pontuacaoEl = document.getElementById("pontuacao");
const botaoProxima = document.getElementById("proxima");

const somAcerto = document.getElementById("acerto");
const somErro = document.getElementById("erro");

function carregarPergunta() {
    resultadoEl.textContent = "";
    opcoesEl.innerHTML = "";
    let perguntaAtual = perguntas[indicePergunta];
    perguntaEl.textContent = perguntaAtual.pergunta;

    perguntaAtual.opcoes.forEach(opcao => {
        let botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("opcao");
        botao.onclick = () => verificarResposta(botao, opcao);
        opcoesEl.appendChild(botao);
    });

    botaoProxima.style.display = "none";
}

function verificarResposta(botao, opcaoEscolhida) {
    let perguntaAtual = perguntas[indicePergunta];

    if (opcaoEscolhida === perguntaAtual.resposta) {
        resultadoEl.textContent = "✅ Resposta certa!";
        resultadoEl.style.color = "green";
        pontuacao++;
        pontuacaoEl.textContent = pontuacao;
        somAcerto.play();
        botao.style.background = "green";
        botao.style.color = "white";
    } else {
        resultadoEl.textContent = "❌ Resposta errada!";
        resultadoEl.style.color = "red";
        somErro.play();
        botao.style.background = "red";
        botao.style.color = "white";
    }

    botaoProxima.style.display = "block";
}

botaoProxima.addEventListener("click", () => {
    indicePergunta++;
    if (indicePergunta < perguntas.length) {
        carregarPergunta();
    } else {
        perguntaEl.textContent = "🏆 Fim do Quiz!";
        opcoesEl.innerHTML = "";
        resultadoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
        botaoProxima.style.display = "none";
    }
});

carregarPergunta();
