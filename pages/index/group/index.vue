<template>
  <div>
    <Spin size="large" fix v-if="loading">
      加载中...
    </Spin>
    <div class="right-button">
      <Button type="primary" slot="extra" @click="add()" icon="md-add">新增</Button>
    </div>
    <Row :gutter="14">
      <i-col span="6" v-for="data in list" :key="data.id" class="padding-left-10">
        <Card class="top-padding-10">
          <p slot="title" @click="open(data)">
            <Icon type="paintbucket"></Icon>
            {{data.name}}
          </p>
          <div slot="extra">
            <Button type="text" shape="circle" label="small" icon="md-create" @click="detail(data)"></Button>
            <Button type="text" label="small" shape="circle" icon="ios-trash-outline" />
          </div>
          <a @click="open(data)">
            <Row type="flex" justify="center" align="middle" class="countto-page-row">{{data.name}}</Row>
          </a>
        </Card>
      </i-col>
    </Row>
    <Modal v-model="model1" @on-ok="submit" @on-cancel="cancel">
      <p slot="header">
        <span>{{title}}</span>
      </p>
      <Form :model="current" :label-width="80">
        <FormItem label="分区名称">
          <Input v-model="current.name" placeholder="请输入名字" />
        </FormItem>
        <FormItem label="类型">
          <Select v-model="current.type">
            <Option value="私有">私有</Option>
            <Option value="群组">群组</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getGroupByUser, createGroup } from '~/api/group'

export default {
  name: 'group',
  components: {},
  data() {
    return {
      loading: true,
      model1: false,
      count: 0,
      list: [],
      current: {},
      title: '添加'
    }
  },
  methods: {
    init() {
      this.loading = true
      var userId = 1
      var user = localStorage.getItem('user')
      if (user) {
        var userJson = JSON.parse(user)
        userId = userJson.id
      }
      getGroupByUser(userId).then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    detail(data) {
      console.log('data :', data)
      this.$router.push({
        path: '/group/' + data.id + '/detail',
        params: { id: data.id }
      })
    },
    add() {
      this.current = {}
      this.model1 = true
    },
    submit() {
      console.log(this.current)
      createGroup(this.current)
        .then(res => {
          this.$Message.info('创建成功')
          this.init()
        })
       
    },
    cancel() {
      this.$Message.info('取消')
    },
    open(data) {
      console.log(data)
      this.$router.push({ path: '/edit/' + data.id })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.top-padding-10 {
  margin: 10px;
}
.countto-page-row {
  height: 200px;
}

.count-to-con {
  display: block;
  width: 100%;
  text-align: center;
}

.count-text {
  font-size: 50px;
  color: #dc9387;
}

.slot-text {
  font-size: 22px;
}

.unit-class {
  font-size: 30px;
  color: #dc9387;
}
.right-button {
  text-align: right;
}
</style>
