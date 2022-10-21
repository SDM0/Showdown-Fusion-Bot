"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1["default"].config({ path: path_1["default"].resolve(__dirname, '.env') });
var TOKEN = process.env.TOKEN;
var CLIENT_ID = process.env.CLIENT_ID;
var rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
var client = new discord_js_1["default"].Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent
    ]
});
client.on('ready', function () {
    var _a;
    console.log('Now online!');
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
        activities: [{ name: 'Pokemon Infinite Fusion', type: discord_js_1.ActivityType.Playing }]
    });
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var commands, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commands = [
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
                            description: 'Showcases the list of commands'
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log('Restarting bot...');
                    return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), {
                            body: commands
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, options, mon1_1, mon2_1, id1_1, id2_1, mon1JSON, mon2JSON, fmon1, fmon2, type1, mon1types, compt, type2, mon2types, i, compt, compt, compt, compt, mon1stats, stats1, mon2stats, stats2, mon1abilities, ab1, ab2, mon2abilities, hp1, atk1, def1, spatk1, spdef1, spe1, bs1, hp2, atk2, def2, spatk2, spdef2, spe2, bs2, val1, val2, symbole, val, abres1, abres2, abs1, abs2, typres1, typres2, typ1, typ2, imgURL, response, result1, response2, result2, help, help, mon, items, mon1, mon2, id1_2, id2_2, mon1JSON, mon2JSON, fmon1, fmon2, type1, mon1types, compt, type2, mon2types, i, compt, compt, compt, compt, mon1stats, stats1, mon2stats, stats2, mon1abilities, ab1, ab2, mon2abilities, hp1, atk1, def1, spatk1, spdef1, spe1, bs1, hp2, atk2, def2, spatk2, spdef2, spe2, bs2, val1, val2, symbole, val, abres1, abres2, abs1, abs2, typres1, typres2, typ1, typ2, imgURL, response, result1, response2, result2, mon1_2, mon2_2, id1, id2, fmon1, fmon2, imgURL, response, sprite1, response2, sprite2;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!interaction.isCommand())
                    return [2 /*return*/];
                commandName = interaction.commandName, options = interaction.options;
                if (!(commandName == 'fusion')) return [3 /*break*/, 9];
                mon1_1 = (String(options.data[0].value)).toLowerCase();
                mon2_1 = (String(options.data[1].value)).toLowerCase();
                if (!pokemons.has(mon1_1)) return [3 /*break*/, 7];
                if (!pokemons.has(mon2_1)) return [3 /*break*/, 5];
                if (nameException.includes(mon1_1)) {
                    mon1_1 = nameFix[nameException.indexOf(mon1_1)];
                }
                if (nameException.includes(mon2_1)) {
                    mon2_1 = nameFix[nameException.indexOf(mon2_1)];
                }
                id1_1 = getMonID(mon1_1);
                id2_1 = getMonID(mon2_1);
                return [4 /*yield*/, getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon1_1)];
            case 1:
                mon1JSON = _e.sent();
                return [4 /*yield*/, getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon2_1)];
            case 2:
                mon2JSON = _e.sent();
                fmon1 = '';
                fmon2 = '';
                //Name of fusions
                if (!nameFix.includes(mon1_1) && !nameFix.includes(mon2_1)) {
                    fmon1 = mon1_1.charAt(0).toUpperCase() + mon1_1.slice(1);
                    fmon2 = mon2_1.charAt(0).toUpperCase() + mon2_1.slice(1);
                }
                else if (nameFix.includes(mon1_1) && !nameFix.includes(mon2_1)) {
                    fmon1 = nameException[nameFix.indexOf(mon1_1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1_1)].slice(1);
                    fmon2 = mon2_1.charAt(0).toUpperCase() + mon2_1.slice(1);
                }
                else if (!nameFix.includes(mon1_1) && nameFix.includes(mon2_1)) {
                    fmon1 = mon1_1.charAt(0).toUpperCase() + mon1_1.slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2_1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2_1)].slice(1);
                }
                else if (nameFix.includes(mon1_1) && nameFix.includes(mon2_1)) {
                    fmon1 = nameException[nameFix.indexOf(mon1_1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1_1)].slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2_1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2_1)].slice(1);
                }
                type1 = mon1JSON.types;
                mon1types = [];
                compt = 0;
                type2 = mon2JSON.types;
                mon2types = [];
                //Exception mon selected for swapped types
                for (i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon1_1.charAt(0).toUpperCase() + mon1_1.slice(1)) {
                        mon1types.push(typeSwap[i][0]);
                        mon1types.push(typeSwap[i][1]);
                        compt = 1;
                    }
                }
                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon1_1.charAt(0).toUpperCase() + mon1_1.slice(1)) {
                        mon1types.push(typeUni[i][0]);
                        compt = 2;
                    }
                }
                //Type of 1st mon
                if (compt == 0) {
                    mon1types.push(type1[0].type.name);
                    if (type1.length == 2) {
                        if (type1[0].type.name == 'normal' && type1[1].type.name == 'flying') {
                            mon1types[0] = 'flying';
                        }
                        else {
                            mon1types.push(type1[1].type.name);
                        }
                    }
                }
                //Reset of compt for 2nd mon
                compt = 0;
                //Exception mon selected for swapped types
                for (i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon2_1.charAt(0).toUpperCase() + mon2_1.slice(1)) {
                        mon2types.push(typeSwap[i][0]);
                        mon2types.push(typeSwap[i][1]);
                        compt = 1;
                    }
                }
                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon2_1.charAt(0).toUpperCase() + mon2_1.slice(1)) {
                        mon2types.push(typeUni[i][0]);
                        compt = 2;
                    }
                }
                //Type of 2nd mon
                if (compt == 0) {
                    mon2types.push(type2[0].type.name);
                    if (type2.length == 2) {
                        if (type2[0].type.name == 'normal' && type2[1].type.name == 'flying') {
                            mon2types[0] = 'flying';
                        }
                        else {
                            mon2types.push(type2[1].type.name);
                        }
                    }
                }
                mon1stats = [];
                if (mon1_1 != 'aegislash-shield') {
                    stats1 = mon1JSON.stats;
                }
                else {
                    stats1 = aegislashstats.stats;
                }
                for (i = 0; i < stats1.length; i++) {
                    mon1stats.push(stats1[i].base_stat);
                }
                mon2stats = [];
                if (mon2_1 != 'aegislash-shield') {
                    stats2 = mon2JSON.stats;
                }
                else {
                    stats2 = aegislashstats.stats;
                }
                for (i = 0; i < stats2.length; i++) {
                    mon2stats.push(stats2[i].base_stat);
                }
                mon1abilities = [];
                if (mon1_1 != 'weezing') {
                    ab1 = mon1JSON.abilities;
                }
                else {
                    ab1 = weezingabilities.abilities;
                }
                for (i = 0; i < ab1.length; i++) {
                    mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
                }
                //Abilities of 2nd mon
                if (mon2_1 != 'weezing') {
                    ab2 = mon2JSON.abilities;
                }
                else {
                    ab2 = weezingabilities.abilities;
                }
                mon2abilities = [];
                for (i = 0; i < ab2.length; i++) {
                    mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
                }
                hp1 = Math.floor((mon2stats[0] / 3) + 2 * (mon1stats[0] / 3));
                atk1 = Math.floor(2 * (mon2stats[1] / 3) + (mon1stats[1] / 3));
                def1 = Math.floor(2 * (mon2stats[2] / 3) + (mon1stats[2] / 3));
                spatk1 = Math.floor((mon2stats[3] / 3) + 2 * (mon1stats[3] / 3));
                spdef1 = Math.floor((mon2stats[4] / 3) + 2 * (mon1stats[4] / 3));
                spe1 = Math.floor(2 * (mon2stats[5] / 3) + (mon1stats[5] / 3));
                bs1 = hp1 + atk1 + def1 + spatk1 + spdef1 + spe1;
                hp2 = Math.floor((mon1stats[0] / 3) + 2 * (mon2stats[0] / 3));
                atk2 = Math.floor(2 * (mon1stats[1] / 3) + (mon2stats[1] / 3));
                def2 = Math.floor(2 * (mon1stats[2] / 3) + (mon2stats[2] / 3));
                spatk2 = Math.floor((mon1stats[3] / 3) + 2 * (mon2stats[3] / 3));
                spdef2 = Math.floor((mon1stats[4] / 3) + 2 * (mon2stats[4] / 3));
                spe2 = Math.floor(2 * (mon1stats[5] / 3) + (mon2stats[5] / 3));
                bs2 = hp2 + atk2 + def2 + spatk2 + spdef2 + spe2;
                if (mon1_1 == 'shedinja' || mon2_1 == 'shedinja') {
                    bs1 = bs1 - hp1 + 1;
                    bs2 = bs2 - hp2 + 1;
                    hp1 = 1;
                    hp2 = 1;
                }
                val1 = [hp1, atk1, def1, spatk1, spdef1, spe1, bs1];
                val2 = [hp2, atk2, def2, spatk2, spdef2, spe2, bs2];
                symbole = [];
                //Symbols for stats difference
                for (i = 0; i < val1.length; i++) {
                    if (val1[i] > val2[i]) {
                        val = val1[i] - val2[i];
                        symbole.push(['(+' + val + ')', '(-' + val + ')']);
                    }
                    else if (val1[i] < val2[i]) {
                        val = val2[i] - val1[i];
                        symbole.push(['(-' + val + ')', '(+' + val + ')']);
                    }
                    else {
                        symbole.push(['(±0)', '(±0)']);
                    }
                }
                //Abilities of fused mons
                if (abilitySwap.includes(mon1_1)) {
                    _a = [mon1abilities[1], mon1abilities[0]], mon1abilities[0] = _a[0], mon1abilities[1] = _a[1];
                }
                if (abilitySwap.includes(mon2_1)) {
                    _b = [mon2abilities[1], mon2abilities[0]], mon2abilities[0] = _b[0], mon2abilities[1] = _b[1];
                }
                abres1 = __spreadArray([], new Set(fusAb(mon1abilities, mon2abilities)), true);
                abres2 = __spreadArray([], new Set(fusAb(mon2abilities, mon1abilities)), true);
                abs1 = '';
                abs2 = '';
                //Abilities into string
                for (i = 0; i < abres1.length; i++) {
                    abs1 += abres1[i].charAt(0).toUpperCase() + abres1[i].slice(1) + ' / ';
                }
                for (i = 0; i < abres2.length; i++) {
                    abs2 += abres2[i].charAt(0).toUpperCase() + abres2[i].slice(1) + ' / ';
                }
                abs1 = abs1.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, function (m) { return m.toUpperCase(); });
                abs2 = abs2.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, function (m) { return m.toUpperCase(); });
                typres1 = fusType(mon1types, mon2types);
                typres2 = fusType(mon2types, mon1types);
                typ1 = '';
                typ2 = '';
                for (i = 0; i < typres1.length; i++) {
                    typ1 += typres1[i].charAt(0).toUpperCase() + typres1[i].slice(1) + ' / ';
                }
                for (i = 0; i < typres2.length; i++) {
                    typ2 += typres2[i].charAt(0).toUpperCase() + typres2[i].slice(1) + ' / ';
                }
                typ1 = typ1.slice(0, -3);
                typ2 = typ2.slice(0, -3);
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1_1 + '.' + id2_1 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 3:
                response = _e.sent();
                if ((response.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1_1 + '/' + id1_1 + '.' + id2_1 + '.png';
                }
                result1 = new discord_js_1.EmbedBuilder()
                    .setTitle(fmon1 + '/' + fmon2)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.tag
                })
                    .addFields({ name: 'Types:', value: typ1 }, {
                    name: 'Stats:', value: 'HP: ' + hp1 + ' ' + symbole[0][0] +
                        '\nATK: ' + atk1 + ' ' + symbole[1][0] +
                        '\nDEF: ' + def1 + ' ' + symbole[2][0] +
                        '\nSPE.ATK: ' + spatk1 + ' ' + symbole[3][0] +
                        '\nSPE.DEF: ' + spdef1 + ' ' + symbole[4][0] +
                        '\nSPEED: ' + spe1 + ' ' + symbole[5][0] +
                        '\nTotal: ' + bs1 + ' ' + symbole[6][0]
                }, { name: 'Abilities:', value: abs1 });
                //Second fusion sprite
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2_1 + '.' + id1_1 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 4:
                response2 = _e.sent();
                if ((response2.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2_1 + '/' + id2_1 + '.' + id1_1 + '.png';
                }
                result2 = new discord_js_1.EmbedBuilder()
                    .setTitle(fmon2 + '/' + fmon1)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.tag
                })
                    .addFields({ name: 'Types:', value: typ2 }, {
                    name: 'Stats:', value: 'HP: ' + hp2 + ' ' + symbole[0][1] +
                        '\nATK: ' + atk2 + ' ' + symbole[1][1] +
                        '\nDEF: ' + def2 + ' ' + symbole[2][1] +
                        '\nSPE.ATK: ' + spatk2 + ' ' + symbole[3][1] +
                        '\nSPE.DEF: ' + spdef2 + ' ' + symbole[4][1] +
                        '\nSPEED: ' + spe2 + ' ' + symbole[5][1] +
                        '\nTotal: ' + bs2 + ' ' + symbole[6][1]
                }, { name: 'Abilities:', value: abs2 });
                interaction.reply({
                    embeds: [result1, result2]
                });
                return [3 /*break*/, 6];
            case 5:
                interaction.reply({
                    content: "The second pokemon isn't in the fangame or was misspelt"
                });
                _e.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                interaction.reply({
                    content: "The first pokemon isn't in the fangame or was misspelt"
                });
                _e.label = 8;
            case 8: return [3 /*break*/, 20];
            case 9:
                if (!(commandName == 'help')) return [3 /*break*/, 10];
                help = new discord_js_1.EmbedBuilder()
                    .setTitle('List of useful commands:')
                    .setColor("#bdab39")
                    .addFields({ name: '/fusion [pokemon1] [pokemon2]', value: 'Showcases both fusions of the requested pokemons' }, { name: '/name', value: 'Showcases specific names exceptions (ex: Nidoran-M ...)' }, { name: '/pokemon [pokemon]', value: 'Checks if the pokemon exists in Pokemon IF' }, { name: '/random', value: 'Showcases a random fusion' }, { name: '/sprite [pokemon1] [pokemon2]', value: 'Showcases the sprite of a fusion' });
                interaction.reply({
                    embeds: [help]
                });
                return [3 /*break*/, 20];
            case 10:
                if (!(commandName == 'name')) return [3 /*break*/, 11];
                help = new discord_js_1.EmbedBuilder()
                    .setTitle('Name exceptions')
                    .setColor("#bdab39")
                    .addFields({ name: 'Here are how specific pokemon names should be written:', value: 'Mime.jr\nMr.mime\nNidoran-m\nNidoran-f\nPorygon2\nPorygon-z\nHo-oh' });
                interaction.reply({
                    embeds: [help]
                });
                return [3 /*break*/, 20];
            case 11:
                if (!(commandName == 'pokemon')) return [3 /*break*/, 12];
                mon = (String(options.data[0].value)).toLowerCase();
                if (pokemons.has(mon)) {
                    mon = mon.charAt(0).toUpperCase() + mon.slice(1);
                    interaction.reply({
                        content: mon + " is included in Pokemon IF"
                    });
                }
                else {
                    mon = mon.charAt(0).toUpperCase() + mon.slice(1);
                    interaction.reply({
                        content: mon + " is not included in Pokemon IF or was misspelt"
                    });
                }
                return [3 /*break*/, 20];
            case 12:
                if (!(commandName == "random")) return [3 /*break*/, 17];
                items = Array.from(pokemons);
                mon1 = items[Math.floor(Math.random() * items.length)];
                mon2 = items[Math.floor(Math.random() * items.length)];
                if (nameException.includes(mon1)) {
                    mon1 = nameFix[nameException.indexOf(mon1)];
                }
                if (nameException.includes(mon2)) {
                    mon2 = nameFix[nameException.indexOf(mon2)];
                }
                id1_2 = getMonID(mon1);
                id2_2 = getMonID(mon2);
                return [4 /*yield*/, getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon1)];
            case 13:
                mon1JSON = _e.sent();
                return [4 /*yield*/, getMonJSON('https://pokeapi.co/api/v2/pokemon/' + mon2)];
            case 14:
                mon2JSON = _e.sent();
                fmon1 = '';
                fmon2 = '';
                //Name of fusions
                if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                }
                else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
                }
                else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                }
                else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
                }
                type1 = mon1JSON.types;
                mon1types = [];
                compt = 0;
                type2 = mon2JSON.types;
                mon2types = [];
                //Exception mon selected for swapped types
                for (i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                        mon1types.push(typeSwap[i][0]);
                        mon1types.push(typeSwap[i][1]);
                        compt = 1;
                    }
                }
                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
                        mon1types.push(typeUni[i][0]);
                        compt = 2;
                    }
                }
                //Type of 1st mon
                if (compt == 0) {
                    mon1types.push(type1[0].type.name);
                    if (type1.length == 2) {
                        if (type1[0].type.name == 'normal' && type1[1].type.name == 'flying') {
                            mon1types[0] = 'flying';
                        }
                        else {
                            mon1types.push(type1[1].type.name);
                        }
                    }
                }
                //Reset of compt for 2nd mon
                compt = 0;
                //Exception mon selected for swapped types
                for (i = 0; i < typeSwap.length; i++) {
                    if (typeSwap[i][2] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                        mon2types.push(typeSwap[i][0]);
                        mon2types.push(typeSwap[i][1]);
                        compt = 1;
                    }
                }
                //Exception mon selected for one type
                for (i = 0; i < typeUni.length; i++) {
                    if (typeUni[i][1] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
                        mon2types.push(typeUni[i][0]);
                        compt = 2;
                    }
                }
                //Type of 2nd mon
                if (compt == 0) {
                    mon2types.push(type2[0].type.name);
                    if (type2.length == 2) {
                        if (type2[0].type.name == 'normal' && type2[1].type.name == 'flying') {
                            mon2types[0] = 'flying';
                        }
                        else {
                            mon2types.push(type2[1].type.name);
                        }
                    }
                }
                mon1stats = [];
                if (mon1 != 'aegislash-shield') {
                    stats1 = mon1JSON.stats;
                }
                else {
                    stats1 = aegislashstats.stats;
                }
                for (i = 0; i < stats1.length; i++) {
                    mon1stats.push(stats1[i].base_stat);
                }
                mon2stats = [];
                if (mon2 != 'aegislash-shield') {
                    stats2 = mon2JSON.stats;
                }
                else {
                    stats2 = aegislashstats.stats;
                }
                for (i = 0; i < stats2.length; i++) {
                    mon2stats.push(stats2[i].base_stat);
                }
                mon1abilities = [];
                if (mon1 != 'weezing') {
                    ab1 = mon1JSON.abilities;
                }
                else {
                    ab1 = weezingabilities.abilities;
                }
                for (i = 0; i < ab1.length; i++) {
                    mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
                }
                //Abilities of 2nd mon
                if (mon2 != 'weezing') {
                    ab2 = mon2JSON.abilities;
                }
                else {
                    ab2 = weezingabilities.abilities;
                }
                mon2abilities = [];
                for (i = 0; i < ab2.length; i++) {
                    mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
                }
                hp1 = Math.floor((mon2stats[0] / 3) + 2 * (mon1stats[0] / 3));
                atk1 = Math.floor(2 * (mon2stats[1] / 3) + (mon1stats[1] / 3));
                def1 = Math.floor(2 * (mon2stats[2] / 3) + (mon1stats[2] / 3));
                spatk1 = Math.floor((mon2stats[3] / 3) + 2 * (mon1stats[3] / 3));
                spdef1 = Math.floor((mon2stats[4] / 3) + 2 * (mon1stats[4] / 3));
                spe1 = Math.floor(2 * (mon2stats[5] / 3) + (mon1stats[5] / 3));
                bs1 = hp1 + atk1 + def1 + spatk1 + spdef1 + spe1;
                hp2 = Math.floor((mon1stats[0] / 3) + 2 * (mon2stats[0] / 3));
                atk2 = Math.floor(2 * (mon1stats[1] / 3) + (mon2stats[1] / 3));
                def2 = Math.floor(2 * (mon1stats[2] / 3) + (mon2stats[2] / 3));
                spatk2 = Math.floor((mon1stats[3] / 3) + 2 * (mon2stats[3] / 3));
                spdef2 = Math.floor((mon1stats[4] / 3) + 2 * (mon2stats[4] / 3));
                spe2 = Math.floor(2 * (mon1stats[5] / 3) + (mon2stats[5] / 3));
                bs2 = hp2 + atk2 + def2 + spatk2 + spdef2 + spe2;
                if (mon1 == 'shedinja' || mon2 == 'shedinja') {
                    bs1 = bs1 - hp1 + 1;
                    bs2 = bs2 - hp2 + 1;
                    hp1 = 1;
                    hp2 = 1;
                }
                val1 = [hp1, atk1, def1, spatk1, spdef1, spe1, bs1];
                val2 = [hp2, atk2, def2, spatk2, spdef2, spe2, bs2];
                symbole = [];
                //Symbols for stats difference
                for (i = 0; i < val1.length; i++) {
                    if (val1[i] > val2[i]) {
                        val = val1[i] - val2[i];
                        symbole.push(['(+' + val + ')', '(-' + val + ')']);
                    }
                    else if (val1[i] < val2[i]) {
                        val = val2[i] - val1[i];
                        symbole.push(['(-' + val + ')', '(+' + val + ')']);
                    }
                    else {
                        symbole.push(['(±0)', '(±0)']);
                    }
                }
                //Abilities of fused mons
                if (abilitySwap.includes(mon1)) {
                    _c = [mon1abilities[1], mon1abilities[0]], mon1abilities[0] = _c[0], mon1abilities[1] = _c[1];
                }
                if (abilitySwap.includes(mon2)) {
                    _d = [mon2abilities[1], mon2abilities[0]], mon2abilities[0] = _d[0], mon2abilities[1] = _d[1];
                }
                abres1 = __spreadArray([], new Set(fusAb(mon1abilities, mon2abilities)), true);
                abres2 = __spreadArray([], new Set(fusAb(mon2abilities, mon1abilities)), true);
                abs1 = '';
                abs2 = '';
                //Abilities into string
                for (i = 0; i < abres1.length; i++) {
                    abs1 += abres1[i].charAt(0).toUpperCase() + abres1[i].slice(1) + ' / ';
                }
                for (i = 0; i < abres2.length; i++) {
                    abs2 += abres2[i].charAt(0).toUpperCase() + abres2[i].slice(1) + ' / ';
                }
                abs1 = abs1.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, function (m) { return m.toUpperCase(); });
                abs2 = abs2.slice(0, -3).replace(/-/g, ' ').replace(/(^\w|\s\w)/g, function (m) { return m.toUpperCase(); });
                typres1 = fusType(mon1types, mon2types);
                typres2 = fusType(mon2types, mon1types);
                typ1 = '';
                typ2 = '';
                for (i = 0; i < typres1.length; i++) {
                    typ1 += typres1[i].charAt(0).toUpperCase() + typres1[i].slice(1) + ' / ';
                }
                for (i = 0; i < typres2.length; i++) {
                    typ2 += typres2[i].charAt(0).toUpperCase() + typres2[i].slice(1) + ' / ';
                }
                typ1 = typ1.slice(0, -3);
                typ2 = typ2.slice(0, -3);
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1_2 + '.' + id2_2 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 15:
                response = _e.sent();
                if ((response.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1_2 + '/' + id1_2 + '.' + id2_2 + '.png';
                }
                result1 = new discord_js_1.EmbedBuilder()
                    .setTitle(fmon1 + '/' + fmon2)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.tag
                })
                    .addFields({ name: 'Types:', value: typ1 }, {
                    name: 'Stats:', value: 'HP: ' + hp1 + ' ' + symbole[0][0] +
                        '\nATK: ' + atk1 + ' ' + symbole[1][0] +
                        '\nDEF: ' + def1 + ' ' + symbole[2][0] +
                        '\nSPE.ATK: ' + spatk1 + ' ' + symbole[3][0] +
                        '\nSPE.DEF: ' + spdef1 + ' ' + symbole[4][0] +
                        '\nSPEED: ' + spe1 + ' ' + symbole[5][0] +
                        '\nTotal: ' + bs1 + ' ' + symbole[6][0]
                }, { name: 'Abilities:', value: abs1 });
                //Second fusion sprite
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2_2 + '.' + id1_2 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 16:
                response2 = _e.sent();
                if ((response2.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2_2 + '/' + id2_2 + '.' + id1_2 + '.png';
                }
                result2 = new discord_js_1.EmbedBuilder()
                    .setTitle(fmon2 + '/' + fmon1)
                    .setImage(imgURL)
                    .setColor("#bd3941")
                    .setAuthor({
                    iconURL: interaction.user.displayAvatarURL(),
                    name: interaction.user.tag
                })
                    .addFields({ name: 'Types:', value: typ2 }, {
                    name: 'Stats:', value: 'HP: ' + hp2 + ' ' + symbole[0][1] +
                        '\nATK: ' + atk2 + ' ' + symbole[1][1] +
                        '\nDEF: ' + def2 + ' ' + symbole[2][1] +
                        '\nSPE.ATK: ' + spatk2 + ' ' + symbole[3][1] +
                        '\nSPE.DEF: ' + spdef2 + ' ' + symbole[4][1] +
                        '\nSPEED: ' + spe2 + ' ' + symbole[5][1] +
                        '\nTotal: ' + bs2 + ' ' + symbole[6][1]
                }, { name: 'Abilities:', value: abs2 });
                interaction.reply({
                    embeds: [result1, result2]
                });
                return [3 /*break*/, 20];
            case 17:
                if (!(commandName == 'sprite')) return [3 /*break*/, 20];
                mon1_2 = (String(options.data[0].value)).toLowerCase();
                mon2_2 = (String(options.data[1].value)).toLowerCase();
                if (!pokemons.has(mon1_2)) return [3 /*break*/, 20];
                if (!pokemons.has(mon2_2)) return [3 /*break*/, 20];
                id1 = getMonID(mon1_2);
                id2 = getMonID(mon2_2);
                fmon1 = '';
                fmon2 = '';
                if (!nameFix.includes(mon1_2) && !nameFix.includes(mon2_2)) {
                    fmon1 = mon1_2.charAt(0).toUpperCase() + mon1_2.slice(1);
                    fmon2 = mon2_2.charAt(0).toUpperCase() + mon2_2.slice(1);
                }
                else if (nameFix.includes(mon1_2) && !nameFix.includes(mon2_2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1_2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1_2)].slice(1);
                    fmon2 = mon2_2.charAt(0).toUpperCase() + mon2_2.slice(1);
                }
                else if (!nameFix.includes(mon1_2) && nameFix.includes(mon2_2)) {
                    fmon1 = mon1_2.charAt(0).toUpperCase() + mon1_2.slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2_2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2_2)].slice(1);
                }
                else if (nameFix.includes(mon1_2) && nameFix.includes(mon2_2)) {
                    fmon1 = nameException[nameFix.indexOf(mon1_2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1_2)].slice(1);
                    fmon2 = nameException[nameFix.indexOf(mon2_2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2_2)].slice(1);
                }
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id1 + '.' + id2 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 18:
                response = _e.sent();
                if ((response.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id1 + '/' + id1 + '.' + id2 + '.png';
                }
                sprite1 = new discord_js_1.EmbedBuilder()
                    .setTitle('Sprite of ' + fmon1 + '/' + fmon2)
                    .setImage(imgURL)
                    .setColor("#bd3941");
                //Second fusion sprite
                imgURL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + id2 + '.' + id1 + '.png';
                return [4 /*yield*/, fetch(imgURL)];
            case 19:
                response2 = _e.sent();
                if ((response2.status) >= 400) {
                    imgURL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + id2 + '/' + id2 + '.' + id1 + '.png';
                }
                sprite2 = new discord_js_1.EmbedBuilder()
                    .setTitle('Sprite of ' + fmon2 + '/' + fmon1)
                    .setImage(imgURL)
                    .setColor("#bd3941");
                interaction.reply({
                    embeds: [sprite1, sprite2]
                });
                _e.label = 20;
            case 20: return [2 /*return*/];
        }
    });
}); });
client.login(TOKEN);
main();
/** ==================== FUNCTIONS ========================*/
//Get the JSON file of a pokemon
function getMonJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
//Get the ID of a pokemon from its name in the 'ids' table
function getMonID(pokemon) {
    for (var i = 0; i < ids.length; i++) {
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
    }
    else if (mon1.length == 2 && mon1[1][1] == true) {
        var HH = mon1[1][0].name;
    }
    else if (mon1.length == 2 && mon1[1][1] == false) {
        var H1 = mon1[1][0].name;
    }
    var B0 = mon2[0][0].name;
    if (mon2.length == 3 && mon2[2][1] == true) {
        var B1 = mon2[1][0].name;
        var BH = mon2[2][0].name;
    }
    else if (mon2.length == 2 && mon2[1][1] == true) {
        var BH = mon2[1][0].name;
    }
    else if (mon1.length == 2 && mon1[1][1] == false) {
        var B1 = mon2[1][0].name;
    }
    //cas H0/null/null + B0/null/null [H0=B0] -> H0/null/null
    if (mon1.length == 1 && mon2.length == 1 && mon1[0][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
            //cas H0/null/null + B0/null/null [H0#B0] -> H0/B0/null
        }
        else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/null/null [H0=B0] -> H0/H1/null
    }
    else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/null [H0#B0] -> H0/B0/H1
        }
        else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
        }
        //cas H0/null/HH + B0/null/null [H0=B0 | HH=B0] -> H0/null/HH
    }
    else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(HH);
            //cas H0/null/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        }
        else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/null/null [H0=B0 | B0=HH] -> H0/H1/HH
    }
    else if (mon1.length == 3 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || B0 == HH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(HH);
            //cas H0/H1/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        }
        else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/B1/null [H0=B1] -> H0/B0/null
    }
    else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            //cas H0/null/null + B0/B1/null [H0=B0] -> H0/B1/null
        }
        else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(B1);
            //cas H0/null/null + B0/B1/null [H0#B0 & H0#B1] -> H0/B1/B0
        }
        else if (H0 != B0 && H0 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/B1/null [H0=B1] -> H0/B0/H1
    }
    else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
            //cas H0/H1/null + B0/B1/null [H0=B0] -> H0/B1/H1
        }
        else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
            //cas H0/H1/null + B0/B1/null [H1#B0 & H1#B1] -> H0/B1/H1
        }
        else if (H1 != B0 && H1 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
        //cas H0/null/HH + B0/B01/null [H0=B1 | HH=B1] -> H0/B0/HH
    }
    else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        }
        else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
        //cas H0/H1/HH + B0/B1/null [H0=B1 | HH=B1] -> H0/B0/HH
    }
    else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        }
        else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/null/BH [H0=BH] -> H0/null/B0
    }
    else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
            //cas H0/null/null + B0/null/BH [H0=B0] -> H0/null/BH
        }
        else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
            //cas H0/null/null + B0/null/BH [H0#B0 & H0#BH] -> H0/B0/BH
        }
        else if (H0 != B0 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
        }
        //cas H0/H1/null + B0/null/BH [H0=BH] -> H0/B0/H1
    }
    else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/BH [H0=B0] -> H0/BH/H1
        }
        else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(H1);
            //cas H0/H1/null + B0/null/BH [H0#BH & H1#BH] -> H0/H1/BH
        }
        else if (H0 != BH && H1 != BH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(BH);
        }
        //cas H0/null/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    }
    else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        }
        else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    }
    else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        }
        else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
        //cas H0/null/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    }
    else if (mon1.length == 1 && mon2.length == 3 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
            //cas H0/null/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        }
        else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
            //cas H0/null/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        }
        else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/H1/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    }
    else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 == B1 || H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
            //cas H0/H1/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        }
        else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
            //cas H0/H1/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        }
        else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
        //cas H0/null/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    }
    else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        }
        else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/null/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        }
        else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
        //cas H0/H1/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    }
    else if (mon1.length == 3 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        }
        else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
            //cas H0/H1/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        }
        else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
    }
    return fabs;
}
//Type fusion function
function fusType(mon1, mon2) {
    var fmon = [];
    //cas H0/null + B0/null [H0#B0] -> H0/B0
    if (mon1.length == 1 && mon2.length == 1) {
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);
            //cas H0/null + B0/null [H0=B0] -> H0/null
        }
        else {
            fmon.push(mon1[0]);
        }
    }
    else if (mon1.length == 2 && mon2.length == 1) {
        //cas H0/H1 + B0/null [H0#B0] -> H0/B0
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);
            // Exception:
            // The body will provide its primary type
            // instead of the secondary
            // if the head is already providing that element.
            //cas H0/H1 + B0/null [H0=B0] -> H0
        }
        else {
            fmon.push(mon1[0]);
        }
    }
    else if (mon1.length == 1 && mon2.length == 2) {
        //cas H0/null + B0/B1 [H0#B1] -> H0/B1
        if (mon1[0] != mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);
            //cas H0/null + B0/B1 [H0=B1] -> H0/B0
        }
        else {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);
        }
        //cas H0/H1 + B0/B1 [H0=B1] -> H0/B0
    }
    else if (mon1.length == 2 && mon2.length == 2) {
        if (mon1[0] == mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);
            //cas H0/H1 + B0/B1 [H0#B1] -> H0/B1
        }
        else {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);
        }
    }
    return fmon;
}
/** ==================== DATA ========================*/
var pokemons = new Set([
    'bulbasaur',
    'ivysaur',
    'venusaur',
    'charmander',
    'charmeleon',
    'charizard',
    'squirtle',
    'wartortle',
    'blastoise',
    'caterpie',
    'metapod',
    'butterfree',
    'weedle',
    'kakuna',
    'beedrill',
    'pidgey',
    'pidgeotto',
    'pidgeot',
    'rattata',
    'raticate',
    'spearow',
    'fearow',
    'ekans',
    'arbok',
    'pikachu',
    'raichu',
    'sandshrew',
    'sandslash',
    'nidoran-f',
    'nidorina',
    'nidoqueen',
    'nidoran-m',
    'nidorino',
    'nidoking',
    'clefairy',
    'clefable',
    'vulpix',
    'ninetales',
    'jigglypuff',
    'wigglytuff',
    'zubat',
    'golbat',
    'oddish',
    'gloom',
    'vileplume',
    'paras',
    'parasect',
    'venonat',
    'venomoth',
    'diglett',
    'dugtrio',
    'meowth',
    'persian',
    'psyduck',
    'golduck',
    'mankey',
    'primeape',
    'growlithe',
    'arcanine',
    'poliwag',
    'poliwhirl',
    'poliwrath',
    'abra',
    'kadabra',
    'alakazam',
    'machop',
    'machoke',
    'machamp',
    'bellsprout',
    'weepinbell',
    'victreebel',
    'tentacool',
    'tentacruel',
    'geodude',
    'graveler',
    'golem',
    'ponyta',
    'rapidash',
    'slowpoke',
    'slowbro',
    'magnemite',
    'magneton',
    'farfetchd',
    'doduo',
    'dodrio',
    'seel',
    'dewgong',
    'grimer',
    'muk',
    'shellder',
    'cloyster',
    'gastly',
    'haunter',
    'gengar',
    'onix',
    'drowzee',
    'hypno',
    'krabby',
    'kingler',
    'voltorb',
    'electrode',
    'exeggcute',
    'exeggutor',
    'cubone',
    'marowak',
    'hitmonlee',
    'hitmonchan',
    'lickitung',
    'koffing',
    'weezing',
    'rhyhorn',
    'rhydon',
    'chansey',
    'tangela',
    'kangaskhan',
    'horsea',
    'seadra',
    'goldeen',
    'seaking',
    'staryu',
    'starmie',
    'mr.mime',
    'scyther',
    'jynx',
    'electabuzz',
    'magmar',
    'pinsir',
    'tauros',
    'magikarp',
    'gyarados',
    'lapras',
    'ditto',
    'eevee',
    'vaporeon',
    'jolteon',
    'flareon',
    'porygon',
    'omanyte',
    'omastar',
    'kabuto',
    'kabutops',
    'aerodactyl',
    'snorlax',
    'articuno',
    'zapdos',
    'moltres',
    'dratini',
    'dragonair',
    'dragonite',
    'mewtwo',
    'mew',
    'chikorita',
    'bayleef',
    'meganium',
    'cyndaquil',
    'quilava',
    'typhlosion',
    'totodile',
    'croconaw',
    'feraligatr',
    'sentret',
    'furret',
    'hoothoot',
    'noctowl',
    'ledyba',
    'ledian',
    'spinarak',
    'ariados',
    'crobat',
    'chinchou',
    'lanturn',
    'pichu',
    'cleffa',
    'igglybuff',
    'togepi',
    'togetic',
    'natu',
    'xatu',
    'mareep',
    'flaaffy',
    'ampharos',
    'bellossom',
    'marill',
    'azumarill',
    'sudowoodo',
    'politoed',
    'hoppip',
    'skiploom',
    'jumpluff',
    'aipom',
    'sunkern',
    'sunflora',
    'yanma',
    'wooper',
    'quagsire',
    'espeon',
    'umbreon',
    'murkrow',
    'slowking',
    'misdreavus',
    'unown',
    'wobbuffet',
    'girafarig',
    'pineco',
    'forretress',
    'dunsparce',
    'gligar',
    'steelix',
    'snubbull',
    'granbull',
    'qwilfish',
    'scizor',
    'shuckle',
    'heracross',
    'sneasel',
    'teddiursa',
    'ursaring',
    'slugma',
    'magcargo',
    'swinub',
    'piloswine',
    'corsola',
    'remoraid',
    'octillery',
    'delibird',
    'mantine',
    'skarmory',
    'houndour',
    'houndoom',
    'kingdra',
    'phanpy',
    'donphan',
    'porygon2',
    'stantler',
    'smeargle',
    'tyrogue',
    'hitmontop',
    'smoochum',
    'elekid',
    'magby',
    'miltank',
    'blissey',
    'raikou',
    'entei',
    'suicune',
    'larvitar',
    'pupitar',
    'tyranitar',
    'lugia',
    'ho-oh',
    'celebi',
    'azurill',
    'wynaut',
    'ambipom',
    'mismagius',
    'honchkrow',
    'bonsly',
    'mime-jr',
    'happiny',
    'munchlax',
    'mantyke',
    'weavile',
    'magnezone',
    'lickilicky',
    'rhyperior',
    'tangrowth',
    'electivire',
    'magmortar',
    'togekiss',
    'yanmega',
    'leafeon',
    'glaceon',
    'gliscor',
    'mamoswine',
    'porygon-z',
    'treecko',
    'grovyle',
    'sceptile',
    'torchic',
    'combusken',
    'blaziken',
    'mudkip',
    'marshtomp',
    'swampert',
    'ralts',
    'kirlia',
    'gardevoir',
    'gallade',
    'shedinja',
    'kecleon',
    'beldum',
    'metang',
    'metagross',
    'bidoof',
    'spiritomb',
    'lucario',
    'gible',
    'gabite',
    'garchomp',
    'mawile',
    'lileep',
    'cradily',
    'anorith',
    'armaldo',
    'cranidos',
    'rampardos',
    'shieldon',
    'bastiodon',
    'slaking',
    'absol',
    'duskull',
    'dusclops',
    'dusknoir',
    'wailord',
    'arceus',
    'turtwig',
    'grotle',
    'torterra',
    'chimchar',
    'monferno',
    'infernape',
    'piplup',
    'prinplup',
    'empoleon',
    'nosepass',
    'probopass',
    'honedge',
    'doublade',
    'aegislash',
    'pawniard',
    'bisharp',
    'luxray',
    'aggron',
    'flygon',
    'milotic',
    'salamence',
    'klinklang',
    'zoroark',
    'sylveon',
    'kyogre',
    'groudon',
    'rayquaza',
    'dialga',
    'palkia',
    'giratina',
    'regigigas',
    'darkrai',
    'genesect',
    'reshiram',
    'zekrom',
    'kyurem',
    'roserade',
    'drifblim',
    'lopunny',
    'breloom',
    'ninjask',
    'banette',
    'rotom',
    'reuniclus',
    'whimsicott',
    'krookodile',
    'cofagrigus',
    'galvantula',
    'ferrothorn',
    'litwick',
    'lampent',
    'chandelure',
    'haxorus',
    'golurk',
    'pyukumuku',
    'klefki',
    'talonflame',
    'mimikyu',
    'volcarona',
    'deino',
    'zweilous',
    'hydreigon',
    'latias',
    'latios',
    'deoxys',
    'jirachi',
    'nincada',
    'bibarel',
    'riolu',
    'slakoth',
    'vigoroth',
    'wailmer',
    'shinx',
    'luxio',
    'aron',
    'lairon',
    'trapinch',
    'vibrava',
    'feebas',
    'bagon',
    'shelgon',
    'klink',
    'klang',
    'zorua',
    'budew',
    'roselia',
    'drifloon',
    'buneary',
    'shroomish',
    'shuppet',
    'solosis',
    'duosion',
    'cottonee',
    'sandile',
    'krokorok',
    'yamask',
    'joltik',
    'ferroseed',
    'axew',
    'fraxure',
    'golett',
    'fletchling',
    'fletchinder',
    'larvesta',
    'stunfisk',
]);
var ids = [['Bulbasaur', 1, 1],
    ['Ivysaur', 2, 2],
    ['Venusaur', 3, 3],
    ['Charmander', 4, 1],
    ['Charmeleon', 5, 2],
    ['Charizard', 6, 3],
    ['Squirtle', 7, 1],
    ['Wartortle', 8, 2],
    ['Blastoise', 9, 3],
    ['Caterpie', 10, 1],
    ['Metapod', 11, 2],
    ['Butterfree', 12, 3],
    ['Weedle', 13, 1],
    ['Kakuna', 14, 2],
    ['Beedrill', 15, 3],
    ['Pidgey', 16, 1],
    ['Pidgeotto', 17, 2],
    ['Pidgeot', 18, 3],
    ['Rattata', 19, 1],
    ['Raticate', 20, 3],
    ['Spearow', 21, 1],
    ['Fearow', 22, 3],
    ['Ekans', 23, 1],
    ['Arbok', 24, 3],
    ['Pikachu', 25, 2],
    ['Raichu', 26, 3],
    ['Sandshrew', 27, 1],
    ['Sandslash', 28, 3],
    ['Nidoran-F', 29, 1],
    ['Nidorina', 30, 2],
    ['Nidoqueen', 31, 3],
    ['Nidoran-M', 32, 1],
    ['Nidorino', 33, 2],
    ['Nidoking', 34, 3],
    ['Clefairy', 35, 2],
    ['Clefable', 36, 3],
    ['Vulpix', 37, 1],
    ['Ninetales', 38, 3],
    ['Jigglypuff', 39, 2],
    ['Wigglytuff', 40, 3],
    ['Zubat', 41, 1],
    ['Golbat', 42, 2],
    ['Oddish', 43, 1],
    ['Gloom', 44, 2],
    ['Vileplume', 45, 3],
    ['Paras', 46, 1],
    ['Parasect', 47, 3],
    ['Venonat', 48, 1],
    ['Venomoth', 49, 3],
    ['Diglett', 50, 1],
    ['Dugtrio', 51, 3],
    ['Meowth', 52, 1],
    ['Persian', 53, 3],
    ['Psyduck', 54, 1],
    ['Golduck', 55, 3],
    ['Mankey', 56, 1],
    ['Primeape', 57, 3],
    ['Growlithe', 58, 1],
    ['Arcanine', 59, 3],
    ['Poliwag', 60, 1],
    ['Poliwhirl', 61, 2],
    ['Poliwrath', 62, 3],
    ['Abra', 63, 1],
    ['Kadabra', 64, 2],
    ['Alakazam', 65, 3],
    ['Machop', 66, 1],
    ['Machoke', 67, 2],
    ['Machamp', 68, 3],
    ['Bellsprout', 69, 1],
    ['Weepinbell', 70, 2],
    ['Victreebel', 71, 3],
    ['Tentacool', 72, 1],
    ['Tentacruel', 73, 3],
    ['Geodude', 74, 1],
    ['Graveler', 75, 2],
    ['Golem', 76, 3],
    ['Ponyta', 77, 1],
    ['Rapidash', 78, 3],
    ['Slowpoke', 79, 1],
    ['Slowbro', 80, 3],
    ['Magnemite', 81, 1],
    ['Magneton', 82, 2],
    ['Farfetchd', 83, 3],
    ['Doduo', 84, 1],
    ['Dodrio', 85, 3],
    ['Seel', 86, 1],
    ['Dewgong', 87, 3],
    ['Grimer', 88, 1],
    ['Muk', 89, 3],
    ['Shellder', 90, 1],
    ['Cloyster', 91, 3],
    ['Gastly', 92, 1],
    ['Haunter', 93, 2],
    ['Gengar', 94, 3],
    ['Onix', 95, 1],
    ['Drowzee', 96, 1],
    ['Hypno', 97, 3],
    ['Krabby', 98, 1],
    ['Kingler', 99, 3],
    ['Voltorb', 100, 1],
    ['Electrode', 101, 3],
    ['Exeggcute', 102, 1],
    ['Exeggutor', 103, 3],
    ['Cubone', 104, 1],
    ['Marowak', 105, 3],
    ['Hitmonlee', 106, 3],
    ['Hitmonchan', 107, 3],
    ['Lickitung', 108, 1],
    ['Koffing', 109, 1],
    ['Weezing', 110, 3],
    ['Rhyhorn', 111, 1],
    ['Rhydon', 112, 2],
    ['Chansey', 113, 2],
    ['Tangela', 114, 1],
    ['Kangaskhan', 115, 3],
    ['Horsea', 116, 1],
    ['Seadra', 117, 2],
    ['Goldeen', 118, 1],
    ['Seaking', 119, 3],
    ['Staryu', 120, 1],
    ['Starmie', 121, 3],
    ['Mr.Mime', 122, 3],
    ['Scyther', 123, 1],
    ['Jynx', 124, 3],
    ['Electabuzz', 125, 2],
    ['Magmar', 126, 2],
    ['Pinsir', 127, 3],
    ['Tauros', 128, 3],
    ['Magikarp', 129, 1],
    ['Gyarados', 130, 3],
    ['Lapras', 131, 3],
    ['Ditto', 132, 3],
    ['Eevee', 133, 1],
    ['Vaporeon', 134, 3],
    ['Jolteon', 135, 3],
    ['Flareon', 136, 3],
    ['Porygon', 137, 1],
    ['Omanyte', 138, 1],
    ['Omastar', 139, 3],
    ['Kabuto', 140, 1],
    ['Kabutops', 141, 3],
    ['Aerodactyl', 142, 3],
    ['Snorlax', 143, 3],
    ['Articuno', 144, 5],
    ['Zapdos', 145, 5],
    ['Moltres', 146, 5],
    ['Dratini', 147, 1],
    ['Dragonair', 148, 2],
    ['Dragonite', 149, 3],
    ['Mewtwo', 150, 5],
    ['Mew', 151, 4],
    ['Chikorita', 152, 1],
    ['Bayleef', 153, 2],
    ['Meganium', 154, 3],
    ['Cyndaquil', 155, 1],
    ['Quilava', 156, 2],
    ['Typhlosion', 157, 3],
    ['Totodile', 158, 1],
    ['Croconaw', 159, 2],
    ['Feraligatr', 160, 3],
    ['Sentret', 161, 1],
    ['Furret', 162, 3],
    ['Hoothoot', 163, 1],
    ['Noctowl', 164, 3],
    ['Ledyba', 165, 1],
    ['Ledian', 166, 3],
    ['Spinarak', 167, 1],
    ['Ariados', 168, 3],
    ['Crobat', 169, 3],
    ['Chinchou', 170, 1],
    ['Lanturn', 171, 3],
    ['Pichu', 172, 1],
    ['Cleffa', 173, 1],
    ['Igglybuff', 174, 1],
    ['Togepi', 175, 1],
    ['Togetic', 176, 2],
    ['Natu', 177, 1],
    ['Xatu', 178, 3],
    ['Mareep', 179, 1],
    ['Flaaffy', 180, 2],
    ['Ampharos', 181, 3],
    ['Bellossom', 182, 3],
    ['Marill', 183, 2],
    ['Azumarill', 184, 3],
    ['Sudowoodo', 185, 3],
    ['Politoed', 186, 3],
    ['Hoppip', 187, 1],
    ['Skiploom', 188, 2],
    ['Jumpluff', 189, 3],
    ['Aipom', 190, 1],
    ['Sunkern', 191, 1],
    ['Sunflora', 192, 3],
    ['Yanma', 193, 1],
    ['Wooper', 194, 1],
    ['Quagsire', 195, 3],
    ['Espeon', 196, 3],
    ['Umbreon', 197, 3],
    ['Murkrow', 198, 1],
    ['Slowking', 199, 3],
    ['Misdreavus', 200, 1],
    ['Unown', 201, 3],
    ['Wobbuffet', 202, 3],
    ['Girafarig', 203, 3],
    ['Pineco', 204, 1],
    ['Forretress', 205, 3],
    ['Dunsparce', 206, 3],
    ['Gligar', 207, 1],
    ['Steelix', 208, 3],
    ['Snubbull', 209, 1],
    ['Granbull', 210, 3],
    ['Qwilfish', 211, 3],
    ['Scizor', 212, 3],
    ['Shuckle', 213, 3],
    ['Heracross', 214, 3],
    ['Sneasel', 215, 1],
    ['Teddiursa', 216, 1],
    ['Ursaring', 217, 3],
    ['Slugma', 218, 1],
    ['Magcargo', 219, 3],
    ['Swinub', 220, 1],
    ['Piloswine', 221, 2],
    ['Corsola', 222, 3],
    ['Remoraid', 223, 1],
    ['Octillery', 224, 3],
    ['Delibird', 225, 3],
    ['Mantine', 226, 3],
    ['Skarmory', 227, 3],
    ['Houndour', 228, 1],
    ['Houndoom', 229, 3],
    ['Kingdra', 230, 3],
    ['Phanpy', 231, 1],
    ['Donphan', 232, 3],
    ['Porygon2', 233, 2],
    ['Stantler', 234, 3],
    ['Smeargle', 235, 3],
    ['Tyrogue', 236, 1],
    ['Hitmontop', 237, 3],
    ['Smoochum', 238, 1],
    ['Elekid', 239, 1],
    ['Magby', 240, 1],
    ['Miltank', 241, 3],
    ['Blissey', 242, 3],
    ['Raikou', 243, 5],
    ['Entei', 244, 5],
    ['Suicune', 245, 5],
    ['Larvitar', 246, 1],
    ['Pupitar', 247, 2],
    ['Tyranitar', 248, 3],
    ['Lugia', 249, 5],
    ['Ho-oh', 250, 5],
    ['Celebi', 251, 4],
    ['Azurill', 252, 3],
    ['Wynaut', 253, 1],
    ['Ambipom', 254, 3],
    ['Mismagius', 255, 3],
    ['Honchkrow', 256, 3],
    ['Bonsly', 257, 1],
    ['Mime-jr', 258, 1],
    ['Happiny', 259, 1],
    ['Munchlax', 260, 1],
    ['Mantyke', 261, 1],
    ['Weavile', 262, 3],
    ['Magnezone', 263, 3],
    ['Lickilicky', 264, 3],
    ['Rhyperior', 265, 3],
    ['Tangrowth', 266, 3],
    ['Electivire', 267, 3],
    ['Magmortar', 268, 3],
    ['Togekiss', 269, 3],
    ['Yanmega', 270, 3],
    ['Leafeon', 271, 3],
    ['Glaceon', 272, 3],
    ['Gliscor', 273, 3],
    ['Mamoswine', 274, 3],
    ['Porygon-z', 275, 3],
    ['Treecko', 276, 1],
    ['Grovyle', 277, 2],
    ['Sceptile', 278, 3],
    ['Torchic', 279, 1],
    ['Combusken', 280, 2],
    ['Blaziken', 281, 3],
    ['Mudkip', 282, 1],
    ['Marshtomp', 283, 2],
    ['Swampert', 284, 3],
    ['Ralts', 285, 1],
    ['Kirlia', 286, 2],
    ['Gardevoir', 287, 3],
    ['Gallade', 288, 3],
    ['Shedinja', 289, 3],
    ['Kecleon', 290, 3],
    ['Beldum', 291, 1],
    ['Metang', 292, 2],
    ['Metagross', 293, 3],
    ['Bidoof', 294, 1],
    ['Spiritomb', 295, 3],
    ['Lucario', 296, 3],
    ['Gible', 297, 1],
    ['Gabite', 298, 2],
    ['Garchomp', 299, 3],
    ['Mawile', 300, 3],
    ['Lileep', 301, 1],
    ['Cradily', 302, 3],
    ['Anorith', 303, 1],
    ['Armaldo', 304, 3],
    ['Cranidos', 305, 1],
    ['Rampardos', 306, 3],
    ['Shieldon', 307, 1],
    ['Bastiodon', 308, 3],
    ['Slaking', 309, 3],
    ['Absol', 310, 3],
    ['Duskull', 311, 1],
    ['Dusclops', 312, 2],
    ['Dusknoir', 313, 3],
    ['Wailord', 314, 3],
    ['Arceus', 315, 4],
    ['Turtwig', 316, 1],
    ['Grotle', 317, 2],
    ['Torterra', 318, 3],
    ['Chimchar', 319, 1],
    ['Monferno', 320, 2],
    ['Infernape', 321, 3],
    ['Piplup', 322, 1],
    ['Prinplup', 323, 2],
    ['Empoleon', 324, 3],
    ['Nosepass', 325, 1],
    ['Probopass', 326, 3],
    ['Honedge', 327, 1],
    ['Doublade', 328, 2],
    ['Aegislash-shield', 329, 3],
    ['Pawniard', 330, 1],
    ['Bisharp', 331, 3],
    ['Luxray', 332, 3],
    ['Aggron', 333, 3],
    ['Flygon', 334, 3],
    ['Milotic', 335, 3],
    ['Salamence', 336, 3],
    ['Klinklang', 337, 3],
    ['Zoroark', 338, 3],
    ['Sylveon', 339, 3],
    ['Kyogre', 340, 5],
    ['Groudon', 341, 5],
    ['Rayquaza', 342, 5],
    ['Dialga', 343, 5],
    ['Palkia', 344, 5],
    ['Giratina-altered', 345, 5],
    ['Regigigas', 346, 5],
    ['Darkrai', 347, 4],
    ['Genesect', 348, 4],
    ['Reshiram', 349, 5],
    ['Zekrom', 350, 5],
    ['Kyurem', 351, 5],
    ['Roserade', 352, 3],
    ['Drifblim', 353, 3],
    ['Lopunny', 354, 3],
    ['Breloom', 355, 3],
    ['Ninjask', 356, 3],
    ['Banette', 357, 3],
    ['Rotom', 358, 3],
    ['Reuniclus', 359, 3],
    ['Whimsicott', 360, 3],
    ['Krookodile', 361, 3],
    ['Cofagrigus', 362, 3],
    ['Galvantula', 363, 3],
    ['Ferrothorn', 364, 3],
    ['Litwick', 365, 1],
    ['Lampent', 366, 2],
    ['Chandelure', 367, 3],
    ['Haxorus', 368, 3],
    ['Golurk', 369, 3],
    ['Pyukumuku', 370, 3],
    ['Klefki', 371, 3],
    ['Talonflame', 372, 3],
    ['Mimikyu-disguised', 373, 3],
    ['Volcarona', 374, 3],
    ['Deino', 375, 1],
    ['Zweilous', 376, 2],
    ['Hydreigon', 377, 3],
    ['Latias', 378, 5],
    ['Latios', 379, 5],
    ['Deoxys-normal', 380, 4],
    ['Jirachi', 381, 4],
    ['Nincada', 382, 3],
    ['Bibarel', 383, 3],
    ['Riolu', 384, 1],
    ['Slakoth', 385, 1],
    ['Vigoroth', 386, 2],
    ['Wailmer', 387, 1],
    ['Shinx', 388, 1],
    ['Luxio', 389, 2],
    ['Aron', 390, 1],
    ['Lairon', 391, 2],
    ['Trapinch', 392, 1],
    ['Vibrava', 393, 2],
    ['Feebas', 394, 1],
    ['Bagon', 395, 1],
    ['Shelgon', 396, 2],
    ['Klink', 397, 1],
    ['Klang', 398, 2],
    ['Zorua', 399, 1],
    ['Budew', 400, 1],
    ['Roselia', 401, 2],
    ['Drifloon', 402, 1],
    ['Buneary', 403, 1],
    ['Shroomish', 404, 1],
    ['Shuppet', 405, 1],
    ['Solosis', 406, 1],
    ['Duosion', 407, 2],
    ['Cottonee', 408, 1],
    ['Sandile', 409, 1],
    ['Krokorok', 410, 2],
    ['Yamask', 411, 1],
    ['Joltik', 412, 1],
    ['Ferroseed', 413, 1],
    ['Axew', 414, 1],
    ['Fraxure', 415, 2],
    ['Golett', 416, 1],
    ['Fletchling', 417, 1],
    ['Fletchinder', 418, 2],
    ['Larvesta', 419, 1],
    ['Stunfisk', 420, 3]];
