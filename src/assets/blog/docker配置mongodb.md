---
title: docker配置mongodb
date: '2019-12-17'
category: tech
tags: docker|mongodb
note: docker、mongodb
---
[[toc]]
![Docker](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/17/f703738da977391281957edbf0198618377ae2dd.jpeg)
## docker配置(win10)
下载`docker desktop`
docker镜像[^10]  

### ali镜像加速[^1]
针对安装了Docker for Windows的用户，可以参考以下配置步骤：
在系统右下角托盘图标内右键菜单选择 Settings，打开配置窗口后左侧导航菜单选择 Docker Daemon。编辑窗口内的JSON串，填写下方加速器地址：
```
{
  "registry-mirrors": ["https://htkagkyz.mirror.aliyuncs.com"]
}
```
编辑完成后点击 Apply 保存按钮，等待Docker重启并应用配置的镜像加速器。
拉取一下镜像
```
$ docker pull mongo
```
速度起飞
![Mongo](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/17/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191217193842.png)
运行mongo容器
```
docker run --name mongo -v /mnt/mongodb:/data/db -p 27017:27017 -d mongo --auth
```
参数说明:  
> `-p 27017:27017` ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过宿主机 ip:27017 访问到 mongo 的服务。  
`--auth`：需要密码才能访问容器服务。 

我们可以通过**docker ps**命令查看容器的运行信息:
![运行信息](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/17/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191217194827.png)
接着使用以下命令添加用户和设置密码，并且尝试连接。
``` bash
$ docker exec -it mongo mongo admin
# 创建一个名为 admin，密码为 123456 的用户。
>  db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
# 尝试使用上面创建的用户信息进行连接。
> db.auth('admin', '123456')
```
## docker配置(linux)
``` bash
$ yum install yum-utils device-mapper-persistent-data lvm2 -y
```
### 添加仓库
```
$ yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
```
$ yum-config-manager --enable docker-ce-test
```
### 安装
```
$ yum install docker-ce -y
```
### 启动docker
```
$ systemctl start docker
//开机启动docker
$ systemctl enable docker
```
### 查看docker状态
```
$ systemctl status docker
```
### 安装最新版的docker-compose[^2]
``` bash
curl -L https://github.com/docker/compose/releases/download/1.25.1-rc1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
// 添加可执行权限
chmod +x /usr/local/bin/docker-compose
```
### 执行
```
$ docker-compose --version
```
```
$ docker-compose up -d 
```
### 命令
```
// 查看运行状态 
$ docker-compose ps
```
### 连接远程库
![连接设置](http://eric-he.oss-cn-beijing.aliyuncs.com/2019/12/17/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20191217202436.png)

[^2]:<b>docker-compose</b>: [https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)
[^1]:<b>images</b>:[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)
[^10]:<b>docker</b>:[https://hub.docker.com/?overlay=onboarding](https://hub.docker.com/?overlay=onboarding) 
