<template>
  <Card style="width:320px">
    <div style="text-align:center">
      <h3>欢迎登录</h3>
      <Form ref="form" :model="form" :rules="rule">
        <FormItem prop="user">
          <Input type="text" v-model="form.user" placeholder="手机或邮箱">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">登录</Button>
          <Button type="primary" @click="handleRegSubmit('form')">注册</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>
<script>
import { login } from '~/api/login.js'

export default {
  data() {
    return {
      form: {
        user: '',
        password: ''
      },
      rule: {
        user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码.', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码必须超过6位',
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
          const authorization = this.form.user + ' ' + this.form.password
          login(authorization).then(res => {
            localStorage.setItem('token', res.data.tocken)
            localStorage.setItem('user', JSON.stringify(res.data.userDto))
            this.$router.push({
              path: '/group'
            })
          })
        }
      })
    },
    handleRegSubmit() {
      this.$router.push({
        path: '/Registy'
      })
    }
  }
}
</script>
