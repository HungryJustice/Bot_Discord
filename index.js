const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');
const { ActivityType, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');

const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildVoiceStates, Discord.IntentsBitField.Flags.GuildPresences, Discord.IntentsBitField.Flags.GuildMessageReactions] });

//essayer de remplacer le await reaction par le client.on('messageReactionAdd')
//faire !stats et finir la mise en place de :limited: a pas dépasser lors du !clear
//!ping @pseudo envois un message privé et public : ramene toi ici : #idsalon ,connards
const token = process.env.TOKEN

var appName = 'botdiscordlouismazin';
var tok = "27fcf1f1-b3d9-471a-8d5e-1d02b1014885"


const files = fs.readdirSync('son')
const audio = new Array()
for (const file of files) {
    audio.push(file)
}
audio.splice(audio.indexOf('feur.mp3'), 1)

const quoi = new Array(items = "kwa", "quoi", "qwa", "qua", "kua", "kwa", "koi", "qoi", "coi", "coa", "qoa", "quoa", "cwa", "cowa", "qoua", "koua", "kowa")
const commands = new Array(items = "!parle", "!restart", "!stop", "!tas", "!deltask", "!addtask", "!help", "!whatdoyoudo", "!clear", "!viens")
const text = new Array(items = "Actuellement ? Je chies.", "Je vais me coucher, ferme ta gueule maintenant.", "Je suis en train de lire tes conneries", "Je veux devenir utouber", "Arrêtes de me faire chier !", "Je me filmes en mengeant des pizzas.", "Toute ma vie j'ai cherché un boulot pour gagner 500 000 balles par an sans faire grand chose.")
const prefix = "!";
var bloquer = false;
client.login(token)

client.once("ready", () => {
    const Testembed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Je redémarre.")
        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
    console.log(client.guilds.cache.channels) //.get("1003898726206668851").fetch().filter(messages => messages.embeds == [Testembed]))
    client.user.setPresence({ activities: [{ name: `de la haine.`, type: ActivityType.Streaming, url: "https://youtube.com/watch?v=dQw4w9WgXcQ" }], status: 'dnd' })
    console.log(`Bot en ligne.`)
})


