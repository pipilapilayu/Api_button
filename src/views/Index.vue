<template>
  <transition name="fade" appear>
    <div class="index">
      <Search />
      <Voice />
      <Card>
        <div style="text-align: center;color:white">
          {{ t(INFO_I18N.voiceTotalTip) }}: {{ t(INFO_I18N.voiceTotal)
          }}{{ lastDate ? `(${lastDate})` : "" }}
        </div>
      </Card>
      <Card>
        <div class="content">
          <Btn
            class="btn"
            :name="t(INFO_I18N.vtbbtn)"
            url="https://jq.qq.com/?_wv=1027&k=NkSw46pM"
            background="rgb(100, 181, 246)"
          />
          <template v-for="item in friendlyLinkList" :key="item.name">
            <Btn
              class="btn"
              :name="item.name"
              :url="item.url"
              :color="item.color"
              :background="item.background"
            />
          </template>
        </div>
      </Card>
    </div>
  </transition>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { FriendlyLink, INFO_I18N } from '@/assets/script/option'
import Search from '@/components/SearchCard.vue'
import Voice from '@/components/Voice.vue'
import Card from '@/components/common/Card.vue'
import Btn from '@/components/common/Btn.vue'
import { inject } from 'vue'

export default {
  components: {
    Search,
    Voice,
    Card,
    Btn
  },
  setup() {
    const { t } = useI18n()
    const lastDate = inject('lastDate', '')

    const friendlyLinkList: FriendlyLink[] = [
      {
        name: '旧版入口',
        url: 'http://xxapi.icu:1844',
        background: 'rgb(255, 174, 166)'
      },
      {
        name: 'github投稿入口',
        url: 'https://github.com/pipilapilayu/Api_button/issues/new?assignees=&labels=&template=----.md&title=%5B%E6%8A%95%E7%A8%BF%5D',
        background: 'rgb(0, 0, 0)'
      },
      {
        name: '腾讯表单投稿入口',
        url: 'https://docs.qq.com/form/page/DT2hyc3lyWFNHaGpa',
        background: 'rgb(30,111,255)'
      },
      {
        name: '邮件投稿入口',
        url: 'mailto:dys@xxapi.icu',
        background: 'rgb(1,0,40)'
      }
    ]

    return {
      t,
      lastDate,
      friendlyLinkList,
      INFO_I18N
    }
  }
}
</script>

<style lang="stylus" scoped>
a
  margin 0 5px

.index
  margin 0 auto
  width 100%
  background-image url('../assets/image/71517168_p4.jpg')
  background-position center center
  background-size cover
  .content
    display flex
    flex-wrap wrap

    .btn
      margin 5px
      transition background 0.2s

@media only screen and (max-width 600px)
  .index
    width 95%
</style>
