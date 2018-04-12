import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import objectPath from "object-path"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        selected: 'profile',
        show: 'edit',
        resume: {
          config: [
            { field: 'profile', icon: 'id' },
            { field: 'workHistory', icon: 'work' },
            { field: 'education', icon: 'book' },
            { field: 'projects', icon: 'heart' },
            { field: 'awards', icon: 'cup' },
            { field: 'contacts', icon: 'phone' },
          ],
          profile: {
            姓名: '王尔德',
            居住地: '大城市铁岭',
            职位: '前端工程师',
            生日: {
                year: '1990',
                month: '1',
            },
          },
          workHistory: [
              {
                  公司: '极点一刻网络科技有限公司',
                  时长: {
                    begin: '1990',
                    end: '2003',
                  },
                  详情: `公司总部设在深圳。专注于互联网通讯领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制。
                  我的主要工作如下:
                  1. 完成既定产品需求。
                  2. 修复 bug。`
              },
          ],
          education: [
            {
            学校: '清华大学',
            时长: {
              begin: '1990',
              end: '2003',
            },
            详情: '本科毕业生'
            },
          ],
          projects: [
            { 项目名称: 'todoList', 详情: `
            1. 完全独立可剥离的UI，便于风格定制
            2. 清晰的开发模式，做APP从未这么简单
            3. 井然有序的代码组织，页面再多也不乱
            4. 熟悉的模块化开发体验，用了就回不去了
            5. 丰富的示例，助你快速上手`},
          ],
          awards: [
            { 奖项: '首届“解放号杯”程序员大赛一等奖', 详情: '备忘小贴士荣获最佳' },
          ],
          contacts: [
            { 联系方式: 'phone', 联系详情: '13812345678' },
          ],
        },
    },
    mutations: {
        previewShow(state) {
            if(state.show === "edit") {
                console.log('if')
                state.show = "preview"
            } else {
                console.log('else')
                state.show = "edit"
            }
        },
        switchTab(state, payload) {
            state.selected = payload
            // localStorage.setItem('state', JSON.stringify(state))
        },
        updateResume(state, {path, value}) {
            objectPath.set(state.resume, path, value)
            // localStorage.setItem('state', JSON.stringify(state))
        },
        addResumeData(state, payload) {
            var newInput = {}
            for (var i in payload.path) {
                // 判断如果为 time 则是对象, 否则空值
              if(payload.path[i] instanceof Object) {
                  newInput[i] = {
                      begin:"",
                      end:"",
                  }
              } else {
                  newInput[i] = ""
              }
              console.log('i', i, 'newInput', newInput)
            }
            objectPath.push(state.resume, payload.filed, newInput)
        },
        // 初始化
        // initState(state, payload) {
        //     // 从 payload(localStorage 里的数据) 复制到 state
        //     // Object.assign(state, payload)
        // },
    }
})
