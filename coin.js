const coinId = localStorage.getItem("selectedCoin");

async function fetchCoin() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?sparkline=true`
  );

  const coin = await res.json(); // ✅ define coin here

  console.log(coin.market_data.sparkline_7d); // ✅ now works

  displayCoin(coin);
}
function goBack() {
  window.location.href = "index.html";
}
function displayCoin(coin) {
  document.getElementById("coin-name").innerText = coin.name;

  document.getElementById("coin-detail").innerHTML = `
    <img src="${coin.image.large}" width="80" />
    <p>💰 Price: $${coin.market_data.current_price.usd}</p>
    <p>📊 Market Cap: $${coin.market_data.market_cap.usd}</p>
    <p>📉 24h Change: ${coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
  `;

  createChart(coin.market_data.sparkline_7d.price);
}

function createChart(prices) {
  const ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: prices,
      datasets: [{
        data: prices,
        borderColor: "blue",
        pointRadius: 0,
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

fetchCoin();