const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let id;

const client = net.createConnection(
    { host: "127.0.0.1", port: 3008 },
    async () => {
        console.log("Connected to server.");
        const ask = async () => {
            const message = await rl.question("Enter a message >");
            await moveCursor(0, -1);

            await clearLine(0)

            client.write(`${id}-message-${message}`);
        }
        ask();

        client.on("data", async (data) => {

            console.log();
            await moveCursor(0, -1);
            await clearLine(0);

            data
            if (data.toString("utf-8").substring(0, 2) === "id") {
                id = data.toString("utf-8").substring(3);
                console.log("Your id is " + id + "\n");

            } else {
                if (data.toString("utf-8").substring(3)) {

                    console.log(data.toString("utf-8"));
                }
            }

            ask();
        })


    });



const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve();
        })
    })
}
const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        })
    })
}

client.on("end", () => {
    console.log("Disconnected from server")
})