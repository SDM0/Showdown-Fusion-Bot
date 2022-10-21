/** FUNCTIONS */

import { ids } from './vars.js'

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

export { fusAb, fusType, getMonID, getMonJSON }