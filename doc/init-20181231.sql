/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : vim

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2018-12-31 17:37:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for im_chat_group
-- ----------------------------
DROP TABLE IF EXISTS `im_chat_group`;
CREATE TABLE `im_chat_group` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '群名称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '群头像',
  `master` varchar(64) DEFAULT NULL COMMENT '群主',
  `remarks` varchar(600) DEFAULT NULL COMMENT '说明',
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='群';

-- ----------------------------
-- Records of im_chat_group
-- ----------------------------
INSERT INTO `im_chat_group` VALUES ('e83018ca92cb441aa93484af2deb8456', 'V-IM 讨论', '/img/group-img.png', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for im_chat_group_user
-- ----------------------------
DROP TABLE IF EXISTS `im_chat_group_user`;
CREATE TABLE `im_chat_group_user` (
  `chat_group_id` varchar(64) NOT NULL COMMENT '群id',
  `user_id` varchar(64) NOT NULL COMMENT '用户id',
  `create_date` datetime DEFAULT NULL COMMENT '入群时间',
  PRIMARY KEY (`chat_group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='群';

-- ----------------------------
-- Records of im_chat_group_user
-- ----------------------------
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '026e5cc22bfc4493abb49cdd5a55b4a7', '2018-12-19 11:13:51');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '0f38e2b3dcee4cfc8abd30fb23f3c947', '2018-12-09 16:33:24');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '1094c83fc3d7478b999c410e3e05abf2', '2018-12-22 19:05:53');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '1c741437a9b14e95a7016100b00996da', '2018-12-27 15:34:35');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '206fb75e07e84059a3d20515f4081ceb', '2018-12-21 10:39:23');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '2f22c4791be640b983d887899875ebbb', '2018-12-20 19:52:55');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '378770683073431eb947744fd2b390bc', '2018-12-30 23:45:40');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '428edf4fcf0242a49198d32845b0b1ec', '2018-12-31 17:19:46');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '5bc0dbdca8414147b1525d8c9f98393f', '2018-12-09 22:15:28');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '69f4fd5775804abeb322e15cc7c4fd01', '2018-12-26 14:00:40');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '6da3eb4299294a7280896fb3d6476f1d', '2018-12-31 17:08:04');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '79f7aaf0c50149cba5fd9bdd97f0c432', '2018-12-20 10:05:41');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '83abbf3bb4b14a08a7b674d3bd35cffc', '2018-12-28 15:31:10');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', '9edb4010770b49c7a9a5f6df183e7a70', '2018-12-09 20:41:01');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'ab1bd7aa01e344c780f904b028de852b', '2018-12-31 17:19:03');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'ae0b0dae35a047758ebedab7e7db4873', '2018-12-31 00:11:17');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'c69787c134b04d6f8127d512c269360f', '2018-10-28 15:53:14');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'c8fbea756238432584b1a79c035b3a00', '2018-12-24 16:29:38');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'cb0c145a6c104497942525f8c984f9d9', '2018-10-28 15:53:14');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'dfe980480ca7494b97c167028f1808da', '2018-12-26 10:50:53');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'e88d9fd36e5c4896a5a17a21b37325c2', '2018-12-10 15:41:17');
INSERT INTO `im_chat_group_user` VALUES ('e83018ca92cb441aa93484af2deb8456', 'e9dcc0a3fdb04b73b755fb2be1e64369', '2018-12-31 17:15:06');

-- ----------------------------
-- Table structure for im_group
-- ----------------------------
DROP TABLE IF EXISTS `im_group`;
CREATE TABLE `im_group` (
  `id` varchar(64) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of im_group
-- ----------------------------
INSERT INTO `im_group` VALUES ('04ab12ad65d54a818a6b373eb8e762c6', '79f7aaf0c50149cba5fd9bdd97f0c432', '我的好友', '2018-12-20 10:05:41', null, '2018-12-20 10:05:41', null, '0', null);
INSERT INTO `im_group` VALUES ('0bdd1bf7fb034422a655de8866ba5a92', 'ab1bd7aa01e344c780f904b028de852b', '我的好友', '2018-12-31 17:19:02', null, '2018-12-31 17:19:02', null, '0', null);
INSERT INTO `im_group` VALUES ('1048889640612864002', 'cb0c145a6c104497942525f8c984f9d9', '好基友', null, null, null, null, null, null);
INSERT INTO `im_group` VALUES ('1048889640612864003', 'cb0c145a6c104497942525f8c984f9d9', '同事', null, null, null, null, null, null);
INSERT INTO `im_group` VALUES ('1048889640612864005', 'c69787c134b04d6f8127d512c269360f', '同学', null, null, null, null, null, null);
INSERT INTO `im_group` VALUES ('12681abf790f4adda7e0de882d8dfbfe', '83abbf3bb4b14a08a7b674d3bd35cffc', '我的好友', '2018-12-28 15:31:10', null, '2018-12-28 15:31:10', null, '0', null);
INSERT INTO `im_group` VALUES ('1d8cd714acba4dc7843c80a36f8025fb', '6da3eb4299294a7280896fb3d6476f1d', '我的好友', '2018-12-31 17:08:04', null, '2018-12-31 17:08:04', null, '0', null);
INSERT INTO `im_group` VALUES ('3170f72f06a84e44adb756df2e671278', '206fb75e07e84059a3d20515f4081ceb', '我的好友', '2018-12-21 10:39:23', null, '2018-12-21 10:39:23', null, '0', null);
INSERT INTO `im_group` VALUES ('398bb1d994a944d28060d428d432225f', 'e88d9fd36e5c4896a5a17a21b37325c2', '我的好友', '2018-12-10 15:41:17', null, '2018-12-10 15:41:17', null, '0', null);
INSERT INTO `im_group` VALUES ('55afce4962e74b168cffe438bdb46ea2', '428edf4fcf0242a49198d32845b0b1ec', '我的好友', '2018-12-31 17:19:46', null, '2018-12-31 17:19:46', null, '0', null);
INSERT INTO `im_group` VALUES ('5e4fa5cba64c4c94a9ff7fb65e405bbf', '378770683073431eb947744fd2b390bc', '我的好友', '2018-12-30 23:45:40', null, '2018-12-30 23:45:40', null, '0', null);
INSERT INTO `im_group` VALUES ('6c7d317ea5c74fb798b8a55eef8e335a', '2f22c4791be640b983d887899875ebbb', '我的好友', '2018-12-20 19:52:55', null, '2018-12-20 19:52:55', null, '0', null);
INSERT INTO `im_group` VALUES ('781e2ca8f9534edfa44bc67cabad9bc1', 'c8fbea756238432584b1a79c035b3a00', '我的好友', '2018-12-24 16:29:38', null, '2018-12-24 16:29:38', null, '0', null);
INSERT INTO `im_group` VALUES ('8683d8ba919c473da016340a7d48eb11', 'ae0b0dae35a047758ebedab7e7db4873', '我的好友', '2018-12-31 00:11:17', null, '2018-12-31 00:11:17', null, '0', null);
INSERT INTO `im_group` VALUES ('9d003609d56546628d7ede5fc0019fd9', '69f4fd5775804abeb322e15cc7c4fd01', '我的好友', '2018-12-26 14:00:40', null, '2018-12-26 14:00:40', null, '0', null);
INSERT INTO `im_group` VALUES ('bdd5871309b84776b75edcc8bc581a1d', '1c741437a9b14e95a7016100b00996da', '我的好友', '2018-12-27 15:34:35', null, '2018-12-27 15:34:35', null, '0', null);
INSERT INTO `im_group` VALUES ('d06e93bb07634c3b914e44c68ec8d9f3', 'dfe980480ca7494b97c167028f1808da', '我的好友', '2018-12-26 10:50:53', null, '2018-12-26 10:50:53', null, '0', null);
INSERT INTO `im_group` VALUES ('daef1c04d8cd4937b2d0e1a18b8a0525', '0f38e2b3dcee4cfc8abd30fb23f3c947', '我的好友', '2018-12-09 16:33:24', null, '2018-12-09 16:33:24', null, '0', null);
INSERT INTO `im_group` VALUES ('e01d37cc0d9247209417a15221816b3a', '026e5cc22bfc4493abb49cdd5a55b4a7', '我的好友', '2018-12-19 11:13:51', null, '2018-12-19 11:13:51', null, '0', null);
INSERT INTO `im_group` VALUES ('ec12df1f5e644084a9f17443f9d81de7', '1094c83fc3d7478b999c410e3e05abf2', '我的好友', '2018-12-22 19:05:53', null, '2018-12-22 19:05:53', null, '0', null);
INSERT INTO `im_group` VALUES ('f8d794155dfb4dc3824fa7a702e3cc61', 'e9dcc0a3fdb04b73b755fb2be1e64369', '我的好友', '2018-12-31 17:15:06', null, '2018-12-31 17:15:06', null, '0', null);

-- ----------------------------
-- Table structure for im_message
-- ----------------------------
DROP TABLE IF EXISTS `im_message`;
CREATE TABLE `im_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to_id` varchar(64) DEFAULT NULL COMMENT '接收人',
  `from_id` varchar(64) DEFAULT NULL COMMENT '发送人id',
  `send_time` bigint(20) DEFAULT NULL,
  `content` varchar(4000) DEFAULT NULL,
  `type` char(1) DEFAULT NULL COMMENT '类型 0单聊 1 群聊',
  `read_status` char(1) DEFAULT NULL COMMENT '1 已读 0 未读',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=906 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of im_message
-- ----------------------------
INSERT INTO `im_message` VALUES ('904', 'c69787c134b04d6f8127d512c269360f', 'cb0c145a6c104497942525f8c984f9d9', '1546248297972', '11111', '0', '0');
INSERT INTO `im_message` VALUES ('905', 'cb0c145a6c104497942525f8c984f9d9', 'c69787c134b04d6f8127d512c269360f', '1546248315556', '222222222', '0', '0');

-- ----------------------------
-- Table structure for im_user
-- ----------------------------
DROP TABLE IF EXISTS `im_user`;
CREATE TABLE `im_user` (
  `id` varchar(32) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sign` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `login_name` varchar(255) DEFAULT NULL,
  `default_group_id` varchar(32) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of im_user
-- ----------------------------
INSERT INTO `im_user` VALUES ('428edf4fcf0242a49198d32845b0b1ec', '/img/default-user.png', '13322211442', null, '13322211442', null, '{bcrypt}$2a$10$Kcm.LPuT5qsDBTU5w2OxDekGTjxvb3WN5JDSIegd8smTdzoHZObwm', '13322211442', '55afce4962e74b168cffe438bdb46ea2', null, null, null, null, null, '0');
INSERT INTO `im_user` VALUES ('6da3eb4299294a7280896fb3d6476f1d', '/img/default-user.png', '13966655333', null, '13966655333', null, '{bcrypt}$2a$10$wYwwMf6xywxCJ3N0cMZSz.SqTXlTA.AJijRkhKZ8R6bLeG/96pPyK', '13966655333', '1d8cd714acba4dc7843c80a36f8025fb', null, null, null, null, null, '0');
INSERT INTO `im_user` VALUES ('ab1bd7aa01e344c780f904b028de852b', '/img/default-user.png', '13322211443', null, '13322211443', null, '{bcrypt}$2a$10$eEhlX8hbtUle9kARWQsH8ujfFwhi7P2Urp45Vd0ZdxWxUuEg.0sle', '13322211443', '0bdd1bf7fb034422a655de8866ba5a92', null, null, null, null, null, '0');
INSERT INTO `im_user` VALUES ('c69787c134b04d6f8127d512c269360f', '/img/user (3).png', '王五', '我爱吃菜', '13699988999', 'wangwu@163.com', '{bcrypt}$2a$10$iq7DxG5KmyfaT9lLrwQcMuYm9r0AwZ9J6wdB1u4jIY2Gw8T0RKyzS', 'wangwu', '1048889640612864005', null, null, null, null, null, '0');
INSERT INTO `im_user` VALUES ('cb0c145a6c104497942525f8c984f9d9', '/img/user (2).png', '管理员', '我爱吃肉', '13699988999', 'zhangsan@163.com', '{bcrypt}$2a$10$tcoeSq.LUagBuj6WalYUaeJjvXEI86YBDS6LVCQUfYtjoUvhHaUWC', 'zhangsan', '1048889640612864002', null, null, null, null, null, '0');
INSERT INTO `im_user` VALUES ('e9dcc0a3fdb04b73b755fb2be1e64369', '/img/default-user.png', '13322211444', null, '13322211444', null, '{bcrypt}$2a$10$Dfd.34gmkDlAuWLSLjGOeeyz6S4GAb/CJAYOvQd47NWWVQZl7/29S', '13322211444', 'f8d794155dfb4dc3824fa7a702e3cc61', null, null, null, null, null, '0');

-- ----------------------------
-- Table structure for im_user_friend
-- ----------------------------
DROP TABLE IF EXISTS `im_user_friend`;
CREATE TABLE `im_user_friend` (
  `user_id` varchar(32) NOT NULL COMMENT '用户ID',
  `friend_id` varchar(32) NOT NULL COMMENT '好友ID',
  `user_group_id` varchar(32) DEFAULT NULL COMMENT '用户分组',
  `friend_group_id` varchar(32) DEFAULT NULL COMMENT '好友分组',
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`,`friend_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of im_user_friend
-- ----------------------------
INSERT INTO `im_user_friend` VALUES ('cb0c145a6c104497942525f8c984f9d9', 'c69787c134b04d6f8127d512c269360f', '1048889640612864002', '1048889640612864005', null, null, null, null, null, null);
INSERT INTO `im_user_friend` VALUES ('6da3eb4299294a7280896fb3d6476f1d', 'cb0c145a6c104497942525f8c984f9d9', '1d8cd714acba4dc7843c80a36f8025fb', '1048889640612864002', null, null, null, null, null, null);
INSERT INTO `im_user_friend` VALUES ('e9dcc0a3fdb04b73b755fb2be1e64369', 'cb0c145a6c104497942525f8c984f9d9', 'f8d794155dfb4dc3824fa7a702e3cc61', '1048889640612864002', null, null, null, null, '0', null);
INSERT INTO `im_user_friend` VALUES ('ab1bd7aa01e344c780f904b028de852b', 'cb0c145a6c104497942525f8c984f9d9', '0bdd1bf7fb034422a655de8866ba5a92', '1048889640612864002', null, null, null, null, '0', null);
INSERT INTO `im_user_friend` VALUES ('428edf4fcf0242a49198d32845b0b1ec', 'cb0c145a6c104497942525f8c984f9d9', '55afce4962e74b168cffe438bdb46ea2', '1048889640612864002', '2018-12-31 17:19:46', null, '2018-12-31 17:19:46', null, '0', null);
