<template>
  <Form ref="dto" :model="group" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
              <Input v-model="group.name" placeholder="名称"/>
            </FormItem>
            <FormItem label="类型" prop="type">
          <Select v-model="group.type">
            <Option value="私有">私有</Option>
            <Option value="群组">群组</Option>
          </Select>
        </FormItem>
            <FormItem >
              <Button style="float:right" type="primary" >保存</Button>
            </FormItem>
          </Form>
</template>
<script>
  export default {
props:{group:Object},
   data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        gender: '',
        img: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        img: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'url', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    
  },
  mounted() {
    this.formValidate=this.group
  }
}
</script>
<style scoped>
.demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 0;
  background: #fff;
}
.demo-tabs-style1
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-top: 1px solid #3399ff;
}
.demo-tabs-style1
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active:before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
