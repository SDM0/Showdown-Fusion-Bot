/** DATA */

const pokemons = new Set([
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
])

const ids=
[["Bulbasaur",1,1],
["Ivysaur",2,2],
["Venusaur",3,3],
["Charmander",4,1],
["Charmeleon",5,2],
["Charizard",6,3],
["Squirtle",7,1],
["Wartortle",8,2],
["Blastoise",9,3],
["Caterpie",10,1],
["Metapod",11,2],
["Butterfree",12,3],
["Weedle",13,1],
["Kakuna",14,2],
["Beedrill",15,3],
["Pidgey",16,1],
["Pidgeotto",17,2],
["Pidgeot",18,3],
["Rattata",19,1],
["Raticate",20,3],
["Spearow",21,1],
["Fearow",22,3],
["Ekans",23,1],
["Arbok",24,3],
["Pikachu",25,2],
["Raichu",26,3],
["Sandshrew",27,1],
["Sandslash",28,3],
["Nidoran-F",29,1],
["Nidorina",30,2],
["Nidoqueen",31,3],
["Nidoran-M",32,1],
["Nidorino",33,2],
["Nidoking",34,3],
["Clefairy",35,2],
["Clefable",36,3],
["Vulpix",37,1],
["Ninetales",38,3],
["Jigglypuff",39,2],
["Wigglytuff",40,3],
["Zubat",41,1],
["Golbat",42,2],
["Oddish",43,1],
["Gloom",44,2],
["Vileplume",45,3],
["Paras",46,1],
["Parasect",47,3],
["Venonat",48,1],
["Venomoth",49,3],
["Diglett",50,1],
["Dugtrio",51,3],
["Meowth",52,1],
["Persian",53,3],
["Psyduck",54,1],
["Golduck",55,3],
["Mankey",56,1],
["Primeape",57,3],
["Growlithe",58,1],
["Arcanine",59,3],
["Poliwag",60,1],
["Poliwhirl",61,2],
["Poliwrath",62,3],
["Abra",63,1],
["Kadabra",64,2],
["Alakazam",65,3],
["Machop",66,1],
["Machoke",67,2],
["Machamp",68,3],
["Bellsprout",69,1],
["Weepinbell",70,2],
["Victreebel",71,3],
["Tentacool",72,1],
["Tentacruel",73,3],
["Geodude",74,1],
["Graveler",75,2],
["Golem",76,3],
["Ponyta",77,1],
["Rapidash",78,3],
["Slowpoke",79,1],
["Slowbro",80,3],
["Magnemite",81,1],
["Magneton",82,2],
["Farfetchd",83,3],
["Doduo",84,1],
["Dodrio",85,3],
["Seel",86,1],
["Dewgong",87,3],
["Grimer",88,1],
["Muk",89,3],
["Shellder",90,1],
["Cloyster",91,3],
["Gastly",92,1],
["Haunter",93,2],
["Gengar",94,3],
["Onix",95,1],
["Drowzee",96,1],
["Hypno",97,3],
["Krabby",98,1],
["Kingler",99,3],
["Voltorb",100,1],
["Electrode",101,3],
["Exeggcute",102,1],
["Exeggutor",103,3],
["Cubone",104,1],
["Marowak",105,3],
["Hitmonlee",106,3],
["Hitmonchan",107,3],
["Lickitung",108,1],
["Koffing",109,1],
["Weezing",110,3],
["Rhyhorn",111,1],
["Rhydon",112,2],
["Chansey",113,2],
["Tangela",114,1],
["Kangaskhan",115,3],
["Horsea",116,1],
["Seadra",117,2],
["Goldeen",118,1],
["Seaking",119,3],
["Staryu",120,1],
["Starmie",121,3],
["Mr.Mime",122,3],
["Scyther",123,1],
["Jynx",124,3],
["Electabuzz",125,2],
["Magmar",126,2],
["Pinsir",127,3],
["Tauros",128,3],
["Magikarp",129,1],
["Gyarados",130,3],
["Lapras",131,3],
["Ditto",132,3],
["Eevee",133,1],
["Vaporeon",134,3],
["Jolteon",135,3],
["Flareon",136,3],
["Porygon",137,1],
["Omanyte",138,1],
["Omastar",139,3],
["Kabuto",140,1],
["Kabutops",141,3],
["Aerodactyl",142,3],
["Snorlax",143,3],
["Articuno",144,5],
["Zapdos",145,5],
["Moltres",146,5],
["Dratini",147,1],
["Dragonair",148,2],
["Dragonite",149,3],
["Mewtwo",150,5],
["Mew",151,4],
["Chikorita",152,1],
["Bayleef",153,2],
["Meganium",154,3],
["Cyndaquil",155,1],
["Quilava",156,2],
["Typhlosion",157,3],
["Totodile",158,1],
["Croconaw",159,2],
["Feraligatr",160,3],
["Sentret",161,1],
["Furret",162,3],
["Hoothoot",163,1],
["Noctowl",164,3],
["Ledyba",165,1],
["Ledian",166,3],
["Spinarak",167,1],
["Ariados",168,3],
["Crobat",169,3],
["Chinchou",170,1],
["Lanturn",171,3],
["Pichu",172,1],
["Cleffa",173,1],
["Igglybuff",174,1],
["Togepi",175,1],
["Togetic",176,2],
["Natu",177,1],
["Xatu",178,3],
["Mareep",179,1],
["Flaaffy",180,2],
["Ampharos",181,3],
["Bellossom",182,3],
["Marill",183,2],
["Azumarill",184,3],
["Sudowoodo",185,3],
["Politoed",186,3],
["Hoppip",187,1],
["Skiploom",188,2],
["Jumpluff",189,3],
["Aipom",190,1],
["Sunkern",191,1],
["Sunflora",192,3],
["Yanma",193,1],
["Wooper",194,1],
["Quagsire",195,3],
["Espeon",196,3],
["Umbreon",197,3],
["Murkrow",198,1],
["Slowking",199,3],
["Misdreavus",200,1],
["Unown",201,3],
["Wobbuffet",202,3],
["Girafarig",203,3],
["Pineco",204,1],
["Forretress",205,3],
["Dunsparce",206,3],
["Gligar",207,1],
["Steelix",208,3],
["Snubbull",209,1],
["Granbull",210,3],
["Qwilfish",211,3],
["Scizor",212,3],
["Shuckle",213,3],
["Heracross",214,3],
["Sneasel",215,1],
["Teddiursa",216,1],
["Ursaring",217,3],
["Slugma",218,1],
["Magcargo",219,3],
["Swinub",220,1],
["Piloswine",221,2],
["Corsola",222,3],
["Remoraid",223,1],
["Octillery",224,3],
["Delibird",225,3],
["Mantine",226,3],
["Skarmory",227,3],
["Houndour",228,1],
["Houndoom",229,3],
["Kingdra",230,3],
["Phanpy",231,1],
["Donphan",232,3],
["Porygon2",233,2],
["Stantler",234,3],
["Smeargle",235,3],
["Tyrogue",236,1],
["Hitmontop",237,3],
["Smoochum",238,1],
["Elekid",239,1],
["Magby",240,1],
["Miltank",241,3],
["Blissey",242,3],
["Raikou",243,5],
["Entei",244,5],
["Suicune",245,5],
["Larvitar",246,1],
["Pupitar",247,2],
["Tyranitar",248,3],
["Lugia",249,5],
["Ho-oh",250,5],
["Celebi",251,4]
,["Azurill",252,3]
,["Wynaut",253,1]
,["Ambipom",254,3]
,["Mismagius",255,3]
,["Honchkrow",256,3]
,["Bonsly",257,1]
,["Mime-jr",258,1]
,["Happiny",259,1]
,["Munchlax",260,1]
,["Mantyke",261,1]
,["Weavile",262,3]
,["Magnezone",263,3]
,["Lickilicky",264,3]
,["Rhyperior",265,3]
,["Tangrowth",266,3]
,["Electivire",267,3]
,["Magmortar",268,3]
,["Togekiss",269,3]
,["Yanmega",270,3]
,["Leafeon",271,3]
,["Glaceon",272,3]
,["Gliscor",273,3]
,["Mamoswine",274,3]
,["Porygon-z",275,3]
,["Treecko",276,1]
,["Grovyle",277,2]
,["Sceptile",278,3]
,["Torchic",279,1]
,["Combusken",280,2]
,["Blaziken",281,3]
,["Mudkip",282,1]
,["Marshtomp",283,2]
,["Swampert",284,3]
,["Ralts",285,1]
,["Kirlia",286,2]
,["Gardevoir",287,3]
,["Gallade",288,3]
,["Shedinja",289,3]
,["Kecleon",290,3]
,["Beldum",291,1]
,["Metang",292,2]
,["Metagross",293,3]
,["Bidoof",294,1]
,["Spiritomb",295,3]
,["Lucario",296,3]
,["Gible",297,1]
,["Gabite",298,2]
,["Garchomp",299,3]
,["Mawile",300,3]
,["Lileep",301,1]
,["Cradily",302,3]
,["Anorith",303,1]
,["Armaldo",304,3]
,["Cranidos",305,1]
,["Rampardos",306,3]
,["Shieldon",307,1]
,["Bastiodon",308,3]
,["Slaking",309,3]
,["Absol",310,3]
,["Duskull",311,1]
,["Dusclops",312,2]
,["Dusknoir",313,3]
,["Wailord",314,3]
,["Arceus",315,4]
,["Turtwig",316,1]
,["Grotle",317,2]
,["Torterra",318,3]
,["Chimchar",319,1]
,["Monferno",320,2]
,["Infernape",321,3]
,["Piplup",322,1]
,["Prinplup",323,2]
,["Empoleon",324,3]
,["Nosepass",325,1]
,["Probopass",326,3]
,["Honedge",327,1]
,["Doublade",328,2]
,["Aegislash-shield",329,3]
,["Pawniard",330,1]
,["Bisharp",331,3]
,["Luxray",332,3]
,["Aggron",333,3]
,["Flygon",334,3]
,["Milotic",335,3]
,["Salamence",336,3]
,["Klinklang",337,3]
,["Zoroark",338,3]
,["Sylveon",339,3]
,["Kyogre",340,5]
,["Groudon",341,5]
,["Rayquaza",342,5]
,["Dialga",343,5]
,["Palkia",344,5]
,["Giratina-altered",345,5]
,["Regigigas",346,5]
,["Darkrai",347,4]
,["Genesect",348,4]
,["Reshiram",349,5]
,["Zekrom",350,5]
,["Kyurem",351,5]
,["Roserade",352,3]
,["Drifblim",353,3]
,["Lopunny",354,3]
,["Breloom",355,3]
,["Ninjask",356,3]
,["Banette",357,3]
,["Rotom",358,3]
,["Reuniclus",359,3]
,["Whimsicott",360,3]
,["Krookodile",361,3]
,["Cofagrigus",362,3]
,["Galvantula",363,3]
,["Ferrothorn",364,3]
,["Litwick",365,1]
,["Lampent",366,2]
,["Chandelure",367,3]
,["Haxorus",368,3]
,["Golurk",369,3]
,["Pyukumuku",370,3]
,["Klefki",371,3]
,["Talonflame",372,3]
,["Mimikyu-disguised",373,3]
,["Volcarona",374,3]
,["Deino",375,1]
,["Zweilous",376,2]
,["Hydreigon",377,3]
,["Latias",378,5]
,["Latios",379,5]
,["Deoxys-normal",380,4]
,["Jirachi",381,4]
,["Nincada",382,3]
,["Bibarel",383,3]
,["Riolu",384,1]
,["Slakoth",385,1]
,["Vigoroth",386,2]
,["Wailmer",387,1]
,["Shinx",388,1]
,["Luxio",389,2]
,["Aron",390,1]
,["Lairon",391,2]
,["Trapinch",392,1]
,["Vibrava",393,2]
,["Feebas",394,1]
,["Bagon",395,1]
,["Shelgon",396,2]
,["Klink",397,1]
,["Klang",398,2]
,["Zorua",399,1]
,["Budew",400,1]
,["Roselia",401,2]
,["Drifloon",402,1]
,["Buneary",403,1]
,["Shroomish",404,1]
,["Shuppet",405,1]
,["Solosis",406,1]
,["Duosion",407,2]
,["Cottonee",408,1]
,["Sandile",409,1]
,["Krokorok",410,2]
,["Yamask",411,1]
,["Joltik",412,1]
,["Ferroseed",413,1]
,["Axew",414,1]
,["Fraxure",415,2]
,["Golett",416,1]
,["Fletchling",417,1]
,["Fletchinder",418,2]
,["Larvesta",419,1]
,["Stunfisk",420,3]]

