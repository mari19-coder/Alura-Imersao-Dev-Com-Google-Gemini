const cardContainer = document.querySelector(".Card-Container");
const inputBusca = document.querySelector("header input");
const botaoBusca = document.querySelector("#botao-busca");
let dados= [];

// Carrega os dados do JSON e renderiza todos os cards inicialmente.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function IniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase().trim();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos

    if (cardsParaRenderizar.length === 0) {
        cardContainer.innerHTML = `<p class="sem-resultados">Nenhum resultado encontrado para a sua busca.</p>`;
        return;
    }

    for (const dado of cardsParaRenderizar) {
        let article = document.createElement("article"); 
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano de lançamento:</strong> ${dado.data_criacao}</p>
            <p>${dado.descricao}</p>  
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Adiciona um listener para o clique no botão, substituindo o onclick do HTML
botaoBusca.addEventListener("click", IniciarBusca);

// Adiciona um listener para a tecla "Enter" no campo de busca
inputBusca.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        IniciarBusca();
    }
});

// Chama a função para carregar os dados quando o script é executado.
carregarDados();