<template>
  <div id="airTemperature" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import walden from '../../assets/walden';
export default {
    data() {
        return {
            max: [],
            min: []
        }
    },
    mounted() {
        this.getAirTemperature();
        this.AirTemperature(this.max, this.min);
    },
    methods: {
         getAirTemperature(){
            this.axios({
                method: 'get',
                url: '/temperature/',
                params: {
            }
            }).then(response => {
                for (let i = 0; i < 7; i++){
                    this.max.push(response.data[i].max);
                    this.min.push(response.data[i].min);
                }
                this.max = Array.from(this.max);
                this.min = Array.from(this.min);
                // console.log(this.max);
            })
        },
        AirTemperature(maxs, mins) {
            var chartDom = document.getElementById('airTemperature');
            var myChart = echarts.init(chartDom, walden);
            var option;
            // var maxs = [];
            // var mins = [];
            // this.axios({
            //     method: 'get',
            //     url: '/temperature/',
            //     params: {
            // }
            // }).then(response => {
            //     for (let i = 0; i < 7; i++){
            //         maxs.push(response.data[i].max);
            //         mins.push(response.data[i].min);
            //     }
            //     // this.max = Array.from(this.max);
            //     // this.min = Array.from(this.min);
            //     // console.log(this.max);
            // })

            console.log(maxs);

            option = {
                backgroundColor: 'rgba(19, 25, 47, 0.6)',
                title: {
                    text: '过去一周气温变化',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['最高气温', '最低气温']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name: '最高气温',
                        type: 'line',
                        data: [32, 34, 31, 31, 33, 37, 36],
                        // data: maxs,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [24, 23, 25, 24, 26, 25, 27],
                        // data: mins,
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        position: 'start',
                                        formatter: '最大值'
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        }
    }
}
</script>

<style>

</style>