/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : v-im

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2021-01-12 22:14:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for im_dept
-- ----------------------------
DROP TABLE IF EXISTS `im_dept`;
CREATE TABLE `im_dept` (
  `id` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(3000) DEFAULT NULL,
  `master` varchar(32) DEFAULT NULL,
  `parent_id` varchar(32) DEFAULT NULL,
  `parent_ids` varchar(3000) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `del_flag` varchar(255) NOT NULL DEFAULT '0',
  `create_by` varchar(32) DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of im_dept
-- ----------------------------
INSERT INTO `im_dept` VALUES ('1', 'AMD总公司', null, null, '0', '0,', null, null, null, '0', null, null);
INSERT INTO `im_dept` VALUES ('2', '技术部', null, null, '1', '0,1,', null, null, null, '0', null, null);
INSERT INTO `im_dept` VALUES ('3', '综合部', null, null, '1', '0,1,', null, null, null, '0', null, null);
INSERT INTO `im_dept` VALUES ('4', '开发部', null, null, '1', '0,1,', null, null, null, '0', null, null);
INSERT INTO `im_dept` VALUES ('5', '英特尔', null, null, '0', '0,', null, null, null, '0', null, null);
INSERT INTO `im_dept` VALUES ('6', '技术部', '', '', '5', '0,5,', '2021-01-12 21:52:44', '2021-01-12 21:52:44', '', '0', '', '');
INSERT INTO `im_dept` VALUES ('7', '综合部', '', '', '5', '0,5,', '2021-01-12 21:52:44', '2021-01-12 21:52:44', '', '0', '', '');
INSERT INTO `im_dept` VALUES ('8', '开发部', '', '', '5', '0,5,', '2021-01-12 21:52:44', '2021-01-12 21:52:44', '', '0', '', '');