var nameException = [
    'mr.mime',
    'mime.jr',
    'deoxys',
    'giratina',
    'mimikyu',
    'aegislash',
];
var nameFix = [
    'mr-mime',
    'mime-jr',
    'deoxys-normal',
    'giratina-altered',
    'mimikyu-disguised',
    'aegislash-shield',
];
var typeSwap = [['steel', 'electric', 'Magnemite'],
    ['steel', 'electric', 'Magneton'],
    ['ice', 'water', 'Dewgong'],
    ['water', 'rock', 'Omanyte'],
    ['water', 'rock', 'Omastar'],
    ['steel', 'bug', 'Scizor'],
    ['steel', 'electric', 'Magnezone'],
    ['steel', 'water', 'Empoleon'],
    ["steel", "grass", "Ferrothorn"],
    ["dark", "ghost", "Spiritomb"]];
var typeUni = [['grass', 'Bulbasaur'],
    ['grass', 'Ivysaur'],
    ['grass', 'Venusaur'],
    ['fire', 'Charizard'],
    ['rock', 'Geodude'],
    ['rock', 'Graveler'],
    ['rock', 'Golem'],
    ['ghost', 'Gastly'],
    ['ghost', 'Haunter'],
    ['ghost', 'Gengar'],
    ['rock', 'Onix'],
    ['bug', 'Scyther'],
    ['water', 'Gyarados'],
    ['ice', 'Articuno'],
    ['electric', 'Zapdos'],
    ['fire', 'Moltres'],
    ['dragon', 'Dragonite'],
    ['steel', 'Steelix']];
