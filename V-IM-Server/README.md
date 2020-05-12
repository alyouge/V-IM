#### V-0.52 (觉得不错，请帮点star，谢谢)
>   1. 请更新后台
>   1. 主动推送消息给用户，新增一个system用户，负责给用户推送消息
>   2. 语句 ：INSERT INTO `im_user` (`id`, `avatar`, `name`, `sign`, `mobile`, `email`, `password`, `login_name`, `default_group_id`, `create_date`, `create_by`, `update_date`, `update_by`, `remarks`, `del_flag`) VALUES ('system', '/img/icon.png', '系统用户', '我爱吃肉', '13699988999', 'zhangsan@163.com', '{bcrypt}$2a$10$tcoeSq.LUagBuj6WalYUaeJjvXEI86YBDS6LVCQUfYtjoUvhHaUWC', 'system', '1048889640612864002', '2019-07-04 13:17:34', '', '2019-07-04 13:17:44', '', '', '0');
>   3. 调用方式：http://localhost:8080/api/user/sendMsg?access_token=你的token&userId=接收人&msg=我是消息

#### V-0.40
实现双向用户关系，新增表 im_user_friend，删除表 im_group_user，原先注册的用户已经清除，使用请重新注册。
####  V-IM-Server
https://gitee.com/lele-666/V-IM 客户端在这里

#### 介绍
V-IM 的Server端，代码比较乱，后续会重构，勿喷！！！

#### 软件架构
SpringBoot、t-io 实现后端服务
mysql 数据库

#### 安装教程

1. 安装 intellij idea 开发工具
2. maven 支持
3. 安装 mysql 数据库

#### 使用说明

1. 建立Mysql数据库，参考doc下init.sql
2. 修改application.properties 下的数据库地址信息
3. run

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)