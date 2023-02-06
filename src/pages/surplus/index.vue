<template>
  <view class="surplus-container">
    <view class="surplus">
      余额：<text class="money">{{ user.surplus || 0 }}</text>
    </view>
    <view>
      <button class="deposit-button" @tap="handleClickDepositButton">
        充值
      </button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { mapMutations, mapState } from "vuex";
import "./index.less";
import { updateSurplus } from "@/apis/user";
import { toast } from "@/utils/toast";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    ...mapMutations("user", {updateUser: "UPDATE_USER"}),
    async handleClickDepositButton() {
      Taro.showModal({
        title: "充值",
        editable: true,
        placeholderText: "请输入金额（最多两位小数）",
        success: async ({ content }) => {
          console.log("content:", content);
          // 判断输入的内容是否为非负整数，且最多只有两位小数
          const reg = /^[0-9]+(.[0-9]{1,2})?$/
          if(reg.test(content)){
            const user = await updateSurplus(this.user, content);
            this.updateUser(user)
            toast("充值成功！");
          } else {
            toast("请输入合适的金额！", { icon: "error" })
          }
        },
      });
    },
  },
};
</script>
