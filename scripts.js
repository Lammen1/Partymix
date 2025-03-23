let cart = [];
let totalPrice = 0;

// Lägg till produkt i varukorgen
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;
    updateCart();
}

// Uppdatera varukorgen på sidan
function updateCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.product} - ${item.price} kr`;

        // Skapa en knapp för att ta bort produkt från varukorgen
        const removeButton = document.createElement("button");
        removeButton.textContent = "Ta bort";
        removeButton.onclick = function() {
            removeFromCart(index);
        };
        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = `Totalt: ${totalPrice} kr`;
}

// Ta bort en produkt från varukorgen
function removeFromCart(index) {
    const product = cart[index];
    totalPrice -= product.price;
    cart.splice(index, 1);
    updateCart();
}

// Gå till kassan
function goToCheckout() {
    const checkoutSection = document.getElementById("checkout");
    checkoutSection.style.display = "block";

    const checkoutItems = document.getElementById("checkout-items");
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.product} - ${item.price} kr`;
        checkoutItems.appendChild(p);
    });

    const checkoutTotal = document.getElementById("checkout-total");
    checkoutTotal.textContent = `Totalt: ${totalPrice} kr`;
}

// Slutför köp
function placeOrder() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Vänligen fyll i alla uppgifter.");
        return;
    }

    alert(`Tack för ditt köp, ${name}! Vi skickar bekräftelse till ${email}.`);
    cart = [];
    totalPrice = 0;
    updateCart();
    document.getElementById("checkout").style.display = "none";
}

// Sök funktion
function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const title = product.querySelector("h2").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Sortera efter pris
function sortByPrice() {
    const products = Array.from(document.querySelectorAll(".product"));
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector("p").textContent.replace("Pris: ", "").replace(" kr", ""));
        const priceB = parseInt(b.querySelector("p").textContent.replace("Pris: ", "").replace(" kr", ""));
        return priceA - priceB;
    });

    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = '';
    products.forEach(product => productContainer.appendChild(product));
}

// Sortera efter namn
function sortByName() {
    const products = Array.from(document.querySelectorAll(".product"));
    products.sort((a, b) => {
        const nameA = a.querySelector("h2").textContent.toLowerCase();
        const nameB = b.querySelector("h2").textContent.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = '';
    products.forEach(product => productContainer.appendChild(product));
}
