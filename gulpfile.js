
//gulp
var gulp=require('gulp');
//从包依赖性中加载插件并将它们附加到你所选的对象上
var $=require('gulp-load-plugins')();
//按顺序执行gulp 任务
var gulpSequence = require('gulp-sequence')
//项目工程启动时打开一个文件或url （与gulp-connect 结合使用我们可以设置启动项目打开首页）
var open=require('open');

var app={
    //源码地址
    srcPath:{
        html:'src/view/**/*.html',
        js:'src/script/**/*.js',
        less:'src/style/**/*.less',
        image:'src/image/**/*',
        json:'src/data/**/*.json'
    },
    //开发地址
    developPath:'build/',
    //发布地址
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
    return gulp.src(app.srcPath.html)
            .pipe(gulp.dest(app.developPath+'view'))
            .pipe(gulp.dest(app.releasePath+'view'))
            .pipe($.connect.reload());
});
// 2、合并、
gulp.task('distHtmlCombine',function(){
    return gulp.src(app.releasePath+'/view/**/*.html')
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
    return gulp.src(app.releasePath+'/view/**/*.html')
        .pipe($.htmlmin(options))
        .pipe(gulp.dest(app.releasePath+'view'))
        .pipe($.connect.reload());
});
// 执行步骤 1、写入 2、合并 3、压缩
gulp.task('html',function(callback){
    gulpSequence('writeHtml','distHtmlCombine','distHtmlMin')(callback)
});

//less编译成css
gulp.task('less',function(){
   return gulp.src(app.srcPath.less)
        .pipe($.less())
        .pipe(gulp.dest(app.developPath+'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.releasePath+'css'))
        .pipe($.connect.reload());
});
//js压缩合并
gulp.task('js',function(){
   return gulp.src(app.srcPath.js)
        .pipe(gulp.dest(app.developPath+'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.releasePath+'js'))
        .pipe($.connect.reload());
});
//json任务
gulp.task('json',function(){
   return gulp.src(app.srcPath.json)
        .pipe(gulp.dest(app.developPath+'data'))
        .pipe(gulp.dest(app.releasePath+'data'))
        .pipe($.connect.reload());
});
//image 压缩
gulp.task('image',function(){
   return gulp.src(app.srcPath.image)
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
gulp.task('build', gulpSequence('clean',['lib','image','js','less','json'],'html'));
//创建服务
gulp.task('server',['build'],function(){
    $.connect.server({
        root:[app.releasePath],
        livereload:true,
        port:3333
    });
   open('http://localhost:3333/view/index.html');
    //gulp-sequence 在gulp watch 中使用
    gulp.watch(app.srcPath.html,function (event) {
        gulpSequence('html')(function (err) {
            if (err) console.log(err)
        })
    });
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath.js,['js']);
    gulp.watch(app.srcPath.json,['json']);
    gulp.watch(app.srcPath.less,['less']);
    gulp.watch(app.srcPath.image,['image']);
});
// 默认任务设置成server
gulp.task('default',['server']);