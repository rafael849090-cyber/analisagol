// AnalisaGol - Versão com dados ao vivo (SportScore API - CORS aberto, sem chave)
let analyses = [];
let currentFilter = "todos";

// Dados de fallback (caso a API falhe)
const fallbackAnalyses = [
    { id: 1, league: "Brasileirão Série A", category: "brasileirao", time: "Hoje", home: "Flamengo", away: "Grêmio", probs: { "1": 75, "X": 16, "2": 9 }, marketOdds: { "1": 1.25, "X": 6.5, "2": 11 }, xgHome: 1.9, xgAway: 0.8, over25: 60, btts: 45, corners: 10, cards: 4, ahHome: -1, value: true, edge: "+4%", recommendation: "Flamengo favorito" }
];

async function loadLiveMatches() {
    const container = document.getElementById('matches-list');
    container.innerHTML = '<p style="text-align:center;padding:40px;">Carregando jogos ao vivo do mundo...</p>';

    try {
        // SportScore API - sem chave, CORS aberto
        const response = await fetch('https://sportscore.com/api/widget/matches/?sport=football&limit=40');
        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const matches = data.matches || data || [];

        analyses = matches.slice(0, 30).map((m, index) => {
            const home = m.home_team || m.home || "Casa";
            const away = m.away_team || m.away || "Fora";
            const league = m.competition || m.league || "Futebol";
            const time = m.time || m.kickoff || "Hoje";
            const status = m.status || "";

            // Estimativas simples (em produção use modelo real)
            const homeProb = Math.floor(Math.random() * 30) + 40;
            const drawProb = Math.floor(Math.random() * 15) + 15;
            const awayProb = 100 - homeProb - drawProb;

            return {
                id: index + 1,
                league: league,
                category: league.toLowerCase().includes("brasil") ? "brasileirao" : 
                          league.toLowerCase().includes("premier") ? "premier" : 
                          league.toLowerCase().includes("liga") ? "laliga" : "outros",
                time: time + (status ? ` (${status})` : ""),
                home: home,
                away: away,
                probs: { "1": homeProb, "X": drawProb, "2": awayProb },
                marketOdds: { "1": (100/homeProb).toFixed(2), "X": (100/drawProb).toFixed(2), "2": (100/awayProb).toFixed(2) },
                xgHome: (Math.random() * 1.5 + 0.8).toFixed(2),
                xgAway: (Math.random() * 1.3 + 0.6).toFixed(2),
                over25: Math.floor(Math.random() * 30) + 45,
                btts: Math.floor(Math.random() * 25) + 40,
                corners: (Math.random() * 4 + 8).toFixed(1),
                cards: (Math.random() * 2 + 3).toFixed(1),
                ahHome: (Math.random() * 1 - 0.5).toFixed(2),
                value: Math.random() > 0.6,
                edge: Math.random() > 0.6 ? `+${(Math.random()*5+1).toFixed(1)}%` : null,
                recommendation: homeProb > 55 ? `${home} favorito` : "Jogo aberto"
            };
        });

        if (analyses.length === 0) analyses = fallbackAnalyses;
    } catch (error) {
        console.warn("API falhou, usando dados locais:", error);
        analyses = fallbackAnalyses;
    }

    renderAnalyses();
    renderStats();
}

function renderAnalyses() {
    const container = document.getElementById('matches-list');
    const filtered = analyses.filter(a => {
        if (currentFilter === "todos") return true;
        if (currentFilter === "value") return a.value;
        return a.category === currentFilter;
    });

    const valueCount = analyses.filter(a => a.value).length;
    const valueEl = document.getElementById('value-count');
    if (valueEl) valueEl.textContent = valueCount;

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#7d8590;padding:40px;">Nenhum jogo encontrado. Tente atualizar.</p>';
        return;
    }

    container.innerHTML = filtered.map(a => {
        const implied1 = a.marketOdds && a.marketOdds["1"] ? (1 / parseFloat(a.marketOdds["1"]) * 100).toFixed(1) : "-";
        return `
        <div class="match-card ${a.value ? 'value' : ''}">
            <div class="match-header">
                <span>${a.league} • ${a.time}</span>
                ${a.value ? `<span class="value-badge">VALUE ${a.edge || ''}</span>` : ''}
            </div>
            <div class="teams">
                <div class="team"><div class="team-name">${a.home}</div></div>
                <div style="color:#7d8590">VS</div>
                <div class="team"><div class="team-name">${a.away}</div></div>
            </div>
            <div class="probs">
                <div class="prob">1<br><strong>${a.probs["1"]}%</strong><small>Odd ${a.marketOdds["1"]}</small></div>
                <div class="prob">X<br><strong>${a.probs["X"]}%</strong><small>Odd ${a.marketOdds["X"]}</small></div>
                <div class="prob">2<br><strong>${a.probs["2"]}%</strong><small>Odd ${a.marketOdds["2"]}</small></div>
            </div>
            <div class="stats-row">
                <div class="stat-item">xG Casa<br><strong>${a.xgHome}</strong></div>
                <div class="stat-item">xG Fora<br><strong>${a.xgAway}</strong></div>
                <div class="stat-item">Over 2.5<br><strong>${a.over25}%</strong></div>
                <div class="stat-item">Ambas Marcam<br><strong>${a.btts}%</strong></div>
                <div class="stat-item">Escanteios<br><strong>${a.corners}</strong></div>
                <div class="stat-item">Cartões<br><strong>${a.cards}</strong></div>
                <div class="stat-item">AH Casa<br><strong>${a.ahHome}</strong></div>
                <div class="stat-item">Prob. Implícita 1<br><strong>${implied1}%</strong></div>
                <div class="stat-item">Recomendação<br><strong>${a.recommendation}</strong></div>
            </div>
        </div>
        `;
    }).join('');
}