const nameException=[
"mr.mime",
"mime.jr",
"deoxys",
"giratina",
"mimikyu",
"aegislash",
]

const nameFix=[
"mr-mime",
"mime-jr",
"deoxys-normal",
"giratina-altered",
"mimikyu-disguised",
"aegislash-shield",
]

const typeSwap=
[["steel","electric","Magnemite"]
,["steel","electric","Magneton"]
,["ice","water","Dewgong"]
,["water","rock","Omanyte"]
,["water","rock","Omastar"]
,["steel","bug","Scizor"]
,["steel","electric","Magnezone"]
,["steel","water","Empoleon"]
,["dark","ghost","Spiritomb"]
,["steel","grass","Ferrothorn"]
,["grass","psychic","Celebi"]
,["flying","flying","Fletchinder"]]

const typeUni =
[["grass","Bulbasaur"]
,["grass","Ivysaur"]
,["grass","Venusaur"]
,["fire","Charizard"]
,["rock","Geodude"]
,["rock","Graveler"]
,["rock","Golem"]
,["ghost","Gastly"]
,["ghost","Haunter"]
,["ghost","Gengar"]
,["rock","Onix"]
,["bug","Scyther"]
,["water","Gyarados"]
,["ice","Articuno"]
,["electric","Zapdos"]
,["fire","Moltres"]
,["dragon","Dragonite"]
,["steel","Steelix"]]

