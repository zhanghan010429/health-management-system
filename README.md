# health-management
### 技术栈

- 前端：HTML、CSS、Less、ES6(7|8)、Webpack4、@vue/cli@4.5.13、vue.js@3.2.16、vuex@4.0.2、vue-router@4.0.11、axios@0.19.0

- 后端：Node.js、MySQL
### 项目本地运行方法

 - git clone

 - 前端代码在 fe 目录下，后端node 代码在 server 目录下，打开对应的目录，查看 package.json，npm 执行 对应的 script 即可。

 - 前端（fe）目录 执行npm i 再执行npm run dev
 - 后端(server)目录执行 npm i 再执行 npm run start

### 线上部署

- 前端：参考 fe 目录下的 nginx.conf、Jenkinsfile、publish.sh

- 后端：参考 server 目录下的 nginx.conf、pm2.json、Jenkinsfile、publish.sh

### 关于数据库

 - 安装 MySQL 数据库，新建数据库health_mange，然后导入全部数据（/server/health_app.sql）

 - 数据库 basic_info 表中的用户默认密码均为111111
### 目标功能

- [x] 登录、注册、密码修改（100%）
- [x] 个人中心信息展示、资料修改（100%）
- [x] app列表页

### 其他
