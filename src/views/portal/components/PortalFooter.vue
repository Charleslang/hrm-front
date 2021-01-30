<template>
  <div id="footer">
    <div id="top">
      <div class="top-left">人事管理系统</div>
      <div class="top-right">信息提升效率，数据洞见未来</div>
    </div>
    <div id="bottom">
      <div class="bottom-left">
        <li>联系方式: </li>
        <li>123-123-1236（每日 8:00-24:00）</li>
        <li>daijunfeng.me@hrm.com</li>
        <li>四川省成都市双流区</li>
      </div>
      <div class="bottom-right">
        <div class="item">
          <div><img src="~assets/images/portal/wx.png" alt=""></div>
          <div><span>关注公众号<br>了解更多内容</span></div>
        </div>
      </div>
    </div>
    <div id="down">
      <div>2021 © 企家有道网络技术（北京）有限公司版权所有@京ICP备15012345号 京ICP证1666666号</div>
      <div>友情链接：&nbsp;<a href="">销售易CRM</a> &nbsp;&nbsp;&nbsp;<a href="">七牛云</a></div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #footer {
    padding-top: 60px;
  }
  #footer #top {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  #footer #top .top-left{
    font-size: 20px;
    margin-right: 27px;
    font-weight: 600;
  }
  #footer #top .top-right {
    font-size: 17px;
    font-weight: normal;
  }
  #footer #bottom {
    padding: 25px 0 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
  }
  #footer #bottom .bottom-left > li {
    padding-bottom: 20px;
  }
  #footer #bottom .bottom-right {
    display: flex;

  }
  #footer #bottom .bottom-right .item {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }
  #footer #bottom .bottom-right .item img{
    width: 133px;
  }
  #footer #down {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
  }
  #footer #down a:hover{
    color: var(--color-text-highlint);
  }
</style>