const fs=require("fs");
const src=fs.readFileSync(__dirname+"/../app.js","utf8").replace(/\napply\(\);render\(\);[\s\S]*$/,"").replace('addEventListener("resize",sz);',"");
const els={};
const mk=id=>els[id]||(els[id]={id,style:{},innerHTML:"",clientWidth:400,_s:new Set(),classList:{add(c){els[id]._s.add(c)},remove(...c){c.forEach(x=>els[id]._s.delete(x))},has(c){return els[id]._s.has(c)}},getBoundingClientRect:()=>({left:0,top:0,width:400,height:400}),setPointerCapture(){}});
const doc={getElementById:mk,querySelectorAll:()=>Object.values(els).filter(e=>/^c\d+$/.test(e.id)&&(e.classList.has("s")||e.classList.has("h")))};
const L=new Function("localStorage","document","addEventListener","navigator","location",src+";return{gen,T,D,drawBoard,setG:g=>{G=g},getG:()=>G}")({getItem:()=>null,setItem(){}},doc,()=>{},{},{});
let bad=0,checks=0;const ok=(c,m)=>{checks++;if(!c){bad++;console.log("FALHA:",m)}};
function run(t,d){for(const k in els)delete els[k];const G=L.gen(t,d);L.setG(G);L.drawBoard();const b=els.board,n=G.n,cs=400/n,tag=t+"/"+d;
const P=(i,id=1)=>({pointerId:id,clientX:(i%n+.5)*cs,clientY:(Math.floor(i/n)+.5)*cs});
const marked=()=>Object.values(els).filter(e=>/^c\d+$/.test(e.id)&&e.classList.has("s")).length;
const drag=(a,z,id=1)=>{b.onpointerdown(P(a,id));b.onpointermove(P(z,id));b.onpointerup(P(z,id))};
const idx=(w,r)=>{const L2=w.w.length-1;return r?[(w.y+w.dy*L2)*n+w.x+w.dx*L2,w.y*n+w.x]:[w.y*n+w.x,(w.y+w.dy*L2)*n+w.x+w.dx*L2]};
const clean=m=>{ok(marked()===0&&G.st==null&&G.pid==null,tag+" estado sujo: "+m)};
drag(0,0);ok(marked()===1&&G.st==null,tag+" toque na célula 0");drag(0,0);clean("2º toque cancela");
drag(0,n*n-1);clean("arraste inválido a partir da célula 0");drag(0,n*n-1);clean("nova tentativa");
drag(3,3);drag(n*n-1,n*n-1);ok(marked()<=1,tag+" toque, outro toque");setTimeout(()=>{},0);
drag(0,n*n-1);b.onpointerdown(P(0));b.onpointermove(P(n+1));b.onpointercancel(P(0));clean("cancelar durante arraste");
b.onpointerdown(P(0,1));b.onpointerdown(P(5,2));b.onpointerup(P(5,1));ok(G.st!=null,tag+" ponteiro antigo ignorado");b.onpointerup(P(5,2));ok(G.st==null&&G.pid==null,tag+" 2ª seleção encerrada");
const ws=G.ws.slice();ws.forEach((w,i)=>{drag(0,0);drag(0,0);const[a,z]=idx(w,i%2);drag(a,z);ok(w.f===1,tag+" palavra "+w.w+(i%2?" invertida":""));clean(w.w)});
const G2=L.gen(t,d);L.setG(G2);L.drawBoard();const b2=els.board,w=G2.ws[0],[a,z]=idx(w,0),tap=i=>{b2.onpointerdown(P(i));b2.onpointerup(P(i))};tap(a);tap(z);ok(w.f===1,tag+" modo toque primeira/última");tap(0);tap(n+2);ok(G2.pend===n+2,tag+" 2º toque desalinhado vira nova primeira letra");
}
for(const t in L.T)for(let d=0;d<3;d++)run(t,d);
console.log(bad?"FALHOU: "+bad:"OK: "+checks+" verificações de seleção (12 temas x 3 níveis, mouse/toque via pointer events)");process.exit(bad?1:0)
