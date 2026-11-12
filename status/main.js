(()=>{var f="openchamber.sdk",m=1;var qe=`
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
`;function Wt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(u)=>{let c=u.target===e?r:u.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-oc-scrolling"))c.setAttribute("data-oc-scrolling","");let E=n.get(c);if(E!==void 0)clearTimeout(E);n.set(c,setTimeout(()=>{n.delete(c),c.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var or=`(${Wt.toString()})(document);`;var et=128,tt=65536;var ye=128;var Ae=65536;var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Jt=(e)=>Object(e)===e&&!Array.isArray(e),ot=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,qt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Jt(n)||!Zt.test(n.id)||!Yt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!ot(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ot(n,["kind","id","label","value","options","disabled"]))return!1;if(!Qt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let u=new Set;for(let c of n.options){if(!Jt(c)||!ot(c,["value","label"])||!Qt(c.value)||!Yt(c.label)||u.has(c.value))return!1;u.add(c.value)}if(!u.has(n.value))return!1}return!0};var ve=20000000,ke=256;var rt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,eo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var to=/^[A-Za-z0-9_-]{1,80}$/;var oo=["left","right","top","bottom"];var ro=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of u)if(!ro(c,r+1,n))return!1;return!0},nt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(nt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(nt)}return String(e)===e||Number.isFinite(e)},st=(e)=>{try{if(String(e.id)!==e.id||!to.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!oo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ro(e.data)||!nt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var so=["file","directory","other","missing"],at=(e)=>Boolean(e&&"sessionId"in e),ct=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var io=/^[0-9a-f]{7,64}$/i,dt=(e)=>io.test(e),we=500,Oe=32000,ao=16000,co=128,lo=200,po=2000,uo=16000,fo=80,mo=200,Eo=16000;var ho=2000;var lt=20000,Re=1024,Ue=2000000;var Ie=64000,Ce=8000,pt=4000;var ut=90000;var _o=999,xo=1e4,Ee=500,So=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],To=["stopped","starting","ready","failed"],rr=new Set(So),go=(e)=>rr.has(e),bo=(e)=>e&&go(e)?e:"HOST_REJECTED",le=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(le);if(Object(e)===e)return Object.values(e).every(le);return!1},yo=(e)=>le(e)&&JSON.stringify(e).length<=Eo,no=(e)=>e?.trim().slice(0,mo)??"",pe=(e)=>{let r=e.id.trim().slice(0,co),n=e.title.trim().slice(0,lo),u=e.url.trim().slice(0,po),c=e.text?.trim().slice(0,uo),E=e.author?.trim().slice(0,fo),y=e.kind==="pull"?"pull":"issue",A={providerId:e.providerId.trim(),id:r,title:n||r,url:u,kind:y};if(c)A.text=c;if(E)A.author=E;if(y==="pull"){let h=no(e.branches?.head),_=no(e.branches?.base);if(h&&_)A.branches={head:h,base:_}}if(yo(e.data))A.data=e.data;return A},ft=(e)=>{let r=pe(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},mt=(e)=>{let r={text:e.text.trim().slice(0,ao)};if(e.send)r.send=!0;return r},Et=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(_o,Math.max(0,Math.round(e)))},ht=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var ue=(e)=>e.length>0&&e.length<=Re&&!e.includes("\x00")&&!e.includes("\\");var Me=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ho)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},nr=new Set(To),_t=(e)=>Boolean(e&&"status"in e&&nr.has(String(e.status))&&!("body"in e)),Le=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),xt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),St=(e)=>Boolean(e&&"written"in e&&e.written===!0),Tt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),sr=new Set(so),gt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&sr.has(String(e.kind))&&Number.isFinite(e.size)),bt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ir=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),ar=(e)=>Object(e)===e?e:null,it=(e)=>String(e)===e&&e.length>0,cr=(e)=>{if(!it(e.id))return null;if(e.ok===!0){let r={channel:f,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&it(e.error))return{channel:f,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:bo(it(e.code)?e.code:void 0)};return null},yt=(e)=>{let r=ar(e);if(!r||r.channel!==f||r.v!==m)return null;if(r.type==="result")return cr(r);if(!ir.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ao=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),dr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var vo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ge=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Re} characters without NUL or backslash.`)),Ne=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),At=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),u=e.requestTimeoutMs??lt,c=new Set,E=new Set,y=new Set,A=new Set,h=new Set,_=new Set,C=new Set,F=new Set,W=new Set,I=null,q=null,X=new Set,J=new Set,z=null,oe=null,de=!1,Y=new Map,D=new Map,Q=new Map,Z=!1,s={value:0},i=null,g=null,B=!1,j=!1,ie=null,Se=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},G=(t)=>{r.parent.postMessage(t,"*")},O=(t,o)=>{for(let a of t)try{a(o)}catch(d){console.error(d)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=yt(t.data);if(!o)return;if(o.type==="workspace"){let d=D.get(o.payload.subscriptionId);if(d)O([d],o.payload.snapshot);return}if(o.type==="shells"){let d=Q.get(o.payload.subscriptionId);if(d)O([d],o.payload.snapshot);return}if(o.type==="ready"){if(i=o.payload,g=Se(o.payload.session),O(c,o.payload),O(E,o.payload.directory),O(y,o.payload.session),g)O(A,g);O(h,o.payload.connection),O(_,o.payload.settings),O(C,o.payload.item);return}if(o.type==="directory"){if(i)i={...i,directory:o.payload.directory};O(E,o.payload.directory);return}if(o.type==="session"){if(i)i={...i,session:o.payload.session};if(!o.payload.session)g=null;else if(g?.sessionId!==o.payload.session.id)g=Se(o.payload.session);O(y,o.payload.session);return}if(o.type==="session-lifecycle"){g=o.payload,O(A,o.payload);return}if(o.type==="connection"){if(i)i={...i,connection:o.payload.connection};O(h,o.payload.connection);return}if(o.type==="settings"){if(i)i={...i,settings:o.payload.settings};O(_,o.payload.settings);return}if(o.type==="item"){if(i)i={...i,item:o.payload.item};O(C,o.payload.item);return}if(o.type==="status-control-event"){O(F,o.payload);return}if(o.type==="popover-closed"){O(W,o.payload);return}if(o.type==="action"){let d=(x)=>{if(!Z)G({channel:f,v:m,type:"action-result",id:o.id,payload:x})},S=q;if(!S){d({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(o.payload)).then(()=>d({ok:!0}),(x)=>{let w=(x instanceof Error?x.message:String(x)).trim();d({ok:!1,error:(w||"Action failed.").slice(0,Ee)})});return}if(o.type==="file-open"){let d=o.payload;if(oe&&eo(oe,d))return;oe=d,O(X,o.payload);return}if(o.type==="file-saved"){O(J,o.payload.version);return}if(o.type==="file-snapshot"){let d=(w)=>{if(!Z)G({channel:f,v:m,type:"file-snapshot-result",id:o.id,payload:w})},S=(w)=>d({error:(w.trim()||"Could not read the edited file.").slice(0,Ee)}),x=z;if(!x){S("This extension does not edit files.");return}Promise.resolve().then(()=>x(o.payload.purpose)).then((w)=>{if(rt(w)>ve){S(`The file is over ${ve} ${"bytes"in w?"bytes":"characters"}.`);return}if(w.version.length>ke){S(`The snapshot version is over ${ke} characters.`);return}d({snapshot:"bytes"in w?{bytes:w.bytes,version:w.version}:{content:w.content,version:w.version}})},(w)=>S(w instanceof Error?w.message:String(w)));return}if(o.type==="resolve"){let d=(x)=>{G({channel:f,v:m,type:"resolve-result",id:o.id,payload:x})},S=I;if(!S){d({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(o.payload)).then((x)=>d({item:x?pe(x):null}),(x)=>{let w=(x instanceof Error?x.message:String(x)).trim();d({error:(w||"Command failed.").slice(0,Ee)})});return}let a=Y.get(o.id);if(!a)return;if(clearTimeout(a.timer),Y.delete(o.id),o.ok){a.resolve(o.payload);return}a.reject(new l(o.code,o.error))};r.addEventListener("message",$t),G({channel:f,v:m,type:"hello"});let M=(t,o=u)=>{if(Z||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,d)=>{let S=setTimeout(()=>{Y.delete(t.id),d(new l("HOST_TIMEOUT","Host did not answer in time."))},o);Y.set(t.id,{resolve:a,reject:d,timer:S}),G(t)})},v=(t)=>M(t).then(()=>{return}),k={channel:f,v:m},Ye=(t)=>{if(!Z&&r.parent!==r)G(t)},Ht=()=>Ye({...k,type:"file-save"}),Ft=(t)=>{if(!Ao(t)||!dr(t))return;t.preventDefault(),Ht()},Xt=(t)=>{if(!Ao(t)||t.key!=="Escape"||i?.surface!=="popover"||!i.popover)return;t.preventDefault(),jt(i.popover.id,"escape").catch(()=>{return})},Te=()=>{let t=i?.surface==="popover"?i.popover:void 0;if(!t)return;let o=B||j;if(ie===o)return;ie=o,Kt(t.id,o).catch(()=>{return})},ge=()=>{if(i?.surface!=="popover"||B)return;B=!0,Te()},Bt=(t)=>{if(i?.surface!=="popover"||t.relatedTarget!==null||!B)return;B=!1,Te()},Vt=()=>{if(i?.surface!=="popover"||j)return;j=!0,Te()},zt=()=>{if(i?.surface!=="popover"||!j)return;j=!1,Te()},K=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Qe=async(t)=>{if(t.kind!=="projects")K(t.projectId);let o=await M({...k,type:"workspace-read",id:p(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},Ze=async(t,o)=>{if(t.kind!=="projects")K(t.projectId);let a=p(s);D.set(a,o);try{await v({...k,type:"workspace-subscribe",id:p(s),payload:{subscriptionId:a,query:t}})}catch(d){if(D.delete(a),!Z)G({...k,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:a}});throw d}return()=>{if(!D.delete(a)||Z)return;G({...k,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:a}})}},tr=async(t,o)=>{if(t.kind==="session")K(t.sessionId);if(t.kind==="project")K(t.projectId);let a=p(s);Q.set(a,o);try{await v({...k,type:"shells-subscribe",id:p(s),payload:{subscriptionId:a,scope:t}})}catch(d){if(Q.delete(a),!Z)G({...k,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:a}});throw d}return()=>{if(!Q.delete(a)||Z)return;G({...k,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:a}})}},be=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>et))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!le(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>tt)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&i?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await M({...k,type:"storage",id:p(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},jt=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...k,type:"popover-close",id:p(s),payload:o?{id:t,reason:o}:{id:t}}),Kt=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...k,type:"popover-anchor",id:p(s),payload:{id:t,active:o}});return r.addEventListener("keydown",Xt,!0),r.addEventListener("pointerover",ge),r.addEventListener("pointermove",ge),r.addEventListener("pointerout",Bt),r.addEventListener("focus",Vt),r.addEventListener("blur",zt),{onAction:(t)=>(q=t,()=>{if(q===t)q=null}),listProjects:async()=>{let t=await Qe({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Qe({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Qe({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Ze({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Ze({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")o(a)}),onSessions:(t,o)=>Ze({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")o(a)}),onRunningShells:(t,o)=>tr(t,o),readShellOutput:async(t,o)=>{K(t,ye);let a=o?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let d=o?.tailBytes;if(d!==void 0&&(!Number.isInteger(d)||d<1||d>Ae))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ae}.`);let x=await M({...k,type:"shell-output",id:p(s),payload:{shellId:t,cursor:a,tailBytes:d}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(K(t,ye),(await M({...k,type:"shell-stop",id:p(s),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{K(t),await v({...k,type:"open-session",id:p(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let a=Ne(o),d={op:"get",key:t};if(a)d.scope=a;let S=await be(d);return S.op==="get"&&S.found?S.value:void 0},set:async(t,o,a)=>{let d=Ne(a),S={op:"set",key:t,value:o};if(d)S.scope=d;await be(S)},delete:async(t,o)=>{let a=Ne(o),d={op:"delete",key:t};if(a)d.scope=a;await be(d)},keys:async(t)=>{let o=Ne(t),a={op:"keys"};if(o)a.scope=o;let d=await be(a);if(d.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return d.keys}},onReady:(t)=>{if(c.add(t),i)t(i);return()=>{c.delete(t)}},onDirectory:(t)=>{if(E.add(t),i)t(i.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(y.add(t),i)t(i.session);return()=>{y.delete(t)}},onSessionLifecycle:(t)=>{if(A.add(t),g)t(g);return()=>{A.delete(t)}},onConnection:(t)=>{if(h.add(t),i)t(i.connection);return()=>{h.delete(t)}},onSettings:(t)=>{if(_.add(t),i)t(i.settings);return()=>{_.delete(t)}},onItem:(t)=>{if(C.add(t),i)t(i.item);return()=>{C.delete(t)}},onStatusControl:(t)=>(F.add(t),()=>{F.delete(t)}),onPopoverClosed:(t)=>(W.add(t),()=>{W.delete(t)}),setStatusControls:(t)=>{if(i?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!qt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...k,type:"status-controls",id:p(s),payload:{controls:t}})},openPopover:(t)=>{if(i?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!st(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...k,type:"popover-open",id:p(s),payload:t})},closePopover:jt,setPopoverAnchorActive:Kt,onResolve:(t)=>(I=t,()=>{if(I===t)I=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>we)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${we} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Oe))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Oe} characters.`));return v({channel:f,v:m,type:"toast",id:p(s),payload:{...t,message:o}})},openUrl:(t)=>v({channel:f,v:m,type:"open-url",id:p(s),payload:{url:t}}),openCommit:(t)=>dt(t)?v({channel:f,v:m,type:"open-commit",id:p(s),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:f,v:m,type:"open-surface",id:p(s),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:f,v:m,type:"clipboard-write",id:p(s),payload:{text:t}}),compose:(t)=>v({channel:f,v:m,type:"compose",id:p(s),payload:t}),attach:(t)=>v({channel:f,v:m,type:"attach",id:p(s),payload:pe(t)}),startSession:async(t)=>{if(t.projectId!==void 0)K(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")K(o.directory);else{if(o.name!==void 0)K(o.name,200);if(o.baseBranch!==void 0)K(o.baseBranch,200)}let a=await M({channel:f,v:m,type:"start-session",id:p(s),payload:ft(t)},e.requestTimeoutMs??180000);if(!at(a))throw new l("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>M({channel:f,v:m,type:"prompt",id:p(s),payload:mt(t)}).then((o)=>{if(!ct(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>v({channel:f,v:m,type:"session-link",id:p(s),payload:pe(t)}),close:()=>v({channel:f,v:m,type:"close",id:p(s)}),oauthStart:()=>v({channel:f,v:m,type:"oauth-start",id:p(s)}),oauthDisconnect:()=>v({channel:f,v:m,type:"oauth-disconnect",id:p(s)}),request:(t)=>(Me(t.path)?M({channel:f,v:m,type:"request",id:p(s),payload:t}):vo()).then((o)=>{if(!Le(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Me(t.path)?M({channel:f,v:m,type:"service-request",id:p(s),payload:t}):vo()).then((o)=>{if(!Le(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>M({channel:f,v:m,type:"service-status",id:p(s)}).then((t)=>{if(!_t(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ue(t)?M({channel:f,v:m,type:"file-read",id:p(s),payload:{path:t}}):Ge()).then((o)=>{if(!xt(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ue(t))return Ge();if(o.length>Ue)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ue} characters.`));return M({channel:f,v:m,type:"file-write",id:p(s),payload:{path:t,content:o}}).then((a)=>{if(!St(a))throw new l("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(ue(t)?M({channel:f,v:m,type:"file-list",id:p(s),payload:{path:t}}):Ge()).then((o)=>{if(!Tt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ue(t)?M({channel:f,v:m,type:"file-stat",id:p(s),payload:{path:t}}):Ge()).then((o)=>{if(!gt(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),a=t.system?.trim();if(o.length===0||o.length>Ie)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ie} characters.`));if(a!==void 0&&(a.length===0||a.length>Ce))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ce} characters.`));let d=t.maxOutputTokens===void 0?void 0:Math.min(pt,Math.max(1,Math.floor(t.maxOutputTokens)));if(d!==void 0&&!Number.isFinite(d))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:o};if(a!==void 0)S.system=a;if(d!==void 0)S.maxOutputTokens=d;return M({channel:f,v:m,type:"generate",id:p(s),payload:S},e.requestTimeoutMs??ut).then((x)=>{if(!bt(x))throw new l("HOST_REJECTED","Host did not return generated text.");return x})},setBadge:(t)=>v({channel:f,v:m,type:"badge",id:p(s),payload:{count:Et(t)}}),setHeight:(t)=>v({channel:f,v:m,type:"resize",id:p(s),payload:{height:ht(t)}}),onFileOpen:(t)=>{if(X.add(t),!de)de=!0,r.addEventListener("keydown",Ft,!0);if(oe)t(oe);return()=>{X.delete(t)}},onFileSnapshot:(t)=>(z=t,()=>{if(z===t)z=null}),onFileSaved:(t)=>(J.add(t),()=>{J.delete(t)}),reportFileChange:(t)=>Ye({...k,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Ht,reportFileUnsupported:()=>Ye({...k,type:"file-unsupported"}),dispose:()=>{for(let t of D.keys())G({...k,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:t}});D.clear();for(let t of Q.keys())G({...k,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:t}});if(Q.clear(),Z=!0,I=null,q=null,z=null,X.clear(),J.clear(),de)r.removeEventListener("keydown",Ft,!0);r.removeEventListener("message",$t),r.removeEventListener("keydown",Xt,!0),r.removeEventListener("pointerover",ge),r.removeEventListener("pointermove",ge),r.removeEventListener("pointerout",Bt),r.removeEventListener("focus",Vt),r.removeEventListener("blur",zt);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),c.clear(),E.clear(),y.clear(),A.clear(),h.clear(),_.clear(),C.clear(),F.clear(),W.clear()}}};var ko=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var jr=new Set(ko);var wo=["none","agent","user"];var Wr=new Set(wo);var lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Oo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,u]of lr)r.style.setProperty(n,e.tokens[u]);for(let[n,u,c]of pr){let E=e.tokens[c]??"";r.style.setProperty(n,E),r.style.setProperty(u,E)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},vt=(e,r)=>{if(Oo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var ur={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${ur[e]}, ${r}))`,ae=T("surface-background","transparent"),Pe=T("surface-elevated","transparent"),he=T("surface-elevated-foreground","inherit"),re=T("surface-foreground","inherit"),b=T("surface-muted-foreground","gray"),fr=T("surface-muted","transparent"),V=T("interactive-border","currentColor"),H=T("interactive-hover","transparent"),ce=T("interactive-active","transparent"),kt=T("interactive-selection","transparent"),wt=T("interactive-selection-foreground","inherit"),Io=T("interactive-focus-ring","currentColor"),ee=T("primary","currentColor"),Ot=T("primary-text","inherit"),Rt=T("error-text","inherit"),mr=T("font-sans","inherit"),Ut=T("font-mono","monospace"),Co=T("radius","9px"),It=`calc(${Co} - 2px)`,Ro=`calc(${Co} - 4px)`,R=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Uo=`box-shadow: 0 0 0 2px ${Io};`,De=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Er=`
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
`,Mo=`
.oc-sdk { color: ${re}; font-family: ${mr}; }
.oc-sdk :focus-visible { outline: none; ${Uo} }
.oc-sdk-mono { font-family: ${Ut}; }
.oc-sdk-muted { color: ${b}; }
${De("success")}${De("warning")}${De("error")}${De("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ee}; --oc-sdk-tone-text: ${Ot}; }

.oc-sdk-btn { border-radius: ${It}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ro}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ot}; background: ${R(ee,10,ae)}; border-color: ${R(ee,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${R(ee,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${R(ee,22,ae)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${fr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Pe}; color: ${he}; border-color: ${V}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ce}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Rt}; background: ${R("var(--oc-sdk-tone)",7,ae)}; border-color: ${R("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${R("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${R("var(--oc-sdk-tone)",11,ae)}; }

.oc-sdk-field-note { color: ${b}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Rt}; }
.oc-sdk-input { border-radius: ${It}; background: ${Pe}; color: ${he}; box-shadow: inset 0 0 0 1px ${R(V,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${b}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Io}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Ut}; }

.oc-sdk-search-icon { color: ${b}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ee}; }
.oc-sdk-search-clear { border-radius: ${Ro}; color: ${b}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${re}; }

.oc-sdk-trigger { border-color: ${V}; border-radius: ${It}; background: ${Pe}; color: ${he}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${b}; }
.oc-sdk-trigger-chevron { color: ${b}; }
.oc-sdk-popup { --surface-foreground: ${he}; border-color: ${R(V,60)}; border-radius: 12px; background: ${Pe}; color: ${he}; box-shadow: 0 8px 24px ${R(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${kt}; color: ${wt}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${Rt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${R(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${b}; }
.oc-sdk-popup-empty { color: ${b}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${R(re,60,V)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ee}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Uo} }
.oc-sdk-check-desc { color: ${b}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${R(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${b}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${wt}; background: ${kt}; border-color: ${V}; }
.oc-sdk-tab-count { color: ${b}; }

.oc-sdk-badge { border-radius: 9999px; background: ${H}; color: ${b}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${R("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${kt}; color: ${wt}; }
.oc-sdk-row-lead { font-family: ${Ut}; color: ${b}; }
.oc-sdk-row-sub { color: ${b}; }
.oc-sdk-row-meta { color: ${b}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${b}; }

.oc-sdk-empty-body { color: ${b}; }

.oc-sdk-spinner { color: ${b}; }
.oc-sdk-spinner-ring { border-color: ${V}; border-top-color: ${ee}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${R("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${R("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${b}; }

.oc-sdk-separator { color: ${b}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${R(V,40)}; }

.oc-sdk-progress-label { color: ${b}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ee}); }

.oc-sdk-text a { color: ${Ot}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${R(V,60)}; }
`,L=`
${qe}
${Er}
${Mo}`;var Tr=0,ne=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[u,c]of Object.entries(r))n.setAttribute(u,String(c));return n},Lo=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,u=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),c=`fill-${++Tr}`,E=ne("defs",{}),y=ne("linearGradient",{id:c,x1:0,x2:0,y1:0,y2:1});y.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),E.append(y);let A=ne("path",{d:"",class:"chart-grid"}),h=ne("path",{d:"",fill:`url(#${c})`}),_=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});u.append(E,A,h,_);let C=document.createElement("div");C.className="chart-cursor";let F=document.createElement("div");F.className="chart-dot",F.style.background=e.color;let W=document.createElement("div");W.className="chart-tip",r.append(u,C,F,W);let I=[],q=1,X=null,J=null,z=(s,i)=>(e.capacity-i+s)/Math.max(1,e.capacity-1)*300,oe=(s)=>n-1-Math.min(s,q)/q*(n-1-2),de=()=>{let s=X===null?void 0:I[X];if(X===null||s===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let i=r.getBoundingClientRect(),g=z(X,I.length)/300*i.width,B=oe(s)/n*i.height;C.style.transform=`translateX(${g}px)`,F.style.transform=`translate(${g}px, ${B}px)`;let j=(I.length-1-X)*e.intervalSeconds;W.textContent=`${e.format(s)} · ${j===0?"now":`${j} s ago`}`;let ie=g>i.width/2;W.style.left=ie?"":`${g+8}px`,W.style.right=ie?`${i.width-g+8}px`:""},Y=(s)=>{if(I.length===0)return;let i=r.getBoundingClientRect(),g=(s-i.left)/i.width*(e.capacity-1),B=Math.round(g-(e.capacity-I.length));X=Math.min(I.length-1,Math.max(0,B)),de()},D=!1,Q=()=>{D=!1,J=null,X=null,de()};return r.addEventListener("pointerdown",(s)=>{D=s.pointerType!=="mouse",J=s.clientX,Y(s.clientX)}),r.addEventListener("pointermove",(s)=>{if(s.pointerType==="mouse")D=!1;else if(!D)return;J=s.clientX,Y(s.clientX)}),r.addEventListener("pointerleave",(s)=>{if(D&&s.pointerType!=="mouse")return;Q()}),r.addEventListener("pointercancel",Q),document.addEventListener("pointerdown",(s)=>{if(D&&!(s.target instanceof Node&&r.contains(s.target)))Q()},!0),{element:r,update:(s,i)=>{if(I=s,q=i>0?i:1,A.setAttribute("d",[0.25,0.5,0.75].map((g)=>`M0 ${n*g} H300`).join(" ")),I.length===0)h.setAttribute("d",""),_.setAttribute("d","");else{let g=I.map((Se,G)=>`${z(G,I.length).toFixed(2)} ${oe(Se).toFixed(2)}`),B=I.length===1,j=B?`M${z(0,1)-2} ${g[0]?.split(" ")[1]} L${g[0]}`:`M${g.join(" L")}`;_.setAttribute("d",j);let ie=B?z(0,1)-2:z(0,I.length);h.setAttribute("d",`${j} L300 ${n} L${ie.toFixed(2)} ${n} Z`)}if(J!==null)Y(J)}}};var U=(e,r="",n="",u=[])=>{let c=document.createElement(e);if(r)c.className=r;if(n)c.textContent=n;if(u.length>0)c.append(...u);return c},me=(e,r)=>{if(e.textContent!==r)e.textContent=r},Go=(e,r,n,u,c,E=0)=>{let y=new Map;for(let h of r){let _=n(h);for(let F=1;y.has(_);F+=1)_=`${n(h)}\x01${F}`;let C=c.get(_);if(C)C.update(h);y.set(_,C??u(h))}for(let[h,_]of c)if(y.get(h)!==_)_.element.remove();c.clear();let A=E;for(let[h,_]of y){c.set(h,_);let C=e.children[A]??null;if(C!==_.element)e.insertBefore(_.element,C);A+=1}};var Gt=5000,No={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Be=(e)=>typeof e==="object"&&e!==null,gr=(e)=>Be(e)&&typeof e.at==="number"&&Be(e.system)&&Be(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Be(e.history),br=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"};var Po=(e,r)=>{let n=U("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(u)=>{u.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},Lt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Do=(e,r,n,u)=>{let c=!1,E=async()=>{if(c||!Lt(r))return;c=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),_;try{_=JSON.parse(h.body)}catch{_=null}if(h.status===200&&gr(_))n(_);else u(h.status===200?"bad-answer":"service-failed")}catch(h){u(br(h))}finally{c=!1}};E(),setInterval(()=>{E()},Gt);let y=Lt(r),A=()=>{let h=Lt(r);if(h&&!y)E();y=h};return document.addEventListener("visibilitychange",A),new ResizeObserver(A).observe(document.documentElement),{refresh:()=>{E()}}};var Nt="en",$o=(e)=>{try{Nt=Intl.NumberFormat.supportedLocalesOf(e)[0]??"en"}catch{Nt="en"}},Ho=(e,r)=>new Intl.NumberFormat(Nt,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),_e=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),u=0;while(n>=1024&&u<r.length-1)n/=1024,u+=1;let c=u>=3&&n<100?1:0;return`${Ho(n,c)} ${r[u]}`},Pt=(e)=>{if(e===null)return"–";if(e>0&&e<0.01)return"<0.01%";return`${Ho(e,e>0&&e<1?2:e<10?1:0)}%`};var Ve={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var Fo=36;var Xo=`
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
`;var Bo=`
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; }
  .ports { display: flex; flex-wrap: wrap; gap: 4px; min-width: 0; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;var ze=At(),xe=document.querySelector("#root");if(!xe)throw Error("Missing #root");var jo=document.createElement("style");jo.textContent=Xo+Bo;document.head.append(jo);var Ko=(e)=>{let r=U("span");return r.style.background=e,r.style.width="0%",{element:U("div","meter","",[r]),set:(n)=>{r.style.width=`${Math.min(100,Math.max(0,n))}%`}}},Wo=Lo({color:Ve.app,height:18,capacity:Fo,format:_e,intervalSeconds:Gt/1000}),Dt=U("span","value num","–");Dt.title="Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU is a percentage of total machine capacity: all logical cores together are 100%, on the same scale as the CPU line.";var Jo=Ko(Ve.cpu),Yo=U("span","value num","–"),Qo=Ko(Ve.memory),Zo=U("span","value num","–"),qo=U("div","ports"),er=U("span","value num"),je=U("div","line","",[U("span","what","OpenChamber"),Wo.element,Dt]),Ke=U("div","line","",[U("span","what","CPU"),Jo.element,Yo]),We=U("div","line","",[U("span","what","Memory"),Qo.element,Zo]),Je=U("div","line","",[U("span","what","Dev servers"),qo,er]);Je.hidden=!0;var se=U("div","note","Reading…");xe.append(se,je,Ke,We,Je);for(let e of[je,Ke,We])e.hidden=!0;var yr=new Map,Ar=(e)=>({element:Po(ze,e),update:()=>{return}}),vr=(e)=>{let{system:r,app:n}=e,u=e.warnings.includes("processes-unavailable");if(se.hidden=!u,se.className!=="note error")se.className="note error";me(se,u?"Could not read the process list; showing system totals only.":"");for(let E of[Ke,We])E.hidden=!1;je.hidden=u,me(Dt,`${_e(n.memory)} · ${Pt(n.cpu)}`),Wo.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),Jo.set(r.cpu??0),me(Yo,Pt(r.cpu)),Qo.set(r.memoryUsed/Math.max(1,r.memoryTotal)*100),me(Zo,`${_e(r.memoryUsed)} / ${_e(r.memoryTotal)}`);let c=[...new Set(e.servers.flatMap((E)=>E.ports))].sort((E,y)=>E-y);Je.hidden=c.length===0||u,Go(qo,c.slice(0,6),String,Ar,yr),me(er,c.length>6?`+${c.length-6}`:"")},Vo=-1;new ResizeObserver(()=>{let e=Math.ceil(xe.getBoundingClientRect().height);if(e===Vo)return;Vo=e,ze.setHeight(e).catch(()=>{return})}).observe(xe);var zo=!1;ze.onReady((e)=>{if(vt(e,document.documentElement),$o(e.locale),zo)return;zo=!0,Do(ze,xe,vr,(r)=>{se.hidden=!1,se.className="note error",se.textContent=No[r];for(let n of[je,Ke,We,Je])n.hidden=!0})});})();
