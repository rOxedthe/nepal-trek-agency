(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,55286,e=>{"use strict";let t,n,i,r;var a=e.i(43476),o=e.i(71645),s=e.i(75056),l=e.i(25234),c=e.i(28600);function d(){return(d=Object.assign.bind()).apply(null,arguments)}var u=e.i(32009),p=Object.defineProperty;class m{constructor(){((e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?p(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n})(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,i=n.length;t<i;t++)n[t].call(this,e);e.target=null}}}var f=Object.defineProperty,h=(e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?f(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,n};let g=new u.Ray,v=new u.Plane,x=Math.cos(Math.PI/180*70),b=(e,t)=>(e%t+t)%t;class y extends m{constructor(e,t){super(),h(this,"object"),h(this,"domElement"),h(this,"enabled",!0),h(this,"target",new u.Vector3),h(this,"minDistance",0),h(this,"maxDistance",1/0),h(this,"minZoom",0),h(this,"maxZoom",1/0),h(this,"minPolarAngle",0),h(this,"maxPolarAngle",Math.PI),h(this,"minAzimuthAngle",-1/0),h(this,"maxAzimuthAngle",1/0),h(this,"enableDamping",!1),h(this,"dampingFactor",.05),h(this,"enableZoom",!0),h(this,"zoomSpeed",1),h(this,"enableRotate",!0),h(this,"rotateSpeed",1),h(this,"enablePan",!0),h(this,"panSpeed",1),h(this,"screenSpacePanning",!0),h(this,"keyPanSpeed",7),h(this,"zoomToCursor",!1),h(this,"autoRotate",!1),h(this,"autoRotateSpeed",2),h(this,"reverseOrbit",!1),h(this,"reverseHorizontalOrbit",!1),h(this,"reverseVerticalOrbit",!1),h(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),h(this,"mouseButtons",{LEFT:u.MOUSE.ROTATE,MIDDLE:u.MOUSE.DOLLY,RIGHT:u.MOUSE.PAN}),h(this,"touches",{ONE:u.TOUCH.ROTATE,TWO:u.TOUCH.DOLLY_PAN}),h(this,"target0"),h(this,"position0"),h(this,"zoom0"),h(this,"_domElementKeyEvents",null),h(this,"getPolarAngle"),h(this,"getAzimuthalAngle"),h(this,"setPolarAngle"),h(this,"setAzimuthalAngle"),h(this,"getDistance"),h(this,"getZoomScale"),h(this,"listenToKeyEvents"),h(this,"stopListenToKeyEvents"),h(this,"saveState"),h(this,"reset"),h(this,"update"),h(this,"connect"),h(this,"dispose"),h(this,"dollyIn"),h(this,"dollyOut"),h(this,"getScale"),h(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>c.phi,this.getAzimuthalAngle=()=>c.theta,this.setPolarAngle=e=>{let t=b(e,2*Math.PI),i=c.phi;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),d.phi=t-i,n.update()},this.setAzimuthalAngle=e=>{let t=b(e,2*Math.PI),i=c.theta;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),d.theta=t-i,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),s=o.NONE},this.update=(()=>{let t=new u.Vector3,r=new u.Vector3(0,1,0),a=new u.Quaternion().setFromUnitVectors(e.up,r),f=a.clone().invert(),h=new u.Vector3,b=new u.Quaternion,y=2*Math.PI;return function(){let w=n.object.position;a.setFromUnitVectors(e.up,r),f.copy(a).invert(),t.copy(w).sub(n.target),t.applyQuaternion(a),c.setFromVector3(t),n.autoRotate&&s===o.NONE&&N(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(c.theta+=d.theta*n.dampingFactor,c.phi+=d.phi*n.dampingFactor):(c.theta+=d.theta,c.phi+=d.phi);let E=n.minAzimuthAngle,S=n.maxAzimuthAngle;isFinite(E)&&isFinite(S)&&(E<-Math.PI?E+=y:E>Math.PI&&(E-=y),S<-Math.PI?S+=y:S>Math.PI&&(S-=y),E<=S?c.theta=Math.max(E,Math.min(S,c.theta)):c.theta=c.theta>(E+S)/2?Math.max(E,c.theta):Math.min(S,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(m,n.dampingFactor):n.target.add(m),n.zoomToCursor&&T||n.object.isOrthographicCamera?c.radius=F(c.radius):c.radius=F(c.radius*p),t.setFromSpherical(c),t.applyQuaternion(f),w.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(d.theta*=1-n.dampingFactor,d.phi*=1-n.dampingFactor,m.multiplyScalar(1-n.dampingFactor)):(d.set(0,0,0),m.set(0,0,0));let j=!1;if(n.zoomToCursor&&T){let i=null;if(n.object instanceof u.PerspectiveCamera&&n.object.isPerspectiveCamera){let e=t.length();i=F(e*p);let r=e-i;n.object.position.addScaledVector(O,r),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new u.Vector3(L.x,L.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/p)),n.object.updateProjectionMatrix(),j=!0;let r=new u.Vector3(L.x,L.y,0);r.unproject(n.object),n.object.position.sub(r).add(e),n.object.updateMatrixWorld(),i=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==i&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(i).add(n.object.position):(g.origin.copy(n.object.position),g.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(g.direction))<x?e.lookAt(n.target):(v.setFromNormalAndCoplanarPoint(n.object.up,n.target),g.intersectPlane(v,n.target))))}else n.object instanceof u.OrthographicCamera&&n.object.isOrthographicCamera&&(j=1!==p)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/p)),n.object.updateProjectionMatrix());return p=1,T=!1,!!(j||h.distanceToSquared(n.object.position)>l||8*(1-b.dot(n.object.quaternion))>l)&&(n.dispatchEvent(i),h.copy(n.object.position),b.copy(n.object.quaternion),j=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",$),n.domElement.addEventListener("pointercancel",Q),n.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,i,r,a,o;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",$),null==(i=n.domElement)||i.removeEventListener("pointercancel",Q),null==(r=n.domElement)||r.removeEventListener("wheel",J),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointermove",q),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointerup",Q),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};const n=this,i={type:"change"},r={type:"start"},a={type:"end"},o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=o.NONE;const l=1e-6,c=new u.Spherical,d=new u.Spherical;let p=1;const m=new u.Vector3,f=new u.Vector2,y=new u.Vector2,w=new u.Vector2,E=new u.Vector2,S=new u.Vector2,j=new u.Vector2,M=new u.Vector2,P=new u.Vector2,A=new u.Vector2,O=new u.Vector3,L=new u.Vector2;let T=!1;const _=[],C={};function z(){return Math.pow(.95,n.zoomSpeed)}function N(e){n.reverseOrbit||n.reverseHorizontalOrbit?d.theta+=e:d.theta-=e}function U(e){n.reverseOrbit||n.reverseVerticalOrbit?d.phi+=e:d.phi-=e}const I=(()=>{let e=new u.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),m.add(e)}})(),R=(()=>{let e=new u.Vector3;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),m.add(e)}})(),k=(()=>{let e=new u.Vector3;return function(t,i){let r=n.domElement;if(r&&n.object instanceof u.PerspectiveCamera&&n.object.isPerspectiveCamera){let a=n.object.position;e.copy(a).sub(n.target);let o=e.length();I(2*t*(o*=Math.tan(n.object.fov/2*Math.PI/180))/r.clientHeight,n.object.matrix),R(2*i*o/r.clientHeight,n.object.matrix)}else r&&n.object instanceof u.OrthographicCamera&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/r.clientWidth,n.object.matrix),R(i*(n.object.top-n.object.bottom)/n.object.zoom/r.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function D(e){n.object instanceof u.PerspectiveCamera&&n.object.isPerspectiveCamera||n.object instanceof u.OrthographicCamera&&n.object.isOrthographicCamera?p=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(e){if(!n.zoomToCursor||!n.domElement)return;T=!0;let t=n.domElement.getBoundingClientRect(),i=e.clientX-t.left,r=e.clientY-t.top,a=t.width,o=t.height;L.x=i/a*2-1,L.y=-(r/o*2)+1,O.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function F(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function V(e){f.set(e.clientX,e.clientY)}function H(e){E.set(e.clientX,e.clientY)}function W(){if(1==_.length)f.set(_[0].pageX,_[0].pageY);else{let e=.5*(_[0].pageX+_[1].pageX),t=.5*(_[0].pageY+_[1].pageY);f.set(e,t)}}function Y(){if(1==_.length)E.set(_[0].pageX,_[0].pageY);else{let e=.5*(_[0].pageX+_[1].pageX),t=.5*(_[0].pageY+_[1].pageY);E.set(e,t)}}function G(){let e=_[0].pageX-_[1].pageX,t=_[0].pageY-_[1].pageY,n=Math.sqrt(e*e+t*t);M.set(0,n)}function Z(e){if(1==_.length)y.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);y.set(n,i)}w.subVectors(y,f).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(N(2*Math.PI*w.x/t.clientHeight),U(2*Math.PI*w.y/t.clientHeight)),f.copy(y)}function X(e){if(1==_.length)S.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);S.set(n,i)}j.subVectors(S,E).multiplyScalar(n.panSpeed),k(j.x,j.y),E.copy(S)}function K(e){var t;let i=ei(e),r=e.pageX-i.x,a=e.pageY-i.y,o=Math.sqrt(r*r+a*a);P.set(0,o),A.set(0,Math.pow(P.y/M.y,n.zoomSpeed)),t=A.y,D(p/t),M.copy(P)}function $(e){var t,i,a;!1!==n.enabled&&(0===_.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",q),null==(i=n.domElement)||i.ownerDocument.addEventListener("pointerup",Q)),a=e,_.push(a),"touch"===e.pointerType?function(e){switch(en(e),_.length){case 1:switch(n.touches.ONE){case u.TOUCH.ROTATE:if(!1===n.enableRotate)return;W(),s=o.TOUCH_ROTATE;break;case u.TOUCH.PAN:if(!1===n.enablePan)return;Y(),s=o.TOUCH_PAN;break;default:s=o.NONE}break;case 2:switch(n.touches.TWO){case u.TOUCH.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&G(),n.enablePan&&Y(),s=o.TOUCH_DOLLY_PAN;break;case u.TOUCH.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&G(),n.enableRotate&&W(),s=o.TOUCH_DOLLY_ROTATE;break;default:s=o.NONE}break;default:s=o.NONE}s!==o.NONE&&n.dispatchEvent(r)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case u.MOUSE.DOLLY:if(!1===n.enableZoom)return;B(e),M.set(e.clientX,e.clientY),s=o.DOLLY;break;case u.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;H(e),s=o.PAN}else{if(!1===n.enableRotate)return;V(e),s=o.ROTATE}break;case u.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;V(e),s=o.ROTATE}else{if(!1===n.enablePan)return;H(e),s=o.PAN}break;default:s=o.NONE}s!==o.NONE&&n.dispatchEvent(r)}(e))}function q(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),s){case o.TOUCH_ROTATE:if(!1===n.enableRotate)return;Z(e),n.update();break;case o.TOUCH_PAN:if(!1===n.enablePan)return;X(e),n.update();break;case o.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&K(e),n.enablePan&&X(e),n.update();break;case o.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&K(e),n.enableRotate&&Z(e),n.update();break;default:s=o.NONE}}(e):function(e){if(!1!==n.enabled)switch(s){case o.ROTATE:let t;if(!1===n.enableRotate)return;y.set(e.clientX,e.clientY),w.subVectors(y,f).multiplyScalar(n.rotateSpeed),(t=n.domElement)&&(N(2*Math.PI*w.x/t.clientHeight),U(2*Math.PI*w.y/t.clientHeight)),f.copy(y),n.update();break;case o.DOLLY:var i,r;if(!1===n.enableZoom)return;(P.set(e.clientX,e.clientY),A.subVectors(P,M),A.y>0)?(i=z(),D(p/i)):A.y<0&&(r=z(),D(p*r)),M.copy(P),n.update();break;case o.PAN:if(!1===n.enablePan)return;S.set(e.clientX,e.clientY),j.subVectors(S,E).multiplyScalar(n.panSpeed),k(j.x,j.y),E.copy(S),n.update()}}(e))}function Q(e){var t,i,r;(function(e){delete C[e.pointerId];for(let t=0;t<_.length;t++)if(_[t].pointerId==e.pointerId)return void _.splice(t,1)})(e),0===_.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointermove",q),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointerup",Q)),n.dispatchEvent(a),s=o.NONE}function J(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(s===o.NONE||s===o.ROTATE)){var t,i;e.preventDefault(),n.dispatchEvent(r),(B(e),e.deltaY<0)?(t=z(),D(p*t)):e.deltaY>0&&(i=z(),D(p/i)),n.update(),n.dispatchEvent(a)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:k(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:k(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:k(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:k(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=C[e.pointerId];void 0===t&&(t=new u.Vector2,C[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ei(e){return C[(e.pointerId===_[0].pointerId?_[1]:_[0]).pointerId]}this.dollyIn=(e=z())=>{D(p*e),n.update()},this.dollyOut=(e=z())=>{D(p/e),n.update()},this.getScale=()=>p,this.setScale=e=>{D(e),n.update()},this.getZoomScale=()=>z(),void 0!==t&&this.connect(t),this.update()}}let w=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:i,enableDamping:r=!0,keyEvents:a=!1,onChange:s,onStart:u,onEnd:p,...m},f)=>{let h=(0,c.useThree)(e=>e.invalidate),g=(0,c.useThree)(e=>e.camera),v=(0,c.useThree)(e=>e.gl),x=(0,c.useThree)(e=>e.events),b=(0,c.useThree)(e=>e.setEvents),w=(0,c.useThree)(e=>e.set),E=(0,c.useThree)(e=>e.get),S=(0,c.useThree)(e=>e.performance),j=t||g,M=i||x.connected||v.domElement,P=o.useMemo(()=>new y(j),[j]);return(0,l.useFrame)(()=>{P.enabled&&P.update()},-1),o.useEffect(()=>(a&&P.connect(!0===a?M:a),P.connect(M),()=>void P.dispose()),[a,M,n,P,h]),o.useEffect(()=>{let e=e=>{h(),n&&S.regress(),s&&s(e)},t=e=>{u&&u(e)},i=e=>{p&&p(e)};return P.addEventListener("change",e),P.addEventListener("start",t),P.addEventListener("end",i),()=>{P.removeEventListener("start",t),P.removeEventListener("end",i),P.removeEventListener("change",e)}},[s,u,p,P,h,b]),o.useEffect(()=>{if(e){let e=E().controls;return w({controls:P}),()=>w({controls:e})}},[e,P]),o.createElement("primitive",d({ref:f,object:P,enableDamping:r},m))});var E=e.i(88014);let S=new u.Vector3,j=new u.Vector3,M=new u.Vector3,P=new u.Vector2;function A(e,t,n){let i=S.setFromMatrixPosition(e.matrixWorld);i.project(t);let r=n.width/2,a=n.height/2;return[i.x*r+r,-(i.y*a)+a]}let O=e=>1e-10>Math.abs(e)?0:e;function L(e,t,n=""){let i="matrix3d(";for(let n=0;16!==n;n++)i+=O(t[n]*e.elements[n])+(15!==n?",":")");return n+i}let T=(i=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>L(e,i)),_=(r=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>L(e,r(t),"translate(-50%,-50%)")),C=o.forwardRef(({children:e,eps:t=.001,style:n,className:i,prepend:r,center:a,fullscreen:s,portal:p,distanceFactor:m,sprite:f=!1,transform:h=!1,occlude:g,onOcclude:v,castShadow:x,receiveShadow:b,material:y,geometry:w,zIndexRange:L=[0x1000037,0],calculatePosition:C=A,as:z="div",wrapperClass:N,pointerEvents:U="auto",...I},R)=>{let{gl:k,camera:D,scene:B,size:F,raycaster:V,events:H,viewport:W}=(0,c.useThree)(),[Y]=o.useState(()=>document.createElement(z)),G=o.useRef(null),Z=o.useRef(null),X=o.useRef(0),K=o.useRef([0,0]),$=o.useRef(null),q=o.useRef(null),Q=(null==p?void 0:p.current)||H.connected||k.domElement.parentNode,J=o.useRef(null),ee=o.useRef(!1),et=o.useMemo(()=>{var e;return g&&"blending"!==g||Array.isArray(g)&&g.length&&(e=g[0])&&"object"==typeof e&&"current"in e},[g]);o.useLayoutEffect(()=>{let e=k.domElement;g&&"blending"===g?(e.style.zIndex=`${Math.floor(L[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[g]),o.useLayoutEffect(()=>{if(Z.current){let e=G.current=E.createRoot(Y);if(B.updateMatrixWorld(),h)Y.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=C(Z.current,D,F);Y.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Q&&(r?Q.prepend(Y):Q.appendChild(Y)),()=>{Q&&Q.removeChild(Y),e.unmount()}}},[Q,h]),o.useLayoutEffect(()=>{N&&(Y.className=N)},[N]);let en=o.useMemo(()=>h?{position:"absolute",top:0,left:0,width:F.width,height:F.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:a?"translate3d(-50%,-50%,0)":"none",...s&&{top:-F.height/2,left:-F.width/2,width:F.width,height:F.height},...n},[n,a,s,F,h]),ei=o.useMemo(()=>({position:"absolute",pointerEvents:U}),[U]);o.useLayoutEffect(()=>{var t,r;ee.current=!1,h?null==(t=G.current)||t.render(o.createElement("div",{ref:$,style:en},o.createElement("div",{ref:q,style:ei},o.createElement("div",{ref:R,className:i,style:n,children:e})))):null==(r=G.current)||r.render(o.createElement("div",{ref:R,style:en,className:i,children:e}))});let er=o.useRef(!0);(0,l.useFrame)(e=>{if(Z.current){D.updateMatrixWorld(),Z.current.updateWorldMatrix(!0,!1);let e=h?K.current:C(Z.current,D,F);if(h||Math.abs(X.current-D.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){var n;let t,i,r,a,o=(n=Z.current,t=S.setFromMatrixPosition(n.matrixWorld),i=j.setFromMatrixPosition(D.matrixWorld),r=t.sub(i),a=D.getWorldDirection(M),r.angleTo(a)>Math.PI/2),s=!1;et&&(Array.isArray(g)?s=g.map(e=>e.current):"blending"!==g&&(s=[B]));let l=er.current;s?er.current=function(e,t,n,i){let r=S.setFromMatrixPosition(e.matrixWorld),a=r.clone();a.project(t),P.set(a.x,a.y),n.setFromCamera(P,t);let o=n.intersectObjects(i,!0);if(o.length){let e=o[0].distance;return r.distanceTo(n.ray.origin)<e}return!0}(Z.current,D,V,s)&&!o:er.current=!o,l!==er.current&&(v?v(!er.current):Y.style.display=er.current?"block":"none");let c=Math.floor(L[0]/2),d=g?et?[L[0],c]:[c-1,0]:L;if(Y.style.zIndex=`${function(e,t,n){if(t instanceof u.PerspectiveCamera||t instanceof u.OrthographicCamera){let i=S.setFromMatrixPosition(e.matrixWorld),r=j.setFromMatrixPosition(t.matrixWorld),a=i.distanceTo(r),o=(n[1]-n[0])/(t.far-t.near),s=n[1]-o*t.far;return Math.round(o*a+s)}}(Z.current,D,d)}`,h){let[e,t]=[F.width/2,F.height/2],n=D.projectionMatrix.elements[5]*t,{isOrthographicCamera:i,top:r,left:a,bottom:o,right:s}=D,l=T(D.matrixWorldInverse),c=i?`scale(${n})translate(${O(-(s+a)/2)}px,${O((r+o)/2)}px)`:`translateZ(${n}px)`,d=Z.current.matrixWorld;f&&((d=D.matrixWorldInverse.clone().transpose().copyPosition(d).scale(Z.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),Y.style.width=F.width+"px",Y.style.height=F.height+"px",Y.style.perspective=i?"":`${n}px`,$.current&&q.current&&($.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,q.current.style.transform=_(d,1/((m||10)/400)))}else{let t=void 0===m?1:function(e,t){if(t instanceof u.OrthographicCamera)return t.zoom;if(!(t instanceof u.PerspectiveCamera))return 1;{let n=S.setFromMatrixPosition(e.matrixWorld),i=j.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*n.distanceTo(i))}}(Z.current,D)*m;Y.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,X.current=D.zoom}}if(!et&&J.current&&!ee.current)if(h){if($.current){let e=$.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=D;if(t||w)I.scale&&(Array.isArray(I.scale)?I.scale instanceof u.Vector3?J.current.scale.copy(I.scale.clone().divideScalar(1)):J.current.scale.set(1/I.scale[0],1/I.scale[1],1/I.scale[2]):J.current.scale.setScalar(1/I.scale));else{let t=(m||10)/400,n=e.clientWidth*t,i=e.clientHeight*t;J.current.scale.set(n,i,1)}ee.current=!0}}}else{let t=Y.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/W.factor,n=t.clientWidth*e,i=t.clientHeight*e;J.current.scale.set(n,i,1),ee.current=!0}J.current.lookAt(e.camera.position)}});let ea=o.useMemo(()=>({vertexShader:h?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[h]);return o.createElement("group",d({},I,{ref:Z}),g&&!et&&o.createElement("mesh",{castShadow:x,receiveShadow:b,ref:J},w||o.createElement("planeGeometry",null),y||o.createElement("shaderMaterial",{side:u.DoubleSide,vertexShader:ea.vertexShader,fragmentShader:ea.fragmentShader})))});var z=u,N=u;let U=new N.Box3,I=new N.Vector3;class R extends N.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new N.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new N.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new N.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new N.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new N.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new N.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new N.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new N.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new N.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new N.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),U.setFromBufferAttribute(t),this.boundingBox.union(U))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new N.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)I.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(I)),I.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(I));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var k=u;let D=parseInt(u.REVISION.replace(/\D+/g,""));class B extends k.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:k.UniformsUtils.clone(k.UniformsUtils.merge([k.UniformsLib.common,k.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new k.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${D>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let F=D>=125?"uv1":"uv2",V=new z.Vector4,H=new z.Vector3,W=new z.Vector3,Y=new z.Vector4,G=new z.Vector4,Z=new z.Vector4,X=new z.Vector3,K=new z.Matrix4,$=new z.Line3,q=new z.Vector3,Q=new z.Box3,J=new z.Sphere,ee=new z.Vector4;function et(e,t,i){return ee.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),ee.multiplyScalar(1/ee.w),ee.x=n/i.width,ee.y=n/i.height,ee.applyMatrix4(e.projectionMatrixInverse),ee.multiplyScalar(1/ee.w),Math.abs(Math.max(ee.x,ee.y))}class en extends z.Mesh{constructor(e=new R,t=new B({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)H.fromBufferAttribute(t,e),W.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+H.distanceTo(W);let r=new z.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new z.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new z.InterleavedBufferAttribute(r,1,1)),this}raycast(e,i){let r,a,o=this.material.worldUnits,s=e.camera;null!==s||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,d=this.geometry,u=this.material;if(n=u.linewidth+l,null===d.boundingSphere&&d.computeBoundingSphere(),J.copy(d.boundingSphere).applyMatrix4(c),o)r=.5*n;else{let e=Math.max(s.near,J.distanceToPoint(t.origin));r=et(s,e,u.resolution)}if(J.radius+=r,!1!==t.intersectsSphere(J)){if(null===d.boundingBox&&d.computeBoundingBox(),Q.copy(d.boundingBox).applyMatrix4(c),o)a=.5*n;else{let e=Math.max(s.near,Q.distanceToPoint(t.origin));a=et(s,e,u.resolution)}Q.expandByScalar(a),!1!==t.intersectsBox(Q)&&(o?function(e,i){let r=e.matrixWorld,a=e.geometry,o=a.attributes.instanceStart,s=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count);for(let a=0;a<l;a++){$.start.fromBufferAttribute(o,a),$.end.fromBufferAttribute(s,a),$.applyMatrix4(r);let l=new z.Vector3,c=new z.Vector3;t.distanceSqToSegment($.start,$.end,c,l),c.distanceTo(l)<.5*n&&i.push({point:c,pointOnLine:l,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:a,uv:null,[F]:null})}}(this,i):function(e,i,r){let a=i.projectionMatrix,o=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,u=Math.min(l.instanceCount,c.count),p=-i.near;t.at(1,Z),Z.w=1,Z.applyMatrix4(i.matrixWorldInverse),Z.applyMatrix4(a),Z.multiplyScalar(1/Z.w),Z.x*=o.x/2,Z.y*=o.y/2,Z.z=0,X.copy(Z),K.multiplyMatrices(i.matrixWorldInverse,s);for(let i=0;i<u;i++){if(Y.fromBufferAttribute(c,i),G.fromBufferAttribute(d,i),Y.w=1,G.w=1,Y.applyMatrix4(K),G.applyMatrix4(K),Y.z>p&&G.z>p)continue;if(Y.z>p){let e=Y.z-G.z,t=(Y.z-p)/e;Y.lerp(G,t)}else if(G.z>p){let e=G.z-Y.z,t=(G.z-p)/e;G.lerp(Y,t)}Y.applyMatrix4(a),G.applyMatrix4(a),Y.multiplyScalar(1/Y.w),G.multiplyScalar(1/G.w),Y.x*=o.x/2,Y.y*=o.y/2,G.x*=o.x/2,G.y*=o.y/2,$.start.copy(Y),$.start.z=0,$.end.copy(G),$.end.z=0;let l=$.closestPointToPointParameter(X,!0);$.at(l,q);let u=z.MathUtils.lerp(Y.z,G.z,l),m=u>=-1&&u<=1,f=X.distanceTo(q)<.5*n;if(m&&f){$.start.fromBufferAttribute(c,i),$.end.fromBufferAttribute(d,i),$.start.applyMatrix4(s),$.end.applyMatrix4(s);let n=new z.Vector3,a=new z.Vector3;t.distanceSqToSegment($.start,$.end,a,n),r.push({point:a,pointOnLine:n,distance:t.origin.distanceTo(a),object:e,face:null,faceIndex:i,uv:null,[F]:null})}}}(this,s,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(V),this.material.uniforms.resolution.value.set(V.z,V.w))}}class ei extends R{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class er extends en{constructor(e=new ei,t=new B({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let ea=o.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:i,lineWidth:r,segments:a,dashed:s,...l},p){var m,f;let h=(0,c.useThree)(e=>e.size),g=o.useMemo(()=>a?new en:new er,[a]),[v]=o.useState(()=>new B),x=(null==n||null==(m=n[0])?void 0:m.length)===4?4:3,b=o.useMemo(()=>{let i=a?new R:new ei,r=e.map(e=>{let t=Array.isArray(e);return e instanceof u.Vector3||e instanceof u.Vector4?[e.x,e.y,e.z]:e instanceof u.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof u.Color?e.toArray():e);i.setColors(e.flat(),x)}return i},[e,a,n,x]);return o.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),o.useLayoutEffect(()=>{s?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[s,v]),o.useEffect(()=>()=>{b.dispose(),v.dispose()},[b]),o.createElement("primitive",d({object:g,ref:p},l),o.createElement("primitive",{object:b,attach:"geometry"}),o.createElement("primitive",d({object:v,attach:"material",color:t,vertexColors:!!n,resolution:[h.width,h.height],linewidth:null!=(f=null!=i?i:r)?f:1,dashed:s,transparent:4===x},l)))});var eo=e.i(88653),es=e.i(46932),el=e.i(2163),ec=e.i(16480),ed=e.i(22016);let eu=[{slug:"everest-base-camp",label:"Everest BC",lat:27.9881,lon:86.925,alt:5364},{slug:"gokyo-lake",label:"Gokyo Ri",lat:27.9653,lon:86.68,alt:5357},{slug:"annapurna-base-camp",label:"Annapurna BC",lat:28.5312,lon:83.8773,alt:4130},{slug:"annapurna-circuit",label:"Thorong La",lat:28.7942,lon:83.9306,alt:5416},{slug:"ghorepani-poon-hill",label:"Poon Hill",lat:28.4008,lon:83.7077,alt:3210},{slug:"mardi-himal",label:"Mardi Himal",lat:28.4985,lon:83.8741,alt:4500},{slug:"langtang-valley",label:"Kyanjin Gompa",lat:28.2119,lon:85.5659,alt:3870},{slug:"gosaikunda",label:"Gosaikunda",lat:28.0897,lon:85.4157,alt:4380},{slug:"manaslu-circuit",label:"Larkya La",lat:28.6542,lon:84.7631,alt:5106},{slug:"tsum-valley",label:"Mu Gompa",lat:28.8736,lon:84.7853,alt:3700},{slug:"upper-mustang",label:"Lo Manthang",lat:29.1811,lon:83.9574,alt:3840},{slug:"kanchenjunga",label:"Kangchenjunga BC",lat:27.7025,lon:88.1475,alt:5143}],ep=[{name:"Everest",lat:27.98,lon:86.92},{name:"Annapurna",lat:28.6,lon:83.82},{name:"Langtang",lat:28.21,lon:85.6},{name:"Manaslu",lat:28.55,lon:84.56}];function em(e,t,n=2){let i=Math.PI/180*(90-e),r=Math.PI/180*(t+180);return new u.Vector3(-n*Math.sin(i)*Math.cos(r),n*Math.cos(i),n*Math.sin(i)*Math.sin(r))}let ef=[{from:"Annapurna",to:"Manaslu",km:"150 km"},{from:"Manaslu",to:"Langtang",km:"120 km"},{from:"Langtang",to:"Everest",km:"230 km"}];function eh({isZoomed:e}){let t=(0,o.useMemo)(()=>ef.map(e=>{let t=ep.find(t=>t.name===e.from),n=ep.find(t=>t.name===e.to),i=function(e,t,n,i,r=56,a=.022){let o=em(e,t,2),s=em(n,i,2),l=[];for(let e=0;e<=r;e++)l.push(new u.Vector3().lerpVectors(o,s,e/r).normalize().multiplyScalar(2+a));return l}(t.lat,t.lon,n.lat,n.lon),r=i[Math.floor(i.length/2)].clone().normalize().multiplyScalar(2.09);return{pts:i,mid:r,km:e.km}}),[]);return(0,a.jsx)(a.Fragment,{children:t.map((t,n)=>(0,a.jsxs)("group",{children:[(0,a.jsx)(ea,{points:t.pts,color:"#FFFFFF",lineWidth:e?1:2,transparent:!0,opacity:e?.28:.65}),(0,a.jsx)(C,{position:[t.mid.x,t.mid.y,t.mid.z],center:!0,children:(0,a.jsx)("div",{style:{background:"rgba(26,5,8,0.92)",border:"1px solid rgba(255,255,255,0.32)",borderRadius:"999px",padding:"2px 9px",fontSize:"10px",fontFamily:"Montserrat, sans-serif",fontWeight:600,color:"white",letterSpacing:"0.06em",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none",opacity:e?.45:1},children:t.km})})]},n))})}function eg({zoomRef:e,controlsRef:t}){let{camera:n}=(0,c.useThree)(),i=(0,o.useRef)(6);return(0,l.useFrame)(()=>{let r=6+-3.5*e.current;if(i.current+=(r-i.current)*.07,t.current&&(t.current.minDistance=i.current,t.current.maxDistance=i.current,t.current.rotateSpeed=u.MathUtils.lerp(1,.07,e.current)),void 0!==n.fov){let t=45+-25*e.current;n.fov+=(t-n.fov)*.07,n.updateProjectionMatrix()}},-1),null}function ev({zoomRef:e,isZoomed:t,onRegionSelect:n,onTrekSelect:i,onHover:r}){let s=(0,o.useRef)(null),c=(0,o.useRef)(0),d=(0,o.useRef)([]),[p,m]=(0,o.useState)(null);return(0,l.useFrame)((t,n)=>{if(!s.current)return;if(e.current<.05)c.current+=.12*n;else{let e=((3.213-c.current)%(2*Math.PI)+3*Math.PI)%(2*Math.PI)-Math.PI;c.current+=.05*e}s.current.rotation.y=c.current;let i=e.current,r=u.MathUtils.lerp(1,.026,i);d.current.forEach((e,t)=>{e&&e.scale.setScalar(r*(p===eu[t]?.slug?2.2:1))})}),(0,a.jsxs)("group",{ref:s,children:[(0,a.jsxs)("mesh",{children:[(0,a.jsx)("sphereGeometry",{args:[2,64,64]}),(0,a.jsx)("meshStandardMaterial",{color:t?"#8B0020":"#6B0019",roughness:.85,metalness:.1})]}),(0,a.jsx)(eh,{isZoomed:t}),(0,a.jsxs)("mesh",{children:[(0,a.jsx)("sphereGeometry",{args:[2.006,t?48:24,t?32:16]}),(0,a.jsx)("meshBasicMaterial",{color:t?"#DC143C":"#A80026",wireframe:!0,transparent:!0,opacity:t?.28:.22})]}),t&&(0,a.jsxs)("mesh",{children:[(0,a.jsx)("sphereGeometry",{args:[2.003,32,16]}),(0,a.jsx)("meshBasicMaterial",{color:"#e0f0f8",transparent:!0,opacity:.07})]}),!t&&(0,a.jsxs)("mesh",{position:em(28.2,84.5,2.02),children:[(0,a.jsx)("sphereGeometry",{args:[.32,24,24]}),(0,a.jsx)("meshBasicMaterial",{color:"#DC143C",transparent:!0,opacity:.25})]}),!t&&ep.map(e=>{let t=p===e.name;return(0,a.jsxs)("group",{position:em(e.lat,e.lon,2.05),children:[(0,a.jsxs)("mesh",{onPointerOver:t=>{t.stopPropagation(),m(e.name),document.body.style.cursor="pointer"},onPointerOut:()=>{m(null),document.body.style.cursor="auto"},onClick:t=>{t.stopPropagation(),n(e.name)},children:[(0,a.jsx)("sphereGeometry",{args:[.07,16,16]}),(0,a.jsx)("meshBasicMaterial",{color:t?"#6B8FFF":"#4169E1"})]}),t&&(0,a.jsx)(C,{center:!0,style:{pointerEvents:"none"},children:(0,a.jsx)("div",{style:{fontSize:"11px",fontWeight:700,whiteSpace:"nowrap",background:"#003893",color:"#ffffff",padding:"3px 8px",borderRadius:"999px",fontFamily:"Montserrat, sans-serif",pointerEvents:"none",userSelect:"none",boxShadow:"0 2px 6px rgba(0,0,0,0.35)"},children:e.name})})]},e.name)}),t&&eu.map((e,t)=>{let n=p===e.slug;return(0,a.jsxs)("group",{ref:e=>{d.current[t]=e},position:em(e.lat,e.lon,2.025),children:[(0,a.jsxs)("mesh",{children:[(0,a.jsx)("sphereGeometry",{args:[.07,14,14]}),(0,a.jsx)("meshBasicMaterial",{color:n?"#6B8FFF":"#4169E1"})]}),n&&(0,a.jsxs)("mesh",{children:[(0,a.jsx)("ringGeometry",{args:[.09,.12,20]}),(0,a.jsx)("meshBasicMaterial",{color:"#6B8FFF",transparent:!0,opacity:.4,side:u.DoubleSide})]}),(0,a.jsx)(C,{center:!0,style:{pointerEvents:"none"},children:(0,a.jsx)("div",{style:{transform:"translateY(-20px)",fontSize:"9px",fontFamily:"Montserrat, sans-serif",fontWeight:600,color:n?"#C5D5FF":"rgba(255,255,255,0.75)",whiteSpace:"nowrap",background:"rgba(26,5,8,0.82)",padding:"1px 6px",borderRadius:"4px",pointerEvents:"none",userSelect:"none"},children:e.label})}),(0,a.jsxs)("mesh",{onPointerOver:t=>{t.stopPropagation(),m(e.slug),r(e),document.body.style.cursor="pointer"},onPointerOut:()=>{m(null),r(null),document.body.style.cursor="auto"},onClick:t=>{t.stopPropagation(),i(e.slug)},children:[(0,a.jsx)("sphereGeometry",{args:[.12,8,8]}),(0,a.jsx)("meshBasicMaterial",{transparent:!0,opacity:0,depthWrite:!1})]})]},e.slug)})]})}function ex({trek:e,onClose:t}){return(0,a.jsx)(es.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur-sm",onClick:t,children:(0,a.jsxs)(es.motion.div,{initial:{scale:.88,y:18},animate:{scale:1,y:0},exit:{scale:.88,y:18},transition:{type:"spring",stiffness:300,damping:24},className:"relative mx-4 w-full max-w-[320px] overflow-hidden rounded-2xl bg-green-900 shadow-2xl",onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)("div",{className:"relative aspect-[4/3] w-full overflow-hidden",children:[(0,a.jsx)("img",{src:e.image,alt:e.name,className:"h-full w-full object-cover"}),(0,a.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/20 to-transparent"}),(0,a.jsx)("button",{onClick:t,className:"absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors",children:(0,a.jsx)(ec.CloseIcon,{width:16,height:16})}),(0,a.jsx)("span",{className:"absolute left-3 top-3 rounded-full bg-snow px-2.5 py-0.5 font-montserrat text-[10px] font-bold text-green-900",children:e.difficulty})]}),(0,a.jsxs)("div",{className:"p-5",children:[(0,a.jsxs)("p",{className:"font-montserrat text-[10px] uppercase tracking-widest text-amber-400",children:[e.region," Region"]}),(0,a.jsx)("h3",{className:"mt-1 font-playfair text-xl font-bold leading-tight text-snow",children:e.name}),(0,a.jsx)("p",{className:"mt-2 line-clamp-2 font-lato text-sm leading-relaxed text-snow/65",children:e.blurb}),(0,a.jsxs)("div",{className:"mt-3 flex flex-wrap gap-3 font-montserrat text-[11px] text-snow/55",children:[(0,a.jsxs)("span",{className:"inline-flex items-center gap-1",children:[(0,a.jsx)(ec.ClockIcon,{width:13,height:13,className:"text-amber-400"}),e.days," days"]}),(0,a.jsxs)("span",{className:"inline-flex items-center gap-1",children:[(0,a.jsx)(ec.AltitudeIcon,{width:13,height:13,className:"text-amber-400"}),e.maxAltitude.toLocaleString()," m"]}),(0,a.jsxs)("span",{className:"font-semibold text-amber-300",children:["From $",e.price.toLocaleString()]})]}),(0,a.jsxs)(ed.default,{href:`/treks/${e.slug}`,className:"mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-snow py-2.5 font-montserrat text-xs font-bold text-green-900 hover:bg-stone-100 transition-colors",children:["View Full Itinerary ",(0,a.jsx)(ec.ArrowRight,{width:14,height:14})]})]})]})})}e.s(["default",0,function({onSelect:e}){let t=(0,o.useRef)(0),n=(0,o.useRef)(null),[i,r]=(0,o.useState)(0),[l,c]=(0,o.useState)(null),[d,u]=(0,o.useState)(null),p=(0,o.useRef)(null),m=i>.45,f=l?el.treks.find(e=>e.slug===l)??null:null;(0,o.useEffect)(()=>{let e=p.current;if(!e)return;let n=e=>{e.preventDefault();let n=Math.max(0,Math.min(1,t.current+(e.deltaY>0?-.1:.1)));t.current=n,r(n)};return e.addEventListener("wheel",n,{passive:!1}),()=>e.removeEventListener("wheel",n)},[]);let h=(0,o.useCallback)(()=>{t.current=0,r(0)},[]);return(0,a.jsxs)("div",{ref:p,className:"relative h-full w-full",children:[(0,a.jsx)(eo.AnimatePresence,{children:!m&&(0,a.jsxs)(es.motion.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:6},transition:{delay:.6},className:"pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 rounded-full bg-green-900/75 px-4 py-2 backdrop-blur-sm",children:[(0,a.jsxs)("svg",{width:"14",height:"20",viewBox:"0 0 14 20",fill:"none",className:"text-snow/70",children:[(0,a.jsx)("rect",{x:"1",y:"1",width:"12",height:"18",rx:"6",stroke:"currentColor",strokeWidth:"1.5"}),(0,a.jsx)(es.motion.rect,{x:"5.5",y:"4",width:"3",height:"5",rx:"1.5",fill:"currentColor",animate:{y:[4,8,4]},transition:{duration:1.4,repeat:1/0,ease:"easeInOut"}})]}),(0,a.jsx)("span",{className:"font-montserrat text-[11px] text-snow/80",children:"Scroll to zoom into Nepal"})]})}),(0,a.jsx)(eo.AnimatePresence,{children:m&&(0,a.jsxs)(es.motion.button,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},onClick:h,className:"absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-green-900/90 px-3 py-1.5 font-montserrat text-[11px] text-snow/80 backdrop-blur-sm hover:bg-green-800 transition-colors",children:[(0,a.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",children:(0,a.jsx)("path",{d:"M8 2L4 6l4 4",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})}),"Back to globe"]})}),(0,a.jsx)(eo.AnimatePresence,{children:m&&d&&(0,a.jsxs)(es.motion.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:6},className:"pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-3 rounded-full bg-green-900/90 px-4 py-2 backdrop-blur-sm",children:[(0,a.jsx)("span",{className:"h-2 w-2 rounded-full bg-sky-200"}),(0,a.jsx)("span",{className:"font-montserrat text-[11px] font-semibold text-snow",children:d.label}),(0,a.jsxs)("span",{className:"font-montserrat text-[10px] text-snow/60",children:[d.alt.toLocaleString()," m · click to view"]})]})}),(0,a.jsxs)(s.Canvas,{camera:{position:[0,0,6],fov:45},dpr:[1,1.8],gl:{alpha:!0},children:[(0,a.jsx)("ambientLight",{intensity:.8}),(0,a.jsx)("directionalLight",{position:[5,3,5],intensity:1.4,color:"#FFE0E0"}),(0,a.jsx)(eg,{zoomRef:t,controlsRef:n}),(0,a.jsx)(ev,{zoomRef:t,isZoomed:m,onRegionSelect:t=>e?.(t),onTrekSelect:t=>{c(t),e?.(t)},onHover:u}),(0,a.jsx)(w,{ref:n,enableZoom:!1,enablePan:!1,minDistance:6,maxDistance:6,minPolarAngle:Math.PI/4,maxPolarAngle:Math.PI/1.5})]}),(0,a.jsx)(eo.AnimatePresence,{children:f&&(0,a.jsx)(ex,{trek:f,onClose:()=>c(null)})})]})}],55286)},69644,e=>{e.n(e.i(55286))}]);