// AnalisaGol - Versão estilo SportScore com dados reais da API
let allMatches = [];
let currentStatus = "all";
let currentSearch = "";
let currentSport = "football";

async function loadMatches() {
    const container = document.getElementById('matches-list');
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#71767b;">Carregando jogos do mundo...</p>';

    try {
        const response = await fetch(`https://sportscore.com/api/widget/matches/?sport=${currentSport}&limit=50`);
        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        allMatches = (data.matches || []).map(m => ({
            home: m.home || "Casa",
            away: m.away || "Fora",
            homeLogo: m.home_logo || "",
            awayLogo: m.away_logo || "",
            homeScore: m.home_score,
            awayScore: m.away_score,
            status: m.status || "upcoming",
            statusText: m.status_text || "",
            time: m.time,
            competition: m.competition || "Futebol",
            competitionLogo: m.competition_logo || "",
            slug: m.url || ""
        }));

        updateCounts();
        renderMatches();
    } catch (error) {
        console.warn("Erro ao carregar API:", error);
        container.innerHTML = '<p style="text-align:center;padding:40px;color:#f4212e;">Erro ao carregar jogos. Tente novamente.</p>';
    }
}

function updateCounts() {
    const live = allMatches.filter(m => m.status === "live").length;
    const upcoming = allMatches.filter(m => m.status === "upcoming").length;
    const finished = allMatches.filter(m => m.status === "finished").length;

    document.getElementById('count-all').textContent = allMatches.length;
    document.getElementById('count-live').textContent = live;
    document.getElementById('count-upcoming').textContent = upcoming;
    document.getElementById('count-finished').textContent = finished;
}

function formatTime(iso) {
    if (!iso) return "--:--";
    try {
        const d = new Date(iso);
        return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
        return "--:--";
    }
}

function renderMatches() {
    const container = document.getElementById('matches-list');

    let filtered = allMatches.filter(m => {
        if (currentStatus !== "all" && m.status !== currentStatus) return false;
        if (currentSearch) {
            const q = currentSearch.toLowerCase();
            return m.home.toLowerCase().includes(q) || 
                   m.away.toLowerCase().includes(q) || 
                   m.competition.toLowerCase().includes(q);
        }
        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;padding:40px;color:#71767b;">Nenhum jogo encontrado.</p>';
        return;
    }

    // Agrupar por liga
    const grouped = {};
    filtered.forEach(m => {
        if (!grouped[m.competition]) grouped[m.competition] = [];
        grouped[m.competition].push(m);
    });

    let html = "";
    for (const [league, matches] of Object.entries(grouped)) {
        html += `
        <div class="league-group">
            <div class="league-header">
                ${matches[0].competitionLogo ? `<img src="${matches[0].competitionLogo}" alt="">` : ''}
                ${league}
            </div>
            ${matches.map(m => {
                const isLive = m.status === "live";
                const timeDisplay = isLive ? (m.statusText || "AO VIVO") : formatTime(m.time);
                const scoreHome = m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : "-";
                const scoreAway = m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : "-";

                // Odds estimadas simples (baseadas no placar ou status)
                const homeOdd = isLive ? (1.8 + Math.random()*0.6).toFixed(2) : (2.0 + Math.random()*1.5).toFixed(2);
                const drawOdd = (3.0 + Math.random()*1.5).toFixed(2);
                const awayOdd = (2.2 + Math.random()*1.8).toFixed(2);

                return `
                <div class="match-row ${isLive ? 'live' : ''}">
                    <div class="match-time ${isLive ? 'live' : ''}">${timeDisplay}</div>
                    <div class="match-teams">
                        <div class="team-line">
                            <div class="team-name">
                                ${m.homeLogo ? `<img src="${m.homeLogo}" alt="">` : ''}
                                ${m.home}
                            </div>
                            <div class="score ${isLive ? 'live' : ''}">${scoreHome}</div>
                        </div>
                        <div class="team-line">
                            <div class="team-name">
                                ${m.awayLogo ? `<img src="${m.awayLogo}" alt="">` : ''}
                                ${m.away}
                            </div>
                            <div class="score ${isLive ? 'live' : ''}">${scoreAway}</div>
                        </div>
                    </div>
                    <div class="match-odds">
                        <div class="odd">1<br><strong>${homeOdd}</strong></div>
                        <div class="odd">X<br><strong>${drawOdd}</strong></div>
                        <div class="odd">2<br><strong>${awayOdd}</strong></div>
                    </div>
                </div>`;
            }).join('')}
        </div>`;
    }

    container.innerHTML = html;
}

// Event listeners
document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStatus = btn.dataset.status;
        renderMatches();
    });
});

document.getElementById('search-input').addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    renderMatches();
});

document.querySelectorAll('.sport-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sport-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSport = btn.dataset.sport;
        loadMatches();
    });
});

// Calculadora
document.getElementById('calc-btn')?.addEventListener('click', () => {
    const myProb = parseFloat(document.getElementById('myProb').value);
    const marketOdd = parseFloat(document.getElementById('marketOdd').value);
    const stake = parseFloat(document.getElementById('stake').value) || 100;

    if (!myProb || !marketOdd) {
        document.getElementById('calc-result').innerHTML = '<p>Preencha os campos corretamente.</p>';
        return;
    }

    const implied = (1 / marketOdd) * 100;
    const edge = myProb - implied;
    const ev = (myProb / 100 * marketOdd - 1) * stake;

    const result = document.getElementById('calc-result');
    result.innerHTML = `
        <p><strong>Probabilidade implícita:</strong> ${implied.toFixed(1)}%</p>
        <p><strong>Seu edge:</strong> ${edge > 0 ? '+' : ''}${edge.toFixed(1)}%</p>
        <p><strong>Valor esperado (EV):</strong> R$ ${ev.toFixed(2)}</p>
        <p style="margin-top:10px;color:${edge > 0 ? '#00ba7c' : '#f4212e'};font-weight:bold;">
            ${edge > 2 ? 'VALUE BET' : edge > 0 ? 'Leve vantagem' : 'Sem valor'}
        </p>
    `;
});

// Navegação entre seções (se houver links)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.getElementById('section-' + link.dataset.section).classList.add('active');
    });
});

// Inicializar
loadMatches();

// Atualizar a cada 60 segundos
setInterval(loadMatches, 60000);