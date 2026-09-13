lucide.createIcons();

const carrinho = [];
const contador = document.getElementById("contador");
const modal = document.getElementById("modal-carrinho");
const itens = document.getElementById("itens-carrinho");
const total = document.getElementById("total-carrinho");
const toast = document.getElementById("toast");

function dinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("visivel"), 2200);
}

function atualizarCarrinho() {
  contador.textContent = carrinho.length;
  itens.innerHTML = "";

  if (!carrinho.length) {
    itens.innerHTML = '<div class="vazio">Seu carrinho está vazio.</div>';
  } else {
    carrinho.forEach((produto, indice) => {
      const item = document.createElement("div");
      item.className = "item-carrinho";
      item.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div>
                            <h3>${produto.nome}</h3>
                            <span>Quantidade: 1</span>
                        </div>
                        <div>
                            <strong>${dinheiro(produto.preco)}</strong>
                            <button class="fechar remover" data-indice="${indice}" aria-label="Remover produto"><i data-lucide="trash-2" size="13"></i></button>
                        </div>
                    `;
      itens.appendChild(item);
    });
  }

  const soma = carrinho.reduce((valor, produto) => valor + produto.preco, 0);
  total.textContent = dinheiro(soma);
  lucide.createIcons();
}

function abrirCarrinho() {
  modal.classList.add("aberto");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
}

function fecharCarrinho() {
  modal.classList.remove("aberto");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");
}

document.querySelectorAll(".adicionar").forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.closest(".produto");
    carrinho.push({
      nome: produto.dataset.nome,
      preco: Number(produto.dataset.preco),
      imagem: produto.dataset.imagem,
    });
    atualizarCarrinho();
    mostrarToast(`${produto.dataset.nome} foi adicionado ao carrinho`);
  });
});

document
  .getElementById("abrir-carrinho")
  .addEventListener("click", abrirCarrinho);
document
  .getElementById("fechar-carrinho")
  .addEventListener("click", fecharCarrinho);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) fecharCarrinho();
  if (evento.target.closest(".remover")) {
    carrinho.splice(
      Number(evento.target.closest(".remover").dataset.indice),
      1,
    );
    atualizarCarrinho();
  }
});

document.getElementById("finalizar").addEventListener("click", () => {
  if (!carrinho.length) {
    mostrarToast("Adicione pelo menos um produto");
    return;
  }
  mostrarToast("Pedido preparado para checkout");
});

document
  .getElementById("newsletter-form")
  .addEventListener("submit", (evento) => {
    evento.preventDefault();
    evento.target.reset();
    mostrarToast("Inscrição realizada com sucesso");
  });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (evento) => {
    const alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) {
      evento.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    }
  });
});

atualizarCarrinho();
