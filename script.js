const analyses = [
    // Brasileirão Série A
    { id: 1, league: "Brasileirão Série A", category: "brasileirao", time: "Hoje 21:30", home: "Flamengo", away: "Palmeiras", probs: { "1": 46.1, "X": 27.3, "2": 26.6 }, marketOdds: { "1": 2.05, "X": 3.30, "2": 3.45 }, xgHome: 1.72, xgAway: 1.18, over25: 58, btts: 54, corners: 9.8, cards: 4.2, ahHome: -0.25, value: true, edge: "+5.3%", recommendation: "Flamengo vence" },
    { id: 2, league: "Brasileirão Série A", category: "brasileirao", time: "Hoje 16:00", home: "Botafogo", away: "Bahia", probs: { "1": 52.0, "X": 24.5, "2": 23.5 }, marketOdds: { "1": 1.75, "X": 3.60, "2": 4.60 }, xgHome: 1.85, xgAway: 1.05, over25: 62, btts: 48, corners: 10.2, cards: 3.8, ahHome: -0.5, value: true, edge: "+4.1%", recommendation: "Botafogo vence" },
    { id: 5, league: "Brasileirão Série A", category: "brasileirao", time: "Hoje 19:00", home: "São Paulo", away: "Corinthians", probs: { "1": 44.0, "X": 28.0, "2": 28.0 }, marketOdds: { "1": 1.90, "X": 3.40, "2": 4.10 }, xgHome: 1.55, xgAway: 1.22, over25: 55, btts: 61, corners: 9.4, cards: 4.5, ahHome: -0.25, value: false, edge: null, recommendation: "Clássico equilibrado" },
    // Libertadores
    { id: 3, league: "Libertadores", category: "libertadores", time: "Amanhã 19:00", home: "Internacional", away: "Atlético-MG", probs: { "1": 38.2, "X": 29.1, "2": 32.7 }, marketOdds: { "1": 2.25, "X": 3.20, "2": 3.10 }, xgHome: 1.40, xgAway: 1.32, over25: 52, btts: 57, corners: 9.1, cards: 4.0, ahHome: 0, value: false, edge: null, recommendation: "Jogo equilibrado" },
    // Champions
    { id: 4, league: "Champions League", category: "champions", time: "Amanhã 16:00", home: "Real Madrid", away: "Manchester City", probs: { "1": 41.5, "X": 26.0, "2": 32.5 }, marketOdds: { "1": 2.10, "X": 3.50, "2": 3.20 }, xgHome: 1.65, xgAway: 1.48, over25: 64, btts: 59, corners: 10.6, cards: 3.5, ahHome: -0.25, value: true, edge: "+3.8%", recommendation: "Real Madrid" },
    // Premier League
    { id: 6, league: "Premier League", category: "premier", time: "Amanhã 13:30", home: "Arsenal", away: "Liverpool", probs: { "1": 43.2, "X": 25.8, "2": 31.0 }, marketOdds: { "1": 2.15, "X": 3.40, "2": 3.25 }, xgHome: 1.68, xgAway: 1.45, over25: 61, btts: 58, corners: 10.4, cards: 3.2, ahHome: -0.25, value: true, edge: "+2.9%", recommendation: "Arsenal" },
    { id: 7, league: "Premier League", category: "premier", time: "Domingo 12:00", home: "Manchester United", away: "Chelsea", probs: { "1": 39.5, "X": 27.0, "2": 33.5 }, marketOdds: { "1": 2.40, "X": 3.30, "2": 2.90 }, xgHome: 1.42, xgAway: 1.38, over25: 56, btts: 55, corners: 9.7, cards: 4.1, ahHome: 0, value: false, edge: null, recommendation: "Clássico equilibrado" },
    // La Liga
    { id: 8, league: "La Liga", category: "laliga", time: "Sábado 17:00", home: "Barcelona", away: "Real Madrid", probs: { "1": 40.0, "X": 26.5, "2": 33.5 }, marketOdds: { "1": 2.30, "X": 3.45, "2": 2.95 }, xgHome: 1.70, xgAway: 1.55, over25: 63, btts: 62, corners: 10.8, cards: 3.8, ahHome: 0, value: true, edge: "+3.2%", recommendation: "El Clásico - Over 2.5" },
    // Serie A
    { id: 9, league: "Serie A", category: "seriea", time: "Domingo 16:45", home: "Inter", away: "Juventus", probs: { "1": 47.5, "X": 26.0, "2": 26.5 }, marketOdds: { "1": 1.95, "X": 3.40, "2": 3.80 }, xgHome: 1.60, xgAway: 1.15, over25: 51, btts: 49, corners: 9.3, cards: 4.3, ahHome: -0.5, value: true, edge: "+4.5%", recommendation: "Inter vence" },
    // Bundesliga
    { id: 10, league: "Bundesliga", category: "bundesliga", time: "Sábado 11:30", home: "Bayern Munich", away: "Borussia Dortmund", probs: { "1": 55.0, "X": 22.0, "2": 23.0 }, marketOdds: { "1": 1.65, "X": 4.00, "2": 4.50 }, xgHome: 2.10, xgAway: 1.25, over25: 68, btts: 52, corners: 11.2, cards: 3.0, ahHome: -0.75, value: false, edge: null, recommendation: "Bayern favorito" },
    // Ligue 1
    { id: 13, league: "Ligue 1", category: "ligue1", time: "Domingo 15:00", home: "PSG", away: "Marseille", probs: { "1": 58.0, "X": 22.5, "2": 19.5 }, marketOdds: { "1": 1.55, "X": 4.20, "2": 5.50 }, xgHome: 2.05, xgAway: 1.10, over25: 60, btts: 45, corners: 10.0, cards: 4.0, ahHome: -1.0, value: true, edge: "+3.5%", recommendation: "PSG -1" },
    // Eredivisie
    { id: 14, league: "Eredivisie", category: "eredivisie", time: "Sábado 10:30", home: "Ajax", away: "PSV", probs: { "1": 42.0, "X": 25.0, "2": 33.0 }, marketOdds: { "1": 2.20, "X": 3.50, "2": 3.00 }, xgHome: 1.75, xgAway: 1.50, over25: 66, btts: 63, corners: 11.5, cards: 3.2, ahHome: 0, value: true, edge: "+2.8%", recommendation: "Over 2.5" },
    // Liga Portugal
    { id: 15, league: "Liga Portugal", category: "liga-pt", time: "Sábado 15:30", home: "Benfica", away: "Porto", probs: { "1": 45.0, "X": 27.0, "2": 28.0 }, marketOdds: { "1": 2.05, "X": 3.40, "2": 3.50 }, xgHome: 1.62, xgAway: 1.28, over25: 57, btts: 55, corners: 9.9, cards: 4.4, ahHome: -0.25, value: true, edge: "+3.0%", recommendation: "Benfica" },
    // MLS
    { id: 16, league: "MLS", category: "mls", time: "Sábado 20:00", home: "Inter Miami", away: "LA Galaxy", probs: { "1": 48.0, "X": 26.0, "2": 26.0 }, marketOdds: { "1": 1.90, "X": 3.60, "2": 3.70 }, xgHome: 1.58, xgAway: 1.20, over25: 59, btts: 52, corners: 9.6, cards: 3.5, ahHome: -0.25, value: true, edge: "+4.2%", recommendation: "Inter Miami" },
    // Copa do Brasil
    { id: 12, league: "Copa do Brasil", category: "copa", time: "Quarta 21:30", home: "Grêmio", away: "Fluminense", probs: { "1": 42.0, "X": 28.5, "2": 29.5 }, marketOdds: { "1": 2.20, "X": 3.25, "2": 3.30 }, xgHome: 1.48, xgAway: 1.30, over25: 54, btts: 56, corners: 9.5, cards: 4.1, ahHome: 0, value: false, edge: null, recommendation: "Jogo aberto" }
];

