
async function buscarClima() {
    var campo = document.getElementById("campo-cidade");
    var resultado = document.getElementById("resultado");

    var cidade = campo.value.trim();

    if (cidade === "") {
        resultado.innerHTML = "<p>Digite uma cidade.</p>";
        return;
    }

    resultado.innerHTML = "<p>Carregando...</p>";

    try {
        var urlCidade =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(cidade) +
            "&count=1&language=pt&format=json";

        var respostaCidade = await fetch(urlCidade);
        var dadosCidade = await respostaCidade.json();

        if (!dadosCidade.results || dadosCidade.results.length === 0) {
            resultado.innerHTML = "<p>Cidade não encontrada.</p>";
            return;
        }

        var local = dadosCidade.results[0];

        var urlClima =
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            local.latitude +
            "&longitude=" +
            local.longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto";

        var respostaClima = await fetch(urlClima);
        var dadosClima = await respostaClima.json();

        resultado.innerHTML =
            "<h2>🌤️ " + local.name + "</h2>" +
            "<p>País: " + (local.country || "Não informado") + "</p>" +
            "<div class='info-clima'>" +
            "<div class='info'>" +
            "🌡️ Temperatura" +
            "<strong>" + dadosClima.current.temperature_2m + " °C</strong>" +
            "</div>" +
            "<div class='info'>" +
            "💧 Umidade" +
            "<strong>" + dadosClima.current.relative_humidity_2m + "%</strong>" +
            "</div>" +
            "<div class='info'>" +
            "💨 Vento" +
            "<strong>" + dadosClima.current.wind_speed_10m + " km/h</strong>" +
            "</div>" +
            "<div class='info'>" +
            "📍 Localização" +
            "<strong>" +
            local.latitude.toFixed(2) +
            ", " +
            local.longitude.toFixed(2) +
            "</strong>" +
            "</div>" +
            "</div>";

    } catch (erro) {
        resultado.innerHTML =
            "<p>Não foi possível consultar o clima.</p>" +
            "<p>Verifique sua conexão e tente novamente.</p>";
    }

}

var botao = document.getElementById("botao-buscar");

botao.addEventListener("click", buscarClima);

