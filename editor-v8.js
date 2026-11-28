/* =========================================================================
   TiendaOnline · editor-v8.js
   Cargar DESPUÉS de script.js (ya está en el index.html).
   - Vista previa siempre completa (PC) y ajustada al contenedor
   - Selector Móvil / Tablet / PC en el header
   - Cambios en vivo, sin parpadeo y sin perder el scroll (doble buffer)
   - Menú izquierdo expandido, con "Pagos" separado y su estado
   - Sin menú de 3 puntitos
   ========================================================================= */
(function(){
"use strict";
if(typeof renderPanel!=="function"||typeof S!=="function"||typeof buildSite!=="function"){
  console.error("editor-v8: cargá este archivo después de script.js");return;
}
const $=id=>document.getElementById(id);

/* ---------- Iconos (línea, sin emojis) ---------- */
const ICO={
  estilos:'<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/>',
  ajustes:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  marca:'<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  textos:'<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  secciones:'<rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/>',
  extras:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
  productos:'<path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10"/>',
  pagos:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
  contacto:'<path d="M4 5h16v11H9l-5 4V5z"/>',
  publicar:'<path d="M12 3c4 2 6 6 6 10l-3 3H9l-3-3c0-4 2-8 6-10zM9 16l-2 5 5-2M15 16l2 5-5-2"/><circle cx="12" cy="10" r="1.5"/>',
  avanzado:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
};
const svg=n=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICO[n]+'</svg>';

/* ---------- Menú izquierdo ----------
   tab/g = grupo interno que ya renderiza script.js (V7) */
const RAIL=[
  {sec:"Diseño",items:[
    {id:"estilos",l:"Estilos",tab:"look",g:"lookestilos",d:"Elegí un look completo. Se aplica al instante."},
    {id:"ajustes",l:"Ajustes",tab:"look",g:"lookdiseno",d:"Colores, tipografía, formas y efectos."}]},
  {sec:"Contenido",items:[
    {id:"marca",l:"Marca",tab:"content",g:"contentmarca",d:"Nombre, logo e imagen de portada."},
    {id:"textos",l:"Textos",tab:"content",g:"contenttextos",d:"Frases, beneficios y títulos."},
    {id:"secciones",l:"Secciones",tab:"content",g:"contentsecciones",d:"Qué se muestra y en qué orden."},
    {id:"extras",l:"Galería y más",tab:"content",g:"contentextras",d:"Galería, opiniones y preguntas."}]},
  {sec:"Tienda",items:[
    {id:"productos",l:"Productos",tab:"store",g:"storeproductos",d:"Lo que vendés: foto, precio y botón."},
    {id:"pagos",l:"Pagos",tab:"store",g:"storepagos",d:"Cobrá con Mercado Pago directo en tu cuenta."},
    {id:"contacto",l:"Contacto",tab:"store",g:"storecontacto",d:"WhatsApp, redes, dirección y horarios."}]},
  {sec:"Lanzar",items:[
    {id:"publicar",l:"Publicar",tab:"launch",g:"launchpublicar",d:"Poné tu web online con un click."},
    {id:"avanzado",l:"Avanzado",tab:"launch",g:"launchavanzado",d:"SEO, anuncio, código y proyecto."}]}
];
const ALL=RAIL.reduce((a,g)=>a.concat(g.items),[]);
const find=id=>ALL.find(x=>x.id===id)||ALL[0];
const T2V={look:"estilos",content:"marca",store:"productos",launch:"publicar",publicar:"publicar",pagos:"pagos"};

let view="estilos",lastTab=null,inBase=false;

/* ---------- Estado de Mercado Pago (para mostrar Activado / Apagado) ---------- */
let MPS={known:false,on:false},mpAt=0;
async function mpCheck(force){
  if(typeof cloudReady==="undefined"||!cloudReady||!supabaseClient||!cloudStoreId)return;
  if(!force&&Date.now()-mpAt<8000)return;
  mpAt=Date.now();
  try{
    const {data}=await supabaseClient.from("wb_stores").select("mp_user_id").eq("id",cloudStoreId).maybeSingle();
    const on=!!(data&&data.mp_user_id);
    if(!MPS.known||MPS.on!==on){MPS={known:true,on:on};updatePayStatus();}
  }catch(e){}
}
function payActive(s){return MPS.on&&!!(s&&s.mpCheckout);}
function payCard(s){
  const on=MPS.on,chk=!!s.mpCheckout,logos=s.showPayFooter!==false,act=on&&chk;
  const msg=act?"Tus clientes ya pueden pagar con Mercado Pago."
    :on?"Cuenta conectada. Activá el botón de pago para empezar a cobrar."
    :"Conectá tu cuenta de Mercado Pago para cobrar.";
  const row=(ok,l,v)=>'<li class="'+(ok?"ok":"")+'"><i></i><span>'+l+'</span><em>'+v+'</em></li>';
  return '<div class="pcard'+(act?" is-on":"")+'" id="payStat"><div class="pc-top"><span class="pc-dot"></span><div><b>'+(act?"Cobros activados":"Cobros apagados")+'</b><small>'+msg+'</small></div></div><ul class="pc-list">'
    +row(on,"Cuenta de Mercado Pago",MPS.known?(on?"Conectada":"Sin conectar"):"Verificando…")
    +row(chk,"Botón de pago en la web",chk?"Activado":"Apagado")
    +row(logos,"Logos de medios de pago",logos?"Visibles":"Ocultos")+'</ul></div>';
}
function updatePayStatus(){
  const s=S();if(!s)return;
  const act=payActive(s),pill=$("payPill");
  if(pill){pill.textContent=act?"Activo":"Apagado";pill.className="pst "+(act?"on":"off");}
  const c=$("payStat");if(c)c.outerHTML=payCard(s);
}
document.addEventListener("input",ev=>{
  const k=ev.target&&ev.target.dataset&&ev.target.dataset.k;
  if(k==="mpCheckout"||k==="showPayFooter"||k==="mp")setTimeout(updatePayStatus,0);
});
document.addEventListener("click",ev=>{
  const a=ev.target.closest("[data-act='mpon'],[data-act='mpoff']");
  if(a)setTimeout(()=>mpCheck(true),1600);
});

/* ---------- Rail ---------- */
renderTabs=function(){
  $("tabs").innerHTML=RAIL.map(g=>'<div class="rsec">'+g.sec+'</div>'+g.items.map(it=>
    '<button class="rb'+(it.id===view?" act":"")+'" data-view="'+it.id+'">'+svg(it.id)+'<span>'+it.l+'</span>'+(it.id==="pagos"?'<em class="pst off" id="payPill">Apagado</em>':"")+'</button>').join("")).join("");
  updatePayStatus();
};
document.addEventListener("click",ev=>{
  const b=ev.target.closest("[data-view]");if(!b)return;
  view=b.dataset.view;renderTabs();renderPanel();
  const p=$("panel");if(p)p.scrollTop=0;
});

/* ---------- Panel ---------- */
const PRJ=[["bDup","Duplicar proyecto"],["bExport","Descargar web (.html)"],["bTab","Abrir en pestaña nueva"],["bJson","Guardar proyecto (.json)"],["bOpen","Abrir proyecto (.json)"],["bBackup","Backup de todo"],["bDel","Borrar proyecto","dng"]];
const base=renderPanel;
let lastView=null;
renderPanel=function(){
  if(inBase)return;
  const s=S();if(!s)return;
  const cur=find(view);
  if(tab!==lastTab&&T2V[tab]&&find(view).tab!==tab)view=T2V[tab];
  const item=find(view),p=$("panel");
  const sc=lastView===item.id?p.scrollTop:0;
  inBase=true;
  try{tab=item.tab;base();}finally{inBase=false;}
  p.querySelectorAll(".grp").forEach(d=>{
    if(d.dataset.g!==item.g){d.remove();return;}
    const w=document.createElement("div");w.className="vbody gb";w.innerHTML=d.querySelector(".gb").innerHTML;d.replaceWith(w);
  });
  if(item.id!=="publicar"){const lz=p.querySelector(".lz");if(lz)lz.remove();}
  else p.querySelectorAll(".lzi[data-go]").forEach(b=>{
    const t=b.textContent;
    b.dataset.view=/Logo/.test(t)?"marca":/WhatsApp/.test(t)?"contacto":/Productos/.test(t)?"productos":"pagos";
    b.removeAttribute("data-go");
  });
  p.insertAdjacentHTML("afterbegin",'<div class="vhead"><h2>'+item.l+'</h2><p>'+item.d+'</p></div>'+(item.id==="pagos"?payCard(s):""));
  if(item.id==="avanzado"){
    p.insertAdjacentHTML("beforeend",'<section class="ac open"><div class="ach" style="cursor:default"><span>Proyecto y copias</span></div><div class="acb"><div class="prjgrid">'+
      PRJ.map(x=>'<button class="b'+(x[2]?" dng":"")+'" data-prj="'+x[0]+'">'+x[1]+'</button>').join("")+'</div></div></section>');
  }
  tab=item.tab;lastTab=tab;lastView=item.id;
  p.scrollTop=sc;
  updatePayStatus();
  if(item.id==="pagos")mpCheck();
};
document.addEventListener("click",ev=>{
  const b=ev.target.closest("[data-prj]");if(!b)return;
  const t=$(b.dataset.prj);if(t)t.click();
});

/* Mientras se publica, refrescamos el panel para ver el avance */
let pw=null;
document.addEventListener("click",ev=>{
  if(!ev.target.closest('[data-pub="go"],#bPub'))return;
  clearInterval(pw);let n=0;
  pw=setInterval(()=>{
    n++;if(view==="publicar")renderPanel();
    const busy=/Publicando…/.test($("panel").textContent||"");
    if((!busy&&n>3)||n>240)clearInterval(pw);
  },500);
});

/* ---------- Vista previa: ajustada al contenedor ---------- */
let dev="full";
const DW={"390":390,"768":820,full:1280};
function fitPreview(){
  const w=$("pwrap");if(!w)return;
  const cw=w.clientWidth,ch=w.clientHeight;if(!cw||!ch)return;
  const full=dev==="full",pad=full?0:18;
  let W=DW[dev]||1280;
  if(full&&cw>W)W=cw;                       /* PC: ocupa todo el ancho disponible */
  const availW=cw-pad*2,availH=ch-pad*2;
  const k=Math.min(1,availW/W);
  const H=Math.round(availH/k);
  w.dataset.dev=dev;
  w.querySelectorAll("iframe").forEach(f=>{
    f.style.width=W+"px";f.style.height=H+"px";
    f.style.top=pad+"px";f.style.transform="translateX(-50%) scale("+k+")";
  });
}
setDev=function(v){
  dev=DW[v]?v:"full";
  document.querySelectorAll("[data-dev]").forEach(b=>b.classList.toggle("on",b.dataset.dev===dev));
  fitPreview();
};

/* ---------- Vista previa en vivo: doble buffer + scroll conservado ---------- */
let lastY=0,rt=null;
addEventListener("message",e=>{
  const d=e.data;if(!d||d.wh!=="scroll")return;
  const f=$("frame");if(f&&e.source===f.contentWindow)lastY=d.y|0;
});
function runtime(y){
  return "<script>(function(){var y="+(+y||0)+",r=document.documentElement,ok=false;"+
  "function go(){r.style.scrollBehavior='auto';window.scrollTo(0,y);}"+
  "addEventListener('load',function(){go();setTimeout(go,200);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);setTimeout(function(){ok=true;r.style.scrollBehavior='';},900);});"+
  "var t;addEventListener('scroll',function(){if(!ok)return;clearTimeout(t);t=setTimeout(function(){parent.postMessage({wh:'scroll',y:window.scrollY},'*');},80);},{passive:true});"+
  "})();<\/script>";
}
renderPrev=function(){
  clearTimeout(rt);
  rt=setTimeout(()=>{
    const site=S();if(!site)return;
    let html;
    try{html=buildSite(site);}catch(err){console.error("preview:",err);return;}
    if(!html)return;
    const i=html.lastIndexOf("</body>");
    html=i>-1?html.slice(0,i)+runtime(lastY)+html.slice(i):html+runtime(lastY);
    const wrap=$("pwrap"),cur=$("frame");
    wrap.querySelectorAll("iframe.pnext").forEach(x=>x.remove());
    const nf=document.createElement("iframe");
    nf.className="pnext";nf.title="preview";
    nf.setAttribute("sandbox","allow-scripts allow-popups allow-popups-to-escape-sandbox");
    nf.style.opacity="0";
    let done=false;
    const swap=()=>{
      if(done)return;done=true;
      if(!nf.isConnected)return;
      if(cur&&cur.parentNode)cur.remove();
      nf.classList.remove("pnext");nf.id="frame";nf.style.opacity="1";
    };
    nf.addEventListener("load",()=>setTimeout(swap,60));
    setTimeout(swap,4000);
    nf.srcdoc=html;wrap.appendChild(nf);fitPreview();
  },60);
};

/* ---------- Arranque ---------- */
const startDev=innerWidth>=900?"full":"390";
if("ResizeObserver" in window)new ResizeObserver(fitPreview).observe($("pwrap"));
addEventListener("resize",fitPreview);
renderTabs();setDev(startDev);renderPanel();renderPrev();
let n0=0;const iv=setInterval(()=>{
  if(typeof cloudReady!=="undefined"&&cloudReady){clearInterval(iv);mpCheck(true);}
  else if(++n0>120)clearInterval(iv);
},700);
})();
