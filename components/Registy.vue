<template>
  <Card style="width:520px">
    <div style="text-align:center">
      <h3>欢迎注册</h3>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <i-input v-model="form.name" placeholder="请输入姓名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <i-input v-model="form.password" placeholder="请输入密码"></i-input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
          <i-input v-model="form.mail" placeholder="请输入邮箱"></i-input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <i-input v-model="form.phone" placeholder="请输入邮箱"></i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleReg('form')">注册</Button>
          <Button type="primary" @click="handleRegSubmit('form')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
import { Reg } from '~/api/login.js'

export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        mail: '',
        password: '',
        phone: ''
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: '错误:姓名必填',
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: '错误:email必填',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '错误:password必填',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '错误:phone必填',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleReg(name) {
      const data = {
        name: this.form.name,
        password: this.form.password,
        phone: this.form.phone,
        email: this.form.mail
      }
      console.log('data :', data)
      Reg(data)
        .then(res => {
          this.$router.push({
            path: '/login'
          })
        })
        .catch(err => {
          console.log('err :', err)
        })
    },
    handleRegSubmit() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
