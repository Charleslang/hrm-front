<template>
  <div id="purchase">
    <div class="top">
      <div class="text">
        <span>购买产品</span>
        <span>开启属于你的管理之路</span>
      </div>
    </div>
    <div class="card-container">
      <el-card class="item" :body-style="{padding: 0}">
        <div class="time">6个月</div>
        <div class="price">￥50000</div>
        <div class="btn">
          <el-button>立即购买</el-button>
        </div>
        <div class="desc">
          *购买之前请先致电联系我们<br>
          购买之后即可使用全部功能, 有效期内免费维护
        </div>
      </el-card>
      <el-card class="item" :body-style="{padding: 0}">
        <div class="time">12个月</div>
        <div class="price">￥99000</div>
        <div class="btn">
          <el-button>立即购买</el-button>
        </div>
        <div class="desc">
          *购买之前请先致电联系我们<br>
          购买之后即可使用全部功能, 有效期内免费维护
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #purchase {
    width: 100%;
    overflow: hidden;
  }
  #purchase .top {
    width: 100%;
    /* padding: 300px 0; */
    height: 480px;
    background-image: url('~assets/images/portal/purchase1.jpg');
    background-position: center -60px;
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  #purchase .top .text {
    position: absolute;
    top: 150px;
    left: 233px;
  }
  #purchase .top .text span {
    display: block;
  }
  #purchase .top .text span:nth-child(1) {
    font-size: 36px;
    margin-bottom: 20px;
  }
  #purchase .top .text span:nth-child(2) {
    font-size: 22px;
    margin-bottom: 20px;
  }
  .card-container {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 150px 0;
  }
  .card-container .item {
    margin: 0 50px;
    text-align: center;
    width: 300px;
  }
  .card-container .item div {
    padding: 20px 20px;
  }
  .card-container .el-card__body .time{
    font-size: 30px;
    letter-spacing: 2px;
  }
  .card-container .el-card__body .price{
    font-size: 30px;
    font-weight: 600;
    color: #CA9638;
    background-color: #fbf4e4;
  }
  .card-container .el-card__body .el-button{
    color: #351d06;
    background-color: #f9d681;
    outline: none;
    border: none;
  }
  .card-container .el-card__body .desc{
    color: #888;
    font-size: 14px;
    line-height: 1.5;
  }
</style>