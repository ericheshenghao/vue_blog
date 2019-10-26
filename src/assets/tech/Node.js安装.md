# Linux下Node.js安装

## 安装步骤
![Node.js下载页](https://eric-he.oss-cn-beijing.aliyuncs.com/2019/10/26/ac69e83124c3d942b7e344a0e3a095c6.jpg) 

下载长期支持版本并上传到服务器(我的是Centos系统)的`/usr/local/src`目录,cd到目录下。
``` bash
cd /usr/local/src
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
### vue解决跨域问题
在vue.config.js中写入代理网址。
``` javascript{4,7}
 devServer: {
    proxy: { // 配置如下代码
      '/api': {
        target:'https://api.jisuapi.com/jieqi/query?appkey=4867c88bc726b526&year=', // 你请求的第三方接口
        changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite:{  // 路径重写，
          '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求https://xxxxxx/dictionary/data_dictionary_front.json这个地址的时候直接写成/api即可。
        }
      }
},
```
在页面中去请求数据，例如
``` javascript
fuction() {
      axios.get("/api").then(res => {
        this.name = res.data.result.now.name;
      });
    }
```