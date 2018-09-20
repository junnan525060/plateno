<template>
  <div>
    <plateno :clearPlateNo="clearPlate" @getPlateNo="getPlate"></plateno>

    <button style="width: 80%;background-color: #79b8ff" @click="clearCarNo">测试</button>
  </div>

</template>

<script>

import plateno from './plateNo'

export default {
  name: 'HelloWorld',
  components: {
    plateno
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      plateNo: '',
      clearPlate: false // 清空车牌号后需要及时更新状态
    }
  },
  methods: {
    getPlate (msg) {
      this.clearPlate = false
      console.log(msg)
    },
    clearCarNo () {
      this.clearPlate = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
