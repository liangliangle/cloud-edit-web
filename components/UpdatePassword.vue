<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="旧密码" prop="oldPassword">
      <Input v-model="formValidate.oldPassword" placeholder="请输入旧密码" />
    </FormItem>
    <FormItem label="新密码" prop="newPassword">
      <Input v-model="formValidate.newPassword" placeholder="请输入新密码" />
    </FormItem>
    <FormItem>
      <Button style="text-align:center;" type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </FormItem>
  </Form>
</template>
<script>
import { UpdatePassword } from '~/api/login.js'

export default {
  data() {
    return {
      formValidate: {
        id: '',
        code: '1',
        oldPassword: '',
        newPassword: ''
      },
      ruleValidate: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const data = {
            id: JSON.parse(window.localStorage.user).id,
            newPassword: this.formValidate.newPassword,
            oldPassword: this.formValidate.oldPassword
          }
          UpdatePassword(data).then(data => {
            let { status } = data
            if (status === 200) {
              this.$Message.success('更改成功!')
            } else if (status === 400 || status === 500) {
              this.$Message.error('更改失败!')
            }
          })
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
