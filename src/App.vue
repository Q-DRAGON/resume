<template>
  <div id="resume-wrapper">
    <header>
      <Topbar></Topbar>
    </header>
    <main>
      <ResumeEditor></ResumeEditor>
      <ResumePreview></ResumePreview>
    </main>
  </div>
</template>

<script>
import 'normalize.css/normalize.css'
import './assets/reset.css'

import Topbar from './components/TopBar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

import icons from './assets/icons'
import store from './store/index'


export default {
  name: 'App',
  store,
  components: {
    Topbar,
    ResumePreview,
    ResumeEditor,
  },
  created() {
    document.body.insertAdjacentHTML('afterbegin', icons)
    // 取 localStorage 的保存的数据覆盖 store 里的数据
    let state = localStorage.getItem('state')
      if(state) {
        state = JSON.parse(state)
      }
    this.$store.commit('initState', state)
  }
}
</script>

<style scoped lang="scss">
  @font-face {
      font-family: "STHeitiLight";
      src: url("../static/font/STHeiti-Light.ttf");
  }
  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size:16px;
  }
  #resume-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: STHeitiLight, "PingFang SC", sans-serif;
     main {
      min-width: 1024px;
      max-width: 96%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-grow: 1;
      width: 100%;
      align-self: center;
      margin-bottom: 16px;
    }
  }
</style>
