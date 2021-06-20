<template>
    <!-- <dv-border-box-9> -->
        <div class="equipment">
            <div class="infrared" :class="this.equip.body == 1 ? 'warning': '' ">
                <span class="iconfont icon-hongwaijiance"></span>
                <p v-if="this.equip.body == 1">疑似有人入侵</p>
                <p v-else>红外</p>
            </div>
            <div class="flame" :class="this.equip.fire == 1 ? 'warning': '' ">
                <span class="iconfont icon-huoyan"></span>
                <p v-if="this.equip.fire == 1">疑似猪场着火</p>
                <p v-else>火焰</p>
            </div>
            <div class="warm" :class="this.equip.heat == 1 ? 'open': '' ">
                <span class="iconfont icon-jiare-"></span>
                <p v-if="this.equip.heat == 1">加热设备运行中</p>
                <p v-else>加热</p>
            </div>
            <div class="cooling" :class="this.equip.fan == 1 ? 'open': '' ">
                <span class="iconfont icon-fengshan"></span>
                 <p v-if="this.equip.fan == 1">降温设备运行中</p>
                <p v-else>降温</p>
            </div>
        </div>
    <!-- </dv-border-box-9> -->
</template>

<script>
import Vue from 'vue';
export default {
    props: {
        equipment: Object
    },
    data() {
        return {
            equip: {
                body: this.equipment.infrared,
                // 火焰
                fire: this.equipment.flame,
                // // 有害气体
                // noxious: this.noxious,
                // // 空气质量
                // quality: this.quality,
                // 加热
                heat: this.equipment.warm,
                // 降温
                fan: this.equipment.cooling
            }
        }
    },
    watch: {
        equipment: {
            handler(val) {
                this.equip.body = val.infrared;
                this.equip.fire = val.flame;
                this.equip.heat = val.warm;
                this.equip.fan = val.cooling;
                // console.log(this.equip, "设备更新");
            },
            deep: true, // 深度监听
            // 首次监听的话第一次找不到数据会出现错误
            immediate: true, // 初次监听即执行 
        }
    },
    mounted() {
        // console.log(this.equip);
    },
    methods: {

    }
}
</script>

<style lang="scss">
.equipment {
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    gap: 30px 20px;
    align-content: center;
    justify-content: center;
    // background-color: #7e7c7c;
    border-radius: 10px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        // box-sizing: content-box;
        width: 3.5rem;
        height: 2rem;
        border-radius: 10px;
        font-size: .28rem;
        border-radius: 57px;
        border-radius: 18px;
        border-radius: 18px;
        border: solid 3px rgb(90, 98, 207);

        span {
            margin-top: .1rem;
            align-items: center;
            font-size: .8rem;
            height: .7rem;
            color: rgb(90, 98, 207);
        }
        // @extend .open;
    }
}

.warning {
    animation: fade 600ms infinite;
}

.open {
    background-color: #05c46b;
}


@keyframes fade {
    from {       
        background-color: brown;
        opacity: 1.0;   
    }

    50% {       
        background-color: brown;
        opacity: 0.4;   
    }

    to {       
        background-color: brown;
        opacity: 1.0;   
    }

}
</style>