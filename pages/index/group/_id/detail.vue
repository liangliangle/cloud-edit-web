<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="detail" @on-select="handleSelect">
          <MenuItem name="detail">
            <span class="category-title">小组详情</span>
          </MenuItem>
          <MenuItem name="users">
            <span class="category-title">人员列表</span>
          </MenuItem>
          <MenuItem name="setting">
            <span class="category-title">小组设置</span>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <Spin fix v-if="loading" size="large"></Spin>
        <GroupDetail :group="group"/>
      </div>
    </div>
  </Card>
</template>

<script>
import GroupDetail from '~/components/GroupDetail.vue'
import { getGroup } from '~/api/group'
export default {
  name: 'message',
  components: {
    GroupDetail
  },
  data() {
    return {
      loading: true,
      currentMessageType: 'detail',
      group: {
        id: null,
        name: null,
        type: null,
        userId: null,
        status: null
      },
      groupId: null
    }
  },
  computed: {},
  methods: {
    init() {
      getGroup(this.groupId).then(res => {
        this.group = res.data
        this.loading = false
      })
    },
    handleSelect(name) {
      switch (name) {
        case 'detail':
          console.log('detail')
          break
        case 'users':
          console.log('users')
          break
        case 'setting':
          console.log('setting')
          break
      }
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

<style lang="less">
.message-page {
  &-con {
    height: ~'calc(100vh - 176px)';
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con {
      border-right: 1px solid #e6e6e6;
      width: 200px;
    }
    &.message-list-con {
      border-right: 1px solid #e6e6e6;
      width: 230px;
    }
    &.message-view-con {
      position: absolute;
      top: 16px;
      bottom: 16px;
      overflow: auto;
      padding: 12px 20px 0;
      .message-view-header {
        margin-bottom: 20px;
        .message-view-title {
          display: inline-block;
        }
        .message-view-time {
          margin-left: 20px;
        }
      }
    }
    .category-title {
      display: inline-block;
      width: 65px;
    }
    .gray-dadge {
      background: gainsboro;
    }
    .not-unread-list {
      .msg-title {
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item {
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
          display: none;
        }
        &:hover {
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
