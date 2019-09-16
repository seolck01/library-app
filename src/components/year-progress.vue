<template>
  <div class="year-progress">
    <progress :percent="precent"
              activeColor="#EA5A49"
              show-info />
    <p>{{ year }}年已经过去了{{ days }}天, {{ precent }}%</p>
  </div>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      const start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start 就是今年的第一天
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    precent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  },
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return false
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  }
}
</script>

<style lang="scss" scope>
.year-progress {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 10px;
  progress {
    margin-bottom: 10px;
  }
}
</style>