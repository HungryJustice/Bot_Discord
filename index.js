const Discord = require("discord.js");
const { joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildVoiceStates, Discord.IntentsBitField.Flags.GuildPresences] });

client.login(process.env.TOKEN);
//https://www.youtube.com/watch?v=YozBsSdtVpw&t=6s
const quoi = new Array(items = "kwa", "quoi", "qwa", "qua", "kua", "kwa", "koi", "qoi", "coi", "coa", "qoa", "quoa", "cwa")
const commands = new Array(items = "!restart", "!stop", "!taj", "!deltask", "!addtask", "!help", "!whatdoyoudo", "!clear", "!viens")
const audio = new Array(items = "risitas", "sardoche", "siphano", "branleur", "gensreseaux", "livre", "mbappe", "pizza", "puceau", "television", "tournepage", "issouchange")
const text = new Array(items = "Actuellement ? Je chies.", "Je vais me coucher, ferme ta gueule maintenant.", "Je suis en train de lire tes conneries", "Je veux devenir utouber", "Arrêtes de me faire chier !", "Je me filmes en mengeant des pizzas.", "Toute ma vie j'ai cherché un boulot pour gagner 500 000 balles par an sans faire grand chose.")
const prefix = "!";
client.once("ready", () => {
    console.log(`Bot en ligne.`)
    const Startembed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Me revoilà.")
        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
    client.channels.cache.get("1003898726206668851").send({ embeds: [Startembed] })
})

client.on("messageCreate", message => {
    var nMessage = ""
    for (const i of message.content) {
        console.log(i, typeof(i))
        if ('abcdefghijklmnopqrstuvwxyz0123456789'.includes(i)) {
            nMessage += i;
        }
    }
    var index = 0;
    while (!nMessage.endsWith(quoi.at(index))) {
        index++;
        if (index > quoi.length - 1) {
            return;
        }
    }
    console.log(message.author.username + " s'est mangé un feur.")
    message.reply("feur.")
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
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [wrongembed] });
                return;
            }
        }
        if (message.content.startsWith(prefix + "help")) {
            console.log(message.author.username + " a saisi !help.")
            const embed = new Discord.EmbedBuilder();
            embed.setTitle("**__Liste des commandes__**")
            embed.addFields({ name: "!help", value: "Affiche la liste des commandes" })
            embed.addFields({ name: '!clear "nombre"', value: "Nettoyer x messages de moins de 14 jours." })
            embed.addFields({ name: "!whatdoyoudo", value: "Demande ce que fait le bot actuellement." })
            embed.addFields({ name: '!taj "choix1" "choix2" "choix3" ... ', value: "Effectue un tirage au sort." })
            embed.addFields({ name: '!addtask "tâche"', value: 'Ajoute "tâche" à la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!deltask "tâche"', value: 'Retire "tâche" de la liste de !whatdoyoudo.' })
            embed.addFields({ name: '!viens', value: 'Rejoins le vocal et diffuse une surprise.' })
            embed.setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [unclearembed] });
                } else {
                    let number = parseInt(args[1]);
                    if (isNaN(number)) {
                        console.log(message.author.username + " n'a pas saisi de nombre.")
                        const unclearembed = new Discord.EmbedBuilder()
                            .setColor("#0099ff")
                            .setTitle("Réfléchit, c'est un nombre qui faut mettre !")
                            .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [addtaskembed] })
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !addtask.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [deltaskembed] })
                } else {
                    console.log(message.author.username + " n'a pas pu retirer la phrase : " + add + " (innexistante)")
                    const unknowndeltaskembed = new Discord.EmbedBuilder()
                        .setColor("#0099ff")
                        .setTitle("Cette tâche existe pas bouffon.")
                        .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                    message.channel.send({ embeds: [unknowndeltaskembed] })
                }
            } else {
                console.log(message.author.username + " n'a pas la persimission de saisir !deltask.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
            }
        } else if (message.content.startsWith(prefix + "viens")) {
            console.log(message.author.username + " a saisi !viens.")
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
            } else {
                console.log(message.author.username + " n'est pas dans un salon vocal.")
                const noVoiceembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Où veux-tu que je viennes, t'es même pas dans un salon vocal...")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [noVoiceembed] })
            }
        } else if (message.content.startsWith(prefix + "taj")) {
            console.log(message.author.username + " a saisi !taj.")
            var args = message.content.slice(start = 4).split(" ")
            var choix = new Array()
            for (const key in args) {
                if (key != "" && key != " ") {
                    choix.push(key)
                }
            }
            if (choix.length == 0) {
                console.log(message.author.username + " n'a saisi aucun choix.")
                const Tajembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Comment veux-tu faire un tirage au sort sans choix ?\nJ'te jure...")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Tajembed] })
                return;
            }
            var index = Math.floor(Math.random() * args.length)
            if (index < 0) {
                index = args.length - 1
            }
            var choose = args[index]
            console.log(choose + " est le choix tiré au sort.")
            const Tajembed = new Discord.EmbedBuilder()
                .setColor("#0099ff")
                .setTitle(choose + " à été tiré au sort.")
                .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
            message.channel.send({ embeds: [Tajembed] })
        } else if (message.content.startsWith(prefix + "stop")) {
            if (message.author.id != 391708236698615809) {
                console.log(message.author.username + " n'a pas la persimission de saisir !stop.")
                const Permembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("J'ai pas dutout envie de faire ça, puis t'façon t'as pas le droit.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Bot hors-ligne.")
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("C'est bon j'me casse.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
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
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Permembed] })
                return;
            } else {
                console.log("Redémarrage du bot.")
                const Stopembed = new Discord.EmbedBuilder()
                    .setColor("#0099ff")
                    .setTitle("Je redémarre.")
                    .setThumbnail("https://lh3.googleusercontent.com/uqKLQ3FKz5Aw-1Qqnwavw_RsyTg8SgrT8SgzJ9NU_qdiLAo_zBv_b743bYmR8ErA3K4QhXV4myl20p3PgV8F=w1920-h913");
                message.channel.send({ embeds: [Stopembed] }).then(m => {
                    client.destroy().then(m => {
                        client.login(process.env.TOKEN);
                    });
                });
                return;
            }
        }
    }
})