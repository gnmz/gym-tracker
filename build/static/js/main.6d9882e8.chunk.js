(this["webpackJsonpgym-tracker.js"]=this["webpackJsonpgym-tracker.js"]||[]).push([[0],{23:function(e,t,a){e.exports=a(41)},28:function(e,t,a){},29:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(20),s=a.n(i),c=(a(28),a(1)),o=a(2),l=a(4),m=a(3),u=a(5),p=(a(29),a(7)),h=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"header"},"http://localhost:3000/"===window.location.href?r.a.createElement("h1",{className:"header__title"},"Gym's Tracker"):r.a.createElement(p.b,{to:"/main"},r.a.createElement("h1",{className:"header__title"},"Gym's Tracker")))}}]),a}(n.Component),d=a(22),f=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.workoutName,a=e.onClick;return r.a.createElement("button",{className:"create-train-workout-list__button",onClick:a},t)}}]),a}(n.Component),g=(a(35),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.title,a=e.description,n=e.onClick;return r.a.createElement("div",{className:"create-train-program-item__description"},r.a.createElement("div",{className:"create-train-program-item__description-info"},r.a.createElement("h5",{className:"create-train-program-item__description-info-title"},t),r.a.createElement("p",{className:"create-train-program-item__description-info-text"},a,"some text")),r.a.createElement("button",{className:"create-train-program-item__description-close",onClick:n},"x"))}}]),a}(n.Component)),_=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={categoryOfExercises:[],exercisesList:[],createTrain:[],savedTrain:[],trainDate:"",trainName:"",numberOfExercises:1,isClicked:!1,showDescription:!1,description:""},e.getCategoryOfExercises=function(){fetch("http://localhost:3001/categories").then((function(e){return e.json()})).then((function(t){return e.setState({categoryOfExercises:t})}))},e.getExercisesList=function(t){fetch("http://localhost:3001/excersise?categoryId=".concat(t)).then((function(e){return e.json()})).then((function(t){return e.setState({exercisesList:t})}))},e.addWorkout=function(t){var a=Object(d.a)(e.state.createTrain);a.push({id:e.state.numberOfExercises++,excersise_name:t,plan_rep:"",plan_weight:"",fact_rep:"",fact_weight:"",description:""}),e.setState({createTrain:a})},e.recordTrain=function(){e.setState({savedTrain:{date:e.state.trainDate,title:e.state.trainName,excersises:JSON.stringify(e.state.createTrain),comment:"",is_completed:!1},isClicked:!0},(function(){fetch("http://localhost:3001/trains",{method:"POST",headers:{"Content-type":"application/json",token:localStorage.getItem("token")},body:JSON.stringify(e.state.savedTrain)})}))},e.handleNumberRepetitions=function(t,a){var n=a.target.value,r=e.state.createTrain.map((function(e){return e.id===t&&(e.plan_rep=n),e}));e.setState({plan_rep:r.plan_rep})},e.handleworkingWeight=function(t,a){var n=a.target.value,r=e.state.createTrain.map((function(e){return e.id===t&&(e.plan_weight=n),e}));e.setState({plan_weight:r.plan_weight})},e.handleDate=function(t){e.setState({trainDate:t.target.value})},e.handleTrainName=function(t){e.setState({trainName:t.target.value})},e.removeWorkout=function(t){var a=e.state.createTrain.filter((function(e){return e.id!==t}));e.setState({createTrain:a})},e.showDescription=function(t){var a=e.state.createTrain.find((function(e){return e.id===t}));a&&e.setState({showDescription:!0,description:a})},e.closeDescription=function(){e.state.showDescription&&e.setState({showDescription:!1})},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getCategoryOfExercises()}},{key:"render",value:function(){var e=this,t=this.state,a=t.description,n=t.showDescription,i=t.trainDate,s=t.trainName;return r.a.createElement("div",{className:"create-train-page"},r.a.createElement("h2",{className:"create-train-page__title"},"\u0417\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u0443\u0439 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0443"),r.a.createElement("div",{className:"create-train-page__properties"},r.a.createElement("label",{className:"create-train-property"},"\u0414\u0430\u0442\u0430 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438",r.a.createElement("input",{className:"create-train-property__input",type:"text",placeholder:"2020-05-09",value:i,onChange:this.handleDate})),r.a.createElement("label",{className:"create-train-property"},"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438",r.a.createElement("input",{className:"create-train-property__input",type:"text",value:s,onChange:this.handleTrainName}))),r.a.createElement("h2",{className:"create-train-page__title"},"\u0412\u044b\u0431\u0435\u0440\u0438 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044e"),r.a.createElement("div",{className:"create-train-workout-list"},this.state.categoryOfExercises.map((function(t){return r.a.createElement(f,{key:t.id,workoutName:t.title,onClick:function(){e.getExercisesList(t.id)}})}))),this.state.exercisesList.length?r.a.createElement("div",{className:"create-train-excersises"},r.a.createElement("h2",{className:"create-train-page__title"},"\u0412\u044b\u0431\u0435\u0440\u0438 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u0435"),r.a.createElement("div",{className:"create-train-workout-list"},this.state.exercisesList.map((function(t){return r.a.createElement("button",{key:t.id,className:"create-train-workout-list__button",onClick:function(){e.addWorkout(t.title)}},t.title)})))):null,this.state.createTrain.length?r.a.createElement("div",{className:"create-train-program"},r.a.createElement("h2",{className:"create-train-page__title"},"\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438"),this.state.createTrain.map((function(t){return r.a.createElement("div",{className:"create-train-program-item",key:t.id},r.a.createElement("p",{className:"create-train-program-item__title"},t.excersise_name),r.a.createElement("button",{className:"create-train-program-item__description-button",onClick:function(){e.showDescription(t.id)}},"?"),r.a.createElement("label",{className:"create-train-program-item__property"},r.a.createElement("input",{type:"text",className:"create-train-program-item__input",value:t.plan_rep?t.plan_rep:"",onChange:function(a){e.handleNumberRepetitions(t.id,a)}}),"\u0440\u0430\u0437"),r.a.createElement("label",{className:"create-train-program-item__property"},r.a.createElement("input",{type:"text",className:"create-train-program-item__input",value:t.plan_weight?t.plan_weight:"",onChange:function(a){e.handleworkingWeight(t.id,a)}}),"\u043a\u0433"),r.a.createElement("button",{className:"create-train-program-item__remove",onClick:function(){e.removeWorkout(t.id)}},"\u0443\u0434\u0430\u043b\u0438\u0442\u044c"),r.a.createElement("button",{className:"create-train-program-item__remove-altr",onClick:function(){e.removeWorkout(t.id)}},"X"))}))):null,this.state.createTrain.length&&s&&i?this.state.isClicked?r.a.createElement(p.b,{to:"/main"},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0430\u043c"):r.a.createElement("button",{className:"create-train-program__save",onClick:this.recordTrain},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"):null,n?r.a.createElement(g,{title:a.excersise_name,description:a.description,onClick:this.closeDescription}):null)}}]),a}(n.Component),E=(a(36),a(12)),v=a.n(E),N=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.date,a=e.title;return r.a.createElement("div",{className:"choose-train-cart"},r.a.createElement("h3",{className:"choose-train-cart__title"},a),r.a.createElement("p",{className:"choose-train-cart__date"},v()(t).format("DD MMM YYYY")))}}]),a}(n.Component),b=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).logout=function(){fetch("http://localhost:3001/logout",{headers:{token:localStorage.getItem("token")}}).then((function(e){return e.text()})).then((function(){localStorage.removeItem("token"),e.props.history.push("/")}))},e}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"logout"},r.a.createElement("button",{className:"logout-btn",onClick:this.logout},"\u0412\u044b\u0445\u043e\u0434"))}}]),a}(n.Component),y=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={createdTrainingSessions:[]},e.getCreatedTrainingSessinos=function(){fetch("http://localhost:3001/trains?type=plan",{headers:{token:localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(e){return e.sort((function(e,t){return e.DATE>t.DATE?1:-1}))})).then((function(t){e.setState({createdTrainingSessions:t,isLogged:!0})}))},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getCreatedTrainingSessinos()}},{key:"componentDidUpdate",value:function(e,t){t.value!==this.state.value&&this.getCreatedTrainingSessinos()}},{key:"render",value:function(){return r.a.createElement("div",{className:"main-page"},r.a.createElement(b,{history:this.props.history}),r.a.createElement("div",{className:"main-page__choose-action"},r.a.createElement(p.b,{to:"/create-trainig-session"},r.a.createElement("button",{className:"main-page__choose-action-btn"},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0443")),r.a.createElement(p.b,{to:"/train-history"},r.a.createElement("button",{className:"main-page__choose-action-btn"},"\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043e\u043a"))),r.a.createElement("h2",{className:"main-page__title"},"\u0417\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438"),r.a.createElement("div",{className:"main-page__trains"},this.state.createdTrainingSessions.map((function(e){return r.a.createElement(p.b,{to:"/train/".concat(e.id),className:"train-link",key:e.id},r.a.createElement(N,{date:e.DATE,title:e.title}))}))))}}]),a}(n.Component),k=(a(37),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={historyTrainList:[]},e.getTrainingHistoryList=function(){fetch("http://localhost:3001/trains?type=hist",{headers:{token:localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(e){return e.sort((function(e,t){return e.DATE>t.DATE?-1:1}))})).then((function(t){return e.setState({historyTrainList:t})}))},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getTrainingHistoryList()}},{key:"render",value:function(){var e=this.state.historyTrainList;return r.a.createElement("div",{className:"history-page"},r.a.createElement("h2",{className:"history-page__title"},"\u041f\u0440\u043e\u0448\u0435\u0434\u0448\u0438\u0435 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438"),r.a.createElement("div",{className:"history-page__trains"},e.map((function(e){return r.a.createElement(p.b,{to:"/train-history/".concat(e.id),key:e.id},r.a.createElement(N,{date:e.DATE,title:e.title}))}))))}}]),a}(n.Component)),w=a(17),O=(a(38),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={id:"",date:"",title:"",comment:"",is_completed:!1,excersises:[],complite:[],isClicked:!1},e.getCurrentTrain=function(t){fetch("http://localhost:3001/trains/".concat(t),{headers:{token:localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(t){return e.setState({id:t[0].id,date:t[0].DATE,title:t[0].title,excersises:JSON.parse(t[0].excersises)})}))},e.endOfTraining=function(){e.setState({isClicked:!0});var t=Object(w.a)(Object(w.a)({},e.state),{},{excersises:JSON.stringify(e.state.excersises),is_completed:!0});fetch("http://localhost:3001/trains",{method:"PUT",headers:{"Content-type":"application/json"},body:JSON.stringify(t)})},e.handleFactNumberRepetitions=function(t,a){var n=a.target.value,r=e.state.excersises.map((function(e){return e.id===t&&(e.fact_rep=n),e}));e.setState({excersises:r})},e.handleFactWeight=function(t,a){var n=a.target.value,r=e.state.excersises.map((function(e){return e.id===t&&(e.fact_weight=n),e}));e.setState({excersises:r})},e.getComment=function(t){e.setState({comment:t.target.value})},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.getCurrentTrain(e)}},{key:"render",value:function(){var e=this;return console.log(this.state.comment),r.a.createElement("div",{className:"train-page"},r.a.createElement("h2",{className:"train-page__title"},v()(this.state.date).format("DD MMM YYYY"),", ",this.state.title),this.state.excersises.map((function(t){return r.a.createElement("div",{className:"train-page-item",key:t.id},r.a.createElement("p",{className:"train-page-item__title"},t.excersise_name),r.a.createElement("label",{className:"train-page-item__property"},r.a.createElement("input",{type:"text",className:"train-page-item__input",value:t.fact_rep?t.fact_rep:"",onChange:function(a){e.handleFactNumberRepetitions(t.id,a)}}),"/ ",t.plan_rep," \u0440"),t.plan_weight?r.a.createElement("label",{className:"train-page-item__property"},r.a.createElement("input",{type:"text",className:"train-page-item__input",value:t.fact_weight?t.fact_weight:"",onChange:function(a){e.handleFactWeight(t.id,a)}}),"/ ",t.plan_weight," \u043a\u0433"):null)})),r.a.createElement("div",null,r.a.createElement("h2",{className:"train-page__title"},"\u041e\u0441\u0442\u0430\u0432\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439:"),r.a.createElement("textarea",{className:"train-page_text-area",onChange:this.getComment})),this.state.isClicked?r.a.createElement(p.b,{to:"/main"},"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0441\u043f\u0438\u0441\u043a\u0443 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043e\u043a"):r.a.createElement("button",{onClick:this.endOfTraining,className:"train-page_complete-button"},"\u0422\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430"))}}]),a}(n.Component)),C=(a(39),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={id:"",date:"",title:"",comment:"",is_completed:!0,excersises:[]},e.getCurrentPastTrain=function(t){fetch("http://localhost:3001/trains/".concat(t),{headers:{token:localStorage.getItem("token")}}).then((function(e){return e.json()})).then((function(t){return e.setState({date:t[0].DATE,title:t[0].title,excersises:JSON.parse(t[0].excersises),comment:t[0].COMMENT})}))},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.getCurrentPastTrain(e)}},{key:"render",value:function(){var e=this.state,t=e.date,a=e.title,n=e.excersises,i=e.comment;return r.a.createElement("div",{className:"past-train-page"},r.a.createElement("div",{className:"past-train-page__header"},r.a.createElement("h2",{className:"past-train-page__title"},v()(t).format("DD MMM YYYY"),", ",a)),n.map((function(e){return r.a.createElement("div",{className:"past-train-page__item",key:e.id},r.a.createElement("p",{className:"past-train-page__item-title"},e.excersise_name),r.a.createElement("label",{className:"past-train-page__item-property"},e.fact_rep," / ",e.plan_rep," \u0440\u0430\u0437"),e.plan_weight&&e.fact_weight?r.a.createElement("label",{className:"past-train-page__item-property"},e.fact_weight," / ",e.plan_weight," \u043a\u0433"):null)})),r.a.createElement("h2",{className:"past-train-page__title"},"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"),r.a.createElement("p",{className:"past-train-page__comment"},i),r.a.createElement(p.b,{to:"/train-history",className:"past-train-page__link-back"},r.a.createElement("button",{className:"past-train-page__button-back"},"\u0412 \u0438\u0441\u0442\u043e\u0440\u0438\u044e \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043e\u043a")))}}]),a}(n.Component)),j=(a(40),function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={enter:!0,user_login:"",user_password:"",newUserName:"",newUserSurName:"",newUserLogin:"",newUserPassword:"",newUserEmail:"",newUser:[],user:[]},e.clickerHandler=function(t){"aut"===t?e.setState({enter:!0}):"reg"===t&&e.setState({enter:!1})},e.getUserLogin=function(t){e.setState({user_login:t.target.value})},e.getUserPassword=function(t){e.setState({user_password:t.target.value})},e.getnewUserName=function(t){e.setState({newUserName:t.target.value})},e.getnewUserSurName=function(t){e.setState({newUserSurName:t.target.value})},e.getNewUserLogin=function(t){e.setState({newUserLogin:t.target.value})},e.getNewUserPassword=function(t){e.setState({newUserPassword:t.target.value})},e.getNewUserEmail=function(t){e.setState({newUserEmail:t.target.value})},e.registerNewUser=function(){var t=e.state,a=t.newUserName,n=t.newUserSurName,r=t.newUserLogin,i=t.newUserPassword,s=t.newUserEmail;e.setState({newUser:{user_name:a,user_surname:n,user_login:r,user_password:i,user_email:s},enter:!0},(function(){fetch("http://localhost:3001/reg",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e.state.newUser)})}))},e.authentication=function(t,a){e.setState({user:{user_login:t,user_password:a}},(function(){fetch("http://localhost:3001/auth",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e.state.user)}).then((function(t){if(401!==t.status)return t.json();e.props.history.push("/")})).then((function(t){if(void 0===t)alert("\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0432\u0442\u043e\u0440\u043e\u043d\u043e \u043b\u043e\u0433\u0438\u043d \u0438 \u043f\u0430\u0440\u043e\u043b\u044c");else{var a=t.token;localStorage.setItem("token",a),e.props.history.push("/main")}}))}))},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.setState({enter:!0})}},{key:"render",value:function(){var e=this,t=this.state,a=t.enter,n=t.user_login,i=t.user_password,s=t.newUserName,c=t.newUserSurName,o=t.newUserLogin,l=t.newUserPassword,m=t.newUserEmail;return r.a.createElement("div",{className:"auth"},a?r.a.createElement("div",{className:"auth-choose-action"},r.a.createElement("span",{onClick:function(){e.clickerHandler("aut")},className:"auth-choose-action__button active"},"\u0412\u0445\u043e\u0434"),r.a.createElement("span",{onClick:function(){e.clickerHandler("reg")},className:"auth-choose-action__button default"},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")):r.a.createElement("div",{className:"auth-choose-action"},r.a.createElement("span",{onClick:function(){e.clickerHandler("aut")},className:"auth-choose-action__button default"},"\u0412\u0445\u043e\u0434"),r.a.createElement("span",{onClick:function(){e.clickerHandler("reg")},className:"auth-choose-action__button active"},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f")),a?r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"Login:"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",className:"auth-form-item__input",onChange:this.getUserLogin,value:n}))),r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"Password:"),r.a.createElement("div",null,r.a.createElement("input",{type:"password",className:"auth-form-item__input",onChange:this.getUserPassword,value:i}))),r.a.createElement("button",{className:"auth-form-btn",onClick:function(){e.authentication(n,i)},disabled:!n||!i},"\u0412\u0445\u043e\u0434"))):r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"\u0418\u043c\u044f:"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",className:"auth-form-item__input",onChange:this.getnewUserName,value:s}))),r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"\u0424\u0430\u043c\u0438\u043b\u0438\u044f:"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",className:"auth-form-item__input",onChange:this.getnewUserSurName,value:c}))),r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"Login:"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",className:"auth-form-item__input",onChange:this.getNewUserLogin,value:o}))),r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"Password:"),r.a.createElement("div",null,r.a.createElement("input",{type:"password",className:"auth-form-item__input",onChange:this.getNewUserPassword,value:l}))),r.a.createElement("div",{className:"auth-form-item"},r.a.createElement("label",{className:"auth-form-item__title"},"E-mail:"),r.a.createElement("div",null,r.a.createElement("input",{type:"text",className:"auth-form-item__input",onChange:this.getNewUserEmail,value:m})))),r.a.createElement("button",{className:"auth-form-btn",onClick:this.registerNewUser,disabled:!o||!l||!m},"\u0417\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f")))}}]),a}(n.Component)),S=function(e){Object(l.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(h,null),r.a.createElement(u.a,{path:"/",exact:!0,component:j}),r.a.createElement(u.a,{path:"/main",exact:!0,component:y}),r.a.createElement(u.a,{path:"/create-trainig-session",component:_}),r.a.createElement(u.a,{path:"/train-history",exact:!0,component:k}),r.a.createElement(u.a,{path:"/train/:id",exact:!0,component:O}),r.a.createElement(u.a,{path:"/train-history/:id",exact:!0,component:C}))}}]),a}(n.Component);s.a.render(r.a.createElement(p.a,null,r.a.createElement(S,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.6d9882e8.chunk.js.map