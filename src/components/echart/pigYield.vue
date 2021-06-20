<template>
  <div id="pigYield" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import walden from '../../assets/walden';
export default {
 props: {
    },
    data() {
        return {
            yield: [1000, 1200, 1800, 2000, 2100, 2500],
            amount: [88, 100, 150, 170, 175, 200]
        }
    },
    created(){
        this.getYield();
    },
    mounted() {
        this.pigYield();
    },
    updated() {
    },
    beforeDestroy() {
    },
//    watch: {
//         yield: {
//             handler(val) {
//             this.yield = val;
//             this.getYield();
//             },
//             deep: true, // 深度监听
//             immediate: false, // 初次监听即执行  
//         },
//         amount: {
//             handler(val) {
//             this.amount = val;
//             this.getYield();
//             },
//             deep: true, // 深度监听
//             immediate: false, // 初次监听即执行  
//         },
//     },
    methods: {
        getYield(){
            this.axios({
                method: 'get',
                url: '/pig-yield/test2',
                params: {
            }
            }).then(response => {
                // for (let index in response.data){
                //     this.yield.push(response.data[index].yield);
                //     this.amount.push(response.data[index].amount);
                // }
                // this.yield = Array.from(this.yield);
                // this.amount = Array.from(this.amount);
                this.yield = response.data.yield;
                this.amount = response.data.amount;
                console.log(response.data);
            })
        },
        pigYield() {
            var option;
            option = {
                backgroundColor: 'rgba(19, 25, 47, 0.6)',
                title: {
                    text: '产量统计',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            // color: '#fffff'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['产量', '数量'],
                    // textStyle: {
                    //     color: '#FFFF',
                    //     fontWeight: '500',
                    //     fontSize: `18`,
                    // },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisPointer: {
                            type: 'shadow',
                        },
                        nameTextStyle: {
                        // color: '#FFFFFF',
                        },
                    },
                    {
                        axisLine: {
                            show: false,
                            
                        },
                    },
                    {
                        axisLabel: {
                            textStyle:{
                                // color:'#fff',  //坐标的字体颜色
                            },
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 8000,
                        interval: 500,
                        
                        axisLabel: {
                            formatter: '{value} kg',
                            // color: '#fff',
                        }
                    },
                    {
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 500,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} 头',
                            // color: '#fff',
                        }
                    },
                     {
                        axisLine: {
                            show: true,
                            lineStyle: {
                                // color: 'rgba(255,255,255,1)',
                                //  shadowColor:'rgba(255,255,255,1)',
                            },
                        },
                    }
                ],
                series: [
                    {
                        name: '产量',
                        type: 'bar',
                        data: this.yield,
                        // color: '#006ced'
                    },
                    {
                        name: '数量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: this.amount,
                        // color: '#ffe000'
                    },
                ]
            };
            if (option && typeof option === 'object') {
               echarts.init(document.getElementById("pigYield"), walden).setOption(option);
            }
        }
    }
}
</script>

<style>

</style>