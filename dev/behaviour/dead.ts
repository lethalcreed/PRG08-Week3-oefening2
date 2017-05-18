class Dead implements Behaviour {

    public jibby: Jibby;

    constructor(j: Jibby) {
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/dead.png')";
    }

    public performBehaviour(): void {
    }
    onPet() {
        this.jibby.behaviour = new Zombie(this.jibby);
    }
    onWash() {

    }
    onEat() {

    }
}