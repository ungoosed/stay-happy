import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
    this.dead = "";
  }
  init(data) {
    if (data == "happy") {
      this.dead =
        "You prioritised stats over happiness. \n Stats are cool and all, but at the cost of joy?";
    } else {
      this.dead = "You ran out of health. Ouch. ";
    }
  }
  create() {
    this.cameras.main.setBackgroundColor(0xff0000).setAlpha(0.5);
    this.add
      .text(512, 384, this.dead + " \n Click to return to main menu", {
        fontFamily: "Arial Black",
        fontSize: 32,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
