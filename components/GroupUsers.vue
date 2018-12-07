<template>
  <div>
    <div class="right-button">
      <Button type="primary" slot="extra"  icon="md-add">邀请</Button>
    </div>
    <Table :columns="titles" :data="list" style="width:100%"></Table>
  </div>
</template>
<script>
import { getGroup, getUserByGroup } from '~/api/group'
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
      list: []
    }
  },
  methods: {
    init() {
      getUserByGroup(this.groupId).then(res => {
        this.list = res.data
      })
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
  margin-bottom: 10px
}
</style>
