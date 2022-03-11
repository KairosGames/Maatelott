class CollisionsManager {


    constructor() {

        this.uptimer = 0 ;
        this.upswitcher = false ;

    } ;


    load() {

        hitbxs = {
            "shp" : {
                "x" :  30,
                "y" :  60,
                "w" :  82,
                "h" :  25
            } ,
            "enmy1" : {
                "x" :  30,
                "y" :  63,
                "w" :  74,
                "h" :  20
            } ,
            "enmy2" : {
                "x" :  26,
                "y" :  60,
                "w" :  66,
                "h" :  23
            } ,
            "enmy3" : {
                "x" :  26,
                "y" :  60,
                "w" :  66,
                "h" :  23
            } ,
            "bull" : {
                "x" :  2,
                "y" :  2,
                "w" :  13,
                "h" :  14
            } ,
            "cse" : {
                "x" :  8,
                "y" :  13,
                "w" :  33,
                "h" :  20
            }
        } ;

    } ;


    update(dt) {


        // Bullets collisions
        for (let i = bullsmanager.bullets.length-1 ; i >= 0 ; i--) {
            let bull = bullsmanager.bullets[i].sprite ;
            switch (bullsmanager.bullets[i].camp) {
                // Player bullets
                case "player" :
                    wvsmanager.waves.forEach(wv => {
                        for (let n = wv.enemys.length-1 ; n >= 0 ; n--) {
                            let enmy = wv.enemys[n].sprite ;
                            switch (wv.enemys[n].type) {
                                case 1 :
                                    if ((enmy.x+hitbxs.enmy1.x)<=(bull.x+hitbxs.bull.x+hitbxs.bull.w) && (enmy.x+hitbxs.enmy1.x+hitbxs.enmy1.w)>=(bull.x+hitbxs.bull.x)) {
                                        if ((enmy.y+hitbxs.enmy1.y)<=(bull.y+hitbxs.bull.y+hitbxs.bull.h+7) && (enmy.y+hitbxs.enmy1.y+hitbxs.enmy1.h)>=(bull.y+hitbxs.bull.y)) {
                                            wv.enemys[n].life -- ;
                                            bullsmanager.bullets.splice(i,1) ;
                                            effsmanager.startEffect("impact", bull.x-27, bull.y-41) ;
                                            effsmanager.startDebris(5, 0.2, bull.x, bull.y) ;
                                            effsmanager.playClonedSound("impact_enemy") ;
                                        } ;
                                    } ;
                                    break ;
                                case 2 :
                                    if ((enmy.x+hitbxs.enmy2.x)<=(bull.x+hitbxs.bull.x+hitbxs.bull.w) && (enmy.x+hitbxs.enmy2.x+hitbxs.enmy2.w)>=(bull.x+hitbxs.bull.x)) {
                                        if ((enmy.y+hitbxs.enmy2.y)<=(bull.y+hitbxs.bull.y+hitbxs.bull.h) && (enmy.y+hitbxs.enmy2.y+hitbxs.enmy2.h)>=(bull.y+hitbxs.bull.y)) {
                                            wv.enemys[n].life -- ;
                                            bullsmanager.bullets.splice(i,1) ;
                                            effsmanager.startEffect("impact", bull.x-27, bull.y-41) ;
                                            effsmanager.startDebris(5, 0.2, bull.x, bull.y) ;
                                            effsmanager.playClonedSound("impact_enemy") ;
                                        } ;
                                    } ;
                                    break ;
                                case 3 :
                                    if ((enmy.x+hitbxs.enmy3.x)<=(bull.x+hitbxs.bull.x+hitbxs.bull.w) && (enmy.x+hitbxs.enmy3.x+hitbxs.enmy3.w)>=(bull.x+hitbxs.bull.x)) {
                                        if ((enmy.y+hitbxs.enmy3.y)<=(bull.y+hitbxs.bull.y+hitbxs.bull.h) && (enmy.y+hitbxs.enmy3.y+hitbxs.enmy3.h)>=(bull.y+hitbxs.bull.y)) {
                                            wv.enemys[n].life -- ;
                                            bullsmanager.bullets.splice(i,1) ;
                                            effsmanager.startEffect("impact", bull.x-27, bull.y-41) ;
                                            effsmanager.startDebris(5, 0.2, bull.x, bull.y) ;
                                            effsmanager.playClonedSound("impact_enemy") ;
                                        } ;
                                    } ;
                                    break ;
                            } ;
                            if (wv.enemys[n].life <= 0) {
                                switch (wv.enemys[n].type) {
                                    case 1 :
                                        effsmanager.startDebris(10, 0.2, bull.x, bull.y) ;
                                        effsmanager.startDebris(15, 0.35, bull.x, bull.y) ;
                                        effsmanager.startEffect("enemy1death", enmy.x, enmy.y) ;
                                        effsmanager.playClonedSound("sink") ;
                                        ship.points += 2 ;
                                        break ;
                                    case 2 :
                                        effsmanager.startDebris(10, 0.2, bull.x, bull.y) ;
                                        effsmanager.startDebris(15, 0.35, bull.x, bull.y) ;
                                        effsmanager.startEffect("enemy2death", enmy.x, enmy.y) ;
                                        effsmanager.playClonedSound("sink") ;
                                        ship.points += 4 ;
                                        break ;
                                    case 3 :
                                        effsmanager.startDebris(10, 0.2, bull.x, bull.y) ;
                                        effsmanager.startDebris(15, 0.35, bull.x, bull.y) ;
                                        effsmanager.startEffect("enemy3death", enmy.x, enmy.y) ;
                                        effsmanager.playClonedSound("sink") ;
                                        ship.points += 6 ;
                                        break ;
                                } ;
                                wv.enemys.splice(n,1) ;
                            } ;
                        } ;
                    }) ;
                    break ;
                // Opponents bullets
                case "opponent" :
                    if ((ship.sprite.x+hitbxs.shp.x)<=(bull.x+hitbxs.bull.x+hitbxs.bull.w) && (ship.sprite.x+hitbxs.shp.x+hitbxs.shp.w)>=(bull.x+hitbxs.bull.x)) {
                        if ((ship.sprite.y+hitbxs.shp.y)<=(bull.y+hitbxs.bull.y+hitbxs.bull.h) && (ship.sprite.y+hitbxs.shp.y+hitbxs.shp.h)>=(bull.y+hitbxs.bull.y)) {
                            ship.life -- ;
                            effsmanager.startEffect("impact", bull.x-30, bull.y-41) ;
                            effsmanager.startDebris(5, 0.2, bull.x, bull.y) ;
                            bullsmanager.bullets.splice(i,1) ;
                            effsmanager.playClonedSound("impact_player") ;
                        } ;
                    } ;
                    break ;
            } ;
        } ;

        // Ships collisions
        wvsmanager.waves.forEach(wv => {
            for (let n = wv.enemys.length-1 ; n >= 0 ; n--) {
                let enmy = wv.enemys[n].sprite ;
                switch (wv.enemys[n].type) {
                    case 1 :
                        if ((enmy.x+hitbxs.enmy1.x)<=(ship.sprite.x+hitbxs.shp.x+hitbxs.shp.w) && (enmy.x+hitbxs.enmy1.x+hitbxs.enmy1.w)>=(ship.sprite.x+hitbxs.shp.x)) {
                            if ((enmy.y+hitbxs.enmy1.y)<=(ship.sprite.y+hitbxs.shp.y+hitbxs.shp.h) && (enmy.y+hitbxs.enmy1.y+hitbxs.enmy1.h)>=(ship.sprite.y+hitbxs.shp.y)) {
                                effsmanager.startEffect("enemy1death", enmy.x, enmy.y) ;
                                wv.enemys.splice(n,1) ;
                                effsmanager.playClonedSound("sink") ;
                                ship.points += 2 ;
                                ship.life = 0 ;
                            } ;
                        } ;
                        break ;
                    case 2 :
                        if ((enmy.x+hitbxs.enmy2.x)<=(ship.sprite.x+hitbxs.shp.x+hitbxs.shp.w) && (enmy.x+hitbxs.enmy2.x+hitbxs.enmy2.w)>=(ship.sprite.x+hitbxs.shp.x)) {
                            if ((enmy.y+hitbxs.enmy2.y)<=(ship.sprite.y+hitbxs.shp.y+hitbxs.shp.h) && (enmy.y+hitbxs.enmy2.y+hitbxs.enmy2.h)>=(ship.sprite.y+hitbxs.shp.y)) {
                                effsmanager.startEffect("enemy2death", enmy.x, enmy.y) ;
                                wv.enemys.splice(n,1) ;
                                effsmanager.playClonedSound("sink") ;
                                ship.points += 4 ;
                                ship.life = 0 ;
                            } ;
                        } ;
                        break ;
                    case 3 :
                        if ((enmy.x+hitbxs.enmy3.x)<=(ship.sprite.x+hitbxs.shp.x+hitbxs.shp.w) && (enmy.x+hitbxs.enmy3.x+hitbxs.enmy3.w)>=(ship.sprite.x+hitbxs.shp.x)) {
                            if ((enmy.y+hitbxs.enmy3.y)<=(ship.sprite.y+hitbxs.shp.y+hitbxs.shp.h) && (enmy.y+hitbxs.enmy3.y+hitbxs.enmy3.h)>=(ship.sprite.y+hitbxs.shp.y)) {
                                effsmanager.startEffect("enemy3death", enmy.x, enmy.y) ;
                                wv.enemys.splice(n,1) ;
                                effsmanager.playClonedSound("sink") ;
                                ship.points += 6 ;
                                ship.life = 0 ;
                            } ;
                        } ;
                        break ;
                } ;
            } ;
        }) ;

        // Weapons cases drops
        bg.cases.forEach(cs => {
            let cse = cs.sprite ;
            if ((cse.x+hitbxs.cse.x)<=(ship.sprite.x+hitbxs.shp.x+hitbxs.shp.w) && (cse.x+hitbxs.cse.x+hitbxs.cse.w)>=(ship.sprite.x+hitbxs.shp.x)) {
                if ((cse.y+hitbxs.cse.y)<=(ship.sprite.y+hitbxs.shp.y+hitbxs.shp.h) && (cse.y+hitbxs.cse.y+hitbxs.cse.h)>=(ship.sprite.y+hitbxs.shp.y)) {
                    bg.cases.splice(0,1) ;
                    effsmanager.startDebris(5, 0.2, cse.x, cse.y) ;
                    effsmanager.playClonedSound("case_break") ;
                    this.upswitcher = true ;
                } ;
            } ;
        }) ;
        if (this.upswitcher) {
            this.uptimer += dt ;
            if (this.uptimer >= 1) {
                ship.lvlup() ;
                switch (ship.level) {
                    case 1 :
                        effsmanager.playClonedSound("new_weapon1") ;
                        break ;
                    case 2 :
                        effsmanager.playClonedSound("new_weapon2") ;
                        break ;
                    case 3 :
                        effsmanager.playClonedSound("new_weapon3") ;
                        break ;
                } ;
                this.upswitcher = false ;
                this.uptimer = 0 ;
            } ;
        } ;
    } ;


} ;

