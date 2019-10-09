import  Discord from 'discord.js';
import { config } from "../config";

export module App {
    const client = new Discord.Client();

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.login(config.token);

    client.on('message', message => {
        console.log(message.content);
    });
}
