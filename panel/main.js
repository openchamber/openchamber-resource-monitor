(()=>{var x="openchamber.sdk",b=1;var pt=`
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
`;function xo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=n.get(i);if(a!==void 0)clearTimeout(a);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Fr=`(${xo.toString()})(document);`;var ut=128,mt=65536;var Ce=128;var Le=65536;var vo=/^[a-z][a-z0-9-]{0,39}$/;var bo=(e)=>Object(e)===e&&!Array.isArray(e),ft=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),To=(e)=>String(e)===e&&e.length>=1&&e.length<=60,yo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Ao=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!bo(n)||!vo.test(n.id)||!To(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!ft(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ft(n,["kind","id","label","value","options","disabled"]))return!1;if(!yo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!bo(i)||!ft(i,["value","label"])||!yo(i.value)||!To(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var Me=20000000,Ge=256;var ht=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,ko=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var wo=/^[A-Za-z0-9_-]{1,80}$/;var Oo=["left","right","top","bottom"];var Ro=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!Ro(i,o+1,n))return!1;return!0},Et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Et);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Et)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!wo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Oo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ro(e.data)||!Et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Uo=["file","directory","other","missing"],gt=(e)=>Boolean(e&&"sessionId"in e),xt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Co=/^[0-9a-f]{7,64}$/i,bt=(e)=>Co.test(e),Pe=500,Ne=32000,Lo=16000,Mo=128,Go=200,Po=2000,No=16000,Do=80,$o=200,Ho=16000;var Fo=2000;var Tt=20000,De=1024,$e=2000000;var He=64000,Fe=8000,yt=4000;var vt=90000;var Xo=999,Bo=1e4,be=500,Vo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],jo=["stopped","starting","ready","failed"],Xr=new Set(Vo),zo=(e)=>Xr.has(e),Ko=(e)=>e&&zo(e)?e:"HOST_REJECTED",fe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(fe);if(Object(e)===e)return Object.values(e).every(fe);return!1},Wo=(e)=>fe(e)&&JSON.stringify(e).length<=Ho,Io=(e)=>e?.trim().slice(0,$o)??"",he=(e)=>{let o=e.id.trim().slice(0,Mo),n=e.title.trim().slice(0,Go),s=e.url.trim().slice(0,Po),i=e.text?.trim().slice(0,No),a=e.author?.trim().slice(0,Do),l=e.kind==="pull"?"pull":"issue",E={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:l};if(i)E.text=i;if(a)E.author=a;if(l==="pull"){let f=Io(e.branches?.head),S=Io(e.branches?.base);if(f&&S)E.branches={head:f,base:S}}if(Wo(e.data))E.data=e.data;return E},At=(e)=>{let o=he(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},kt=(e)=>{let o={text:e.text.trim().slice(0,Lo)};if(e.send)o.send=!0;return o},wt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Xo,Math.max(0,Math.round(e)))},Ot=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Bo,Math.max(0,Math.ceil(e)))};var Ee=(e)=>e.length>0&&e.length<=De&&!e.includes("\x00")&&!e.includes("\\");var Xe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Fo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Br=new Set(jo),Rt=(e)=>Boolean(e&&"status"in e&&Br.has(String(e.status))&&!("body"in e)),Be=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),It=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ut=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ct=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Vr=new Set(Uo),Lt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Vr.has(String(e.kind))&&Number.isFinite(e.size)),Mt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),jr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),zr=(e)=>Object(e)===e?e:null,_t=(e)=>String(e)===e&&e.length>0,Kr=(e)=>{if(!_t(e.id))return null;if(e.ok===!0){let o={channel:x,v:b,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&_t(e.error))return{channel:x,v:b,type:"result",id:e.id,ok:!1,error:e.error,code:Ko(_t(e.code)?e.code:void 0)};return null},Gt=(e)=>{let o=zr(e);if(!o||o.channel!==x||o.v!==b)return null;if(o.type==="result")return Kr(o);if(!jr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Jo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Wr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class h extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Yo=()=>Promise.reject(new h("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ve=()=>Promise.reject(new h("BAD_PATH",`File path must be 1 to ${De} characters without NUL or backslash.`)),je=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new h("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},_=(e)=>(e.value+=1,`oc-${e.value}`),Pt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new h("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??Tt,i=new Set,a=new Set,l=new Set,E=new Set,f=new Set,S=new Set,v=new Set,I=new Set,T=new Set,g=null,P=null,N=new Set,Q=new Set,W=null,ne=null,me=!1,Z=new Map,V=new Map,q=new Map,ee=!1,d={value:0},p=null,w=null,z=!1,J=!1,de=null,Oe=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},F=(t)=>{o.parent.postMessage(t,"*")},M=(t,r)=>{for(let u of t)try{u(r)}catch(m){console.error(m)}},po=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Gt(t.data);if(!r)return;if(r.type==="workspace"){let m=V.get(r.payload.subscriptionId);if(m)M([m],r.payload.snapshot);return}if(r.type==="shells"){let m=q.get(r.payload.subscriptionId);if(m)M([m],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,w=Oe(r.payload.session),M(i,r.payload),M(a,r.payload.directory),M(l,r.payload.session),w)M(E,w);M(f,r.payload.connection),M(S,r.payload.settings),M(v,r.payload.item);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};M(a,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)w=null;else if(w?.sessionId!==r.payload.session.id)w=Oe(r.payload.session);M(l,r.payload.session);return}if(r.type==="session-lifecycle"){w=r.payload,M(E,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};M(f,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};M(S,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};M(v,r.payload.item);return}if(r.type==="status-control-event"){M(I,r.payload);return}if(r.type==="popover-closed"){M(T,r.payload);return}if(r.type==="action"){let m=(y)=>{if(!ee)F({channel:x,v:b,type:"action-result",id:r.id,payload:y})},A=P;if(!A){m({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>A(r.payload)).then(()=>m({ok:!0}),(y)=>{let L=(y instanceof Error?y.message:String(y)).trim();m({ok:!1,error:(L||"Action failed.").slice(0,be)})});return}if(r.type==="file-open"){let m=r.payload;if(ne&&ko(ne,m))return;ne=m,M(N,r.payload);return}if(r.type==="file-saved"){M(Q,r.payload.version);return}if(r.type==="file-snapshot"){let m=(L)=>{if(!ee)F({channel:x,v:b,type:"file-snapshot-result",id:r.id,payload:L})},A=(L)=>m({error:(L.trim()||"Could not read the edited file.").slice(0,be)}),y=W;if(!y){A("This extension does not edit files.");return}Promise.resolve().then(()=>y(r.payload.purpose)).then((L)=>{if(ht(L)>Me){A(`The file is over ${Me} ${"bytes"in L?"bytes":"characters"}.`);return}if(L.version.length>Ge){A(`The snapshot version is over ${Ge} characters.`);return}m({snapshot:"bytes"in L?{bytes:L.bytes,version:L.version}:{content:L.content,version:L.version}})},(L)=>A(L instanceof Error?L.message:String(L)));return}if(r.type==="resolve"){let m=(y)=>{F({channel:x,v:b,type:"resolve-result",id:r.id,payload:y})},A=g;if(!A){m({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>A(r.payload)).then((y)=>m({item:y?he(y):null}),(y)=>{let L=(y instanceof Error?y.message:String(y)).trim();m({error:(L||"Command failed.").slice(0,be)})});return}let u=Z.get(r.id);if(!u)return;if(clearTimeout(u.timer),Z.delete(r.id),r.ok){u.resolve(r.payload);return}u.reject(new h(r.code,r.error))};o.addEventListener("message",po),F({channel:x,v:b,type:"hello"});let D=(t,r=s)=>{if(ee||o.parent===o)return Promise.reject(new h("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((u,m)=>{let A=setTimeout(()=>{Z.delete(t.id),m(new h("HOST_TIMEOUT","Host did not answer in time."))},r);Z.set(t.id,{resolve:u,reject:m,timer:A}),F(t)})},U=(t)=>D(t).then(()=>{return}),C={channel:x,v:b},ct=(t)=>{if(!ee&&o.parent!==o)F(t)},uo=()=>ct({...C,type:"file-save"}),mo=(t)=>{if(!Jo(t)||!Wr(t))return;t.preventDefault(),uo()},fo=(t)=>{if(!Jo(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),_o(p.popover.id,"escape").catch(()=>{return})},Re=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=z||J;if(de===r)return;de=r,go(t.id,r).catch(()=>{return})},Ie=()=>{if(p?.surface!=="popover"||z)return;z=!0,Re()},ho=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!z)return;z=!1,Re()},Eo=()=>{if(p?.surface!=="popover"||J)return;J=!0,Re()},So=()=>{if(p?.surface!=="popover"||!J)return;J=!1,Re()},Y=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new h("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},dt=async(t)=>{if(t.kind!=="projects")Y(t.projectId);let r=await D({...C,type:"workspace-read",id:_(d),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new h("HOST_REJECTED","Host did not return workspace data.");return r},lt=async(t,r)=>{if(t.kind!=="projects")Y(t.projectId);let u=_(d);V.set(u,r);try{await U({...C,type:"workspace-subscribe",id:_(d),payload:{subscriptionId:u,query:t}})}catch(m){if(V.delete(u),!ee)F({...C,type:"workspace-unsubscribe",id:_(d),payload:{subscriptionId:u}});throw m}return()=>{if(!V.delete(u)||ee)return;F({...C,type:"workspace-unsubscribe",id:_(d),payload:{subscriptionId:u}})}},Hr=async(t,r)=>{if(t.kind==="session")Y(t.sessionId);if(t.kind==="project")Y(t.projectId);let u=_(d);q.set(u,r);try{await U({...C,type:"shells-subscribe",id:_(d),payload:{subscriptionId:u,scope:t}})}catch(m){if(q.delete(u),!ee)F({...C,type:"shells-unsubscribe",id:_(d),payload:{subscriptionId:u}});throw m}return()=>{if(!q.delete(u)||ee)return;F({...C,type:"shells-unsubscribe",id:_(d),payload:{subscriptionId:u}})}},Ue=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ut))throw new h("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!fe(t.value))throw new h("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>mt)throw new h("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new h("UNSUPPORTED","This host does not support device storage.");let r=await D({...C,type:"storage",id:_(d),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new h("HOST_REJECTED","Host did not return storage data.");return r},_o=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):U({...C,type:"popover-close",id:_(d),payload:r?{id:t,reason:r}:{id:t}}),go=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new h("UNSUPPORTED","This host does not support popovers.")):U({...C,type:"popover-anchor",id:_(d),payload:{id:t,active:r}});return o.addEventListener("keydown",fo,!0),o.addEventListener("pointerover",Ie),o.addEventListener("pointermove",Ie),o.addEventListener("pointerout",ho),o.addEventListener("focus",Eo),o.addEventListener("blur",So),{onAction:(t)=>(P=t,()=>{if(P===t)P=null}),listProjects:async()=>{let t=await dt({kind:"projects"});if(t.kind!=="projects")throw new h("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await dt({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new h("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await dt({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new h("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>lt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>lt({kind:"worktrees",projectId:t},(u)=>{if(u.kind==="worktrees")r(u)}),onSessions:(t,r)=>lt({kind:"sessions",projectId:t},(u)=>{if(u.kind==="sessions")r(u)}),onRunningShells:(t,r)=>Hr(t,r),readShellOutput:async(t,r)=>{Y(t,Ce);let u=r?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new h("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let m=r?.tailBytes;if(m!==void 0&&(!Number.isInteger(m)||m<1||m>Le))throw new h("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Le}.`);let y=await D({...C,type:"shell-output",id:_(d),payload:{shellId:t,cursor:u,tailBytes:m}});if(!y||typeof y.output!=="string"||!Number.isFinite(y.cursor))throw new h("HOST_REJECTED","Host did not return shell output.");return y},stopShell:async(t)=>{if(Y(t,Ce),(await D({...C,type:"shell-stop",id:_(d),payload:{shellId:t}}))?.stopped!==!0)throw new h("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{Y(t),await U({...C,type:"open-session",id:_(d),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let u=je(r),m={op:"get",key:t};if(u)m.scope=u;let A=await Ue(m);return A.op==="get"&&A.found?A.value:void 0},set:async(t,r,u)=>{let m=je(u),A={op:"set",key:t,value:r};if(m)A.scope=m;await Ue(A)},delete:async(t,r)=>{let u=je(r),m={op:"delete",key:t};if(u)m.scope=u;await Ue(m)},keys:async(t)=>{let r=je(t),u={op:"keys"};if(r)u.scope=r;let m=await Ue(u);if(m.op!=="keys")throw new h("HOST_REJECTED","Expected storage keys.");return m.keys}},onReady:(t)=>{if(i.add(t),p)t(p);return()=>{i.delete(t)}},onDirectory:(t)=>{if(a.add(t),p)t(p.directory);return()=>{a.delete(t)}},onSession:(t)=>{if(l.add(t),p)t(p.session);return()=>{l.delete(t)}},onSessionLifecycle:(t)=>{if(E.add(t),w)t(w);return()=>{E.delete(t)}},onConnection:(t)=>{if(f.add(t),p)t(p.connection);return()=>{f.delete(t)}},onSettings:(t)=>{if(S.add(t),p)t(p.settings);return()=>{S.delete(t)}},onItem:(t)=>{if(v.add(t),p)t(p.item);return()=>{v.delete(t)}},onStatusControl:(t)=>(I.add(t),()=>{I.delete(t)}),onPopoverClosed:(t)=>(T.add(t),()=>{T.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new h("UNSUPPORTED","This host does not support status controls."));if(!Ao(t))return Promise.reject(new h("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return U({...C,type:"status-controls",id:_(d),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new h("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new h("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return U({...C,type:"popover-open",id:_(d),payload:t})},closePopover:_o,setPopoverAnchorActive:go,onResolve:(t)=>(g=t,()=>{if(g===t)g=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Pe)return Promise.reject(new h("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ne))return Promise.reject(new h("HOST_REJECTED",`Toast copy text must contain 1 to ${Ne} characters.`));return U({channel:x,v:b,type:"toast",id:_(d),payload:{...t,message:r}})},openUrl:(t)=>U({channel:x,v:b,type:"open-url",id:_(d),payload:{url:t}}),openCommit:(t)=>bt(t)?U({channel:x,v:b,type:"open-commit",id:_(d),payload:{sha:t}}):Promise.reject(new h("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>U({channel:x,v:b,type:"open-surface",id:_(d),payload:{surfaceId:t}}),writeClipboard:(t)=>U({channel:x,v:b,type:"clipboard-write",id:_(d),payload:{text:t}}),compose:(t)=>U({channel:x,v:b,type:"compose",id:_(d),payload:t}),attach:(t)=>U({channel:x,v:b,type:"attach",id:_(d),payload:he(t)}),startSession:async(t)=>{if(t.projectId!==void 0)Y(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")Y(r.directory);else{if(r.name!==void 0)Y(r.name,200);if(r.baseBranch!==void 0)Y(r.baseBranch,200)}let u=await D({channel:x,v:b,type:"start-session",id:_(d),payload:At(t)},e.requestTimeoutMs??180000);if(!gt(u))throw new h("HOST_REJECTED","Host did not return a session.");return u},prompt:(t)=>D({channel:x,v:b,type:"prompt",id:_(d),payload:kt(t)}).then((r)=>{if(!xt(r))throw new h("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>U({channel:x,v:b,type:"session-link",id:_(d),payload:he(t)}),close:()=>U({channel:x,v:b,type:"close",id:_(d)}),oauthStart:()=>U({channel:x,v:b,type:"oauth-start",id:_(d)}),oauthDisconnect:()=>U({channel:x,v:b,type:"oauth-disconnect",id:_(d)}),request:(t)=>(Xe(t.path)?D({channel:x,v:b,type:"request",id:_(d),payload:t}):Yo()).then((r)=>{if(!Be(r))throw new h("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Xe(t.path)?D({channel:x,v:b,type:"service-request",id:_(d),payload:t}):Yo()).then((r)=>{if(!Be(r))throw new h("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>D({channel:x,v:b,type:"service-status",id:_(d)}).then((t)=>{if(!Rt(t))throw new h("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Ee(t)?D({channel:x,v:b,type:"file-read",id:_(d),payload:{path:t}}):Ve()).then((r)=>{if(!It(r))throw new h("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Ee(t))return Ve();if(r.length>$e)return Promise.reject(new h("FILE_TOO_LARGE",`Content is over ${$e} characters.`));return D({channel:x,v:b,type:"file-write",id:_(d),payload:{path:t,content:r}}).then((u)=>{if(!Ut(u))throw new h("HOST_REJECTED","Host did not confirm the write.");return u})},listDir:(t)=>(Ee(t)?D({channel:x,v:b,type:"file-list",id:_(d),payload:{path:t}}):Ve()).then((r)=>{if(!Ct(r))throw new h("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Ee(t)?D({channel:x,v:b,type:"file-stat",id:_(d),payload:{path:t}}):Ve()).then((r)=>{if(!Lt(r))throw new h("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),u=t.system?.trim();if(r.length===0||r.length>He)return Promise.reject(new h("HOST_REJECTED",`Prompt must be 1 to ${He} characters.`));if(u!==void 0&&(u.length===0||u.length>Fe))return Promise.reject(new h("HOST_REJECTED",`System prompt must be 1 to ${Fe} characters.`));let m=t.maxOutputTokens===void 0?void 0:Math.min(yt,Math.max(1,Math.floor(t.maxOutputTokens)));if(m!==void 0&&!Number.isFinite(m))return Promise.reject(new h("HOST_REJECTED","maxOutputTokens must be a number."));let A={prompt:r};if(u!==void 0)A.system=u;if(m!==void 0)A.maxOutputTokens=m;return D({channel:x,v:b,type:"generate",id:_(d),payload:A},e.requestTimeoutMs??vt).then((y)=>{if(!Mt(y))throw new h("HOST_REJECTED","Host did not return generated text.");return y})},setBadge:(t)=>U({channel:x,v:b,type:"badge",id:_(d),payload:{count:wt(t)}}),setHeight:(t)=>U({channel:x,v:b,type:"resize",id:_(d),payload:{height:Ot(t)}}),onFileOpen:(t)=>{if(N.add(t),!me)me=!0,o.addEventListener("keydown",mo,!0);if(ne)t(ne);return()=>{N.delete(t)}},onFileSnapshot:(t)=>(W=t,()=>{if(W===t)W=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>ct({...C,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:uo,reportFileUnsupported:()=>ct({...C,type:"file-unsupported"}),dispose:()=>{for(let t of V.keys())F({...C,type:"workspace-unsubscribe",id:_(d),payload:{subscriptionId:t}});V.clear();for(let t of q.keys())F({...C,type:"shells-unsubscribe",id:_(d),payload:{subscriptionId:t}});if(q.clear(),ee=!0,g=null,P=null,W=null,N.clear(),Q.clear(),me)o.removeEventListener("keydown",mo,!0);o.removeEventListener("message",po),o.removeEventListener("keydown",fo,!0),o.removeEventListener("pointerover",Ie),o.removeEventListener("pointermove",Ie),o.removeEventListener("pointerout",ho),o.removeEventListener("focus",Eo),o.removeEventListener("blur",So);for(let t of Z.values())clearTimeout(t.timer),t.reject(new h("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),i.clear(),a.clear(),l.clear(),E.clear(),f.clear(),S.clear(),v.clear(),I.clear(),T.clear()}}};var Qo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var cs=new Set(Qo);var Zo=["none","agent","user"];var ls=new Set(Zo);var Jr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Yr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Jr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of Yr){let a=e.tokens[i]??"";o.style.setProperty(n,a),o.style.setProperty(s,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Nt=(e,o)=>{if(qo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Qr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(e,o)=>`var(--${e}, var(--oc-${Qr[e]}, ${o}))`,le=k("surface-background","transparent"),ze=k("surface-elevated","transparent"),Te=k("surface-elevated-foreground","inherit"),se=k("surface-foreground","inherit"),O=k("surface-muted-foreground","gray"),Zr=k("surface-muted","transparent"),K=k("interactive-border","currentColor"),j=k("interactive-hover","transparent"),pe=k("interactive-active","transparent"),Dt=k("interactive-selection","transparent"),$t=k("interactive-selection-foreground","inherit"),or=k("interactive-focus-ring","currentColor"),te=k("primary","currentColor"),Ht=k("primary-text","inherit"),Ft=k("error-text","inherit"),qr=k("font-sans","inherit"),Xt=k("font-mono","monospace"),rr=k("radius","9px"),Bt=`calc(${rr} - 2px)`,er=`calc(${rr} - 4px)`,G=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,tr=`box-shadow: 0 0 0 2px ${or};`,Ke=(e)=>{let o=k(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${k(`${e}-text`,"inherit")}; }`},en=`
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
`,nr=`
.oc-sdk { color: ${se}; font-family: ${qr}; }
.oc-sdk :focus-visible { outline: none; ${tr} }
.oc-sdk-mono { font-family: ${Xt}; }
.oc-sdk-muted { color: ${O}; }
${Ke("success")}${Ke("warning")}${Ke("error")}${Ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${te}; --oc-sdk-tone-text: ${Ht}; }

.oc-sdk-btn { border-radius: ${Bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${er}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ht}; background: ${G(te,10,le)}; border-color: ${G(te,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${G(te,16,le)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${G(te,22,le)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Zr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="outline"] { background: ${ze}; color: ${Te}; border-color: ${K}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${pe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${Ft}; background: ${G("var(--oc-sdk-tone)",7,le)}; border-color: ${G("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${G("var(--oc-sdk-tone)",9,le)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${G("var(--oc-sdk-tone)",11,le)}; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ft}; }
.oc-sdk-input { border-radius: ${Bt}; background: ${ze}; color: ${Te}; box-shadow: inset 0 0 0 1px ${G(K,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${or}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${k("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${k("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Xt}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${te}; }
.oc-sdk-search-clear { border-radius: ${er}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${se}; }

.oc-sdk-trigger { border-color: ${K}; border-radius: ${Bt}; background: ${ze}; color: ${Te}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
.oc-sdk-popup { --surface-foreground: ${Te}; border-color: ${G(K,60)}; border-radius: 12px; background: ${ze}; color: ${Te}; box-shadow: 0 8px 24px ${G(se,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Dt}; color: ${$t}; }
.oc-sdk-option-check { color: ${se}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ft}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${G(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${se}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${G(se,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${le}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${te}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${tr} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${G(se,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${se}; }
.oc-sdk-tab[aria-selected="true"] { color: ${$t}; background: ${Dt}; border-color: ${K}; }
.oc-sdk-tab-count { color: ${O}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${G("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${Dt}; color: ${$t}; }
.oc-sdk-row-lead { font-family: ${Xt}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${te}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${G("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${G("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${G(K,40)}; }

.oc-sdk-progress-label { color: ${O}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${K}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${te}); }

.oc-sdk-text a { color: ${Ht}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${G(K,60)}; }
`,H=`
${pt}
${en}
${nr}`;var sn=0,ie=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[s,i]of Object.entries(o))n.setAttribute(s,String(i));return n},zt=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,s=ie("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),i=`fill-${++sn}`,a=ie("defs",{}),l=ie("linearGradient",{id:i,x1:0,x2:0,y1:0,y2:1});l.append(ie("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ie("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),a.append(l);let E=ie("path",{d:"",class:"chart-grid"}),f=ie("path",{d:"",fill:`url(#${i})`}),S=ie("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});s.append(a,E,f,S);let v=document.createElement("div");v.className="chart-cursor";let I=document.createElement("div");I.className="chart-dot",I.style.background=e.color;let T=document.createElement("div");T.className="chart-tip",o.append(s,v,I,T);let g=[],P=1,N=null,Q=null,W=(d,p)=>(e.capacity-p+d)/Math.max(1,e.capacity-1)*300,ne=(d)=>n-1-Math.min(d,P)/P*(n-1-2),me=()=>{let d=N===null?void 0:g[N];if(N===null||d===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let p=o.getBoundingClientRect(),w=W(N,g.length)/300*p.width,z=ne(d)/n*p.height;v.style.transform=`translateX(${w}px)`,I.style.transform=`translate(${w}px, ${z}px)`;let J=(g.length-1-N)*e.intervalSeconds;T.textContent=`${e.format(d)} · ${J===0?"now":`${J} s ago`}`;let de=w>p.width/2;T.style.left=de?"":`${w+8}px`,T.style.right=de?`${p.width-w+8}px`:""},Z=(d)=>{if(g.length===0)return;let p=o.getBoundingClientRect(),w=(d-p.left)/p.width*(e.capacity-1),z=Math.round(w-(e.capacity-g.length));N=Math.min(g.length-1,Math.max(0,z)),me()},V=!1,q=()=>{V=!1,Q=null,N=null,me()};return o.addEventListener("pointerdown",(d)=>{V=d.pointerType!=="mouse",Q=d.clientX,Z(d.clientX)}),o.addEventListener("pointermove",(d)=>{if(d.pointerType==="mouse")V=!1;else if(!V)return;Q=d.clientX,Z(d.clientX)}),o.addEventListener("pointerleave",(d)=>{if(V&&d.pointerType!=="mouse")return;q()}),o.addEventListener("pointercancel",q),document.addEventListener("pointerdown",(d)=>{if(V&&!(d.target instanceof Node&&o.contains(d.target)))q()},!0),{element:o,update:(d,p)=>{if(g=d,P=p>0?p:1,E.setAttribute("d",[0.25,0.5,0.75].map((w)=>`M0 ${n*w} H300`).join(" ")),g.length===0)f.setAttribute("d",""),S.setAttribute("d","");else{let w=g.map((Oe,F)=>`${W(F,g.length).toFixed(2)} ${ne(Oe).toFixed(2)}`),z=g.length===1,J=z?`M${W(0,1)-2} ${w[0]?.split(" ")[1]} L${w[0]}`:`M${w.join(" L")}`;S.setAttribute("d",J);let de=z?W(0,1)-2:W(0,g.length);f.setAttribute("d",`${J} L300 ${n} L${de.toFixed(2)} ${n} Z`)}if(Q!==null)Z(Q)}}};var c=(e,o="",n="",s=[])=>{let i=document.createElement(e);if(o)i.className=o;if(n)i.textContent=n;if(s.length>0)i.append(...s);return i},R=(e,o)=>{if(e.textContent!==o)e.textContent=o},ae=(e,o,n,s,i,a=0)=>{let l=new Map;for(let f of o){let S=n(f);for(let I=1;l.has(S);I+=1)S=`${n(f)}\x01${I}`;let v=i.get(S);if(v)v.update(f);l.set(S,v??s(f))}for(let[f,S]of i)if(l.get(f)!==S)S.element.remove();i.clear();let E=a;for(let[f,S]of l){i.set(f,S);let v=e.children[E]??null;if(v!==S.element)e.insertBefore(S.element,v);E+=1}};var Wt=5000,sr={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Ze=(e)=>typeof e==="object"&&e!==null,an=(e)=>Ze(e)&&typeof e.at==="number"&&Ze(e.system)&&Ze(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Ze(e.history),cn=(e)=>{if(!(e instanceof h))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},ir=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},ar=(e,o)=>{let n=c("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(s)=>{s.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},Kt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,cr=(e,o,n,s)=>{let i=!1,a=async()=>{if(i||!Kt(o))return;i=!0;try{let f=await e.serviceRequest({method:"GET",path:"/snapshot"}),S;try{S=JSON.parse(f.body)}catch{S=null}if(f.status===200&&an(S))n(S);else s(f.status===200?"bad-answer":"service-failed")}catch(f){s(cn(f))}finally{i=!1}};a(),setInterval(()=>{a()},Wt);let l=Kt(o),E=()=>{let f=Kt(o);if(f&&!l)a();l=f};return document.addEventListener("visibilitychange",E),new ResizeObserver(E).observe(document.documentElement),{refresh:()=>{a()}}};var Jt="en",dr=(e)=>{try{Jt=Intl.NumberFormat.supportedLocalesOf(e)[0]??"en"}catch{Jt="en"}},lr=(e,o)=>new Intl.NumberFormat(Jt,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),re=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),s=0;while(n>=1024&&s<o.length-1)n/=1024,s+=1;let i=s>=3&&n<100?1:0;return`${lr(n,i)} ${o[s]}`},ue=(e)=>{if(e===null)return"–";if(e>0&&e<0.01)return"<0.01%";return`${lr(e,e>0&&e<1?2:e<10?1:0)}%`},pr=(e,o)=>e===null?null:e/Math.max(1,o),ur=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${s} min`;return`${s} min`},qe=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let s=-1;while((s=n.indexOf(e,s+1))>=0){if(!/[\\/]/.test(n[s-1]??""))continue;let i=n.slice(s+e.length).replace(/^\.exe/i,"");if(i===""||i.startsWith(" "))return i.trim()}return o},dn={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},ln=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],et=(...e)=>e.filter(Boolean).join(" · "),Yt=(e,o)=>{let n=e.ports.map((l)=>`:${l}`).join(" ");if(o==="root")return{title:"Main process",detail:et(n,qe(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let s=/--type=([\w-]+)/.exec(e.command)?.[1];if(s&&/\bHelper\b/.test(e.name)){let l=s==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:ln.find(([f])=>f.test(l))?.[1]??dn[s]??s,detail:et(n,qe(e.name,e.command))}}let i=e.label||e.name,a=qe(e.name,e.command);return{title:i,detail:et(n,a===i||a===e.name?"":a)}},Qt=(e)=>{let o=qe(e.name,e.command),n=o===e.title||o===e.name||e.command===e.title;return et(e.ports.map((s)=>`:${s}`).join(" "),e.count>1?`${e.count} processes`:"",n?"":o)},mr=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},tt={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},fr={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},ce={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var hr=`
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
  /* A sideways drag on a chart moves its label; a vertical one still scrolls. */
  @media (pointer: coarse) { .chart { touch-action: pan-y; } }
`,Er=`
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
  .stack > span { height: 100%; }
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
  /* A tooltip's text, shown in the row after a tap on a touch screen. */
  .pextra { display: none; grid-column: 1 / -1; margin-top: 2px; color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); white-space: pre-wrap; overflow-wrap: anywhere; user-select: text; }
  .revealed .pextra { display: block; }
  .revealed .pdetail { white-space: normal; overflow-wrap: anywhere; }
  /* On a notched phone the last line stays above the home indicator; elsewhere the inset is 0. */
  #root { padding-bottom: calc(20px + var(--safe-bottom, 0px)); }
  /* A finger: rows and buttons big enough to hit. */
  @media (pointer: coarse) {
    .row, .group-head, .row.member, .group > .row, .group > .job-wrap > .row { min-height: 44px; }
    .group-head { padding-top: 8px; padding-bottom: 4px; }
    .job.open .pextra { display: block; }
    .stop { min-height: 40px; min-width: 44px; padding: 0 8px; font-size: 12px; }
    .stop:hover { color: var(--oc-muted); }
    .stop.armed, .stop.armed:hover { color: var(--oc-error-text, var(--oc-error)); }
    .port { position: relative; height: 26px; padding: 0 9px; font-size: 12px; }
    .port::after { content: ''; position: absolute; inset: -7px -3px; }
    /* A phone row is narrow: ports and name wrap instead of running into the numbers. */
    .row.server .title-line { flex-wrap: wrap; row-gap: 8px; }
    .row.server .pname.strong { flex: 0 1 auto; max-width: 100%; }
  }
  [hidden] { display: none !important; }
`;var Zt=36;var xe=Pt(),ot=document.querySelector("#root");if(!ot)throw Error("Missing #root");var gr=document.createElement("style");gr.textContent=hr+Er;document.head.append(gr);var no=Wt/1000,xr=(e)=>{let o="";return e.addEventListener("pointerdown",(n)=>{o=n.pointerType}),()=>{let n=o==="touch"||o==="pen";return o="",n}},Ae=c("div","banner");Ae.hidden=!0;var br=c("div","host-name","This machine"),Tr=c("div","host-meta","Reading…"),we=c("div","live stale","Starting"),yr=c("div","head");yr.append(c("div","titles","",[br,Tr]),we);var vr=(e,o,n)=>{let s=c("span","big num","–"),i=c("span","sub num"),a=c("div","card-top","",[c("span","label",e),c("span","grow"),i]),l=zt({color:o,height:56,capacity:Zt,format:n,intervalSeconds:no}),E=c("div","sub num");return{card:c("div","card","",[a,s,l.element,E]),value:s,side:i,sub:E,chart:l}},ye=vr("CPU",ce.cpu,ue),ve=vr("Memory",ce.memory,re),pn=c("div","grid","",[ye.card,ve.card]),Ar=c("span","big num","–"),qt=c("span","sub num"),kr=zt({color:ce.app,height:44,capacity:Zt,format:re,intervalSeconds:no}),wr=c("div","stack"),Or=c("div","legend"),un=c("div","card","",[c("div","card-top","",[c("span","label","OpenChamber"),c("span","grow"),qt]),Ar,c("div","sub","The app, OpenCode, and everything they started"),kr.element,wr,Or]),mn=()=>{let e=c("span","cell","CPU");return e.title="CPU as a percentage of total machine capacity, on the same scale as the CPU card.",c("div","cols","",[c("span"),c("span"),e,c("span","cell","Memory")])},it=(e)=>c("span","action","",e?[e]:[]),Rr=c("span","count"),eo=c("div","list"),Ir=c("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),fn=c("section","section","",[c("div","section-head","",[c("span","label","Dev servers"),Rr]),eo,Ir]),Ur=c("div","list"),hn=c("section","section","",[c("div","section-head","",[c("span","label","Processes")]),mn(),Ur]),Cr=c("div","list"),so=c("section","section","",[c("div","section-head","",[c("span","label","OpenCode outside OpenChamber")]),Cr]);so.hidden=!0;var En=c("div","footnote","CPU everywhere is a percentage of total machine capacity: all logical cores together are 100%. Memory is resident memory: pages a process shares with others count in each of them.");ot.append(Ae,yr,pn,un,fn,hn,so,En);var Lr=()=>{return},io=(e,o,n)=>{let s=c("button","stop",e);s.type="button";let i=!1,a,l=xr(s),E=()=>{i=!1,s.classList.remove("armed"),s.removeAttribute("aria-label"),s.textContent=e};return s.addEventListener("click",(f)=>{f.preventDefault(),f.stopPropagation();let S=l();if(s.disabled)return;if(!i){i=!0,s.classList.add("armed"),s.textContent=S?`${e}?`:o,s.setAttribute("aria-label",o),clearTimeout(a),a=setTimeout(E,4000);return}clearTimeout(a),s.disabled=!0,s.textContent="Stopping…",ir(xe,n).then((v)=>{if(!v)Mn();s.disabled=!1,E(),Lr()})}),s},to=0,oo=1,Sn=(e)=>e.pid===to?"root":e.label==="Resource Monitor"&&e.ppid===to?"self":"other",at=(e)=>{let o=c("span"),n=c("span","cell num");return{cpu:o,memory:n,set:(i,a)=>{let l=e==="per-core"?pr(i,oo):i,E=l!==null&&l*oo>=1?"cell num":"cell num quiet";if(o.className!==E)o.className=E;R(o,ue(l)),R(n,re(a))}}},Mr=(e,o)=>{let n=c("span","title-line","",[c("span","pname",e)]),s=c("span","pdetail"),i=(a)=>{R(s,a),s.hidden=a===""};return i(o),{element:c("div","who","",[n,s]),setDetail:i}},ao=(e,o,n=!0)=>{if(e.title=o,e.append(c("span","pextra",o)),!n)return;let s=xr(e);e.addEventListener("click",()=>{if(!s())return;e.classList.toggle("revealed")})},co=(e,o)=>{let{title:n,detail:s}=Yt(e,o);return[e.pid,o,n,s,e.name,e.command].join("\x00")},lo=(e,o,n="row")=>{let{title:s,detail:i}=Yt(e,o),a=at("per-core");a.set(e.cpu,e.memory);let l=Mr(s,i),E=c("div",n,"",[l.element,it(),a.cpu,a.memory]);return ao(E,`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`),{element:E,update:(f)=>a.set(f.cpu,f.memory)}},_e=new Set,Gr=(e)=>e.members.length>0&&e.count>1,_n=(e,o)=>[e.pid,e.name,e.title,e.command,o,Gr(e)].join("\x00"),gn=(e)=>co(e,"other"),xn=(e)=>lo(e,"other","row member"),bn=(e,o)=>{let n=Gr(e),s=o?io("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name}):void 0,i=at("per-core"),a=Mr(e.title,Qt(e)),l=c("div",n?"row job foldable":"row job","",[a.element,it(s),i.cpu,i.memory]);ao(l,e.command||e.title,!n);let E=c("div","job-wrap","",[l]),f=c("div","more"),S=c("div","members","",[f]),v=new Map,I=e,T=(g)=>{I=g,i.set(g.cpu,g.memory),a.setDetail(Qt(g));let P=n&&_e.has(g.pid);if(l.classList.toggle("open",P),E.classList.toggle("open",P),n)l.setAttribute("aria-expanded",String(P));if(!P){S.remove();return}ae(S,g.members,gn,xn,v);let N=g.count-g.members.length;if(f.hidden=N<=0,R(f,N===1?"1 more process, idle":`${N} more processes, idle`),S.parentElement!==E)E.append(S)};if(n){l.tabIndex=0,l.setAttribute("role","button");let g=()=>{if(_e.has(I.pid))_e.delete(I.pid);else _e.add(I.pid);T(I)};l.addEventListener("click",g),l.addEventListener("keydown",(P)=>{if(P.key==="Enter"||P.key===" ")P.preventDefault(),g()})}return T(e),{element:E,update:T}},Pr="collapsed-groups",ge=new Set,rt=!1,Tn=()=>{if(!rt)return;xe.storage.set(Pr,[...ge],{scope:"device"}).catch(()=>{return})},yn=async()=>{if(!rt)return;try{let e=await xe.storage.get(Pr,{scope:"device"});if(!Array.isArray(e))return;for(let o of e)if(o==="app"||o==="opencode"||o==="terminals")ge.add(o);if(ro)$r(ro)}catch{}},vn=(e)=>{let o=(n)=>e.id==="terminals"||e.id==="opencode"&&n.ports.length>0;return[...e.processes.map((n)=>({kind:"process",row:n,role:Sn(n)})),...e.jobs.map((n)=>({kind:"job",job:n,stoppable:o(n)}))]},An=(e)=>e.kind==="process"?`process\x00${co(e.row,e.role)}`:`job\x00${_n(e.job,e.stoppable)}`,kn=(e)=>{if(e.kind==="process"){let n=lo(e.row,e.role);return{element:n.element,update:(s)=>{if(s.kind==="process")n.update(s.row)}}}let o=bn(e.job,e.stoppable);return{element:o.element,update:(n)=>{if(n.kind==="job")o.update(n.job)}}},Nr=(e)=>e.id==="terminals"&&e.jobs.length>0,wn=(e)=>`${e.id}\x00${Nr(e)}`,On=(e)=>{let o=c("span","dot");o.style.background=ce[e.id];let n=Nr(e)?io("Stop all","Stop everything running in the terminal?",{kind:"terminals"}):void 0,s=c("span","count"),i=c("span","gname","",[o,c("b","",tt[e.id]),s]),a=at("share"),l=c("div","group-head foldable","",[i,it(n),a.cpu,a.memory]);l.tabIndex=0,l.setAttribute("role","button");let E=c("div","group","",[l]);E.style.setProperty("--group-color",ce[e.id]);let f=new Map,S=e,v=(T)=>{S=T,R(s,String(T.count)),a.set(T.cpu,T.memory);let g=ge.has(T.id);l.classList.toggle("open",!g),l.setAttribute("aria-expanded",String(!g)),ae(E,g?[]:vn(T),An,kn,f,1)},I=()=>{if(ge.has(S.id))ge.delete(S.id);else ge.add(S.id);Tn(),v(S)};return l.addEventListener("click",I),l.addEventListener("keydown",(T)=>{if(T.key==="Enter"||T.key===" ")T.preventDefault(),I()}),v(e),{element:E,update:v}},Rn=(e)=>[e.pid,e.name,e.group,e.ports.join(","),e.command,e.job?.pid??"",e.job?.name??"",e.job?.title??""].join("\x00"),In=(e)=>{let o=e.ports.map((f)=>ar(xe,f)),n=c("div","title-line","",[...o,c("span","pname strong",e.name),c("span","origin",fr[e.group])]),s=e.job?io("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}):void 0,i=c("div","who","",[n]),a=e.job?.title??"";if(a)i.append(c("span","pdetail",a));let l=at("per-core");l.set(e.cpu,e.memory);let E=c("div","row server","",[i,it(s),l.cpu,l.memory]);return ao(E,`pid ${e.pid}${e.command?`
${e.command}`:""}`),{element:E,update:(f)=>l.set(f.cpu,f.memory)}},Un=(e)=>{let o=c("span");o.style.background=ce[e.id],o.title=tt[e.id];let n=(s)=>{o.style.width=`${Math.min(100,s.value/Math.max(1,s.total)*100)}%`};return n(e),{element:o,update:n}},Cn=(e)=>{let o=c("span","swatch");o.style.background=ce[e.id];let n=c("span","muted"),s=c("span","value num muted"),i=c("span","value num"),a=(l)=>{R(n,` · ${l.count} ${l.count===1?"process":"processes"}`),R(s,ue(l.cpu)),R(i,re(l.memory))};return a(e),{element:c("div","legend-row","",[o,c("span","name",tt[e.id],[n]),s,i]),update:a}},Ln={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},ke=null,nt=!1,Sr,Dr=[],ro=null,st=()=>{let e=ke!==null?sr[ke]:nt?"Could not stop it. It may have ended already, or it is not something this panel stops.":Dr.join(" ");Ae.hidden=e==="",Ae.classList.toggle("error",ke!==null||nt),R(Ae,e)};function Mn(){nt=!0,clearTimeout(Sr),Sr=setTimeout(()=>{nt=!1,st()},6000),st()}var Gn=new Map,Pn=new Map,Nn=new Map,Dn=new Map,$n=new Map;function $r(e){ro=e;let{system:o,app:n}=e;to=n.rootPid,oo=o.cores,R(br,o.hostname),R(Tr,[mr(o.platform),o.arch,o.cpuModel,`up ${ur(o.uptimeSeconds)}`].filter(Boolean).join(" · ")),R(we,`Live · every ${no} s`),we.classList.remove("stale"),R(ye.value,ue(o.cpu)),R(ye.side,`${o.cores} cores`),R(ye.sub,o.load?`Load ${o.load.map((a)=>a.toFixed(2)).join(" · ")}`:"All cores together"),ye.chart.update(e.history.system.cpu,100),R(ve.value,re(o.memoryUsed)),R(ve.side,ue(o.memoryUsed/Math.max(1,o.memoryTotal)*100)),R(ve.sub,`of ${re(o.memoryTotal)} · ${re(Math.max(0,o.memoryTotal-o.memoryUsed))} free`),ve.chart.update(e.history.system.memory,o.memoryTotal),R(Ar,re(n.memory)),R(qt,`${ue(n.cpu)} CPU`),qt.title=`Share of all ${o.cores} cores, the same scale as the CPU card`,kr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15);let s=n.groups.filter((a)=>a.memory>0).map((a)=>({id:a.id,value:a.memory,total:n.memory}));ae(wr,s,(a)=>a.id,Un,Gn),ae(Or,n.groups,(a)=>a.id,Cn,Pn),R(Rr,e.servers.length>0?String(e.servers.length):""),ae(eo,e.servers,Rn,In,Nn),eo.hidden=e.servers.length===0,Ir.hidden=e.servers.length>0,ae(Ur,n.groups,wn,On,Dn);let i=new Set(n.groups.flatMap((a)=>a.jobs.map((l)=>l.pid)));for(let a of _e)if(!i.has(a))_e.delete(a);so.hidden=e.outside.length===0,ae(Cr,e.outside,(a)=>co(a,"other"),(a)=>lo(a,"other"),$n),Dr=e.warnings.map((a)=>Ln[a]),st()}var Hn=(e)=>{ke=e,st(),we.textContent="Paused",we.classList.add("stale")},Fn=(e)=>{let n=e?.device?.insets?.bottom;return typeof n==="number"&&Number.isFinite(n)&&n>0?Math.min(n,200):0},_r=!1;xe.onReady((e)=>{if(Nt(e,document.documentElement),ot.style.setProperty("--safe-bottom",`${Fn(e)}px`),dr(e.locale),e.features?.deviceStorage===!0&&!rt)rt=!0,yn();if(_r)return;_r=!0,{refresh:Lr}=cr(xe,ot,(o)=>{ke=null,$r(o)},Hn)});})();
