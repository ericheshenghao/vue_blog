# Vue+Node.js+Mongodb服务器端配置详解

## node安装步骤
![Node.js下载页](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/26/ac69e83124c3d942b7e344a0e3a095c6.jpg) 

下载长期支持版本并上传到服务器(我的是Centos系统)的`/usr/local/src`目录,cd到目录下。
``` bash
cd /usr/local/src
```
或者直接
``` bash
cd /usr/local/src
wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz
```
将安装包解压
``` bash
xz -d node-v12.13.0-linux-x64.tar.xz
tar -xvf node-v12.13.0-linux-x64.tar
``` 
## 建立软连接
``` bash
ln -s /usr/local/src/node-v12.13.0-linux-x64/bin/npm /usr/local/bin/

ln -s /usr/local/src/node-v12.13.0-linux-x64/bin/node /usr/local/bin/
```
回到根目录，测试版本号。
```
[root@VM_0_5_centos bin]# cd
[root@VM_0_5_centos ~]# node -v
v12.13.0
[root@VM_0_5_centos ~]# npm -v
6.12.0
```
