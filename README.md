# health-management
### technology stack

- front-end：HTML、CSS、Less、ES6(7|8)、Webpack4、@vue/cli@4.5.13、vue.js@3.2.16、vuex@4.0.2、vue-router@4.0.11、axios@0.19.0
- server-end：Node.js、MySQL

### The method of project local running

- git clone
- Front-end code is in fe directory, server-end node code is in server directory, you can open the corresponding directory, then view package.json, run 'npm' to execute the corresponding script.
- Fe directory: run 'npm i', then run 'npm run dev'
- Server directory：run 'npm i', then run'npm run start'

### Online deployment

- Front-end: Refer to nginx.conf, Jenkinsfile, publish.sh in fe catalogue
- Server-end：Refer to nginx.conf、pm2.json、Jenkinsfile、publish.sh in server catalogue

### About database

 - Install the MySQL database, Create a new database health_manage, and import all the data（/server/health_app.sql）
 - The default passwords of users in the basic_info table are 111111
 
### Target function

- [x] Login, Registration, Password Change（100%）
- [x] Personal center information display, Information modification（100%）
- [x] App list page

### Others
