document.addEventListener("DOMContentLoaded", () => {
  const comandaTable = document.getElementById("comanda-table");
  const addButtons = document.getElementsByClassName("add-btn");
  const totalValue = document.getElementById("total-value");
  const finalTotalValue = document.getElementById("final-total-value");
  const discountInput = document.getElementById("discount-input");
  const applyDiscountBtn = document.getElementById("apply-discount-btn");
  let total = 0;

  function updateTotal() {
    total = 0;
    const rows = comandaTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    Array.from(rows).forEach(row => {
      const quantity = parseInt(row.querySelector(".quantity-input").value);
      const price = parseFloat(row.getAttribute("data-price"));
      const subtotal = quantity * price;
      row.querySelector(".subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
      total += subtotal;
    });
    totalValue.textContent = `R$ ${total.toFixed(2)}`;
    updateFinalTotal();
  }

  function updateFinalTotal() {
    const discountPercentage = parseFloat(discountInput.value);
    const discountAmount = total * (discountPercentage / 100);
    const finalTotal = total - discountAmount;
    finalTotalValue.textContent = `R$ ${finalTotal.toFixed(2)}`;
  }

  Array.from(addButtons).forEach(button => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product");
      const price = parseFloat(button.getAttribute("data-price"));
      const quantity = parseInt(button.parentNode.querySelector(".quantity-input").value);
      const subtotal = quantity * price;

      const row = document.createElement("tr");
      row.setAttribute("data-price", price);
      row.innerHTML = `
        <td>${product}</td>
        <td>${quantity}</td>
        <td>R$ ${price.toFixed(2)}</td>
        <td class="subtotal">R$ ${subtotal.toFixed(2)}</td>
        <td><button class="remove-btn">Remover</button></td>
      `;
      comandaTable.getElementsByTagName("tbody")[0].appendChild(row);

      const removeButton = row.querySelector(".remove-btn");
      removeButton.addEventListener("click", () => {
        const subtotalToRemove = parseFloat(row.querySelector(".subtotal").textContent.substring(3));
        total -= subtotalToRemove;
        totalValue.textContent = `R$ ${total.toFixed(2)}`;
        row.remove();
        updateFinalTotal();
      });

      updateTotal();
    });
  });

  discountInput.addEventListener("input", () => {
    updateFinalTotal();
  });

  applyDiscountBtn.addEventListener("click", () => {
    updateFinalTotal();
  });
});
