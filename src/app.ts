import { Client, Message } from 'discord.js';
import { config } from "../config";

export class App {
    client: Client;
    command: string;
    args: string[];

    constructor() { }

    initializeApp() {
        this.client = new Client();

        this.client.once('ready', () => {
            console.info('READY!')
        });

        this.client.login(config.token);

        this.client.on('message', message => {
            this.setArgumentsAndCommand(message);


            console.log(`Command name: ${this.command}\nArguments: ${this.args}`);


            if (this.command === 'ping') {
                message.channel.send('Pong.');
            }
            else if (this.command.startsWith('echo')) {
                console.log('here');

                const reply = this.command.replace('echo', '').trim();
                if (reply)
                    message.reply(reply);
            }
            else if (this.command === 'server') {
                message.reply(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
            }
            else if (message.content === 'user-info') {
                message.reply(`Your username: ${message.author}\nYour ID: ${message.author.id}`);
                message.author.createDM().then(response => {
                    response.send('OOOYEAH');
                })
            }
        });
    }

    private setArgumentsAndCommand(message: Message): void {
        this.args = message.content.slice(config.prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase();
    }

    private isPrefix(message: Message): boolean {
        if (!(message.content.charAt(0) === config.prefix))
            return false;
        this.removePrefix(message);
        // console.log(message.content);

        return true;
    }

    private removePrefix(message: Message): void {
        if (message.content.startsWith('!'))
            message.content = message.content.replace('!', '');
    }
}


