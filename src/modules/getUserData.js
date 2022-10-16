import Phaser from "phaser";
import { width, height } from "./constants.js";

const API_URL = "http://localhost:9999/api/userinfo/";

const getUserData = async (username) => {
  const response = await fetch(API_URL + username);
  const data = await response.json();

  return data;
};

export const createUser = async (username, scene) => {
  const userData = await getUserData(username);
  const x = Phaser.Math.Between(0, width);
  const y = Phaser.Math.Between(0, 200);

  const user = scene.add.image(x, y, "goose").setSize(70, 70);

  // const circle = scene.add.graphics().fillCircle(x, y, 35);
  // const mask = circle.createGeometryMask();
  // user.setMask(mask)
  user.on("gameobject_move", (data) => {
    console.log(data);
  });

  scene.load.on("filecomplete", (key) => user.setTexture(username).setSize(70, 70));
  scene.load.image(username, userData.picture);
  scene.load.start();
  return user;
};
