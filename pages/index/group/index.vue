<template>
  <div>
    <Button type="primary" slot="extra" @click="add()" icon="md-add">新增</Button>
    <Row :gutter="14">
      <i-col span="6" v-for="data in list" :key="data.id" class="padding-left-10">
        <Card>
          <p slot="title" @click="open(data)">
            <Icon type="paintbucket"></Icon>
            {{data.name}}
          </p>
          <div slot="extra">
            <Button type="text" shape="circle" label="small" icon="md-create"  @click="detail(data)"> </Button>
            <Button type="text" label="small" shape="circle" icon="ios-trash-outline"/>

          </div>
          <a>
            <Row type="flex" justify="center" align="middle" class="countto-page-row">
              {{data.name}}
            </Row>
          </a>
        </Card>
      </i-col>
    </Row>
    <Modal
      v-model="model1"
      @on-ok="submit"
      @on-cancel="cancel">
      <p slot="header">
        <span>{{title}}</span>
      </p>
      <Form :model="current" :label-width="80">
        <FormItem label="分区名称">
          <Input v-model="current.name" placeholder="请输入名字"/>
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
  import {getGroup, createGroup} from "~/api/group";

  export default {
    name: "group",
    components: {},
    data() {
      return {
        model1: false,
        count: 0,
        list: [],
        current: {},
        title: "添加"
      };
    },
    methods: {
      init() {
        var userId=1;
        var user=localStorage.getItem("user");
        if(user){
          var userJson =JSON.parse(user);
          userId=userJson.id
        }
        getGroup(userId).then(res => {
          console.log(res);
          this.list = res.data;
        });
      },
      detail(data) {
         this.$router.push({path: "/group/" + data.id+"/detail"})
      },
      add() {
        this.current = {};
        this.model1 = true;
      },
      submit() {
        createGroup(this.current).then(res => {
          this.$Message.info("创建成功");
          this.init()
        }).catch(err => {
          this.$Message.info("创建失败");
        })

      },
      cancel() {
        this.$Message.info("取消");
      },
      open(data) {
        console.log(data)
        this.$router.push({path: "/edit/" + data.id})
      }
    },
    mounted() {
      this.init()
    }
  };
</script>

<style scoped>
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
</style>
