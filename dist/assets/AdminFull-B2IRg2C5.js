import{h as p,o as s,c as n,a as c,d as a,e as r,g as o,n as l,f as e,R as i,F as u,j as g,t as A,k as v,l as b}from"./index-BWHCkEjI.js";import{_ as x}from"./logo-BmB820fz.js";const F={class:"AdminMenu"},$=c("img",{class:"logo",src:x,alt:"logo"},null,-1),k={class:"menu-box"},R={__name:"AdminMenu",setup(m){const t=p();return(_,h)=>(s(),n("div",F,[$,c("div",k,[a(e(i),{class:l([{active:e(t).name==="AdminDefectiveUtilization"}]),to:{name:"AdminDefectiveUtilization"}},{default:r(()=>[o("不良率與稼動率統計")]),_:1},8,["class"]),a(e(i),{class:l([{active:e(t).name==="AdminFormingMachineFailureHistory"}]),to:{name:"AdminFormingMachineFailureHistory"}},{default:r(()=>[o("成型機故障履歷的統計")]),_:1},8,["class"]),a(e(i),{class:l([{active:e(t).name==="AdminReport"}]),to:{name:"AdminReport"}},{default:r(()=>[o("報表下載")]),_:1},8,["class"])])]))}},y={class:"AdminHeader"},H={class:"breadcrumb-box"},V={key:0,class:"fa fa-angle-right","aria-hidden":"true"},M={__name:"AdminHeader",setup(m){const t=p();return(_,h)=>(s(),n("header",y,[c("div",H,[(s(!0),n(u,null,g(e(t).meta.breadcrumb,(f,d)=>(s(),n(u,{key:"breadcrumb"+d},[o(A(f)+" ",1),d+1<e(t).meta.breadcrumb.length?(s(),n("i",V)):v("",!0)],64))),128))]),c("div",null,[a(e(i),{class:"logout me-2",to:{name:"AppHome"}},{default:r(()=>[o("回平台選擇")]),_:1}),a(e(i),{class:"logout",to:{name:"Login"}},{default:r(()=>[o("登出")]),_:1})])]))}},N={class:"AdminFull"},w={class:"wrapper"},C={__name:"AdminFull",setup(m){return(t,_)=>(s(),n("div",N,[a(R),a(M),c("div",w,[a(e(b))])]))}};export{C as default};
