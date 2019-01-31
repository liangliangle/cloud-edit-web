<template>
  <Row :gutter="32">
    <Col span="8" class="demo-tabs-style">
    <Tabs type="card">
      <TabPane label="个人信息">
        <UserDetail />
      </TabPane>
      <TabPane label="修改密码">
        <update-password />
      </TabPane>
      <TabPane label="设置">标签三的内容</TabPane>
    </Tabs>
    </Col>
  </Row>
</template>

</template>
<script>
import UserDetail from '~/components/UserDetail.vue'
import UpdatePassword from '~/components/UpdatePassword.vue'
export default {
  components: {
    UserDetail,
    UpdatePassword
  },
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
        mail: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  },
  mounted() {
    var user = localStorage.getItem('user')
    if (user) {
      var userJson = JSON.parse(user)
      this.formValidate = userJson
    }
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
