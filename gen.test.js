const fs=require("fs");
let src=fs.readFileSync(__dirname+"/../app.js","utf8").replace(/\napply\(\);render\(\);[\s\S]*$/,"").replace(/addEventListener\("resize",sz\);/,"");
const{gen,T,D}=new Function("localStorage","document","addEventListener","navigator","location",src+";return{gen,T,D}")({getItem:()=>null,setItem(){}},{},()=>{},{},{});
let bad=0;
for(const t in T)for(let d=0;d<3;d++)for(let r=0;r<40;r++){const G=gen(t,d);if(G.ws.length!==D[d][3]){bad++;console.log("palavras faltando",t,d)}
for(const w of G.ws)for(let i=0;i<w.w.length;i++)if(G.g[w.y+w.dy*i][w.x+w.dx*i]!==w.w[i]){bad++;console.log("palavra fora do lugar",t,d,w.w)}}
console.log(bad?"FALHOU: "+bad:"OK: 12 temas x 3 níveis x 40 jogos, todas as palavras estão na grade");process.exit(bad?1:0)