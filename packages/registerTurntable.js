import Vue from 'vue';

import turntableComponent from './turntable';

const turntableConstructor = Vue.extend(turntableComponent);

function turnTable({
    lotteryList = [], //奖品列表
	oddBgColor = '#fff', //奇数块颜色
	evenBgColor = '#f1deff',//偶数块颜色
	thirdBgColor = '#dcf8fe', //奖品数量为奇数时第三块倍数的颜色，防止第一和最后一块颜色相同
	oX = 129,//圆心X坐标
	oY = 129,//圆心Y坐标
	radius = 129,//转盘半径
	duration = 2000,//旋转时长
	className = '',//自定义类名
	targetContainer = null,//目标容器
	lotteryStart = () => {},//开始抽奖回调函数
	lotteryEnd = () => {},//抽奖结束回调函数
	slotScoped = () => {}
}={}){
	//新建canvas对象
	const dateTag = new Date() / 1;
	//绘制环形跑马灯转盘背景
	const drawTurnTable = () => {
		//获取canvas对象
		const canvasObj = document.getElementById(`canvas__${dateTag}`);
		let ctx = canvasObj.getContext("2d");
		//画圆的起始角度
		let initAngle = -90;
		//循环画扇形拼合成圆形
		for(let i = 0;i < lotteryList.length; i++){
			let startAngle = initAngle * Math.PI/180;//起始弧度
			let angle = 360 / lotteryList.length;
			let endAngle = (initAngle + angle) * Math.PI/180;//结束弧度
			ctx.beginPath();
			ctx.moveTo(oX,oY);
			//转盘交叉颜色
			if(lotteryList.length % 2 === 0){
				ctx.fillStyle = i % 2 === 0 ? evenBgColor : oddBgColor;
			}else{
				//兼容奇数奖项时最前和最后一个重复颜色，添加第三个色彩
				ctx.fillStyle = i % 3 === 0 ? evenBgColor : i % 3 === 1 ? oddBgColor : thirdBgColor;
			}
			ctx.arc(oX,oY,radius,startAngle,endAngle);
			ctx.fill();
			//画完一个扇形后增加对应的角度
			initAngle += angle;
		}
	}

	const turntableDom = new turntableConstructor({
        el:document.createElement('div'),
		//非函数属性用props是因为既可以组件也可以函数调用，不然用data会冲突
        props: {
			lotteryList:{
				type:Array,
				default:() => {
					return lotteryList
				}
			},
			oddBgColor:{
				type:String,
				default:oddBgColor
			},
			evenBgColor:{
				type:String,
				default:evenBgColor
			},
			thirdBgColor:{
				type:String,
				default:thirdBgColor
			},
			//圆心X坐标
			oX:{
				type:Number,
				default:oX
			},
			//圆心Y坐标
			oY:{
				type:Number,
				default:oY
			},
			//转盘半径
			radius:{
				type:Number,
				default:radius
			},
			duration:{
				type:Number,
				default:duration
			},
			className:{
				type:String,
				default:className
			}
		},
		data:{
			dateTag,
			useFromFn:true
		},
		methods:{
			lotteryStart,
			lotteryEnd,
			slotScoped
		}
	})
	if(targetContainer){
		targetContainer.appendChild(turntableDom.$el);
		setTimeout(()=>{
			drawTurnTable()
		},0)
	}else{
		document.body.appendChild(turntableDom.$el);
		setTimeout(()=>{
			drawTurnTable()
		},0)
	}
	return turntableDom;
}

// function registryTncode(){
// 	Vue.prototype.$turnTable = turnTable;
// }

export default turnTable;