/**
 * slide carousel
 * author:xugongyang
 * date: August 15, 2017
 */
;(function($) {
    //slide class
    $.fn.slideCarsousel=function(settings){
        settings = $.extend({}, $.fn.slideCarsousel.defaultSetting, settings);
        var wrapper=$(this),ul=wrapper.children('ul.item-list'),liList=ul.children();
        var slide={
            slideCarousel:wrapper,
            count:liList.length,
            ul:ul,
            liList:liList,
            currentIndex:0,
            indicatorList:wrapper.children('.indicator-list').children('a'),
            customIndicatorList:wrapper.children('.custom-indicator-list').find('.indicator'),
            itemPrev:wrapper.children('.controls').children('.item-prev'),
            itemNext:wrapper.children('.controls').children('.item-next'),
            itemClassArr:[],
            firstItem:ul.children('.item0'),
            lastItem:ul.children('.item'+(liList.length-1)),
            transitionAnimate:function(){
                slide.firstItem.removeClass('transition0').addClass('transitionAnimate');
                slide.lastItem.removeClass('transition0').addClass('transitionAnimate');
            },
            init:function(){
                var i=0,length=slide.count;
                for(;i<length;i++){
                    slide.itemClassArr.push('item'+i);
                }
                // slide.firstItem=slide.ul.children('.item0');
                // slide.lastItem=slide.ul.children('.item'+(slide.count-1));
                //自动播放
                slide.slideAutoChange();
            },
            slideAutoChange:function(){
                if(settings.isAutoChange){
                    settings.slideInterval= setInterval(function() {
                        slide.toNext();
                    }, settings.direction);
                }
            },
            toNext:function(){
                if(slide.currentIndex==slide.count-1){
                    slide.lastItem.removeClass('transitionAnimate').addClass('transition0');
                }
                //在数组第一个元素 添加元素
                slide.itemClassArr.unshift(slide.itemClassArr[slide.count-1]);
                //删除数组最后一个元素
                slide.itemClassArr.pop();
                slide.currentIndex++;
                slide.currentIndex=slide.currentIndex>=slide.count?0:slide.currentIndex;
                slide.resetItemClass('next');
            },
            toPrev:function(){
                if(slide.currentIndex==0){
                    slide.lastItem.removeClass('transitionAnimate').addClass('transition0');
                }
                slide.itemClassArr.push(slide.itemClassArr[0]);
                //删除数组中最后一个元素
                slide.itemClassArr.shift();
                slide.currentIndex--;
                slide.currentIndex=slide.currentIndex<0?slide.count-1:slide.currentIndex;
                slide.resetItemClass('prev');
            },
            processIndicatorEvent:function(indicatorIndex){
                /*itemClassArr class需要重组 与之前的上一个、下一个区别在于 切换部分的class不确定
                 * 如果选取的下标小于 标记下标 元素需要向后放 相当于itemPrev 执行
                 * 如果选取的下标大于 标记下标 元素需要向前放置 相当于 itemNext 执行
                 * 如果选取下标与标记下标相等  不做任何修改
                 */
                var diffVal=indicatorIndex-slide.currentIndex;
                if(diffVal==0){
                    return;
                }
                // slide.lastItem.css('transition','all 0s');
                slide.currentIndex=indicatorIndex;
                if(diffVal>0){
                    //改变原始数组 取出slide.itemClassArr.length-diffVal 位置开始到最后一个元素
                    var tempClassArr=slide.itemClassArr.splice(slide.itemClassArr.length-diffVal);
                    slide.itemClassArr=$.merge(tempClassArr,slide.itemClassArr);
                    slide.resetItemClass('next');
                    return ;
                }
                if(diffVal<0){
                    var tempClassArr=slide.itemClassArr.splice(0,-diffVal);
                    slide.itemClassArr=$.merge(slide.itemClassArr,tempClassArr);
                    slide.resetItemClass('prev');
                    return;
                }
            },
            resetItemClass:function(controller){
                // switch (controller){
                //     case 'next':
                //         break;
                //     case 'prev':
                //         break;
                // }
                slide.firstItem[0].addEventListener('transitionend',slide.transitionAnimate);
                $.each(slide.liList,function(index,item){
                    $(item).removeClass(slide.itemClassArr.join(' ')).addClass(slide.itemClassArr[index]);
                });
                slide.indicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                slide.customIndicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                slide.processCallbackFunc(slide.currentIndex);//回调
            },
            processCallbackFunc:function(index){
                if(settings.callbackFunc!=null&&settings.callbackFunc!=undefined){
                    settings.callbackFunc(index);//回调
                }
            },
        }
        slide.init();
        slide.itemNext.click(function(){
            slide.toNext();
        });
        slide.itemPrev.click(function(){
            slide.toPrev();
        });
        //指示器事件 click 或 mouseover
        switch(settings.indicatorEvent){
            case 'click':
                slide.indicatorList.click(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                slide.customIndicatorList.click(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                break;
            case 'mouseover':
                slide.indicatorList.mouseover(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                slide.customIndicatorList.mouseover(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                break;
        }
        //轮播模式 2d 或 3d
        switch(settings.slideType){
            case '2d':
                break;
            case '3d':
                slide.ul.on('click','.item1 img',function(){
                    slide.toPrev();
                });
                slide.ul.on('click','.item3 img',function(){
                    slide.toNext();
                });
                break;
        }
        //鼠标悬浮外层盒子  定时器关闭与开启
        slide.slideCarousel.mouseover(function(){
            clearInterval(settings.slideInterval);
        }).mouseleave(function(){
            slide.slideAutoChange();
        });
    }
    // slideCarsousel default setting
    $.fn.slideCarsousel.defaultSetting = {
        slideInterval :'slideInterval', // interval of slide
        isAutoChange :true, // true or false
        direction : 5000, // time interval between
        callbackFunc:null, // if it is not empty, it will execute
        indicatorEvent:'click', // indicator event,supports click or mouseover
        slideType:'2d' //  2d or 3d
    }

    // slide horizontal
    $.fn.slideTab =function(settings){
        settings = $.extend({}, $.fn.slideTab .defaultSetting, settings);
        var wrapper=$(this),ul=wrapper.children('ul.item-list'),liList=ul.children('.item');
        var slide={
            slideCarousel:wrapper,
            itemList:ul,
            itemWidth:parseInt(ul.attr('itemWidth')),
            count:liList.length,
            currentIndex:0, //指示器下标 初始值 0
            translateX:parseInt(ul.attr('translateX')),// 选项位移
            tempX:0,
            indicatorList:wrapper.children('.indicator-list').children('a'),
            customIndicatorList:wrapper.children('.custom-indicator-list').find('.indicator'),
            itemPrev:wrapper.children('.controls').children('.item-prev'),
            itemNext:wrapper.children('.controls').children('.item-next'),
            processCallbackFunc:function(index){
                if(settings.callbackFunc!=null&&settings.callbackFunc!=undefined){
                    settings.callbackFunc(index);//回调
                }
            },
            processIndicator:function(targetIndex){
                if(slide.currentIndex==targetIndex){return;}
                if(settings.isAutoChange){clearInterval(settings.slideInterval);}
                slide.tempX=slide.tempX + slide.itemWidth*(slide.currentIndex-targetIndex);
                slide.currentIndex=targetIndex;
                slide.itemList.stop().animate({marginLeft:slide.tempX+'px'},settings.animateTime,function(){
                    if(slide.currentIndex<0) {
                        slide.currentIndex = slide.count - 1;
                        slide.tempX = -slide.itemWidth *(slide.count-1)+slide.translateX;
                        slide.itemList.css('marginLeft',slide.tempX+'px');
                    }
                    if(slide.currentIndex==slide.count){
                        slide.currentIndex=0;
                        slide.tempX=slide.translateX;
                        slide.itemList.css('marginLeft',slide.tempX+'px');
                    }
                    slide.indicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                    slide.customIndicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                    slide.processCallbackFunc(slide.currentIndex);//回调
                    slide.slideAutoChange();
                });
            },
            toNext:function(){
                slide.processIndicator(slide.currentIndex+1);
            },
            toPrev:function(){
                slide.processIndicator(slide.currentIndex-1);
            },
            slideAutoChange:function(){
                if(settings.isAutoChange){
                    settings.slideInterval= setInterval(function() {
                        slide.toNext();
                    }, settings.direction);
                }
            },
            init:function(){
                slide.tempX=slide.translateX;
                switch(settings.indicatorEvent){
                    case 'click':
                        slide.indicatorList.click(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        slide.customIndicatorList.click(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        break;
                    case 'mouseover':
                        slide.indicatorList.mouseover(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        slide.customIndicatorList.mouseover(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        break;
                }
                slide.slideAutoChange();
            }
        }
        slide.init();
        slide.itemNext.click(function(){
            slide.toNext();
        });
        slide.itemPrev.click(function(){
            slide.toPrev();
        });
    }
    // slide tab default setting
    $.fn.slideTab.defaultSetting = {
        slideInterval :'slideInterval', // interval of slide
        isAutoChange :true, // true or false
        direction : 5000, // time interval between
        callbackFunc:null, // if it is not empty, it will execute
        indicatorEvent:'click', // indicator event,supports click or mouseover
        animateTime:500
    }


})(jQuery);