client.on('messageUpdate', (oldmessage, newmessage) => {
    if (newmessage.embeds.length == 0) {
        if (oldmessage.content != newmessage.content) {
            newmessage.reply("Vu !\n>>||" + oldmessage.content + "||")
        }
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    console.log(reaction.emoji.id)
});

client.on("messageCreate", message => {
    if (bloquer == true) {
        if (message.content == "!start" && message.author.id == 391708236698615809) {
            const Startembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle("Je suis de retour.")
                .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
            message.channel.send({ embeds: [Startembed] })
            client.user.setPresence({ activities: [{ name: `de la haine.`, type: ActivityType.Streaming, url: "https://youtube.com/watch?v=dQw4w9WgXcQ" }], status: 'dnd' })
            console.log(`Bot en ligne.`)
            bloquer = false
            return
        } else {
            return
        }
    }
    if (message.content.startsWith(prefix)) {
        var index = 0;
        while (!message.content.startsWith(commands.at(index))) {
            index++;
            if (index > commands.length - 1) {
                console.log(message.author.username + " a saisi une commande innexistante.")
                const wrongembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Ça existe pas bouffon.\nC'est !help pour voir celle qui existent.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [wrongembed] });
                return;
            }
        }
        console.log(message.author.username + " a saisi " + message.content + ".")
        if (message.content.startsWith(prefix + "help")) {
            const embed = new Discord.EmbedBuilder();
            embed.setTitle("**__Liste des commandes__**")
            embed.addFields({ name: "!help", value: "Affiche la liste des commandes" })
            embed.addFields({ name: "!clear x", value: "Nettoyer x messages de moins de 14 jours." })
            embed.addFields({ name: "!whatdoyoudo", value: "Demande ce que fait le bot actuellement." })
            embed.addFields({ name: '!tas "choix1" "choix2" "choix3" ... ', value: "Effectue un tirage au sort." })
            embed.addFields({ name: '!addtask "tâche"', value: 'Ajoute "tâche" à la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!deltask "tâche"', value: 'Retire "tâche" de la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!viens', value: 'Rejoins le vocal et diffuse une surprise.' })
            embed.setThumbnail("https://i.imgur.com/ioQ6NQC.png");
            message.channel.send({ embeds: [embed] })

        } else if (message.content.startsWith(prefix + "clear")) {
            if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                let args = message.content.split(" ");
                if (args[1] == undefined) {
                    console.log(message.author.username + " n'a rien saisi apres !clear.")
                    const unclearembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Tu m'as pas dit combien de messages fallait que je dégages...")
                        .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                    message.channel.send({ embeds: [unclearembed] });
                } else {
                    let number = parseInt(args[1]);
                    if (args[1].startsWith("<@")) {
                        var nargs = new Array()
                        for (const arg of args) {
                            if (arg.endsWith(">") && arg.startsWith("<@")) {
                                nargs.push(arg.slice(2, -1))
                            }
                        }
                        console.log(nargs)

                        var options = {}
                        var supprimés = 0
                        var to_trash = new Array()
                        var into_trash = new Array()
                        const confirmembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("T'es sur ?")
                            .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                        message.reply({ embeds: [confirmembed] }).then(m => {
                            m.react('1007234604480069662');
                            m.react('1007238080153006110');
                            const filter = (reaction, user) => {
                                return user.id != "931190932232097912";
                            };
                            //wait reaction.emoji.id === '1007234604480069662' for delete messages up to the emoji that has the ID "1008076515658977441"
                            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.id === '1007234604480069662') {
                                        console.log("oui")
                                        message.channel.messages.fetch({ limit: 100 }).then(messages => {
                                            messages.forEach(msg => {
                                                var reacts = new Array()
                                                while (!("1008076515658977441" in reacts)) {
                                                    reacts = new Array()
                                                    msg.reactions.cache.forEach(reaction => {
                                                        reacts.push(reaction.emoji.id)
                                                    })
                                                    to_trash.push(msg)
                                                }
                                            })
                                            console.log(to_trash)
                                            for (const msg of to_trash) {
                                                msg.delete()
                                                supprimés++
                                            }
                                            const deletedembed = new Discord.EmbedBuilder()
                                                .setColor("#0099ff")
                                                .setTitle("J'ai supprimé " + supprimés + " messages.")
                                                .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                                            message.channel.send({ embeds: [deletedembed] });
                                        })
                                    } else {
                                        console.log("non")
                                        const deletedembed = new Discord.EmbedBuilder()
                                            .setColor("#0099ff")
                                            .setTitle("J'ai rien supprimé.")
                                            .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                                        message.channel.send({ embeds: [deletedembed] });
                                    }
                                })
                        })

                        /*
                            m.awaitReactions({ filter, max: 1, time: 4000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.id === '1007234604480069662') {
                                        m.channel.bulkDelete(2, true)
                                        var stop_boucle = false
                                        var BreakException = {};
                                        message.channel.messages.fetch().then(messages => {
                                            a_supprimer = messages.filter((m) => nargs.includes(m.author.id))
                                            a_supprimer.forEach(msg => {
                                                //regarder si un message contient emoji stop dans les arg1
                                                //derniers messages, si oui prendre son index et bulk delete debut jusqu'à l'index-1.
                                                if (reaction.message.reactions.cache.filter(react => react.emoji.id == "1008076515658977441")) throw BreakException;
                                                into_trash.push(msg)
                                                if (into_trash.length > 99) {
                                                    to_trash.push(into_trash)
                                                    into_trash = new Array()
                                                }
                                            })
                                            if (into_trash.length > 0) {
                                                to_trash.push(into_trash)
                                            }
                                        }).then(() => {
                                            to_trash.forEach(element => {
                                                message.channel.bulkDelete(element, true).then(messages => {
                                                    supprimés += element.length
                                                }).catch(err => {
                                                    console.log("Erreur lors de la suppression des messages : " + err)
                                                });
                                            })
                                        })
                                    } else if (reaction.emoji.id === '1007238080153006110') {
                                        m.channel.bulkDelete(2, true)
                                        return
                                    }
                                })
                                .catch(collected => {
                                    m.channel.bulkDelete(2, true)
                                    return
                                });
                                
                        })*/
                    } else if (isNaN(number)) {
                        console.log(message.author.username + " n'a pas saisi de nombre ni de personne.")
                        const unclearembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("Réfléchit, c'est un nombre ou un @ qui faut mettre !")
                            .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                        message.channel.send({ embeds: [unclearembed] })
                    } else {
                        var supprimés = 0
                        var to_trash = new Array()
                        var into_trash = new Array()
                        const confirmembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("T'es sur ?")
                            .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                        message.reply({ embeds: [confirmembed] }).then(m => {
                            const filter = (reaction, user) => {
                                return user.id != "931190932232097912";
                            };
                            m.react('1007234604480069662');
                            m.react('1007238080153006110');
                            m.awaitReactions({ filter, max: 1, time: 4000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();
                                    if (reaction.emoji.id === '1007234604480069662') {
                                        number += 2
                                        if (number > 100) {
                                            number = 100
                                        }
                                        const options = { limit: number };
                                        var stop_boucle = false
                                        var BreakException = {};
                                        message.channel.messages.fetch(options).then(messages => {
                                            messages.forEach(msg => {
                                                if (reaction.message.reactions.cache.filter(react => react.emoji.id == "1008076515658977441")) throw BreakException;
                                                into_trash.push(msg)
                                                if (into_trash.length > 99) {
                                                    to_trash.push(into_trash)
                                                    into_trash = new Array()
                                                }
                                            })
                                            if (into_trash.length > 0) {
                                                to_trash.push(into_trash)
                                            }
                                        }).then(() => {
                                            to_trash.forEach(element => {
                                                message.channel.bulkDelete(element, true).then(messages => {
                                                    supprimés += element.length
                                                }).catch(err => {
                                                    console.log("Erreur lors de la suppression des messages : " + err)
                                                });
                                            })
                                        })
                                    } else if (reaction.emoji.id === '1007238080153006110') {
                                        m.channel.bulkDelete(2, true)
                                        return
                                    }
                                })
                                .catch(collected => {
                                    m.channel.bulkDelete(2, true)
                                    return
                                });
                        })
                    }
                }
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !clear.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
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
                .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
            message.channel.send({ embeds: [wdydnembed] })
        } else if (message.content.startsWith(prefix + "addtask")) {
            if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
                var args = message.content.split("")
                var add = message.content.slice(start = 9)
                text.push(String(add));
                console.log(message.author.username + " a ajouté la phrase : " + add)
                const addtaskembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'ai appris ça : " + add)
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [addtaskembed] })
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !addtask.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Permembed] })
            }

        } else if (message.content.startsWith(prefix + "deltask")) {
            if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
                var args = message.content.split("")
                var del = message.content.slice(start = 9)
                if (text.includes(del)) {
                    text.splice(text.indexOf(del), 1)
                    console.log(message.author.username + " a retiré la phrase : " + add)
                    const deltaskembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("C'est bon j'ai viré ça : " + del)
                        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                    message.channel.send({ embeds: [deltaskembed] })
                } else {
                    console.log(message.author.username + " n'a pas pu retirer la phrase : " + add + " (innexistante)")
                    const unknowndeltaskembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Cette tâche existe pas bouffon.")
                        .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                    message.channel.send({ embeds: [unknowndeltaskembed] })
                }
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !deltask.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "viens")) {
            if (message.member.voice.channel) {
                const Voiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("T'es chiant sérieux, j'arrive.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Voiceembed] })
                var index = Math.floor(Math.random() * audio.length)
                if (index < 0) {
                    index = audio.length - 1
                }
                var choose = "son/" + audio[index]

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
            } else {
                console.log(message.author.username + " n'est pas dans un salon vocal.")
                const noVoiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Où veux-tu que je viennes, t'es même pas dans un salon vocal...")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [noVoiceembed] })
            }
        } else if (message.content.startsWith(prefix + "tas")) {
            var args = message.content.slice(start = 4).split(" ")
            var choix = new Array()
            for (const iterator of args) {
                if (iterator != "" && iterator != " ") {
                    choix.push(iterator)
                }
            }
            if (choix.length == 0) {
                console.log(message.author.username + " n'a saisi aucun choix.")
                const Tajembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Comment veux-tu faire un tirage au sort sans choix ?\nJ'te jure...")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Tajembed] })
                return;
            }
            var index = Math.floor(Math.random() * choix.length)
            if (index < 0) {
                index = choix.length - 1
            }
            var choose = choix[index]
            console.log(choose + " est le choix tiré au sort.")
            const Tajembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle(choose + " à été tiré au sort.")
                .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
            message.channel.send({ embeds: [Tajembed] })
        } else if (message.content.startsWith(prefix + "stop")) {
            if (message.author.id != 391708236698615809) {
                console.log(message.author.username + " n'a pas la persimission de saisir !stop.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Bot hors-ligne.")
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'me casse.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Stopembed] })
                client.user.setPresence({ activities: [{ name: `être éteint.`, type: ActivityType.Playing }], status: 'dnd' })
                bloquer = true
                return
            }
        } else if (message.content.startsWith(prefix + "restart")) {
            if (message.author.id != 391708236698615809) {
                console.log(message.author.username + " n'a pas la persimission de saisir !stop.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/tmff2s4.jpg");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Redémarrage du bot.")
                const Restartembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Je redémarre.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                client.user.setPresence({ activities: [{ name: `redémarrer.`, type: ActivityType.Playing }], status: 'dnd' })
                message.channel.send({ embeds: [Restartembed] }).then(m => {
                    request.delete({
                            url: 'https://api.heroku.com/apps/' + appName + '/dynos/',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/vnd.heroku+json; version=3',
                                'Authorization': 'Bearer ' + tok
                            }
                        },
                        function(error, response, body) {
                            return
                        }
                    )

                });
            }
        }
    } else if (message.author.id != "931190932232097912") {
        const Message = message.content.toLowerCase()
        var nMessage = ""
        var passe = false
        if (Message.includes("<:quoi:1004394208163008593>")) {
            nMessage = "quoi"
        } else {
            for (let i = 0; i < Message.length; i++) {
                if (passe == true) {
                    if (Message[i] == ">") {
                        passe = false;
                    }
                } else if (Message[i] == "<") {
                    if (Message[i + 1] == ":") {
                        passe = true;
                    }
                } else {
                    nMessage += Message[i]
                }

            }
        }
        var nMessage2 = ""
        var precedant = ""
        for (const i of nMessage) {
            if ('abcdefghijklmnopqrstuvwxyz0123456789'.includes(i)) {
                if (i != precedant) {
                    nMessage2 += i;
                    precedant = i;
                }
            }
        }
        var index = 0;
        while (!nMessage2.endsWith(quoi.at(index))) {
            if (index > quoi.length - 1) {
                var rd = Math.floor(Math.random() * 2048)
                if (rd == 1024) {
                    const RATIOembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("YOU CATCH A SHINYYYYY.")
                        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                    message.channel.send({ embeds: [RATIOembed] }).then(shiny => shiny.reply("GG, ce message n'avait qu'une chance sur 4096 d'apparaître"))
                }
                return
            }
            index++;
        }
        if (message.member.voice.channel) {
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.voice.channel.guild.id,
                adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
            });
            let resource = createAudioResource("son/feur.mp3");
            const player = createAudioPlayer();
            const subscription = connection.subscribe(player);
            player.play(resource)
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy()
            });
            console.log(message.author.username + " s'est mangé un feur oral.")
        } else {
            message.reply({ files: ['son/feur.mp3'], content: "feur." })
            console.log(message.author.username + " s'est mangé un feur écrit.")
        }
    }
})

//Exemple async utile
// const restart = async() => {
//     client.destroy()
// };

// restart().then(() => {})