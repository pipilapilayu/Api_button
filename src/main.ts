import { App as AppType, createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import 'element-plus/dist/index.css'
import './styles/transition.styl'

import VoiceList from '@/setting/translate/voices.json'
import Locales from '@/setting/translate/locales.json'
import Setting from './setting/setting.json'

// gtag is imported from cdn and initialized in html
declare global { var gtag: (kind: 'event', eventName: string, payload: any) => void }

const CN: any = { ...Locales['zh-CN'], voice: {}, voicecategory: {} }
const JP: any = { ...Locales['ja-JP'], voice: {}, voicecategory: {} }

CN.info = {
  ...CN.info,
  ...Setting.name.CN
}

JP.info = {
  ...JP.info,
  ...Setting.name.JP
}

for (const category of VoiceList.category) {
  if (category.translate !== undefined) {
    if (category.translate['zh-CN'] !== undefined) {
      CN.voicecategory[category.name] = category.translate['zh-CN']
    }
    if (category.translate['ja-JP'] !== undefined) {
      JP.voicecategory[category.name] = category.translate['ja-JP']
    }
  }
}

for (const voice of VoiceList.voices) {
  if (voice.translate !== undefined) {
    const category = VoiceList.category.find(item => {
      if (item.name === voice.category) {
        return item
      }
    })!
    if (voice.translate['zh-CN'] !== undefined && category.translate['zh-CN'] !== undefined) {
      CN.voice[voice.name] = voice.translate['zh-CN']
    }
    if (voice.translate['ja-JP'] !== undefined && category.translate['ja-JP'] !== undefined) {
      JP.voice[voice.name] = voice.translate['ja-JP']
    }
  }
}

CN.voiceTotal = Object.keys(CN.voice).length.toString()
JP.voiceTotal = Object.keys(JP.voice).length.toString()

const i18n = createI18n({
  legacy: false,
  locale: /ja/i.test(navigator.language) ? 'ja-JP' : 'zh-CN',
  messages: {
    'zh-CN': CN,
    'ja-JP': JP
  }
})

// 延迟加载语音
const lazyload = {
  install: (app: AppType) => {
    app.directive('lazy', {
      mounted(el, binding) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const lazyImage = entry.target as HTMLImageElement
            if (entry.intersectionRatio > 0) {
              lazyImage.src = binding.value
              io.unobserve(lazyImage)
            }
          })
        })
        io.observe(el)
      }
    })
  }
}

createApp(App).use(router).use(i18n).use(lazyload).use(ElementPlus).mount('#app')
