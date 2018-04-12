<template>
  <div id="ResumePreview" :class="{preview:show === 'preview'}">
    <section class="profile">
      <h1>{{resume.profile.姓名}}</h1>
      <h2>{{resume.profile.职位}}</h2>
      <div>
        <small>{{resume.profile.居住地}}</small>
        <small>{{resume.profile.生日.year}}年</small>
        <small>{{resume.profile.生日.month}}月</small>
      </div>
    </section>
    <section class="workHistory">
      <span class="icon-wrapper">
        <svg class="icon">
          <use :xlink:href="`#icon-work`"></use>
        </svg>
      </span>
      <div class="title">
          <h2>工作经历</h2>
      </div>
      <ol>
        <li v-for="item in resume.workHistory">
          <h3>{{item.公司}}</h3>
          <div class="time-wrapper">
            <small class='work-time'>{{item.时长.begin}}</small>
            <i>-</i>
            <small class='work-time'>{{item.时长.end}}</small>
          </div>
          <p>{{item.详情}}</p>
        </li>
      </ol>
    </section>
    <section class="education">
      <span class="icon-wrapper">
        <svg class="icon">
          <use :xlink:href="`#icon-book`"></use>
        </svg>
      </span>
      <div class="title">
        <h2>毕业院校</h2>
      </div>
        <ol>
          <li v-for="item in resume.education">
            <div class="time-wrapper">
              <h3>{{item.学校}}</h3>
              <small class='school-time'>{{item.时长.begin}}</small>
              <i>-</i>
              <small class='school-time'>{{item.时长.end}}</small>
            </div>
            <p>{{item.详情}}</p>
          </li>
        </ol>
    </section>
    <section class="projects">
        <span class="icon-wrapper">
          <svg class="icon">
            <use :xlink:href="`#icon-heart`"></use>
          </svg>
        </span>
        <div class="title">
          <h2>项目经验</h2>
        </div>
      <ol>
        <li v-for="item in resume.projects">
          <h3>{{item.项目名称}}</h3>
          <p>{{item.详情}}</p>
        </li>
      </ol>
    </section>
    <section class="awards">
      <span class="icon-wrapper">
        <svg class="icon">
          <use :xlink:href="`#icon-cup`"></use>
        </svg>
      </span>
      <div class="title">
        <h2>获奖经历</h2>
      </div>
      <ol>
        <li v-for="item in resume.awards">
          <h3>{{item.奖项}}</h3>
          <p>{{item.详情}}</p>
        </li>
      </ol>
    </section>
    <section class="contacts">
      <span class="icon-wrapper">
        <svg class="icon">
          <use :xlink:href="`#icon-phone`"></use>
        </svg>
      </span>
      <div class="title">
        <h2>联系方式</h2>
      </div>
      <table>
        <tr v-for="item in resume.contacts">
          <td>{{item.联系方式}}</td>
          <td>{{item.联系详情}}</td>
        </tr>
      </table>
    </section>
    <div class="quit-button" v-show="show === 'preview'">
        <button class='button-quitPreview' @click="edit">退出预览</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume() {
        return this.$store.state.resume
    },
    show: {
        get() {
          // 返回 store 里的数据
          return this.$store.state.show
        },
    },
  },
  methods: {
    edit() {
      console.log(this.$store.state.show)
      return this.$store.commit('previewShow')
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes loadButton {
  100% {
    opacity: 0;
  }
}
@keyframes loadButtonReset {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
 #ResumePreview {
   background: #FBFCFC;
   width: 61.5%;
   box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
   justify-content: space-between;
   overflow: auto;
   padding: 40px;
   .profile {
     margin-bottom: 60px;
     h1 {
        font-size: 45px;
        margin-bottom: 15px;
     }
     h2 {
       font-size: 20px;
       margin-bottom: 10px;
     }
   }
   .contacts {
    table {
      margin-top: 30px;
      td {
        padding-right: 30px;
        padding-bottom: 10px;
      }
    }
   }
   li {
     margin-bottom: 50px;
     h3 {
       margin-top: 30px;
       margin-bottom: 10px;
     }
     .work-time,.school-time {
       margin-bottom: 10px;
     }
     p {
       color:#686666;
       white-space: pre-line;
     }
     .time-wrapper {
       margin-bottom: 10px;
       font-size: 16px;
     }
   }
   .title {
     padding-left: 50px;
     &:after {
       content:'';
       display:block;
       border-bottom: 3px solid #a7b3c1;
     }
     h2 {
       color:#4097ca;
       padding-bottom: 5px;
     }
   }
   svg.icon {
     width: 20px;
     height: 20px;
     fill: white;
   }
   .icon-wrapper {
     width: 40px;
     height: 40px;
     background: #4097ca;
     display: inline-flex;
     justify-content: center;
     align-items: center;
     border-radius: 50%;
     vertical-align: top;
     transform: translateY(35px);
   }
   &.preview {
     width: 100%;
     position: absolute;
     top: 0;
     left: 50%;
     transform: translateX(-50%);
   }
   .quit-button {
     position: absolute;
     top: 40px;
     right: 40px;
     transform-style: preserve-3d;
     animation: loadButton 5s;
     animation-fill-mode: forwards;
     cursor: pointer;
     &:hover {
       transform-style: preserve-3d;
       animation: loadButtonReset 1s;
     }
     .button-quitPreview {
       border: 0;
       background: #6DC8AD;
       width:100px;
       height:40px;
       border: none;
       cursor: pointer;
       font-size: 16px;
       color: #222;
     }
   }
 }
</style>
