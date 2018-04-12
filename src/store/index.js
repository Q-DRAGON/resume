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
            name: '方某某',
            city: '大城市铁岭',
            title: '首席装逼师',
            birthday: {
                year: '1990',
                month: '1',
            },
          },
          workHistory: [
              {
                  company: '鸡飞狗跳公司',
                  time: {
                    begin: '1990',
                    end: '2003',
                  },
                  content: `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制。
                  我的主要工作如下:
                  1. 完成既定产品需求。
                  2. 修复 bug。`
              },
          ],
          education: [
            {
            school: '韩琛古惑仔高中',
            time: {
              begin: '1990',
              end: '2003',
            },
            content: '文字'
            },
          ],
          projects: [
            { name: 'project A', content: '文字' },
          ],
          awards: [
            { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' },
          ],
          contacts: [
            { contact: 'phone', number: '13812345678' },
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
        },
        updateResume(state, {path, value}) {
            objectPath.set(state.resume, path, value)
            let value1 = objectPath.get(state.resume, path)
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
        }
        // 初始化
        // initState(state, payload) {
        //     // 从 payload(localStorage 里的数据) 复制到 state
        //     console.log(JSON.stringify(state.resume.profile))
        //     Object.assign(state, payload)
        //     console.log(JSON.stringify(state.resume.profile))
        // },
    }
})
