// Array para armazenar os produtos
let products = [];

// Função para adicionar um novo produto
function addProduct() {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');

  const name = nameInput.value;
  const price = priceInput.value;

  if (name && price) {
    const newProduct = {
      name,
      price
    };

    products.push(newProduct);
    clearInputs();
    displayProducts();
    adicionarProduto(newProduct); // Adicionar produto à mesa
    salvarProduto(newProduct); // Salvar produto no armazenamento local
  }
}

// Função para excluir um produto
function deleteProduct(index) {
  const confirmDelete = confirm('Tem certeza de que deseja excluir este produto?');
  if (confirmDelete) {
    products.splice(index, 1);
    displayProducts();
  }
}

// Função para exibir os produtos
function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="product-name">${product.name}</span>
      <span class="product-price">R$ ${product.price}</span>
      <button class="delete-button" onclick="deleteProduct(${i})">Excluir</button>
      <button class="edit-button" onclick="editProduct(${i})">Editar</button>
    `;

    productList.appendChild(listItem);
  }
}

// Função para limpar os inputs de adicionar produto
function clearInputs() {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');

  nameInput.value = '';
  priceInput.value = '';
}

// Função para editar um produto
function editProduct(index) {
  const product = products[index];

  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');

  nameInput.value = product.name;
  priceInput.value = product.price;

  products.splice(index, 1);
  displayProducts();
}

// Event listener para o botão de adicionar produto
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addProduct);

// Código JavaScript para adicionar produtos às mesas
function adicionarProduto(produto) {
  var mesas = document.getElementsByClassName('mesa');

  for (var i = 0; i < mesas.length; i++) {
    var mesa = mesas[i];
    var listaProdutos = mesa.querySelector('.produtos');

    var novoProduto = document.createElement('li');
    novoProduto.innerHTML = `
      <span class="nome">${produto.name}</span>
      <span class="preco">R$ ${produto.price}</span>
    `;

    listaProdutos.appendChild(novoProduto);
  }
}

// Código JavaScript para salvar produtos no armazenamento local
function salvarProduto(produto) {
  var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Código para carregar os produtos do armazenamento local
function carregarProdutos() {
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
  products = produtosSalvos;
  displayProducts();
}

// Carregar produtos do armazenamento local ao carregar a página
carregarProdutos();

// Função para atualizar um produto
function updateProduct(index) {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');

  const name = nameInput.value;
  const price = priceInput.value;

  if (name && price) {
    const updatedProduct = {
      name,
      price
    };

    products.splice(index, 1, updatedProduct);
    clearInputs();
    displayProducts();
    atualizarProduto(index, updatedProduct); // Atualizar produto na mesa
    atualizarProdutoLocalStorage(); // Atualizar produto no armazenamento local
  }
}

// Código JavaScript para atualizar um produto na mesa
function atualizarProduto(index, produto) {
  var mesas = document.getElementsByClassName('mesa');

  for (var i = 0; i < mesas.length; i++) {
    var mesa = mesas[i];
    var listaProdutos = mesa.querySelector('.produtos');
    var produtos = listaProdutos.getElementsByTagName('li');

    if (index < produtos.length) {
      var produtoAtualizado = produtos[index];
      produtoAtualizado.innerHTML = `
        <span class="nome">${produto.name}</span>
        <span class="preco">R$ ${produto.price}</span>
      `;
    }
  }
}

// Código JavaScript para atualizar produtos no armazenamento local
function atualizarProdutoLocalStorage() {
  localStorage.setItem('produtos', JSON.stringify(products));
}