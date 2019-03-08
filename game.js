//自调用函数——游戏对象
(function () {
    var that = null;

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();//食物对象
        this.snake = new Snake();//小蛇对象
        this.map = map;//地图
        that = this;
    }

    //初始化游戏
    Game.prototype.init = function () {
        //初始化游戏
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        //小蛇移动
        //调用自动移动小蛇的方法
        this.runSnake(this.food, this.map);
        //调用按键的方法
        this.bindKey();
    };

    //添加原型方法——设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {
        //自动的去移动
        var timeId = setInterval(function () {
            //此时的this是window
            this.snake.move(food, map);
            this.snake.init(map);
            //横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            //蛇头的横坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;
            if (headX < 0 || headX >= maxX || headY < 0 || headY > maxY) {
                //撞墙了，停止定时器，弹出提示
                clearInterval(timeId);
                alert("游戏结束，请刷新继续");
            }
        }.bind(that), 150)
    };

    //添加原型方法——去设置用户按键，改变小蛇移动方向
    Game.prototype.bindKey = function () {

        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown", function (e) {
            // //此时this触发keydown的事件的对象——document
            //所以这里的this就是document
            //获取按键的值
            switch (e.keyCode || e.which) {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false)
    };

    //把Game暴露给window，外部可以访问Game对象
    window.Game = Game;
}());
