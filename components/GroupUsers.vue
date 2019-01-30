<template>
  <div>
    <div class="right-button">
      <Button type="primary" slot="extra" icon="md-add" @click="handleAddUser">邀请</Button>
    </div>
    <Table :columns="titles" :data="list" style="width:100%"></Table>
    <Modal v-model="modal1" title="邀请组员" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formRight" label-position="right" :label-width="100">
        <FormItem label="用户名">
          <Row>
            <Col :span="16">
            <Input style="width:250px;" @on-change="handleUserChange" />
            </Col>
            <Col :span="8" <Icon type="md-locate" btn @click="handleClick" />
          </Row>
        </FormItem>
        <div v-if="hiddenDefault">
          <FormItem label="图片">
            <Row>
              <Col :span="12">
              <img :src="addGroup.img" class="imgSet" />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="手机号">
            <Row>
              <Col>
              <Input v-model="addGroup.phone" style="width:250px;" />
              </Col>
            </Row>
          </FormItem>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  getGroup,
  getUserByGroup,
  AddGroutNumber,
  searchMialOrPhone,
  addUserGroup
} from '~/api/group'
const addGroup = {
  id: '',
  userName: '',
  groupId: '',
  userId: '',
  img: '',
  phone: ''
}
export default {
  data() {
    return {
      titles: [
        {
          title: '用户名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',

          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '移除'
              )
            ])
          }
        }
      ],
      groupId: null,
      list: [],
      modal1: false,
      // 默认隐藏
      hiddenDefault: false,
      defaultValue: '',
      nameValue: '',
      storeUserInfo: []
    }
  },
  methods: {
    init() {
      getUserByGroup(this.groupId).then(res => {
        this.list = res.data
      })
    },
    handleAddUser() {
      this.modal1 = true
    },
    handleUserChange(e) {
      const name = e.target.value
      console.log('name :', name)
      this.defaultValue = name
      searchMialOrPhone(this.defaultValue).then(data => {
        console.log('data _____:', data)
        this.nameValue = data
        this.addGroup = {
          ...data.data
        }
        this.storeUserInfo = data.data
      })
    },
    handleClick() {
      if (this.defaultValue !== '') {
        this.hiddenDefault = true
      } else {
        console.log('---暂无数据')
      }
    },
    remove(index) {
      this.$Modal.confirm({
        title: '确认移除？',
        content: '移除' + this.list[index].userName + '?',
        onOk: () => {
          this.$Message.info('已移除')
        },
        onCancel: () => {
          this.$Message.info('操作取消')
        }
      })
    },
    ok() {
      this.$Message.info('Clicked ok')
      const userData = {
        img: this.addGroup.img,
        groupId: this.$route.params.id,
        userId: this.addGroup.id,
        userName: this.defaultValue
      }
      console.log('userData :', userData)
      addUserGroup(userData).then(data => {
        console.log('data的值为 :', data)
      })
    },
    cancel() {
      this.$Message.info('Clicked cancel')
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
<style>
.right-button {
  text-align: right;
  margin-bottom: 10px;
}
.imgSet {
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
}
</style>
