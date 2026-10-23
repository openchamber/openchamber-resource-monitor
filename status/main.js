(()=>{var f="openchamber.sdk",m=1;var Qe=`
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
`;function jt(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(u)=>{let l=u.target===e?r:u.target;if(!(l instanceof Element))return;if(!l.hasAttribute("data-oc-scrolling"))l.setAttribute("data-oc-scrolling","");let E=n.get(l);if(E!==void 0)clearTimeout(E);n.set(l,setTimeout(()=>{n.delete(l),l.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var er=`(${jt.toString()})(document);`;var Ze=128,qe=65536;var ge=128;var be=65536;var Yt=/^[a-z][a-z0-9-]{0,39}$/;var Kt=(e)=>Object(e)===e&&!Array.isArray(e),et=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Wt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Jt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Qt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Kt(n)||!Yt.test(n.id)||!Wt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!et(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!et(n,["kind","id","label","value","options","disabled"]))return!1;if(!Jt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let u=new Set;for(let l of n.options){if(!Kt(l)||!et(l,["value","label"])||!Jt(l.value)||!Wt(l.label)||u.has(l.value))return!1;u.add(l.value)}if(!u.has(n.value))return!1}return!0};var Ae=20000000,ye=256;var tt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Zt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var qt=/^[A-Za-z0-9_-]{1,80}$/;var eo=["left","right","top","bottom"];var to=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let l of u)if(!to(l,r+1,n))return!1;return!0},ot=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ot);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ot)}return String(e)===e||Number.isFinite(e)},rt=(e)=>{try{if(String(e.id)!==e.id||!qt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!eo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!to(e.data)||!ot(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ro=["file","directory","other","missing"],st=(e)=>Boolean(e&&"sessionId"in e),it=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var no=/^[0-9a-f]{7,64}$/i,at=(e)=>no.test(e),ke=500,ve=32000,so=16000,io=128,ao=200,co=2000,lo=16000,po=80,uo=200,fo=16000;var mo=2000;var ct=20000,Oe=1024,we=2000000;var Re=64000,Ue=8000,dt=4000;var lt=90000;var Eo=999,ho=1e4,fe=500,_o=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],So=["stopped","starting","ready","failed"],tr=new Set(_o),xo=(e)=>tr.has(e),To=(e)=>e&&xo(e)?e:"HOST_REJECTED",de=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(de);if(Object(e)===e)return Object.values(e).every(de);return!1},go=(e)=>de(e)&&JSON.stringify(e).length<=fo,oo=(e)=>e?.trim().slice(0,uo)??"",le=(e)=>{let r=e.id.trim().slice(0,io),n=e.title.trim().slice(0,ao),u=e.url.trim().slice(0,co),l=e.text?.trim().slice(0,lo),E=e.author?.trim().slice(0,po),C=e.kind==="pull"?"pull":"issue",U={providerId:e.providerId.trim(),id:r,title:n||r,url:u,kind:C};if(l)U.text=l;if(E)U.author=E;if(C==="pull"){let g=oo(e.branches?.head),I=oo(e.branches?.base);if(g&&I)U.branches={head:g,base:I}}if(go(e.data))U.data=e.data;return U},pt=(e)=>{let r=le(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},ut=(e)=>{let r={text:e.text.trim().slice(0,so)};if(e.send)r.send=!0;return r},ft=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Eo,Math.max(0,Math.round(e)))},mt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(ho,Math.max(0,Math.ceil(e)))};var pe=(e)=>e.length>0&&e.length<=Oe&&!e.includes("\x00")&&!e.includes("\\");var Ie=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>mo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},or=new Set(So),Et=(e)=>Boolean(e&&"status"in e&&or.has(String(e.status))&&!("body"in e)),Ce=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ht=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),_t=(e)=>Boolean(e&&"written"in e&&e.written===!0),St=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),rr=new Set(ro),xt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&rr.has(String(e.kind))&&Number.isFinite(e.size)),Tt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),nr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),sr=(e)=>Object(e)===e?e:null,nt=(e)=>String(e)===e&&e.length>0,ir=(e)=>{if(!nt(e.id))return null;if(e.ok===!0){let r={channel:f,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&nt(e.error))return{channel:f,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:To(nt(e.code)?e.code:void 0)};return null},gt=(e)=>{let r=sr(e);if(!r||r.channel!==f||r.v!==m)return null;if(r.type==="result")return ir(r);if(!nr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var bo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ar=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Ao=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Me=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Oe} characters without NUL or backslash.`)),Le=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},p=(e)=>(e.value+=1,`oc-${e.value}`),bt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),u=e.requestTimeoutMs??ct,l=new Set,E=new Set,C=new Set,U=new Set,g=new Set,I=new Set,K=new Set,W=new Set,z=new Set,R=null,J=null,H=new Set,Y=new Set,B=null,ee=null,ce=!1,Q=new Map,re=new Map,b=new Map,x=!1,s={value:0},a=null,M=null,j=!1,ne=!1,_e=null,Nt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},F=(t)=>{r.parent.postMessage(t,"*")},v=(t,o)=>{for(let i of t)try{i(o)}catch(c){console.error(c)}},Pt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=gt(t.data);if(!o)return;if(o.type==="workspace"){let c=re.get(o.payload.subscriptionId);if(c)v([c],o.payload.snapshot);return}if(o.type==="shells"){let c=b.get(o.payload.subscriptionId);if(c)v([c],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,M=Nt(o.payload.session),v(l,o.payload),v(E,o.payload.directory),v(C,o.payload.session),M)v(U,M);v(g,o.payload.connection),v(I,o.payload.settings),v(K,o.payload.item);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};v(E,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)M=null;else if(M?.sessionId!==o.payload.session.id)M=Nt(o.payload.session);v(C,o.payload.session);return}if(o.type==="session-lifecycle"){M=o.payload,v(U,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};v(g,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};v(I,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};v(K,o.payload.item);return}if(o.type==="status-control-event"){v(W,o.payload);return}if(o.type==="popover-closed"){v(z,o.payload);return}if(o.type==="action"){let c=(h)=>{if(!x)F({channel:f,v:m,type:"action-result",id:o.id,payload:h})},_=J;if(!_){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>_(o.payload)).then(()=>c({ok:!0}),(h)=>{let k=(h instanceof Error?h.message:String(h)).trim();c({ok:!1,error:(k||"Action failed.").slice(0,fe)})});return}if(o.type==="file-open"){let c=o.payload;if(ee&&Zt(ee,c))return;ee=c,v(H,o.payload);return}if(o.type==="file-saved"){v(Y,o.payload.version);return}if(o.type==="file-snapshot"){let c=(k)=>{if(!x)F({channel:f,v:m,type:"file-snapshot-result",id:o.id,payload:k})},_=(k)=>c({error:(k.trim()||"Could not read the edited file.").slice(0,fe)}),h=B;if(!h){_("This extension does not edit files.");return}Promise.resolve().then(()=>h(o.payload.purpose)).then((k)=>{if(tt(k)>Ae){_(`The file is over ${Ae} ${"bytes"in k?"bytes":"characters"}.`);return}if(k.version.length>ye){_(`The snapshot version is over ${ye} characters.`);return}c({snapshot:"bytes"in k?{bytes:k.bytes,version:k.version}:{content:k.content,version:k.version}})},(k)=>_(k instanceof Error?k.message:String(k)));return}if(o.type==="resolve"){let c=(h)=>{F({channel:f,v:m,type:"resolve-result",id:o.id,payload:h})},_=R;if(!_){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>_(o.payload)).then((h)=>c({item:h?le(h):null}),(h)=>{let k=(h instanceof Error?h.message:String(h)).trim();c({error:(k||"Command failed.").slice(0,fe)})});return}let i=Q.get(o.id);if(!i)return;if(clearTimeout(i.timer),Q.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new d(o.code,o.error))};r.addEventListener("message",Pt),F({channel:f,v:m,type:"hello"});let L=(t,o=u)=>{if(x||r.parent===r)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let _=setTimeout(()=>{Q.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},o);Q.set(t.id,{resolve:i,reject:c,timer:_}),F(t)})},A=(t)=>L(t).then(()=>{return}),y={channel:f,v:m},We=(t)=>{if(!x&&r.parent!==r)F(t)},Dt=()=>We({...y,type:"file-save"}),$t=(t)=>{if(!bo(t)||!ar(t))return;t.preventDefault(),Dt()},Ht=(t)=>{if(!bo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),Vt(a.popover.id,"escape").catch(()=>{return})},Se=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=j||ne;if(_e===o)return;_e=o,zt(t.id,o).catch(()=>{return})},xe=()=>{if(a?.surface!=="popover"||j)return;j=!0,Se()},Ft=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!j)return;j=!1,Se()},Xt=()=>{if(a?.surface!=="popover"||ne)return;ne=!0,Se()},Bt=()=>{if(a?.surface!=="popover"||!ne)return;ne=!1,Se()},V=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new d("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Je=async(t)=>{if(t.kind!=="projects")V(t.projectId);let o=await L({...y,type:"workspace-read",id:p(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return o},Ye=async(t,o)=>{if(t.kind!=="projects")V(t.projectId);let i=p(s);re.set(i,o);try{await A({...y,type:"workspace-subscribe",id:p(s),payload:{subscriptionId:i,query:t}})}catch(c){if(re.delete(i),!x)F({...y,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:i}});throw c}return()=>{if(!re.delete(i)||x)return;F({...y,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:i}})}},qo=async(t,o)=>{if(t.kind==="session")V(t.sessionId);if(t.kind==="project")V(t.projectId);let i=p(s);b.set(i,o);try{await A({...y,type:"shells-subscribe",id:p(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(b.delete(i),!x)F({...y,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:i}});throw c}return()=>{if(!b.delete(i)||x)return;F({...y,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:i}})}},Te=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ze))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!de(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>qe)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let o=await L({...y,type:"storage",id:p(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return o},Vt=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):A({...y,type:"popover-close",id:p(s),payload:o?{id:t,reason:o}:{id:t}}),zt=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):A({...y,type:"popover-anchor",id:p(s),payload:{id:t,active:o}});return r.addEventListener("keydown",Ht,!0),r.addEventListener("pointerover",xe),r.addEventListener("pointermove",xe),r.addEventListener("pointerout",Ft),r.addEventListener("focus",Xt),r.addEventListener("blur",Bt),{onAction:(t)=>(J=t,()=>{if(J===t)J=null}),listProjects:async()=>{let t=await Je({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Je({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Je({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Ye({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Ye({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>Ye({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>qo(t,o),readShellOutput:async(t,o)=>{V(t,ge);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>be))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${be}.`);let h=await L({...y,type:"shell-output",id:p(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!h||typeof h.output!=="string"||!Number.isFinite(h.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return h},stopShell:async(t)=>{if(V(t,ge),(await L({...y,type:"shell-stop",id:p(s),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{V(t),await A({...y,type:"open-session",id:p(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Le(o),c={op:"get",key:t};if(i)c.scope=i;let _=await Te(c);return _.op==="get"&&_.found?_.value:void 0},set:async(t,o,i)=>{let c=Le(i),_={op:"set",key:t,value:o};if(c)_.scope=c;await Te(_)},delete:async(t,o)=>{let i=Le(o),c={op:"delete",key:t};if(i)c.scope=i;await Te(c)},keys:async(t)=>{let o=Le(t),i={op:"keys"};if(o)i.scope=o;let c=await Te(i);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(l.add(t),a)t(a);return()=>{l.delete(t)}},onDirectory:(t)=>{if(E.add(t),a)t(a.directory);return()=>{E.delete(t)}},onSession:(t)=>{if(C.add(t),a)t(a.session);return()=>{C.delete(t)}},onSessionLifecycle:(t)=>{if(U.add(t),M)t(M);return()=>{U.delete(t)}},onConnection:(t)=>{if(g.add(t),a)t(a.connection);return()=>{g.delete(t)}},onSettings:(t)=>{if(I.add(t),a)t(a.settings);return()=>{I.delete(t)}},onItem:(t)=>{if(K.add(t),a)t(a.item);return()=>{K.delete(t)}},onStatusControl:(t)=>(W.add(t),()=>{W.delete(t)}),onPopoverClosed:(t)=>(z.add(t),()=>{z.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!Qt(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return A({...y,type:"status-controls",id:p(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!rt(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return A({...y,type:"popover-open",id:p(s),payload:t})},closePopover:Vt,setPopoverAnchorActive:zt,onResolve:(t)=>(R=t,()=>{if(R===t)R=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>ke)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${ke} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ve))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${ve} characters.`));return A({channel:f,v:m,type:"toast",id:p(s),payload:{...t,message:o}})},openUrl:(t)=>A({channel:f,v:m,type:"open-url",id:p(s),payload:{url:t}}),openCommit:(t)=>at(t)?A({channel:f,v:m,type:"open-commit",id:p(s),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>A({channel:f,v:m,type:"open-surface",id:p(s),payload:{surfaceId:t}}),writeClipboard:(t)=>A({channel:f,v:m,type:"clipboard-write",id:p(s),payload:{text:t}}),compose:(t)=>A({channel:f,v:m,type:"compose",id:p(s),payload:t}),attach:(t)=>A({channel:f,v:m,type:"attach",id:p(s),payload:le(t)}),startSession:async(t)=>{if(t.projectId!==void 0)V(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")V(o.directory);else{if(o.name!==void 0)V(o.name,200);if(o.baseBranch!==void 0)V(o.baseBranch,200)}let i=await L({channel:f,v:m,type:"start-session",id:p(s),payload:pt(t)},e.requestTimeoutMs??180000);if(!st(i))throw new d("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>L({channel:f,v:m,type:"prompt",id:p(s),payload:ut(t)}).then((o)=>{if(!it(o))throw new d("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>A({channel:f,v:m,type:"session-link",id:p(s),payload:le(t)}),close:()=>A({channel:f,v:m,type:"close",id:p(s)}),oauthStart:()=>A({channel:f,v:m,type:"oauth-start",id:p(s)}),oauthDisconnect:()=>A({channel:f,v:m,type:"oauth-disconnect",id:p(s)}),request:(t)=>(Ie(t.path)?L({channel:f,v:m,type:"request",id:p(s),payload:t}):Ao()).then((o)=>{if(!Ce(o))throw new d("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ie(t.path)?L({channel:f,v:m,type:"service-request",id:p(s),payload:t}):Ao()).then((o)=>{if(!Ce(o))throw new d("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>L({channel:f,v:m,type:"service-status",id:p(s)}).then((t)=>{if(!Et(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(pe(t)?L({channel:f,v:m,type:"file-read",id:p(s),payload:{path:t}}):Me()).then((o)=>{if(!ht(o))throw new d("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!pe(t))return Me();if(o.length>we)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${we} characters.`));return L({channel:f,v:m,type:"file-write",id:p(s),payload:{path:t,content:o}}).then((i)=>{if(!_t(i))throw new d("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(pe(t)?L({channel:f,v:m,type:"file-list",id:p(s),payload:{path:t}}):Me()).then((o)=>{if(!St(o))throw new d("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(pe(t)?L({channel:f,v:m,type:"file-stat",id:p(s),payload:{path:t}}):Me()).then((o)=>{if(!xt(o))throw new d("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Re)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Re} characters.`));if(i!==void 0&&(i.length===0||i.length>Ue))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Ue} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(dt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let _={prompt:o};if(i!==void 0)_.system=i;if(c!==void 0)_.maxOutputTokens=c;return L({channel:f,v:m,type:"generate",id:p(s),payload:_},e.requestTimeoutMs??lt).then((h)=>{if(!Tt(h))throw new d("HOST_REJECTED","Host did not return generated text.");return h})},setBadge:(t)=>A({channel:f,v:m,type:"badge",id:p(s),payload:{count:ft(t)}}),setHeight:(t)=>A({channel:f,v:m,type:"resize",id:p(s),payload:{height:mt(t)}}),onFileOpen:(t)=>{if(H.add(t),!ce)ce=!0,r.addEventListener("keydown",$t,!0);if(ee)t(ee);return()=>{H.delete(t)}},onFileSnapshot:(t)=>(B=t,()=>{if(B===t)B=null}),onFileSaved:(t)=>(Y.add(t),()=>{Y.delete(t)}),reportFileChange:(t)=>We({...y,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Dt,reportFileUnsupported:()=>We({...y,type:"file-unsupported"}),dispose:()=>{for(let t of re.keys())F({...y,type:"workspace-unsubscribe",id:p(s),payload:{subscriptionId:t}});re.clear();for(let t of b.keys())F({...y,type:"shells-unsubscribe",id:p(s),payload:{subscriptionId:t}});if(b.clear(),x=!0,R=null,J=null,B=null,H.clear(),Y.clear(),ce)r.removeEventListener("keydown",$t,!0);r.removeEventListener("message",Pt),r.removeEventListener("keydown",Ht,!0),r.removeEventListener("pointerover",xe),r.removeEventListener("pointermove",xe),r.removeEventListener("pointerout",Ft),r.removeEventListener("focus",Xt),r.removeEventListener("blur",Bt);for(let t of Q.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),l.clear(),E.clear(),C.clear(),U.clear(),g.clear(),I.clear(),K.clear(),W.clear(),z.clear()}}};var yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Xr=new Set(yo);var ko=["none","agent","user"];var Vr=new Set(ko);var cr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],dr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],vo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,u]of cr)r.style.setProperty(n,e.tokens[u]);for(let[n,u,l]of dr){let E=e.tokens[l]??"";r.style.setProperty(n,E),r.style.setProperty(u,E)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},At=(e,r)=>{if(vo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var lr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},S=(e,r)=>`var(--${e}, var(--oc-${lr[e]}, ${r}))`,se=S("surface-background","transparent"),Ge=S("surface-elevated","transparent"),me=S("surface-elevated-foreground","inherit"),te=S("surface-foreground","inherit"),T=S("surface-muted-foreground","gray"),pr=S("surface-muted","transparent"),X=S("interactive-border","currentColor"),D=S("interactive-hover","transparent"),ie=S("interactive-active","transparent"),yt=S("interactive-selection","transparent"),kt=S("interactive-selection-foreground","inherit"),Ro=S("interactive-focus-ring","currentColor"),Z=S("primary","currentColor"),vt=S("primary-text","inherit"),Ot=S("error-text","inherit"),ur=S("font-sans","inherit"),wt=S("font-mono","monospace"),Uo=S("radius","9px"),Rt=`calc(${Uo} - 2px)`,Oo=`calc(${Uo} - 4px)`,O=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,wo=`box-shadow: 0 0 0 2px ${Ro};`,Ne=(e)=>{let r=S(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${S(`${e}-text`,"inherit")}; }`},fr=`
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
`,Io=`
.oc-sdk { color: ${te}; font-family: ${ur}; }
.oc-sdk :focus-visible { outline: none; ${wo} }
.oc-sdk-mono { font-family: ${wt}; }
.oc-sdk-muted { color: ${T}; }
${Ne("success")}${Ne("warning")}${Ne("error")}${Ne("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Z}; --oc-sdk-tone-text: ${vt}; }

.oc-sdk-btn { border-radius: ${Rt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Oo}; }
.oc-sdk-btn[data-variant="default"] { color: ${vt}; background: ${O(Z,10,se)}; border-color: ${O(Z,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${O(Z,16,se)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${O(Z,22,se)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${pr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ie}, ${ie}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ge}; color: ${me}; border-color: ${X}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ie}, ${ie}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${D}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ie}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${S("status-error","red")}; color: ${Ot}; background: ${O("var(--oc-sdk-tone)",7,se)}; border-color: ${O("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${O("var(--oc-sdk-tone)",9,se)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${O("var(--oc-sdk-tone)",11,se)}; }

.oc-sdk-field-note { color: ${T}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ot}; }
.oc-sdk-input { border-radius: ${Rt}; background: ${Ge}; color: ${me}; box-shadow: inset 0 0 0 1px ${O(X,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${T}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Ro}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${S("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${S("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${wt}; }

.oc-sdk-search-icon { color: ${T}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search-clear { border-radius: ${Oo}; color: ${T}; }
.oc-sdk-search-clear:hover { background: ${D}; color: ${te}; }

.oc-sdk-trigger { border-color: ${X}; border-radius: ${Rt}; background: ${Ge}; color: ${me}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${D}, ${D}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ie}, ${ie}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${T}; }
.oc-sdk-trigger-chevron { color: ${T}; }
.oc-sdk-popup { --surface-foreground: ${me}; border-color: ${O(X,60)}; border-radius: 12px; background: ${Ge}; color: ${me}; box-shadow: 0 8px 24px ${O(te,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${D}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${yt}; color: ${kt}; }
.oc-sdk-option-check { color: ${te}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ot}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${O(S("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${T}; }
.oc-sdk-popup-empty { color: ${T}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${X}; border-radius: 4px; color: ${te}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${O(te,60,X)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${X}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${se}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Z}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${wo} }
.oc-sdk-check-desc { color: ${T}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${O(te,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${T}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${te}; }
.oc-sdk-tab[aria-selected="true"] { color: ${kt}; background: ${yt}; border-color: ${X}; }
.oc-sdk-tab-count { color: ${T}; }

.oc-sdk-badge { border-radius: 9999px; background: ${D}; color: ${T}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${O("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${D}; }
.oc-sdk-row[aria-selected="true"] { background: ${yt}; color: ${kt}; }
.oc-sdk-row-lead { font-family: ${wt}; color: ${T}; }
.oc-sdk-row-sub { color: ${T}; }
.oc-sdk-row-meta { color: ${T}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${T}; }

.oc-sdk-empty-body { color: ${T}; }

.oc-sdk-spinner { color: ${T}; }
.oc-sdk-spinner-ring { border-color: ${X}; border-top-color: ${Z}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${O("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${O("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${T}; }

.oc-sdk-separator { color: ${T}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${O(X,40)}; }

.oc-sdk-progress-label { color: ${T}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${X}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Z}); }

.oc-sdk-text a { color: ${vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${O(X,60)}; }
`,G=`
${Qe}
${fr}
${Io}`;var Sr=0,oe=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[u,l]of Object.entries(r))n.setAttribute(u,String(l));return n},Co=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,u=oe("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),l=`fill-${++Sr}`,E=oe("defs",{}),C=oe("linearGradient",{id:l,x1:0,x2:0,y1:0,y2:1});C.append(oe("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),oe("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),E.append(C);let U=oe("path",{d:"",class:"chart-grid"}),g=oe("path",{d:"",fill:`url(#${l})`}),I=oe("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});u.append(E,U,g,I);let K=document.createElement("div");K.className="chart-cursor";let W=document.createElement("div");W.className="chart-dot",W.style.background=e.color;let z=document.createElement("div");z.className="chart-tip",r.append(u,K,W,z);let R=[],J=1,H=null,Y=null,B=(b,x)=>(e.capacity-x+b)/Math.max(1,e.capacity-1)*300,ee=(b)=>n-1-Math.min(b,J)/J*(n-1-2),ce=()=>{let b=H===null?void 0:R[H];if(H===null||b===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let x=r.getBoundingClientRect(),s=B(H,R.length)/300*x.width,a=ee(b)/n*x.height;K.style.transform=`translateX(${s}px)`,W.style.transform=`translate(${s}px, ${a}px)`;let M=(R.length-1-H)*e.intervalSeconds;z.textContent=`${e.format(b)} · ${M===0?"now":`${M} s ago`}`;let j=s>x.width/2;z.style.left=j?"":`${s+8}px`,z.style.right=j?`${x.width-s+8}px`:""},Q=(b)=>{if(R.length===0)return;let x=r.getBoundingClientRect(),s=(b-x.left)/x.width*(e.capacity-1),a=Math.round(s-(e.capacity-R.length));H=Math.min(R.length-1,Math.max(0,a)),ce()};return r.addEventListener("pointermove",(b)=>{Y=b.clientX,Q(b.clientX)}),r.addEventListener("pointerleave",()=>{Y=null,H=null,ce()}),{element:r,update:(b,x)=>{if(R=b,J=x>0?x:1,U.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),R.length===0)g.setAttribute("d",""),I.setAttribute("d","");else{let s=R.map((ne,_e)=>`${B(_e,R.length).toFixed(2)} ${ee(ne).toFixed(2)}`),a=R.length===1,M=a?`M${B(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;I.setAttribute("d",M);let j=a?B(0,1)-2:B(0,R.length);g.setAttribute("d",`${M} L300 ${n} L${j.toFixed(2)} ${n} Z`)}if(Y!==null)Q(Y)}}};var w=(e,r="",n="",u=[])=>{let l=document.createElement(e);if(r)l.className=r;if(n)l.textContent=n;if(u.length>0)l.append(...u);return l};var Mt=2000,Mo={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Fe=(e)=>typeof e==="object"&&e!==null,xr=(e)=>Fe(e)&&typeof e.at==="number"&&Fe(e.system)&&Fe(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Fe(e.history),Tr=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"};var Lo=(e,r)=>{let n=w("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(u)=>{u.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},Ct=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Go=(e,r,n,u)=>{let l=!1,E=async()=>{if(l||!Ct(r))return;l=!0;try{let g=await e.serviceRequest({method:"GET",path:"/snapshot"}),I;try{I=JSON.parse(g.body)}catch{I=null}if(g.status===200&&xr(I))n(I);else u(g.status===200?"bad-answer":"service-failed")}catch(g){u(Tr(g))}finally{l=!1}};E(),setInterval(()=>{E()},Mt);let C=Ct(r),U=()=>{let g=Ct(r);if(g&&!C)E();C=g};return document.addEventListener("visibilitychange",U),new ResizeObserver(U).observe(document.documentElement),{refresh:()=>{E()}}};var No="en",Po=(e)=>{No=e||"en"},Do=(e,r)=>new Intl.NumberFormat(No,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),Ee=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),u=0;while(n>=1024&&u<r.length-1)n/=1024,u+=1;let l=u>=3&&n<100?1:0;return`${Do(n,l)} ${r[u]}`},Lt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Do(e,e<10?1:0)}%`};var Xe={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var $o=90;var Ho=`
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
`;var Fo=`
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .ports { display: flex; flex-wrap: wrap; gap: 4px; min-width: 0; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;var Be=bt(),he=document.querySelector("#root");if(!he)throw Error("Missing #root");var Vo=document.createElement("style");Vo.textContent=Ho+Fo;document.head.append(Vo);var zo=(e)=>{let r=w("span");return r.style.background=e,r.style.width="0%",{element:w("div","meter","",[r]),set:(n)=>{r.style.width=`${Math.min(100,Math.max(0,n))}%`}}},jo=Co({color:Xe.app,height:18,capacity:$o,format:Ee,intervalSeconds:Mt/1000}),Gt=w("span","value num","–"),Ko=zo(Xe.cpu),Wo=w("span","value num","–"),Jo=zo(Xe.memory),Yo=w("span","value num","–"),Qo=w("div","ports"),Zo=w("span","value num"),Ve=w("div","line","",[w("span","what","OpenChamber"),jo.element,Gt]),ze=w("div","line","",[w("span","what","CPU"),Ko.element,Wo]),je=w("div","line","",[w("span","what","Memory"),Jo.element,Yo]),Ke=w("div","line","",[w("span","what","Dev servers"),Qo,Zo]);Ke.hidden=!0;var ae=w("div","note","Reading…");he.append(ae,Ve,ze,je,Ke);for(let e of[Ve,ze,je])e.hidden=!0;var gr=(e)=>{let{system:r,app:n}=e,u=e.warnings.includes("processes-unavailable");ae.hidden=!u,ae.className="note error",ae.textContent=u?"Could not read the process list; showing system totals only.":"";for(let E of[ze,je])E.hidden=!1;Ve.hidden=u,Gt.textContent=`${Ee(n.memory)} · ${Lt(n.cpu)}`,Gt.title="Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core.",jo.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),Ko.set(r.cpu??0),Wo.textContent=Lt(r.cpu),Jo.set(r.memoryUsed/Math.max(1,r.memoryTotal)*100),Yo.textContent=`${Ee(r.memoryUsed)} / ${Ee(r.memoryTotal)}`;let l=[...new Set(e.servers.flatMap((E)=>E.ports))].sort((E,C)=>E-C);Ke.hidden=l.length===0||u,Qo.replaceChildren(...l.slice(0,6).map((E)=>Lo(Be,E))),Zo.textContent=l.length>6?`+${l.length-6}`:""},Xo=-1;new ResizeObserver(()=>{let e=Math.ceil(he.getBoundingClientRect().height);if(e===Xo)return;Xo=e,Be.setHeight(e).catch(()=>{return})}).observe(he);var Bo=!1;Be.onReady((e)=>{if(At(e,document.documentElement),Po(e.locale),Bo)return;Bo=!0,Go(Be,he,gr,(r)=>{ae.hidden=!1,ae.className="note error",ae.textContent=Mo[r];for(let n of[Ve,ze,je,Ke])n.hidden=!0})});})();
