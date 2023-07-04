// Código JavaScript para buscar dados das mesas no banco de dados e exibir na página

// Simulação de dados do banco de dados
let mesasData = [
    { mesa: 1, produtos: ['Produto 1', 'Produto 2'] },
    { mesa: 2, produtos: ['Produto 3', 'Produto 4', 'Produto 5'] },
    { mesa: 3, produtos: ['Produto 6'] }
  ];
  
  // Função para exibir dados das mesas na página
  function displayMesasData() {
    const table1List = document.getElementById('table-1-list');
    const table2List = document.getElementById('table-2-list');
    const table3List = document.getElementById('table-3-list');
  
    mesasData.forEach((mesaData) => {
      const listItem = document.createElement('li');
      listItem.textContent = mesaData.produtos.join(', ');
  
      switch (mesaData.mesa) {
        case 1:
          table1List.appendChild(listItem);
          break;
        case 2:
          table2List.appendChild(listItem);
          break;
        case 3:
          table3List.appendChild(listItem);
          break;
      }
    });
  }
  
  // Função para abrir o modal de adição de produto
  function openAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    modal.style.display = 'block';
  }
  
  // Função para fechar o modal de adição de produto
  function closeAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    modal.style.display = 'none';
  }
  
  // Função para adicionar produto à mesa
  function addProductToTable() {
    const productNameInput = document.getElementById('product-name-input');
    const selectedTable = document.getElementById('selected-table');
    const tableId = selectedTable.value;
    const product = productNameInput.value;
  
    // Atualize os dados no banco de dados com o produto adicionado à mesa correspondente
    const tableData = mesasData.find((mesaData) => mesaData.mesa === parseInt(tableId));
    tableData.produtos.push(product);
  
    // Atualize a lista de produtos na página
    const tableList = document.getElementById(`table-${tableId}-list`);
    const listItem = document.createElement('li');
    listItem.textContent = product;
    tableList.appendChild(listItem);
  
    // Feche o modal de adição de produto
    closeAddProductModal();
  }
  
  // Chamada inicial para exibir os dados das mesas na página
  displayMesasData();
  // Array para armazenar as mesas
let tables = [1, 2, 3];

// Função para adicionar uma nova mesa
function addTable() {
  const tableId = tables.length + 1;
  tables.push(tableId);

  const tablesContainer = document.querySelector('.tables-container');

  const newTable = document.createElement('div');
  newTable.classList.add('table');
  newTable.innerHTML = `
    <h2 class="table-title">Mesa ${tableId}</h2>
    <ul class="table-list" id="table-${tableId}-list"></ul>
  `;

  tablesContainer.appendChild(newTable);
}

// Função para remover a última mesa
function removeTable() {
  if (tables.length === 0) {
    return;
  }

  const lastTableId = tables.pop();

  const tableToRemove = document.querySelector(`#table-${lastTableId}-list`).parentNode;
  tableToRemove.remove();
}

// Event listeners para os botões
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addTable);

const removeButton = document.querySelector('.remove-button');
removeButton.addEventListener('click', removeTable);

  