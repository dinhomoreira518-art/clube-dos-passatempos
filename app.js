const $=id=>document.getElementById(id);
const T={frutas:["🍎","Frutas","BANANA LARANJA MANGA ABACAXI UVA MELAO MELANCIA CAJU GOIABA MORANGO LIMAO PERA"],
animais:["🐶","Animais","CACHORRO GATO CAVALO VACA COELHO TARTARUGA MACACO ONCA LEAO GIRAFA ELEFANTE PATO"],
cidades:["🇧🇷","Cidades do Brasil","RECIFE NATAL BELEM MANAUS SALVADOR CURITIBA FORTALEZA GOIANIA VITORIA MACEIO CRATO SANTOS"],
flores:["🌷","Flores","ROSA TULIPA GIRASSOL ORQUIDEA LIRIO JASMIM MARGARIDA VIOLETA CRAVO DALIA LOTUS BEGONIA"],
familia:["👨‍👩‍👧","Família","MAE PAI AVO FILHO FILHA IRMAO IRMA TIO TIA PRIMO NETO SOGRA GENRO"],
comidas:["🍲","Comidas Típicas","FEIJOADA TAPIOCA MOQUECA COXINHA PAMONHA CUSCUZ BAIAO ACARAJE FAROFA VATAPA PIRAO QUINDIM"],
profissoes:["👨‍🔧","Profissões","MEDICO PROFESSOR PEDREIRO PADEIRO PINTOR MOTORISTA COZINHEIRO ENGENHEIRO JUIZ DENTISTA BOMBEIRO ARTISTA PILOTO CHEFE PADRE"],
natureza:["🌳","Natureza","RIO MAR MONTANHA FLORESTA CACHOEIRA LAGO PRAIA CHUVA VENTO SERRA ARVORE DESERTO"],
musica:["🎵","Música","VIOLAO PIANO SAMBA FORRO BAIXO FLAUTA TAMBOR CANTOR CORO SANFONA BOSSA VIOLINO"],
esportes:["⚽","Esportes","FUTEBOL VOLEI TENIS NATACAO CORRIDA BASQUETE JUDO GOLFE CICLISMO REMO SURFE BOXE"],
filmes:["🎬","Filmes e TV","NOVELA CINEMA ATOR ATRIZ CENA ROTEIRO DRAMA COMEDIA SERIE PIPOCA TELA FILME"],
geral:["🧠","Conhecimentos Gerais","PLANETA OCEANO CONTINENTE HISTORIA RELOGIO MAPA BUSSOLA LIVRO ESCOLA JORNAL TERRA LUA"]};
const E=[[1,0],[0,1]],M=E.concat([[1,1],[1,-1]]),H=M.concat(M.map(([a,b])=>[-a,-b]));
const D=[["🟢","Para começar",8,6,E,"8×8 · 6 palavras · linhas retas"],["🟡","Um pouco mais de desafio",10,8,M,"10×10 · 8 palavras · com diagonais"],["🔴","Desafio máximo",12,10,H,"12×12 · 10 palavras · diagonais e invertidas"]];
const K="clube-passatempos-v1";
let P={fs:0,hc:0,calm:0,snd:1,fav:[],games:0,best:0,themes:[],days:[],daily:""};
try{Object.assign(P,JSON.parse(localStorage.getItem(K)||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}};
function apply(){document.documentElement.style.fontSize=[20,23,26][P.fs]+"px";document.body.classList.toggle("hc",!!P.hc);document.body.classList.toggle("calm",!!P.calm)}
let G=null,tm=null,S={t:null,daily:0,favOnly:0};
const ld=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");const today=()=>ld(new Date());
const beep=f=>{if(!P.snd)return;try{const a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator();o.frequency.value=f;o.connect(a.destination);o.start();o.stop(a.currentTime+.12)}catch(e){}};
function streak(){let n=0,d=new Date();if(!P.days.includes(today()))d.setDate(d.getDate()-1);while(P.days.includes(ld(d))){n++;d.setDate(d.getDate()-1)}return n}
const fmt=s=>String(s/60|0).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
function gen(tid,di){let g;for(let i=0;i<60;i++){g=gen0(tid,di);if(g.ws.length==D[di][3])break}return g}
function gen0(tid,di){const n=D[di][2],k=D[di][3],dirs=D[di][4];
const pool=T[tid][2].split(" ").filter(w=>w.length<=n).sort(()=>Math.random()-.5);
const g=Array.from({length:n},()=>Array(n).fill("")),ws=[];
for(const w of pool){if(ws.length>=k)break;for(let t=0;t<400;t++){const[dx,dy]=dirs[Math.random()*dirs.length|0],x=Math.random()*n|0,y=Math.random()*n|0,ex=x+dx*(w.length-1),ey=y+dy*(w.length-1);if(ex<0||ex>=n||ey<0||ey>=n)continue;let ok=1;for(let i=0;i<w.length;i++){const c=g[y+dy*i][x+dx*i];if(c&&c!=w[i]){ok=0;break}}if(!ok)continue;for(let i=0;i<w.length;i++)g[y+dy*i][x+dx*i]=w[i];ws.push({w,x,y,dx,dy,f:0});break}}
const A="ABCDEFGHIJLMNOPQRSTUVX";for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(!g[y][x])g[y][x]=A[Math.random()*A.length|0];
return{n,g,ws,tid,di,t:0,pend:null,sel:[],hint:-1}}
function go(s){S.scr=s;if(s!="game"){clearInterval(tm)}render()}
function start(tid,di){G=gen(tid,di);if(!P.themes.includes(tid)){P.themes.push(tid);save()}clearInterval(tm);tm=setInterval(()=>{G.t++;const e=$("tm");if(e)e.textContent=fmt(G.t)},1000);go("game")}
function fav(id){const i=P.fav.indexOf(id);i<0?P.fav.push(id):P.fav.splice(i,1);save();render()}
function set(k,v){P[k]=v;save();apply();render()}
function daily(){const i=Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5)%12;return Object.keys(T)[i]}
function render(){const a=$("app"),b=(t,f,c)=>`<button class="${c||""}" onclick="${f}">${t}</button>`,back=(s)=>`<div class="top">${b("← Voltar","go('"+s+"')")}</div>`;let h="";
const s=S.scr||"home";
if(s=="home"){const dn=P.daily==today();h=`<h1>🧩 Clube dos Passatempos</h1><p class="mut">Divirta-se, desafie-se e aproveite seu tempo.</p>${b("▶ COMEÇAR A JOGAR","S.daily=0;S.favOnly=0;go('themes')","p")}${b(dn?"✓ DESAFIO CONCLUÍDO":"📅 DESAFIO DO DIA","go('daily')")}${b("📚 ESCOLHER PASSATEMPO","go('games')")}${b("📊 MEU PROGRESSO","go('prog')")}${b("⚙ CONFIGURAÇÕES","go('cfg')")}`}
else if(s=="games"){h=back("home")+`<h2>Passatempos</h2>${b("🧩 Caça-palavras","S.favOnly=0;go('themes')","p")}`+["✏️ Palavras cruzadas","🔢 Sudoku","🧠 Desafios de lógica","❓ Quiz","🔎 Encontre as diferenças"].map(x=>`<button disabled>${x} — EM BREVE</button>`).join("")}
else if(s=="themes"){const ids=Object.keys(T).filter(i=>!S.favOnly||P.fav.includes(i));h=back("home")+`<h2>Escolha um tema</h2>${b(S.favOnly?"Ver todos os temas":"❤️ MEUS FAVORITOS","S.favOnly=!S.favOnly;render()")}${ids.length?"":'<p class="mut">Você ainda não favoritou nenhum tema. Toque em ♡.</p>'}`+ids.map(i=>`<div class="row">${b(T[i][0]+" "+T[i][1],"S.t='"+i+"';go('level')")}<button class="fav" aria-label="Favoritar" onclick="fav('${i}')">${P.fav.includes(i)?"❤️":"♡"}</button></div>`).join("")}
else if(s=="level"){h=back("themes")+`<h2>${T[S.t][0]} ${T[S.t][1]}</h2><p class="mut">Escolha o nível:</p>`+D.map((d,i)=>`<button onclick="start('${S.t}',${i})">${d[0]} ${d[1]}<br><small>${d[5]}</small></button>`).join("")}
else if(s=="daily"){const t=daily(),dn=P.daily==today();h=back("home")+`<h2>📅 Desafio de hoje</h2><div class="card"><p>Tema: <b>${T[t][0]} ${T[t][1]}</b></p><p>Nível: <b>🟡 Um pouco mais de desafio</b></p></div>${dn?'<div class="card on big" style="font-size:1.6rem">✓ DESAFIO CONCLUÍDO</div>':b("▶ COMEÇAR DESAFIO","S.daily=1;start('"+t+"',1)","p")}<div class="card"><p>🔥 <b>DIAS JOGADOS</b></p><p>${streak()?"Você já jogou "+streak()+" dia(s) seguido(s)!":"Jogue hoje para começar sua sequência!"}</p></div>`}
else if(s=="prog"){h=back("home")+`<h2>📊 Meu progresso</h2><div class="card"><p>🧩 Jogos concluídos: <b>${P.games}</b></p><p>🔥 Dias seguidos: <b>${streak()}</b></p><p>🏆 Melhor tempo: <b>${P.best?fmt(P.best):"—"}</b></p><p>📚 Temas explorados: <b>${P.themes.length}/12</b></p></div>`}
else if(s=="cfg"){const o=(k,v,l)=>`<button class="${P[k]==v?"on":""}" onclick="set('${k}',${v})">${l}</button>`;h=back("home")+`<h2>⚙ Configurações</h2><div class="card"><b>🔠 Tamanho das letras</b><div class="row">${o("fs",0,"Normal")}${o("fs",1,"Grande")}${o("fs",2,"Muito grande")}</div></div><div class="card"><b>◐ Alto contraste</b><div class="row">${o("hc",1,"LIGADO")}${o("hc",0,"DESLIGADO")}</div></div><div class="card"><b>🔇 Reduzir animações</b><div class="row">${o("calm",1,"LIGADO")}${o("calm",0,"DESLIGADO")}</div></div><div class="card"><b>🔊 Sons</b><div class="row">${o("snd",1,"LIGADO")}${o("snd",0,"DESLIGADO")}</div></div>${b("📖 Como jogar","go('how')")}<div class="card"><b>🔓 Acesso completo</b><p>Em breve. Área reservada para futura conta e acesso.</p></div>`}
else if(s=="how"){h=back("cfg")+`<h2>📖 Como jogar</h2><div class="card"><p>1. Procure as palavras da lista na grade.</p><p>2. Arraste o dedo do começo ao fim de uma palavra.</p><p>3. Ou toque na primeira e depois na última letra.</p><p>4. Use 💡 DICA se precisar de ajuda.</p></div>`}
else if(s=="game"){h=`<div class="top">${b("← Voltar","go('level')")}<b id="tm">${fmt(G.t)}</b></div><p class="mut" style="font-size:.95rem"><b>${T[G.tid][0]} ${T[G.tid][1]}</b><br>Arraste do começo ao fim de uma palavra.<br>Ou toque na primeira e na última letra.</p><div id="board"></div><div class="ws" id="wl"></div><div class="row">${b("💡 DICA","hint()")}${b("↻ NOVO JOGO","start(G.tid,G.di)")}</div>`}
else if(s=="win"){h=`<h1>🎉 PARABÉNS!</h1><p class="mut">Você encontrou todas as palavras!</p><div class="card"><p>PALAVRAS ENCONTRADAS</p><div class="big">${G.ws.length}/${G.ws.length}</div><p>TEMPO</p><div class="big">${fmt(G.t)}</div></div>${b("▶ JOGAR NOVAMENTE","start(G.tid,G.di)","p")}${b("📚 ESCOLHER OUTRO TEMA","S.favOnly=0;go('themes')")}${b("🏠 INÍCIO","go('home')")}`}
a.innerHTML=h;if(s=="game")drawBoard();window.scrollTo(0,0)}
function drawBoard(){const n=G.n,b=$("board");b.style.gridTemplate=`repeat(${n},1fr)/repeat(${n},1fr)`;let h="";for(let y=0;y<n;y++)for(let x=0;x<n;x++)h+=`<div class="c" id="c${y*n+x}">${G.g[y][x]}</div>`;b.innerHTML=h;sz();G.ws.forEach(w=>{if(w.f)mark(w,"f")});wl();
b.onpointerdown=e=>{b.setPointerCapture(e.pointerId);G.st=pt(e);G.en=G.st;paint()};b.onpointermove=e=>{if(G.st){G.en=pt(e);paint()}};b.onpointerup=e=>{if(!G.st)return;G.en=pt(e);const a=G.st,z=G.en;G.st=null;if(a!=z){G.pend=null;chk(a,z)}else if(G.pend!=null&&G.pend!=a){const p=G.pend;G.pend=null;chk(p,a)}else if(G.pend==a)G.pend=null;else G.pend=a;paint()};b.onpointercancel=()=>{G.st=null;paint()}}
function pt(e){const r=$("board").getBoundingClientRect(),n=G.n,x=Math.min(n-1,Math.max(0,Math.floor((e.clientX-r.left)/r.width*n))),y=Math.min(n-1,Math.max(0,Math.floor((e.clientY-r.top)/r.height*n)));return y*n+x}
function line(a,z){const n=G.n,x1=a%n,y1=a/n|0,x2=z%n,y2=z/n|0,dx=x2-x1,dy=y2-y1;if(dx&&dy&&Math.abs(dx)!=Math.abs(dy))return[a];const L=Math.max(Math.abs(dx),Math.abs(dy)),sx=Math.sign(dx),sy=Math.sign(dy),r=[];for(let i=0;i<=L;i++)r.push((y1+sy*i)*n+x1+sx*i);return r}
function paint(){document.querySelectorAll(".c.s,.c.h").forEach(c=>c.classList.remove("s","h"));let l=[];if(G.st!=null)l=line(G.st,G.en);else if(G.pend!=null)l=[G.pend];l.forEach(i=>$("c"+i).classList.add("s"))}
function mark(w,c){for(let i=0;i<w.w.length;i++)$("c"+((w.y+w.dy*i)*G.n+w.x+w.dx*i)).classList.add(c)}
function wl(){$("wl").innerHTML=G.ws.map(w=>`<span class="${w.f?"d":""}">${w.w}</span>`).join("")}
function chk(a,z){const l=line(a,z);if(l.length<2)return;const s=l.map(i=>G.g[i/G.n|0][i%G.n]).join(""),r=[...s].reverse().join(""),w=G.ws.find(w=>!w.f&&(w.w==s||w.w==r));if(!w){beep(200);return}w.f=1;mark(w,"f");wl();beep(660);if(G.ws.every(w=>w.f))win()}
function hint(){const w=G.ws.find(w=>!w.f);if(!w)return;const i=w.y*G.n+w.x;$("c"+i).classList.add("h");setTimeout(()=>{const e=$("c"+i);e&&e.classList.remove("h")},3000)}
function win(){clearInterval(tm);P.games++;if(!P.best||G.t<P.best)P.best=G.t;if(!P.days.includes(today()))P.days.push(today());if(S.daily)P.daily=today();S.daily=0;save();beep(880);setTimeout(()=>go("win"),600)}
function sz(){const b=$("board");if(!b||!G)return;const c=b.clientWidth/G.n;b.style.fontSize=Math.floor(c*.58)+"px"}
addEventListener("resize",sz);
apply();render();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
