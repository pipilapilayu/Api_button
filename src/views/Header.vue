<template>
  <transition name="slider-down" appear>
    <div class="header">
      <transition name="logo" appear>
        <div class="logo" ref="logo" @click="logoClick">{{ icon }}</div>
      </transition>
      <router-link :to="titlePath">
        <div class="title">{{ headerTitle }}</div>
      </router-link>
      <template v-for="(btn, index) in btnList" :key="index">
        <IBtn v-if="btn.url" :url="btn.url" :img="btn.img" />
      </template>
      <transition name="fade">
      <div class="search-btn" @click="showSearch" v-if="showSearchBtn">
        <svg
          t="1599130871274"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8859"
          width="30"
          height="30"
        >
          <path
            d="M995.209792 859.621209c17.352203 17.350157 28.086685 41.318034 28.086685 67.807339 0 52.928466-42.916439 95.869465-95.869465 95.869465-26.463722 0-50.429553-10.734482-67.781756-28.086685l0 0L578.68426 714.24726c-57.097416 33.703613-123.432217 53.401234-194.509019 53.401234-211.783451 0-383.472741-171.688267-383.472741-383.472741S172.390767 0.703011 384.176264 0.703011s383.472741 171.687244 383.472741 383.471718c0 71.076802-19.696598 137.41058-53.402257 194.483436L995.209792 859.621209 995.209792 859.621209zM384.176264 96.54587c-158.831448 0-287.605324 128.772852-287.605324 287.62886 0 158.832472 128.772852 287.606347 287.605324 287.606347S671.781588 543.007201 671.781588 384.17473C671.779541 225.318722 543.008736 96.54587 384.176264 96.54587z"
            p-id="8860"
          />
        </svg>
      </div>
      </transition>
      <transition name="fade">
        <Search class="search" v-if="showSearchBtn" />
      </transition>
      <div class="btn" :title="t(INFO_I18N.lang)" @click="changeLang">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M4.10514201,11.8070619 L2.74013818,2.2520351 L22.236068,12 L2.74013818,21.7479649 L4.10514201,12.1929381 L4.87689437,12 L4.10514201,11.8070619 Z M5.25986182,5.7479649 L5.89485799,10.1929381 L13.1231056,12 L5.89485799,13.8070619 L5.25986182,18.2520351 L17.763932,12 L5.25986182,5.7479649 Z"/>
</svg>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, inject, onMounted, Ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { INFO_I18N, IsShowSearch, SearchData } from '@/assets/script/option'
import IBtn from '@/components/common/IconBtn.vue'
import Search from '@/components/Search.vue'
import Setting from '@/setting/setting.json'
import { ElMessageBox, Action } from 'element-plus'

