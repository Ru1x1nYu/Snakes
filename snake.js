//自调用函数，关于构造小蛇函数
(function () {
    var elements = [];//存放小蛇的每个身体部门
    //小蛇的构造函数
    //蛇的属性
    function Snake(width, height, direction) {
        //小蛇每个部分的宽
        this.width = width || 15;
        this.height = height || 15;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "blue"},//头
            {x: 2, y: 2, color: "yellow"},//第二截身体
            {x: 1, y: 2, color: "yellow"}//第三截身体
        ];
        //方向
        this.direction = direction || "right";
    }

    //为原型添加方法——小蛇初始化的方法
    Snake.prototype.init = function (map) {
        //先删除之前的小蛇
        remove();
        //循环遍历，创建div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];//数组中的每个元素都是一个对象
            var div = document.createElement("div");//创建小蛇div
            map.appendChild(div);//把小蛇div加入map地图中
            //设置div样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";//小蛇的横坐标
            div.style.top = obj.y * this.height + "px";//小蛇的纵坐标
            div.style.backgroundColor = obj.color;//背景颜色

            //把div加入到elements数组中——为了删除
            elements.push(div)
        }
    };

    //为原型添加方法——小蛇动起来
    Snake.prototype.move = function (food, map) {
        var i = this.body.length - 1;//2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向——改变小蛇的头的左边位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断有没有吃的到食物
        //小蛇的头的坐标和食物的坐标相同，即吃到
        var headX=this.body[0].x*this.width;//小蛇头的横坐标
        var headY=this.body[0].y*this.width;//小蛇头的纵坐标
        //食物的坐标
        var foodX=food.x;
        var foodY=food.y;
        //判断蛇头和食物坐标是否相同
        if (headX==foodX&&headY==foodY){
            //获取小蛇最后的尾巴
            var last=this.body[this.body.length-1];
            //把最后的蛇尾复制一个，重新加入到小蛇的body中
            this.body.push({
                x:last.x,
                y:last.y,
                color:"yellow"
            });
            //把食物删除
            food.init(map);
        }

    };

    //删除小蛇的私有函数
    function remove() {
        //获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前额子元素中找到该子元素的父级元素，然后再删除子元素
            var ele = elements[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window，外部可以访问
    window.Snake = Snake;
}());
