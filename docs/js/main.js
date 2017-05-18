var Jibby = (function () {
    function Jibby(parent) {
        var _this = this;
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 220;
        this.div.addEventListener("click", function () { return _this.behaviour.onPet(); });
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", function () { return _this.behaviour.onEat(); });
        document.getElementsByTagName("washbutton")[0].addEventListener("click", function () { return _this.behaviour.onWash(); });
        this.behaviour = new Idle(this);
        this.hygiene = this.food = this.happiness = 60;
    }
    Jibby.prototype.update = function () {
        this.behaviour.performBehaviour();
    };
    return Jibby;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.jibby = new Jibby(container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.jibby.update();
        this.updateUI();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.updateUI = function () {
        document.getElementsByTagName("food")[0].innerHTML = Math.round(this.jibby.food).toString();
        document.getElementsByTagName("happiness")[0].innerHTML = Math.round(this.jibby.happiness).toString();
        document.getElementsByTagName("hygiene")[0].innerHTML = Math.round(this.jibby.hygiene).toString();
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = new Game();
});
var Dead = (function () {
    function Dead(j) {
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/dead.png')";
    }
    Dead.prototype.performBehaviour = function () {
    };
    Dead.prototype.onPet = function () {
        this.jibby.behaviour = new Zombie(this.jibby);
    };
    Dead.prototype.onWash = function () {
    };
    Dead.prototype.onEat = function () {
    };
    return Dead;
}());
var Eating = (function () {
    function Eating(j) {
        this.timer = 0;
        this.jibby = j;
    }
    Eating.prototype.performBehaviour = function () {
        this.timer++;
        this.jibby.hygiene -= 0.01;
        this.jibby.food += 0.09;
        this.jibby.happiness += 0.015;
        this.jibby.div.style.backgroundImage = "url('images/eating.gif')";
        if (this.jibby.food >= 99) {
            this.jibby.behaviour = new Idle(this.jibby);
        }
        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0) {
            this.jibby.behaviour = new Dead(this.jibby);
        }
    };
    Eating.prototype.onPet = function () {
        this.jibby.div.style.backgroundImage = "url('images/angry.png')";
    };
    Eating.prototype.onWash = function () {
    };
    Eating.prototype.onEat = function () {
    };
    return Eating;
}());
var Happy = (function () {
    function Happy(j) {
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
    }
    Happy.prototype.performBehaviour = function () {
        this.jibby.hygiene -= 0.01;
        this.jibby.food -= 0.02;
        this.jibby.happiness += 0.05;
        if (this.jibby.happiness >= 99) {
            this.jibby.behaviour = new Idle(this.jibby);
        }
        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0) {
            this.jibby.behaviour = new Dead(this.jibby);
        }
    };
    Happy.prototype.onPet = function () {
    };
    Happy.prototype.onWash = function () {
        this.jibby.behaviour = new Washing(this.jibby);
    };
    Happy.prototype.onEat = function () {
        this.jibby.behaviour = new Eating(this.jibby);
    };
    return Happy;
}());
var Idle = (function () {
    function Idle(j) {
        this.idleTimer = 0;
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/idle.png')";
    }
    Idle.prototype.performBehaviour = function () {
        this.jibby.hygiene -= 0.01;
        this.jibby.food -= 0.02;
        this.jibby.happiness -= 0.015;
        this.idleTimer++;
        if (this.idleTimer == 300) {
            this.idleTimer = 0;
            this.jibby.div.style.backgroundImage = "url('images/sleeping.png')";
        }
        if (this.jibby.hygiene <= 25) {
            this.jibby.div.style.backgroundImage = "url('images/dirty.png')";
        }
        if (this.jibby.food <= 25) {
            this.jibby.div.style.backgroundImage = "url('images/hungry.png')";
        }
        if (this.jibby.happiness <= 10) {
            this.jibby.div.style.backgroundImage = "url('images/angry.png')";
        }
        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0) {
            this.jibby.behaviour = new Dead(this.jibby);
        }
    };
    Idle.prototype.onPet = function () {
        this.idleTimer = 0;
        this.jibby.behaviour = new Happy(this.jibby);
    };
    Idle.prototype.onWash = function () {
        this.idleTimer = 0;
        this.jibby.behaviour = new Washing(this.jibby);
    };
    Idle.prototype.onEat = function () {
        this.idleTimer = 0;
        this.jibby.behaviour = new Eating(this.jibby);
    };
    return Idle;
}());
var Washing = (function () {
    function Washing(j) {
        this.jibby = j;
    }
    Washing.prototype.performBehaviour = function () {
        this.jibby.hygiene += 0.09;
        this.jibby.food -= 0.02;
        this.jibby.happiness -= 0.015;
        this.jibby.div.style.backgroundImage = "url('images/washing.png')";
        if (this.jibby.hygiene >= 99) {
            this.jibby.behaviour = new Idle(this.jibby);
        }
        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0) {
            this.jibby.behaviour = new Dead(this.jibby);
        }
    };
    Washing.prototype.onPet = function () {
    };
    Washing.prototype.onWash = function () {
    };
    Washing.prototype.onEat = function () {
    };
    return Washing;
}());
var Zombie = (function () {
    function Zombie(j) {
        this.audio = new Audio("images/growl.mp3");
        this.audio.play();
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/zombie.png')";
    }
    Zombie.prototype.performBehaviour = function () {
    };
    Zombie.prototype.onPet = function () {
        this.audio.play();
    };
    Zombie.prototype.onWash = function () {
    };
    Zombie.prototype.onEat = function () {
    };
    return Zombie;
}());
//# sourceMappingURL=main.js.map