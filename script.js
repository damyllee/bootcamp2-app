const SUPABASE_URL = "https://kdocnfremutxvntwmmsp.supabase.co";
const SUPABASE_KEY = "sb_publishable_FwtUQcVdQnVO1HX7GvXEoA__doYkEMO";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function buscarClima() {
    const campo = document.getElementById("campo-cidade");
    const resultado = document.getElementById("resultado");
    const cidade = campo.value.trim();

    if (!cidade) {
        resultado.innerHTML = "<p>Digite uma cidade.</p>";
        return;
    }

    resultado.innerHTML = "<p>Carregando...</p>";

    try {
        const urlCidade =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(cidade) +
            "&count=1&language=pt&format=json";

        const respostaCidade = await fetch(urlCidade);

        if (!respostaCidade.ok) {
            throw new Error("Erro ao buscar a cidade.");
        }

        const dadosCidade = await respostaCidade.json();

        if (!dadosCidade.results || dadosCidade.results.length === 0) {
            resultado.innerHTML = "<p>Cidade não encontrada.</p>";
            return;
        }

        const local = dadosCidade.results[0];

        const urlClima =
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            local.latitude +
            "&longitude=" +
            local.longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto";

        const respostaClima = await fetch(urlClima);

        if (!respostaClima.ok) {
            throw new Error("Erro ao consultar o clima.");
        }

        const dadosClima = await respostaClima.json();

        if (!dadosClima.current) {
            throw new Error("Dados do clima indisponíveis.");
        }

        resultado.innerHTML =
            "<h2>🌤️ " + local.name + "</h2>" +
            "<p>País: " + (local.country || "Não informado") + "</p>" +
            "<div class='info-clima'>" +
                "<div class='info'>🌡️ Temperatura<strong>" +
                    dadosClima.current.temperature_2m + " °C</strong></div>" +
                "<div class='info'>💧 Umidade<strong>" +
                    dadosClima.current.relative_humidity_2m + "%</strong></div>" +
                "<div class='info'>💨 Vento<strong>" +
                    dadosClima.current.wind_speed_10m + " km/h</strong></div>" +
                "<div class='info'>📍 Localização<strong>" +
                    local.latitude.toFixed(2) + ", " +
                    local.longitude.toFixed(2) + "</strong></div>" +
            "</div>";

        const botaoFavorito = document.createElement("button");
        botaoFavorito.textContent = "⭐ Salvar nos favoritos";

        botaoFavorito.addEventListener("click", function () {
            salvarFavorito(
                local.name,
                local.latitude,
                local.longitude
            );
        });

        resultado.appendChild(botaoFavorito);

    } catch (erro) {
        console.error(erro);
        resultado.innerHTML =
            "<p>Não foi possível consultar o clima. Tente novamente.</p>";
    }
}

document.getElementById("botao-buscar").addEventListener("click", buscarClima);

document.getElementById("campo-cidade").addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        buscarClima();
    }
});

async function salvarFavorito(nomeCidade, latitude, longitude) {
    const nomeNormalizado = nomeCidade.trim();

    const { data: existentes, error: erroBusca } = await supabaseClient
        .from("favoritos")
        .select("id")
        .ilike("nome_cidade", nomeNormalizado);

    if (erroBusca) {
        console.error(erroBusca);
        alert("Não foi possível verificar os favoritos.");
        return;
    }

    if (existentes && existentes.length > 0) {
        alert("Essa cidade já está nos favoritos!");
        return;
    }

    const { error } = await supabaseClient
        .from("favoritos")
        .insert({
            nome_cidade: nomeNormalizado,
            latitude: latitude,
            longitude: longitude
        });

    if (error) {
        console.error(error);
        alert("Erro ao salvar cidade: " + error.message);
        return;
    }

    alert("Cidade salva nos favoritos!");
    await listarFavoritos();
}

async function listarFavoritos() {
    const lista = document.getElementById("lista-favoritos");
    lista.innerHTML = "<p>Carregando favoritos...</p>";

    const { data, error } = await supabaseClient
        .from("favoritos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        lista.innerHTML = "<p>Erro ao carregar favoritos.</p>";
        return;
    }

    lista.innerHTML = "";

    if (!data || data.length === 0) {
        lista.innerHTML = "<p>Nenhuma cidade favorita salva.</p>";
        return;
    }

    const cidadesExibidas = new Set();

    data.forEach(function (cidade) {
        const chave = cidade.nome_cidade.trim().toLowerCase();

        if (cidadesExibidas.has(chave)) {
            return;
        }

        cidadesExibidas.add(chave);

        const item = document.createElement("div");
        item.className = "favorito-item";

        const nome = document.createElement("span");
        nome.textContent = cidade.nome_cidade;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function () {
            excluirFavorito(cidade.id);
        });

        item.appendChild(nome);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });
}

async function excluirFavorito(id) {
    const { error } = await supabaseClient
        .from("favoritos")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Erro ao excluir favorito: " + error.message);
        return;
    }

    await listarFavoritos();
}

listarFavoritos();
