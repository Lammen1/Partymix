// checkout.js
// Denna fil hanterar varukorgen och kunduppgifter på kassan (checkout.html)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;

// Uppdatera varukorgen på kassasidan
function updateCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.product} - ${item.price} kr`;
        checkoutItems.appendChild(p);
    });

    const checkoutTotal = document.getElementById("checkout-total");
    totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
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
    // Töm varukorgen
    localStorage.removeItem("cart");
    cart = [];
    updateCheckout();
}

updateCheckout();
