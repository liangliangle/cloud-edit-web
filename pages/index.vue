<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">点点</div>
          <div class="layout-nav">
            <MenuItem name="group" to="/group">
              <Icon type="ios-navigate"></Icon>
              分组列表
            </MenuItem>
            <MenuItem name="mygroup" to="/">
              <Icon type="ios-analytics"></Icon>
              我的分组
            </MenuItem>
            <MenuItem name="setting" to="/">
              <Icon type="ios-paper"></Icon>
              设置
            </MenuItem>
            <MenuItem name="my" to="/">
              <Icon type="ios-paper"></Icon>
              个人
            </MenuItem>
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
  export default {}
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
    width: 440px;
    margin: 0 auto;
    margin-right: 0px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
