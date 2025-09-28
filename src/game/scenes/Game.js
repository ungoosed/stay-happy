import { Scene } from "phaser";
import makeHoverable from "./makeHoverable";
export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const music = this.sound.add("music");
    music.setLoop(true);
    music.play();
    this.timeouts = [];
    this.events.on(
      "shutdown",
      function () {
        this.timeouts.forEach((t) => clearTimeout(t));
        this.timeouts = [];
      }.bind(this),
      this,
    );
    this.events.on(
      "destroy",
      function () {
        this.timeouts.forEach((t) => clearTimeout(t));
        this.timeouts = [];
      }.bind(this),
      this,
    );
    this.cameras.main.setZoom(1.5);
    this.cameras.main.scrollX = -200;
    this.cameras.main.scrollY = -150;
    //VARS
    this.timer = 0;
    this.happiness = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.stage = 1;
    this.speed = 100;
    this.wave = 1;
    this.attack1Enabled = true;

    // var keyObjects = scene.input.keyboard.addKeys('W,S,A,D', enableCapture, emitOnRepeat);
    this.physics.world.setBounds(70, 105, 600, 295);
    this.physics.world.setBoundsCollision();
    // this.physics.world.setBoundsCollision(left, right, up, down);
    // this.physics.world.setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown);
    this.keys = this.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
      attack: "SPACE",
    });
    this.waveText = this.add.text(10, 10, "Wave: 1", {
      fontFamily: "Arial",
      fontSize: "24px",
      fill: "#000",
    });
    this.healthText = this.add.text(200, 10, "Health: 1", {
      fontFamily: "Arial",
      fontSize: "24px",
      fill: "#000",
    });
    this.speedText = this.add.text(400, 10, "Speed: 1", {
      fontFamily: "Arial",
      fontSize: "24px",
      fill: "#000",
    });
    //ATTACKS
    this.cooldown = this.add.sprite(100, 200, "cooldown").setScale(2);
    this.attack1 = this.physics.add
      .sprite(0, 0, "attack1")
      .setFrame(0)
      .setScale(2)
      .disableBody(true, true);
    //anims
    this.anims.create({
      key: "kill",
      frames: "attack1",
      repeat: -1,
    });
    this.keys.attack.on("down", () => {
      if (this.attack1Enabled) {
        this.attack1.setVisible(true);
        this.attack1.enableBody(false, null, null, true, true);
        this.anims.play("kill", this.attack1);
        this.attack1Enabled = false;
        this.timeouts.push(
          setTimeout(() => {
            this.attack1Enabled = true;
          }, 2000),
        );
        this.cooldown.setFrame(0);
        for (let i = 1; i < 4; i++) {
          this.timeouts.push(
            setTimeout(() => {
              this.cooldown.setFrame(i);
            }, 500 * i),
          );
        }

        this.timeouts.push(
          setTimeout(() => {
            this.attack1.setVisible(false);
            this.attack1.disableBody(true, true);
          }, 1000),
        );
      }
    });
    //PLAYER
    this.player = this.physics.add
      .sprite(200, 200, "player")
      .setCollideWorldBounds(true);
    this.cameras.main.setBackgroundColor(0xffffff);
    // this.add.image(512, 384, "background").setAlpha(0.5);
    //Enemies
    this.enemies = [];
    this.wave1 = function () {
      let announcement = this.add.text(200, 100, "Wave: " + this.wave, {
        fontSize: "64px",
        fontFamily: "Arial",
        fill: "000",
      });
      this.stage = 1;
      for (let i = 0; i < 5; i++) {
        let enemy = this.physics.add.sprite(100 + i * 100, 100, "enemy");
        this.enemies.push(enemy);
        this.physics.add.overlap(enemy, this.attack1, () => {
          enemy.destroy();
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        });
        this.physics.add.overlap(enemy, this.player, () => {
          this.health -= 5;
          this.player.setTint(0xff0000);
          this.timeouts.push(
            setTimeout(
              function () {
                this.player.setTint();
              }.bind(this),
              50,
            ),
          );
          enemy.destroy();

          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        });
      }
      //stage 2
      this.timeouts.push(
        setTimeout(() => {
          this.stage = 2;
          for (let i = 0; i < 10; i++) {
            let enemy = this.physics.add.sprite(100 + i * 50, 400, "enemy");
            this.enemies.push(enemy);
            this.physics.add.overlap(enemy, this.attack1, () => {
              enemy.destroy();
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            this.physics.add.overlap(enemy, this.player, () => {
              this.health -= 5;
              this.player.setTint(0xff0000);
              this.timeouts.push(
                setTimeout(
                  function () {
                    this.player.setTint();
                  }.bind(this),
                  50,
                ),
              );
              enemy.destroy();

              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
          }
        }, 5000),
      );
      this.timeouts.push(
        setTimeout(() => {
          this.stage = 3;
          for (let i = 0; i < 10; i++) {
            let enemy = this.physics.add.sprite(100 + i * 50, 200, "enemy");
            this.enemies.push(enemy);
            this.physics.add.overlap(enemy, this.attack1, () => {
              enemy.destroy();
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            this.physics.add.overlap(enemy, this.player, () => {
              this.health -= 5;
              enemy.destroy();
              this.player.setTint(0xff0000);
              this.timeouts.push(
                setTimeout(
                  function () {
                    this.player.setTint();
                  }.bind(this),
                  50,
                ),
              );
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
          }
        }, 6700),
      );
      this.timeouts.push(
        setTimeout(() => {
          this.stage = 4;
          for (let i = 0; i < 8; i++) {
            let enemy = this.physics.add.sprite(100 + i * 110, 400, "enemy");
            this.enemies.push(enemy);
            this.physics.add.overlap(enemy, this.attack1, () => {
              enemy.destroy();
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            this.physics.add.overlap(enemy, this.player, () => {
              this.health -= 5;
              enemy.destroy();
              this.player.setTint(0xff0000);
              this.timeouts.push(
                setTimeout(
                  function () {
                    this.player.setTint();
                  }.bind(this),
                  50,
                ),
              );
              this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
          }
        }, 10000),
      );
      this.timeouts.push(
        setTimeout(() => {
          announcement.destroy();
        }, 1500),
      );
    }.bind(this);
    this.timeouts.push(
      setTimeout(() => {
        this.wave1();
      }, 2000),
    );

    //LOWER_UP
    this.negSpeed = makeHoverable(
      this.add.sprite(450, 400, "orangeButton").setFrame(0).setScale(4),
    ).setVisible(false);
    this.negHappy = makeHoverable(
      this.add.sprite(300, 400, "greenButton").setFrame(0).setScale(4),
    ).setVisible(false);
    this.negHealth = makeHoverable(
      this.add.sprite(150, 400, "redButton").setFrame(0).setScale(4),
    ).setVisible(false);
    this.negSpeedText = this.add
      .text(150, 400, "Sacrifice 10 \n health", {
        fontSize: "12px",
        fill: "#000",
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.negHealthText = this.add
      .text(450, 400, "Sacrifice 10 \n speed", {
        fontSize: "12px",
        fill: "#000",
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.negHappyText = this.add
      .text(300, 400, "Sacrifice some \n happiness", {
        fontSize: "12px",
        fill: "#000",
      })
      .setOrigin(0.5)
      .setVisible(false);
    this.negSpeed.on(
      "pointerdown",
      function () {
        this.speed -= 10;
        this.negHappyText.setVisible(false);
        this.negHappy.setVisible(false);
        this.negSpeed.setVisible(false);
        this.negSpeedText.setVisible(false);
        this.negHealthText.setVisible(false);
        this.negHealth.setVisible(false);
        this.wave++;
        this.wave1();
      }.bind(this),
    );
    this.negHealth.on(
      "pointerdown",
      function () {
        this.maxHealth -= 10;
        this.negHappy.setVisible(false);
        this.negHappyText.setVisible(false);
        this.health = this.maxHealth;
        this.negHealth.setVisible(false);
        this.negHealthText.setVisible(false);
        this.negSpeedText.setVisible(false);
        this.negSpeed.setVisible(false);
        this.wave++;
        this.wave1();
      }.bind(this),
    );
    this.negHappy.on(
      "pointerdown",
      function () {
        this.happiness++;
        if (this.happiness > 3) {
          this.scene.stop("Game");
          this.scene.start("GameOver", "happy");
        }
        this.player.setFrame(this.happiness);
        this.negHappy.setVisible(false);
        this.negHappyText.setVisible(false);
        this.negHealthText.setVisible(false);
        this.negHealth.setVisible(false);
        this.negSpeedText.setVisible(false);
        this.negSpeed.setVisible(false);
        this.wave++;
        this.wave1();
      }.bind(this),
    );
    this.lower = function () {
      this.negHealthText.setVisible(true);
      this.negSpeedText.setVisible(true);
      this.negHappy.setVisible(true);
      this.negHappyText.setVisible(true);
      this.negHealth.setVisible(true);
      this.negSpeed.setVisible(true);
    }.bind(this);
  }
  update(time, delta) {
    if (this.health <= 0) {
      this.scene.stop("Game");
      this.scene.start("GameOver", "health");
    }
    this.timer += delta;
    this.healthText.setText("Health: " + this.health);
    this.speedText.setText("Speed: " + this.speed);
    this.waveText.setText("Wave: " + this.wave);
    while (this.timer > 2000) {
      console.log("spawn enemies");
      this.timer -= 2000;
    }
    // Rest of your update loop.

    for (let i = 0; i < this.enemies.length; i++) {
      this.physics.moveTo(this.enemies[i], this.player.x, this.player.y, 100);
    }
    if (this.keys.up.isDown) {
      this.player.setVelocityY(-2 * this.speed);
    } else if (this.keys.down.isDown) {
      this.player.setVelocityY(2 * this.speed);
    } else {
      this.player.setVelocityY(0);
    }
    if (this.keys.right.isDown) {
      this.player.setVelocityX(2 * this.speed);
    } else if (this.keys.left.isDown) {
      this.player.setVelocityX(-2 * this.speed);
    } else {
      this.player.setVelocityX(0);
    }
    this.attack1.x = this.player.x;
    this.attack1.y = this.player.y;
    if (this.enemies.length == 0 && this.stage > 3) {
      this.lower();
    }
  }
}
