import Phaser from "phaser";
import { createUser } from "../modules/getUserData.js";
import { client } from "../modules/twitch.js";
import { playBoing, playExplode } from "../modules/sounds.js";

const EXPLODE_THRESHOLD = 500;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
      active: true
    });
  }

  init() {
    this.users = [];
    this.enabledUsers = [];
  }

  preload() {
    this.load.on("filecomplete", (key) => { console.log("Imagen precargada", key); });
    this.load.image("goose", "images/goose.png");
  }

  collide(obj1, obj2) {
    if (Math.random() < 0.5) {
      playBoing();
    } else {
      const acc1 = obj1.body.velocity.length();
      const acc2 = obj2.body.velocity.length();
      console.log({ acc1, acc2 });

      if (acc1 > EXPLODE_THRESHOLD) {
        playExplode();
        this.destroy(obj1);
      }
      if (acc2 > EXPLODE_THRESHOLD) {
        playExplode();
        this.destroy(obj2);
      }
    }
  }

  destroy(user) {
    this.users = this.users.filter(searchUser => user !== searchUser);
    user.destroy();
  }

  async create() {
    client.on("message", async (channel, tags, message, self) => {
      const nick = tags["display-name"];
      const hasNick = this.enabledUsers.includes(nick);
      // this.textures.exists(nick);

      if (!hasNick) {
        this.enabledUsers.push(nick);
        const user = await createUser(nick, this);
        this.users.push(user);
        this.physics.world.enable(user);
        const bounce = Math.min(0.75 + Math.random(), 1.04);
        const acceleration = Phaser.Math.Between(-5, 5);
        const angularAcceleration = Phaser.Math.Between(-1, 1);
        const velocity = Phaser.Math.Between(0, 100);
        user.body
          .setCollideWorldBounds()
          .setSize(70, 70)
          .setVelocity(velocity)
          .setBounce(bounce)
          .setAcceleration(acceleration)
          .setAngularAcceleration(angularAcceleration);
      }
    });
  }

  update() {
    this.physics.world.collide(this.users, this.users, (obj1, obj2) => this.collide(obj1, obj2));
  }
};
