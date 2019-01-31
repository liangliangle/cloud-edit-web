<template>
  <div>
    <div class="right-button">
      <Button type="primary" slot="extra" icon="md-add" @click="handleAddUser">邀请</Button>
    </div>
    <Table :columns="titles" :data="list" style="width:100%"></Table>
    <Modal v-model="modal1" title="邀请组员" @on-ok="ok">
      <Form :model="formRight" label-position="right" :label-width="100">
        <FormItem label="用户名">
          <Row>
            <Col :span="16">
            <Input style="width:250px;" v-model="nameValue" />
            </Col>
            <Col :span="8" <Icon type="md-locate" btn @click="handleClick" />
          </Row>
        </FormItem>
        <div v-if="newUser">
          <FormItem label="图片">
            <Row>
              <Col :span="12">
              <img :src="newUser.img" class="imgSet" />
              </Col>
            </Row>
          </FormItem>
          <FormItem label="手机号">
            <Row>
              <Col>
              <Input v-model="newUser.phone" style="width:250px;" />
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
      newUser: null,
      nameValue: ''
    }
  },
  methods: {
    init() {
      getUserByGroup(this.groupId).then(res => {
        this.list = res.data
      })
    },
    handleAddUser() {
      this.newUser = null
      this.nameValue = ''
      this.modal1 = true
    },
    handleUserChange(e) {
      const name = e.target.value
      this.defaultValue = name
    },
    handleClick() {
      searchMialOrPhone(this.nameValue).then(res => {
        this.newUser = res.data
      })
    },
    remove(index) {
      this.$Modal.confirm({
        title: '确认移除？',
        content: '移除' + this.list[index].userName + '?',
        onOk: () => {
          this.$Message.info('已移除')
        }
      })
    },
    ok() {
      const userData = {
        groupId: this.$route.params.id,
        userId: this.newUser.id
      }
      addUserGroup(userData).then(res => {
        this.init()
      })
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