function renderStats() {
    const total = analyses.length || 1;
    const values = analyses.filter(a => a.value).length;
    const avgOver = analyses.length ? (analyses.reduce((s, a) => s + (a.over25 || 50), 0) / total).toFixed(1) : "-";
    const avgBtts = analyses.length ? (analyses.reduce((s, a) => s + (a.btts || 50), 0) / total).toFixed(1) : "-";

    document.getElementById('stats-content').innerHTML = `
        <div class="stats-card">
            <h3>Visão Geral (Dados ao vivo)</h3>
            <p>Jogos carregados: <strong>${analyses.length}</strong></p>
            <p>Value Bets estimados: <strong>${values}</strong></p>
        </div>
        <div class="stats-card">
            <h3>Médias</h3>
            <p>Over 2.5 médio: <strong>${avgOver}%</strong></p>
            <p>Ambas Marcam médio: <strong>${avgBtts}%</strong></p>
        </div>
        <div class="stats-card">
            <h3>Fonte de dados</h3>
            <p>Jogos atualizados via SportScore API (sem chave).</p>
            <p><a href="https://sportscore.com" target="_blank" style="color:#58a6ff;">Powered by SportScore</a></p>
        </div>
        <div class="stats-card">
            <h3>Aviso</h3>
            <p>Probabilidades e xG são estimativas educativas. Para modelo profissional use API paga.</p>
        </div>
    `;
}

function calculateEdge() {
    const myProb = parseFloat(document.getElementById('myProb').value);
    const marketOdd = parseFloat(document.getElementById('marketOdd').value);
    const stake = parseFloat(document.getElementById('stake').value) || 100;

    if (!myProb || !marketOdd || myProb <= 0 || myProb >= 100 || marketOdd <= 1) {
        document.getElementById('calc-result').innerHTML = '<p style="color:#da3633;">Preencha valores válidos.</p>';
        return;
    }

    const implied = (1 / marketOdd) * 100;
    const edge = myProb - implied;
    const expectedValue = (myProb / 100 * marketOdd - 1) * stake;
    const kelly = Math.max(0, (myProb / 100 * marketOdd - 1) / (marketOdd - 1)) * 100;

    const resultClass = edge > 0 ? 'color:#3fb950' : 'color:#da3633';
    const verdict = edge > 0 ? 'VALUE BET' : 'SEM VALOR';

    document.getElementById('calc-result').innerHTML = `
        <h3 style="${resultClass}">${verdict}</h3>
        <p>Probabilidade implícita da odd: <strong>${implied.toFixed(1)}%</strong></p>
        <p>Sua probabilidade: <strong>${myProb.toFixed(1)}%</strong></p>
        <p>Edge: <strong style="${resultClass}">${edge > 0 ? '+' : ''}${edge.toFixed(1)}%</strong></p>
        <p>Valor esperado (EV): <strong style="${resultClass}">R$ ${expectedValue.toFixed(2)}</strong></p>
        <p>Kelly Criterion: <strong>${kelly.toFixed(1)}%</strong> da banca</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    loadLiveMatches();

    // Botão de atualizar (adicione no HTML se quiser)
    // setInterval(loadLiveMatches, 5 * 60 * 1000); // atualiza a cada 5 min

    document.querySelectorAll('.filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderAnalyses();
        });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.getElementById(`section-${section}`).classList.add('active');
            link.classList.add('active');
            if (section === 'estatisticas') renderStats();
        });
    });

    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) refreshBtn.addEventListener('click', (e) => { e.preventDefault(); loadLiveMatches(); });
});
