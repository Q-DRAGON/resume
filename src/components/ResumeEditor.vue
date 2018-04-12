<template>
  <div id="ResumeEditor">
    <nav>
      <ol>
        <li v-for="(item, index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <div class="panels">
      <ol>
        <li v-for="(item, index) in resume.config" v-show="item.field === selected">
          <div v-if="resume[item.field] instanceof Array">
            <div v-for="(subitem, i) in resume[item.field]">
              <div v-for="(value, key) in subitem">
                <label for="">{{ key }}</label>
                <div class="doubleSelect-wrapper" v-if="key === '时长'">
                  <select class='doubleSelect' @change="handleChangeFromTime($event.target, `${item.field}.${i}.${key}.begin`)">
                    <option disabled selected>请选择起始时间</option>
                    <option v-for="item in yearOptions">{{item.value}}</option>
                  </select>
                  <select class='doubleSelect' @change="handleChangeFromTime($event.target, `${item.field}.${i}.${key}.end`)">
                    <option disabled selected>请选择终止时间</option>
                    <option v-for="item in yearOptions">{{item.value}}</option>
                  </select>
                </div>
                <input v-else-if="key !== '详情'" type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
                <textarea v-else rows="3" cols="20" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)"></textarea>
              </div>
            </div>
            <div class="append">
              <svg class="icon" @click="addList(`${item.field}`,resume[item.field][0])">
                <use :xlink:href="`#icon-append`"></use>
              </svg>
            </div>
          </div>
          <div v-else-if="resume[item.field] instanceof Object">
            <div v-for="(value, key) in resume[item.field]">
              <label>{{ key }}</label>
                <div class="block" v-if="key === '居住地'">
                    <el-cascader
                    :options="cityOptions"
                    v-model="selectedOptions"
                    @change="handleChange">
                    </el-cascader>
                </div>
                <div class="doubleOptions-wrapper" v-if="key === '生日'">
                  <el-select v-model="value5" placeholder="请选择年份" @change="handleChangeFromBirthday">
                    <el-option
                    v-for="item in yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="value11"
                    collapse-tags
                    style="margin-left: 20px;"
                    placeholder="请选择月份"
                    @change="handleChangeFromBirthday">
                      <el-option
                      v-for="item in monthOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </div>
                <input v-else-if="key != '居住地'" type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResumeEditor',
  data() {
    return {
      cityOptions: [],
      selectedOptions: [],
      selectedOptions2: [],
      yearOptions: [],
      monthOptions: [],
      value5: [],
      value11: [],
      value6: [],
      value12: [],
    }
  },
  created() {
    axios.get('/api/city')
      .then((response) => {
        this.cityOptions = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('/api/date')
      .then((response) => {
        this.monthOptions = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('/api/year')
      .then((response) => {
        this.yearOptions = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    selected: {
        get() {
          // 返回 store 里的数据
          return this.$store.state.selected
        },
        set(value) {
          // 改写 store 里的数据
          return this.$store.commit('switchTab', value)
        }
    },
    resume() {
        return this.$store.state.resume
    }
  },
  methods: {
    // 提交 input 的 value
      changeResumeField(path, value){
        this.$store.commit('updateResume', {
          //  定位 key, 确认要修改哪一个的值
          path,
          value
        })
      },
      handleChange(value) {
        let stringValue = value.join('')
        this.changeResumeField('profile.居住地', stringValue)
      },
      handleChangeFromBirthday(value) {
        let stringValue = String(value)
        if(stringValue.length === 4) {
          this.changeResumeField('profile.生日.year', stringValue)
        } else {
          this.changeResumeField('profile.生日.month', stringValue)
        }
      },
      handleChangeFromTime(e, path) {
        let value = e.value
        this.changeResumeField(path, value)
      },
      addList(filed, path) {
        this.$store.commit('addResumeData', {filed, path})
      },
  },
}
</script>

<style scoped lang="scss">
  #ResumeEditor {
    width: 37%;
    background: #FBFCFC;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    nav {
      background: #373434;
      width:80px;
      height: 100%;
      ol {
        li {
          fill: #FBFCFC;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items:center;
          cursor: pointer;
          margin: 20px 0;
          svg.icon {
            width: 27px;
            height: 27px;
            transition: all 0.4s ease;
          }
          &.active {
            background: #FBFCFC;
            fill: #373434;
            svg.icon {
              transform: scale(1.4);
            }
          }
        }
      }
    }
    .panels {
      width: 100%;
      overflow: auto;
      ol{
        list-style: none;
        li {
          padding: 24px;
          input,.el-cascader {
            margin: 16px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 100%;
            height: 40px;
            padding: 0 25px 0 15px;
          }
          textarea {
            margin: 16px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 100%;
            height: 120px;
            padding: 10px 25px 0 15px;
            resize: none;
          }
          .el-cascader {
            border: 0;
            padding: 0;
          }
          .doubleOptions-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 16px 0;
            width: 100%;
            height: 40px;
          }
          .doubleSelect-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 16px 0;
            .doubleSelect {
              -webkit-appearance: none;
              background-color: #fff;
              background-image: none;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              color: #606266;
              display: inline-block;
              font-size: inherit;
              height: 40px;
              line-height: 40px;
              outline: 0;
              padding: 0 15px;
              -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
              width: 200px;
            }
          }
          .append {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 20px;
            > svg.icon {
              cursor: pointer;
              fill: #6DC8AD;
              width: 50px;
              height: 50px;
              transform: rotateZ(0deg);
              transition: all 0.4s ease;
              &:hover {
                transform: rotateZ(180deg);
                transition: all 0.2s ease-in-out;
              }
            }
          }
        }
      }
    }
  }
</style>
