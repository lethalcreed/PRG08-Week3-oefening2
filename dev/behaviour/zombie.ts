class Zombie implements Behaviour {

    public jibby: Jibby;
    private audio = new Audio("images/growl.mp3");

    constructor(j: Jibby) {
        this.audio.play();
        this.jibby = j;
        this.jibby.div.style.backgroundImage = "url('images/zombie.png')";


    }

    public performBehaviour(): void {
    }
    onPet() {
        this.audio.play();
    }
    onWash() {

    }
    onEat() {

    }
}