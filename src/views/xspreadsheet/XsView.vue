<template>
  <div>
    <img src="../../components/x-spreadsheet/assets/sprite.svg"/>
    <div>
      <ul>
        <li
          draggable="true"
          v-for="(val, index) in data"
          :key="index"
          @dragstart="dragstart(data, index, $event)"
          @dragenter="dragEnter(data, index, $event)"
          @click="click(val)"
        >
          {{ val }}
        </li>
      </ul>
    </div>
    <a-tree
    :tree-data="treeData"
    :draggable="true"
    @dragstart="dragStart"
    @dragend="dragend"
    :blockNode="false"
    :selectable="false"
  />
    <div ref="main" id="x-spreadsheet-demo" :style="{ width: '80%' }" @drop="drop" @dragover="allowDrop" @save="onSave"></div>
  </div>
</template>
<script>
/* eslint-disable */
import spreadsheet from "@/components/x-spreadsheet/src/index.js";
import draggable from "vuedraggable";
import zh from '@/components/x-spreadsheet/src/locale/zh-cn.js'
import service from '@/utils/request.js'

import { getSms } from '@/api/login.js'


export default {
  component: {
    draggable,
  },
  data() {
    return {
      data: ["first", "second", "third", "fourth", "fifth", "sixth"],
      sheet: {},
      treeData: []
    };
  },
  methods: {
    onSave(e) {
      debugger
      console.log(e.detail.data)
      console.log(e)
    },
    dragStart(e) {
      e.event.stopPropagation()
      e.event.dataTransfer.setData("data", e.node.title)
    },
    dragstart(data, index, e) {
      console.log(data, index, e);
      e.dataTransfer.setData("data", data[index]);
    },
    dragEnter(data, index, e) {
      e.dataTransfer.setData("data","123213")
    },
    click (e) {
      console.log(e)
    },
    drop (e) {
      const xy = this.sheet.data.getCellRectByXY(e.layerX, e.layerY)
      this.sheet.cellText(xy.ri, xy.ci, e.dataTransfer.getData("data"))
      this.sheet.reRender()
    },
    allowDrop (e) {
      e.preventDefault()
    },
    dragend (e) {
      // const xy = this.sheet.data.getCellRectByXY(e.event.layerX, e.event.layerY - e.event.offsetY)
      // this.sheet.cellText(xy.ri, xy.ci, e.node.title)
      // this.sheet.reRender()
      console.log(e)
    },
    save (data) {
      service.request({
        url: '/service/restful',
        method: 'post',
        data: {
          serviceName: 'comReportRuleService',
          methodName: 'addReportRule',
          rpcParams: [data]
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.data.forEach(da => {
      const d = {
        key: da,
        title: da,
        selectable:false
      }
      this.treeData.push(d)
    })
    const options = {
      saveApi: this.save,
      mode: 'edit',
      "viewLocalImage":"/design/report/img",//预览本地图片方法
      "uploadUrl":"/design/report/upload", //统一上传地址
      "uploadExcelUrl":"/design/report/importExcel?token=",
      pageSize: [10, 20, 30], //分页条数
      showToolbar: true, //头部操作按钮
      showGrid: true, //excel表格
      showContextmenu: true, //右键操作按钮
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      row: {
        len: 30,
        height: 25,
        minRowResizerHeight: 1, //拖拽行最小高度
      },
      col: {
        len: 20,
        width: 100,
        minWidth: 60,
        height: 0,
        minColResizerHeight: 1, //拖拽列最小高度
      },
      style: {
        bgcolor: "#ffffff",
        align: "left",
        valign: "middle",
        textwrap: false,
        strike: false,
        underline: false,
        color: "#0a0a0a",
        width: '100%',
        font: {
          name: "Microsoft YaHei",
          size: 10,
          bold: false,
          italic: false,
        },
      },
    };

    
    // If you need to override the default options, you can set the override
    // const options = {};
    // new Spreadsheet('#x-spreadsheet-demo', options);
    x_spreadsheet.locale('zh-cn', zh)
    const s = window.x_spreadsheet("#x-spreadsheet-demo", options)
      .loadData({}) // load data
      .change((data) => {
        console.log(data);
        // save data to db
      })
      ;
    this.sheet = s
    s.sheet.toolbar.save = s.sheet.toolbar.boldEl
    // data validation
    s.validate();
  },
};
</script>
