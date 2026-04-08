const container = document.getElementById("crypto-container");
const searchInput = document.getElementById("searchInput");

let coins = []; // 🔥 global data storage

async function fetchCrypto() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );

  const data = await res.json();

  coins = data; // store globally
  displayData(coins);
}

// 🔗 Open coin details page
function openCoin(id) {
  localStorage.setItem("selectedCoin", id);
  window.location.href = "coin.html";
}

// 🎨 Display coins
function displayData(coinsArray) {
  container.innerHTML = "";

  coinsArray.slice(0, 20).forEach((coin) => {
    const change = coin.price_change_percentage_24h;

    const div = document.createElement("div");
    div.className = "card";

    div.onclick = () => {
      openCoin(coin.id);
    };

    div.innerHTML = `
      <div class="coin-header">
        <img src="${coin.image}" />
        <div>
          <h3>${coin.name}</h3>
          <p class="symbol">${coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <p class="price">$${coin.current_price}</p>

      <p class="${change > 0 ? "green" : "red"}">
        ${change.toFixed(2)}%
      </p>

      <button onclick="addToFav('${coin.id}')">❤️</button>
    `;

    container.appendChild(div);
  });
}

// 🔍 SEARCH (HOF - filter)
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filteredCoins = coins.filter((coin) => {
    if (value === "") return true;

    return (
      coin.name.toLowerCase().includes(value) ||
      coin.symbol.toLowerCase().includes(value)
    );
  });

  displayData(filteredCoins);
});

// 🚀 Initial call
fetchCrypto();