# Api按钮 / Api BUTTON

##### 项目地址: https://www.xxapi.icu/

本项目基于https://github.com/blacktunes/kaguranana-button 修改而成

### 相关链接：


### 参与完善本项目

- 您可以在[Issues](https://github.com/DYS763/Api_button/issues)提出您的建议。
  - 若是请求添加新语音，请使用指定的**issues模板**

- 如果您可以进行开发，那么请**Fork**本项目进行修改，完成修改后在本项目中发起一个**Pull Request**，详细说明请查看以下条目

### 添加或修改音频/完善翻译

音频文件推荐使用**mp3**格式，请先音量标准化，然后放入`public/voices/`目录

所有的音频信息都存储在`src/setting/translate/voices.json`中，**添加或修改音频信息**、**完善翻译**，你同样需要修改这个文件中对应的内容

- 添加`usePicture`字段可以添加鼠标悬浮时显示的图片(请放到`public/voices/img`目录)

- 添加`mark`字段可以添加音频出处信息

`voices.json`结构示例如下：
```
{
  // 语音分类列表
  "category": [
    {
      // 分类命名
      "name": "分类名",
      "translate": {
        // 分类中文翻译
        "zh-CN": "分类中文名",
        // 分类英文翻译
        "en-US": "name"
      }
    }
  ],
  // 语音列表
  "voices": [
    {
      // 语音命名
      "name": "123",
      // 语音文件名
      "path": "123.mp3",
      "translate": {
        // 语音中文翻译
        "zh-CN": "一二三",
        // 语音英文翻译
        "en-US": "123"
      },
      // 语音所属分类(对应category的name)
      "category": "名言",
      // 以下属性为可选
      // 添加时间
      "date": "2020-11-11",
      // 语音出处
      "mark": {
        "title": "【XX】xxxxxxXXX",
        "time": "0:01~0:03",
        "url": "https://www.bilibili.com/video/BVXXXXXX"
      }
    }
  ]
}
```

### 参与网页开发

本项目使用`Vue3.0`进行开发，使用`yarn`进行包管理
要部署本地开发环境，请先安装较新版的`Node`

1. **Fork**并**Clone**代码到本地
2. 进入代码目录，运行`yarn`以安装依赖项目
3. 开启本地开发服务器，运行`yarn serve`，这将会在`localhost:8080`启动，在代码修改过程中，本地开发服务器可以即时反映修改的结果
4. 要编译可供部署的文件，请运行`yarn build`，这将会在`dist`目录下生成可以直接部署到静态网站托管(GitHub Pages等)或服务器的文件

### 使用模板

若想使用网站模板开发新的语音按钮，可以选择以下方式:
- 修改`public`和`scr/setting`目录下的文件以及`package.json`
