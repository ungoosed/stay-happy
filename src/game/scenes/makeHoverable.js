function makeHoverable(sprite) {
  sprite.setFrame(0);
  sprite.setInteractive();
  sprite.on("pointerover", () => {
    sprite.setFrame(1);
    console.log("over");
  });
  sprite.on("pointerout", () => {
    sprite.setFrame(0);
  });
  return sprite;
}
export default makeHoverable;
