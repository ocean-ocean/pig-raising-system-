<template>
  <div>
    <img class="bgone" src="../assets/img/1.jpg" />
    <img class="pic" src="../assets/img/a.png" />

    <div class="table">
        <div class="wel">智能养猪系统后台登录</div>
        <div class="wel1">PIG RAISING SYSTEM</div>
        <div class="user">
            <div id="yonghu" style=""><img src="../assets/img/yhm.png" /></div>
            <input v-model="username" type="text" name="" placeholder="用户名" />
        </div>			
        <div class="password">
            <div id="yonghu"><img src="../assets/img/mm.png" /></div>
            <input v-model="password" type="password" name="密码" placeholder="●●●●●●"/>
        </div>
        <input class="btn" type="button" name="登录" value="登录" @click="login"/>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    mounted() {

    },
    components: {

    },
    methods: {
        login() {
            this.axios({
                method: "post",
                url: '/user-info/logintest',
                data: {
                    username: this.username,
                    password: this.password
                }
            }).then((response)=> {
                console.log(response);
                localStorage.setItem("TOKEN", response.data.obj);

                if (localStorage.getItem("TOKEN")){
                    this.$router.push("/index");
                }
            })
            console.log(this.username);
        }
    }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>