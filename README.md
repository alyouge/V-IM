# 注意事项

> 1. 打包时候项目路径不能有中文，包括你 windows 用户都不能有中文字符，因为npm 缓存都是在用户目录下（如果原先的用户名是中文，再修改成英文也不好用，因为原先的npm包都还在中文目录下）。
> 2. 使用yarn 安装依赖，npm 不是很好用，尝试过，都不能打包成功。如果yarn 不能安装依赖成功，可以多试几次，或者翻墙后再打包！

#### Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

#登录测试
> 1. 测试服务器IP:101.200.151.183,在登录界面右下角有设置的地址，默认的是本地（没有服务不好用），请知晓。
> 2. 服务端在整理中，后续开源。
> 3. 自己可以注册个用户进行测试，默认。
> 4. 没有提供在线添加好友和管理群组的功能，后续开发，好友关系维护都在后台服务里。
> 5. [下载exe安装文件](https://github.com/SimulatedGREG/electron-vue)

#交流QQ群
> QQ群：617853658（新）

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
