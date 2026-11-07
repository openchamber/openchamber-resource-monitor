(()=>{var g="openchamber.sdk",x=1;var dt=`
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
`;function To(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let i=s.target===e?o:s.target;if(!(i instanceof Element))return;if(!i.hasAttribute("data-oc-scrolling"))i.setAttribute("data-oc-scrolling","");let a=n.get(i);if(a!==void 0)clearTimeout(a);n.set(i,setTimeout(()=>{n.delete(i),i.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var $r=`(${To.toString()})(document);`;var lt=128,pt=65536;var Ue=128;var Ce=65536;var yo=/^[a-z][a-z0-9-]{0,39}$/;var go=(e)=>Object(e)===e&&!Array.isArray(e),ut=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),xo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,bo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Ao=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!go(n)||!yo.test(n.id)||!xo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!ut(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ut(n,["kind","id","label","value","options","disabled"]))return!1;if(!bo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let i of n.options){if(!go(i)||!ut(i,["value","label"])||!bo(i.value)||!xo(i.label)||s.has(i.value))return!1;s.add(i.value)}if(!s.has(n.value))return!1}return!0};var Le=20000000,Me=256;var mt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,vo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var ko=/^[A-Za-z0-9_-]{1,80}$/;var wo=["left","right","top","bottom"];var Oo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let i of s)if(!Oo(i,o+1,n))return!1;return!0},ft=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ft);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ft)}return String(e)===e||Number.isFinite(e)},Et=(e)=>{try{if(String(e.id)!==e.id||!ko.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!wo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Oo(e.data)||!ft(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Io=["file","directory","other","missing"],St=(e)=>Boolean(e&&"sessionId"in e),_t=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Uo=/^[0-9a-f]{7,64}$/i,Tt=(e)=>Uo.test(e),Ge=500,Pe=32000,Co=16000,Lo=128,Mo=200,Go=2000,Po=16000,No=80,Do=200,$o=16000;var Ho=2000;var gt=20000,Ne=1024,De=2000000;var $e=64000,He=8000,xt=4000;var bt=90000;var Fo=999,Xo=1e4,ge=500,Bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Vo=["stopped","starting","ready","failed"],Hr=new Set(Bo),jo=(e)=>Hr.has(e),zo=(e)=>e&&jo(e)?e:"HOST_REJECTED",me=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(me);if(Object(e)===e)return Object.values(e).every(me);return!1},Ko=(e)=>me(e)&&JSON.stringify(e).length<=$o,Ro=(e)=>e?.trim().slice(0,Do)??"",fe=(e)=>{let o=e.id.trim().slice(0,Lo),n=e.title.trim().slice(0,Mo),s=e.url.trim().slice(0,Go),i=e.text?.trim().slice(0,Po),a=e.author?.trim().slice(0,No),d=e.kind==="pull"?"pull":"issue",h={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:d};if(i)h.text=i;if(a)h.author=a;if(d==="pull"){let E=Ro(e.branches?.head),_=Ro(e.branches?.base);if(E&&_)h.branches={head:E,base:_}}if(Ko(e.data))h.data=e.data;return h},yt=(e)=>{let o=fe(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},At=(e)=>{let o={text:e.text.trim().slice(0,Co)};if(e.send)o.send=!0;return o},vt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Fo,Math.max(0,Math.round(e)))},kt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Xo,Math.max(0,Math.ceil(e)))};var Ee=(e)=>e.length>0&&e.length<=Ne&&!e.includes("\x00")&&!e.includes("\\");var Fe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ho)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Fr=new Set(Vo),wt=(e)=>Boolean(e&&"status"in e&&Fr.has(String(e.status))&&!("body"in e)),Xe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Ot=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Rt=(e)=>Boolean(e&&"written"in e&&e.written===!0),It=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Xr=new Set(Io),Ut=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Xr.has(String(e.kind))&&Number.isFinite(e.size)),Ct=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Br=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),Vr=(e)=>Object(e)===e?e:null,ht=(e)=>String(e)===e&&e.length>0,jr=(e)=>{if(!ht(e.id))return null;if(e.ok===!0){let o={channel:g,v:x,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&ht(e.error))return{channel:g,v:x,type:"result",id:e.id,ok:!1,error:e.error,code:zo(ht(e.code)?e.code:void 0)};return null},Lt=(e)=>{let o=Vr(e);if(!o||o.channel!==g||o.v!==x)return null;if(o.type==="result")return jr(o);if(!Br.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Wo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),zr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class f extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Jo=()=>Promise.reject(new f("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Be=()=>Promise.reject(new f("BAD_PATH",`File path must be 1 to ${Ne} characters without NUL or backslash.`)),Ve=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new f("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},S=(e)=>(e.value+=1,`oc-${e.value}`),Mt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new f("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??gt,i=new Set,a=new Set,d=new Set,h=new Set,E=new Set,_=new Set,w=new Set,I=new Set,b=new Set,T=null,N=null,D=new Set,Q=new Set,W=null,oe=null,ue=!1,Z=new Map,ae=new Map,U=new Map,k=!1,l={value:0},u=null,H=null,Y=!1,ce=!1,we=null,co=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},z=(t)=>{o.parent.postMessage(t,"*")},G=(t,r)=>{for(let p of t)try{p(r)}catch(m){console.error(m)}},lo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Lt(t.data);if(!r)return;if(r.type==="workspace"){let m=ae.get(r.payload.subscriptionId);if(m)G([m],r.payload.snapshot);return}if(r.type==="shells"){let m=U.get(r.payload.subscriptionId);if(m)G([m],r.payload.snapshot);return}if(r.type==="ready"){if(u=r.payload,H=co(r.payload.session),G(i,r.payload),G(a,r.payload.directory),G(d,r.payload.session),H)G(h,H);G(E,r.payload.connection),G(_,r.payload.settings),G(w,r.payload.item);return}if(r.type==="directory"){if(u)u={...u,directory:r.payload.directory};G(a,r.payload.directory);return}if(r.type==="session"){if(u)u={...u,session:r.payload.session};if(!r.payload.session)H=null;else if(H?.sessionId!==r.payload.session.id)H=co(r.payload.session);G(d,r.payload.session);return}if(r.type==="session-lifecycle"){H=r.payload,G(h,r.payload);return}if(r.type==="connection"){if(u)u={...u,connection:r.payload.connection};G(E,r.payload.connection);return}if(r.type==="settings"){if(u)u={...u,settings:r.payload.settings};G(_,r.payload.settings);return}if(r.type==="item"){if(u)u={...u,item:r.payload.item};G(w,r.payload.item);return}if(r.type==="status-control-event"){G(I,r.payload);return}if(r.type==="popover-closed"){G(b,r.payload);return}if(r.type==="action"){let m=(y)=>{if(!k)z({channel:g,v:x,type:"action-result",id:r.id,payload:y})},A=N;if(!A){m({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>A(r.payload)).then(()=>m({ok:!0}),(y)=>{let M=(y instanceof Error?y.message:String(y)).trim();m({ok:!1,error:(M||"Action failed.").slice(0,ge)})});return}if(r.type==="file-open"){let m=r.payload;if(oe&&vo(oe,m))return;oe=m,G(D,r.payload);return}if(r.type==="file-saved"){G(Q,r.payload.version);return}if(r.type==="file-snapshot"){let m=(M)=>{if(!k)z({channel:g,v:x,type:"file-snapshot-result",id:r.id,payload:M})},A=(M)=>m({error:(M.trim()||"Could not read the edited file.").slice(0,ge)}),y=W;if(!y){A("This extension does not edit files.");return}Promise.resolve().then(()=>y(r.payload.purpose)).then((M)=>{if(mt(M)>Le){A(`The file is over ${Le} ${"bytes"in M?"bytes":"characters"}.`);return}if(M.version.length>Me){A(`The snapshot version is over ${Me} characters.`);return}m({snapshot:"bytes"in M?{bytes:M.bytes,version:M.version}:{content:M.content,version:M.version}})},(M)=>A(M instanceof Error?M.message:String(M)));return}if(r.type==="resolve"){let m=(y)=>{z({channel:g,v:x,type:"resolve-result",id:r.id,payload:y})},A=T;if(!A){m({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>A(r.payload)).then((y)=>m({item:y?fe(y):null}),(y)=>{let M=(y instanceof Error?y.message:String(y)).trim();m({error:(M||"Command failed.").slice(0,ge)})});return}let p=Z.get(r.id);if(!p)return;if(clearTimeout(p.timer),Z.delete(r.id),r.ok){p.resolve(r.payload);return}p.reject(new f(r.code,r.error))};o.addEventListener("message",lo),z({channel:g,v:x,type:"hello"});let F=(t,r=s)=>{if(k||o.parent===o)return Promise.reject(new f("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((p,m)=>{let A=setTimeout(()=>{Z.delete(t.id),m(new f("HOST_TIMEOUT","Host did not answer in time."))},r);Z.set(t.id,{resolve:p,reject:m,timer:A}),z(t)})},C=(t)=>F(t).then(()=>{return}),L={channel:g,v:x},it=(t)=>{if(!k&&o.parent!==o)z(t)},po=()=>it({...L,type:"file-save"}),uo=(t)=>{if(!Wo(t)||!zr(t))return;t.preventDefault(),po()},mo=(t)=>{if(!Wo(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover)return;t.preventDefault(),So(u.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let r=Y||ce;if(we===r)return;we=r,_o(t.id,r).catch(()=>{return})},Re=()=>{if(u?.surface!=="popover"||Y)return;Y=!0,Oe()},fo=(t)=>{if(u?.surface!=="popover"||t.relatedTarget!==null||!Y)return;Y=!1,Oe()},Eo=()=>{if(u?.surface!=="popover"||ce)return;ce=!0,Oe()},ho=()=>{if(u?.surface!=="popover"||!ce)return;ce=!1,Oe()},J=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new f("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},at=async(t)=>{if(t.kind!=="projects")J(t.projectId);let r=await F({...L,type:"workspace-read",id:S(l),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new f("HOST_REJECTED","Host did not return workspace data.");return r},ct=async(t,r)=>{if(t.kind!=="projects")J(t.projectId);let p=S(l);ae.set(p,r);try{await C({...L,type:"workspace-subscribe",id:S(l),payload:{subscriptionId:p,query:t}})}catch(m){if(ae.delete(p),!k)z({...L,type:"workspace-unsubscribe",id:S(l),payload:{subscriptionId:p}});throw m}return()=>{if(!ae.delete(p)||k)return;z({...L,type:"workspace-unsubscribe",id:S(l),payload:{subscriptionId:p}})}},Dr=async(t,r)=>{if(t.kind==="session")J(t.sessionId);if(t.kind==="project")J(t.projectId);let p=S(l);U.set(p,r);try{await C({...L,type:"shells-subscribe",id:S(l),payload:{subscriptionId:p,scope:t}})}catch(m){if(U.delete(p),!k)z({...L,type:"shells-unsubscribe",id:S(l),payload:{subscriptionId:p}});throw m}return()=>{if(!U.delete(p)||k)return;z({...L,type:"shells-unsubscribe",id:S(l),payload:{subscriptionId:p}})}},Ie=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>lt))throw new f("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!me(t.value))throw new f("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>pt)throw new f("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new f("UNSUPPORTED","This host does not support device storage.");let r=await F({...L,type:"storage",id:S(l),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new f("HOST_REJECTED","Host did not return storage data.");return r},So=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new f("UNSUPPORTED","This host does not support popovers.")):C({...L,type:"popover-close",id:S(l),payload:r?{id:t,reason:r}:{id:t}}),_o=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new f("UNSUPPORTED","This host does not support popovers.")):C({...L,type:"popover-anchor",id:S(l),payload:{id:t,active:r}});return o.addEventListener("keydown",mo,!0),o.addEventListener("pointerover",Re),o.addEventListener("pointermove",Re),o.addEventListener("pointerout",fo),o.addEventListener("focus",Eo),o.addEventListener("blur",ho),{onAction:(t)=>(N=t,()=>{if(N===t)N=null}),listProjects:async()=>{let t=await at({kind:"projects"});if(t.kind!=="projects")throw new f("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await at({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new f("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await at({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new f("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>ct({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>ct({kind:"worktrees",projectId:t},(p)=>{if(p.kind==="worktrees")r(p)}),onSessions:(t,r)=>ct({kind:"sessions",projectId:t},(p)=>{if(p.kind==="sessions")r(p)}),onRunningShells:(t,r)=>Dr(t,r),readShellOutput:async(t,r)=>{J(t,Ue);let p=r?.cursor;if(p!==void 0&&(!Number.isInteger(p)||p<0))throw new f("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let m=r?.tailBytes;if(m!==void 0&&(!Number.isInteger(m)||m<1||m>Ce))throw new f("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ce}.`);let y=await F({...L,type:"shell-output",id:S(l),payload:{shellId:t,cursor:p,tailBytes:m}});if(!y||typeof y.output!=="string"||!Number.isFinite(y.cursor))throw new f("HOST_REJECTED","Host did not return shell output.");return y},stopShell:async(t)=>{if(J(t,Ue),(await F({...L,type:"shell-stop",id:S(l),payload:{shellId:t}}))?.stopped!==!0)throw new f("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{J(t),await C({...L,type:"open-session",id:S(l),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let p=Ve(r),m={op:"get",key:t};if(p)m.scope=p;let A=await Ie(m);return A.op==="get"&&A.found?A.value:void 0},set:async(t,r,p)=>{let m=Ve(p),A={op:"set",key:t,value:r};if(m)A.scope=m;await Ie(A)},delete:async(t,r)=>{let p=Ve(r),m={op:"delete",key:t};if(p)m.scope=p;await Ie(m)},keys:async(t)=>{let r=Ve(t),p={op:"keys"};if(r)p.scope=r;let m=await Ie(p);if(m.op!=="keys")throw new f("HOST_REJECTED","Expected storage keys.");return m.keys}},onReady:(t)=>{if(i.add(t),u)t(u);return()=>{i.delete(t)}},onDirectory:(t)=>{if(a.add(t),u)t(u.directory);return()=>{a.delete(t)}},onSession:(t)=>{if(d.add(t),u)t(u.session);return()=>{d.delete(t)}},onSessionLifecycle:(t)=>{if(h.add(t),H)t(H);return()=>{h.delete(t)}},onConnection:(t)=>{if(E.add(t),u)t(u.connection);return()=>{E.delete(t)}},onSettings:(t)=>{if(_.add(t),u)t(u.settings);return()=>{_.delete(t)}},onItem:(t)=>{if(w.add(t),u)t(u.item);return()=>{w.delete(t)}},onStatusControl:(t)=>(I.add(t),()=>{I.delete(t)}),onPopoverClosed:(t)=>(b.add(t),()=>{b.delete(t)}),setStatusControls:(t)=>{if(u?.features?.statusControls!==!0)return Promise.reject(new f("UNSUPPORTED","This host does not support status controls."));if(!Ao(t))return Promise.reject(new f("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return C({...L,type:"status-controls",id:S(l),payload:{controls:t}})},openPopover:(t)=>{if(u?.features?.popovers!==!0)return Promise.reject(new f("UNSUPPORTED","This host does not support popovers."));if(!Et(t))return Promise.reject(new f("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return C({...L,type:"popover-open",id:S(l),payload:t})},closePopover:So,setPopoverAnchorActive:_o,onResolve:(t)=>(T=t,()=>{if(T===t)T=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Ge)return Promise.reject(new f("HOST_REJECTED",`Toast message must contain 1 to ${Ge} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Pe))return Promise.reject(new f("HOST_REJECTED",`Toast copy text must contain 1 to ${Pe} characters.`));return C({channel:g,v:x,type:"toast",id:S(l),payload:{...t,message:r}})},openUrl:(t)=>C({channel:g,v:x,type:"open-url",id:S(l),payload:{url:t}}),openCommit:(t)=>Tt(t)?C({channel:g,v:x,type:"open-commit",id:S(l),payload:{sha:t}}):Promise.reject(new f("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>C({channel:g,v:x,type:"open-surface",id:S(l),payload:{surfaceId:t}}),writeClipboard:(t)=>C({channel:g,v:x,type:"clipboard-write",id:S(l),payload:{text:t}}),compose:(t)=>C({channel:g,v:x,type:"compose",id:S(l),payload:t}),attach:(t)=>C({channel:g,v:x,type:"attach",id:S(l),payload:fe(t)}),startSession:async(t)=>{if(t.projectId!==void 0)J(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")J(r.directory);else{if(r.name!==void 0)J(r.name,200);if(r.baseBranch!==void 0)J(r.baseBranch,200)}let p=await F({channel:g,v:x,type:"start-session",id:S(l),payload:yt(t)},e.requestTimeoutMs??180000);if(!St(p))throw new f("HOST_REJECTED","Host did not return a session.");return p},prompt:(t)=>F({channel:g,v:x,type:"prompt",id:S(l),payload:At(t)}).then((r)=>{if(!_t(r))throw new f("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>C({channel:g,v:x,type:"session-link",id:S(l),payload:fe(t)}),close:()=>C({channel:g,v:x,type:"close",id:S(l)}),oauthStart:()=>C({channel:g,v:x,type:"oauth-start",id:S(l)}),oauthDisconnect:()=>C({channel:g,v:x,type:"oauth-disconnect",id:S(l)}),request:(t)=>(Fe(t.path)?F({channel:g,v:x,type:"request",id:S(l),payload:t}):Jo()).then((r)=>{if(!Xe(r))throw new f("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Fe(t.path)?F({channel:g,v:x,type:"service-request",id:S(l),payload:t}):Jo()).then((r)=>{if(!Xe(r))throw new f("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>F({channel:g,v:x,type:"service-status",id:S(l)}).then((t)=>{if(!wt(t))throw new f("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Ee(t)?F({channel:g,v:x,type:"file-read",id:S(l),payload:{path:t}}):Be()).then((r)=>{if(!Ot(r))throw new f("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!Ee(t))return Be();if(r.length>De)return Promise.reject(new f("FILE_TOO_LARGE",`Content is over ${De} characters.`));return F({channel:g,v:x,type:"file-write",id:S(l),payload:{path:t,content:r}}).then((p)=>{if(!Rt(p))throw new f("HOST_REJECTED","Host did not confirm the write.");return p})},listDir:(t)=>(Ee(t)?F({channel:g,v:x,type:"file-list",id:S(l),payload:{path:t}}):Be()).then((r)=>{if(!It(r))throw new f("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(Ee(t)?F({channel:g,v:x,type:"file-stat",id:S(l),payload:{path:t}}):Be()).then((r)=>{if(!Ut(r))throw new f("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),p=t.system?.trim();if(r.length===0||r.length>$e)return Promise.reject(new f("HOST_REJECTED",`Prompt must be 1 to ${$e} characters.`));if(p!==void 0&&(p.length===0||p.length>He))return Promise.reject(new f("HOST_REJECTED",`System prompt must be 1 to ${He} characters.`));let m=t.maxOutputTokens===void 0?void 0:Math.min(xt,Math.max(1,Math.floor(t.maxOutputTokens)));if(m!==void 0&&!Number.isFinite(m))return Promise.reject(new f("HOST_REJECTED","maxOutputTokens must be a number."));let A={prompt:r};if(p!==void 0)A.system=p;if(m!==void 0)A.maxOutputTokens=m;return F({channel:g,v:x,type:"generate",id:S(l),payload:A},e.requestTimeoutMs??bt).then((y)=>{if(!Ct(y))throw new f("HOST_REJECTED","Host did not return generated text.");return y})},setBadge:(t)=>C({channel:g,v:x,type:"badge",id:S(l),payload:{count:vt(t)}}),setHeight:(t)=>C({channel:g,v:x,type:"resize",id:S(l),payload:{height:kt(t)}}),onFileOpen:(t)=>{if(D.add(t),!ue)ue=!0,o.addEventListener("keydown",uo,!0);if(oe)t(oe);return()=>{D.delete(t)}},onFileSnapshot:(t)=>(W=t,()=>{if(W===t)W=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>it({...L,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:po,reportFileUnsupported:()=>it({...L,type:"file-unsupported"}),dispose:()=>{for(let t of ae.keys())z({...L,type:"workspace-unsubscribe",id:S(l),payload:{subscriptionId:t}});ae.clear();for(let t of U.keys())z({...L,type:"shells-unsubscribe",id:S(l),payload:{subscriptionId:t}});if(U.clear(),k=!0,T=null,N=null,W=null,D.clear(),Q.clear(),ue)o.removeEventListener("keydown",uo,!0);o.removeEventListener("message",lo),o.removeEventListener("keydown",mo,!0),o.removeEventListener("pointerover",Re),o.removeEventListener("pointermove",Re),o.removeEventListener("pointerout",fo),o.removeEventListener("focus",Eo),o.removeEventListener("blur",ho);for(let t of Z.values())clearTimeout(t.timer),t.reject(new f("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),i.clear(),a.clear(),d.clear(),h.clear(),E.clear(),_.clear(),w.clear(),I.clear(),b.clear()}}};var Yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var ss=new Set(Yo);var Qo=["none","agent","user"];var as=new Set(Qo);var Kr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Wr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Zo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Kr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,i]of Wr){let a=e.tokens[i]??"";o.style.setProperty(n,a),o.style.setProperty(s,a)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Gt=(e,o)=>{if(Zo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Jr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},v=(e,o)=>`var(--${e}, var(--oc-${Jr[e]}, ${o}))`,de=v("surface-background","transparent"),je=v("surface-elevated","transparent"),xe=v("surface-elevated-foreground","inherit"),re=v("surface-foreground","inherit"),O=v("surface-muted-foreground","gray"),Yr=v("surface-muted","transparent"),K=v("interactive-border","currentColor"),j=v("interactive-hover","transparent"),le=v("interactive-active","transparent"),Pt=v("interactive-selection","transparent"),Nt=v("interactive-selection-foreground","inherit"),tr=v("interactive-focus-ring","currentColor"),q=v("primary","currentColor"),Dt=v("primary-text","inherit"),$t=v("error-text","inherit"),Qr=v("font-sans","inherit"),Ht=v("font-mono","monospace"),or=v("radius","9px"),Ft=`calc(${or} - 2px)`,qo=`calc(${or} - 4px)`,P=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,er=`box-shadow: 0 0 0 2px ${tr};`,ze=(e)=>{let o=v(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${v(`${e}-text`,"inherit")}; }`},Zr=`
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
`,rr=`
.oc-sdk { color: ${re}; font-family: ${Qr}; }
.oc-sdk :focus-visible { outline: none; ${er} }
.oc-sdk-mono { font-family: ${Ht}; }
.oc-sdk-muted { color: ${O}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${Dt}; }

.oc-sdk-btn { border-radius: ${Ft}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${qo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Dt}; background: ${P(q,10,de)}; border-color: ${P(q,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${P(q,16,de)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${P(q,22,de)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Yr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="outline"] { background: ${je}; color: ${xe}; border-color: ${K}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${le}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error","red")}; color: ${$t}; background: ${P("var(--oc-sdk-tone)",7,de)}; border-color: ${P("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${P("var(--oc-sdk-tone)",9,de)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${P("var(--oc-sdk-tone)",11,de)}; }

.oc-sdk-field-note { color: ${O}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${$t}; }
.oc-sdk-input { border-radius: ${Ft}; background: ${je}; color: ${xe}; box-shadow: inset 0 0 0 1px ${P(K,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${O}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${tr}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${v("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${v("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Ht}; }

.oc-sdk-search-icon { color: ${O}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${qo}; color: ${O}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${re}; }

.oc-sdk-trigger { border-color: ${K}; border-radius: ${Ft}; background: ${je}; color: ${xe}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${O}; }
.oc-sdk-trigger-chevron { color: ${O}; }
.oc-sdk-popup { --surface-foreground: ${xe}; border-color: ${P(K,60)}; border-radius: 12px; background: ${je}; color: ${xe}; box-shadow: 0 8px 24px ${P(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Pt}; color: ${Nt}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${$t}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${P(v("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${O}; }
.oc-sdk-popup-empty { color: ${O}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${K}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${P(re,60,K)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${K}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${de}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${er} }
.oc-sdk-check-desc { color: ${O}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${P(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${O}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Nt}; background: ${Pt}; border-color: ${K}; }
.oc-sdk-tab-count { color: ${O}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${O}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${P("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${Pt}; color: ${Nt}; }
.oc-sdk-row-lead { font-family: ${Ht}; color: ${O}; }
.oc-sdk-row-sub { color: ${O}; }
.oc-sdk-row-meta { color: ${O}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${O}; }

.oc-sdk-empty-body { color: ${O}; }

.oc-sdk-spinner { color: ${O}; }
.oc-sdk-spinner-ring { border-color: ${K}; border-top-color: ${q}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${P("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${P("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${O}; }

.oc-sdk-separator { color: ${O}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${P(K,40)}; }

.oc-sdk-progress-label { color: ${O}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${K}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }

.oc-sdk-text a { color: ${Dt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${P(K,60)}; }
`,X=`
${dt}
${Zr}
${rr}`;var rn=0,ne=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[s,i]of Object.entries(o))n.setAttribute(s,String(i));return n},Vt=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,s=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),i=`fill-${++rn}`,a=ne("defs",{}),d=ne("linearGradient",{id:i,x1:0,x2:0,y1:0,y2:1});d.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),a.append(d);let h=ne("path",{d:"",class:"chart-grid"}),E=ne("path",{d:"",fill:`url(#${i})`}),_=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});s.append(a,h,E,_);let w=document.createElement("div");w.className="chart-cursor";let I=document.createElement("div");I.className="chart-dot",I.style.background=e.color;let b=document.createElement("div");b.className="chart-tip",o.append(s,w,I,b);let T=[],N=1,D=null,Q=null,W=(U,k)=>(e.capacity-k+U)/Math.max(1,e.capacity-1)*300,oe=(U)=>n-1-Math.min(U,N)/N*(n-1-2),ue=()=>{let U=D===null?void 0:T[D];if(D===null||U===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let k=o.getBoundingClientRect(),l=W(D,T.length)/300*k.width,u=oe(U)/n*k.height;w.style.transform=`translateX(${l}px)`,I.style.transform=`translate(${l}px, ${u}px)`;let H=(T.length-1-D)*e.intervalSeconds;b.textContent=`${e.format(U)} · ${H===0?"now":`${H} s ago`}`;let Y=l>k.width/2;b.style.left=Y?"":`${l+8}px`,b.style.right=Y?`${k.width-l+8}px`:""},Z=(U)=>{if(T.length===0)return;let k=o.getBoundingClientRect(),l=(U-k.left)/k.width*(e.capacity-1),u=Math.round(l-(e.capacity-T.length));D=Math.min(T.length-1,Math.max(0,u)),ue()};return o.addEventListener("pointermove",(U)=>{Q=U.clientX,Z(U.clientX)}),o.addEventListener("pointerleave",()=>{Q=null,D=null,ue()}),{element:o,update:(U,k)=>{if(T=U,N=k>0?k:1,h.setAttribute("d",[0.25,0.5,0.75].map((l)=>`M0 ${n*l} H300`).join(" ")),T.length===0)E.setAttribute("d",""),_.setAttribute("d","");else{let l=T.map((ce,we)=>`${W(we,T.length).toFixed(2)} ${oe(ce).toFixed(2)}`),u=T.length===1,H=u?`M${W(0,1)-2} ${l[0]?.split(" ")[1]} L${l[0]}`:`M${l.join(" L")}`;_.setAttribute("d",H);let Y=u?W(0,1)-2:W(0,T.length);E.setAttribute("d",`${H} L300 ${n} L${Y.toFixed(2)} ${n} Z`)}if(Q!==null)Z(Q)}}};var c=(e,o="",n="",s=[])=>{let i=document.createElement(e);if(o)i.className=o;if(n)i.textContent=n;if(s.length>0)i.append(...s);return i},R=(e,o)=>{if(e.textContent!==o)e.textContent=o},se=(e,o,n,s,i,a=0)=>{let d=new Map;for(let E of o){let _=n(E);for(let I=1;d.has(_);I+=1)_=`${n(E)}\x01${I}`;let w=i.get(_);if(w)w.update(E);d.set(_,w??s(E))}for(let[E,_]of i)if(d.get(E)!==_)_.element.remove();i.clear();let h=a;for(let[E,_]of d){i.set(E,_);let w=e.children[h]??null;if(w!==_.element)e.insertBefore(_.element,w);h+=1}};var zt=5000,nr={"needs-approval":"Allow the local service for Resource Monitor in Settings → Extensions.",paused:"Resource Monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the monitoring service.","bad-answer":"The monitoring service answered with something unexpected."},Qe=(e)=>typeof e==="object"&&e!==null,nn=(e)=>Qe(e)&&typeof e.at==="number"&&Qe(e.system)&&Qe(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Qe(e.history),sn=(e)=>{if(!(e instanceof f))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},sr=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},ir=(e,o)=>{let n=c("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(s)=>{s.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},jt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,ar=(e,o,n,s)=>{let i=!1,a=async()=>{if(i||!jt(o))return;i=!0;try{let E=await e.serviceRequest({method:"GET",path:"/snapshot"}),_;try{_=JSON.parse(E.body)}catch{_=null}if(E.status===200&&nn(_))n(_);else s(E.status===200?"bad-answer":"service-failed")}catch(E){s(sn(E))}finally{i=!1}};a(),setInterval(()=>{a()},zt);let d=jt(o),h=()=>{let E=jt(o);if(E&&!d)a();d=E};return document.addEventListener("visibilitychange",h),new ResizeObserver(h).observe(document.documentElement),{refresh:()=>{a()}}};var Kt="en",cr=(e)=>{try{Kt=Intl.NumberFormat.supportedLocalesOf(e)[0]??"en"}catch{Kt="en"}},dr=(e,o)=>new Intl.NumberFormat(Kt,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),te=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),s=0;while(n>=1024&&s<o.length-1)n/=1024,s+=1;let i=s>=3&&n<100?1:0;return`${dr(n,i)} ${o[s]}`},pe=(e)=>{if(e===null)return"–";if(e>0&&e<0.01)return"<0.01%";return`${dr(e,e>0&&e<1?2:e<10?1:0)}%`},lr=(e,o)=>e===null?null:e/Math.max(1,o),pr=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${s} min`;return`${s} min`},Ze=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let s=-1;while((s=n.indexOf(e,s+1))>=0){if(!/[\\/]/.test(n[s-1]??""))continue;let i=n.slice(s+e.length).replace(/^\.exe/i,"");if(i===""||i.startsWith(" "))return i.trim()}return o},an={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},cn=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],qe=(...e)=>e.filter(Boolean).join(" · "),Wt=(e,o)=>{let n=e.ports.map((d)=>`:${d}`).join(" ");if(o==="root")return{title:"Main process",detail:qe(n,Ze(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let s=/--type=([\w-]+)/.exec(e.command)?.[1];if(s&&/\bHelper\b/.test(e.name)){let d=s==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:cn.find(([E])=>E.test(d))?.[1]??an[s]??s,detail:qe(n,Ze(e.name,e.command))}}let i=e.label||e.name,a=Ze(e.name,e.command);return{title:i,detail:qe(n,a===i||a===e.name?"":a)}},Jt=(e)=>{let o=Ze(e.name,e.command),n=o===e.title||o===e.name||e.command===e.title;return qe(e.ports.map((s)=>`:${s}`).join(" "),e.count>1?`${e.count} processes`:"",n?"":o)},ur=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},et={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},mr={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},ie={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var fr=`
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
  [hidden] { display: none !important; }
`;var Yt=36;var Te=Mt(),oo=document.querySelector("#root");if(!oo)throw Error("Missing #root");var _r=document.createElement("style");_r.textContent=fr+Er;document.head.append(_r);var ro=zt/1000,Ae=c("div","banner");Ae.hidden=!0;var Tr=c("div","host-name","This machine"),gr=c("div","host-meta","Reading…"),ke=c("div","live stale","Starting"),xr=c("div","head");xr.append(c("div","titles","",[Tr,gr]),ke);var br=(e,o,n)=>{let s=c("span","big num","–"),i=c("span","sub num"),a=c("div","card-top","",[c("span","label",e),c("span","grow"),i]),d=Vt({color:o,height:56,capacity:Yt,format:n,intervalSeconds:ro}),h=c("div","sub num");return{card:c("div","card","",[a,s,d.element,h]),value:s,side:i,sub:h,chart:d}},be=br("CPU",ie.cpu,pe),ye=br("Memory",ie.memory,te),dn=c("div","grid","",[be.card,ye.card]),yr=c("span","big num","–"),Qt=c("span","sub num"),Ar=Vt({color:ie.app,height:44,capacity:Yt,format:te,intervalSeconds:ro}),vr=c("div","stack"),kr=c("div","legend"),ln=c("div","card","",[c("div","card-top","",[c("span","label","OpenChamber"),c("span","grow"),Qt]),yr,c("div","sub","The app, OpenCode, and everything they started"),Ar.element,vr,kr]),pn=()=>{let e=c("span","cell","CPU");return e.title="CPU as a percentage of total machine capacity, on the same scale as the CPU card.",c("div","cols","",[c("span"),c("span"),e,c("span","cell","Memory")])},nt=(e)=>c("span","action","",e?[e]:[]),wr=c("span","count"),Zt=c("div","list"),Or=c("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),un=c("section","section","",[c("div","section-head","",[c("span","label","Dev servers"),wr]),Zt,Or]),Rr=c("div","list"),mn=c("section","section","",[c("div","section-head","",[c("span","label","Processes")]),pn(),Rr]),Ir=c("div","list"),no=c("section","section","",[c("div","section-head","",[c("span","label","OpenCode outside OpenChamber")]),Ir]);no.hidden=!0;var fn=c("div","footnote","CPU everywhere is a percentage of total machine capacity: all logical cores together are 100%. Memory is resident memory: pages a process shares with others count in each of them.");oo.append(Ae,xr,dn,ln,un,mn,no,fn);var Ur=()=>{return},so=(e,o,n)=>{let s=c("button","stop",e);s.type="button";let i=!1,a,d=()=>{i=!1,s.classList.remove("armed"),s.textContent=e};return s.addEventListener("click",(h)=>{if(h.preventDefault(),h.stopPropagation(),s.disabled)return;if(!i){i=!0,s.classList.add("armed"),s.textContent=o,clearTimeout(a),a=setTimeout(d,4000);return}clearTimeout(a),s.disabled=!0,s.textContent="Stopping…",sr(Te,n).then((E)=>{if(!E)Cn();s.disabled=!1,d(),Ur()})}),s},qt=0,eo=1,En=(e)=>e.pid===qt?"root":e.label==="Resource Monitor"&&e.ppid===qt?"self":"other",st=(e)=>{let o=c("span"),n=c("span","cell num");return{cpu:o,memory:n,set:(i,a)=>{let d=e==="per-core"?lr(i,eo):i,h=d!==null&&d*eo>=1?"cell num":"cell num quiet";if(o.className!==h)o.className=h;R(o,pe(d)),R(n,te(a))}}},Cr=(e,o)=>{let n=c("span","title-line","",[c("span","pname",e)]),s=c("span","pdetail"),i=(a)=>{R(s,a),s.hidden=a===""};return i(o),{element:c("div","who","",[n,s]),setDetail:i}},io=(e,o)=>{let{title:n,detail:s}=Wt(e,o);return[e.pid,o,n,s,e.name,e.command].join("\x00")},ao=(e,o,n="row")=>{let{title:s,detail:i}=Wt(e,o),a=st("per-core");a.set(e.cpu,e.memory);let d=c("div",n,"",[Cr(s,i).element,nt(),a.cpu,a.memory]);return d.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,{element:d,update:(h)=>a.set(h.cpu,h.memory)}},Se=new Set,Lr=(e)=>e.members.length>0&&e.count>1,hn=(e,o)=>[e.pid,e.name,e.title,e.command,o,Lr(e)].join("\x00"),Sn=(e)=>io(e,"other"),_n=(e)=>ao(e,"other","row member"),Tn=(e,o)=>{let n=Lr(e),s=o?so("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name}):void 0,i=st("per-core"),a=Cr(e.title,Jt(e)),d=c("div",n?"row job foldable":"row job","",[a.element,nt(s),i.cpu,i.memory]);d.title=e.command||e.title;let h=c("div","job-wrap","",[d]),E=c("div","more"),_=c("div","members","",[E]),w=new Map,I=e,b=(T)=>{I=T,i.set(T.cpu,T.memory),a.setDetail(Jt(T));let N=n&&Se.has(T.pid);if(d.classList.toggle("open",N),h.classList.toggle("open",N),n)d.setAttribute("aria-expanded",String(N));if(!N){_.remove();return}se(_,T.members,Sn,_n,w);let D=T.count-T.members.length;if(E.hidden=D<=0,R(E,D===1?"1 more process, idle":`${D} more processes, idle`),_.parentElement!==h)h.append(_)};if(n){d.tabIndex=0,d.setAttribute("role","button");let T=()=>{if(Se.has(I.pid))Se.delete(I.pid);else Se.add(I.pid);b(I)};d.addEventListener("click",T),d.addEventListener("keydown",(N)=>{if(N.key==="Enter"||N.key===" ")N.preventDefault(),T()})}return b(e),{element:h,update:b}},Mr="collapsed-groups",_e=new Set,tt=!1,gn=()=>{if(!tt)return;Te.storage.set(Mr,[..._e],{scope:"device"}).catch(()=>{return})},xn=async()=>{if(!tt)return;try{let e=await Te.storage.get(Mr,{scope:"device"});if(!Array.isArray(e))return;for(let o of e)if(o==="app"||o==="opencode"||o==="terminals")_e.add(o);if(to)Nr(to)}catch{}},bn=(e)=>{let o=(n)=>e.id==="terminals"||e.id==="opencode"&&n.ports.length>0;return[...e.processes.map((n)=>({kind:"process",row:n,role:En(n)})),...e.jobs.map((n)=>({kind:"job",job:n,stoppable:o(n)}))]},yn=(e)=>e.kind==="process"?`process\x00${io(e.row,e.role)}`:`job\x00${hn(e.job,e.stoppable)}`,An=(e)=>{if(e.kind==="process"){let n=ao(e.row,e.role);return{element:n.element,update:(s)=>{if(s.kind==="process")n.update(s.row)}}}let o=Tn(e.job,e.stoppable);return{element:o.element,update:(n)=>{if(n.kind==="job")o.update(n.job)}}},Gr=(e)=>e.id==="terminals"&&e.jobs.length>0,vn=(e)=>`${e.id}\x00${Gr(e)}`,kn=(e)=>{let o=c("span","dot");o.style.background=ie[e.id];let n=Gr(e)?so("Stop all","Stop everything running in the terminal?",{kind:"terminals"}):void 0,s=c("span","count"),i=c("span","gname","",[o,c("b","",et[e.id]),s]),a=st("share"),d=c("div","group-head foldable","",[i,nt(n),a.cpu,a.memory]);d.tabIndex=0,d.setAttribute("role","button");let h=c("div","group","",[d]);h.style.setProperty("--group-color",ie[e.id]);let E=new Map,_=e,w=(b)=>{_=b,R(s,String(b.count)),a.set(b.cpu,b.memory);let T=_e.has(b.id);d.classList.toggle("open",!T),d.setAttribute("aria-expanded",String(!T)),se(h,T?[]:bn(b),yn,An,E,1)},I=()=>{if(_e.has(_.id))_e.delete(_.id);else _e.add(_.id);gn(),w(_)};return d.addEventListener("click",I),d.addEventListener("keydown",(b)=>{if(b.key==="Enter"||b.key===" ")b.preventDefault(),I()}),w(e),{element:h,update:w}},wn=(e)=>[e.pid,e.name,e.group,e.ports.join(","),e.command,e.job?.pid??"",e.job?.name??"",e.job?.title??""].join("\x00"),On=(e)=>{let o=e.ports.map((E)=>ir(Te,E)),n=c("div","title-line","",[...o,c("span","pname strong",e.name),c("span","origin",mr[e.group])]),s=e.job?so("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}):void 0,i=c("div","who","",[n]),a=e.job?.title??"";if(a)i.append(c("span","pdetail",a));let d=st("per-core");d.set(e.cpu,e.memory);let h=c("div","row server","",[i,nt(s),d.cpu,d.memory]);return h.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,{element:h,update:(E)=>d.set(E.cpu,E.memory)}},Rn=(e)=>{let o=c("span");o.style.background=ie[e.id],o.title=et[e.id];let n=(s)=>{o.style.width=`${Math.min(100,s.value/Math.max(1,s.total)*100)}%`};return n(e),{element:o,update:n}},In=(e)=>{let o=c("span","swatch");o.style.background=ie[e.id];let n=c("span","muted"),s=c("span","value num muted"),i=c("span","value num"),a=(d)=>{R(n,` · ${d.count} ${d.count===1?"process":"processes"}`),R(s,pe(d.cpu)),R(i,te(d.memory))};return a(e),{element:c("div","legend-row","",[o,c("span","name",et[e.id],[n]),s,i]),update:a}},Un={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},ve=null,ot=!1,hr,Pr=[],to=null,rt=()=>{let e=ve!==null?nr[ve]:ot?"Could not stop it. It may have ended already, or it is not something this panel stops.":Pr.join(" ");Ae.hidden=e==="",Ae.classList.toggle("error",ve!==null||ot),R(Ae,e)};function Cn(){ot=!0,clearTimeout(hr),hr=setTimeout(()=>{ot=!1,rt()},6000),rt()}var Ln=new Map,Mn=new Map,Gn=new Map,Pn=new Map,Nn=new Map;function Nr(e){to=e;let{system:o,app:n}=e;qt=n.rootPid,eo=o.cores,R(Tr,o.hostname),R(gr,[ur(o.platform),o.arch,o.cpuModel,`up ${pr(o.uptimeSeconds)}`].filter(Boolean).join(" · ")),R(ke,`Live · every ${ro} s`),ke.classList.remove("stale"),R(be.value,pe(o.cpu)),R(be.side,`${o.cores} cores`),R(be.sub,o.load?`Load ${o.load.map((a)=>a.toFixed(2)).join(" · ")}`:"All cores together"),be.chart.update(e.history.system.cpu,100),R(ye.value,te(o.memoryUsed)),R(ye.side,pe(o.memoryUsed/Math.max(1,o.memoryTotal)*100)),R(ye.sub,`of ${te(o.memoryTotal)} · ${te(Math.max(0,o.memoryTotal-o.memoryUsed))} free`),ye.chart.update(e.history.system.memory,o.memoryTotal),R(yr,te(n.memory)),R(Qt,`${pe(n.cpu)} CPU`),Qt.title=`Share of all ${o.cores} cores, the same scale as the CPU card`,Ar.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15);let s=n.groups.filter((a)=>a.memory>0).map((a)=>({id:a.id,value:a.memory,total:n.memory}));se(vr,s,(a)=>a.id,Rn,Ln),se(kr,n.groups,(a)=>a.id,In,Mn),R(wr,e.servers.length>0?String(e.servers.length):""),se(Zt,e.servers,wn,On,Gn),Zt.hidden=e.servers.length===0,Or.hidden=e.servers.length>0,se(Rr,n.groups,vn,kn,Pn);let i=new Set(n.groups.flatMap((a)=>a.jobs.map((d)=>d.pid)));for(let a of Se)if(!i.has(a))Se.delete(a);no.hidden=e.outside.length===0,se(Ir,e.outside,(a)=>io(a,"other"),(a)=>ao(a,"other"),Nn),Pr=e.warnings.map((a)=>Un[a]),rt()}var Dn=(e)=>{ve=e,rt(),ke.textContent="Paused",ke.classList.add("stale")},Sr=!1;Te.onReady((e)=>{if(Gt(e,document.documentElement),cr(e.locale),e.features?.deviceStorage===!0&&!tt)tt=!0,xn();if(Sr)return;Sr=!0,{refresh:Ur}=ar(Te,oo,(o)=>{ve=null,Nr(o)},Dn)});})();
