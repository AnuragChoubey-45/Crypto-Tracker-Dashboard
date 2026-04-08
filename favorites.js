const container = document.getElementById("crypto-container");

async function loadFavorites() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );

  const data = await res.json();

  const favIds = JSON.parse(localStorage.getItem("favorites")) || [];

  // 🔥 filter favorites using HOF
  const favCoins = data.filter((coin) =>
    favIds.includes(coin.id)
  );

  displayData(favCoins);
}

function displayData(coins) {
  container.innerHTML = "";

  coins.forEach((coin) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${coin.name}</h3>
      <p>$${coin.current_price}</p>
    `;

    container.appendChild(div);
  });
}

loadFavorites();