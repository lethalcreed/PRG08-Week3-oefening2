class Jibby {

    public behaviour: Behaviour;

    public hygiene: number;
    public food: number;
    public happiness: number;

    public div: HTMLElement;
    public x: number;
    public y: number;

    constructor(parent: HTMLElement) {
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);

        // start instellingen
        this.x = 0;
        this.y = 220;

        // click listeners
        this.div.addEventListener("click", () => this.behaviour.onPet());
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", () => this.behaviour.onEat());
        document.getElementsByTagName("washbutton")[0].addEventListener("click", () => this.behaviour.onWash());

        // hier het gedrag toekennen
        this.behaviour = new Idle(this);

        this.hygiene = this.food = this.happiness = 60;
    }

    public update(): void {
        this.behaviour.performBehaviour();

    }


}