const abilitySwap =
["pidgey",
"pidgeotto",
"pidgeot",
"ekans",
"arbok",
"diglett",
"dugtrio",
"growlithe",
"arcanine",
"machop",
"machoke",
"machamp",
"geodude",
"graveler",
"golem",
"farfetchd",
"onix",
"steelix",
"krabby",
"kingler",
"voltorb",
"electrode",
"cubone",
"marowak",
"hitmonchan",
"lapras",
"snorlax",
"aerodactyl",
"chinchou",
"lanturn",
"marill",
"azumarill",
"dunsparce",
"murkrow",
"honchkrow",
"snubbull",
"granbull",
"teddiursa",
"ursaring",
"absol"]

const pkmnEvo1 = ['Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie', 'Weedle', 'Pidgey', 'Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Nidoran-F', 'Nidoran-M', 'Vulpix', 'Zubat', 'Oddish', 'Paras', 'Venonat', 'Diglett', 'Meowth', 'Psyduck', 'Mankey', 'Growlithe', 'Poliwag', 'Abra', 'Machop', 'Bellsprout', 'Tentacool', 'Geodude', 'Ponyta', 'Slowpoke', 'Magnemite', 'Doduo', 'Seel', 'Grimer', 'Shellder', 'Gastly', 'Onix', 'Drowzee', 'Krabby', 'Voltorb', 'Exeggcute', 'Cubone', 'Lickitung', 'Koffing', 'Rhyhorn', 'Tangela', 'Horsea', 'Goldeen', 'Staryu', 'Scyther', 'Magikarp', 'Eevee', 'Porygon', 'Omanyte', 'Kabuto', 'Dratini', 'Chikorita', 'Cyndaquil', 'Totodile', 'Sentret', 'Hoothoot', 'Ledyba', 'Spinarak', 'Chinchou', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Natu', 'Mareep', 'Hoppip', 'Aipom', 'Sunkern', 'Yanma', 'Wooper', 'Murkrow', 'Misdreavus', 'Pineco', 'Gligar', 'Snubbull', 'Sneasel', 'Teddiursa', 'Slugma', 'Swinub', 'Remoraid', 'Houndour', 'Phanpy', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Larvitar', 'Wynaut', 'Bonsly', 'Mime-jr', 'Happiny', 'Munchlax', 'Mantyke', 'Treecko', 'Torchic', 'Mudkip', 'Ralts', 'Beldum', 'Bidoof', 'Gible', 'Lileep', 'Anorith', 'Cranidos', 'Shieldon', 'Duskull', 'Turtwig', 'Chimchar', 'Piplup', 'Nosepass', 'Honedge', 'Pawniard', 'Litwick', 'Deino', 'Riolu', 'Slakoth', 'Wailmer', 'Shinx', 'Aron', 'Trapinch', 'Feebas', 'Bagon', 'Klink', 'Zorua', 'Budew', 'Drifloon', 'Buneary', 'Shroomish', 'Shuppet', 'Solosis', 'Cottonee', 'Sandile', 'Yamask', 'Joltik', 'Ferroseed', 'Axew', 'Golett', 'Fletchling', 'Larvesta']

