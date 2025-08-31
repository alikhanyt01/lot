document.addEventListener("DOMContentLoaded", function () {
  const accountBalanceInput = document.getElementById("accountBalance");
  const riskPercentageInput = document.getElementById("riskPercentage");
  const stopLossInput = document.getElementById("stopLoss");
  const assetTypeSelect = document.getElementById("assetType");
  const tradingPairSelect = document.getElementById("tradingPair");
  const riskAmountDisplay = document.getElementById("riskAmount");
  const calculatorDiv = document.querySelector(".calculator");
  const inputFields = document.querySelectorAll("input, select");
  const resultSection = document.querySelector(".result");
  const riskDisplay = document.querySelector(".risk-display");

  calculatorDiv.style.background = "linear-gradient(to right, #1c3f5f, #0a1621)";
  calculatorDiv.style.padding = "40px";
  calculatorDiv.style.borderRadius = "15px";
  calculatorDiv.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
  calculatorDiv.style.width = "400px";
  calculatorDiv.style.textAlign = "center";

  inputFields.forEach(field => {
    field.style.width = "100%";
    field.style.background = "linear-gradient(to right, #1c3f5f, #0a1621)";
    field.style.border = "1px solid #1c3f5f";
    field.style.color = "#fff";
    field.style.padding = "10px";
    field.style.borderRadius = "5px";
    field.style.boxSizing = "border-box";
  });

  resultSection.style.background = "linear-gradient(to right, #1c3f5f, #0a1621)";
  resultSection.style.padding = "15px";
  resultSection.style.borderRadius = "5px";
  resultSection.style.color = "#00ff88";
  resultSection.style.fontWeight = "bold";

  riskDisplay.style.background = "linear-gradient(to right, #1c3f5f, #0a1621)";
  riskDisplay.style.padding = "10px";
  riskDisplay.style.borderRadius = "5px";
  riskDisplay.style.color = "#00d4ff";
  riskDisplay.style.fontWeight = "bold";
  riskDisplay.style.textAlign = "center";
  riskDisplay.style.width = "100%";
  riskDisplay.style.boxSizing = "border-box";

  const logoImg = document.createElement("img");
  logoImg.src = "https://assets.onecompiler.app/43ac9brbf/43ac9cbyd/skill-centric-png-logo-1024x224.png"; // Update with actual logo path
  logoImg.alt = "Forex Calculator Logo";
  logoImg.style.width = "200px";
  logoImg.style.margin = "0 auto 20px auto";
  logoImg.style.display = "block";
  calculatorDiv.insertBefore(logoImg, calculatorDiv.firstChild);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeCommas(value) {
    return value.replace(/,/g, "");
  }

  accountBalanceInput.addEventListener("input", function (event) {
    let value = event.target.value;
    value = removeCommas(value);
    if (!isNaN(value) && value !== "") {
      event.target.value = formatNumberWithCommas(value);
    }
    updateRiskAmount();
  });

  riskPercentageInput.addEventListener("input", updateRiskAmount);

  const pipValues = {
    "EURUSD": 10, "EURGBP": 12.61, "EURJPY": 6.67, "GBPUSD": 10, "GBPJPY": 6.67, "USDJPY": 6.67, "USDCAD": 6.93,
    "XAUUSD": 10, "XAGUSD": 50, "XTIUSD": 10, "XBRUSD": 10, "XNGUSD": 10,
    "US500": 1, "US30": 1, "NAS100": 1, "GER40": 1.04, "UK100": 1.26,
    "BTCUSD": 10 
  };

  const assets = {
    "commodities": ["XAUUSD", "XAGUSD", "XTIUSD", "XBRUSD", "XNGUSD"],
    "forex": ["EURUSD", "EURGBP", "EURJPY", "GBPUSD", "GBPJPY", "USDJPY", "USDCAD"],
    "indices": ["US30", "US500", "NAS100", "UK100", "GER40"],
    "crypto": ["BTCUSD"]
  };

  function updatePairs() {
    const assetType = assetTypeSelect.value;
    tradingPairSelect.innerHTML = "";

    assets[assetType].forEach(pair => {
      const option = document.createElement("option");
      option.value = pair;
      option.textContent = pair;
      tradingPairSelect.appendChild(option);
    });
  }

  updatePairs();
  assetTypeSelect.addEventListener("change", updatePairs);

  function updateRiskAmount() {
    let accountBalance = parseFloat(removeCommas(accountBalanceInput.value));
    let riskPercentage = parseFloat(riskPercentageInput.value);

    if (!isNaN(accountBalance) && !isNaN(riskPercentage)) {
      let riskAmount = (accountBalance * riskPercentage) / 100;
      riskAmountDisplay.textContent = `$${formatNumberWithCommas(riskAmount.toFixed(2))}`;
    } else {
      riskAmountDisplay.textContent = "$0.00";
    }
  }

  window.calculateLotSize = function () {
    let accountBalance = parseFloat(removeCommas(accountBalanceInput.value));
    const riskPercentage = parseFloat(riskPercentageInput.value);
    const stopLoss = parseFloat(stopLossInput.value);
    const tradingPair = tradingPairSelect.value;

    if (!accountBalance || !riskPercentage || !stopLoss) {
      document.getElementById("resultText").innerText = "Enter valid values!";
      return;
    }

    const riskAmount = (accountBalance * riskPercentage) / 100;
    const pipValue = pipValues[tradingPair] || 10;
    const lotSize = (riskAmount / (stopLoss * pipValue)).toFixed(2);

    document.getElementById("resultText").innerText = `Lot Size: ${lotSize}`;
  };
});