let currentFilter = "todos";

function renderAnalyses() {
    const container = document.getElementById('matches-list');
    const filtered = analyses.filter(a => {
        if (currentFilter === "todos") return true;
        if (currentFilter === "value") return a.value;
        return a.category === currentFilter;
    });

    document.getElementById('value-count').textContent = analyses.filter(a => a.value).length;

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#7d8590;padding:40px;">Nenhum jogo encontrado neste filtro.</p>';
        return;
    }

    container.innerHTML = filtered.map(a => {
        const implied1 = (1 / a.marketOdds["1"] * 100).toFixed(1);
        return `
        <div class="match-card ${a.value ? 'value' : ''}">
            <div class="match-header">
                <span>${a.league} • ${a.time}</span>
                ${a.value ? `<span class="value-badge">VALUE ${a.edge}</span>` : ''}
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
    const total = analyses.length;
    const values = analyses.filter(a => a.value).length;
    const avgOver = (analyses.reduce((s, a) => s + a.over25, 0) / total).toFixed(1);
    const avgBtts = (analyses.reduce((s, a) => s + a.btts, 0) / total).toFixed(1);
    const avgCorners = (analyses.reduce((s, a) => s + a.corners, 0) / total).toFixed(1);

    const byLeague = {};
    analyses.forEach(a => {
        if (!byLeague[a.league]) byLeague[a.league] = { count: 0, values: 0 };
        byLeague[a.league].count++;
        if (a.value) byLeague[a.league].values++;
    });

    let leagueHtml = Object.entries(byLeague).map(([league, data]) => 
        `<div>${league}: ${data.count} jogos (${data.values} value)</div>`
    ).join('');

    document.getElementById('stats-content').innerHTML = `
        <div class="stats-card">
            <h3>Visão Geral</h3>
            <p>Total de jogos analisados: <strong>${total}</strong></p>
            <p>Value Bets encontrados: <strong>${values}</strong></p>
            <p>Taxa de value: <strong>${((values/total)*100).toFixed(1)}%</strong></p>
        </div>
        <div class="stats-card">
            <h3>Médias dos Mercados</h3>
            <p>Over 2.5 médio: <strong>${avgOver}%</strong></p>
            <p>Ambas Marcam médio: <strong>${avgBtts}%</strong></p>
            <p>Escanteios médio: <strong>${avgCorners}</strong></p>
        </div>
        <div class="stats-card">
            <h3>Por Liga</h3>
            ${leagueHtml}
        </div>
        <div class="stats-card">
            <h3>Performance Simulada (30 dias)</h3>
            <p>Acertos: <strong>63%</strong></p>
            <p>Units: <strong>+18.7</strong></p>
            <p>ROI: <strong>+12.4%</strong></p>
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
        <p>Kelly Criterion sugerido: <strong>${kelly.toFixed(1)}%</strong> da banca</p>
        <p style="margin-top:12px;font-size:13px;color:#7d8590;">Edge positivo = aposta com valor esperado positivo a longo prazo.</p>
    `;
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const section = link.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-' + section).classList.add('active');
        if (section === 'estatisticas') renderStats();
    });
});

// Filters
document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter || "todos";
        renderAnalyses();
    });
});

// Calculator
document.getElementById('calc-btn').addEventListener('click', calculateEdge);

// Init
renderAnalyses();
renderStats();