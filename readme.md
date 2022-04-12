一、数据Mock：
 模拟假数据，简单来理解，就是在测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试。而这个虚拟的对象就是mock对象。mock对象就是真实对象在调试期间的代替品。有时也将Mock服务称之为测试服务替身，或者测试服务档板。
     
 mock功能：接口间的相互依赖；单元测试；第三方接口调用。
     
 Mock类库是一个专门用于在unittest过程中制作（伪造）和修改（篡改）测试对象的类库，避免这些对象在单元测试过程中依赖外部资源（网络资源，数据库连接，其它服务以及耗时过长等）

1、使用node.js 手写server：
```
const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
  let pathObj = url.parse(req.url, true)
  switch (pathObj.pathname) {
    case '/getWeather':
      if(pathObj.query.city === 'beijing')
        res.end(JSON.stringify({city: 'beijing', weather: 'sunny'}))
      else
        res.end(JSON.stringify({city: pathObj.query.city, weather: 'unknown'}))
      break
    default:
      try {
        let pathname = pathObj.pathname === '/' ? '/index.html' : pathObj.pathname
        res.end( fs.readFileSync(__dirname + pathname) )
      } catch(e) {
        res.writeHead(404, 'Not Found')
        res.end('<h1>404 Not Found~</h1>')
      }
  }
}).listen(8080)
```

高级用法：
从实现简易Server 到实现node后端框架Express.js    https://github.com/jirengu/node-server

2、Mock.js &Mock平台：淘宝 Rap2  http://rap2.taobao.org/

  2.1 Mock.js
  
  用法演示： http://mockjs.com/examples.html
  
  常见用法：@ctitle(3, 10)、@cparagraph、@cword、@cname、@integer(10, 100)、@float(20, 30, 2, 3)、@color、@date、@time、@now、@id、@url、@email、@image('200x100')
```
{
  'statusCode|1' : [1, 3, 2, 8],
  'msg': '@cword(4, 10)',
  'data|4': [
    {
        id: '@id',
        title: '@ctitle', 
        author: '@cname', 
        createdAt: '@datetime' 
    }
  ]
}
```

  2.2 Rap2 地址：  http://rap2.taobao.org/

  二、接口规范：
1、接口约定：
• 当前接口的路径是什么？如/auth/register

• 当前接口提交数据的类型是什么? 如：
  GET 获取数据
  POST 提交或者创建
  PATCH 修改数据，部分修改
  DELETE 删除数据
  PUT 修改数据，整体替换原有数据
  
• 参数类型/格式，比如： fromdata，或者 application/x-www-form-urlencoded

• 参数字段，及限制条件

• 返回成功的数据格式

• 返回失败的数据格式
范例：   https://www.yuque.com/docs/share/08fd7cfb6716-4409-9b15-fd9e9d491f34

2、接口测试（curl）：
```
// GET请求
curl "http://rap2api.taobao.org/app/mock/244238/getWeather?city=beijing"

// -d 提交的参数，默认是POST请求
curl -d "username=aaaa&password=bbb" "http://rap2api.taobao.org/app/mock/244238/login"

// -i 展示响应头
curl -d "username=hunger1&password=123456" "http://blog-server.hunger- valley.com/auth/login" -i

// -H 设置请求头
curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login

// -X 设置请求类型
curl -d "username=aaaa&password=bbb" -X POST
"http://rap2api.taobao.org/app/mock/244238/login"

// -b 请求带上cookie
curl "http://blog-server.hunger-valley.com/auth" -b
"connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYGQ%2FyHV1ZsozMvZYWC6s"
```