const pkmnEvo2 = ['Ivysaur', 'Charmeleon', 'Wartortle', 'Metapod', 'Kakuna', 'Pidgeotto', 'Pikachu', 'Nidorina', 'Nidorino', 'Clefairy', 'Jigglypuff', 'Golbat', 'Gloom', 'Poliwhirl', 'Kadabra', 'Machoke', 'Weepinbell', 'Graveler', 'Magneton', 'Haunter', 'Rhydon', 'Chansey', 'Seadra', 'Electabuzz', 'Magmar', 'Dragonair', 'Bayleef', 'Quilava', 'Croconaw', 'Togetic', 'Flaaffy', 'Marill', 'Skiploom', 'Piloswine', 'Porygon2', 'Pupitar', 'Grovyle', 'Combusken', 'Marshtomp', 'Kirlia', 'Metang', 'Gabite', 'Dusclops', 'Grotle', 'Monferno', 'Prinplup', 'Doublade', 'Lampent', 'Zweilous', 'Vigoroth', 'Luxio', 'Lairon', 'Vibrava', 'Shelgon', 'Klang', 'Roselia', 'Duosion', 'Krokorok', 'Fraxure', 'Fletchinder']

const pkmnEvo3 = ['Venusaur', 'Charizard', 'Blastoise', 'Butterfree', 'Beedrill', 'Pidgeot', 'Raticate', 'Fearow', 'Arbok', 'Raichu', 'Sandslash', 'Nidoqueen', 'Nidoking', 'Clefable', 'Ninetales', 'Wigglytuff', 'Vileplume', 'Parasect', 'Venomoth', 'Dugtrio', 'Persian', 'Golduck', 'Primeape', 'Arcanine', 'Poliwrath', 'Alakazam', 'Machamp', 'Victreebel', 'Tentacruel', 'Golem', 'Rapidash', 'Slowbro', 'Farfetchd', 'Dodrio', 'Dewgong', 'Muk', 'Cloyster', 'Gengar', 'Hypno', 'Kingler', 'Electrode', 'Exeggutor', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Weezing', 'Kangaskhan', 'Seaking', 'Starmie', 'Mr.Mime', 'Jynx', 'Pinsir', 'Tauros', 'Gyarados', 'Lapras', 'Ditto', 'Vaporeon', 'Jolteon', 'Flareon', 'Omastar', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dragonite', 'Mewtwo', 'Mew', 'Meganium', 'Typhlosion', 'Feraligatr', 'Furret', 'Noctowl', 'Ledian', 'Ariados', 'Crobat', 'Lanturn', 'Xatu', 'Ampharos', 'Bellossom', 'Azumarill', 'Sudowoodo', 'Politoed', 'Jumpluff', 'Sunflora', 'Quagsire', 'Espeon', 'Umbreon', 'Slowking', 'Unown', 'Wobbuffet', 'Girafarig', 'Forretress', 'Dunsparce', 'Steelix', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Ursaring', 'Magcargo', 'Corsola', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndoom', 'Kingdra', 'Donphan', 'Stantler', 'Smeargle', 'Hitmontop', 'Miltank', 'Blissey', 'Raikou', 'Entei', 'Suicune', 'Tyranitar', 'Lugia', 'Ho-oh', 'Celebi', 'Azurill', 'Ambipom', 'Mismagius', 'Honchkrow', 'Weavile', 'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire', 'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon', 'Gliscor', 'Mamoswine', 'Porygon-z', 'Sceptile', 'Blaziken', 'Swampert', 'Gardevoir', 'Gallade', 'Shedinja', 'Kecleon', 'Metagross', 'Spiritomb', 'Lucario', 'Garchomp', 'Mawile', 'Cradily', 'Armaldo', 'Rampardos', 'Bastiodon', 'Slaking', 'Absol', 'Dusknoir', 'Wailord', 'Arceus', 'Torterra', 'Infernape', 'Empoleon', 'Probopass', 'Aegislash', 'Bisharp', 'Luxray', 'Aggron', 'Flygon', 'Milotic', 'Salamence', 'Klinklang', 'Zoroark', 'Sylveon', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Regigigas', 'Darkrai', 'Genesect', 'Reshiram', 'Zekrom', 'Kyurem', 'Roserade', 'Drifblim', 'Lopunny', 'Breloom', 'Ninjask', 'Banette', 'Rotom', 'Reuniclus', 'Whimsicott', 'Krookodile', 'Cofagrigus', 'Galvantula', 'Ferrothorn', 'Chandelure', 'Haxorus', 'Golurk', 'Pyukumuku', 'Klefki', 'Talonflame', 'Mimikyu-disguised', 'Volcarona', 'Hydreigon', 'Latias', 'Latios', 'Deoxys', 'Jirachi', 'Nincada', 'Bibarel', 'Stunfisk']


//Chandelure
const chandelureAbilities = [
    {
        "ability": {
            "name": "flash-fire"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "flame-body",
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "shadow-tag",
        },
        "is_hidden": true,
    }
]

//Lampent, 
const lampentAbilities = chandelureAbilities;

//Litwick
const litwickAbilities = chandelureAbilities;

//Wigglytuff
const wigglytuffAbilities = [
    {
        "ability": {
            "name": "cute-charm"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "frisk",
        },
        "is_hidden": true,
    }
]

//Jigglypuff
const jigglypuffAbilities = [
    {
        "ability": {
            "name": "cute-charm"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "friend-guard",
        },
        "is_hidden": true,
    }
]

//Igglybuff
const igglybuffAbilities = jigglypuffAbilities;

//Zapdos
const zapdosAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "lightning-rod",
        },
        "is_hidden": true,
    }
]

