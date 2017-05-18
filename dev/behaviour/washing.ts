class Washing implements Behaviour {

    public jibby: Jibby;

    constructor(j: Jibby) {
        this.jibby = j;
    }

    public performBehaviour(): void {
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
    }
    onPet() {

    }
    onWash() {

    }
    onEat() {

    }
}