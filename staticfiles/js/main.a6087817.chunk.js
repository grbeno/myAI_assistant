(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(23)},23:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),o=n(9),l=n.n(o),r=n(4),u=n(25);var i=function(){var e=c.a.useState([]),t=Object(r.a)(e,2),n=t[0],a=t[1];return c.a.useEffect(function(){u.a.get("http://localhost:8000/app/").then(function(e){a(e.data)}).catch(function(e){console.log(e)})},[]),c.a.createElement("div",null,n.map(function(e){return c.a.createElement("div",{key:e.id,style:{paddingLeft:"1%"}},c.a.createElement("h1",null,e.title),c.a.createElement("span",null,e.body))}))};l.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(i,null)))}},[[10,2,1]]]);
//# sourceMappingURL=main.a6087817.chunk.js.map