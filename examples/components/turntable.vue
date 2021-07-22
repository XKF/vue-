<template>
    <div>
        <div class="line">
            <p class='title'>组件调用</p>
            <v-turntable 
                className="test" 
                :lottery-list="lotteryList" 
                @lottery-start="lotteryStart" 
                @lottery-end="lotteryEnd"
                odd-bg-color="#ffd3d3"
                even-bg-color="#fff"
                :duration="1500">
                <template v-slot:goods>
                    <span 
                        v-for="(item,index) in lotteryList" 
                        :key="index" 
                        class="testItem" 
                        :style="{'width': `${Math.PI * 100 / lotteryList.length}%`,
                        'transform':`translateX(-50%) rotate(${(2 * index + 1) * 180 / lotteryList.length}deg)`}"
                    >
                        {{item.name}}
                    </span>
                </template>
            </v-turntable>
        </div>
        <div class="line">
            <p class='title' @click="test()">函数调用</p>
            <button 
                type='primary'
                @click='add'>函数添加组件</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test-turntable',
    data(){
        return {
            turntableObj:null,
            lotteryList:[{
                name:'这里是奖品名称1',
                icon:require('../assets/logo.png')
            },{
                name:'这里是奖品名称2',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称3',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称4',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称5',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称6',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称7',
                icon:require('../assets/logo.png')
            },
            {
                name:'这里是奖品名称8',
                icon:require('../assets/logo.png')
            },{
                name:'这里是奖品名称9',
                icon:require('../assets/logo.png')
            },{
                name:'这里是奖品名称10',
                icon:require('../assets/logo.png')
            }]
        }
    },
    methods: {
        lotteryStart(fn){
            fn(2);
        },
        lotteryEnd(reset){
            alert('恭喜中奖');
            reset();
        },
        add() {
            this.turntableObj = this.$TurnTable({
                lotteryList:this.lotteryList.slice(1),
                targetContainer:document.querySelectorAll('.line')[1],
                className:'test',
                duration:1000,
                slotScoped:()=>{
                    return {
                        "btn":{tag:'span', data:{style: {display:'flex','align-items':'center','justify-content':'center',width:'100px',height:'100px',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)','border-radius':'100%',background:'blue',color:'#fff','font-size':'18px'}}, text:'test'}
                    }
                },
                lotteryStart:this.lotteryStart,
                lotteryEnd:this.lotteryEnd
            })
        },
        test(){
            this.scratch.init()
        },
        fn(reset){
            setTimeout(()=>{
                reset()
                this.abc='123'
            },3000)
        }
    }
}
</script>

<style lang='scss'>
    .line {
        margin-bottom:15px;
        .title {
            margin-bottom:6px;
        }
    }
    .pic{
        font-size: 12px;
    }
    .test{
        margin: 0 auto;
    }
    .testItem{
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 2;
        transform: translateX(-50%);
        height: 50%;
        transform-origin: 50% 100%;
        padding: 11px 14px 0px;
        display: -webkit-box;
        -webkit-line-clamp: 2;  // 控制多行的行数
        -webkit-box-orient: vertical;
        overflow:hidden; 
        text-overflow:ellipsis;
        font-size: 12px;
        text-align: center;
    }
</style>

