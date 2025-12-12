<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>produtiv.me — Combined App (Custom Auth)</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js">
// --- Auto routine copy (Option A: full clone) ---
function loadRoutineForToday() {
    const todayKey = app.getTodayKey();
    if (app.state.data.routines[todayKey]) return;
    const keys = Object.keys(app.state.data.routines || {});
    if (keys.length > 0) {
        const lastKey = keys.sort().reverse()[0];
        const base = JSON.parse(JSON.stringify(app.state.data.routines[lastKey] || []));
        app.state.data.routines[todayKey] = base.map(item => ({
            ...item,
            id: "t-" + Math.random().toString(36).slice(2,9),
            done: false
        }));
        app.saveLocal();
        if (app.state.user) app.syncRemote();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{ 
    if(window.app){ loadRoutineForToday(); app.renderAll(); }
});

</script>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js">
// --- Auto routine copy (Option A: full clone) ---
function loadRoutineForToday() {
    const todayKey = app.getTodayKey();
    if (app.state.data.routines[todayKey]) return;
    const keys = Object.keys(app.state.data.routines || {});
    if (keys.length > 0) {
        const lastKey = keys.sort().reverse()[0];
        const base = JSON.parse(JSON.stringify(app.state.data.routines[lastKey] || []));
        app.state.data.routines[todayKey] = base.map(item => ({
            ...item,
            id: "t-" + Math.random().toString(36).slice(2,9),
            done: false
        }));
        app.saveLocal();
        if (app.state.user) app.syncRemote();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{ 
    if(window.app){ loadRoutineForToday(); app.renderAll(); }
});

</script>
  <style>
    /* Combined clean styles */
    *{box-sizing:border-box;margin:0;padding:0}
    :root{--primary-green:#28A745;--primary-dark:#1e7e34;--bg-light:#f8f9fa;--text-dark:#212529;--text-gray:#6c757d;--border-color:#dee2e6}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:var(--bg-light);color:var(--text-dark);line-height:1.6;min-height:100vh}
    header{background:var(--primary-green);color:white;padding:1rem;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.1)}
    .header-content{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}
    .logo{font-size:1.2rem;font-weight:800;display:flex;align-items:center;gap:.5rem}
    main{flex:1;padding:1rem;max-width:1200px;margin:0 auto;padding-bottom:120px}
    .card{background:white;border-radius:12px;padding:1.25rem;margin-bottom:1rem;box-shadow:0 2px 8px rgba(0,0,0,.08)}
    .card-title{font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
    .btn{padding:.6rem 1rem;border-radius:8px;border:0;font-weight:700;cursor:pointer}
    .btn-primary{background:var(--primary-green);color:#fff}
    .btn-danger{background:#dc3545;color:#fff}
    .btn-block{display:block;width:100%}
    .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:1rem}
    .stat-card{text-align:center;padding:1rem;border-radius:10px;background:#fff}
    .stat-value{font-size:1.6rem;color:var(--primary-green);font-weight:800}
    .task-item{background:var(--bg-light);padding:.8rem;border-radius:8px;display:flex;gap:.75rem;align-items:flex-start;margin-bottom:.5rem}
    .task-title{font-weight:700}
    .modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1200;align-items:center;justify-content:center;padding:1rem}
    .modal.active{display:flex}
    .modal-content{background:#fff;padding:1.25rem;border-radius:12px;max-width:720px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.12)}
    .form-group{margin-bottom:.75rem}
    label{display:block;margin-bottom:.25rem;font-weight:700}
    input,textarea,select{width:100%;padding:.6rem;border:1px solid var(--border-color);border-radius:8px}
    nav{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid var(--border-color);display:flex;justify-content:space-around;padding:.5rem;z-index:1100}
    .nav-item{flex:1;text-align:center;color:var(--text-gray);font-weight:700}
    .nav-item.active{color:var(--primary-green)}
    .hidden{display:none!important}
    .toast{position:fixed;top:88px;right:16px;background:var(--primary-green);color:#fff;padding:.75rem 1rem;border-radius:8px;display:none;z-index:1300}
    .toast.show{display:block}
    .chart-container{height:260px;margin-top:.5rem}
    .screen{display:none}
    .screen.active{display:block}
    .empty-state{text-align:center;padding:2rem;color:var(--text-gray)}
    @media(min-width:768px){main{padding:2rem}}
  
.app-container{
  max-width:720px;
  margin:0 auto;
  background:white;
}
body{
  background:white;
}

</style>
</head>
<body>
<div class='app-container'>
  <!-- AUTH -->
  <div id="auth-screen" class="auth-container" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,var(--primary-green) 0%,var(--primary-dark) 100%)">
    <div class="auth-box" style="background:#fff;border-radius:16px;padding:2rem;max-width:520px;width:100%;box-shadow:0 10px 40px rgba(0,0,0,.2)">
      <div style="text-align:center;margin-bottom:1rem">
        <i class="fas fa-chart-line" style="font-size:3rem;color:var(--primary-green)"></i>
        <h1 style="margin-top:.25rem">produtiv.me</h1>
        <p style="color:var(--text-gray)">Organize sua vida com produtividade</p>
      </div>

      <div style="display:flex;gap:.5rem;margin-bottom:1rem">
        <button id="tab-login" class="auth-tab btn btn-primary" style="flex:1">Entrar</button>
        <button id="tab-register" class="auth-tab btn" style="flex:1">Criar Conta</button>
      </div>

      <div id="auth-alert"></div>

      <form id="login-form">
        <div class="form-group"><label>Email</label><input id="login-email" type="email" required placeholder="seu@email.com"></div>
        <div class="form-group"><label>Senha</label><input id="login-password" type="password" required placeholder="••••••••"></div>
        <div style="display:flex;gap:.5rem">
          <button id="btn-login" class="btn btn-primary btn-block"> <i class="fas fa-sign-in-alt"></i> Entrar</button>
        </div>
      </form>

      <form id="register-form" class="hidden">
        <div class="form-group"><label>Nome</label><input id="register-name" type="text" required placeholder="Seu nome"></div>
        <div class="form-group"><label>Email</label><input id="register-email" type="email" required placeholder="seu@email.com"></div>
        <div class="form-group"><label>Senha</label><input id="register-password" type="password" required minlength="3" placeholder="••••••••"></div>
        <div class="form-group"><label>Confirmar senha</label><input id="register-confirm" type="password" required minlength="3" placeholder="••••••••"></div>
        <button id="btn-register" class="btn btn-primary btn-block"> <i class="fas fa-user-plus"></i> Criar Conta</button>
      </form>

      <p style="margin-top:.75rem;color:var(--text-gray);font-size:.9rem">Conta criada localmente e sincronizada no servidor (sem verificação de email).</p>
    </div>
  </div>

  <!-- APP -->
  <div id="main-app" class="hidden">
    <header>
      <div class="header-content">
        <div class="logo"><i class="fas fa-chart-line"></i><span> produtiv.me</span></div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <div id="user-name-display" style="color:#fff;font-weight:700"></div>
          <button id="btn-settings" class="btn" style="background:transparent;color:#fff"><i class="fas fa-cog"></i></button>
        </div>
      </div>
    </header>

    <main>
      <!-- DASHBOARD -->
      <div id="dashboard-screen" class="screen active">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div class="card-title">Bem-vindo de volta! 👋</div>
              <div style="color:var(--text-gray);font-size:.95rem">Hoje é <span id="current-date"></span></div>
            </div>
            <div>
              <button id="btn-sync-home" class="btn btn-primary"> <i class="fas fa-sync"></i> Sincronizar Agora</button>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value" id="stat-tasks-completed">0/0</div><div class="stat-label">Tarefas Concluídas</div></div>
          <div class="stat-card"><div class="stat-value" id="stat-completion-rate">0%</div><div class="stat-label">Taxa de Conclusão</div></div>
          <div class="stat-card"><div class="stat-value" id="stat-streak">0</div><div class="stat-label">Dias Consecutivos</div></div>
        </div>

        <div class="card">
          <div class="card-title">Tarefas de Hoje</div>
          <div id="today-tasks-list"></div>
          <div style="margin-top:.75rem"><button id="btn-add-task" class="btn btn-primary"> <i class="fas fa-plus"></i> Adicionar Tarefa</button></div>
        </div>

        <div class="card">
          <div class="card-title">Progresso Semanal</div>
          <div class="chart-container"><canvas id="weekly-chart"></canvas></div>
        </div>
      </div>

      <!-- ROTINA -->
      <div id="rotina-screen" class="screen">
        <div class="card">
          <div class="card-title">Rotina do Dia</div>
          <button class="btn btn-primary" id="btn-new-task"> <i class="fas fa-plus"></i> Nova Tarefa</button>
        </div>
        <div id="routine-tasks-list"></div>
      </div>

      <!-- METAS -->
      <div id="metas-screen" class="screen">
        <div class="card">
          <div class="card-title">Metas</div>
          <div style="display:flex;gap:.5rem;align-items:center">
            <button class="btn btn-primary" id="btn-new-goal"><i class="fas fa-plus"></i> Nova Meta</button>
            <select id="goal-filter" style="padding:.6rem;border-radius:8px;margin-left:auto">
              <option value="all">Todas</option>
              <option value="semanal">Semanais</option>
              <option value="mensal">Mensais</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>
        </div>
        <div id="goals-list"></div>
      </div>

      <!-- BIOGRAFIAS -->
      <div id="biografias-screen" class="screen">
        <div class="card">
          <div class="card-title">Biografias Motivacionais</div>
          <button class="btn btn-primary" id="btn-new-bio"><i class="fas fa-plus"></i> Adicionar Biografia</button>
        </div>
        <div id="biographies-list"></div>
      </div>

      <!-- ANALYTICS -->
      <div id="analytics-screen" class="screen">
        <div class="card"><div class="card-title">Analytics</div></div>
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value" id="analytics-avg-completion">0%</div><div class="stat-label">Média de Conclusão</div></div>
          <div class="stat-card"><div class="stat-value" id="analytics-best-day">-</div><div class="stat-label">Melhor Dia</div></div>
          <div class="stat-card"><div class="stat-value" id="analytics-total-tasks">0</div><div class="stat-label">Total de Tarefas</div></div>
        </div>

        <div class="card"><div class="card-title">Produtividade por Foco</div><div class="chart-container"><canvas id="focus-chart"></canvas></div></div>
        <div class="card"><div class="card-title">Evolução Mensal</div><div class="chart-container"><canvas id="monthly-chart"></canvas></div></div>
      </div>
    </main>

    <nav>
      <button class="nav-item active" data-screen="dashboard">Home</button>
      <button class="nav-item" data-screen="rotina">Rotina</button>
      <button class="nav-item" data-screen="metas">Metas</button>
      <button class="nav-item" data-screen="biografias">Biografias</button>
      <button class="nav-item" data-screen="analytics">Analytics</button>
    </nav>
  </div>

  <!-- Modals -->
  <div id="task-modal" class="modal"><div class="modal-content">
    <div class="modal-header"><h3 id="task-modal-title">Nova Tarefa</h3></div>
    <form id="task-form">
      <input id="task-id" type="hidden">
      <div class="form-group"><label>Título *</label><input id="task-title" required></div>
      <div class="form-group"><label>Descrição</label><textarea id="task-description" rows="3"></textarea></div>
      <div class="form-group"><label>Prioridade</label><select id="task-priority"><option value="alta">Alta</option><option value="media">Média</option><option value="baixa">Baixa</option></select></div>
      <div class="form-group"><label>Tempo (min)</label><input id="task-estimate" type="number" min="5" value="30"></div>
      <div class="form-group"><label>Foco</label><select id="task-focus"><option value="visionario">Visionário</option><option value="comportamental">Comportamental</option><option value="consistente">Consistente</option></select></div>
      <div class="form-group"><label>Meta Vinculada</label><select id="task-goal"><option value="">Nenhuma</option></select></div>
      <div style="display:flex;justify-content:flex-end;gap:.5rem"><button type="button" id="task-cancel" class="btn">Cancelar</button><button type="submit" class="btn btn-primary">Salvar</button></div>
    </form>
  </div></div>

  <div id="goal-modal" class="modal"><div class="modal-content">
    <div class="modal-header"><h3>Nova Meta</h3></div>
    <form id="goal-form">
      <input type="hidden" id="goal-id">
      <div class="form-group"><label>Título *</label><input type="text" id="goal-title" required></div>
      <div class="form-group"><label>Descrição</label><textarea id="goal-desc" rows="3"></textarea></div>
      <div class="form-group"><label>Tipo</label><select id="goal-type"><option value="semanal">Semanal</option><option value="mensal">Mensal</option></select></div>
      <div class="form-group"><label>Data Início</label><input type="date" id="goal-start" required></div>
      <div class="form-group"><label>Data Fim</label><input type="date" id="goal-end" required></div>
      <div class="form-group"><label>Progresso (%)</label><input type="number" id="goal-progress" min="0" max="100" value="0"></div>
      <div class="form-group"><label>Prioridade</label><select id="goal-priority"><option value="alta">Alta</option><option value="media">Média</option><option value="baixa">Baixa</option></select></div>
      <div style="display:flex;justify-content:flex-end;gap:.5rem"><button type="button" class="btn" onclick="closeModal('goal-modal')">Cancelar</button><button type="submit" class="btn btn-primary">Salvar</button></div>
    </form>
  </div></div>

  <div id="bio-modal" class="modal"><div class="modal-content">
    <div class="modal-header"><h3>Adicionar Biografia</h3></div>
    <form id="bio-form">
      <input type="hidden" id="bio-id">
      <div class="form-group"><label>Nome *</label><input type="text" id="bio-name" required></div>
      <div class="form-group"><label>Biografia e Lições *</label><textarea id="bio-text" rows="6" required></textarea></div>
      <div style="display:flex;justify-content:flex-end;gap:.5rem"><button type="button" class="btn" onclick="closeModal('bio-modal')">Cancelar</button><button type="submit" class="btn btn-primary">Salvar</button></div>
    </form>
  </div></div>

  <div id="settings-modal" class="modal"><div class="modal-content">
    <h3>Configurações</h3>
    <div class="form-group"><label>Nome</label><input id="settings-name"></div>
    <div class="form-group"><label>Email</label><input id="settings-email" disabled></div>
    <div style="display:flex;justify-content:flex-end;gap:.5rem"><button id="btn-save-settings" class="btn btn-primary">Salvar</button><button id="btn-logout" class="btn btn-danger">Sair</button></div>
    <hr style="margin:1rem 0">
    <div class="form-group"><button id="export-data" class="btn btn-primary btn-block">Exportar Dados (JSON)</button></div>
    <div class="form-group"><input type="file" id="import-file" accept=".json"><button id="import-data" class="btn btn-primary btn-block" style="margin-top:.5rem">Importar</button></div>
    <div class="form-group"><button id="clear-data" class="btn btn-danger btn-block">Limpar Todos os Dados</button></div>
  </div></div>

  <div id="toast" class="toast"></div>

<script>
(async function(){
  // Supabase config (kept from provided files)
  const SUPABASE_URL = 'https://oynnevrukfcemgoyvyud.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bm5ldnJ1a2ZjZW1nb3l2eXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDI4ODgsImV4cCI6MjA4MDc3ODg4OH0.SdPjw-ux6UO814_aM2pZUKtRwLkcTakngk8J7_Cosh4';
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // helpers
  function showToast(msg, t=2200){ const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'), t); }
  function q(id){ return document.getElementById(id); }
  function closeModal(id){ q(id).classList.remove('active'); }

  // local storage keys
  const storageKey = 'produtivme_combined_v1';
  const sessionKey = 'produtivme_session_v1';

  // hashing helper (SHA-256 -> hex)
  async function hashPassword(password){
    const enc = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', enc);
    const view = new DataView(digest);
    let hex = '';
    for(let i=0;i<digest.byteLength;i++){
      const h = ('00' + view.getUint8(i).toString(16)).slice(-2);
      hex += h;
    }
    return hex;
  }

  // application
  const app = {
    state: { user:null, data:null, charts:{} },

    getTodayKey(){ return new Date().toISOString().split('T')[0]; },

    getDefaultData(){
      const today = this.getTodayKey();
      return {
        user: { name: 'Usuário' },
        routines: { [today]: [] },
        goals: [],
        biographies: [],
        analytics: { history: [] }
      };
    },

    loadLocal(){
      const raw = localStorage.getItem(storageKey);
      if(raw) try{ this.state.data = JSON.parse(raw); }catch(e){ this.state.data = this.getDefaultData(); }
      else this.state.data = this.getDefaultData();

      // restore session
      const s = localStorage.getItem(sessionKey);
      if(s) try{ this.state.user = JSON.parse(s); }catch(e){ this.state.user = null; }
    },

    saveLocal(){
      try{ localStorage.setItem(storageKey, JSON.stringify(this.state.data)); }catch(e){ console.warn('saveLocal',e); }
      // keep session saved separately
      if(this.state.user) localStorage.setItem(sessionKey, JSON.stringify(this.state.user));
      else localStorage.removeItem(sessionKey);
    },

    // UI render
    updateCurrentDate(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      q('current-date').textContent = new Date().toLocaleDateString('pt-BR', options);
    },

    renderDashboard(){
      const today = this.getTodayKey();
      const tasks = this.state.data.routines[today] || [];
      const completed = tasks.filter(t=>t.done).length;
      const total = tasks.length;
      const rate = total? Math.round((completed/total)*100):0;
      q('stat-tasks-completed').textContent = `${completed}/${total}`;
      q('stat-completion-rate').textContent = `${rate}%`;
      q('stat-streak').textContent = this.calculateStreak();

      const list = q('today-tasks-list');
      if(!tasks.length) list.innerHTML = '<div class="empty-state"><i class="fas fa-tasks" style="font-size:36px;margin-bottom:.5rem"></i><p>Nenhuma tarefa para hoje</p></div>';
      else list.innerHTML = tasks.slice(0,10).map(t=>this.taskHtml(t,true)).join('');
    },

    taskHtml(task,isDashboard=false){
      return `<div class="task-item ${task.done?'task-done':''}" style="align-items:center">
        <input type="checkbox" style="margin-top:6px" ${task.done?'checked':''} data-id="${task.id}" />
        <div style="flex:1; margin-left:.5rem">
          <div class="task-title">${escapeHtml(task.title)}</div>
          <div style="color:var(--text-gray);font-size:.9rem">${escapeHtml(task.description||'')}</div>
        </div>
        <div style="display:flex;gap:.5rem">
          <button data-edit="${task.id}" class="btn">✏️</button>
          ${isDashboard? '': `<button data-delete="${task.id}" class="btn btn-danger">🗑</button>`}
        </div>
      </div>`;
    },

    renderRoutine(){
      const today = this.getTodayKey();
      const tasks = this.state.data.routines[today] || [];
      const cont = q('routine-tasks-list');
      if(!tasks.length) cont.innerHTML = '<div class="card"><div class="empty-state"><i class="fas fa-clipboard-list" style="font-size:36px"></i><p>Nenhuma tarefa adicionada</p></div></div>';
      else cont.innerHTML = '<div class="card">' + tasks.map(t=>this.taskHtml(t,false)).join('') + '</div>';
    },

    renderGoals(){
      const filter = q('goal-filter')?.value || 'all';
      let goals = [...this.state.data.goals];
      if(filter==='semanal') goals = goals.filter(g=>g.type==='semanal');
      if(filter==='mensal') goals = goals.filter(g=>g.type==='mensal');
      if(filter==='completed') goals = goals.filter(g=>g.progress>=100);
      const list = q('goals-list');
      if(!goals.length) list.innerHTML = '<div class="card"><div class="empty-state"><i class="fas fa-bullseye" style="font-size:36px"></i><p>Nenhuma meta</p></div></div>';
      else list.innerHTML = goals.map(g=>`
        <div class="card goal-item">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:700">${escapeHtml(g.title)}</div>
              <div style="color:var(--text-gray);font-size:.9rem">${g.type} • ${formatDate(g.start)} → ${formatDate(g.end)}</div>
            </div>
            <div>
              <button class="btn" data-edit-goal="${g.id}">✏️</button>
              <button class="btn btn-danger" data-delete-goal="${g.id}">🗑</button>
            </div>
          </div>
          <div style="margin-top:.75rem">
            <div class="progress-bar"><div class="progress-fill" style="width:${g.progress}%"></div></div>
            <div style="margin-top:.5rem;font-weight:700;color:var(--primary-green)">${g.progress}%</div>
          </div>
        </div>
      `).join('');
      // update goal select
      const goalSelect = q('task-goal');
      if(goalSelect) goalSelect.innerHTML = '<option value="">Nenhuma</option>' + this.state.data.goals.map(g=>`<option value="${g.id}">${escapeHtml(g.title)}</option>`).join('');
    },

    renderBiographies(){
      const list = q('biographies-list');
      const bios = this.state.data.biographies || [];
      if(!bios.length) list.innerHTML = '<div class="card"><div class="empty-state"><i class="fas fa-book-open" style="font-size:36px"></i><p>Nenhuma biografia</p></div></div>';
      else list.innerHTML = bios.map(b=>`
        <div class="bio-card card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div><strong>${escapeHtml(b.name)}</strong><div style="color:var(--text-gray);margin-top:.25rem">${escapeHtml(b.text.slice(0,200))}${b.text.length>200?'...':''}</div></div>
            <div>
              <button class="btn" data-edit-bio="${b.id}">✏️</button>
              <button class="btn btn-danger" data-delete-bio="${b.id}">🗑</button>
            </div>
          </div>
        </div>
      `).join('');
    },

    renderAnalytics(){
      const allTasks = Object.values(this.state.data.routines).flat();
      const completed = allTasks.filter(t=>t.done).length;
      const total = allTasks.length;
      const avg = total? Math.round((completed/total)*100):0;
      q('analytics-avg-completion').textContent = `${avg}%`;
      q('analytics-total-tasks').textContent = total;
      q('analytics-best-day').textContent = this.getBestDay();
      this.updateCharts();
    },

    renderAll(){
      this.updateCurrentDate();
      this.renderDashboard();
      this.renderRoutine();
      this.renderGoals();
      this.renderBiographies();
      this.renderAnalytics();
      q('user-name-display').textContent = this.state.user?.name || this.state.data.user?.name || '';
    },

    // Task CRUD
    addTask(obj){
      const key = this.getTodayKey();
      if(!this.state.data.routines[key]) this.state.data.routines[key]=[];
      this.state.data.routines[key].unshift(obj);
      this.saveLocal();
      this.renderAll();
    },
    updateTask(obj){
      const key = (obj.created_at||'').split('T')[0] || this.getTodayKey();
      const list = this.state.data.routines[key] || [];
      const i = list.findIndex(t=>t.id===obj.id);
      if(i>=0) list[i]=Object.assign({},list[i],obj);
      this.saveLocal(); this.renderAll();
    },
    removeTask(id){
      const today = this.getTodayKey();
      if(this.state.data.routines[today]) this.state.data.routines[today]=this.state.data.routines[today].filter(t=>t.id!==id);
      this.saveLocal(); this.renderAll();
    },

    // Goals CRUD
    saveGoal(goal){
      if(!goal.id) goal.id='g-'+Math.random().toString(36).slice(2,9);
      const i = this.state.data.goals.findIndex(g=>g.id===goal.id);
      if(i>=0) this.state.data.goals[i]=goal;
      else this.state.data.goals.push(goal);
      this.saveLocal(); this.renderAll();
    },
    deleteGoal(id){
      this.state.data.goals=this.state.data.goals.filter(g=>g.id!==id);
      this.saveLocal(); this.renderAll();
    },

    // Bios CRUD
    saveBio(bio){
      if(!bio.id) bio.id='b-'+Math.random().toString(36).slice(2,9);
      const i = this.state.data.biographies.findIndex(b=>b.id===bio.id);
      if(i>=0) this.state.data.biographies[i]=bio;
      else this.state.data.biographies.push(bio);
      this.saveLocal(); this.renderAll();
    },
    deleteBio(id){
      this.state.data.biographies=this.state.data.biographies.filter(b=>b.id!==id);
      this.saveLocal(); this.renderAll();
    },

    // Charts & analytics helpers (CORRECTED WEEKLY)
    initCharts(){
      // weekly
      const weeklyCtx = q('weekly-chart');
      if(weeklyCtx && !this.state.charts.weekly){
        this.state.charts.weekly = new Chart(weeklyCtx, {
          type: 'line',
          data: { labels: this.getLast7DayLabels(), datasets: [{ label:'Taxa (%)', data: this.getWeeklyData(), borderColor:'#28A745', backgroundColor:'rgba(40,167,69,0.12)', tension:0.4, fill:true }] },
          options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ y:{beginAtZero:true, max:100} } }
        });
      }
      // focus
      const focusCtx = q('focus-chart');
      if(focusCtx && !this.state.charts.focus){
        this.state.charts.focus = new Chart(focusCtx, {
          type:'doughnut',
          data:{ labels:['Visionário','Comportamental','Consistente'], datasets:[{ data:[33,33,34] }]},
          options:{ responsive:true, maintainAspectRatio:false }
        });
      }
      // monthly
      const monthlyCtx = q('monthly-chart');
      if(monthlyCtx && !this.state.charts.monthly){
        this.state.charts.monthly = new Chart(monthlyCtx, {
          type:'bar',
          data:{ labels:['Sem 1','Sem 2','Sem 3','Sem 4'], datasets:[{ label:'Metas Concluídas (%)', data:[0,0,0,0] }]},
          options:{ responsive:true, maintainAspectRatio:false, scales:{ y:{beginAtZero:true, max:100} } }
        });
      }
    },

    updateCharts(){
      if(this.state.charts.weekly){
        this.state.charts.weekly.data.labels = this.getLast7DayLabels();
        this.state.charts.weekly.data.datasets[0].data = this.getWeeklyData();
        this.state.charts.weekly.update();
      }
      if(this.state.charts.focus){
        const fd = this.getFocusData();
        this.state.charts.focus.data.datasets[0].data = fd;
        this.state.charts.focus.update();
      }
      if(this.state.charts.monthly){
        this.state.charts.monthly.data.datasets[0].data = this.getMonthlyGoalData();
        this.state.charts.monthly.update();
      }
    },

    getLast7DayLabels(){
      const days=[]; const today=new Date();
      for(let i=6;i>=0;i--){ const d=new Date(today); d.setDate(d.getDate()-i); days.push(d.toLocaleDateString('pt-BR',{weekday:'short'})); }
      return days;
    },

    getWeeklyData(){
      const data=[]; const today=new Date();
      for(let i=6;i>=0;i--){
        const d=new Date(today); d.setDate(d.getDate()-i);
        const key=d.toISOString().split('T')[0];
        const tasks=this.state.data.routines[key]||[];
        if(tasks.length>0){ const completed=tasks.filter(t=>t.done).length; data.push(Math.round((completed/tasks.length)*100)); } else data.push(0);
      }
      return data;
    },

    getFocusData(){
      const all=Object.values(this.state.data.routines).flat();
      const v=all.filter(t=>t.focus==='visionario').length;
      const c=all.filter(t=>t.focus==='comportamental').length;
      const s=all.filter(t=>t.focus==='consistente').length;
      const total=v+c+s;
      if(total===0) return [33,33,34];
      return [Math.round((v/total)*100),Math.round((c/total)*100),Math.round((s/total)*100)];
    },

    getMonthlyGoalData(){
      const weeks=[0,0,0,0];
      const goals = (this.state.data.goals||[]).filter(g=>g.type==='mensal');
      if(!goals.length) return weeks;
      const avg = goals.reduce((s,g)=>s+(g.progress||0),0)/goals.length;
      weeks[0]=Math.round(avg*0.25); weeks[1]=Math.round(avg*0.5); weeks[2]=Math.round(avg*0.75); weeks[3]=Math.round(avg);
      return weeks;
    },

    calculateStreak(){
      let streak=0; const today=new Date();
      for(let i=0;i<30;i++){
        const d=new Date(today); d.setDate(d.getDate()-i);
        const key=d.toISOString().split('T')[0];
        const tasks=this.state.data.routines[key]||[]; if(tasks.length===0) break;
        const completed=tasks.filter(t=>t.done).length; const rate=(completed/tasks.length)*100;
        if(rate>=70) streak++; else break;
      }
      return streak;
    },

    getBestDay(){
      const dayStats={}; const days=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
      Object.keys(this.state.data.routines).forEach(k=>{
        const d=new Date(k); const idx=d.getDay();
        const tasks=this.state.data.routines[k]||[]; if(!tasks.length) return;
        const completed=tasks.filter(t=>t.done).length; const rate=(completed/tasks.length)*100;
        if(!dayStats[idx]) dayStats[idx]=[]; dayStats[idx].push(rate);
      });
      let best='-'; let bestRate=0;
      Object.keys(dayStats).forEach(idx=>{
        const arr=dayStats[idx]; const avg=arr.reduce((a,b)=>a+b,0)/arr.length;
        if(avg>bestRate){ bestRate=avg; best=days[idx]; }
      });
      return best;
    },

    // Custom auth using app_users table (no email verification)
    async signupLocal(name,email,password){
      // check if email exists
      const { data: existing, error: err1 } = await supabase.from('app_users').select('*').eq('email', email).maybeSingle();
      if(err1){ console.warn('signup check', err1); throw new Error('Erro ao verificar email'); }
      if(existing) throw new Error('Email já cadastrado');

      const passHash = await hashPassword(password);
      // insert user into app_users, return id
      const { data, error } = await supabase.from('app_users').insert([{ name, email, password_hash: passHash }]).select().maybeSingle();
      if(error){ console.warn('signup insert', error); throw new Error('Erro ao criar usuário'); }
      // set session
      this.state.user = { id: data.id, email: data.email, name: data.name };
      this.saveLocal();
      return this.state.user;
    },

    async signinLocal(email,password){
      const passHash = await hashPassword(password);
      const { data, error } = await supabase.from('app_users').select('*').eq('email', email).maybeSingle();
      if(error){ console.warn('signin query', error); throw new Error('Erro ao autenticar'); }
      if(!data) throw new Error('Usuário não encontrado');
      if((data.password_hash || '') !== passHash) throw new Error('Senha incorreta');
      // authenticated
      this.state.user = { id: data.id, email: data.email, name: data.name };
      this.saveLocal();
      return this.state.user;
    },

    async signoutLocal(){
      this.state.user = null;
      this.saveLocal();
      this.showUIAuth();
    },

    // Supabase sync (uses state.user.id as user identifier)
    async pullRemote(){
      if(!this.state.user) return;
      try{
        const uid=this.state.user.id;
        const t = await supabase.from('tasks').select('*').eq('user_id',uid);
        if(!t.error){
          const tasks = t.data || [];
          const map = {};
          tasks.forEach(ts=>{
            const d = (ts.created_at||'').split('T')[0] || this.getTodayKey();
            if(!map[d]) map[d]=[];
            map[d].push({ id: ts.id, title: ts.title, description: ts.description, priority: ts.priority||'media', estimateMin: ts.estimate_min||30, focus: ts.focus||'consistente', linkedGoalId: ts.goal_id||'', done: !!ts.done, created_at: ts.created_at });
          });
          this.state.data.routines = Object.assign({}, this.state.data.routines, map);
        }
        const g = await supabase.from('goals').select('*').eq('user_id',uid);
        if(!g.error) this.state.data.goals = g.data || this.state.data.goals || [];
        const b = await supabase.from('bios').select('*').eq('user_id',uid);
        if(!b.error) this.state.data.biographies = b.data || this.state.data.biographies || [];
        this.saveLocal(); this.renderAll(); this.updateCharts();
        showToast('Dados puxados do servidor');
      }catch(e){ console.warn(e); showToast('Erro ao puxar dados'); }
    },

    async syncRemote(){
      if(!this.state.user){ showToast('Faça login para sincronizar'); return; }
      try{
        const uid=this.state.user.id;
        const tasksFlat = Object.entries(this.state.data.routines).flatMap(([date, arr])=> arr.map(t=>({
          id: t.id, user_id: uid, title: t.title, description: t.description||'', priority: t.priority||'media', estimate_min: t.estimateMin||30,
          focus: t.focus||'consistente', goal_id: t.linkedGoalId||null, done: t.done? true:false, created_at: t.created_at||(date+'T00:00:00')
        })));
        if(tasksFlat.length) await supabase.from('tasks').upsert(tasksFlat, { onConflict: 'id' });
        if(this.state.data.goals?.length) await supabase.from('goals').upsert(this.state.data.goals.map(g=>Object.assign({},g,{user_id:uid})), { onConflict: 'id' });
        if(this.state.data.biographies?.length) await supabase.from('bios').upsert(this.state.data.biographies.map(b=>Object.assign({},b,{user_id:uid})), { onConflict: 'id' });
        showToast('Sincronizado com sucesso');
      }catch(e){ console.warn(e); showToast('Erro ao sincronizar'); }
    },

    // init app
    async init(){
      this.loadLocal();
      // initialize charts & UI
      this.initCharts();
      this.renderAll();
      this.initEvents();
      // auto sync every 45s if logged
      setInterval(()=>{ if(this.state.user) this.syncRemote(); }, 45000);
      // show UI accordingly
      if(this.state.user) this.showUIApp(); else this.showUIAuth();
    },

    showUIApp(){ q('auth-screen').classList.add('hidden'); q('main-app').classList.remove('hidden'); },
    showUIAuth(){ q('auth-screen').classList.remove('hidden'); q('main-app').classList.add('hidden'); },

    initEvents(){
      // tabs
      q('tab-login').addEventListener('click', ()=>{ q('login-form').classList.remove('hidden'); q('register-form').classList.add('hidden'); });
      q('tab-register').addEventListener('click', ()=>{ q('login-form').classList.add('hidden'); q('register-form').classList.remove('hidden'); });

      // login
      q('btn-login').addEventListener('click', async (ev)=>{ ev.preventDefault(); const email=q('login-email').value.trim(); const pass=q('login-password').value; if(!email||!pass){ showToast('Preencha email e senha'); return; } try{ await this.signinLocal(email,pass); showToast('Logado'); this.showUIApp(); await this.pullRemote(); }catch(err){ showToast(err.message || 'Erro ao entrar'); } });

      // register (create account in app_users and login automatically)
      q('btn-register').addEventListener('click', async (ev)=>{ ev.preventDefault(); const name=q('register-name').value.trim(); const email=q('register-email').value.trim(); const pass=q('register-password').value; const conf=q('register-confirm').value; if(!name||!email||!pass){ showToast('Preencha todos os campos'); return; } if(pass!==conf){ showToast('Senhas não conferem'); return; } try{ await this.signupLocal(name,email,pass); showToast('Conta criada e logado'); this.showUIApp(); // create a users row in users table too (optional)
          try{ await supabase.from('users').upsert([{ id: this.state.user.id, name: this.state.user.name, email: this.state.user.email }], { onConflict: 'id' }); }catch(e){} 
          await this.syncRemote();
        }catch(err){ showToast(err.message || 'Erro ao criar conta'); } });

      // navigation
      document.querySelectorAll('nav .nav-item').forEach(btn=> btn.addEventListener('click', (ev)=>{ document.querySelectorAll('nav .nav-item').forEach(n=>n.classList.remove('active')); btn.classList.add('active'); const screen=btn.getAttribute('data-screen'); document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); q(screen+'-screen').classList.add('active'); }));

      // add task
      q('btn-add-task').addEventListener('click', ()=>{ q('task-form').reset(); q('task-id').value=''; q('task-modal').classList.add('active'); });
      q('btn-new-task').addEventListener('click', ()=>{ q('task-form').reset(); q('task-id').value=''; q('task-modal').classList.add('active'); });
      q('task-cancel').addEventListener('click', ()=>closeModal('task-modal'));

      // task form submit
      q('task-form').addEventListener('submit', async (ev)=>{ ev.preventDefault(); const id=q('task-id').value||('t-'+Math.random().toString(36).slice(2,9)); const title=q('task-title').value.trim(); if(!title){ showToast('Título obrigatório'); return; } const obj={ id, title, description: q('task-description').value.trim(), priority: q('task-priority').value, estimateMin: Number(q('task-estimate').value)||30, focus: q('task-focus').value, linkedGoalId: q('task-goal').value||'', done:false, created_at: new Date().toISOString() }; if(q('task-id').value){ this.updateTask(obj); } else this.addTask(obj); closeModal('task-modal'); if(this.state.user) await this.syncRemote(); });

      // tasks actions (delegate)
      document.addEventListener('click', async (ev)=>{
        // edit
        const edit = ev.target.closest('[data-edit]');
        if(edit){ const id=edit.getAttribute('data-edit'); const today=this.getTodayKey(); const t=(this.state.data.routines[today]||[]).find(x=>x.id===id); if(t){ q('task-id').value=t.id; q('task-title').value=t.title; q('task-description').value=t.description||''; q('task-priority').value=t.priority||'media'; q('task-estimate').value=t.estimateMin||30; q('task-focus').value=t.focus||'consistente'; q('task-goal').value=t.linkedGoalId||''; q('task-modal').classList.add('active'); } return; }
        // delete
        const del = ev.target.closest('[data-delete]');
        if(del){ const id=del.getAttribute('data-delete'); if(confirm('Deseja excluir esta tarefa?')){ this.removeTask(id); if(this.state.user) await supabase.from('tasks').delete().eq('id',id).eq('user_id',this.state.user.id); } return; }
        // checkbox
        const cb = ev.target.closest('input[type="checkbox"][data-id]');
        if(cb){ const id=cb.getAttribute('data-id'); // find in today's tasks
          const today=this.getTodayKey(); const list=this.state.data.routines[today]||[]; const t=list.find(x=>x.id===id); if(t){ t.done = cb.checked; this.saveLocal(); this.renderAll(); if(this.state.user) await supabase.from('tasks').upsert(Object.assign({},t,{user_id:this.state.user.id})); } return; }
        // goal edit/delete
        const editG = ev.target.closest('[data-edit-goal]'); if(editG){ const id=editG.getAttribute('data-edit-goal'); const g=this.state.data.goals.find(x=>x.id===id); if(g){ q('goal-id').value=g.id; q('goal-title').value=g.title; q('goal-desc').value=g.desc||''; q('goal-type').value=g.type||'semanal'; q('goal-start').value=g.start||''; q('goal-end').value=g.end||''; q('goal-progress').value=g.progress||0; q('goal-priority').value=g.priority||'media'; q('goal-modal').classList.add('active'); } return; }
        const delG = ev.target.closest('[data-delete-goal]'); if(delG){ const id=delG.getAttribute('data-delete-goal'); if(confirm('Excluir meta?')){ this.deleteGoal(id); if(this.state.user) await supabase.from('goals').delete().eq('id',id).eq('user_id',this.state.user.id); } return; }
        // bio edit/delete
        const editB = ev.target.closest('[data-edit-bio]'); if(editB){ const id=editB.getAttribute('data-edit-bio'); const b=this.state.data.biographies.find(x=>x.id===id); if(b){ q('bio-id').value=b.id; q('bio-name').value=b.name; q('bio-text').value=b.text; q('bio-modal').classList.add('active'); } return; }
        const delB = ev.target.closest('[data-delete-bio]'); if(delB){ const id=delB.getAttribute('data-delete-bio'); if(confirm('Excluir biografia?')){ this.deleteBio(id); if(this.state.user) await supabase.from('bios').delete().eq('id',id).eq('user_id',this.state.user.id); } return; }
      });

      // goal modal
      q('btn-new-goal').addEventListener('click', ()=>{ q('goal-form').reset(); q('goal-id').value=''; q('goal-modal').classList.add('active'); });
      q('goal-form').addEventListener('submit', (ev)=>{ ev.preventDefault(); const id=q('goal-id').value||('g-'+Math.random().toString(36).slice(2,9)); const obj={ id, title:q('goal-title').value.trim(), desc:q('goal-desc').value.trim(), type:q('goal-type').value, start:q('goal-start').value, end:q('goal-end').value, progress: Number(q('goal-progress').value)||0, priority:q('goal-priority').value||'media' }; this.saveGoal(obj); closeModal('goal-modal'); if(this.state.user) this.syncRemote(); });
      // bio modal
      q('btn-new-bio').addEventListener('click', ()=>{ q('bio-form').reset(); q('bio-id').value=''; q('bio-modal').classList.add('active'); });
      q('bio-form').addEventListener('submit', (ev)=>{ ev.preventDefault(); const id=q('bio-id').value||('b-'+Math.random().toString(36).slice(2,9)); const obj={ id, name:q('bio-name').value.trim(), text:q('bio-text').value.trim(), favorite:false }; this.saveBio(obj); closeModal('bio-modal'); if(this.state.user) this.syncRemote(); });

      // settings
      q('btn-settings').addEventListener('click', ()=>{ q('settings-name').value = this.state.user?.name || this.state.data.user?.name || ''; q('settings-email').value = this.state.user?.email || ''; q('settings-modal').classList.add('active'); });
      q('btn-save-settings').addEventListener('click', async ()=>{ const name=q('settings-name').value.trim(); if(!this.state.user) return; try{ // update app_users name
          await supabase.from('app_users').update({ name }).eq('id', this.state.user.id);
          this.state.user.name = name; this.saveLocal(); showToast('Nome atualizado'); q('settings-modal').classList.remove('active');
        }catch(e){ console.warn(e); showToast('Erro ao salvar'); } });
      q('btn-logout').addEventListener('click', async ()=>{ await this.signoutLocal(); });

      // sync buttons
      q('btn-sync-home').addEventListener('click', async ()=>{ await this.syncRemote(); await this.pullRemote(); });

      // export/import/clear
      q('export-data').addEventListener('click', ()=>{ const blob=new Blob([JSON.stringify(this.state.data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='produtivme_data.json'; a.click(); URL.revokeObjectURL(url); });
      q('import-data').addEventListener('click', ()=>{ const f=q('import-file').files[0]; if(!f) return showToast('Escolha um arquivo'); const reader=new FileReader(); reader.onload=(e)=>{ try{ const d=JSON.parse(e.target.result); this.state.data=d; this.saveLocal(); this.renderAll(); showToast('Dados importados'); }catch(err){ showToast('Arquivo inválido'); } }; reader.readAsText(f); });
      q('clear-data').addEventListener('click', ()=>{ if(confirm('Limpar todos os dados locais?')){ this.state.data=this.getDefaultData(); this.saveLocal(); this.renderAll(); showToast('Dados limpos'); } });

      // goal filter change
      q('goal-filter').addEventListener('change', ()=>this.renderGoals());
    },

  }; // end app object

  // small helpers outside
  function escapeHtml(text){ if(!text) return ''; return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function formatDate(d){ if(!d) return ''; const D=new Date(d+'T00:00:00'); return D.toLocaleDateString('pt-BR'); }

  // expose some helpers globally for inline handlers (if any)
  window.closeModal = closeModal;

  // initialize
  await app.init();

  // expose app for debugging
  window.app = app;

})();

// --- Auto routine copy (Option A: full clone) ---
function loadRoutineForToday() {
    const todayKey = app.getTodayKey();
    if (app.state.data.routines[todayKey]) return;
    const keys = Object.keys(app.state.data.routines || {});
    if (keys.length > 0) {
        const lastKey = keys.sort().reverse()[0];
        const base = JSON.parse(JSON.stringify(app.state.data.routines[lastKey] || []));
        app.state.data.routines[todayKey] = base.map(item => ({
            ...item,
            id: "t-" + Math.random().toString(36).slice(2,9),
            done: false
        }));
        app.saveLocal();
        if (app.state.user) app.syncRemote();
    }
}
document.addEventListener("DOMContentLoaded", ()=>{ 
    if(window.app){ loadRoutineForToday(); app.renderAll(); }
});

</script>

</div>
</body>
</html>
