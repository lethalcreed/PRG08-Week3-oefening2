class Happy implements Behaviour {

    public jibby: Jibby;

    constructor(j: Jibby) {
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/happy.png')";
    }

    public performBehaviour(): void {
        this.jibby.hygiene -= 0.01;
        this.jibby.food -= 0.02;
        this.jibby.happiness += 0.05;

        if (this.jibby.happiness >= 99) {
            this.jibby.behaviour = new Idle(this.jibby);
        }
        if (this.jibby.food <= 0 || this.jibby.hygiene <= 0 || this.jibby.happiness <= 0) {
            this.jibby.behaviour = new Dead(this.jibby);
        }

    }
    onPet() {
    }
    onWash() {
        this.jibby.behaviour = new Washing(this.jibby);
    }
    onEat() {
        this.jibby.behaviour = new Eating(this.jibby);
    }
}