//Raikou
const raikouAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "volt-absorb",
        },
        "is_hidden": true,
    }
]

//Entei
const enteiAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "flash-fire",
        },
        "is_hidden": true,
    }
]

//Suicune
const suicuneAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "water-absorb",
        },
        "is_hidden": true,
    }
]

//Milotic
const miloticAbilities = [
    {
        "ability": {
            "name": "marvel-scale"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "cute-charm",
        },
        "is_hidden": true,
    }
]

//Feebas
const feebasAbilities = [
    {
        "ability": {
            "name": "swift-swim"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "adaptability",
        },
        "is_hidden": true,
    }
]

//Gengar
const gengarAbilities = [
    {
        "ability": {
            "name": "levitate"
        },
        "is_hidden": false,
    },
]

//Weezing
const weezingAbilities = [
    {
        "ability": {
            "name": "levitate"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "stench",
        },
        "is_hidden": true,
    }
]

//Koffing
const koffingAbilities = weezingAbilities;

//Mewtwo
const mewtwoAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "immunity",
        },
        "is_hidden": true,
    }
]

//Unown
const unownAbilities = [
    {
        "ability": {
            "name": "levitate"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "mummy",
        },
        "is_hidden": true,
    }
]

//Flygon
const flygonAbilities = [
    {
        "ability": {
            "name": "levitate"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "dry-skin",
        },
        "is_hidden": true,
    }
]

