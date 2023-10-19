# README

## Feature

### User
* Login, logout and sign up
* Read all restaurants and their detail information
* Categorize restaurants when reading all restaurants
* Give comments to restaurants
* Collect favorite restaurants
* Look the newest 10 restaurants
* Look the newest 10 comments
* Edit the own profile
* Check restaurants which the user gave comments
* A user can follow others

### Admin
* Only admin can use management system
* Can manage the information of restaurants 
* Can manage the category of restaurants 
* Can manage the administrative permission of users 

### Initialize
```
git clone https://github.com/Chris-Chou518/forum-express-grading-github-actions.git
```

### Set up database
We can refer config/config.json

```
create database forum;
```

### Install
```
npm install
```

### create .env and set JWT_SECRET as what you want
```
touch .env
```

### Execute migration
```
npx sequelize db:migrate
```

### Run seed
```
npx sequelize db:seed:all  
```

### Execute application
```
npm run dev
```
App is listening on port 3000

## 共用帳號
請一律設定下面 2 組帳號以利驗收：
* 第一組帳號有 admin 權限：
  * email: root@example.com
  * password: 12345678
* 第二組帳號沒有 admin 權限：
  * email: user1@example.com
  * password: 12345678

### Prerequisites
Please refer package.json file.Thank you!