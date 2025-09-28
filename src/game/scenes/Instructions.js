import { Scene } from "phaser";

export class Instructions extends Scene {
  constructor() {
    super("Instructions");
  }

  create() {
    this.add
      .text(
        512,
        200,
        "Move: W,A,S,D \n Attack: Spacebar \n Goal: Don't touch the pink people",
        {
          fontFamily: "Arial Black",
          fontSize: 38,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        },
      )
      .setOrigin(0.5);
    this.add
      .text(512, 400, "Good luck, and have a happy time!", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
