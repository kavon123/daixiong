<template>
  <div>
    <img src="http://image.heimaozicode.com/video/M00/04/3E/mtcfk12oTF6AO3iqAABaSYi7rdY005.png" width="30" height="30" alt="">
  </div>
</template>

<script>
import { getBase64Image, creatImg, getBase64, getReImgBase64, callAppMethod } from "@/util/tools.js"

export default {
  data () {
    return {
      imgList: [1, 2, 3, 4]
    }
  },
  async  created () {
    await this.getListBase64()
  },
  methods: {
    async getListBase64 () {
      console.log("进了方法")
      let newList = []
      for(let index in this.imgList){
        console.log(index)
        var res 
        try {
          res = await getReImgBase64("http://image.heimaozicode.com/video/M00/04/3E/mtcfk12oTF6AO3iqAABaSYi7rdY005.png")
        } catch (error) {
          console.log("图片保存失败！")
        }
        newList.push(res)
      }
      console.log("程序最后结束", newList)
      if(newList[0]){
        console.log("还是有点的东西")
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>