export default {
  components: {
    IBtn,
    Search
  },
  emits: ['setAsideShow'],
  setup(props, { emit }) {
    const searchData: SearchData = inject('searchData') as SearchData

    let btnList: { url: string | false; img: string }[] = []
    if ((Setting as any).header) {
      btnList = [
        {
          url: (Setting as any).header.youtube || false,
          img: require('../assets/image/weibo.png')
        },
        {
          url: (Setting as any).header.twitter || false,
          img: require('../assets/image/twitter-fill.png')
        },
        {
          url: (Setting as any).header.bilibili || false,
          img: require('../assets/image/bilibili-fill.png')
        }
      ]
    }

    const logo: Ref<HTMLElement> = ref() as Ref<HTMLElement>
    let isRestart = false
    const logoClick = () => {
      console.log('logo')

      setAsideShow()
      if (!logo.value) return
      if (isRestart) {
        logo.value.style.animation = 'logo 1s'
        isRestart = !isRestart
      } else {
        logo.value.style.animation = 'logo-restart 1s'
        isRestart = !isRestart
      }
    }
    const asideShow = ref(false)
    const setAsideShow = () => {
      asideShow.value = !asideShow.value
      // defineEmits('setAsideShow', asideShow.value)
      emit('setAsideShow', asideShow.value)
      console.log(asideShow.value)

      // window.localStorage.setItem('asideShow', JSON.stringify(asideShow.value))
    }
    const isShowSearch: Ref<IsShowSearch> = inject('isShowSearch') as Ref<IsShowSearch>

    const route = useRoute()

    const titlePath = computed(() => {
      return route.path === '/' ? '/memes' : '/'
    })

    const headerTitle = computed(() => {
      if (route.path.startsWith('/memes')) {
        return t('info.memes')
      } else {
        return t('info.title')
      }
    })

    const showSearch = () => {
      isShowSearch.value = !isShowSearch.value
      if (!isShowSearch.value) {
        searchData.value = ''
        searchData.list.length = 0
      }
    }

    const showSearchBtn = computed(() => {
      return route.path === '/' || route.path === '/search'
    })

    const { t, locale } = useI18n()

    const clicknNum = ref(0)
    const changeLang = () => {
      if (clicknNum.value === 3) {
        ElMessageBox.alert('好像发现了新按钮？', '哦？', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: '去找找？',
          callback: (action: Action) => {
            window.sessionStorage.setItem('CPBTN', '1')
            location.reload()
          }
        })
      } else {
        clicknNum.value += 1
      }
      // searchData.value = ''
      // searchData.list.length = 0
      // if (locale.value === 'ja-JP') {
      //   locale.value = 'zh-CN'
      //   localStorage.setItem('lang', 'zh-CN')
      // } else {
      //   // window.open(
      //   //   //  以下为投稿按钮（右上角）跳转链接，暂未接入
      //   //   //  'http://www.xxapi.ys168.com/', 'newwindow', 'height=400, width=640, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no,status=no'
      //   // )
      // }
    }
    // const changeLang = () => {
    //   searchData.value = ''
    //   searchData.list.length = 0
    //   if (locale.value === 'ja-JP') {
    //     locale.value = 'zh-CN'
    //     localStorage.setItem('lang', 'zh-CN')
    //   } else {
    //     window.open(
    //       'http://www.xxapi.ys168.com/', 'newwindow', 'height=400, width=640, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no,status=no'
    //     )
    //   }
    // }

    watch(route, () => {
      if (route.path.startsWith('/memes')) {
        document.title = t('info.memes')
      } else {
        document.title = t(INFO_I18N.title)
      }
    })
    watch(locale, () => {
      if (route.path.startsWith('/memes')) {
        document.title = t('info.memes')
      } else {
        document.title = t(INFO_I18N.title)
      }
    })

    onMounted(() => {
      const lang = localStorage.getItem('lang')
      if (lang) locale.value = lang
      document.title = t(INFO_I18N.title)
    })

    return {
      icon: Setting.header.icon,
      btnList,
      logo,
      logoClick,
      titlePath,
      headerTitle,
      showSearchBtn,
      t,
      changeLang,
      showSearch,
      INFO_I18N
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  z-index 5
  display flex
  align-items center
  position sticky
  top 0
  height 48px
  background linear-gradient(to right, $main-color, $sub-color), rgba(255, 255, 255, 0.8)

  *
    flex-shrink 0

  .logo
    display block
    width 35px
    height 35px
    font-size 25px
    line-height 35px
    margin 0 10px
    text-align center
    user-select none

  .title
    color #eee
    font-size 20px
    margin-right 10px
    user-select none

  .search-btn
    width 30px
    height 30px
    margin 0 5px
    border-radius 50%
    background rgba(255, 255, 255, 0.5)

    svg
      width 60%
      height 60%
      padding 20%
      fill #666

    &:active
      background rgba(255, 255, 255, 0.6)
      box-shadow 0px 0px 10px 0px $sub-color

  .btn
    flex-shrink 0
    width 30px
    height 30px
    margin 0 10px 0 auto
    border-radius 50%
    background rgba(255, 255, 187, 0.5)
    cursor pointer

    svg
      height 70%
      width 70%
      padding 15%
      fill #fff

    &:hover
      box-shadow 0px 0px 5px 0px #fff

    &:active
      background rgba(245, 193, 187, 0.6)

@media only screen and (min-width 550px)
  .search-btn
    display none

@media only screen and (max-width 550px)
  .search-btn
    display block

  .search
    width 0px
    margin 0
    opacity 0
</style>
