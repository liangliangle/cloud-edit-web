<template>
  <div class="layout">
    <Layout>
      <Header style="padding: 0px">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">点点</div>
          <div class="layout-nav">
            <MenuItem name="group" to="/group">
              <Icon type="ios-navigate"></Icon>分组列表
            </MenuItem>
            <MenuItem name="mygroup" to="/">
              <Icon type="ios-analytics"></Icon>我的分组
            </MenuItem>
            <MenuItem name="setting" to="/">
              <Icon type="ios-paper"></Icon>设置
            </MenuItem>
            <div class="user-avator-dropdown">
              <Dropdown @on-click="handleClick">
                <Badge :dot="true">
                  <Avatar :src="userAvator"/>
                </Badge>
                <Icon :size="18" type="md-arrow-dropdown"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem name="user">个人信息</DropdownItem>
                  <DropdownItem name="message">消息中心
                    <Badge style="margin-left: 10px" :count="12"></Badge>
                  </DropdownItem>
                  <DropdownItem name="logout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '20px'}">
        <Card>
          <div style="min-height: 700px;">
            <nuxt/>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2018 &copy; lianglianglee</Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userAvator: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({
        path: '/login'
      })
    },
    handleClick(name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'message':
          this.message()
          break
        case 'user':
         this.$router.push({
        path: '/user'
      })
          break
      }
    }
  },
  mounted() {
    var user = localStorage.getItem('user')
    if (user) {
      var userJson = JSON.parse(user)
      this.userAvator = userJson.img
    } else {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 380px;
  margin: 0 auto;
  margin-right: 0px;
}

.layout-footer-center {
  text-align: center;
}
.user-avator-dropdown {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}
.user-avator-dropdown .ivu-badge-dot {
  top: 16px;
}
</style>
