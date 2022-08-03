const Discord = require("discord.js");
const { joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { Player } = require("discord-player");
const { PassThrough } = require("node:stream");
const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildVoiceStates, Discord.IntentsBitField.Flags.GuildPresences] });

client.login(process.env.TOKEN);
const r = "https://www.youtube.com/watch?v=YozBsSdtVpw&t=6s"
const commands = new Array(items = "!stop", "!taj", "!delltask", "!addtask", "!help", "!whatdoyoudo", "!clear", "!viens")
const audio = new Array(items = "risitas", "sardoche", "siphano", "branleur", "gensreseaux", "livre", "mbappe", "pizza", "puceau", "television", "tournepage", "issouchange")
const text = new Array(items = "Actuellement ? Je chies.", "Je vais me coucher, ferme ta gueule maintenant.", "Je suis en train de lire tes conneries", "Je veux devenir utouber", "Arrêtes de me faire chier !", "Je me filmes en mengeant des pizzas.", "Toute ma vie j'ai cherché un boulot pour gagner 500 000 balles par an sans faire grand chose.")
const prefix = "!";

client.once("ready", () => {
    console.log(`Je suis en ligne putain !`)
})
client.on("messageCreate", message => {
    if (message.content.startsWith(prefix)) {
        let passe = false;
        for (let index = 0; index < commands.length; index++) {
            if (message.content.startsWith(commands.at(index))) {
                passe = true;
            }
        }
        if (passe == false) {
            const wrongembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle("Ça existe pas bouffon.\nC'est !help pour voir celle qui existent.")
                .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
            message.channel.send({ embeds: [wrongembed] });
            return;
        };
        if (message.content.startsWith(prefix + "help")) {
            const embed = new Discord.EmbedBuilder();
            embed.setTitle("**__Liste des commandes__**")
            embed.addFields({ name: "!clear x", value: "Nettoyer x messages de moins de 14 jours." })
            embed.addFields({ name: "!whatdoyoudo", value: "Demande ce que fait le bot actuellement." })
            embed.addFields({ name: '!taj "choix1" "choix2" "choix3" ... ', value: "Effectue un tirage au sort." })
            embed.addFields({ name: '!addtask "tâche"', value: 'Ajoute "tâche" à la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!deltask "tâche"', value: 'Retire "tâche" de la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!viens', value: 'Rejoins le vocal et diffuse une surprise.' })
            embed.setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
            embed.addFields({ name: "!help", value: "Affiche la liste des commandes" })
            message.channel.send({ embeds: [embed] })

        } else if (message.content.startsWith(prefix + "clear")) {

            if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                let args = message.content.split(" ");
                if (args[1] == undefined) {
                    const unclearembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Tu m'as pas dit combien de messages fallait que je dégages...")
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [unclearembed] });
                } else {
                    let number = parseInt(args[1]);
                    if (isNaN(number)) {
                        const unclearembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("Réfléchit, c'est un nombre qui faut mettre !")
                            .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                        message.channel.send({ embeds: [unclearembed] })
                    } else {
                        if (number > 99) {
                            number = 99
                        }
                        message.channel.bulkDelete(number, true).then(messages => {
                            console.log("C'est bon j'ai dégagé" + messages.size + " messages")
                        }).catch(err => {
                            console.log("Erreur lors de la suppression des messages, " + err)
                        });
                    }
                }
            } else {
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "whatdoyoudo")) {
            var index = Math.floor(Math.random() * text.length)
            if (index < 0) {
                index = text.length - 1
            }
            var choose = text[index]
            const wdydnembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle(choose)
                .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
            message.channel.send({ embeds: [wdydnembed] })
        } else if (message.content.startsWith(prefix + "addtask")) {

            if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
                var args = message.content.split("")
                var add = message.content.slice(start = 9)
                text.push(String(add));
                console.log("C'est bon j'ai appris ça : " + add)
                const addtaskembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'ai appris ça : " + add)
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [addtaskembed] })
            } else {
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
            }

        } else if (message.content.startsWith(prefix + "deltask")) {

            if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
                var args = message.content.split("")
                var del = message.content.slice(start = 9)
                console.log(text[0].length, del.length)
                if (text.includes(del)) {
                    console.log("ok")
                    text.splice(text.indexOf(del), 1)
                    console.log("C'est bon j'ai viré ça : " + del)
                    const deltaskembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("C'est bon j'ai viré ça : " + del)
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [deltaskembed] })
                } else {
                    console.log("Cette tâche existe pas bouffon.")
                    const unknowndeltaskembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Cette tâche existe pas bouffon.")
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [unknowndeltaskembed] })
                }
            } else {
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "viens")) {
            if (message.member.voice.channel) {
                const Voiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("T'es chiant sérieux, j'arrive.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Voiceembed] })
                var index = Math.floor(Math.random() * audio.length)
                if (index < 0) {
                    index = audio.length - 1
                }
                var choose = "son/" + audio[index] + ".mp3"

                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channel.id,
                    guildId: message.member.voice.channel.guild.id,
                    adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
                });
                let resource = createAudioResource(choose);
                const player = createAudioPlayer();
                const subscription = connection.subscribe(player);
                player.play(resource)
                player.on(AudioPlayerStatus.Idle, () => {
                    connection.destroy()
                });
            }
        } else if (message.content.startsWith(prefix + "taj")) {
            if (message.content.length < 4) return;
            var args = message.content.slice(start = 5).split(" ")
            if (args.length == 0) return;
            var index = Math.floor(Math.random() * args.length)
            if (index < 0) {
                index = args.length - 1
            }
            var choose = args[index]
            const Tajembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle(choose + " à été tiré au sort.")
                .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
            message.channel.send({ embeds: [Tajembed] })
        } else if (message.content.startsWith(prefix + "stop")) {
            if (message.author.id != 391708236698615809) {
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'me casse.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Stopembed] }).then(() => {
                    client.destroy()
                });
                return;
            }
        }
    }
})