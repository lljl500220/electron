<template>
  <div class="content">
    <div class="title"></div>
    <main class="main">
      <div class="left">
        <div class="map-content content-border">
          <div class="title-img">
            <span>接入数据总量</span>
          </div>
          <ent-statistic :param="mapStatistic"></ent-statistic>
          <div class="btn-content left">
            <el-button v-for="(item,index) in mapBtnLeft" @click="mapChange(item,index)"
                       :class="{active:isActive === index}">{{ item }}
            </el-button>
          </div>
          <div class="btn-content right">
            <el-button v-for="(item,index) in mapBtnRight" @click="mapChange(item,index+5)"
                       :class="{active:isActive === index+5}">{{ item }}
            </el-button>
          </div>
          <gui-zhou-map></gui-zhou-map>
        </div>
        <div class="ent-content content-border">
          <div class="title-img">
            <span>企业档案</span>
          </div>
          <ent-statistic :param="entStatistic"></ent-statistic>
        </div>
        <div class="table-content content-border">
          <div class="title-img">
            <span>实时订单</span>
          </div>
        </div>
      </div>
      <div class="center">
      </div>
      <div class="right">
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import GuiZhouMap from "../components/GuiZhouMap.vue";
import {onMounted, ref} from "vue";
import EntStatistic from "../components/EntStatistic.vue";

//主内容框
const main: any = ref(null)
//初始化rem大小
let rem = ref('15px')
const ping = async () => {
  let a: number[] = await window.api.ping()
  rem.value = a[0] / 100 + 'px'
  localStorage.setItem('rem', (a[0] / 100).toString())
  document.getElementsByTagName('html')[0].style['font-size'] = rem.value
  document.getElementsByTagName('html')[0].style['height'] = a[1] + 'px'
  document.getElementsByTagName('html')[0].style['width'] = a[0] + 'px'
  document.getElementsByTagName('body')[0].style['height'] = a[1] + 'px'
  document.getElementsByTagName('body')[0].style['width'] = a[0] + 'px'
}

//两个展示信息的内容
const mapStatistic = ref([
  {title: '累计加油量(万升)', value: 1000, span: 12},
  {title: '累计交易金额(万元)', value: 2000, span: 12}
])

const entStatistic = ref([
  {title: '企业入驻总数', value: 1000, span: 8},
  {title: '企业建档总数', value: 2000, span: 8},
  {title: '税控系统安装总数', value: 2000, span: 8}
])

//地图按钮
const isActive = ref(0)
const mapBtnLeft = ['贵州省', '贵阳市', '六盘水', '遵义市', '安顺市']
const mapBtnRight = ['毕节市', '铜仁市', '黔南州', '黔西南', '黔东南']

//按钮改变
const mapChange = (name:string,index:number) => {
  isActive.value = index
}

setTimeout(() => {
  ping()
}, 500)

onMounted(() => {
})
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  background: url("../assets/img.png");
  background-size: cover;

  .title {
    width: 100%;
    min-height: 48px;
    height: 4rem;
    background: url("../assets/顶部背景.png");
    background-size: cover;
  }

  .main {
    width: 100%;
    display: flex;
    height: calc(100% - 4rem);
    background: url("../assets/img.png");
    background-size: cover;

    .left {
      width: 40rem;
      height: 100%;

      .map-content {
        position: relative;
        height: 23rem;

        .btn-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          bottom: 2rem;
          width: 4rem;
          height: 15rem;
          text-align: center;

          :deep(.el-button) {
            position: relative;
            width: 4rem;
            margin: 0;
            color: #fff;
            font-size: 0.8rem;
            font-family: FangSong, sans-serif;
            border: none;
            z-index: 1;
            background: rgba(64, 169, 255, 0.3);
            outline: none;
            padding: 0.5em 1em;
          }

          button:hover {
            cursor: pointer;
            animation: jelly 0.5s;
          }

          @keyframes jelly {
            0%,
            100% {
              transform: scale(1, 1);
            }

            33% {
              transform: scale(0.9, 1.1);
            }

            66% {
              transform: scale(1.1, 0.9);
            }
          }

          .active {
            background-color: rgba(64, 169, 255, 0.8);
          }
        }

        .left {
          left: 0.5rem;
        }

        .right {
          right: 0.5rem;
        }
      }

      .ent-content {
        height: calc(100% - 40rem);
      }

      .table-content {
        height: 15rem
      }
    }

    .center {
      width: 29rem;
      margin-left: 1rem;
    }

    .right {
      width: 29rem;
      margin-left: 1rem;
    }
  }

  .content-border {
    margin-top: 0.5rem;
    background: linear-gradient(to left, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) right top no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to bottom, #2474b5, #2474b5) left bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat,
    linear-gradient(to left, #2474b5, #2474b5) right bottom no-repeat;
    background-size: 2px 2rem, 2rem 2px, 2px 2rem, 2rem 2px;
  }

  .title-img {
    height: 2rem;
    width: 100%;
    text-align: center;
    background-size: auto;
    background: url("../assets/title-bg1.png") center no-repeat;

    span {
      height: 2rem;
      line-height: 2rem;
    }
  }
}
</style>
