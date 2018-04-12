<template>
  <div id="TopBar">
    <div class="topbar-wrapper">
      <div class="logo">
        Resume
      </div>
      <div class="actions">
        <button class="button button-preview" @click="preview">预览</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    preview() {
      console.log(this.$store.state.show)
      return this.$store.commit('previewShow')
    }
  }
}
</script>

<style scoped lang="scss">
  #TopBar {
    background: #FBFCFC;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    .topbar-wrapper {
      max-width: 96%;
      height: 80px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .actions {
        .button {
          border: 0;
          background: #efefef;
          width:100px;
          height:40px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #222;
        }
      }
    }
  }
</style>
