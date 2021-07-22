
import { use } from './_utils/use';

let _use = use('turntable'),
    bem = _use[0];

export default {
    name: 'kafan-turntable',
    props: {
        lotteryList:{
            type:Array,
            default:() => {
                return []
            }
        },
        oddBgColor:{
            type:String,
            default:'#fff'
        },
        evenBgColor:{
            type:String,
            default:'#f1deff'
        },
        thirdBgColor:{
            type:String,
            default:'#dcf8fe'
        },
        //圆心X坐标
        oX:{
            type:Number,
            default:129
        },
        //圆心Y坐标
        oY:{
            type:Number,
            default:129
        },
        //转盘半径
        radius:{
            type:Number,
            default:129
        },
        className:{
            type:String,
            default:''
        },
        duration:{
            type:Number,
            default:2000
        }
    },
    data() {
        return {
            canvasObj:null,//canvas对象
            rotateObj:null,
            showAnimate:false,
            dateTag:new Date() / 1,
            useFromFn:false//是否函数调用
        };
    },
    methods: {
        slotScoped(){
            return {};
        },
        // 获取插槽元素
        getSlot(name) {
            return this.slotScoped && typeof this.slotScoped === 'function' && this.slotScoped()[name]
        },
        //计算奖品及文案旋转角度
        absoluteAngle(index){
            return (2 * index + 1) * 180 / this.lotteryList.length;
        },
        //绘制环形跑马灯转盘背景
        drawTurnTable(){
            //获取canvas对象
            this.canvasObj = document.getElementById(`canvas__${this.dateTag}`);
            let ctx = this.canvasObj.getContext("2d");
            //画圆的起始角度
            let initAngle = -90;
            //循环画扇形拼合成圆形
            for(let i = 0;i < this.lotteryList.length; i++){
                let startAngle = initAngle * Math.PI/180;//起始弧度
                let angle = 360 / this.lotteryList.length;
                let endAngle = (initAngle + angle) * Math.PI/180;//结束弧度
                ctx.beginPath();
                ctx.moveTo(this.oX,this.oY);
                //转盘交叉颜色
                if(this.lotteryList.length % 2 === 0){
                    ctx.fillStyle = i % 2 === 0 ? this.evenBgColor : this.oddBgColor;
                }else{
                    //兼容奇数奖项时最前和最后一个重复颜色，添加第三个色彩
                    ctx.fillStyle = i % 3 === 0 ? this.evenBgColor : i % 3 === 1 ? this.oddBgColor : this.thirdBgColor;
                }
                ctx.arc(this.oX,this.oY,this.radius,startAngle,endAngle);
                ctx.fill();
                //画完一个扇形后增加对应的角度
                initAngle += angle;
            }
        },
        //点击抽奖按钮
        handleClick(){
            if(this.useFromFn){
                this.lotteryStart(this.lottery);
            }else{
                this.$emit('lottery-start',this.lottery);
            }
        },
        //抽奖及转盘转动
        lottery(index){
            //开始动画
            this.showAnimate = true;
            this.rotateObj = document.getElementById(bem(`rotate__${this.dateTag}`));
            //计算旋转角度
            let baseAngle = 360 / this.lotteryList.length;
            let minAngle = 1079 - baseAngle * index;//这里加1防止转到中间的边
            let maxAngle = 1081 - baseAngle * (index + 1);//这里减1防止转到中间的边
            let rotateAngle = Math.floor(Math.random()*(maxAngle - minAngle + 1) + minAngle);
            this.rotateObj.style.webkitTransform = `rotate(${rotateAngle}deg)`
            this.rotateObj.style.transform = `rotate(${rotateAngle}deg)`
            //等待动画结束才弹窗
            setTimeout(()=>{
                this.showAnimate = false;
                if(this.useFromFn){
                    this.lotteryEnd(this.reset);
                }else{
                    this.$emit('lottery-end',this.reset);
                }
            },3000)
        },
        //重置函数
        reset(){
            if(this.rotateObj){
                this.rotateObj.style.webkitTransform = `rotate(0deg)`
                this.rotateObj.style.transform = `rotate(0deg)`
            }
        },
        //初始化绘制
        init(){
            this.lotteryList.length && this.drawTurnTable();
        }
    },
    mounted() {
        !this.useFromFn && this.init();
    },
    render(h) {
        // 判断是否有defalut
        return this.lotteryList.length && h('div', {
            "class": [bem(""), this.className ? this.className : '']
        }, [
            h('div', {
                "class":[this.showAnimate ? bem("rotate",{rotating:true}) : bem("rotate")],
                "style":this.showAnimate ? {
                    'transition-duration':`${this.duration / 1000}s`,
                    '-webkit-transition-duration':`${this.duration / 1000}s`,
                    '-moz-transition-duration':`${this.duration / 1000}s`,
                    '-ms-transition-duration':`${this.duration / 1000}s`,
                    '-o-transition-duration':`${this.duration / 1000}s`
                } : {},
                "attrs":{
                    "id":bem(`rotate__${this.dateTag}`)
                }
            },[
                this.$slots.goods || this.getSlot('goods') || this.lotteryList.map((item,index) => {
                    return h('div',{
                        "class":bem("item"),
                        "attrs":{
                            "key":index
                        },
                        "style":{
                            "width": `${Math.PI * 100 / this.lotteryList.length}%`
                        }
                    },[
                        h('div',{
                            "style":{
                                '-webkit-transform':`rotate(${this.absoluteAngle(index)}deg)`,
                                'transform':`rotate(${this.absoluteAngle(index)}deg)`
                            }
                        },[
                            [
                                h('p',{},item.name),
                                h('img',{
                                    "attrs":{
                                        "src":item.icon
                                    }
                                })
                            ]
                        ])
                    ])
                }),
                h('canvas',{
                    "class":bem("canvas"),
                    "attrs":{
                        "id":`canvas__${this.dateTag}`,
                        "width":this.radius * 2,
                        "height":this.radius * 2
                    }
                })
            ]),
            h('a',{
                "class":bem("btn__con"),
                "on":{
                    "click":()=>{
                        this.handleClick();
                    }
                }
            },[
                this.$slots.btn || 
                this.getSlot('btn') || 
                h('span',{
                    "class":[
                        !this.showAnimate?bem("btn",{animating:true}):bem("btn")
                    ]
                })
            ])

        ])
    }
}