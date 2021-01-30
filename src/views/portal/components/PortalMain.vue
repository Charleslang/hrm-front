<template>
  <div id="portal-main">
    <div class="top">
      <div class="left">
        <div class="title1">薪人薪事，让人事管理更简单</div>
        <div class="title2">信息提升效率，数据洞见未来</div>
        <div>
          <el-button round type="primary">免费试用</el-button>
          <el-button round type="danger" @click="toPurchase">购买产品</el-button>
        </div>
      </div>
      <div class="right"><img src="~assets/images/portal/banner1.gif" alt=""></div>
    </div>
    <div class="center">
      <div class="center-top">
        <div class="center-title1">我们能为你做什么</div>
        <div class="center-title2">功能覆盖人力全模块，开启高效规范新管理</div>
      </div>
      <div class="center-content">
        <div class="content-employee">
          <div class="item-img"><img src="~assets/images/portal/employee.png" alt=""></div>
          <div class="item-content">
            <h2>员工</h2>
            <div class="desc">告别纸质档案 员⼯管理线上化</div>
            <em></em>
            <div class="info">
              入转调离线上办理，记录员工成长轨迹<br>
              员工信息全面归档，打造高效信息平台<br>
              重要事项准时提醒，有效规避劳动风险<br>
              人事报表随时取用，实时掌握人员异动
            </div>
          </div>
        </div>
        <div class="content-organization">
          <div class="item-img"><img src="~assets/images/portal/organization.png" alt=""></div>
          <div class="item-content">
            <h2>组织</h2>
            <div class="desc">灵活配置管理权限 ⽀持复杂组织架构</div>
            <em></em>
            <div class="info">
              灵活设置多级部⻔，快速搭建架构体系<br>
              直观查看组织架构图，⽀持⼀键导出<br>
              强大的权限定义，多维度精细设置<br>
              编制直观查看，成本控制⼼中有数
            </div>
          </div>
        </div>
        <div class="content-attendance">
          <div class="item-img"><img src="~assets/images/portal/attendance.png" alt=""></div>
          <div class="item-content">
            <h2>考勤</h2>
            <div class="desc">考勤方案自定义 灵活打卡更便捷</div>
            <em></em>
            <div class="info">
              设置不同考勤⽅案，⽀持多种打卡⽅式<br>
              灵活多样的班次设置，考勤管理更清晰<br>
              ⼀键获取考勤报表，数据精准同步⼯资<br>
              考勤异常及时提醒，员工自主管理更高效
            </div>
          </div>
        </div>
        <div class="content-payroll">
          <div class="item-img"><img src="~assets/images/portal/payroll.png" alt=""></div>
          <div class="item-content">
            <h2>薪资</h2>
            <div class="desc">个性化薪酬⽅案 系统算薪更准确</div>
            <em></em>
            <div class="info">
              针对不同员⼯，灵活配置薪酬⽅案<br>
              对接国税平台，信息互通一键报税<br>
              精准测算五险一金，自动生成工资报表<br>
              智能⼯资条发放，⼯资项区分展示
            </div>
          </div>
        </div>
        <div class="content-contract">
          <div class="item-img"><img src="~assets/images/portal/contract.png" alt=""></div>
          <div class="item-content">
            <h2>电子合同</h2>
            <div class="desc">合同签署⼀应俱全 信息保密安全可靠</div>
            <em></em>
            <div class="info">
              ⾃定义合同模板，多类签发⽂件即时⽣成<br>
              设置定向发起，合同分发规范安全<br>
              劳动合同签订结果⾃动同步员⼯模块<br>
              多个合同主体，统⼀在线管理
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-title">加入我们，体验你早该拥有的人力资源系统吧</div>
      <div class="bottom-img"><img src="~assets/images/portal/pageindex.png" alt=""></div>
    </div>
  </div>
    
</template>

<script>
  export default {
    methods: {
      toPurchase() {
        this.$router.push('/purchase')
      }
    }
  }
</script>

<style scoped>
  #portal-main {
    width: 100%;
    padding: 0 233px;
  }
  #portal-main .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 50px;
    border-bottom: 1px solid #e5e5e5;
  }
  #portal-main .top .left .title1{
    font-weight: 500;
    font-size: 40px;
    color: #1d1d1f;
  }

  #portal-main .top .left .title2{
    font-weight: 500;
    font-size: 22px;
    color: #1d1d1f;
    margin: 22px 0 40px;
  }
  #portal-main .top .left .el-button {
    font-size: 18px;
    border: none;
    outline: none;
    letter-spacing: 1.2px;
  }
  #portal-main .top .left .el-button:nth-child(1) {
    background-color: var(--color-text-highlint);
    color: #fff;
    margin-right: 12px;
  }
  #portal-main .top .left .el-button:nth-child(2) {
    background-color: #f1684f;
    color: #fff;
  }

  #portal-main .top .left .el-button:nth-child(1):hover {
    box-shadow: 0 8px 11px 0 rgba(0,199,179,0.3);
    transition: all 0.3s;
  }
  #portal-main .top .left .el-button:nth-child(2):hover {
    box-shadow: 0 8px 11px 0 rgba(199, 63, 0, 0.3);
    transition: all 0.3s;
  }
  #portal-main .center {
    margin-top: 80px;
    width: 100%;
  }
  #portal-main .center .center-top {
    text-align: center;
  }
  #portal-main .center .center-title1 {
    color: #3d4450;
    font-size: 30px;
    margin-bottom: 26px;
  }
  #portal-main .center .center-title2 {
    color: #7b8390;
    font-size: 16px;
    margin-bottom: 20px;
  }
  #portal-main .center .center-content > div {
    padding: 60px 0;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #portal-main .center .center-content > div:last-of-type {
    border: none;
  }
  #portal-main .center .center-content > div:nth-child(2n) {
    flex-direction: row-reverse;
  }
  #portal-main .center .center-content >div img {
    width: 480px;
  }
  #portal-main .center .center-content > div h2 {
    color: #333;
    letter-spacing: 2px;
    font-size: 26px;
  }
  #portal-main .center .center-content > div .desc {
    color: #666;
    padding: 15px 0;
    font-size: 20px;
  }
  #portal-main .center .center-content > div em {
    display: block;
    width: 26px;
    height: 2px;
    background: #1ac0bd;
    margin-bottom: 40px;
  }
  #portal-main .center .center-content > div .info {
    color: #999;
    line-height: 1.8;
  }
  #portal-main .bottom {
    margin-top: 100px;
  }

  #portal-main .bottom .bottom-title {
    font-size: 30px;
    text-align: center;
  }
  #portal-main .bottom img {
    width: 823px;
  }
  #portal-main .bottom .bottom-img {
    margin-top: 40px;
    text-align: center;
  }
</style>