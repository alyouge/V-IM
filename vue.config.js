module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "https://gitee.com/lele-666/V-IM",
        productName: "v-im", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2020 乐天", //版权信息
        directories: {
          output: "./dist_electron" //输出文件路径
        },
        win: {
          //win相关配置
          icon: "public/favicon.ico",
          target: [
            {
              target: "nsis",
              arch: ["x64"]
            }
          ]
        }
      }
    }
  }
};