var abilitySwap = ['pidgey',
    'pidgeotto',
    'pidgeot',
    'ekans',
    'arbok',
    'diglett',
    'dugtrio',
    'growlithe',
    'arcanine',
    'machop',
    'machoke',
    'machamp',
    'geodude',
    'graveler',
    'golem',
    'farfetchd',
    'onix',
    'steelix',
    'krabby',
    'kingler',
    'voltorb',
    'electrode',
    'cubone',
    'marowak',
    'hitmonchan',
    'lapras',
    'snorlax',
    'aerodactyl',
    'chinchou',
    'lanturn',
    'marill',
    'azumarill',
    'dunsparce',
    'murkrow',
    'honchkrow',
    'snubbull',
    'granbull',
    'teddiursa',
    'ursaring',
    'absol'];
var weezingabilities = {
    'abilities': [
        {
            'ability': {
                'name': 'levitate',
                'url': 'https://pokeapi.co/api/v2/ability/69/'
            },
            'is_hidden': false,
            'slot': 1
        },
        {
            'ability': {
                'name': 'neutralizing-gas',
                'url': 'https://pokeapi.co/api/v2/ability/5/'
            },
            'is_hidden': false,
            'slot': 2
        },
        {
            'ability': {
                'name': 'stench',
                'url': 'https://pokeapi.co/api/v2/ability/125/'
            },
            'is_hidden': true,
            'slot': 3
        }
    ]
};
var aegislashstats = {
    'stats': [
        {
            'base_stat': 60,
            'effort': 0,
            'stat': {
                'name': 'hp',
                'url': 'https://pokeapi.co/api/v2/stat/1/'
            }
        },
        {
            'base_stat': 50,
            'effort': 0,
            'stat': {
                'name': 'attack',
                'url': 'https://pokeapi.co/api/v2/stat/2/'
            }
        },
        {
            'base_stat': 140,
            'effort': 2,
            'stat': {
                'name': 'defense',
                'url': 'https://pokeapi.co/api/v2/stat/3/'
            }
        },
        {
            'base_stat': 50,
            'effort': 0,
            'stat': {
                'name': 'special-attack',
                'url': 'https://pokeapi.co/api/v2/stat/4/'
            }
        },
        {
            'base_stat': 140,
            'effort': 1,
            'stat': {
                'name': 'special-defense',
                'url': 'https://pokeapi.co/api/v2/stat/5/'
            }
        },
        {
            'base_stat': 60,
            'effort': 0,
            'stat': {
                'name': 'speed',
                'url': 'https://pokeapi.co/api/v2/stat/6/'
            }
        }
    ]
};
