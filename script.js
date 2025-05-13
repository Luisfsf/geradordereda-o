const divIngredientes = document.getElementById('ingredients');
const divResposta = document.getElementById('response');
const btnGerarRedacao = document.getElementById('generate-recipe-btn');
const btnLimparCampos = document.getElementById('clear-ingredients-btn');

function atualizarBotoesRemover() {
    const botoesRemover = divIngredientes.querySelectorAll('.ingredient-row .btn-danger');
    const linhasIngrediente = divIngredientes.querySelectorAll('.ingredient-row');
    const contadorLinhas = linhasIngrediente.length;
    botoesRemover.forEach(botao => {
        botao.disabled = contadorLinhas <= 3;
    });
}

function adicionarIngrediente() {
    const linhaIngredienteDiv = document.createElement('div');
    linhaIngredienteDiv.className = 'ingredient-row flex items-center space-x-2';

    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.className = 'ingredient ingredient-input flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700';
    novoInput.placeholder = `Informe um elemento (ex: meio ambiente, guerras...)`;

    const botaoRemover = document.createElement('button');
    botaoRemover.className = 'btn-danger bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 text-sm';
    botaoRemover.innerText = 'Excluir';
    botaoRemover.addEventListener('click', () => removerIngrediente(botaoRemover));

    linhaIngredienteDiv.appendChild(novoInput);
    linhaIngredienteDiv.appendChild(botaoRemover);
    divIngredientes.appendChild(linhaIngredienteDiv);

    atualizarBotoesRemover();
}

function removerIngrediente(botao) {
    const linha = botao.parentElement;
    if (linha) {
        linha.remove();
    }
    atualizarBotoesRemover();
}

function limparCamposIngredientes() {
    const inputs = divIngredientes.querySelectorAll('.ingredient-row .ingredient-input');
    inputs.forEach(input => {
        input.value = '';
    });
}

function renderizarRedacao(dados) {
    if (!dados || !dados.titulo || !Array.isArray(dados.linhas)) {
        divResposta.innerHTML = '<p class="text-red-600 font-semibold">Erro ao renderizar a redação recebida.</p>';
        return;
    }

    let html = `
        <h2 class="text-2xl font-bold mb-4 text-gray-800">${dados.titulo}</h2>
        <p class="text-sm text-gray-500 mb-4"><strong>Estrutura:</strong> ${dados.estrutura || "Não especificada"}</p>
        <div class="space-y-2 text-gray-800">
            ${dados.linhas.map(linha => `<p>${linha}</p>`).join("")}
        </div>
    `;

    divResposta.innerHTML = html;
    divResposta.classList.remove("text-red-600");
    divResposta.className = 'response bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6 text-left max-w-xl mx-auto';
}

async function enviarFormulario() {
    btnGerarRedacao.disabled = true;
    btnGerarRedacao.innerHTML = 'Gerando...';
    divResposta.innerHTML = 'Carregando...';
    divResposta.classList.remove('hidden');

    const inputs = divIngredientes.querySelectorAll('.ingredient-row .ingredient-input');
    const elementos = [];

    inputs.forEach(input => {
        const valor = input.value.trim();
        if (valor) {
            elementos.push(valor);
        }
    });

    if (elementos.length < 3) {
        alert('Por favor, preencha pelo menos três elementos para gerar a redação!');
        divResposta.classList.add('hidden');
        btnGerarRedacao.disabled = false;
        btnGerarRedacao.innerHTML = 'Gerar Redação';
        return;
    }

    const dados = { temas: elementos };

    try {
        const resposta = await fetch('http://localhost:5000/redacao', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado && resultado.titulo && Array.isArray(resultado.linhas)) {
            renderizarRedacao(resultado);
            limparCamposIngredientes();
        } else if (resultado.error) {
            divResposta.innerHTML = `<p class="text-red-600 font-semibold">Erro da API: ${resultado.error}</p>`;
        } else {
            divResposta.innerHTML = '<p class="text-red-600 font-semibold">Erro: resposta inesperada da API.</p>';
        }

    } catch (erro) {
        divResposta.innerHTML = `<p class="text-red-600 font-semibold">Erro ao comunicar com o servidor: ${erro.message}</p>`;
    } finally {
        btnGerarRedacao.disabled = false;
        btnGerarRedacao.innerHTML = 'Gerar Redação';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('add-ingredient-btn');
    btnAdicionar.addEventListener('click', adicionarIngrediente);
    btnGerarRedacao.addEventListener('click', enviarFormulario);
    btnLimparCampos.addEventListener('click', limparCamposIngredientes);

    const botoesRemoverIniciais = divIngredientes.querySelectorAll('.ingredient-row .btn-danger');
    botoesRemoverIniciais.forEach(botao => {
        botao.addEventListener('click', () => removerIngrediente(botao));
    });

    atualizarBotoesRemover();
});
