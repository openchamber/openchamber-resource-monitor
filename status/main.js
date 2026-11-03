(()=>{var f="openchamber.sdk",m=1;var Ze=`
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
`;function Wt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(u)=>{let c=u.target===e?r:u.target;if(!(c instanceof Element))return;if(!c.hasAttribute("data-oc-scrolling"))c.setAttribute("data-oc-scrolling","");let E=n.get(c);if(E!==void 0)clearTimeout(E);n.set(c,setTimeout(()=>{n.delete(c),c.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var or=`(${Wt.toString()})(document);`;var qe=128,et=65536;var be=128;var ye=65536;var Zt=/^[a-z][a-z0-9-]{0,39}$/;var Jt=(e)=>Object(e)===e&&!Array.isArray(e),tt=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Yt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Qt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,qt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Jt(n)||!Zt.test(n.id)||!Yt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!tt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!tt(n,["kind","id","label","value","options","disabled"]))return!1;if(!Qt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let u=new Set;for(let c of n.options){if(!Jt(c)||!tt(c,["value","label"])||!Qt(c.value)||!Yt(c.label)||u.has(c.value))return!1;u.add(c.value)}if(!u.has(n.value))return!1}return!0};var Ae=20000000,ke=256;var ot=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,eo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var to=/^[A-Za-z0-9_-]{1,80}$/;var oo=["left","right","top","bottom"];var ro=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let c of u)if(!ro(c,r+1,n))return!1;return!0},rt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(rt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(rt)}return String(e)===e||Number.isFinite(e)},nt=(e)=>{try{if(String(e.id)!==e.id||!to.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!oo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ro(e.data)||!rt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var so=["file","directory","other","missing"],it=(e)=>Boolean(e&&"sessionId"in e),at=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var io=/^[0-9a-f]{7,64}$/i,ct=(e)=>io.test(e),ve=500,Oe=32000,ao=16000,co=128,lo=200,po=2000,uo=16000,fo=80,mo=200,Eo=16000;var ho=2000;var dt=20000,we=1024,Re=2000000;var Ue=64000,Ie=8000,lt=4000;var pt=90000;var _o=999,xo=1e4,me=500,So=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],To=["stopped","starting","ready","failed"],rr=new Set(So),go=(e)=>rr.has(e),bo=(e)=>e&&go(e)?e:"HOST_REJECTED",de=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(de);if(Object(e)===e)return Object.values(e).every(de);return!1},yo=(e)=>de(e)&&JSON.stringify(e).length<=Eo,no=(e)=>e?.trim().slice(0,mo)??"",le=(e)=>{let r=e.id.trim().slice(0,co),n=e.title.trim().slice(0,lo),u=e.url.trim().slice(0,po),c=e.text?.trim().slice(0,uo),E=e.author?.trim().slice(0,fo),y=e.kind==="pull"?"pull":"issue",k={providerId:e.providerId.trim(),id:r,title:n||r,url:u,kind:y};if(c)k.text=c;if(E)k.author=E;if(y==="pull"){let h=no(e.branches?.head),_=no(e.branches?.base);if(h&&_)k.branches={head:h,base:_}}if(yo(e.data))k.data=e.data;return k},ut=(e)=>{let r=le(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},ft=(e)=>{let r={text:e.text.trim().slice(0,ao)};if(e.send)r.send=!0;return r},mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(_o,Math.max(0,Math.round(e)))},Et=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(xo,Math.max(0,Math.ceil(e)))};var pe=(e)=>e.length>0&&e.length<=we&&!e.includes("\x00")&&!e.includes("\\");var Ce=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ho)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},nr=new Set(To),ht=(e)=>Boolean(e&&"status"in e&&nr.has(String(e.status))&&!("body"in e)),Me=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_t=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),xt=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),sr=new Set(so),Tt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&sr.has(String(e.kind))&&Number.isFinite(e.size)),gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ir=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),ar=(e)=>Object(e)===e?e:null,st=(e)=>String(e)===e&&e.length>0,cr=(e)=>{if(!st(e.id))return null;if(e.ok===!0){let r={channel:f,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&st(e.error))return{channel:f,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:bo(st(e.code)?e.code:void 0)};return null},bt=(e)=>{let r=ar(e);if(!r||r.channel!==f||r.v!==m)return null;if(r.type==="result")return cr(r);if(!ir.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Ao=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),dr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var ko=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Le=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${we} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),yt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),u=e.requestTimeoutMs??dt,c=new Set,E=new Set,y=new Set,k=new Set,h=new Set,_=new Set,M=new Set,F=new Set,K=new Set,C=null,J=null,X=new Set,Y=new Set,z=null,ee=null,ce=!1,Q=new Map,ne=new Map,A=new Map,g=!1,s={value:0},a=null,L=null,W=!1,se=!1,xe=null,Dt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},B=(t)=>{r.parent.postMessage(t,"*")},R=(t,o)=>{for(let i of t)try{i(o)}catch(d){console.error(d)}},$t=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=bt(t.data);if(!o)return;if(o.type==="workspace"){let d=ne.get(o.payload.subscriptionId);if(d)R([d],o.payload.snapshot);return}if(o.type==="shells"){let d=A.get(o.payload.subscriptionId);if(d)R([d],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,L=Dt(o.payload.session),R(c,o.payload),R(E,o.payload.directory),R(y,o.payload.session),L)R(k,L);R(h,o.payload.connection),R(_,o.payload.settings),R(M,o.payload.item);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};R(E,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)L=null;else if(L?.sessionId!==o.payload.session.id)L=Dt(o.payload.session);R(y,o.payload.session);return}if(o.type==="session-lifecycle"){L=o.payload,R(k,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};R(h,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};R(_,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};R(M,o.payload.item);return}if(o.type==="status-control-event"){R(F,o.payload);return}if(o.type==="popover-closed"){R(K,o.payload);return}if(o.type==="action"){let d=(x)=>{if(!g)B({channel:f,v:m,type:"action-result",id:o.id,payload:x})},S=J;if(!S){d({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(o.payload)).then(()=>d({ok:!0}),(x)=>{let w=(x instanceof Error?x.message:String(x)).trim();d({ok:!1,error:(w||"Action failed.").slice(0,me)})});return}if(o.type==="file-open"){let d=o.payload;if(ee&&eo(ee,d))return;ee=d,R(X,o.payload);return}if(o.type==="file-saved"){R(Y,o.payload.version);return}if(o.type==="file-snapshot"){let d=(w)=>{if(!g)B({channel:f,v:m,type:"file-snapshot-result",id:o.id,payload:w})},S=(w)=>d({error:(w.trim()||"Could not read the edited file.").slice(0,me)}),x=z;if(!x){S("This extension does not edit files.");return}Promise.resolve().then(()=>x(o.payload.purpose)).then((w)=>{if(ot(w)>Ae){S(`The file is over ${Ae} ${"bytes"in w?"bytes":"characters"}.`);return}if(w.version.length>ke){S(`The snapshot version is over ${ke} characters.`);return}d({snapshot:"bytes"in w?{bytes:w.bytes,version:w.version}:{content:w.content,version:w.version}})},(w)=>S(w instanceof Error?w.message:String(w)));return}if(o.type==="resolve"){let d=(x)=>{B({channel:f,v:m,type:"resolve-result",id:o.id,payload:x})},S=C;if(!S){d({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(o.payload)).then((x)=>d({item:x?le(x):null}),(x)=>{let w=(x instanceof Error?x.message:String(x)).trim();d({error:(w||"Command failed.").slice(0,me)})});return}let i=Q.get(o.id);if(!i)return;if(clearTimeout(i.timer),Q.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new l(o.code,o.error))};r.addEventListener("message",$t),B({channel:f,v:m,type:"hello"});let G=(t,o=u)=>{if(g||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,d)=>{let S=setTimeout(()=>{Q.delete(t.id),d(new l("HOST_TIMEOUT","Host did not answer in time."))},o);Q.set(t.id,{resolve:i,reject:d,timer:S}),B(t)})},v=(t)=>G(t).then(()=>{return}),O={channel:f,v:m},Je=(t)=>{if(!g&&r.parent!==r)B(t)},Ht=()=>Je({...O,type:"file-save"}),Ft=(t)=>{if(!Ao(t)||!dr(t))return;t.preventDefault(),Ht()},Xt=(t)=>{if(!Ao(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),jt(a.popover.id,"escape").catch(()=>{return})},Se=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=W||se;if(xe===o)return;xe=o,Kt(t.id,o).catch(()=>{return})},Te=()=>{if(a?.surface!=="popover"||W)return;W=!0,Se()},Bt=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!W)return;W=!1,Se()},Vt=()=>{if(a?.surface!=="popover"||se)return;se=!0,Se()},zt=()=>{if(a?.surface!=="popover"||!se)return;se=!1,Se()},j=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Ye=async(t)=>{if(t.kind!=="projects")j(t.projectId);let o=await G({...O,type:"workspace-read",id:p(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},Qe=async(t,o)=>{if(t.kind!=="projects")j(t.projectId);let i=p(s);ne.set(i,o);try{await v({...O,type:"workspace-subscribe",id:p(s),payload:{subscriptionId:i,query:t}})}catch(d){if(ne.delete(i),!g)B({...O,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:i}});throw d}return()=>{if(!ne.delete(i)||g)return;B({...O,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:i}})}},tr=async(t,o)=>{if(t.kind==="session")j(t.sessionId);if(t.kind==="project")j(t.projectId);let i=p(s);A.set(i,o);try{await v({...O,type:"shells-subscribe",id:p(s),payload:{subscriptionId:i,scope:t}})}catch(d){if(A.delete(i),!g)B({...O,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:i}});throw d}return()=>{if(!A.delete(i)||g)return;B({...O,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:i}})}},ge=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>qe))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!de(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>et)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await G({...O,type:"storage",id:p(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},jt=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...O,type:"popover-close",id:p(s),payload:o?{id:t,reason:o}:{id:t}}),Kt=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):v({...O,type:"popover-anchor",id:p(s),payload:{id:t,active:o}});return r.addEventListener("keydown",Xt,!0),r.addEventListener("pointerover",Te),r.addEventListener("pointermove",Te),r.addEventListener("pointerout",Bt),r.addEventListener("focus",Vt),r.addEventListener("blur",zt),{onAction:(t)=>(J=t,()=>{if(J===t)J=null}),listProjects:async()=>{let t=await Ye({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Ye({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Ye({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Qe({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Qe({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>Qe({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>tr(t,o),readShellOutput:async(t,o)=>{j(t,be);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let d=o?.tailBytes;if(d!==void 0&&(!Number.isInteger(d)||d<1||d>ye))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ye}.`);let x=await G({...O,type:"shell-output",id:p(s),payload:{shellId:t,cursor:i,tailBytes:d}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(j(t,be),(await G({...O,type:"shell-stop",id:p(s),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{j(t),await v({...O,type:"open-session",id:p(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Ge(o),d={op:"get",key:t};if(i)d.scope=i;let S=await ge(d);return S.op==="get"&&S.found?S.value:void 0},set:async(t,o,i)=>{let d=Ge(i),S={op:"set",key:t,value:o};if(d)S.scope=d;await ge(S)},delete:async(t,o)=>{let i=Ge(o),d={op:"delete",key:t};if(i)d.scope=i;await ge(d)},keys:async(t)=>{let o=Ge(t),i={op:"keys"};if(o)i.scope=o;let d=await ge(i);if(d.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return d.keys}},onReady:(t)=>{if(c.add(t),a)t(a);return()=>{c.delete(t)}},onDirectory:(t)=>{if(E.add(t),a)t(a.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(y.add(t),a)t(a.session);return()=>{y.delete(t)}},onSessionLifecycle:(t)=>{if(k.add(t),L)t(L);return()=>{k.delete(t)}},onConnection:(t)=>{if(h.add(t),a)t(a.connection);return()=>{h.delete(t)}},onSettings:(t)=>{if(_.add(t),a)t(a.settings);return()=>{_.delete(t)}},onItem:(t)=>{if(M.add(t),a)t(a.item);return()=>{M.delete(t)}},onStatusControl:(t)=>(F.add(t),()=>{F.delete(t)}),onPopoverClosed:(t)=>(K.add(t),()=>{K.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!qt(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return v({...O,type:"status-controls",id:p(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!nt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return v({...O,type:"popover-open",id:p(s),payload:t})},closePopover:jt,setPopoverAnchorActive:Kt,onResolve:(t)=>(C=t,()=>{if(C===t)C=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ve)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ve} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Oe))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Oe} characters.`));return v({channel:f,v:m,type:"toast",id:p(s),payload:{...t,message:o}})},openUrl:(t)=>v({channel:f,v:m,type:"open-url",id:p(s),payload:{url:t}}),openCommit:(t)=>ct(t)?v({channel:f,v:m,type:"open-commit",id:p(s),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>v({channel:f,v:m,type:"open-surface",id:p(s),payload:{surfaceId:t}}),writeClipboard:(t)=>v({channel:f,v:m,type:"clipboard-write",id:p(s),payload:{text:t}}),compose:(t)=>v({channel:f,v:m,type:"compose",id:p(s),payload:t}),attach:(t)=>v({channel:f,v:m,type:"attach",id:p(s),payload:le(t)}),startSession:async(t)=>{if(t.projectId!==void 0)j(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")j(o.directory);else{if(o.name!==void 0)j(o.name,200);if(o.baseBranch!==void 0)j(o.baseBranch,200)}let i=await G({channel:f,v:m,type:"start-session",id:p(s),payload:ut(t)},e.requestTimeoutMs??180000);if(!it(i))throw new l("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>G({channel:f,v:m,type:"prompt",id:p(s),payload:ft(t)}).then((o)=>{if(!at(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>v({channel:f,v:m,type:"session-link",id:p(s),payload:le(t)}),close:()=>v({channel:f,v:m,type:"close",id:p(s)}),oauthStart:()=>v({channel:f,v:m,type:"oauth-start",id:p(s)}),oauthDisconnect:()=>v({channel:f,v:m,type:"oauth-disconnect",id:p(s)}),request:(t)=>(Ce(t.path)?G({channel:f,v:m,type:"request",id:p(s),payload:t}):ko()).then((o)=>{if(!Me(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ce(t.path)?G({channel:f,v:m,type:"service-request",id:p(s),payload:t}):ko()).then((o)=>{if(!Me(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>G({channel:f,v:m,type:"service-status",id:p(s)}).then((t)=>{if(!ht(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(pe(t)?G({channel:f,v:m,type:"file-read",id:p(s),payload:{path:t}}):Le()).then((o)=>{if(!_t(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!pe(t))return Le();if(o.length>Re)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Re} characters.`));return G({channel:f,v:m,type:"file-write",id:p(s),payload:{path:t,content:o}}).then((i)=>{if(!xt(i))throw new l("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(pe(t)?G({channel:f,v:m,type:"file-list",id:p(s),payload:{path:t}}):Le()).then((o)=>{if(!St(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(pe(t)?G({channel:f,v:m,type:"file-stat",id:p(s),payload:{path:t}}):Le()).then((o)=>{if(!Tt(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Ue)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ue} characters.`));if(i!==void 0&&(i.length===0||i.length>Ie))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${Ie} characters.`));let d=t.maxOutputTokens===void 0?void 0:Math.min(lt,Math.max(1,Math.floor(t.maxOutputTokens)));if(d!==void 0&&!Number.isFinite(d))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:o};if(i!==void 0)S.system=i;if(d!==void 0)S.maxOutputTokens=d;return G({channel:f,v:m,type:"generate",id:p(s),payload:S},e.requestTimeoutMs??pt).then((x)=>{if(!gt(x))throw new l("HOST_REJECTED","Host did not return generated text.");return x})},setBadge:(t)=>v({channel:f,v:m,type:"badge",id:p(s),payload:{count:mt(t)}}),setHeight:(t)=>v({channel:f,v:m,type:"resize",id:p(s),payload:{height:Et(t)}}),onFileOpen:(t)=>{if(X.add(t),!ce)ce=!0,r.addEventListener("keydown",Ft,!0);if(ee)t(ee);return()=>{X.delete(t)}},onFileSnapshot:(t)=>(z=t,()=>{if(z===t)z=null}),onFileSaved:(t)=>(Y.add(t),()=>{Y.delete(t)}),reportFileChange:(t)=>Je({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Ht,reportFileUnsupported:()=>Je({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ne.keys())B({...O,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:t}});ne.clear();for(let t of A.keys())B({...O,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:t}});if(A.clear(),g=!0,C=null,J=null,z=null,X.clear(),Y.clear(),ce)r.removeEventListener("keydown",Ft,!0);r.removeEventListener("message",$t),r.removeEventListener("keydown",Xt,!0),r.removeEventListener("pointerover",Te),r.removeEventListener("pointermove",Te),r.removeEventListener("pointerout",Bt),r.removeEventListener("focus",Vt),r.removeEventListener("blur",zt);for(let t of Q.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),c.clear(),E.clear(),y.clear(),k.clear(),h.clear(),_.clear(),M.clear(),F.clear(),K.clear()}}};var vo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var jr=new Set(vo);var Oo=["none","agent","user"];var Wr=new Set(Oo);var lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],wo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,u]of lr)r.style.setProperty(n,e.tokens[u]);for(let[n,u,c]of pr){let E=e.tokens[c]??"";r.style.setProperty(n,E),r.style.setProperty(u,E)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},At=(e,r)=>{if(wo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var ur={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${ur[e]}, ${r}))`,ie=T("surface-background","transparent"),Ne=T("surface-elevated","transparent"),Ee=T("surface-elevated-foreground","inherit"),te=T("surface-foreground","inherit"),b=T("surface-muted-foreground","gray"),fr=T("surface-muted","transparent"),V=T("interactive-border","currentColor"),H=T("interactive-hover","transparent"),ae=T("interactive-active","transparent"),kt=T("interactive-selection","transparent"),vt=T("interactive-selection-foreground","inherit"),Io=T("interactive-focus-ring","currentColor"),Z=T("primary","currentColor"),Ot=T("primary-text","inherit"),wt=T("error-text","inherit"),mr=T("font-sans","inherit"),Rt=T("font-mono","monospace"),Co=T("radius","9px"),Ut=`calc(${Co} - 2px)`,Ro=`calc(${Co} - 4px)`,U=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Uo=`box-shadow: 0 0 0 2px ${Io};`,Pe=(e)=>{let r=T(`status-${e}`,"currentColor");return`
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
.oc-sdk { color: ${te}; font-family: ${mr}; }
.oc-sdk :focus-visible { outline: none; ${Uo} }
.oc-sdk-mono { font-family: ${Rt}; }
.oc-sdk-muted { color: ${b}; }
${Pe("success")}${Pe("warning")}${Pe("error")}${Pe("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${Ot}; }

.oc-sdk-btn { border-radius: ${Ut}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ro}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ot}; background: ${U(Z,10,ie)}; border-color: ${U(Z,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(Z,16,ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(Z,22,ie)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${fr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ne}; color: ${Ee}; border-color: ${V}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${H}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${wt}; background: ${U("var(--oc-sdk-tone)",7,ie)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,ie)}; }

.oc-sdk-field-note { color: ${b}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${wt}; }
.oc-sdk-input { border-radius: ${Ut}; background: ${Ne}; color: ${Ee}; box-shadow: inset 0 0 0 1px ${U(V,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${b}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Io}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Rt}; }

.oc-sdk-search-icon { color: ${b}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${Ro}; color: ${b}; }
.oc-sdk-search-clear:hover { background: ${H}; color: ${te}; }

.oc-sdk-trigger { border-color: ${V}; border-radius: ${Ut}; background: ${Ne}; color: ${Ee}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${H}, ${H}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${b}; }
.oc-sdk-trigger-chevron { color: ${b}; }
.oc-sdk-popup { --surface-foreground: ${Ee}; border-color: ${U(V,60)}; border-radius: 12px; background: ${Ne}; color: ${Ee}; box-shadow: 0 8px 24px ${U(te,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${H}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${kt}; color: ${vt}; }
.oc-sdk-option-check { color: ${te}; }
.oc-sdk-option[data-destructive="true"] { color: ${wt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${b}; }
.oc-sdk-popup-empty { color: ${b}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${te}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(te,60,V)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Uo} }
.oc-sdk-check-desc { color: ${b}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(te,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${b}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${te}; }
.oc-sdk-tab[aria-selected="true"] { color: ${vt}; background: ${kt}; border-color: ${V}; }
.oc-sdk-tab-count { color: ${b}; }

.oc-sdk-badge { border-radius: 9999px; background: ${H}; color: ${b}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${H}; }
.oc-sdk-row[aria-selected="true"] { background: ${kt}; color: ${vt}; }
.oc-sdk-row-lead { font-family: ${Rt}; color: ${b}; }
.oc-sdk-row-sub { color: ${b}; }
.oc-sdk-row-meta { color: ${b}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${b}; }

.oc-sdk-empty-body { color: ${b}; }

.oc-sdk-spinner { color: ${b}; }
.oc-sdk-spinner-ring { border-color: ${V}; border-top-color: ${Z}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${b}; }

.oc-sdk-separator { color: ${b}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(V,40)}; }

.oc-sdk-progress-label { color: ${b}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${V}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }

.oc-sdk-text a { color: ${Ot}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(V,60)}; }
`,N=`
${Ze}
${Er}
${Mo}`;var Tr=0,oe=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[u,c]of Object.entries(r))n.setAttribute(u,String(c));return n},Lo=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,u=oe("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),c=`fill-${++Tr}`,E=oe("defs",{}),y=oe("linearGradient",{id:c,x1:0,x2:0,y1:0,y2:1});y.append(oe("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),oe("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),E.append(y);let k=oe("path",{d:"",class:"chart-grid"}),h=oe("path",{d:"",fill:`url(#${c})`}),_=oe("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});u.append(E,k,h,_);let M=document.createElement("div");M.className="chart-cursor";let F=document.createElement("div");F.className="chart-dot",F.style.background=e.color;let K=document.createElement("div");K.className="chart-tip",r.append(u,M,F,K);let C=[],J=1,X=null,Y=null,z=(A,g)=>(e.capacity-g+A)/Math.max(1,e.capacity-1)*300,ee=(A)=>n-1-Math.min(A,J)/J*(n-1-2),ce=()=>{let A=X===null?void 0:C[X];if(X===null||A===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let g=r.getBoundingClientRect(),s=z(X,C.length)/300*g.width,a=ee(A)/n*g.height;M.style.transform=`translateX(${s}px)`,F.style.transform=`translate(${s}px, ${a}px)`;let L=(C.length-1-X)*e.intervalSeconds;K.textContent=`${e.format(A)} · ${L===0?"now":`${L} s ago`}`;let W=s>g.width/2;K.style.left=W?"":`${s+8}px`,K.style.right=W?`${g.width-s+8}px`:""},Q=(A)=>{if(C.length===0)return;let g=r.getBoundingClientRect(),s=(A-g.left)/g.width*(e.capacity-1),a=Math.round(s-(e.capacity-C.length));X=Math.min(C.length-1,Math.max(0,a)),ce()};return r.addEventListener("pointermove",(A)=>{Y=A.clientX,Q(A.clientX)}),r.addEventListener("pointerleave",()=>{Y=null,X=null,ce()}),{element:r,update:(A,g)=>{if(C=A,J=g>0?g:1,k.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),C.length===0)h.setAttribute("d",""),_.setAttribute("d","");else{let s=C.map((se,xe)=>`${z(xe,C.length).toFixed(2)} ${ee(se).toFixed(2)}`),a=C.length===1,L=a?`M${z(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;_.setAttribute("d",L);let W=a?z(0,1)-2:z(0,C.length);h.setAttribute("d",`${L} L300 ${n} L${W.toFixed(2)} ${n} Z`)}if(Y!==null)Q(Y)}}};var I=(e,r="",n="",u=[])=>{let c=document.createElement(e);if(r)c.className=r;if(n)c.textContent=n;if(u.length>0)c.append(...u);return c},fe=(e,r)=>{if(e.textContent!==r)e.textContent=r},Go=(e,r,n,u,c,E=0)=>{let y=new Map;for(let h of r){let _=n(h);for(let F=1;y.has(_);F+=1)_=`${n(h)}\x01${F}`;let M=c.get(_);if(M)M.update(h);y.set(_,M??u(h))}for(let[h,_]of c)if(y.get(h)!==_)_.element.remove();c.clear();let k=E;for(let[h,_]of y){c.set(h,_);let M=e.children[k]??null;if(M!==_.element)e.insertBefore(_.element,M);k+=1}};var Lt=5000,No={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Xe=(e)=>typeof e==="object"&&e!==null,gr=(e)=>Xe(e)&&typeof e.at==="number"&&Xe(e.system)&&Xe(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Xe(e.history),br=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"};var Po=(e,r)=>{let n=I("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(u)=>{u.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},Mt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Do=(e,r,n,u)=>{let c=!1,E=async()=>{if(c||!Mt(r))return;c=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),_;try{_=JSON.parse(h.body)}catch{_=null}if(h.status===200&&gr(_))n(_);else u(h.status===200?"bad-answer":"service-failed")}catch(h){u(br(h))}finally{c=!1}};E(),setInterval(()=>{E()},Lt);let y=Mt(r),k=()=>{let h=Mt(r);if(h&&!y)E();y=h};return document.addEventListener("visibilitychange",k),new ResizeObserver(k).observe(document.documentElement),{refresh:()=>{E()}}};var Gt="en",$o=(e)=>{try{Gt=Intl.NumberFormat.supportedLocalesOf(e)[0]??"en"}catch{Gt="en"}},Ho=(e,r)=>new Intl.NumberFormat(Gt,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),he=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),u=0;while(n>=1024&&u<r.length-1)n/=1024,u+=1;let c=u>=3&&n<100?1:0;return`${Ho(n,c)} ${r[u]}`},Nt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Ho(e,e<10?1:0)}%`};var Be={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var Fo=36;var Xo=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  /* Floats like the app's dropdowns: lit top edge and hairline rings instead of a border. The chart clips,
     so only the rings and the tightest shadow. */
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
  .port { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border: 0; border-radius: 4px; font: 11px var(--oc-mono); cursor: pointer;
    background: color-mix(in srgb, var(--oc-primary) 14%, transparent); color: var(--oc-primary-text, var(--oc-primary)); }
  .port:hover, .port:focus-visible { outline: none; background: color-mix(in srgb, var(--oc-primary) 24%, transparent); }
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
`;var Ve=yt(),_e=document.querySelector("#root");if(!_e)throw Error("Missing #root");var jo=document.createElement("style");jo.textContent=Xo+Bo;document.head.append(jo);var Ko=(e)=>{let r=I("span");return r.style.background=e,r.style.width="0%",{element:I("div","meter","",[r]),set:(n)=>{r.style.width=`${Math.min(100,Math.max(0,n))}%`}}},Wo=Lo({color:Be.app,height:18,capacity:Fo,format:he,intervalSeconds:Lt/1000}),Pt=I("span","value num","–");Pt.title="Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core.";var Jo=Ko(Be.cpu),Yo=I("span","value num","–"),Qo=Ko(Be.memory),Zo=I("span","value num","–"),qo=I("div","ports"),er=I("span","value num"),ze=I("div","line","",[I("span","what","OpenChamber"),Wo.element,Pt]),je=I("div","line","",[I("span","what","CPU"),Jo.element,Yo]),Ke=I("div","line","",[I("span","what","Memory"),Qo.element,Zo]),We=I("div","line","",[I("span","what","Dev servers"),qo,er]);We.hidden=!0;var re=I("div","note","Reading…");_e.append(re,ze,je,Ke,We);for(let e of[ze,je,Ke])e.hidden=!0;var yr=new Map,Ar=(e)=>({element:Po(Ve,e),update:()=>{return}}),kr=(e)=>{let{system:r,app:n}=e,u=e.warnings.includes("processes-unavailable");if(re.hidden=!u,re.className!=="note error")re.className="note error";fe(re,u?"Could not read the process list; showing system totals only.":"");for(let E of[je,Ke])E.hidden=!1;ze.hidden=u,fe(Pt,`${he(n.memory)} · ${Nt(n.cpu)}`),Wo.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),Jo.set(r.cpu??0),fe(Yo,Nt(r.cpu)),Qo.set(r.memoryUsed/Math.max(1,r.memoryTotal)*100),fe(Zo,`${he(r.memoryUsed)} / ${he(r.memoryTotal)}`);let c=[...new Set(e.servers.flatMap((E)=>E.ports))].sort((E,y)=>E-y);We.hidden=c.length===0||u,Go(qo,c.slice(0,6),String,Ar,yr),fe(er,c.length>6?`+${c.length-6}`:"")},Vo=-1;new ResizeObserver(()=>{let e=Math.ceil(_e.getBoundingClientRect().height);if(e===Vo)return;Vo=e,Ve.setHeight(e).catch(()=>{return})}).observe(_e);var zo=!1;Ve.onReady((e)=>{if(At(e,document.documentElement),$o(e.locale),zo)return;zo=!0,Do(Ve,_e,kr,(r)=>{re.hidden=!1,re.className="note error",re.textContent=No[r];for(let n of[ze,je,Ke,We])n.hidden=!0})});})();