//
//-----------------------------------------------------------------------------------
//

function drawHitbxs(pCtx) {

    // Ship
    pCtx.strokeStyle = "rgb(0,255,0)" ;
    let shp = ship.sprite ;
    pCtx.strokeRect(shp.x+hitbxs.shp.x, shp.y+hitbxs.shp.y, hitbxs.shp.w, hitbxs.shp.h) ;
    // Cases
    bg.cases.forEach(e => {
        let cs = e.sprite ;
        pCtx.strokeRect(cs.x+hitbxs.cse.x, cs.y+hitbxs.cse.y, hitbxs.cse.w, hitbxs.cse.h) ;
    }) ;
    // Enemys
    pCtx.strokeStyle = "rgb(255,0,0)" ;
    wvsmanager.waves.forEach(wv => {
        wv.enemys.forEach(enmy => {
            let e = enmy.sprite
            switch (enmy.type) {
                case 1 :
                    pCtx.strokeRect(e.x+hitbxs.enmy1.x, e.y+hitbxs.enmy1.y, hitbxs.enmy1.w, hitbxs.enmy1.h) ;
                    break ;
                case 2 :
                    pCtx.strokeRect(e.x+hitbxs.enmy2.x, e.y+hitbxs.enmy2.y, hitbxs.enmy2.w, hitbxs.enmy2.h) ;
                    break ;
                case 3 :
                    pCtx.strokeRect(e.x+hitbxs.enmy3.x, e.y+hitbxs.enmy3.y, hitbxs.enmy3.w, hitbxs.enmy3.h) ;
                    break ;
            } ;
        }) ;
    }) ;
    // Bullets
    bullsmanager.bullets.forEach(bull => { 
        let b = bull.sprite ;
        switch (bull.camp) {
            case "opponent" :
                pCtx.strokeStyle = "rgb(255,0,0)" ;
                pCtx.strokeRect(b.x+hitbxs.bull.x, b.y+hitbxs.bull.y, hitbxs.bull.w, hitbxs.bull.h) ;
                break ;
            case "player" :
                pCtx.strokeStyle = "rgb(0,255,0)" ;
                pCtx.strokeRect(b.x+hitbxs.bull.x, b.y+hitbxs.bull.y, hitbxs.bull.w, hitbxs.bull.h) ;
                break ;
        } ;
    }) ;
    pCtx.strokeStyle = "rgb(255,255,255)" ;

} ;