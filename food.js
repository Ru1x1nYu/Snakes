//自调用食物的函数
(function () {
    //保存每个小方块食物
    var elements = [];
    //食物就是一个对象，有宽，有高，有颜色，有横纵坐标，先定义构造函数，然后创建对象
    function Food(x, y, width, height, color) {
        this.x = x;//横坐标
        this.y = y;//纵坐标
        this.width = width || 15;//宽度，默认15
        this.height = height || 15;//高度，默认15
        this.color = "black";//背景颜色
    }

    //为原型添加初始化的方法
    Food.prototype.init = function (map) {//传入地图map参数
        // 先删除小食物
        remove();//该方法外部无法访问
        var div = document.createElement("div");//创建食物div
        map.appendChild(div);//把div加到map
        //设置div样式
        div.style.borderRadius = "20px";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //横纵坐标随机产生，脱离文档流
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div加入到数组elements中
        elements.push(div);

    };

    //私有的函数：删除食物,为了初始化
    function remove() {
        //elements中可能有着食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除，清空elements
            elements.splice(i, 1);
        }
    }

    window.Food = Food;//把Food提供给外部可以使用
}());
