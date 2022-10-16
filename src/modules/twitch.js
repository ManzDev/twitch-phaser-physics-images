const channels = ["manzdev"];
const client = new window.tmi.Client({ channels });

client.connect();

export { client };
