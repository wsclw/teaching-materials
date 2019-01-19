[TOC]

# Vue-router

Vue-router是给Vue.js提供路由管理的插件，利用hash的变化控制动态组件的切换。以前页面之间的跳转都是由后端MVC中的Controller层控制，通过`<a>`标签的`href`或者直接修改`location.href`，浏览器会向服务端发起一个请求，服务端相应后根据所接收到的信息去获取数据和指派对应的模板，渲染成HTML代码再返回给浏览器，由浏览器解析成用户可见的页面。Vue.js与Vue-router的组合可以将这一套的逻辑放在前端去执行，切换到对应的组件后再向后端请求数据，然后填充模板，在浏览器段完成HTML的渲染。这样也有助于前后端分离，前端不用依赖于后端的逻辑，只需要后端提供数据接口即可。

## 引入方式

Vue-router可以直接引用编译好的JS文件，CDN地址为：

```html
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

也可以使用npm的方式安装:

```bash
npm install vue-router --save
```

引用方式如下：

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
```

## 基本用法

vue-router的基本作用是将每个路径映射到对应的组件，并通过修改路由进行组件间的切换。其基本用法如下：

```html
<div id="box">
        <h1>Hello App!</h1>
      
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <p><router-link to="/home">主页</router-link></p>
      <p><router-link to="/about">关于我们</router-link></p>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
</div>

<script src="./vue.js"></script>
<script src="./vue-router.js"></script>
<script>
    // 1. 创建组件
    var Home = Vue.extend({     
        template: '<div>主页的内容</div>'
    });

    var About = Vue.extend({        
        template: '<div>关于我们的内容</div>'
    });

    // 2. 配置路由
    // 每个路由应该映射一个组件。
    var routes = [
        {path: '/home', component: Home},
        {path: '/about', component: About}
    ];

    // 3. 创建router实例，然后将上面创建的路由配置传递给 `routes` 选项
    var router = new VueRouter({
        routes: routes
    });
    
    // 4. 创建Vue实例，然后将上一步创建的router实例传递给router选项
    new Vue({
        el: '#box',
        router: router
    });
</script>
```

## 路由匹配

vue-router在设置路由规则的时候，支持以冒号开头的动态片段。例如在设计列表分页的时候，我们往往会在URL中带入列表的页码，路由规则就可以像下面这样设计：

```html
<div id="box">
      <p><router-link to="/list/1">第一页</router-link></p>
      <p><router-link to="/list/2">第二页</router-link></p>

      <router-view></router-view>
</div>

<script src="./vue.js"></script>
<script src="./vue-router.js"></script>
<script>
    var List = Vue.extend({     
        template: '<div>{{this.$route.params.page}}</div>'
    });

    var router = new VueRouter({
        routes: [
            {path: '/list/:page', component: List}
        ]
    });
    
    var vm = new Vue({
        el: '#box',
        router: router
    });
</script>
```

## 嵌套路由

一般应用中的路由方式不会像上例中的那么简单，往往会出现二级导航这种情况。这是就需要使用嵌套路由这种写法。示例如下：

```html
<div id="box">
        <h1>Hello App!</h1>

      <p><router-link to="/home">主页</router-link></p>
      <p><router-link to="/about">关于我们</router-link></p>

      <router-view></router-view>
</div>

<script id="about_template" type="x-template">
    <div>
        <p>关于我们的内容</p>
        <ul>
            <li><router-link to="/about/post">文章</router-link></li>
            <li><router-link to="/about/list">列表</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</script>

<script src="./vue.js"></script>
<script src="./vue-router.js"></script>
<script>
    // 1. 创建组件
    var Home = Vue.extend({     
        template: '<div>主页的内容</div>'
    });

    var About = Vue.extend({        
        template: '#about_template'
    });

    var Post = Vue.extend({     
        template: '<div>文章页面的内容</div>'
    });

    var List = Vue.extend({     
        template: '<div>列表页面的内容</div>'
    });

    var routes = [
        {
            path: '/home', 
            component: Home
        },
        {
            path: '/about', 
            component: About, 
            children: [
        {
          path: 'post',
          component: Post
        },
        {
          path: 'list',
          component: List
        }
      ]
    }
    ];

    var router = new VueRouter({
        routes: routes
    });
    

    var vm = new Vue({
        el: '#box',
        router: router
    });
</script>
```

## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```javascript
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。

## 命名视图

有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

# vue-resource

在实际开发单页面应用时，一般情况下都会采用异步请求的形式和后端进行数据交互。我们先前都是使用jQuery的`$.ajax()`方法来做异步请求，但是Vue.js并不依赖于jQuery，因此我们也没有必要为了使用异步请求而额外引入jQuery。为了解决这个问题，Vue.js 给我们提供了专门用于异步请求的插件 vue-resource ，它同样对异步请求进行了封装，方便我们同服务器进行数据交互。下面我们就来详细讲解它的用法。

## 安装

你可以通过 NPM 进行安装：

```bash
npm install vue-router --save
```

引用方式如下：