//Regigigas
const regigigasAbilities = [
    {
        "ability": {
            "name": "slow-start"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "mold-breaker",
        },
        "is_hidden": true,
    }
]

//Darkrai
const darkraiAbilities = [
    {
        "ability": {
            "name": "bad-dreams"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "white-smoke",
        },
        "is_hidden": true,
    }
]

//Genesect
const genesectAbilities = [
    {
        "ability": {
            "name": "download"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "motor-drive",
        },
        "is_hidden": true,
    }
]

//Reshiram
const reshiramAbilities = [
    {
        "ability": {
            "name": "turboblaze"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "flare-boost",
        },
        "is_hidden": true,
    }
]

//Zekrom
const zekromAbilities = [
    {
        "ability": {
            "name": "teravolt"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "volt-absorb",
        },
        "is_hidden": true,
    }
]

//Kyurem
const kyuremAbilities = [
    {
        "ability": {
            "name": "pressure"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "ice-body",
        },
        "is_hidden": true,
    }
]

//Ferrothorn
const ferrothornAbilities = [
    {
        "ability": {
            "name": "iron-barbs"
        },
        "is_hidden": false,
    },
]

//Talonflame
const talonflameAbilities = [
    {
        "ability": {
            "name": "big-pecks"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "gale-wings",
        },
        "is_hidden": true,
    }
]

