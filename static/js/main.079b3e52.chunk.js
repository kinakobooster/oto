(this.webpackJsonpreactone=this.webpackJsonpreactone||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},19:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),c=n.n(o),s=(n(19),n(9)),u=n(10),l=n(2),i=n(12),h=n(13),d=n(1),m=(n(7),n(3)),p=function(e){return r.a.createElement("a",{onClick:e.deleteCard,className:"chordcard".concat(e.dead?" dead":"")},r.a.createElement("h3",{className:"chordname"},e.chordName),e.array.concat().reverse().map((function(e){return r.a.createElement("div",{className:"notes"},e)})))},f=n(5),v=n(11),y=n.n(v),b=(new m.PolySynth).toMaster(),N=function(e){return m.Frequency("C3").transpose(e).toNote()},E=function(e,t){return m.Frequency(t).transpose(e).toNote()},g="C3";m.Transport.bpm.value=144;var k=[0,2,4,5,7,9,11],S=k.map((function(e){return E(e,"C3")})),O=(g=k.map((function(e){return E(e,g)})),{octave:[-12,0,12],_:[0,4,7],_M7:[0,4,7,11],_7:[0,4,7,10],_add9:[0,4,7,14],m:[0,3,7],mM7:[0,3,7,11],m7:[0,3,7,10]}),j=function(e,t){var n=O.octave.map((function(e){return e+t-12})),a=n.map((function(t){return Math.abs(t-e)}));return n[a.indexOf(Math.min.apply(null,a))]},C=function(e,t){var n=[],a=t;n.push(a);for(var r=1;r<t.length;r++){var o=[].concat(Object(d.a)(a.slice(0,r).map((function(e){return e+12}))),Object(d.a)(a.slice(r)));n.push(o)}var c=n.map((function(e){return e.map((function(e){return e+12}))})),s=n.map((function(e){return e.map((function(e){return e-12}))}));return n.push.apply(n,Object(d.a)(c)),n.push.apply(n,Object(d.a)(s)),n},M=function(e){for(var t=Math.min.apply(Math,Object(d.a)(e)),n=Math.max.apply(Math,Object(d.a)(e)),a=[],r=t;r<=n;++r)a.push(r);return a},w=function(e,t){return e.filter((function(e){return t.includes(e)})).length},D=function(e){var t=S.map((function(e){return e.slice(0,-1)}));return 0===e.map((function(e){return e.slice(0,-1)})).filter((function(e){return!t.includes(e)})).length},P=function(e){Object(h.a)(n,e);var t=Object(i.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={isPlay:!1,score:[],played:[]},a.pushToScore=a.pushToScore.bind(Object(l.a)(a)),a.handleLoop=a.handleLoop.bind(Object(l.a)(a)),a.handleDelete=a.handleDelete.bind(Object(l.a)(a)),a.handleDrop=a.handleDrop.bind(Object(l.a)(a)),a.loop(),a}return Object(u.a)(n,[{key:"handleLoop",value:function(){(new m.PolySynth).toMaster();this.setState({isPlay:!this.state.isPlay}),this.state.isPlay&&0===this.state.score.length&&this.setState({score:this.state.played,played:[]})}},{key:"pushToScore",value:function(e,t,n){this.setState({score:[].concat(Object(d.a)(this.state.score),[{sound:e,noteNum:t,chordName:n}])})}},{key:"soundFromStack",value:function(){if(0!==this.state.score.length){var e=this.state.score,t=e.shift();a=t.sound,b.triggerAttackRelease(a,"2n");var n=this.state.played;n.push(t),this.setState({score:e,played:n})}var a}},{key:"loop",value:function(){var e=this;setInterval((function(){e.state.isPlay&&(console.log("beats!"),e.soundFromStack())}),2/144*60*1e3)}},{key:"handleDelete",value:function(e,t){if("played"===t){var n=this.state.played;n.splice(e,1),this.setState({played:n})}else{var a=this.state.score;a.splice(e,1),this.setState({score:a})}}},{key:"handleDrop",value:function(e){var t=e.removedIndex,n=e.addedIndex;e.payload;if(!this.state.isPlay&&(null!==t||null!==n)){var a=this.state.score,r=a[t];a.splice(t,1),a.splice(n,0,r),console.log(a),this.setState({score:a})}}},{key:"render",value:function(){var e,t,n,a,o=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"\u30b3\u30fc\u30c9"),r.a.createElement("h2",null,"\u518d\u751f\u30fb\u505c\u6b62"),r.a.createElement("button",{onClick:function(){return o.handleLoop()}},this.state.isPlay?"stop":"start"),r.a.createElement("h2",null,"score"),r.a.createElement("div",{className:"yoko scoreboard"},(e=this.state.score,t=this.state.played,n=this.handleDelete,a=this.handleDrop,r.a.createElement("div",{className:"flex"},r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement(p,{dead:!0,chordName:e.chordName,array:e.sound,deleteCard:function(){return n(t,"played")}})}))),r.a.createElement(f.Container,{onDrop:function(e){return a(e)},orientation:"horizontal"},e.map((function(e,t){return r.a.createElement(f.Draggable,{key:y()()},r.a.createElement(p,{chordName:e.chordName,array:e.sound,deleteCard:function(){return n(t,"score")}}))})))))),r.a.createElement("h2",null,"note"),S.map((function(e){return r.a.createElement("button",{onClick:function(){return t=e,b.triggerAttackRelease(t,"4n");var t}},e)})),r.a.createElement("h2",null,"\u52dd\u624b\u306b\u8fd1\u3044\u8ee2\u56de\u5f62\u3092\u3048\u3089\u3073\u307e\u3059"),k.map((function(e){var t=function(e){for(var t=[],n=0,a=Object.keys(O);n<a.length;n++){var r=a[n];t.push({chordRootNum:e,chordSeed:O[r].map((function(t){return t+e})),chordName:N(e).slice(0,1)+r})}return t}(e);return r.a.createElement("div",null,t.map((function(e){var t=function(e){var t=e.beforeChordArr,n=void 0===t?[]:t,a=e.chordRootNum,r=e.chordSeed,o=e.chordName;e.onChord;if(0===n.length){var c=[a-12].concat(Object(d.a)(r));return{chordName:o,notesNum:c,notes:c.map((function(e){return N(e)}))}}n.sort((function(e,t){return e-t}));var s=n.slice(0,1),u=j(s,a),l=C(a,r),i=M(n.slice(1)),h=l.map((function(e){return w(i,M(e))})),m=l[h.indexOf(Math.max.apply(null,h))],p=[u].concat(Object(d.a)(m)).sort((function(e,t){return e-t}));return{chordName:o,notesNum:p,notes:p.map((function(e){return N(e)}))}}({beforeChordArr:0===o.state.score.length?[]:o.state.score.slice(-1)[0].noteNum,chordRootNum:e.chordRootNum,chordSeed:e.chordSeed,chordName:e.chordName});return r.a.createElement("button",{className:D(e.chordSeed.map((function(e){return N(e)})))?"diatonic":"",onClick:function(){return o.pushToScore(t.notes,t.notesNum,t.chordName)}},t.chordName)})))})))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){}},[[14,1,2]]]);
//# sourceMappingURL=main.079b3e52.chunk.js.map