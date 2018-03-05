jQuery 插件开发
===
+ 代码结构
```
(function($){
  //插件代码写在这里,编写插件功能
})(jQuery);
```
通过将jQuery传给参数为$的函数，可以保证函数体内的$指向jQuery对象。
+ 搞定参数列表
使用$.extend()方法来合并参数

+ 统一命名空间
把所有调用的方法集中到一个对象里，赋值匿名函数给$.fn的新属性，然后使用一个包含字符串参数的方法来调用他们，这样做是为所有方法声明一个名字，而不是每个方法一个名字。
eg:
```
(function($){

  var methods={
    init:function(options){
    //
    },
    clickPlay:function(options){
    //
    }
  };
  
  $.fn.jQuery.carouselName=function(method){
    if(methods[method]){
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments,1);
      );
    }else if($.type(method)==='object'){
      return methods.init.applay(this,arguments);
    }else{
      $.error('the jQuery.carouselName does not exist');
    }
  }
})(jQuery)
```
+ 数据合并
```
options=$.extend(true,{},$.fn.jqSlider.default,options);
```
重用options来避免添加额外的变量
+链式调用
如果要支持链式调用则在函数内
```
return this
```
+ 允许公开访问默认设置
参数配置，为了暴露给外部将参数赋值给$.fn属性
```
$.fn.jqSlider.default={
  domElement:'img-play',
  nextControl:null,
  prevControl:null,
  speed:0,//自动播放时间
  animateTime:0,//动画时间
  auto:false//是否自动播放
}
```


