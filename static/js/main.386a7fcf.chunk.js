(this.webpackJsonpreactone=this.webpackJsonpreactone||[]).push([[0],{11:function(e,t,n){e.exports=n(17)},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(5),c=n.n(o),i=(n(16),n(8)),s=n(6),u=n(7),l=n(2),m=n(9),h=n(10),f=(n(4),n(1)),d=function(e){return r.a.createElement("div",{className:"chordcard"},r.a.createElement("h3",{className:"chordname"},e.chordName),e.array.reverse().map((function(e){return r.a.createElement("div",{className:"notes"},e)})))},p=(new f.PolySynth).toMaster(),v=function(e,t){return f.Frequency(t).transpose(e).toNote()},E="C3";f.Transport.bpm.value=144;var b=[0,2,4,5,7,9,11],k=b.map((function(e){return v(e,"C3")})),y=(E=b.map((function(e){return v(e,E)})),function(e,t){return f.Frequency(e).harmonize(t).map((function(e){return e.toNote()}))}),N=function(e){var t=k.map((function(e){return e.slice(0,-1)}));return 0===e.map((function(e){return e.slice(0,-1)})).filter((function(e){return!t.includes(e)})).length},S=function(e){Object(h.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={isPlay:!1,score:new Array},a.pushToScore=a.pushToScore.bind(Object(l.a)(a)),a.handleLoop=a.handleLoop.bind(Object(l.a)(a)),a.loop(),a}return Object(u.a)(n,[{key:"handleLoop",value:function(){this.setState({isPlay:!this.state.isPlay})}},{key:"pushToScore",value:function(e,t){this.setState({score:[].concat(Object(i.a)(this.state.score),[{chordName:t,sound:e}])})}},{key:"soundFromStack",value:function(){if(0!==this.state.score.length){var e=this.state.score;t=e.shift().sound,p.triggerAttackRelease(t,"2n"),this.setState({score:e})}var t}},{key:"loop",value:function(){var e=this;setInterval((function(){e.state.isPlay&&(console.log("beats!"),e.soundFromStack())}),2/144*60*1e3)}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return e.handleLoop()}},this.state.isPlay?"stop":"start"),r.a.createElement("h2",null,"score"),r.a.createElement("div",{className:"flex scoreboard"},this.state.score.map((function(e){return r.a.createElement(d,{chordName:e.chordName,array:e.sound})}))),r.a.createElement("h2",null,"note"),k.map((function(e){return r.a.createElement("button",{onClick:function(){return t=e,p.triggerAttackRelease(t,"4n");var t}},e)})),r.a.createElement("h2",null,"major chord"),k.map((function(t){var n=y(t,[-12,0,4,7]),a=function(e){return y(e,[-12,4,7,12])}(t),o=function(e){return y(e,[-12,7,12,16])}(t),c=function(e){return y(e,[-12,0,4,7,11])}(t),i=function(e){return y(e,[-12,0,4,9,14])}(t);return r.a.createElement("div",null,r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(n,t.slice(0,1))}},t.slice(0,1)),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(a,t.slice(0,1))}},t.slice(0,1),".2iv"),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(o,t.slice(0,1))}},t.slice(0,1),".3iv"),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(c,t.slice(0,1)+"7")}},t.slice(0,1),"7"),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(i,t.slice(0,1)+"9")}},t.slice(0,1),"9"))})),r.a.createElement("h2",null,"minor chord"),k.map((function(t){var n=y(t,[-12,0,3,7]),a=function(e){return y(e,[-12,3,7,12])}(t),o=function(e){return y(e,[-12,7,12,15])}(t);return r.a.createElement("div",null,r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(n,t.slice(0,1)+"m")}},t.slice(0,1),"m"),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(a,t.slice(0,1)+"m")}},t.slice(0,1),"m.2iv"),r.a.createElement("button",{className:N(n)?"diatonic":"",onClick:function(){return e.pushToScore(o,t.slice(0,1)+"m")}},t.slice(0,1),"m.3iv"))})))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},4:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.386a7fcf.chunk.js.map