```javascript
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
```


同vue-resource类似，我们可以直接引用vue-resource的CDN路径：

```html
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
```



## 基本用法

引入vue-resource后，在Vue组件中，我们就可以通过`this.$http`或者使用全局变量`Vue.http`发起异步请求，例如：

```javascript
// 基于全局Vue对象使用http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
```

在发送请求后，使用then方法来处理响应结果，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数。

then方法的回调函数也有两种写法，第一种是传统的函数写法，第二种是更为简洁的ES 6的Lambda写法：

```javascript
// 传统写法
this.$http.get('/someUrl', [options]).then(function(response){
    // 响应成功回调
}, function(response){
    // 响应错误回调
});

// Lambda写法
this.$http.get('/someUrl', [options]).then((response) => {
    // 响应成功回调
}, (response) => {
    // 响应错误回调
});
```

## $http的API方法和选项参数

vue-resource的请求API是按照REST风格设计的，它提供了7种请求API：

+ `get(url, [options])`
+ `head(url, [options])`
+ `delete(url, [options])`
+ `jsonp(url, [options])`
+ `post(url, [body], [options])`
+ `put(url, [body], [options])`
+ `patch(url, [body], [options])`

除了jsonp以外，另外6种的API名称是标准的HTTP方法。当服务端使用REST API时，客户端的编码风格和服务端的编码风格近乎一致，这可以减少前端和后端开发人员的沟通成本。

客户端请求方法|服务端处理方法
--------------|---------------
this.$http.get(...)|Getxxx
this.$http.post(...)  |  Postxxx
this.$http.put(...)| Putxxx
this.$http.delete(...)|  Deletexxx

## options对象

发送请求时的options选项对象包含以下属性：

参数  |类型  |描述
------|-------|---------------
url             |string  |请求的URL
method          |string  |请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法
body            |Object, FormDatastring  |request body
params          |Object  |请求的URL参数对象
headers         |Object  |request header
timeout         |number  |单位为毫秒的请求超时时间 (0 表示无超时时间)
before          |function(request)|请求发送前的处理函数，类似于jQuery的beforeSend函数
progress        |function(event) |ProgressEvent回调处理函数
credientials    |boolean |表示跨域请求时是否需要使用凭证
emulateHTTP     |boolean |发送PUT, PATCH, DELETE请求时以HTTP POST的方式发送，并设置请求头的X-HTTP-Method-Override
emulateJSON     |boolean |将request body以application/x-www-form-urlencoded content type发送

### emulateHTTP的作用

如果Web服务器无法处理PUT, PATCH和DELETE这种REST风格的请求，你可以启用enulateHTTP现象。启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。

```javascript
Vue.http.options.emulateHTTP = true;
```

### emulateJSON的作用

如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type，就像普通的HTML表单一样。

```javascript
Vue.http.options.emulateJSON = true;
```

## response对象

response对象包含以下属性：

方法 | 类型 | 描述
-------|---------|----------------------
text() |string   |以string形式返回response body
json() |Object   |以JSON对象形式返回response body
blob() |Blob     |以二进制形式返回response body
**属性** | **类型** | **描述**
ok         |boolean |响应的HTTP状态码在200~299之间时，该属性为true
status     |number  |响应的HTTP状态码
statusText |string  |响应的状态文本
headers    |Object  |响应头

>注意：本文的vue-resource版本为v0.9.3，如果你使用的是v0.9.0以前的版本，response对象是没有json(), blob(), text()这些方法的。


## GET请求

```javascript
var demo = new Vue({
    el: '#app',
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers'
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('gridData', response.data)
                })
                .catch(function(response) {
                    console.log(response)
                })
        }
    }
})
```

这段程序的then方法只提供了successCallback，而省略了errorCallback。
catch方法用于捕捉程序的异常，catch方法和errorCallback是不同的，errorCallback只在响应失败时调用，而catch则是在整个请求到响应过程中，只要程序出错了就会被调用。

在then方法的回调函数内，你也可以直接使用this，this仍然是指向Vue实例的：

```javascript
getCustomers: function() {
    this.$http.get(this.apiUrl)
        .then((response) => {
            this.$set('gridData', response.data)
        })
        .catch(function(response) {
            console.log(response)
        })
}
```

## POST请求

```javascript
var demo = new Vue({
    el: '#app',
    data: {
        show: false,
        gridColumns: [{
            name: 'customerId',
            isKey: true
        }, {
            name: 'companyName'
        }, {
            name: 'contactName'
        }, {
            name: 'phone'
        }],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers',
        item: {}
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        closeDialog: function() {
            this.show = false
        },
        getCustomers: function() {
            var vm = this
            vm.$http.get(vm.apiUrl)
                .then((response) => {
                    vm.$set('gridData', response.data)
                })
        },
        createCustomer: function() {
            var vm = this
            vm.$http.post(vm.apiUrl, vm.item)
                .then((response) => {
                    vm.$set('item', {})
                    vm.getCustomers()
                })
            this.show = false
        }
    }
})
```
