import DiscordJS, { REST, EmbedBuilder, IntentsBitField, Routes, ActivityType } from 'discord.js'
import dotenv from 'dotenv'
import { pokemons, abilitySwap, pkmnEvo1, pkmnEvo2, pkmnEvo3, nameException, nameFix, typeSwap, typeUni, abilitiesException, abilitiesFix, chandelureAbilities, clefableAbilities, clefairyAbilities, cleffaAbilities, darkraiAbilities, enteiAbilities, feebasAbilities, ferrothornAbilities, flygonAbilities, genesectAbilities, gengarAbilities, hydreigonAbilities, igglybuffAbilities, jigglypuffAbilities, koffingAbilities, kyuremAbilities, lampentAbilities, litwickAbilities, mewtwoAbilities, miloticAbilities, raikouAbilities, regigigasAbilities, reshiramAbilities, suicuneAbilities, talonflameAbilities, unownAbilities, weezingAbilities, wigglytuffAbilities, zapdosAbilities, zekromAbilities } from './vars.js'
import { fusAb, fusType, getMonID, getMonJSON, randPokeTeam } from './func.js'

dotenv.config({ path: process.env.TOKEN })

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
            name: 'randomteam',
            description: 'Showcases a random team of fusions',
            options: [
                {
                    name: 'evoline',
                    description: "Number of the evolution's stage (Between 1 to 3)",
                    required: 'false',
                    choices: [{
                        name: '1',
                        value: 'one',
                    },
                    {
                        name: '2',
                        value: 'two',
                    },
                    {
                        name: '3',
                        value: 'three',
                    }
                    ],
                    type: 3
            }]
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
                if (abilitiesException.includes(mon1)) {
                    var ab1 = abilitiesFix[abilitiesException.indexOf(mon1)];
                } else {
                    ab1 = mon1JSON.abilities;
                }
                for (i = 0; i < ab1.length; i++) {
                    mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
                }

                //Abilities of 2nd mon
                var mon2abilities = [];
                if (abilitiesException.includes(mon2)) {
                    var ab2 = abilitiesFix[abilitiesException.indexOf(mon2)];
                } else {
                    ab2 = mon2JSON.abilities;
                }
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
                        { name: 'HP: ', value: hp1 + ' ' + symbole[0][0], inline: true},
                        { name: 'ATK: ', value: atk1 + ' ' + symbole[1][0], inline: true},
                        { name: 'DEF: ', value: def1 + ' ' + symbole[2][0], inline: true},
                        { name: 'SPATK: ', value: spatk1 + ' ' + symbole[3][0], inline: true},
                        { name: 'SPDEF: ', value: spdef1 + ' ' + symbole[4][0], inline: true},
                        { name: 'SPEED: ', value: spe1 + ' ' + symbole[5][0], inline: true},
                        { name: 'BTS: ', value:bs1 + ' ' + symbole[6][0]},
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
                        { name: 'HP: ', value: hp2 + ' ' + symbole[0][1], inline: true},
                        { name: 'ATK: ', value: atk2 + ' ' + symbole[1][1], inline: true},
                        { name: 'DEF: ', value: def2 + ' ' + symbole[2][1], inline: true},
                        { name: 'SPATK: ', value: spatk2 + ' ' + symbole[3][1], inline: true},
                        { name: 'SPDEF: ', value: spdef2 + ' ' + symbole[4][1], inline: true},
                        { name: 'SPEED: ', value: spe2 + ' ' + symbole[5][1], inline: true},
                        { name: 'BTS: ', value:bs2 + ' ' + symbole[6][1]},
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
                { name: '/randomteam', value: 'Showcases a team of random fusions' },
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
                { name: 'HP: ', value: hp1 + ' ' + symbole[0][0], inline: true},
                { name: 'ATK: ', value: atk1 + ' ' + symbole[1][0], inline: true},
                { name: 'DEF: ', value: def1 + ' ' + symbole[2][0], inline: true},
                { name: 'SPATK: ', value: spatk1 + ' ' + symbole[3][0], inline: true},
                { name: 'SPDEF: ', value: spdef1 + ' ' + symbole[4][0], inline: true},
                { name: 'SPEED: ', value: spe1 + ' ' + symbole[5][0], inline: true},
                { name: 'BTS: ', value:bs1 + ' ' + symbole[6][0]},
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
                { name: 'HP: ', value: hp2 + ' ' + symbole[0][1], inline: true},
                { name: 'ATK: ', value: atk2 + ' ' + symbole[1][1], inline: true},
                { name: 'DEF: ', value: def2 + ' ' + symbole[2][1], inline: true},
                { name: 'SPATK: ', value: spatk2 + ' ' + symbole[3][1], inline: true},
                { name: 'SPDEF: ', value: spdef2 + ' ' + symbole[4][1], inline: true},
                { name: 'SPEED: ', value: spe2 + ' ' + symbole[5][1], inline: true},
                { name: 'BTS: ', value:bs2 + ' ' + symbole[6][1]},
                { name: 'Abilities:', value: abs2 },
            )
        interaction.reply({
            embeds: [result1, result2]
        })
    } else if (commandName == "randomteam") {
        let fusions = []
        let items = Array.from(pokemons);

        let copyItems = [...items]
        let copyPkmnEvo1 = [...pkmnEvo1]
        let copyPkmnEvo2 = [...pkmnEvo2]
        let copyPkmnEvo3 = [...pkmnEvo3]

        let listMons = [copyItems, copyPkmnEvo1, copyPkmnEvo2, copyPkmnEvo3]
        var dictNum = {
            "one" : 1,
            "two" : 2,
            "three" : 3
        }

        if (options.data == undefined) {
            for (i = 0; i < 6; i++) {            
                    let res = randPokeTeam(listMons[0])
                    listMons[0] = listMons[0].filter(item => item !== res[0]).filter(item => item !== res[1])
                    fusions.push(res[0] + "/" + res[1])
            } 
        } else {
            var num = dictNum[options.data[0].value]
            for (i = 0; i < 6; i++) {
                let res = randPokeTeam(listMons[num])
                listMons[num] = listMons[num].filter(item => item !== res[0]).filter(item => item !== res[1])
                fusions.push(res[0] + "/" + res[1])
            }
        }

        const team = new EmbedBuilder()
            .setTitle('Your random team:')
            .setColor("#bdab39")
            .addFields(
                {name:"1:", value: fusions[0], inline: true },
                {name:"2:", value: fusions[1], inline: true },
                {name:"3:", value: fusions[2], inline: true },
                {name:"4:", value: fusions[3], inline: true },
                {name:"5:", value: fusions[4], inline: true },
                {name:"6:", value: fusions[5], inline: true },
            )
        interaction.reply({
            embeds: [team]
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