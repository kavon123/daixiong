<!--  -->
<template>
  <div>
    <transition>
      <div class="dialog">
        <div class="dialog_ct">
          <div class="centent">告知好友查看短信，可提高30%成功率哦</div>
          <div class="channel">
            <div class="item">
              <img src="@/assets/images/WX.png" />
              <div>告知微信好友</div>
            </div>
            <div class="item">
              <img src="@/assets/images/QQ.png" />
              <div>告知QQ好友</div>
            </div>
          </div>
          <div class="but" @click="fnClose">关闭</div>
        </div>
        <van-icon name="close" class="close" @click="fnClose" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    fnClose() {
      this.$emit("close", "noticeShow", false);
    }
  }
};
</script>
<style lang='less' scoped>
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .dialog_ct {
    width: 300px;
    height: 348px;
    background-image: url("../images/sccImg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .centent {
      margin: 94px 18px 24px;
      background: #fdeeeb;
      border-radius: 10px;
      padding: 14px 19px;
      font-size: 14px;
      font-weight: normal;
      color: #000;
      line-height: 20px;
    }
    .channel {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
          width: 45px;
          height: 45px;
          margin-bottom: 5px;
        }
      }
    }
    .but {
      padding: 10px 40px;
      height: 40px;
      font-size: 15px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      background: linear-gradient(
        180deg,
        rgba(253, 131, 50, 1) 0%,
        rgba(249, 94, 29, 1) 100%
      );
      box-shadow: 0px 5px 5px 0px rgba(174, 39, 45, 0.2);
      border-radius: 23px;
      margin: 30px 0;
    }
  }
  .close {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>