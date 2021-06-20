<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width:33.3%;height:.0625rem;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:2.5rem;height:.625rem;" />
            <div class="title">
              <span class="title-text">智能养猪场可视化平台</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width:3.125rem;height:.1rem;"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width:2.5rem;height:.625rem;"
            />
          </div>
          <dv-decoration-10 style="width:33.3%;height:.0625rem; transform: rotateY(180deg);" />
        </div>
        <!-- 内容start -->
        <div class="content">
          <humiture-chart class="humiture" style="width: 8rem; height: 4rem;" :humiture="humiture"></humiture-chart>
          <pig-amount-chart class="pigAmount" style="width: 6.5rem; height: 5rem;" :pigAmount="pigAmount"></pig-amount-chart>
          <equipment class="equipment" style="width: 8rem; height: 5rem;" :equipment="equipment"></equipment>
          <pig-yield-chart class="pigYield" style="width: 12rem; height: 6rem;"></pig-yield-chart>
          <air-temperature-chart class="airTemperature" style="width: 11.5rem; height: 6rem;"></air-temperature-chart>
          <!-- <button @click="change" style="width: 2rem; height: 1rem;"></button> -->
        </div>
        <div class="date">
          {{this.date}}
        </div>
        <!-- 内容end -->
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import HumitureChart from '../components/echart/humiture.vue'
import PigAmountChart from '../components/echart/pigAmount.vue'
import PigYieldChart from '../components/echart/pigYield.vue'
import Equipment from '../components/equipment.vue'
import AirTemperatureChart from '../components/echart/airTemperature.vue'
export default {
  data () {
    return {
      loading: true,
      // 温湿度
      humiture: {
        // 温度
        temperature: 25,
        // 湿度
        humidity: 60
      },
      // 产信息
      pigAmount: {
         // 公猪数量
            boar: 110,
            // 母猪数量
            sow: 100
      },
      // 设备信息
      equipment: {
        // 红外
        infrared: 0,
        // 火焰
        flame: 0,
        // 加热
        warm: 0,
        // 降温
        cooling: 0
      },
      date: 0
    };
  },
  components: {
    HumitureChart,
    PigAmountChart,
    PigYieldChart,
    Equipment,
    AirTemperatureChart,
  },
  mounted () {
    this.timer = setInterval(()=>{
        this.getHumiture();
    }, 2000);
    this.timer = setInterval(()=>{
        this.date = new Date();
    }, 1000);
    this.getAmount();
    this.cancelLoading();
  },
  methods: {
    getHumiture() {
      this.axios({
          method: 'get',
          url: '/uploading/',
          params: {
          }
      }).then(response => {
          this.humiture.humidity = response.data[0].humidity;
          this.humiture.temperature = response.data[0].temperature;
          
          this.equipment.infrared = response.data[0].body;
          this.equipment.flame = response.data[0].fire;
          this.equipment.warm = response.data[0].heat;
          this.equipment.cooling = response.data[0].fan;
      })
    },
      getAmount() {
      this.axios({
          method: 'get',
          url: '/pig-info/getsex',
          params: {
          }
      }).then(response => {
          this.pigAmount.boar = response.data.femalePigAmount;
          this.pigAmount.sow = response.data.malePigAmount;
      })
    },
    change() {
      this.humiture.temperature += 10;
      // console.log(this.humiture.temperature);
    },
    cancelLoading () {
      // 加载效果
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/index.scss';
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: .2rem;
}
.humiture {
  // margin-left: .5rem;
}
.pigAmount {
  margin-left: .4rem;
}
.equipment {
  margin-left: .6rem;
}
.pigYield, .airTemperature {
  margin-top: .3rem;
  border-radius: 10px;
}
.date {
  position: absolute;
  top: 5.5rem;
  left: .5rem;
  font-size: .3rem;
  color: #006ced;
}
</style>