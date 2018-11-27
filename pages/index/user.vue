<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="头像" prop="name">
      <Avatar :src="formValidate.img"/>
      <Upload>
        <Button icon="ios-cloud-upload-outline" accept="image/*">上传头像</Button>
      </Upload>
    </FormItem>
    <FormItem label="Name" prop="name">
      <Input v-model="formValidate.name" placeholder="名称"/>
    </FormItem>
    <FormItem label="E-mail" prop="mail">
      <Input v-model="formValidate.mail" placeholder="邮箱"/>
    </FormItem>

    <FormItem label="Gender" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
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
        ] ,
        img:[
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'url', message: 'Incorrect email format', trigger: 'blur' }
        ],
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
      this.formValidate=userJson;
    }
  }
}
</script>