
![gulp.png](http://upload-images.jianshu.io/upload_images/2069616-2b787b0e0672a02f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###   前言
> 随着node.js 的兴起，迎来了前端开发的春天，当然前端也需要承担更多的职责。
> 能力越大,责任越大。
> 项目发版上线前需要对代码进行压缩、合并、引用文件版本管理等 一系列的处理。
> 现在我们可以把这些工作交给自动化构建工具来做，比较主流的有 [Grunt](https://gruntjs.com/)、[Gulp](https://gulpjs.com/)、[webpack](https://webpack.js.org/)
> 以上工具我之前都没用过（个人之前是做后端开发的 .net ,java）比较喜欢前端，最近用了下 [Gulp](https://gulpjs.com/) ,确实挺好用，把我学习的一些心得分享给大家

### Why  gulp
> 易于使用
通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。
构建快速
利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。
插件高质
Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。
易于学习
通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。
### Global environment dependency
>  gulp及其插件都是通过[npm](https://www.npmjs.com) (安装、共享和分发代码;管理项目中的依赖关系) 来安装的，所以你需要 [node.js](https://nodejs.org/en/) 环境  node -v 会输出版本信息（安装成功）
>  全局安装Gulp  npm install --global gulp(需要翻墙)  gulp -v 会输出版本信息（安装成功）
如果访问外网比较慢可以使用  [淘宝npm镜像](https://npm.taobao.org/)   
npm install -g cnpm --registry=https://registry.npm.taobao.org  
cnpm -v 会输出版本信息（安装成功）


#### How to use 
> 1、初始化项目  执行命令 npm init
>2、作为项目的开发依赖（devDependencies）安装  
>3、[Bower ](https://bower.io/)   web包管理 (项目中依赖的三方包资源)
>4、在项目根目录下创建一个名为 gulpfile.js 的文件（将你的默认的任务代码放在这）
>5、运行gulp 

常用的gulp 插件 所有的gulp插件都可以在 [npm](https://www.npmjs.com) 中找到
https://www.npmjs.com/package/包名（如 gulp、gulp-clean、vue等）
gulp                              //gulp核心插件
gulp-clean                    //删除文件和文件夹
gulp-concat                  //合并文件
gulp-cssmin                 //压缩css 
gulp-imagemin            // 压缩image
gulp-less                     //less 预编译 （将less编译成css）
gulp-load-plugins        //从包依赖性中加载插件并将它们附加到你所选的对象上
gulp-uglify                   //压缩js
open                           //项目工程启动时打开一个文件或url（我们可以设置启动项目打开首页）
gulp-connect              //运行一个网络服务器 结合 open插件 设置项目启动默认页
gulp-htmlmin             //html 压缩
glup-useref               //在HTML文件中解析构建块以使用useref替换对非优化脚本或样式表的引用(注释的方式合并html中的 css、js)
gulp-watch                 //对项目中的文件进行监听（当源码文件html、css、js 等改变时，浏览器会自动刷新页面 便于我们开发调试 。其原理是文件改变时重新执行gulp相应任务，重新编译生成文件到build和dist目录中）       

执行以下命令  
单个插件安装 (npm install --save-dev gulp) 使用空格分割可以安装多个插件
···
npm install --save-dev gulp gulp-clean gulp-concat gulp-cssmin gulp-imagemin gulp-less gulp-load-plugins gulp-uglify open gulp-connect gulp-watch  gulp-htmlmin glup-useref
···
#### [Bower ](https://bower.io/)   web包管理 (项目中依赖的三方包资源) 
> 1、全局安装bower npm install -g bower 或者  cnpm install -g bower(如果你已安装cnpm)
> 2、安装第三方依赖包  bower install  --save-dev <package> 建议加上 --save-dev(配置文件bower.json 会自动加上开发依赖 )
>  我在项目中引用了 bootstrap 和 jquery  命令是  bower install --save-dev jquery bootstrap
#### 项目结构

![menu.png](http://upload-images.jianshu.io/upload_images/2069616-a466ef9eddaa06e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### gulpfile.js 结构

![gulpfile.png](http://upload-images.jianshu.io/upload_images/2069616-fa93d0bf5a6edbda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
> 从包依赖性中加载插件并将它们附加到你所选的对象上
> 用这个插件我们可以偷个懒，不用逐个的声明引用对象了。
> var $=require('gulp-load-plugins')();
$.useref()     //相当于 var useref = require('gulp-useref')； useref();
$.less()  //相当于 var less = require('gulp-less');  less();
$.clean()  // 相当于 var clean = require('gulp-clean');  clean();
> 还有很多，我就不逐个列举了。看到这里机智的你应该也明白了，建议看下官方给出的例子。
```
官方给出的案例是这样的

var plugins = require('gulp-load-plugins')();  
//声明plugins变量 然后可以直接用这个变量.插件对象 下面的写法是等价的
plugins.jshint = require('gulp-jshint'); 
plugins.concat = require('gulp-concat');

也可以 $符号 在插件加载后转换插件 （1.3以上版本）
var $ = require('gulp-load-plugins')();
$.foo = $.foo.configure(...);
```

####  [gulp-useref](https://www.npmjs.com/package/gulp-useref) 
###### 看下官方给出的案例
``` 
//gulpfile.js文件hmtl任务

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css');
 
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
```
```
//html 页面 注释语法

<html>
<head>
    <!-- build:css css/combined.css -->
    <link href="css/one.css" rel="stylesheet">
    <link href="css/two.css" rel="stylesheet">
    <!-- endbuild -->
</head>
<body>
    <!-- build:js scripts/combined.js -->
    <script type="text/javascript" src="scripts/one.js"></script> 
    <script type="text/javascript" src="scripts/two.js"></script> 
    <!-- endbuild -->
</body>
</html>
```
```
// gulp 任务执行打包后的 视图 可以看到 html中的 css ,js  已经合并了
<html>
<head>
    <link rel="stylesheet" href="css/combined.css"/>
</head>
<body>
    <script src="scripts/combined.js"></script> 
</body>
</html>
```
###### gulp-useref 在项目中使用
![gulp-usefef.png](http://upload-images.jianshu.io/upload_images/2069616-d0b16f6febe98741.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### gulpfile.js 文件 
###### 你可以作为一个种子文件，在此基础上添加或修改来实现你的项目构建。
> 在此说声抱歉，之前的html 任务 写的有点问题
> 发现在同一个任务下合并与压缩会报错（我目前给出的解决方案是拆成两个任务执行）
``` 
//（修改前的html任务，dist目录中没有生成view视图文件）html 压缩、合并、解析注释合并引用的js、css  
gulp.task('html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(app.srcPath.html)
        .pipe(gulp.dest(app.developPath+'view')),
    gulp.src(app.developPath+'view/**/*.html')
        .pipe($.useref())   
        .pipe($.htmlmin(options))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
```
> 这个是合并、压缩拆开后的 html任务 (详情请看插图 useref.png)
> 执行步骤 1、写入 2、合并 3、压缩 （gulp-useref 与 htmlmin 同一个任务中有冲突）
```
//1、源码html写入 开发与发版目录中
gulp.task('writeHtml',function(){
    gulp.src(app.srcPath.html)
        .pipe(gulp.dest(app.developPath+'view'))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
// 2、合并、
gulp.task('distHtmlCombine',function(){
    gulp.src(app.releasePath+'/view/**/*.html')
        .pipe($.useref())
        .pipe(gulp.dest(app.releasePath+'view'))
});
// 3、压缩
gulp.task('distHtmlMin',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(app.releasePath+'/view/**/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
//html 任务 1、写入 2、合并 3、压缩 （gulp-useref 与 htmlmin 同一个任务中有冲突  分开执行任务）
gulp.task('html',['writeHtml','distHtmlCombine','distHtmlMin']);
```
```
//gulp
var gulp=require('gulp');
//从包依赖性中加载插件并将它们附加到你所选的对象上
var $=require('gulp-load-plugins')();
//项目工程启动时打开一个文件或url （与gulp-connect 结合使用我们可以设置启动项目打开首页）
var open=require('open');

var app={
    //源码地址
    srcPath:{
        html:'src/view/**/*.html',   //源码html 目录
        js:'src/script/**/*.js',     //源码js 目录
        less:'src/style/**/*.less',  //源码less 目录
        image:'src/image/**/*',      //源码image 目录
        json:'src/data/**/*.json'    //源码json 目录
    },
    //开发根目录（测试版本）
    developPath:'build/',
    //发布根目录（release 版本 压缩 合并后 发布线上环境）
    releasePath:'dist/',
    //第三放依赖文件
    lib:{
        js:[
            'src/script/common/*.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        css:[
            'bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        fonts:[
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
            'bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
        ]
    }
};

//第三方依赖文件处理
gulp.task('lib',function(){
    gulp.src(app.lib.js)
        .pipe(gulp.dest(app.developPath+'lib/js'))
        .pipe(gulp.dest(app.releasePath+'lib/js')),
    gulp.src(app.lib.css)
        .pipe(gulp.dest(app.developPath+'lib/css'))
        .pipe(gulp.dest(app.releasePath+'lib/css')),
     gulp.src(app.lib.fonts)
         .pipe(gulp.dest(app.developPath+'lib/fonts'))
         .pipe(gulp.dest(app.releasePath+'lib/fonts'))
});
//1、源码html写入 开发与发版目录中
gulp.task('writeHtml',function(){
    gulp.src(app.srcPath.html)
        .pipe(gulp.dest(app.developPath+'view'))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
// 2、合并、
gulp.task('distHtmlCombine',function(){
    gulp.src(app.releasePath+'/view/**/*.html')
        .pipe($.useref())
        .pipe(gulp.dest(app.releasePath+'view'))
});
// 3、压缩
gulp.task('distHtmlMin',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(app.releasePath+'/view/**/*.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
// 执行步骤 1、写入 2、合并 3、压缩 （gulp-useref 与 htmlmin 同一个任务中有冲突）
gulp.task('html',['writeHtml','distHtmlCombine','distHtmlMin']);
//less编译成css
gulp.task('less',function(){
    gulp.src(app.srcPath.less)
        .pipe($.less())
        .pipe(gulp.dest(app.developPath+'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.releasePath+'css'))
        .pipe($.connect.reload());
});
//js压缩合并
gulp.task('js',function(){
    gulp.src(app.srcPath.js)
        .pipe(gulp.dest(app.developPath+'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.releasePath+'js'))
        .pipe($.connect.reload());
});
//json任务
gulp.task('json',function(){
    gulp.src(app.srcPath.json)
        .pipe(gulp.dest(app.developPath+'data'))
        .pipe(gulp.dest(app.releasePath+'data'))
        .pipe($.connect.reload());
});
//image 压缩
gulp.task('image',function(){
    gulp.src(app.srcPath.image)
        .pipe(gulp.dest(app.developPath+'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.releasePath+'image'))
        .pipe($.connect.reload());
});
//清除文件夹及文件
gulp.task('clean', function(){
    gulp.src([app.developPath,app.releasePath])
        .pipe($.clean());
});
//构建任务
gulp.task('build',['lib','image','js','less','html','json']);
//创建服务
gulp.task('server',['build'],function(){
    $.connect.server({
        root:[app.developPath],  //路由地址
        livereload:true,  //实时加载(当watch 监听的任务执行时 生成的文件会实时写入build 和 dist 文件中)
        port:3333 // 自定义端口（不要被占用就好）
    });
    open('http://localhost:3333/view/index.html');  // 项目启动时打开的默认页

    gulp.watch('bower_components/**/*',['lib']);  //当bower_components文件改变时执行lib 任务 （相当于 gulp lib）
    gulp.watch(app.srcPath.html,['html']); //当源码html 文件有修改时，执行html任务（相当于 gulp html）
    gulp.watch(app.srcPath.js,['js']); //当源码js文件有修改时，执行js任务（相当于 gulp js）
    gulp.watch(app.srcPath.json,['json']);/当源码json文件有修改时，执行json任务（相当于 gulp json）
    gulp.watch(app.srcPath.less,['less']);/当源码less文件有修改时，执行less任务（相当于 gulp less）
    gulp.watch(app.srcPath.image,['image']);/当源码image文件有修改时，执行image任务（相当于 gulp image）
});
// 默认任务设置成server  （执行任务的命令是 gulp 任务名，gulp default 可以直接执行 gulp ）
gulp.task('default',['server']);
```
##### 凡事预则立 何况万全思虑 
###### 运行gulp  执行命令 gulp default  或者  gulp ,会打开默认页 index.html

![index.png](http://upload-images.jianshu.io/upload_images/2069616-3c097a530ddfff52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## The end
> 如果你觉得这边文章对你有所帮助,可以关注一波。
> Thank you for reading