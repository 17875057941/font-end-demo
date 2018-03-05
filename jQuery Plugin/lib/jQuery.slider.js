(function($){
	function showImg(options,index,flag){//flag判断是点击prev还是next
		var $this=$(options.domElement);
		if(index>=0&&index<5){
			if(flag){//next
				$this.eq(index).animate({'opacity':'1'},options.animateTime);
				$this.eq(index-1).css('opacity','0');
			}
			if(!flag){
				$this.eq(index).animate({'opacity':'1'},options.animateTime);
				$this.eq(index+1).css('opacity','0');
			}
		}
	}

	var methods={
		sliderPlay:function(options){//点击切换图片
			options=$.extend(
				true,
				{},
				$.fn.jqSlider.default,
				options,
				{
					current:0
				}
			);
			var timer=setInterval(function(){
				if(options.current>5){
					options.current=0;
				}
				showImg(options,options.current,true);
				options.current++;
			},options.speed);

			$(options.prevControl).click(function(){//上一张
				options.current--;
				showImg(options,options.current,false);
			});

			$(options.nextControl)
				.on('click',function(){//下一张
					options.current++;
					showImg(options,options.current,true);
			});

			$(options.prevControl+','+options.nextControl)
				.on({
					mouseover:function(){
						clearInterval(timer);
						options.current--;
					},
					mouseout:function(){
						timer=setInterval(function(){
							if(options.current>5){
								options.current=0;
							}
							showImg(options,options.current,true);
							options.current++;
						},options.speed);
					}
			})
		},
	}
	$.fn.jqSlider=function(method){
		if(methods[method]){
			return methods[method].apply(
				this,Array.prototype.slice.call(arguments,1)
			);
		}else if($.type(method)==='object'){
			return methods.sliderPlay.apply(this,arguments);
		}else{
			$.error(
				'does not exist on jqSlider'
			);
		}
	},
	$.fn.jqSlider.default={
		domElement:'img-play',
		nextControl:null,
		prevControl:null,
		speed:0,//自动播放时间
		animateTime:0,//动画时间
		auto:false//是否自动播放
	}
})(jQuery);
