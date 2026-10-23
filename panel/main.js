(()=>{var _="openchamber.sdk",S=1;var lt=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function uo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let a=s.target===e?o:s.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let c=n.get(a);if(c!==void 0)clearTimeout(c);n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Lr=`(${uo.toString()})(document);`;var pt=128,ut=65536;var Ce=128;var Ue=65536;var ho=/^[a-z][a-z0-9-]{0,39}$/;var mo=(e)=>Object(e)===e&&!Array.isArray(e),mt=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),fo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,_o=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!mo(n)||!ho.test(n.id)||!fo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!mt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!mt(n,["kind","id","label","value","options","disabled"]))return!1;if(!Eo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let a of n.options){if(!mo(a)||!mt(a,["value","label"])||!Eo(a.value)||!fo(a.label)||s.has(a.value))return!1;s.add(a.value)}if(!s.has(n.value))return!1}return!0};var Ie=20000000,Le=256;var ft=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,So=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var xo=/^[A-Za-z0-9_-]{1,80}$/;var To=["left","right","top","bottom"];var bo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of s)if(!bo(a,o+1,n))return!1;return!0},Et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Et);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Et)}return String(e)===e||Number.isFinite(e)},ht=(e)=>{try{if(String(e.id)!==e.id||!xo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!To.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!bo(e.data)||!Et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var yo=["file","directory","other","missing"],St=(e)=>Boolean(e&&"sessionId"in e),xt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Ao=/^[0-9a-f]{7,64}$/i,Tt=(e)=>Ao.test(e),Me=500,Ge=32000,vo=16000,ko=128,wo=200,Oo=2000,Ro=16000,Co=80,Uo=200,Io=16000;var Lo=2000;var bt=20000,Pe=1024,Ne=2000000;var De=64000,$e=8000,gt=4000;var yt=90000;var Mo=999,Go=1e4,xe=500,Po=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],No=["stopped","starting","ready","failed"],Mr=new Set(Po),Do=(e)=>Mr.has(e),$o=(e)=>e&&Do(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},Ho=(e)=>ue(e)&&JSON.stringify(e).length<=Io,go=(e)=>e?.trim().slice(0,Uo)??"",me=(e)=>{let o=e.id.trim().slice(0,ko),n=e.title.trim().slice(0,wo),s=e.url.trim().slice(0,Oo),a=e.text?.trim().slice(0,Ro),c=e.author?.trim().slice(0,Co),f=e.kind==="pull"?"pull":"issue",x={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:f};if(a)x.text=a;if(c)x.author=c;if(f==="pull"){let h=go(e.branches?.head),T=go(e.branches?.base);if(h&&T)x.branches={head:h,base:T}}if(Ho(e.data))x.data=e.data;return x},At=(e)=>{let o=me(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},vt=(e)=>{let o={text:e.text.trim().slice(0,vo)};if(e.send)o.send=!0;return o},kt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Mo,Math.max(0,Math.round(e)))},wt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Go,Math.max(0,Math.ceil(e)))};var fe=(e)=>e.length>0&&e.length<=Pe&&!e.includes("\x00")&&!e.includes("\\");var He=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Lo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Gr=new Set(No),Ot=(e)=>Boolean(e&&"status"in e&&Gr.has(String(e.status))&&!("body"in e)),Fe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Rt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ct=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Pr=new Set(yo),It=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Pr.has(String(e.kind))&&Number.isFinite(e.size)),Lt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Nr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),Dr=(e)=>Object(e)===e?e:null,_t=(e)=>String(e)===e&&e.length>0,$r=(e)=>{if(!_t(e.id))return null;if(e.ok===!0){let o={channel:_,v:S,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&_t(e.error))return{channel:_,v:S,type:"result",id:e.id,ok:!1,error:e.error,code:$o(_t(e.code)?e.code:void 0)};return null},Mt=(e)=>{let o=Dr(e);if(!o||o.channel!==_||o.v!==S)return null;if(o.type==="result")return $r(o);if(!Nr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Fo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Hr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class m extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Xo=()=>Promise.reject(new m("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Xe=()=>Promise.reject(new m("BAD_PATH",`File path must be 1 to ${Pe} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new m("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},E=(e)=>(e.value+=1,`oc-${e.value}`),Gt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new m("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??bt,a=new Set,c=new Set,f=new Set,x=new Set,h=new Set,T=new Set,A=new Set,W=new Set,j=new Set,L=null,J=null,F=new Set,Y=new Set,V=null,te=null,pe=!1,Q=new Map,ne=new Map,w=new Map,v=!1,d={value:0},p=null,M=null,K=!1,se=!1,ke=null,to=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},X=(t)=>{o.parent.postMessage(t,"*")},U=(t,r)=>{for(let l of t)try{l(r)}catch(u){console.error(u)}},oo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Mt(t.data);if(!r)return;if(r.type==="workspace"){let u=ne.get(r.payload.subscriptionId);if(u)U([u],r.payload.snapshot);return}if(r.type==="shells"){let u=w.get(r.payload.subscriptionId);if(u)U([u],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,M=to(r.payload.session),U(a,r.payload),U(c,r.payload.directory),U(f,r.payload.session),M)U(x,M);U(h,r.payload.connection),U(T,r.payload.settings),U(A,r.payload.item);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};U(c,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)M=null;else if(M?.sessionId!==r.payload.session.id)M=to(r.payload.session);U(f,r.payload.session);return}if(r.type==="session-lifecycle"){M=r.payload,U(x,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};U(h,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};U(T,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};U(A,r.payload.item);return}if(r.type==="status-control-event"){U(W,r.payload);return}if(r.type==="popover-closed"){U(j,r.payload);return}if(r.type==="action"){let u=(b)=>{if(!v)X({channel:_,v:S,type:"action-result",id:r.id,payload:b})},g=J;if(!g){u({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>g(r.payload)).then(()=>u({ok:!0}),(b)=>{let C=(b instanceof Error?b.message:String(b)).trim();u({ok:!1,error:(C||"Action failed.").slice(0,xe)})});return}if(r.type==="file-open"){let u=r.payload;if(te&&So(te,u))return;te=u,U(F,r.payload);return}if(r.type==="file-saved"){U(Y,r.payload.version);return}if(r.type==="file-snapshot"){let u=(C)=>{if(!v)X({channel:_,v:S,type:"file-snapshot-result",id:r.id,payload:C})},g=(C)=>u({error:(C.trim()||"Could not read the edited file.").slice(0,xe)}),b=V;if(!b){g("This extension does not edit files.");return}Promise.resolve().then(()=>b(r.payload.purpose)).then((C)=>{if(ft(C)>Ie){g(`The file is over ${Ie} ${"bytes"in C?"bytes":"characters"}.`);return}if(C.version.length>Le){g(`The snapshot version is over ${Le} characters.`);return}u({snapshot:"bytes"in C?{bytes:C.bytes,version:C.version}:{content:C.content,version:C.version}})},(C)=>g(C instanceof Error?C.message:String(C)));return}if(r.type==="resolve"){let u=(b)=>{X({channel:_,v:S,type:"resolve-result",id:r.id,payload:b})},g=L;if(!g){u({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>g(r.payload)).then((b)=>u({item:b?me(b):null}),(b)=>{let C=(b instanceof Error?b.message:String(b)).trim();u({error:(C||"Command failed.").slice(0,xe)})});return}let l=Q.get(r.id);if(!l)return;if(clearTimeout(l.timer),Q.delete(r.id),r.ok){l.resolve(r.payload);return}l.reject(new m(r.code,r.error))};o.addEventListener("message",oo),X({channel:_,v:S,type:"hello"});let G=(t,r=s)=>{if(v||o.parent===o)return Promise.reject(new m("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((l,u)=>{let g=setTimeout(()=>{Q.delete(t.id),u(new m("HOST_TIMEOUT","Host did not answer in time."))},r);Q.set(t.id,{resolve:l,reject:u,timer:g}),X(t)})},O=(t)=>G(t).then(()=>{return}),R={channel:_,v:S},at=(t)=>{if(!v&&o.parent!==o)X(t)},ro=()=>at({...R,type:"file-save"}),no=(t)=>{if(!Fo(t)||!Hr(t))return;t.preventDefault(),ro()},so=(t)=>{if(!Fo(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),lo(p.popover.id,"escape").catch(()=>{return})},we=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=K||se;if(ke===r)return;ke=r,po(t.id,r).catch(()=>{return})},Oe=()=>{if(p?.surface!=="popover"||K)return;K=!0,we()},io=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!K)return;K=!1,we()},ao=()=>{if(p?.surface!=="popover"||se)return;se=!0,we()},co=()=>{if(p?.surface!=="popover"||!se)return;se=!1,we()},z=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new m("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ct=async(t)=>{if(t.kind!=="projects")z(t.projectId);let r=await G({...R,type:"workspace-read",id:E(d),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new m("HOST_REJECTED","Host did not return workspace data.");return r},dt=async(t,r)=>{if(t.kind!=="projects")z(t.projectId);let l=E(d);ne.set(l,r);try{await O({...R,type:"workspace-subscribe",id:E(d),payload:{subscriptionId:l,query:t}})}catch(u){if(ne.delete(l),!v)X({...R,type:"workspace-unsubscribe",id:E(d),payload:{subscriptionId:l}});throw u}return()=>{if(!ne.delete(l)||v)return;X({...R,type:"workspace-unsubscribe",id:E(d),payload:{subscriptionId:l}})}},Ir=async(t,r)=>{if(t.kind==="session")z(t.sessionId);if(t.kind==="project")z(t.projectId);let l=E(d);w.set(l,r);try{await O({...R,type:"shells-subscribe",id:E(d),payload:{subscriptionId:l,scope:t}})}catch(u){if(w.delete(l),!v)X({...R,type:"shells-unsubscribe",id:E(d),payload:{subscriptionId:l}});throw u}return()=>{if(!w.delete(l)||v)return;X({...R,type:"shells-unsubscribe",id:E(d),payload:{subscriptionId:l}})}},Re=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>pt))throw new m("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new m("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ut)throw new m("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new m("UNSUPPORTED","This host does not support device storage.");let r=await G({...R,type:"storage",id:E(d),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new m("HOST_REJECTED","Host did not return storage data.");return r},lo=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):O({...R,type:"popover-close",id:E(d),payload:r?{id:t,reason:r}:{id:t}}),po=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):O({...R,type:"popover-anchor",id:E(d),payload:{id:t,active:r}});return o.addEventListener("keydown",so,!0),o.addEventListener("pointerover",Oe),o.addEventListener("pointermove",Oe),o.addEventListener("pointerout",io),o.addEventListener("focus",ao),o.addEventListener("blur",co),{onAction:(t)=>(J=t,()=>{if(J===t)J=null}),listProjects:async()=>{let t=await ct({kind:"projects"});if(t.kind!=="projects")throw new m("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ct({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new m("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ct({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new m("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>dt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>dt({kind:"worktrees",projectId:t},(l)=>{if(l.kind==="worktrees")r(l)}),onSessions:(t,r)=>dt({kind:"sessions",projectId:t},(l)=>{if(l.kind==="sessions")r(l)}),onRunningShells:(t,r)=>Ir(t,r),readShellOutput:async(t,r)=>{z(t,Ce);let l=r?.cursor;if(l!==void 0&&(!Number.isInteger(l)||l<0))throw new m("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let u=r?.tailBytes;if(u!==void 0&&(!Number.isInteger(u)||u<1||u>Ue))throw new m("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let b=await G({...R,type:"shell-output",id:E(d),payload:{shellId:t,cursor:l,tailBytes:u}});if(!b||typeof b.output!=="string"||!Number.isFinite(b.cursor))throw new m("HOST_REJECTED","Host did not return shell output.");return b},stopShell:async(t)=>{if(z(t,Ce),(await G({...R,type:"shell-stop",id:E(d),payload:{shellId:t}}))?.stopped!==!0)throw new m("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{z(t),await O({...R,type:"open-session",id:E(d),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let l=Be(r),u={op:"get",key:t};if(l)u.scope=l;let g=await Re(u);return g.op==="get"&&g.found?g.value:void 0},set:async(t,r,l)=>{let u=Be(l),g={op:"set",key:t,value:r};if(u)g.scope=u;await Re(g)},delete:async(t,r)=>{let l=Be(r),u={op:"delete",key:t};if(l)u.scope=l;await Re(u)},keys:async(t)=>{let r=Be(t),l={op:"keys"};if(r)l.scope=r;let u=await Re(l);if(u.op!=="keys")throw new m("HOST_REJECTED","Expected storage keys.");return u.keys}},onReady:(t)=>{if(a.add(t),p)t(p);return()=>{a.delete(t)}},onDirectory:(t)=>{if(c.add(t),p)t(p.directory);return()=>{c.delete(t)}},onSession:(t)=>{if(f.add(t),p)t(p.session);return()=>{f.delete(t)}},onSessionLifecycle:(t)=>{if(x.add(t),M)t(M);return()=>{x.delete(t)}},onConnection:(t)=>{if(h.add(t),p)t(p.connection);return()=>{h.delete(t)}},onSettings:(t)=>{if(T.add(t),p)t(p.settings);return()=>{T.delete(t)}},onItem:(t)=>{if(A.add(t),p)t(p.item);return()=>{A.delete(t)}},onStatusControl:(t)=>(W.add(t),()=>{W.delete(t)}),onPopoverClosed:(t)=>(j.add(t),()=>{j.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support status controls."));if(!_o(t))return Promise.reject(new m("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return O({...R,type:"status-controls",id:E(d),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support popovers."));if(!ht(t))return Promise.reject(new m("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return O({...R,type:"popover-open",id:E(d),payload:t})},closePopover:lo,setPopoverAnchorActive:po,onResolve:(t)=>(L=t,()=>{if(L===t)L=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Me)return Promise.reject(new m("HOST_REJECTED",`Toast message must contain 1 to ${Me} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new m("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return O({channel:_,v:S,type:"toast",id:E(d),payload:{...t,message:r}})},openUrl:(t)=>O({channel:_,v:S,type:"open-url",id:E(d),payload:{url:t}}),openCommit:(t)=>Tt(t)?O({channel:_,v:S,type:"open-commit",id:E(d),payload:{sha:t}}):Promise.reject(new m("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>O({channel:_,v:S,type:"open-surface",id:E(d),payload:{surfaceId:t}}),writeClipboard:(t)=>O({channel:_,v:S,type:"clipboard-write",id:E(d),payload:{text:t}}),compose:(t)=>O({channel:_,v:S,type:"compose",id:E(d),payload:t}),attach:(t)=>O({channel:_,v:S,type:"attach",id:E(d),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)z(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")z(r.directory);else{if(r.name!==void 0)z(r.name,200);if(r.baseBranch!==void 0)z(r.baseBranch,200)}let l=await G({channel:_,v:S,type:"start-session",id:E(d),payload:At(t)},e.requestTimeoutMs??180000);if(!St(l))throw new m("HOST_REJECTED","Host did not return a session.");return l},prompt:(t)=>G({channel:_,v:S,type:"prompt",id:E(d),payload:vt(t)}).then((r)=>{if(!xt(r))throw new m("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>O({channel:_,v:S,type:"session-link",id:E(d),payload:me(t)}),close:()=>O({channel:_,v:S,type:"close",id:E(d)}),oauthStart:()=>O({channel:_,v:S,type:"oauth-start",id:E(d)}),oauthDisconnect:()=>O({channel:_,v:S,type:"oauth-disconnect",id:E(d)}),request:(t)=>(He(t.path)?G({channel:_,v:S,type:"request",id:E(d),payload:t}):Xo()).then((r)=>{if(!Fe(r))throw new m("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(He(t.path)?G({channel:_,v:S,type:"service-request",id:E(d),payload:t}):Xo()).then((r)=>{if(!Fe(r))throw new m("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>G({channel:_,v:S,type:"service-status",id:E(d)}).then((t)=>{if(!Ot(t))throw new m("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?G({channel:_,v:S,type:"file-read",id:E(d),payload:{path:t}}):Xe()).then((r)=>{if(!Rt(r))throw new m("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!fe(t))return Xe();if(r.length>Ne)return Promise.reject(new m("FILE_TOO_LARGE",`Content is over ${Ne} characters.`));return G({channel:_,v:S,type:"file-write",id:E(d),payload:{path:t,content:r}}).then((l)=>{if(!Ct(l))throw new m("HOST_REJECTED","Host did not confirm the write.");return l})},listDir:(t)=>(fe(t)?G({channel:_,v:S,type:"file-list",id:E(d),payload:{path:t}}):Xe()).then((r)=>{if(!Ut(r))throw new m("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(fe(t)?G({channel:_,v:S,type:"file-stat",id:E(d),payload:{path:t}}):Xe()).then((r)=>{if(!It(r))throw new m("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),l=t.system?.trim();if(r.length===0||r.length>De)return Promise.reject(new m("HOST_REJECTED",`Prompt must be 1 to ${De} characters.`));if(l!==void 0&&(l.length===0||l.length>$e))return Promise.reject(new m("HOST_REJECTED",`System prompt must be 1 to ${$e} characters.`));let u=t.maxOutputTokens===void 0?void 0:Math.min(gt,Math.max(1,Math.floor(t.maxOutputTokens)));if(u!==void 0&&!Number.isFinite(u))return Promise.reject(new m("HOST_REJECTED","maxOutputTokens must be a number."));let g={prompt:r};if(l!==void 0)g.system=l;if(u!==void 0)g.maxOutputTokens=u;return G({channel:_,v:S,type:"generate",id:E(d),payload:g},e.requestTimeoutMs??yt).then((b)=>{if(!Lt(b))throw new m("HOST_REJECTED","Host did not return generated text.");return b})},setBadge:(t)=>O({channel:_,v:S,type:"badge",id:E(d),payload:{count:kt(t)}}),setHeight:(t)=>O({channel:_,v:S,type:"resize",id:E(d),payload:{height:wt(t)}}),onFileOpen:(t)=>{if(F.add(t),!pe)pe=!0,o.addEventListener("keydown",no,!0);if(te)t(te);return()=>{F.delete(t)}},onFileSnapshot:(t)=>(V=t,()=>{if(V===t)V=null}),onFileSaved:(t)=>(Y.add(t),()=>{Y.delete(t)}),reportFileChange:(t)=>at({...R,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:ro,reportFileUnsupported:()=>at({...R,type:"file-unsupported"}),dispose:()=>{for(let t of ne.keys())X({...R,type:"workspace-unsubscribe",id:E(d),payload:{subscriptionId:t}});ne.clear();for(let t of w.keys())X({...R,type:"shells-unsubscribe",id:E(d),payload:{subscriptionId:t}});if(w.clear(),v=!0,L=null,J=null,V=null,F.clear(),Y.clear(),pe)o.removeEventListener("keydown",no,!0);o.removeEventListener("message",oo),o.removeEventListener("keydown",so,!0),o.removeEventListener("pointerover",Oe),o.removeEventListener("pointermove",Oe),o.removeEventListener("pointerout",io),o.removeEventListener("focus",ao),o.removeEventListener("blur",co);for(let t of Q.values())clearTimeout(t.timer),t.reject(new m("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),a.clear(),c.clear(),f.clear(),x.clear(),h.clear(),T.clear(),A.clear(),W.clear(),j.clear()}}};var Bo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Dn=new Set(Bo);var Vo=["none","agent","user"];var Hn=new Set(Vo);var Fr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Xr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],zo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Fr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,a]of Xr){let c=e.tokens[a]??"";o.style.setProperty(n,c),o.style.setProperty(s,c)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Pt=(e,o)=>{if(zo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Br={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},y=(e,o)=>`var(--${e}, var(--oc-${Br[e]}, ${o}))`,ie=y("surface-background","transparent"),Ve=y("surface-elevated","transparent"),Te=y("surface-elevated-foreground","inherit"),oe=y("surface-foreground","inherit"),k=y("surface-muted-foreground","gray"),Vr=y("surface-muted","transparent"),B=y("interactive-border","currentColor"),H=y("interactive-hover","transparent"),ae=y("interactive-active","transparent"),Nt=y("interactive-selection","transparent"),Dt=y("interactive-selection-foreground","inherit"),Wo=y("interactive-focus-ring","currentColor"),Z=y("primary","currentColor"),$t=y("primary-text","inherit"),Ht=y("error-text","inherit"),zr=y("font-sans","inherit"),Ft=y("font-mono","monospace"),Jo=y("radius","9px"),Xt=`calc(${Jo} - 2px)`,jo=`calc(${Jo} - 4px)`,I=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Ko=`box-shadow: 0 0 0 2px ${Wo};`,ze=(e)=>{let o=y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${y(`${e}-text`,"inherit")}; }`},jr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Yo=`
.oc-sdk { color: ${oe}; font-family: ${zr}; }
.oc-sdk :focus-visible { outline: none; ${Ko} }
.oc-sdk-mono { font-family: ${Ft}; }
.oc-sdk-muted { color: ${k}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${$t}; }

.oc-sdk-btn { border-radius: ${Xt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${jo}; }
.oc-sdk-btn[data-variant="default"] { color: ${$t}; background: ${I(Z,10,ie)}; border-color: ${I(Z,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${I(Z,16,ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${I(Z,22,ie)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Vr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ve}; color: ${Te}; border-color: ${B}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${y("status-error","red")}; color: ${Ht}; background: ${I("var(--oc-sdk-tone)",7,ie)}; border-color: ${I("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${I("var(--oc-sdk-tone)",9,ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${I("var(--oc-sdk-tone)",11,ie)}; }

.oc-sdk-field-note { color: ${k}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ht}; }
.oc-sdk-input { border-radius: ${Xt}; background: ${Ve}; color: ${Te}; box-shadow: inset 0 0 0 1px ${I(B,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${k}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Wo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${y("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${y("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Ft}; }

.oc-sdk-search-icon { color: ${k}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${jo}; color: ${k}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${oe}; }

.oc-sdk-trigger { border-color: ${B}; border-radius: ${Xt}; background: ${Ve}; color: ${Te}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${k}; }
.oc-sdk-trigger-chevron { color: ${k}; }
.oc-sdk-popup { --surface-foreground: ${Te}; border-color: ${I(B,60)}; border-radius: 12px; background: ${Ve}; color: ${Te}; box-shadow: 0 8px 24px ${I(oe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Nt}; color: ${Dt}; }
.oc-sdk-option-check { color: ${oe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ht}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${I(y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${k}; }
.oc-sdk-popup-empty { color: ${k}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${B}; border-radius: 4px; color: ${oe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${I(oe,60,B)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${B}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ko} }
.oc-sdk-check-desc { color: ${k}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${I(oe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${k}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${oe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Dt}; background: ${Nt}; border-color: ${B}; }
.oc-sdk-tab-count { color: ${k}; }

.oc-sdk-badge { border-radius: 9999px; background: ${H}; color: ${k}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${I("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${Nt}; color: ${Dt}; }
.oc-sdk-row-lead { font-family: ${Ft}; color: ${k}; }
.oc-sdk-row-sub { color: ${k}; }
.oc-sdk-row-meta { color: ${k}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${k}; }

.oc-sdk-empty-body { color: ${k}; }

.oc-sdk-spinner { color: ${k}; }
.oc-sdk-spinner-ring { border-color: ${B}; border-top-color: ${Z}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${I("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${I("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${k}; }

.oc-sdk-separator { color: ${k}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${I(B,40)}; }

.oc-sdk-progress-label { color: ${k}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${B}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }

.oc-sdk-text a { color: ${$t}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${I(B,60)}; }
`,P=`
${lt}
${jr}
${Yo}`;var Qr=0,re=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[s,a]of Object.entries(o))n.setAttribute(s,String(a));return n},zt=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,s=re("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),a=`fill-${++Qr}`,c=re("defs",{}),f=re("linearGradient",{id:a,x1:0,x2:0,y1:0,y2:1});f.append(re("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),re("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),c.append(f);let x=re("path",{d:"",class:"chart-grid"}),h=re("path",{d:"",fill:`url(#${a})`}),T=re("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});s.append(c,x,h,T);let A=document.createElement("div");A.className="chart-cursor";let W=document.createElement("div");W.className="chart-dot",W.style.background=e.color;let j=document.createElement("div");j.className="chart-tip",o.append(s,A,W,j);let L=[],J=1,F=null,Y=null,V=(w,v)=>(e.capacity-v+w)/Math.max(1,e.capacity-1)*300,te=(w)=>n-1-Math.min(w,J)/J*(n-1-2),pe=()=>{let w=F===null?void 0:L[F];if(F===null||w===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let v=o.getBoundingClientRect(),d=V(F,L.length)/300*v.width,p=te(w)/n*v.height;A.style.transform=`translateX(${d}px)`,W.style.transform=`translate(${d}px, ${p}px)`;let M=(L.length-1-F)*e.intervalSeconds;j.textContent=`${e.format(w)} · ${M===0?"now":`${M} s ago`}`;let K=d>v.width/2;j.style.left=K?"":`${d+8}px`,j.style.right=K?`${v.width-d+8}px`:""},Q=(w)=>{if(L.length===0)return;let v=o.getBoundingClientRect(),d=(w-v.left)/v.width*(e.capacity-1),p=Math.round(d-(e.capacity-L.length));F=Math.min(L.length-1,Math.max(0,p)),pe()};return o.addEventListener("pointermove",(w)=>{Y=w.clientX,Q(w.clientX)}),o.addEventListener("pointerleave",()=>{Y=null,F=null,pe()}),{element:o,update:(w,v)=>{if(L=w,J=v>0?v:1,x.setAttribute("d",[0.25,0.5,0.75].map((d)=>`M0 ${n*d} H300`).join(" ")),L.length===0)h.setAttribute("d",""),T.setAttribute("d","");else{let d=L.map((se,ke)=>`${V(ke,L.length).toFixed(2)} ${te(se).toFixed(2)}`),p=L.length===1,M=p?`M${V(0,1)-2} ${d[0]?.split(" ")[1]} L${d[0]}`:`M${d.join(" L")}`;T.setAttribute("d",M);let K=p?V(0,1)-2:V(0,L.length);h.setAttribute("d",`${M} L300 ${n} L${K.toFixed(2)} ${n} Z`)}if(Y!==null)Q(Y)}}};var i=(e,o="",n="",s=[])=>{let a=document.createElement(e);if(o)a.className=o;if(n)a.textContent=n;if(s.length>0)a.append(...s);return a};var Kt=2000,Qo={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Ye=(e)=>typeof e==="object"&&e!==null,Zr=(e)=>Ye(e)&&typeof e.at==="number"&&Ye(e.system)&&Ye(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Ye(e.history),qr=(e)=>{if(!(e instanceof m))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Zo=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},qo=(e,o)=>{let n=i("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(s)=>{s.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},jt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,er=(e,o,n,s)=>{let a=!1,c=async()=>{if(a||!jt(o))return;a=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),T;try{T=JSON.parse(h.body)}catch{T=null}if(h.status===200&&Zr(T))n(T);else s(h.status===200?"bad-answer":"service-failed")}catch(h){s(qr(h))}finally{a=!1}};c(),setInterval(()=>{c()},Kt);let f=jt(o),x=()=>{let h=jt(o);if(h&&!f)c();f=h};return document.addEventListener("visibilitychange",x),new ResizeObserver(x).observe(document.documentElement),{refresh:()=>{c()}}};var tr="en",or=(e)=>{tr=e||"en"},rr=(e,o)=>new Intl.NumberFormat(tr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),ee=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),s=0;while(n>=1024&&s<o.length-1)n/=1024,s+=1;let a=s>=3&&n<100?1:0;return`${rr(n,a)} ${o[s]}`},ce=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${rr(e,e<10?1:0)}%`},nr=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${s} min`;return`${s} min`},Qe=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let s=-1;while((s=n.indexOf(e,s+1))>=0){if(!/[\\/]/.test(n[s-1]??""))continue;let a=n.slice(s+e.length).replace(/^\.exe/i,"");if(a===""||a.startsWith(" "))return a.trim()}return o},en={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},tn=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],Ze=(...e)=>e.filter(Boolean).join(" · "),sr=(e,o)=>{let n=e.ports.map((f)=>`:${f}`).join(" ");if(o==="root")return{title:"Main process",detail:Ze(n,Qe(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let s=/--type=([\w-]+)/.exec(e.command)?.[1];if(s&&/\bHelper\b/.test(e.name)){let f=s==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:tn.find(([h])=>h.test(f))?.[1]??en[s]??s,detail:Ze(n,Qe(e.name,e.command))}}let a=e.label||e.name,c=Qe(e.name,e.command);return{title:a,detail:Ze(n,c===a||c===e.name?"":c)}},ir=(e)=>{let o=Qe(e.name,e.command),n=o===e.title||o===e.name||e.command===e.title;return Ze(e.ports.map((s)=>`:${s}`).join(" "),e.count>1?`${e.count} processes`:"",n?"":o)},ar=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},qe={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},cr={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},de={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var dr=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  /* Floats like the app's dropdowns: lit top edge and hairline rings instead of a border. The plot is
     clipped by its own SVG, so the label can cross the chart's edge without being cut off. */
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
  .port { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border: 0; border-radius: 4px; font: 11px var(--oc-mono); cursor: pointer;
    background: color-mix(in srgb, var(--oc-primary) 14%, transparent); color: var(--oc-primary-text, var(--oc-primary)); }
  .port:hover, .port:focus-visible { outline: none; background: color-mix(in srgb, var(--oc-primary) 24%, transparent); }
`,lr=`
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .host-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .host-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
  /* Cards are flat and set apart by tone, like the app's tiles: no border. */
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  /* A track inside a card is the next tone step; segments part by a 1px gap. */
  .stack { display: flex; gap: 1px; height: 8px; border-radius: 4px; overflow: hidden; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); }
  .stack > span { height: 100%; transition: width .4s ease; }
  .legend { display: flex; flex-direction: column; gap: 4px; }
  .legend-row { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; }
  .legend-row .swatch { width: 8px; height: 8px; border-radius: 2px; }
  .legend-row .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .legend-row .value { text-align: right; min-width: 56px; }
  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-head { display: flex; align-items: baseline; gap: 8px; padding: 0 2px; }
  .section-head .grow { flex: 1; }
  .empty { color: var(--oc-muted); padding: 6px 2px; }
  .origin { font-size: 10px; padding: 0 5px; border-radius: 4px; line-height: 16px; background: color-mix(in srgb, var(--oc-fg) 6%, transparent); color: var(--oc-muted); flex: none; }
  /* Lists sit on the panel itself, grouped by space: lines only under the column header and between groups. */
  .list { display: flex; flex-direction: column; }
  .cols, .row, .group-head { display: grid; grid-template-columns: minmax(0, 1fr) auto 56px 72px; align-items: center; column-gap: 8px; }
  .action { display: flex; align-items: center; justify-content: flex-end; }
  .action:empty { display: block; }
  .cols { padding: 0 2px 4px; color: var(--oc-muted); font-size: 11px; border-bottom: 1px solid var(--oc-border); }
  .cell { text-align: right; white-space: nowrap; }
  .quiet { color: var(--oc-muted); }
  /* Three levels, told apart by size, weight and indent rather than boxes:
     group heading, rows on a rail in the group's colour, unfolded members deeper and quieter. */
  .row { padding: 7px 2px; }
  .group { display: flex; flex-direction: column; padding: 4px 0 10px; border-bottom: 1px solid var(--oc-border); }
  .group-head { padding: 12px 2px 6px; font-size: 13px; }
  .group-head .cell { font-weight: 600; }
  .group > .row, .group > .job-wrap { margin-left: 4px; padding-left: 12px;
    border-left: 2px solid color-mix(in srgb, var(--group-color, var(--oc-border)) 40%, transparent); }
  .group > .row { padding-top: 5px; padding-bottom: 5px; }
  .group > .job-wrap > .row { padding: 5px 2px; }
  .group .row .cell { color: color-mix(in srgb, var(--oc-fg) 80%, transparent); }
  .group .row .cell.quiet { color: var(--oc-muted); }
  .gname { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .gname b { font-weight: 650; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .count { color: var(--oc-muted); font-weight: 400; }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; }
  .who { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .title-line { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .pname.strong { font-weight: 600; flex: none; max-width: 50%; }
  .pdetail { color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .job.foldable, .group-head.foldable { cursor: pointer; }
  .group-head.foldable .gname::before { content: ''; flex: none; width: 0; height: 0; margin-right: 1px;
    border-left: 4px solid var(--oc-muted); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; transition: transform .15s ease; }
  .group-head.foldable.open .gname::before { transform: rotate(90deg); }
  /* Focus draws no ring, like the app: a focused row takes the hover fill. */
  .group-head.foldable:focus-visible, .job.foldable:focus-visible { outline: none; border-radius: 4px; background: var(--oc-hover); }
  .job.foldable .title-line::before { content: ''; flex: none; width: 0; height: 0; margin: 0 2px 0 1px;
    border-left: 4px solid var(--oc-muted); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; transition: transform .15s ease; }
  .job.foldable.open .title-line::before { transform: rotate(90deg); }
  .job-wrap.open .pdetail { white-space: normal; overflow-wrap: anywhere; }
  .pdetail { user-select: text; }
  .members { display: flex; flex-direction: column; padding: 0 0 6px 16px; }
  .row.member { padding: 3px 2px; font-size: 11.5px; }
  .row.member .pname { color: var(--oc-muted); }
  .row.member .pdetail { font-size: 10.5px; }
  .group .row.member .cell { color: var(--oc-muted); }
  .more { color: var(--oc-muted); padding: 2px 2px 4px; font-size: 11px; }
  /* Stop is a text button: no fill, it only changes colour, and asks once before acting. */
  .stop { flex: none; padding: 0 2px; border: 0; background: none; font: 11px var(--oc-font); color: var(--oc-muted); cursor: pointer; }
  .stop:hover, .stop:focus-visible { color: var(--oc-error-text, var(--oc-error)); }
  .stop.armed { color: var(--oc-error-text, var(--oc-error)); font-weight: 600; }
  .stop:disabled { cursor: default; opacity: .6; }
  .stop:focus-visible { outline: none; }
  /* The tint says warning or error; no border. */
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`;var Wt=90;var Se=Gt(),Yt=document.querySelector("#root");if(!Yt)throw Error("Missing #root");var fr=document.createElement("style");fr.textContent=dr+lr;document.head.append(fr);var Qt=Kt/1000,ye=i("div","banner");ye.hidden=!0;var Er=i("div","host-name","This machine"),hr=i("div","host-meta","Reading…"),ve=i("div","live stale","Starting"),_r=i("div","head");_r.append(i("div","titles","",[Er,hr]),ve);var Sr=(e,o,n)=>{let s=i("span","big num","–"),a=i("span","sub num"),c=i("div","card-top","",[i("span","label",e),i("span","grow"),a]),f=zt({color:o,height:56,capacity:Wt,format:n,intervalSeconds:Qt}),x=i("div","sub num");return{card:i("div","card","",[c,s,f.element,x]),value:s,side:a,sub:x,chart:f}},be=Sr("CPU",de.cpu,ce),ge=Sr("Memory",de.memory,ee),on=i("div","grid","",[be.card,ge.card]),xr=i("span","big num","–"),Tr=i("span","sub num"),br=zt({color:de.app,height:44,capacity:Wt,format:ee,intervalSeconds:Qt}),gr=i("div","stack"),yr=i("div","legend"),rn=i("div","card","",[i("div","card-top","",[i("span","label","OpenChamber"),i("span","grow"),Tr]),xr,i("div","sub","The app, OpenCode, and everything they started"),br.element,gr,yr]),nn=()=>i("div","cols","",[i("span"),i("span"),i("span","cell","CPU"),i("span","cell","Memory")]),rt=(e)=>i("span","action","",e?[e]:[]),Ar=i("span","count"),Jt=i("div","list"),vr=i("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),sn=i("section","section","",[i("div","section-head","",[i("span","label","Dev servers"),Ar]),Jt,vr]),kr=i("div","list"),an=i("section","section","",[i("div","section-head","",[i("span","label","Processes")]),nn(),kr]),wr=i("div","list"),Zt=i("section","section","",[i("div","section-head","",[i("span","label","OpenCode outside OpenChamber")]),wr]);Zt.hidden=!0;var cn=i("div","footnote","Process CPU counts 100% per core, as Activity Monitor does; the CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.");Yt.append(ye,_r,on,rn,sn,an,Zt,cn);var Or=()=>{return},qt=(e,o,n)=>{let s=i("button","stop",e);s.type="button";let a=!1,c,f=()=>{a=!1,s.classList.remove("armed"),s.textContent=e};return s.addEventListener("click",(x)=>{if(x.preventDefault(),x.stopPropagation(),s.disabled)return;if(!a){a=!0,s.classList.add("armed"),s.textContent=o,clearTimeout(c),c=setTimeout(f,4000);return}clearTimeout(c),s.disabled=!0,s.textContent="Stopping…",Zo(Se,n).then((h)=>{if(!h)hn();Or()})}),s},nt=(e)=>i("span",e!==null&&e>=1?"cell num":"cell num quiet",ce(e)),st=(e)=>i("span","cell num",ee(e)),Rr=(e,o)=>{let n=i("span","title-line","",[i("span","pname",e)]),s=i("div","who","",[n]);if(o)s.append(i("span","pdetail",o));return s},eo=(e,o,n="row")=>{let{title:s,detail:a}=sr(e,o),c=i("div",n,"",[Rr(s,a),rt(),nt(e.cpu),st(e.memory)]);return c.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,c},he=new Set,dn=(e,o)=>{let n=e.members.length>0&&e.count>1,s=n&&he.has(e.pid),a=ir(e),c=o?qt("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name}):void 0,f=i("div",n?"row job foldable":"row job","",[Rr(e.title,a),rt(c),nt(e.cpu),st(e.memory)]);f.title=e.command||e.title,f.classList.toggle("open",s);let x=i("div",s?"job-wrap open":"job-wrap","",[f]);if(n){f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-expanded",String(s));let h=()=>{if(he.has(e.pid))he.delete(e.pid);else he.add(e.pid);if(le)it(le)};f.addEventListener("click",h),f.addEventListener("keydown",(T)=>{if(T.key==="Enter"||T.key===" ")T.preventDefault(),h()})}if(s){let h=i("div","members","",e.members.map((A)=>eo(A,"other","row member"))),T=e.count-e.members.length;if(T>0)h.append(i("div","more",T===1?"1 more process, idle":`${T} more processes, idle`));x.append(h)}return x},Cr="collapsed-groups",_e=new Set,et=!1,ln=()=>{if(!et)return;Se.storage.set(Cr,[..._e],{scope:"device"}).catch(()=>{return})},pn=async()=>{if(!et)return;try{let e=await Se.storage.get(Cr,{scope:"device"});if(!Array.isArray(e))return;for(let o of e)if(o==="app"||o==="opencode"||o==="terminals")_e.add(o);if(le)it(le)}catch{}},un=(e,o)=>{let n=i("span","dot");n.style.background=de[e.id];let s=e.id==="terminals"&&e.jobs.length>0?qt("Stop all","Stop everything running in the terminal?",{kind:"terminals"}):void 0,a=i("span","gname","",[n,i("b","",qe[e.id]),i("span","count",String(e.count))]),c=_e.has(e.id),f=i("div",c?"group-head foldable":"group-head foldable open","",[a,rt(s),nt(e.cpu),st(e.memory)]);f.tabIndex=0,f.setAttribute("role","button"),f.setAttribute("aria-expanded",String(!c));let x=()=>{if(_e.has(e.id))_e.delete(e.id);else _e.add(e.id);if(ln(),le)it(le)};f.addEventListener("click",x),f.addEventListener("keydown",(A)=>{if(A.key==="Enter"||A.key===" ")A.preventDefault(),x()});let h=(A)=>e.id==="terminals"||e.id==="opencode"&&A.ports.length>0,T=i("div","group","",c?[f]:[f,...e.processes.map((A)=>eo(A,o(A))),...e.jobs.map((A)=>dn(A,h(A)))]);return T.style.setProperty("--group-color",de[e.id]),T},mn=(e)=>{let o=e.ports.map((x)=>qo(Se,x)),n=i("div","title-line","",[...o,i("span","pname strong",e.name),i("span","origin",cr[e.group])]),s=e.job?qt("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}):void 0,a=i("div","who","",[n]),c=e.job?.title??"";if(c)a.append(i("span","pdetail",c));let f=i("div","row server","",[a,rt(s),nt(e.cpu),st(e.memory)]);return f.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,f},fn=(e,o,n)=>{e.replaceChildren(...o.filter((s)=>s.value>0).map((s)=>{let a=i("span");return a.style.width=`${Math.min(100,s.value/Math.max(1,n)*100)}%`,a.style.background=s.color,a.title=s.label,a}))},En={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},pr=(e)=>de[e],Ae=null,tt=!1,ur,Ur=[],le=null,ot=()=>{let e=Ae!==null?Qo[Ae]:tt?"Could not stop it. It may have ended already, or it is not something this panel stops.":Ur.join(" ");ye.hidden=e==="",ye.classList.toggle("error",Ae!==null||tt),ye.textContent=e};function hn(){tt=!0,clearTimeout(ur),ur=setTimeout(()=>{tt=!1,ot()},6000),ot()}var it=(e)=>{le=e;let{system:o,app:n}=e;Er.textContent=o.hostname,hr.textContent=[ar(o.platform),o.arch,o.cpuModel,`up ${nr(o.uptimeSeconds)}`].filter(Boolean).join(" · "),ve.textContent=`Live · every ${Qt} s`,ve.classList.remove("stale"),be.value.textContent=ce(o.cpu),be.side.textContent=`${o.cores} cores`,be.sub.textContent=o.load?`Load ${o.load.map((c)=>c.toFixed(2)).join(" · ")}`:"All cores together",be.chart.update(e.history.system.cpu,100),ge.value.textContent=ee(o.memoryUsed),ge.side.textContent=ce(o.memoryUsed/Math.max(1,o.memoryTotal)*100),ge.sub.textContent=`of ${ee(o.memoryTotal)} · ${ee(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,ge.chart.update(e.history.system.memory,o.memoryTotal),xr.textContent=ee(n.memory),Tr.textContent=`${ce(n.cpu)} CPU`,br.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),fn(gr,n.groups.map((c)=>({value:c.memory,color:pr(c.id),label:qe[c.id]})),n.memory),yr.replaceChildren(...n.groups.map((c)=>{let f=i("span","swatch");return f.style.background=pr(c.id),i("div","legend-row","",[f,i("span","name",qe[c.id],[i("span","muted",` · ${c.count} ${c.count===1?"process":"processes"}`)]),i("span","value num muted",ce(c.cpu)),i("span","value num",ee(c.memory))])})),Ar.textContent=e.servers.length>0?String(e.servers.length):"",Jt.replaceChildren(...e.servers.map(mn)),Jt.hidden=e.servers.length===0,vr.hidden=e.servers.length>0;let s=(c)=>c.pid===n.rootPid?"root":c.label==="Resource Monitor"&&c.ppid===n.rootPid?"self":"other";kr.replaceChildren(...n.groups.map((c)=>un(c,s)));let a=new Set(n.groups.flatMap((c)=>c.jobs.map((f)=>f.pid)));for(let c of he)if(!a.has(c))he.delete(c);Zt.hidden=e.outside.length===0,wr.replaceChildren(...e.outside.map((c)=>eo(c,"other"))),Ur=e.warnings.map((c)=>En[c]),ot()},_n=(e)=>{Ae=e,ot(),ve.textContent="Paused",ve.classList.add("stale")},mr=!1;Se.onReady((e)=>{if(Pt(e,document.documentElement),or(e.locale),e.features?.deviceStorage===!0&&!et)et=!0,pn();if(mr)return;mr=!0,{refresh:Or}=er(Se,Yt,(o)=>{Ae=null,it(o)},_n)});})();
