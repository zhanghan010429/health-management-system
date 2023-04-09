/*
 Navicat Premium Data Transfer

 Source Server         : lowcode_db
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3380
 Source Schema         : test_app

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 17/03/2023 21:11:58
*/

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `uid` int(0) NOT NULL,
  `u_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` timestamp not null default CURRENT_TIMESTAMP,
  `update_time` timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


