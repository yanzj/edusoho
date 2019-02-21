webpackJsonp([14],{Jpvt:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),i=s.n(a),o=s("NYxO"),n={props:["data","index","active"],computed:{couponEndDate:function(){return this.data.deadline.slice(0,10)},couponType:function(){var t=this.data.targetId?"指定":"全部";switch(this.data.targetType){case"course":return t+"课程";case"classroom":return t+"班级";case"vip":return t+"会员课程";default:return"全部"}},getNuminteger:function(){return parseInt(this.data.rate)},getNumPoint:function(){var t="discount"===this.data.type?"折":"元";return Number(this.data.rate).toFixed(2).split(".")[1]+t}},data:function(){return{activeIndex:this.active,discount:"discount"===this.data.type,type:this.data.type}},methods:{onChange:function(t){this.$emit("chooseItem",{index:t,itemData:this.data})}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"coupon-container"},[s("div",{class:[{active:t.active===t.index},"coupon-item",t.type],on:{click:function(e){t.onChange(t.index)}}},[s("div",{staticClass:"coupon-border-box"},[s("div",{class:["rate-number",{"text-26":t.getNuminteger>1e3}]},[t._v("\n        "+t._s(t.getNuminteger)),s("span",{staticClass:"text-16"},[t._v("."+t._s(t.getNumPoint))])]),t._v(" "),s("div",{staticClass:"coupon-info"},[s("div",{staticClass:"title text-overflow"},[t._v("优惠券")]),t._v(" "),s("div",{staticClass:"grey-medium"},[t._v("有效期截止："+t._s(t.couponEndDate))]),t._v(" "),s("span",{staticClass:"grey-medium"},[t._v("可用范围："+t._s(t.couponType))])]),t._v(" "),s("i",{staticClass:"h5-icon h5-icon-checked-circle coupon-checked"})])])])},staticRenderFns:[]},r=s("VU/8")(n,c,!1,null,null,null).exports,u=s("oHlh"),l=s("gyMJ"),d={components:{eCourse:u.a,coupon:r},data:function(){return{course:{availableCoupons:[],courseSet:{cover:{}}},activeItemIndex:-1,showList:!1,itemData:null,couponNumber:0}},computed:i()({},Object(o.mapState)({isLoading:function(t){return t.isLoading}}),{total:function(){if(!this.itemData)return this.course.totalPrice;var t="minus"===this.itemData.type,e=this.itemData.rate,s=this.course.totalPrice;return t?Math.max(s-e,0).toFixed(2):Number(s*e*.1).toFixed(2)},couponMoney:function(){if(this.itemData){var t="discount"===this.itemData.type,e=this.itemData.rate;return t&&(e=Number(this.course.totalPrice-this.course.totalPrice*this.itemData.rate*.1).toFixed(2)),this.couponNumber=e,e}},couponShow:function(){return this.couponNumber?"-￥"+this.couponNumber:this.course.availableCoupons.length+"张可用"},getValidity:function(){return this.$route.query.expiry||"永久有效"}}),created:function(){var t=this;l.a.confirmOrder({data:{targetType:"course",targetId:this.$route.params.id}}).then(function(e){t.course=e})},methods:{handleSubmit:function(){var t=this,e=this.$route.params.id;0!=this.total?this.$router.push({name:"pay",query:{id:e},params:{couponCode:this.itemData?this.itemData.code:""}}):l.a.createOrder({data:{targetType:"course",targetId:e,isOrderCreate:1,couponCode:this.itemData?this.itemData.code:""}}).then(function(){t.$router.push({path:"/course/"+e})})},disuse:function(){this.showList=!1,this.activeItemIndex=-1,this.itemData=null,this.couponNumber=0},chooseItem:function(t){this.activeItemIndex=t.index,this.itemData=t.itemData,this.showList=!1}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order"},[s("div",{staticClass:"goods-info"},[t.isLoading?s("e-loading"):t._e(),t._v(" "),Object.keys(t.course).length>0?s("e-course",{attrs:{type:"confirmOrder",order:t.course,course:t.course}}):t._e(),t._v(" "),s("div",{staticClass:"order-coupon"},[s("div",{staticClass:"coupon-column",attrs:{"chosen-coupon":t.activeItemIndex},on:{click:function(e){t.showList=!0}}},[s("span",[t._v("优惠券")]),t._v(" "),s("span",{staticClass:"red"},[t._v(t._s(t.couponShow))])]),t._v(" "),s("van-popup",{attrs:{position:"bottom",overlay:!1},model:{value:t.showList,callback:function(e){t.showList=e},expression:"showList"}},[s("van-nav-bar",{staticClass:"nav-bar",attrs:{title:"优惠券","left-arrow":!0},on:{"click-left":t.disuse}}),t._v(" "),s("div",{class:["btn-coupon-exit",{active:t.activeItemIndex<0}],on:{click:t.disuse}},[t._v("不使用优惠\n          "),s("i",{staticClass:"h5-icon h5-icon-circle"}),t._v(" "),s("i",{staticClass:"h5-icon h5-icon-checked-circle"})]),t._v(" "),t._l(t.course.availableCoupons,function(e,a){return s("coupon",{key:a,attrs:{data:e,index:a,active:t.activeItemIndex},on:{chooseItem:t.chooseItem}})}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.course.availableCoupons.length,expression:"!course.availableCoupons.length"}],staticClass:"coupon-empty"},[s("img",{staticClass:"empty-img",attrs:{src:"static/images/coupon_empty.png"}}),t._v(" "),s("div",{staticClass:"empty-text"},[t._v("暂无优惠券")])])],2)],1),t._v(" "),s("div",{staticClass:"order-goods-item"},[s("span",[t._v("学习有效期")]),t._v(" "),s("span",{staticClass:"gray-dark"},[t._v(t._s(t.getValidity))])])],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.itemData,expression:"itemData"}],staticClass:"order-accounts"},[s("div",{staticClass:"mb20 title-18"},[t._v("结算")]),t._v(" "),s("div",{staticClass:"flex-between-item"},[s("span",{staticClass:"mbl"},[t._v("商品价格：")]),t._v(" "),s("span",{staticClass:"red"},[t._v("￥ "+t._s(t.course.totalPrice))])]),t._v(" "),s("div",{staticClass:"flex-between-item"},[s("span",{staticClass:"mbl"},[t._v("优惠券：")]),t._v(" "),s("span",{staticClass:"red"},[t._v("-￥ "+t._s(t.couponMoney))])]),t._v(" "),s("div",{staticClass:"flex-between-item"},[s("span",{staticClass:"mbl"},[t._v("应付：")]),t._v(" "),s("span",{staticClass:"red"},[t._v("￥ "+t._s(t.total))])])]),t._v(" "),s("van-button",{staticClass:"order-submit-bar submit-btn",attrs:{size:"small"},on:{click:t.handleSubmit}},[t._v("应付￥ "+t._s(t.total))])],1)},staticRenderFns:[]},p=s("VU/8")(d,v,!1,null,null,null);e.default=p.exports}});