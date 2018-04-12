// express_demo.js 文件

// 引入 express 并且创建一个 express 实例赋值给 app
const express = require('express')
const path = require('path') // 路径工具
const fs = require('fs') // 文件系统工具

const app = express()

// 配置静态文件目录
app.use(express.static('static'))

// 城市数据生成
const cityGenerator = function(data) {
    console.log('data', data)
    var optionsData = []
    // 拿到 data 数据, 遍历 Push 组成 options 模板
    // 拿到省份
    for (let i = 0; i < data.length; i++) {
      var template = {
        value: data[i].name,
        label: '',
        children: []
      }
      template.label = data[i].name
      // 拿到城市
      for (let j = 0; j < data[i].city.length; j++) {
        var city = data[i].city[j].name
        var cityObj = {
            value: city,
            label: city,
            children: []
          }
        // 拿到区
        for (let k = 0; k < data[i].city[j].area.length; k++) {
          var area = data[i].city[j].area[k]
          var areaObj = {
            value: area,
            label: area,
          }
          // 把区 push 进城市的 chidren(城市的子数组, 也就是区)
          cityObj.children.push(areaObj)
        }
        // 把完成区填入后的城市数组 push 进省模板
        // console.log('cityObj',cityObj)
        template.children.push(cityObj)
      }
      // 把省模板 push 进总数组
      optionsData.push(template)
    }
    saveData(optionsData)
}

// city 数据保存
const saveData = function(data) {
    let path = '../static/cityData.json'
    const s = JSON.stringify(data, null, 2)
    fs.writeFile(path, s, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
const readCityJson = function() {
    fs.readFile('../static/cityDataSource.json', function(err, data){
        var cityData = JSON.parse(data)
        // console.log('读取的html文件内容是', cityData)
        cityGenerator(cityData)
    })
}

// 日期生成
const dateGenerator = function() {
    var yearArr = []
    for(i = 70; i <= new Date().getYear(); i++) {
        var now = 1900 + i;
        console.log(now)
        let t = {
            value: now,
            label: now,
        }
    yearArr.push(t)
    }
    var dateArr = []
    for(i = 1; i < 13; i++) {
        console.log(i)
        let tem = {
            value: i,
            label: i,
        }
    dateArr.push(tem)
    }
    saveDate(yearArr, dateArr)
}

// 日期保存
const saveDate = function(yearArr, dateArr) {
    let yearPath = '../static/yearData.json'
    let yearS = JSON.stringify(yearArr, null, 2)
    fs.writeFile(yearPath, yearS, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })

    let datePath = '../static/dateData.json'
    let dateS = JSON.stringify(dateArr, null, 2)
    fs.writeFile(datePath, dateS, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

const _main = function() {
    // 生成城市数据
    readCityJson()
    // 生成日期数据
    // dateGenerator()
}

_main()
