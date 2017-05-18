class Eating implements Behaviour {

    public jibby: Jibby;
    private timer: number = 0;

    constructor(j: Jibby) {
        this.jibby = j;
    }

    public performBehaviour(): void {
        this.timer++;
        this.jibby.hygiene -= 0.01;
        this.jibby.food += 0.09;
        this.jibby.happiness += 0.015;

        this.jibby.div.style.backgroundImage = "url('images/eating.gif')";

        if (this.jibby.food >= 99) {
            this.jibby.behaviour = new Idle(this.jibby);
        }

        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0){
            this.jibby.behaviour = new Dead(this.jibby);
        }
    }
    onPet() {
        this.jibby.div.style.backgroundImage = "url('images/angry.png')";

    }
    onWash() {

    }
    onEat() {

    }
}