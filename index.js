import DiscordJS, { REST, Client, EmbedBuilder, IntentsBitField, Routes, ActivityType } from 'discord.js'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000

app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}...`); 
});

dotenv.config({ path: path.resolve(__dirname, '.env') })

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID

const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new DiscordJS.Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.on('ready', () => {
    console.log('Now online!')
    client.user?.setPresence({
        activities: [{ name: 'Pokemon Infinite Fusion', type: ActivityType.Playing }],
      });
})

async function main() {
    const commands = [
        {
            name: 'fusion',
            description: 'Gives the information about a fusion',
            options: [
                {
                    name: 'pokemon1',
                    description: 'Head of the fusion',
                    required: 'true',
                    type: 3
                },
                {
                    name: 'pokemon2',
                    description: 'Body of the fusion',
                    required: 'true',
                    type: 3
                }
            ]
        },
        {
            name: 'help',
            description: 'Showcases the list of commands',
        },
        {
            name: 'name',
            description: 'Showcases specific names exceptions (ex: Nidoran-M ...)'
        },
        {
            name: 'random',
            description: 'Showcases a random fusion'
        },
        {
            name: 'sprite',
            description: 'Showcases the sprite of a fusion',
            options: [
                {
                    name: 'pokemon1',
                    description: 'Head of the fusion',
                    required: 'true',
                    type: 3
                },
                {
                    name: 'pokemon2',
                    description: 'Body of the fusion',
                    required: 'true',
                    type: 3
                }
            ]
        },
        {  
            name: 'pokemon',
            description: 'Checks if the pokemon exists in Pokemon IF',
            options: [
                {
                    name: 'pokemon',
                    description: 'Name of the pokemon',
                    required: 'true',
                    type: 3
                }
            ]
        }
    ];
    try {
        console.log('Restarting bot...')
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        });
    } catch (err) {
        console.log(err);
    }
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction

    if (commandName == 'fusion') {
        let mon1 = (String(options.data[0].value)).toLowerCase();
        let mon2 = (String(options.data[1].value)).toLowerCase();

        if (pokemons.has(mon1)) {
            if (pokemons.has(mon2)) {

                if (nameException.includes(mon1)) {
                    mon1 = nameFix[nameException.indexOf(mon1)];
                }
                if (nameException.includes(mon2)) {
                    mon2 = nameFix[nameException.indexOf(mon2)];
                }

                const id1 = getMonID(mon1)
                const id2 = getMonID(mon2)

                //Fetching mons JSON
                let mon1JSON = await getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon1)
                let mon2JSON = await getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon2)

                let fmon1 = ''
                let fmon2 = ''

                //Name of fusions
                if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                } else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                } else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                } else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                }

                //Type selector for fusion type
                var type1 = mon1JSON.types;
                var mon1types = [];
                var compt = 0

                var type2 = mon2JSON.types;
                var mon2types = [];

                //Exception mon selected for swapped types
                for (var i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                        mon1types.push(typeSwap[i][0]);
                        mon1types.push(typeSwap[i][1]);
                        var compt = 1;
                    }
                }

                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                        mon1types.push(typeUni[i][0]);
                        var compt = 2;
                    }
                }

                //Type of 1st mon
                if (compt == 0) {
                    mon1types.push(type1[0].type.name);
                    if (type1.length == 2) {
                        if (type1[0].type.name == 'normal' && type1[1].type.name == 'flying') {
                            mon1types[0] = 'flying';
                        } else {
                            mon1types.push(type1[1].type.name);
                        }
                    }
                }

                //Reset of compt for 2nd mon
                compt = 0

                //Exception mon selected for swapped types
                for (i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                        mon2types.push(typeSwap[i][0]);
                        mon2types.push(typeSwap[i][1]);
                        var compt = 1;
                    }
                }

                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                        mon2types.push(typeUni[i][0]);
                        var compt = 2;
                    }
                }

                //Type of 2nd mon
                if (compt == 0) {
                    mon2types.push(type2[0].type.name);
                    if (type2.length == 2) {
                        if (type2[0].type.name == 'normal' && type2[1].type.name == 'flying') {
                            mon2types[0] = 'flying';
                        } else {
                            mon2types.push(type2[1].type.name);
                        }
                    }
                }

                //Stats of 1st mon
                var mon1stats = [];
                if (mon1 != 'aegislash-shield') {
                    var stats1 = mon1JSON.stats;
                } else {
                    stats1 = aegislashstats.stats;
                }
                for (i = 0; i < stats1.length; i++) {
                    mon1stats.push(stats1[i].base_stat)
                }

                //Stats of 2nd mon
                var mon2stats = [];
                if (mon2 != 'aegislash-shield') {
                    var stats2 = mon2JSON.stats;
                } else {
                    stats2 = aegislashstats.stats;
                }
                for (i = 0; i < stats2.length; i++) {
                    mon2stats.push(stats2[i].base_stat)
                }

                //Ability of 1st mon
                var mon1abilities = [];
                if (mon1 != 'weezing') {
                    var ab1 = mon1JSON.abilities;
                } else {
                    ab1 = weezingabilities.abilities;
                }
                for (i = 0; i < ab1.length; i++) {
                    mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
                }

                //Abilities of 2nd mon
                if (mon2 != 'weezing') {
                    var ab2 = mon2JSON.abilities;
                } else {
                    ab2 = weezingabilities.abilities;
                }
                var mon2abilities = [];
                for (i = 0; i < ab2.length; i++) {
                    mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
                }

                //Stats calculation
                var hp1 = Math.floor((mon2stats[0] / 3) + 2 * (mon1stats[0] / 3));
                var atk1 = Math.floor(2 * (mon2stats[1] / 3) + (mon1stats[1] / 3));
                var def1 = Math.floor(2 * (mon2stats[2] / 3) + (mon1stats[2] / 3));
                var spatk1 = Math.floor((mon2stats[3] / 3) + 2 * (mon1stats[3] / 3));
                var spdef1 = Math.floor((mon2stats[4] / 3) + 2 * (mon1stats[4] / 3));
                var spe1 = Math.floor(2 * (mon2stats[5] / 3) + (mon1stats[5] / 3));
                var bs1 = hp1 + atk1 + def1 + spatk1 + spdef1 + spe1;

                var hp2 = Math.floor((mon1stats[0] / 3) + 2 * (mon2stats[0] / 3));
                var atk2 = Math.floor(2 * (mon1stats[1] / 3) + (mon2stats[1] / 3));
                var def2 = Math.floor(2 * (mon1stats[2] / 3) + (mon2stats[2] / 3));
                var spatk2 = Math.floor((mon1stats[3] / 3) + 2 * (mon2stats[3] / 3));
                var spdef2 = Math.floor((mon1stats[4] / 3) + 2 * (mon2stats[4] / 3));
                var spe2 = Math.floor(2 * (mon1stats[5] / 3) + (mon2stats[5] / 3));
                var bs2 = hp2 + atk2 + def2 + spatk2 + spdef2 + spe2;

                if (mon1 == 'shedinja' || mon2 == 'shedinja') {
                    bs1 = bs1 - hp1 + 1
                    bs2 = bs2 - hp2 + 1
                    hp1 = 1
                    hp2 = 1
                }

                var val1 = [hp1, atk1, def1, spatk1, spdef1, spe1, bs1];
                var val2 = [hp2, atk2, def2, spatk2, spdef2, spe2, bs2];
                var symbole = []

                //Symbols for stats difference
                for (i = 0; i < val1.length; i++) {
                    if (val1[i] > val2[i]) {
                        var val = val1[i] - val2[i]
                        symbole.push(['(+' + val + ')', '(-' + val + ')'])
                    } else if (val1[i] < val2[i]) {
                        val = val2[i] - val1[i]
                        symbole.push(['(-' + val + ')', '(+' + val + ')'])
                    } else {
                        symbole.push(['(±0)', '(±0)'])
                    }
                }

                //Abilities of fused mons
                if (abilitySwap.includes(mon1)) {
                    [mon1abilities[0], mon1abilities[1]] = [mon1abilities[1], mon1abilities[0]];
                }
                if (abilitySwap.includes(mon2)) {
                    [mon2abilities[0], mon2abilities[1]] = [mon2abilities[1], mon2abilities[0]];
                }
                var abres1 = [...new Set(fusAb(mon1abilities, mon2abilities))];
                var abres2 = [...new Set(fusAb(mon2abilities, mon1abilities))];

                var abs1 = ''
                var abs2 = ''

                //Abilities into string
                for (i = 0; i < abres1.length; i++) {
                    abs1 += abres1[i].charAt(0).toUpperCase() + abres1[i].slice(1) + ' / '
                }

                for (i = 0; i < abres2.length; i++) {
                    abs2 += abres2[i].charAt(0).toUpperCase() + abres2[i].slice(1) + ' / '
                }

                abs1 = abs1.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
                abs2 = abs2.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

                //Type of fused mons
                var typres1 = fusType(mon1types, mon2types);
                var typres2 = fusType(mon2types, mon1types);

                var typ1 = ''
                var typ2 = ''

                for (i = 0; i < typres1.length; i++) {
                    typ1 += typres1[i].charAt(0).toUpperCase() + typres1[i].slice(1) + ' / '
                }

                for (i = 0; i < typres2.length; i++) {
                    typ2 += typres2[i].charAt(0).toUpperCase() + typres2[i].slice(1) + ' / '
                }

                typ1 = typ1.slice(0, -3)
                typ2 = typ2.slice(0, -3)

                //First fusion sprite
                let imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1 + '.' + id2 + '.png'

                let response = await fetch(imgURL);
                if ((response.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1 + '/' + id1 + '.' + id2 + '.png'
                }

                //Preparing first embed
                const result1 = new EmbedBuilder()
                    .setTitle(fmon1 + '/' + fmon2)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                        iconURL: interaction.user.displayAvatarURL(),
                        name: interaction.user.tag
                    })
                    .addFields(
                        { name: 'Types:', value: typ1 },
                        {
                            name: 'Stats:', value:
                                'HP: ' + hp1 + ' ' + symbole[0][0] +
                                '\nATK: ' + atk1 + ' ' + symbole[1][0] +
                                '\nDEF: ' + def1 + ' ' + symbole[2][0] +
                                '\nSPE.ATK: ' + spatk1 + ' ' + symbole[3][0] +
                                '\nSPE.DEF: ' + spdef1 + ' ' + symbole[4][0] +
                                '\nSPEED: ' + spe1 + ' ' + symbole[5][0] +
                                '\nTotal: ' + bs1 + ' ' + symbole[6][0]
                        },
                        { name: 'Abilities:', value: abs1 },
                    )

                //Second fusion sprite
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2 + '.' + id1 + '.png'

                let response2 = await fetch(imgURL);
                if ((response2.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2 + '/' + id2 + '.' + id1 + '.png'
                }

                //Preparing second embed
                const result2 = new EmbedBuilder()
                    .setTitle(fmon2 + '/' + fmon1)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                        iconURL: interaction.user.displayAvatarURL(),
                        name: interaction.user.tag
                    })
                    .addFields(
                        { name: 'Types:', value: typ2 },
                        {
                            name: 'Stats:', value:
                                'HP: ' + hp2 + ' ' + symbole[0][1] +
                                '\nATK: ' + atk2 + ' ' + symbole[1][1] +
                                '\nDEF: ' + def2 + ' ' + symbole[2][1] +
                                '\nSPE.ATK: ' + spatk2 + ' ' + symbole[3][1] +
                                '\nSPE.DEF: ' + spdef2 + ' ' + symbole[4][1] +
                                '\nSPEED: ' + spe2 + ' ' + symbole[5][1] +
                                '\nTotal: ' + bs2 + ' ' + symbole[6][1]
                        },
                        { name: 'Abilities:', value: abs2 },
                    )
                interaction.reply({
                    embeds: [result1, result2]
                })
            } else {
                interaction.reply({
                    content: "The second pokemon isn't in the fangame or was misspelt",
                })
            }
        } else {
            interaction.reply({
                content: "The first pokemon isn't in the fangame or was misspelt",
            })
        }

    } else if (commandName == 'help') {
        const help = new EmbedBuilder()
            .setTitle('List of useful commands:')
            .setColor("#bdab39")
            .addFields(
                { name: '/fusion [pokemon1] [pokemon2]', value: 'Showcases both fusions of the requested pokemons' },
                { name: '/name', value: 'Showcases specific names exceptions (ex: Nidoran-M ...)' },
                { name: '/pokemon [pokemon]', value: 'Checks if the pokemon exists in Pokemon IF' },
                { name: '/random', value: 'Showcases a random fusion' },
                { name: '/sprite [pokemon1] [pokemon2]', value: 'Showcases the sprite of a fusion' }
            )
        interaction.reply({
            embeds: [help]
        })
    } else if (commandName == 'name') {
        const help = new EmbedBuilder()
            .setTitle('Name exceptions')
            .setColor("#bdab39")
            .addFields(
                { name: 'Here are how specific pokemon names should be written:', value: 'Mime.jr\nMr.mime\nNidoran-m\nNidoran-f\nPorygon2\nPorygon-z\nHo-oh' },
            )
        interaction.reply({
            embeds: [help]
        })
    } else if (commandName == 'pokemon') {
        let mon = (String(options.data[0].value)).toLowerCase();

        if (pokemons.has(mon)) {
            mon = mon.charAt(0).toUpperCase() + mon.slice(1)
            interaction.reply({
                content: mon + " is included in Pokemon IF"
            })

        } else {
            mon = mon.charAt(0).toUpperCase() + mon.slice(1)
            interaction.reply({
                content: mon + " is not included in Pokemon IF or was misspelt"
            })
        }

    } else if (commandName == "random") {

        let items = Array.from(pokemons);

        var mon1 = items[Math.floor(Math.random()*items.length)];
        var mon2 = items[Math.floor(Math.random()*items.length)];

        if (nameException.includes(mon1)) {
            mon1 = nameFix[nameException.indexOf(mon1)];
        }
        if (nameException.includes(mon2)) {
            mon2 = nameFix[nameException.indexOf(mon2)];
        }

        const id1 = getMonID(mon1)
        const id2 = getMonID(mon2)

        //Fetching mons JSON
        let mon1JSON = await getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon1)
        let mon2JSON = await getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon2)

        let fmon1 = ''
        let fmon2 = ''

        //Name of fusions
        if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
            fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
            fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
        } else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
            fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
            fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
        } else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
            fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
            fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
        } else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
            fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
            fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
        }

        //Type selector for fusion type
        var type1 = mon1JSON.types;
        var mon1types = [];
        var compt = 0

        var type2 = mon2JSON.types;
        var mon2types = [];

        //Exception mon selected for swapped types
        for (var i = 0; i < typeSwap.length; i++) {
            if (typeSwap[i][2] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                mon1types.push(typeSwap[i][0]);
                mon1types.push(typeSwap[i][1]);
                var compt = 1;
            }
        }

        //Exception mon selected for one type
        for (i = 0; i < typeUni.length; i++) {
            if (typeUni[i][1] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                mon1types.push(typeUni[i][0]);
                var compt = 2;
            }
        }

        //Type of 1st mon
        if (compt == 0) {
            mon1types.push(type1[0].type.name);
            if (type1.length == 2) {
                if (type1[0].type.name == 'normal' && type1[1].type.name == 'flying') {
                    mon1types[0] = 'flying';
                } else {
                    mon1types.push(type1[1].type.name);
                }
            }
        }

        //Reset of compt for 2nd mon
        compt = 0

        //Exception mon selected for swapped types
        for (i = 0; i < typeSwap.length; i++) {
            if (typeSwap[i][2] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                mon2types.push(typeSwap[i][0]);
                mon2types.push(typeSwap[i][1]);
                var compt = 1;
            }
        }

        //Exception mon selected for one type
        for (i = 0; i < typeUni.length; i++) {
            if (typeUni[i][1] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                mon2types.push(typeUni[i][0]);
                var compt = 2;
            }
        }

        //Type of 2nd mon
        if (compt == 0) {
            mon2types.push(type2[0].type.name);
            if (type2.length == 2) {
                if (type2[0].type.name == 'normal' && type2[1].type.name == 'flying') {
                    mon2types[0] = 'flying';
                } else {
                    mon2types.push(type2[1].type.name);
                }
            }
        }

        //Stats of 1st mon
        var mon1stats = [];
        if (mon1 != 'aegislash-shield') {
            var stats1 = mon1JSON.stats;
        } else {
            stats1 = aegislashstats.stats;
        }
        for (i = 0; i < stats1.length; i++) {
            mon1stats.push(stats1[i].base_stat)
        }

        //Stats of 2nd mon
        var mon2stats = [];
        if (mon2 != 'aegislash-shield') {
            var stats2 = mon2JSON.stats;
        } else {
            stats2 = aegislashstats.stats;
        }
        for (i = 0; i < stats2.length; i++) {
            mon2stats.push(stats2[i].base_stat)
        }

        //Ability of 1st mon
        var mon1abilities = [];
        if (mon1 != 'weezing') {
            var ab1 = mon1JSON.abilities;
        } else {
            ab1 = weezingabilities.abilities;
        }
        for (i = 0; i < ab1.length; i++) {
            mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
        }

        //Abilities of 2nd mon
        if (mon2 != 'weezing') {
            var ab2 = mon2JSON.abilities;
        } else {
            ab2 = weezingabilities.abilities;
        }
        var mon2abilities = [];
        for (i = 0; i < ab2.length; i++) {
            mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
        }

        //Stats calculation
        var hp1 = Math.floor((mon2stats[0] / 3) + 2 * (mon1stats[0] / 3));
        var atk1 = Math.floor(2 * (mon2stats[1] / 3) + (mon1stats[1] / 3));
        var def1 = Math.floor(2 * (mon2stats[2] / 3) + (mon1stats[2] / 3));
        var spatk1 = Math.floor((mon2stats[3] / 3) + 2 * (mon1stats[3] / 3));
        var spdef1 = Math.floor((mon2stats[4] / 3) + 2 * (mon1stats[4] / 3));
        var spe1 = Math.floor(2 * (mon2stats[5] / 3) + (mon1stats[5] / 3));
        var bs1 = hp1 + atk1 + def1 + spatk1 + spdef1 + spe1;

        var hp2 = Math.floor((mon1stats[0] / 3) + 2 * (mon2stats[0] / 3));
        var atk2 = Math.floor(2 * (mon1stats[1] / 3) + (mon2stats[1] / 3));
        var def2 = Math.floor(2 * (mon1stats[2] / 3) + (mon2stats[2] / 3));
        var spatk2 = Math.floor((mon1stats[3] / 3) + 2 * (mon2stats[3] / 3));
        var spdef2 = Math.floor((mon1stats[4] / 3) + 2 * (mon2stats[4] / 3));
        var spe2 = Math.floor(2 * (mon1stats[5] / 3) + (mon2stats[5] / 3));
        var bs2 = hp2 + atk2 + def2 + spatk2 + spdef2 + spe2;

        if (mon1 == 'shedinja' || mon2 == 'shedinja') {
            bs1 = bs1 - hp1 + 1
            bs2 = bs2 - hp2 + 1
            hp1 = 1
            hp2 = 1
        }

        var val1 = [hp1, atk1, def1, spatk1, spdef1, spe1, bs1];
        var val2 = [hp2, atk2, def2, spatk2, spdef2, spe2, bs2];
        var symbole = []

        //Symbols for stats difference
        for (i = 0; i < val1.length; i++) {
            if (val1[i] > val2[i]) {
                var val = val1[i] - val2[i]
                symbole.push(['(+' + val + ')', '(-' + val + ')'])
            } else if (val1[i] < val2[i]) {
                val = val2[i] - val1[i]
                symbole.push(['(-' + val + ')', '(+' + val + ')'])
            } else {
                symbole.push(['(±0)', '(±0)'])
            }
        }

        //Abilities of fused mons
        if (abilitySwap.includes(mon1)) {
            [mon1abilities[0], mon1abilities[1]] = [mon1abilities[1], mon1abilities[0]];
        }
        if (abilitySwap.includes(mon2)) {
            [mon2abilities[0], mon2abilities[1]] = [mon2abilities[1], mon2abilities[0]];
        }
        var abres1 = [...new Set(fusAb(mon1abilities, mon2abilities))];
        var abres2 = [...new Set(fusAb(mon2abilities, mon1abilities))];

        var abs1 = ''
        var abs2 = ''

        //Abilities into string
        for (i = 0; i < abres1.length; i++) {
            abs1 += abres1[i].charAt(0).toUpperCase() + abres1[i].slice(1) + ' / '
        }

        for (i = 0; i < abres2.length; i++) {
            abs2 += abres2[i].charAt(0).toUpperCase() + abres2[i].slice(1) + ' / '
        }

        abs1 = abs1.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
        abs2 = abs2.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

        //Type of fused mons
        var typres1 = fusType(mon1types, mon2types);
        var typres2 = fusType(mon2types, mon1types);

        var typ1 = ''
        var typ2 = ''

        for (i = 0; i < typres1.length; i++) {
            typ1 += typres1[i].charAt(0).toUpperCase() + typres1[i].slice(1) + ' / '
        }

        for (i = 0; i < typres2.length; i++) {
            typ2 += typres2[i].charAt(0).toUpperCase() + typres2[i].slice(1) + ' / '
        }

        typ1 = typ1.slice(0, -3)
        typ2 = typ2.slice(0, -3)

        //First fusion sprite
        let imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1 + '.' + id2 + '.png'

        let response = await fetch(imgURL);
        if ((response.status) >= 400) {
            imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1 + '/' + id1 + '.' + id2 + '.png'
        }

        //Preparing first embed
        const result1 = new EmbedBuilder()
            .setTitle(fmon1 + '/' + fmon2)
            .setImage(imgURL)
            .setColor("#bd3941")
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .addFields(
                { name: 'Types:', value: typ1 },
                {
                    name: 'Stats:', value:
                        'HP: ' + hp1 + ' ' + symbole[0][0] +
                        '\nATK: ' + atk1 + ' ' + symbole[1][0] +
                        '\nDEF: ' + def1 + ' ' + symbole[2][0] +
                        '\nSPE.ATK: ' + spatk1 + ' ' + symbole[3][0] +
                        '\nSPE.DEF: ' + spdef1 + ' ' + symbole[4][0] +
                        '\nSPEED: ' + spe1 + ' ' + symbole[5][0] +
                        '\nTotal: ' + bs1 + ' ' + symbole[6][0]
                },
                { name: 'Abilities:', value: abs1 },
            )

        //Second fusion sprite
        imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2 + '.' + id1 + '.png'

        let response2 = await fetch(imgURL);
        if ((response2.status) >= 400) {
            imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2 + '/' + id2 + '.' + id1 + '.png'
        }

        //Preparing second embed
        const result2 = new EmbedBuilder()
            .setTitle(fmon2 + '/' + fmon1)
            .setImage(imgURL)
            .setColor("#bd3941")
            .setAuthor({
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .addFields(
                { name: 'Types:', value: typ2 },
                {
                    name: 'Stats:', value:
                        'HP: ' + hp2 + ' ' + symbole[0][1] +
                        '\nATK: ' + atk2 + ' ' + symbole[1][1] +
                        '\nDEF: ' + def2 + ' ' + symbole[2][1] +
                        '\nSPE.ATK: ' + spatk2 + ' ' + symbole[3][1] +
                        '\nSPE.DEF: ' + spdef2 + ' ' + symbole[4][1] +
                        '\nSPEED: ' + spe2 + ' ' + symbole[5][1] +
                        '\nTotal: ' + bs2 + ' ' + symbole[6][1]
                },
                { name: 'Abilities:', value: abs2 },
            )
        interaction.reply({
            embeds: [result1, result2]
        })
    } else if (commandName == 'sprite') {
        let mon1 = (String(options.data[0].value)).toLowerCase();
        let mon2 = (String(options.data[1].value)).toLowerCase();
        if (pokemons.has(mon1)) {
            if (pokemons.has(mon2)) {

                var id1 = getMonID(mon1)
                var id2 = getMonID(mon2)

                //Name of fusions
                let fmon1 = ''
                let fmon2 = ''

                if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                } else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                } else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                } else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                }

                let imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1 + '.' + id2 + '.png'

                let response = await fetch(imgURL);
                if ((response.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1 + '/' + id1 + '.' + id2 + '.png'
                }

                const sprite1 = new EmbedBuilder()
                .setTitle('Sprite of ' + fmon1 + '/' + fmon2)
                .setImage(imgURL)
                .setColor("#bd3941")

                //Second fusion sprite
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2 + '.' + id1 + '.png'

                let response2 = await fetch(imgURL);
                if ((response2.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2 + '/' + id2 + '.' + id1 + '.png'
                }

                //Preparing second embed
                const sprite2 = new EmbedBuilder()
                .setTitle('Sprite of ' + fmon2 + '/' + fmon1)
                .setImage(imgURL)
                .setColor("#bd3941")
                interaction.reply({
                    embeds: [sprite1, sprite2]
                })
            }
        }
    }
})

client.login(TOKEN);

main();

/** ==================== FUNCTIONS ========================*/

//Get the JSON file of a pokemon
async function getMonJSON(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

//Get the ID of a pokemon from its name in the 'ids' table
function getMonID(pokemon) {
    for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0]).toLowerCase() == pokemon) {
            return ids[i][1];
        }
    }
    return;
}

//Ability fusion function
function fusAb(mon1, mon2) {
    var fabs = [];
    var H0 = mon1[0][0].name;
    if (mon1.length == 3 && mon1[2][1] == true) {
        var H1 = mon1[1][0].name;
        var HH = mon1[2][0].name;
    } else if (mon1.length == 2 && mon1[1][1] == true) {
        var HH = mon1[1][0].name;
    } else if (mon1.length == 2 && mon1[1][1] == false) {
        var H1 = mon1[1][0].name;
    }
    var B0 = mon2[0][0].name;
    if (mon2.length == 3 && mon2[2][1] == true) {
        var B1 = mon2[1][0].name;
        var BH = mon2[2][0].name;
    } else if (mon2.length == 2 && mon2[1][1] == true) {
        var BH = mon2[1][0].name;
    } else if (mon1.length == 2 && mon1[1][1] == false) {
        var B1 = mon2[1][0].name;
    }
    //cas H0/null/null + B0/null/null [H0=B0] -> H0/null/null
    if (mon1.length == 1 && mon2.length == 1 && mon1[0][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
            //cas H0/null/null + B0/null/null [H0#B0] -> H0/B0/null
        } else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/null/null [H0=B0] -> H0/H1/null
    } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/null [H0#B0] -> H0/B0/H1
        } else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
        }
        //cas H0/null/HH + B0/null/null [H0=B0 | HH=B0] -> H0/null/HH
    } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(HH);
            //cas H0/null/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        } else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/null/null [H0=B0 | B0=HH] -> H0/H1/HH
    } else if (mon1.length == 3 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || B0 == HH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(HH);
            //cas H0/H1/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        } else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/B1/null [H0=B1] -> H0/B0/null
    } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            //cas H0/null/null + B0/B1/null [H0=B0] -> H0/B1/null
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(B1);
            //cas H0/null/null + B0/B1/null [H0#B0 & H0#B1] -> H0/B1/B0
        } else if (H0 != B0 && H0 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/B1/null [H0=B1] -> H0/B0/H1
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
            //cas H0/H1/null + B0/B1/null [H0=B0] -> H0/B1/H1
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
            //cas H0/H1/null + B0/B1/null [H1#B0 & H1#B1] -> H0/B1/H1
        } else if (H1 != B0 && H1 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
        //cas H0/null/HH + B0/B01/null [H0=B1 | HH=B1] -> H0/B0/HH
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        } else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
        //cas H0/H1/HH + B0/B1/null [H0=B1 | HH=B1] -> H0/B0/HH
    } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        } else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/null/BH [H0=BH] -> H0/null/B0
    } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
            //cas H0/null/null + B0/null/BH [H0=B0] -> H0/null/BH
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
            //cas H0/null/null + B0/null/BH [H0#B0 & H0#BH] -> H0/B0/BH
        } else if (H0 != B0 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
        }
        //cas H0/H1/null + B0/null/BH [H0=BH] -> H0/B0/H1
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/BH [H0=B0] -> H0/BH/H1
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/BH [H0#BH & H1#BH] -> H0/H1/BH
        } else if (H0 != BH && H1 != BH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(BH);
        }
        //cas H0/null/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        } else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        } else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    } else if (mon1.length == 1 && mon2.length == 3 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
            //cas H0/null/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        } else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
            //cas H0/null/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        } else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 == B1 || H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
            //cas H0/H1/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        } else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
            //cas H0/H1/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        } else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/null/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        } else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        } else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    } else if (mon1.length == 3 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        } else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        } else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
    }
    return fabs
}

//Type fusion function
function fusType(mon1, mon2) {
    let fmon = []

    //cas H0/null + B0/null [H0#B0] -> H0/B0
    if (mon1.length == 1 && mon2.length == 1) {
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0])

            //cas H0/null + B0/null [H0=B0] -> H0/null
        } else {
            fmon.push(mon1[0]);
        }
    } else if (mon1.length == 2 && mon2.length == 1) {

        //cas H0/H1 + B0/null [H0#B0] -> H0/B0
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);

            // Exception:
            // The body will provide its primary type
            // instead of the secondary
            // if the head is already providing that element.

            //cas H0/H1 + B0/null [H0=B0] -> H0
        } else {
            fmon.push(mon1[0]);
        }
    } else if (mon1.length == 1 && mon2.length == 2) {

        //cas H0/null + B0/B1 [H0#B1] -> H0/B1
        if (mon1[0] != mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);

            //cas H0/null + B0/B1 [H0=B1] -> H0/B0
        } else {
            fmon.push(mon1[0])
            fmon.push(mon2[0]);
        }

        //cas H0/H1 + B0/B1 [H0=B1] -> H0/B0
    } else if (mon1.length == 2 && mon2.length == 2) {
        if (mon1[0] == mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);

            //cas H0/H1 + B0/B1 [H0#B1] -> H0/B1
        } else {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);
        }
    }
    return fmon
}