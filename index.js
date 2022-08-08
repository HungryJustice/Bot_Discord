const Discord = require('discord.js');
const { ActivityType, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildVoiceStates, Discord.IntentsBitField.Flags.GuildPresences] });
client.login(process.env.TOKEN)
const quoi = new Array(items = "kwa", "quoi", "qwa", "qua", "kua", "kwa", "koi", "qoi", "coi", "coa", "qoa", "quoa", "cwa", "cowa", "qoua", "koua", "kowa")
const commands = new Array(items = "!parle", "!restart", "!stop", "!tas", "!deltask", "!addtask", "!help", "!whatdoyoudo", "!clear", "!viens")
const audio = new Array(items = "risitas", "sardoche", "siphano", "branleur", "gensreseaux", "livre", "mbappe", "pizza", "puceau", "television", "tournepage", "issouchange", "envie", "tagueule", "pierremenes", "salami", "anus", "tagueule2", "chiasse", "tante", "mortparent", "niquertoucher", "fdp")
const text = new Array(items = "Actuellement ? Je chies.", "Je vais me coucher, ferme ta gueule maintenant.", "Je suis en train de lire tes conneries", "Je veux devenir utouber", "Arrêtes de me faire chier !", "Je me filmes en mengeant des pizzas.", "Toute ma vie j'ai cherché un boulot pour gagner 500 000 balles par an sans faire grand chose.")
const prefix = "!";
client.once("ready", () => {
    client.user.setPresence({ activities: [{ name: `de la haine.`, type: ActivityType.Streaming, url: "https://youtube.com/watch?v=dQw4w9WgXcQ" }], status: 'dnd' })
    console.log(`Bot en ligne.`)
    const Startembed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Me revoilà.")
        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
    client.channels.cache.get("1003898726206668851").send({ embeds: [Startembed] })
})
client.on("messageCreate", message => {
    if (message.content.startsWith(prefix)) {
        var index = 0;
        while (!message.content.startsWith(commands.at(index))) {
            index++;
            if (index > commands.length - 1) {
                console.log(message.author.username + " a saisi une commande innexistante.")
                const wrongembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Ça existe pas bouffon.\nC'est !help pour voir celle qui existent.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [wrongembed] });
                return;
            }
        }
        if (message.content.startsWith(prefix + "help")) {
            console.log(message.author.username + " a saisi !help.")
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
            console.log(message.author.username + " a saisi !clear.")
            if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                let args = message.content.split(" ");
                if (args[1] == undefined) {
                    console.log(message.author.username + " n'a rien saisi apres !clear.")
                    const unclearembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Tu m'as pas dit combien de messages fallait que je dégages...")
                        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
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

                        //TEST
                        const sum_messages = [];
                        let last_id = false;
                        let last_last_id = true;
                        while (last_id != last_last_id) {
                            const options = { limit: 100 };
                            if (last_id) {
                                options.before = last_id;
                            }
                            messages = message.channel.messages.fetch(options).then(page => {
                                page.filter((m) => nargs.includes(m.author.id))
                            })
                            console.log(messages)
                            sum_messages.push(messages)
                            console.log(sum_messages)
                            last_last_id = last_id
                            last_id = messages.last().id;
                        }

                        console.log(sum_messages);
                        //TEST


                        // var options = {}
                        // var supprimés = 0
                        // var to_trash = new Array()
                        // var into_trash = new Array()
                        // message.channel.messages.fetch(options).then(messages => {
                        //         a_supprimer = messages.filter((m) => nargs.includes(m.author.id))
                        //         a_supprimer.forEach(msg => {
                        //             into_trash.push(msg)
                        //             if (into_trash.length > 99) {
                        //                 to_trash.push(into_trash)
                        //                 into_trash = new Array()
                        //             }
                        //         })
                        //         if (into_trash.length > 0) {
                        //             to_trash.push(into_trash)
                        //         }
                        //         console.log(to_trash)
                        //     }).then(() => {
                        //         to_trash.forEach(element => {
                        //             message.channel.bulkDelete(element, true).then(messages => {
                        //                 supprimés += element.length
                        //             }).catch(err => {
                        //                 console.log("Erreur lors de la suppression des messages : " + err)
                        //             });
                        //         })
                        //     })
                        //     // .then(() => {
                        //     //     console.log(supprimés + " messages de " + args.slice(1) + " ont été effacés.")
                        //     //     return;
                        //     // })


                    } else if (isNaN(number)) {
                        console.log(message.author.username + " n'a pas saisi de nombre ni de personne.")
                        const unclearembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("Réfléchit, c'est un nombre ou un @ qui faut mettre !")
                            .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                        message.channel.send({ embeds: [unclearembed] })
                    } else {
                        if (number > 100) {
                            number = 100
                        }
                        message.channel.bulkDelete(number, true).then(messages => {
                            console.log(messages.size + " messages ont été effacés.")
                        }).catch(err => {
                            console.log("Erreur lors de la suppression des messages : " + err)
                        });
                    }
                }
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !clear.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "whatdoyoudo")) {
            console.log(message.author.username + " a saisi !whatdoyoudo.")
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
            console.log(message.author.username + " a saisi !addtask.")
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
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Permembed] })
            }

        } else if (message.content.startsWith(prefix + "deltask")) {
            console.log(message.author.username + " a saisi !deltask.")
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
                        .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                    message.channel.send({ embeds: [unknowndeltaskembed] })
                }
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !deltask.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "viens")) {
            console.log(message.author.username + " a saisi !viens.")
            if (message.member.voice.channel) {
                const Voiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("T'es chiant sérieux, j'arrive.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
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
            } else {
                console.log(message.author.username + " n'est pas dans un salon vocal.")
                const noVoiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Où veux-tu que je viennes, t'es même pas dans un salon vocal...")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [noVoiceembed] })
            }
        } else if (message.content.startsWith(prefix + "tas")) {
            console.log(message.author.username + " a saisi !tas.")
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
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
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
                .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
            message.channel.send({ embeds: [Tajembed] })
        } else if (message.content.startsWith(prefix + "stop")) {
            if (message.author.id != 391708236698615809) {
                console.log(message.author.username + " n'a pas la persimission de saisir !stop.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Bot hors-ligne.")
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'me casse.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Stopembed] }).then(() => {
                    client.destroy()
                });
                return;
            }
        } else if (message.content.startsWith(prefix + "restart")) {
            if (message.author.id != 391708236698615809) {
                console.log(message.author.username + " n'a pas la persimission de saisir !stop.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Redémarrage du bot.")
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Je redémarre.")
                    .setThumbnail("https://i.imgur.com/ioQ6NQC.png");
                message.channel.send({ embeds: [Stopembed] }).then(m => {
                    client.destroy().then(m => {
                        client.login(process.env.TOKEN);
                    });
                });
                return;
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
                return;
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
            message.reply("feur.")
            console.log(message.author.username + " s'est mangé un feur écrit.")
        }
    }
})