//Hydreigon
const hydreigonAbilities = [
    {
        "ability": {
            "name": "levitate"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "hustle",
        },
        "is_hidden": true,
    }
]

//Cleffa
const cleffaAbilities = [
    {
        "ability": {
            "name": "magic-guard"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "cute-charm"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "friend-guard",
        },
        "is_hidden": true,
    }
]

//Clefairy
const clefairyAbilities = cleffaAbilities;

//Clefable
const clefableAbilities = [
    {
        "ability": {
            "name": "magic guard"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "cute charm"
        },
        "is_hidden": false,
    },
    {
        "ability": {
            "name": "unaware",
        },
        "is_hidden": true,
    }
]

//Input
const abilitiesException = [
    "chandelure",
    "lampent",
    "litwick",
    "wigglytuff",
    "jigglypuff",
    "igglybuff",
    "zapdos",
    "raikou",
    "entei",
    "suicune",
    "milotic",
    "feebas",
    "gengar",
    "weezing",
    "koffing",
    "mewtwo",
    "unown",
    "flygon",
    "regigigas",
    "darkrai",
    "genesect",
    "reshiram",
    "zekrom",
    "kyurem",
    "ferrothorn",
    "talonflame",
    "hydreigon",
    "cleffa",
    "clefairy",
    "clefable"
]

//Output
const abilitiesFix = [
    chandelureAbilities,
    lampentAbilities,
    litwickAbilities,
    wigglytuffAbilities,
    jigglypuffAbilities,
    igglybuffAbilities,
    zapdosAbilities,
    raikouAbilities,
    enteiAbilities,
    suicuneAbilities,
    miloticAbilities,
    feebasAbilities,
    gengarAbilities,
    weezingAbilities,
    koffingAbilities,
    mewtwoAbilities,
    unownAbilities,
    flygonAbilities,
    regigigasAbilities,
    darkraiAbilities,
    genesectAbilities,
    reshiramAbilities,
    zekromAbilities,
    kyuremAbilities,
    ferrothornAbilities,
    talonflameAbilities,
    hydreigonAbilities,
    cleffaAbilities,
    clefairyAbilities,
    clefableAbilities
]

export { pokemons, abilitySwap, ids, pkmnEvo1, pkmnEvo2, pkmnEvo3, nameException, nameFix, typeSwap, typeUni, abilitiesException, abilitiesFix, chandelureAbilities, clefableAbilities, clefairyAbilities, cleffaAbilities, darkraiAbilities, enteiAbilities, feebasAbilities, ferrothornAbilities, flygonAbilities, genesectAbilities, gengarAbilities, hydreigonAbilities, igglybuffAbilities, jigglypuffAbilities, koffingAbilities, kyuremAbilities, lampentAbilities, litwickAbilities, mewtwoAbilities, miloticAbilities, raikouAbilities, regigigasAbilities, reshiramAbilities, suicuneAbilities, talonflameAbilities, unownAbilities, weezingAbilities, wigglytuffAbilities, zapdosAbilities, zekromAbilities }