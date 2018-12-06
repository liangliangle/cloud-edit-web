<template>
  <div class="demo-split left-split">
    <Split v-model="split1">
      <div slot="left">
        <div style="text-align:right">
          <Button type="primary" style="margin:5px;" v-if="current.id" @click="update">编辑</Button>
          <Button type="primary" style="margin:5px;" @click="append">新增</Button>
        </div>
        <hr style="margin:5px 0px 5px 0px ;" color="#aaaaaa">
        <Tree :data="editList" @on-select-change="getDetail"></Tree>
      </div>
      <div slot="right">
        <div class="markdown-wrapper">
          <mavon-editor
            v-if="current.id"
            style="height:800px;z-index:initial;-webkit-appearance: initial;"
            v-model="current.content"
          ></mavon-editor>
        </div>
      </div>
    </Split>
    <Modal v-model="model1" @on-ok="submit" @on-cancel="cancel">
      <p slot="header">
        <span>{{current.title}}</span>
      </p>
      <Form :model="current" :label-width="80">
        <FormItem label="笔记名称">
          <Input v-model="current.title" placeholder="请输入名字"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getEditByGroup, createEdit, getEditById, update } from '~/api/edit'

export default {
  name: 'edit',
  components: { 'mavon-editor': mavonEditor.mavonEditor },
  data() {
    return {
      split1: 0.3,
      groupId: null,
      editList: [],
      current: {
        content: '',
        groupId: null,
        parentId: 0,
        title: null,
        id: null
      },
      model1: false
    }
  },
  methods: {
    init() {
      getEditByGroup({ groupId: this.groupId }).then(res => {
        this.editList = res.data
      })
    },
    submit() {
      if (!this.current.parentId) {
        this.current.parentId = 0
      }
      if (this.current.id) {
        update(this.current).then(res => {
          this.init()
          this.$Message.info('修改成功')
        })
      } else {
        createEdit(this.current).then(res => {
          this.init()
          this.$Message.info('创建成功')
        })
      }
    },
    cancel() {
      this.$Message.info('取消')
    },
    getDetail(data) {
      console.log(data)
      if (this.current.id) {
        update(this.current).then(res => {
          this.$Message.info('已保存')
        })
      }
      if (data.length) {
        getEditById({ id: data[0].id }).then(res => {
          this.current = res.data
          if (!this.current.content) {
            this.current.content = ''
          }
        })
      } else {
        this.current.id = null
        this.current.parentId = 0
      }
    },
    update() {
      this.model1 = true
    },
    append() {
      this.current = {
        groupId: this.groupId,
        parentId: this.current.id
      }
      this.model1 = true
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  },
  mounted() {
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.groupId = id
      this.init()
    }
  }
}
</script>

<style scoped>
.demo-split {
  height: 800px;
  border-radius: 5px;
}

.left-split {
  background-color: #ffffff;
}

.markdown-wrapper {
  padding-left: 10px;
  -webkit-appearance: initial !important
}
</style>
