class Idle implements Behaviour {

    public jibby: Jibby;

    private idleTimer: number = 0;

    constructor(j: Jibby) {
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/idle.png')";
    }

    public performBehaviour(): void {
        this.jibby.hygiene -= 0.01;
        this.jibby.food -= 0.02;
        this.jibby.happiness -= 0.015;
        this.idleTimer++

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
    }
    onPet() {
        this.idleTimer = 0;
        this.jibby.behaviour = new Happy(this.jibby);
    }
    onWash() {
        this.idleTimer = 0;
        this.jibby.behaviour = new Washing(this.jibby);
    }
    onEat() {
        this.idleTimer = 0;
        this.jibby.behaviour = new Eating(this.jibby);
    }
}