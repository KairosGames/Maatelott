class Enemys {


    constructor (pType, pSprt) {

        this.type = pType ;
        this.sprite = pSprt ;
        this.moove = null ;
        this.pending = 0 ;
        this.appeared = false ;
        this.switcher = false ;
        switch (pType) {
            case 1 :
                this.life = 2 ;
                this.speedx = bg.scrollspeed+50 ;
                this.speedy = 80 ;
                this.shttimer = 2 ;
                break ;
            case 2 :
                this.life = 4 ;
                this.speedx = bg.scrollspeed+75 ;
                this.speedy = 100 ;
                this.shttimer = 1.5 ;
                break ;
            case 3 :
                this.life = 6 ;
                this.speedx = bg.scrollspeed+100 ;
                this.speedy = 120 ;
                this.shttimer = 1 ;
                break ;
        } ;

    } ;


    update(dt) {

        this.sprite.update(dt) ;

    } ;


    draw(pCtx) {

        this.sprite.draw(pCtx) ;

    } ;


} ;

//
//-----------------------------------------------------------------------------------
//

class Waves {


    constructor(pLvl, pStrtDist, pType, pNb, pY=null, pDt=null) {

        this.enemys = [] ;
        this.level = pLvl ;
        this.startdist = pStrtDist ;
        this.type = pType ;
        this.number = pNb ;
        this.x = Width ;
        this.y = pY ;
        this.dt = pDt ;
        this.done = false ;
        switch (pLvl) {
            case 1 :
                this.sprite = sprites.enemy1 ;
                break ;
            case 2 :
                this.sprite = sprites.enemy2 ;
                break ;
            case 3 :
                this.sprite = sprites.enemy3 ;
                break ;
        } ;

        this.img = this.sprite.img ;
    
    } ;


    update(dt) {

        // Animations
        this.enemys.forEach(enmy => {
            enmy.update(dt) ;
        }) ;

        // Bahavior
        if (this.type == "single") {
            let enmy = this.enemys[0] ;
            enmy.appeared = true ;
            enmy.sprite.x -= enmy.speedx*dt ;
            if (enmy.moove == 1) {
                enmy.sprite.x -= (enmy.speedx*dt)/2 ;
                if (enmy.sprite.x >= ship.sprite.x-50) {
                    if (enmy.sprite.y > ship.sprite.y) {
                        enmy.sprite.y -= enmy.speedy*dt*1.5 ;
                        if (enmy.sprite.y <= ship.sprite.y) {
                            enmy.sprite.y = ship.sprite.y ;
                        } ;
                    } else if (enmy.sprite.y < ship.sprite.y) {
                        enmy.sprite.y += enmy.speedy*dt*1.5 ;
                        if (enmy.sprite.y >= ship.sprite.y) {
                            enmy.sprite.y = ship.sprite.y ;
                        } ;
                    } ;
                } ;
            } ;
        } else {
            this.enemys.forEach( enmy => {
                if (this.type == "line") {
                    enmy.appeared = true ;
                    enmy.sprite.x -= enmy.speedx*dt ;
                } else {
                    if (!enmy.appeared) {
                        enmy.pending -= dt ;
                        if (enmy.pending <= 0) {
                            enmy.appeared = true ;
                        } ;
                    } else {
                        enmy.sprite.x -= enmy.speedx*dt ;
                    };
                    if (this.type == "wave") {
                        if (enmy.appeared) {
                            if (this.y >= midy) {
                                if (!enmy.switcher) {
                                    enmy.sprite.y -= enmy.speedy*dt ;
                                    if (enmy.sprite.y <= topy) {
                                        enmy.sprite.y = topy ;
                                        enmy.switcher = true ;
                                    } ;
                                } else {
                                    enmy.sprite.y += enmy.speedy*dt ;
                                    if (enmy.sprite.y >= boty) {
                                        enmy.sprite.y = boty ;
                                        enmy.switcher = false ;
                                    } ;
                                } ;
                            } else {
                                if (!enmy.switcher) {
                                    enmy.sprite.y += enmy.speedy*dt ;
                                    if (enmy.sprite.y >= boty) {
                                        enmy.sprite.y = boty ;
                                        enmy.switcher = true ;
                                    } ;
                                } else {
                                    enmy.sprite.y -= enmy.speedy*dt ;
                                    if (enmy.sprite.y <= topy) {
                                        enmy.sprite.y = topy ;
                                        enmy.switcher = false ;
                                    } ;
                                } ;
                            } ;
                        } ;
                    } ;
                } ;
            }) ;
        } ;

    } ;


} ;

//
//-----------------------------------------------------------------------------------
//

class WavesManager {

    constructor() {

        this.waves = [] ;

    } ;

    load() {

        // References enemys sprites for cloning
        gensprite("enemy1", "enemy1") ;
        gensprite("enemy2", "enemy2") ;
        gensprite("enemy3", "enemy3") ;

    } ;

    addWave(pWv) {
        this.waves.push(pWv) ;
    } ;

    startWave(pWv) {
        pWv.done = true ;
        if (pWv.type == "single") {
            let sprt = new Sprites(pWv.img) ;
            Object.assign(sprt, pWv.sprite) ;
            sprt.addAnim("swell", [1,2,1,0], rand(15,25)/100, true) ;
            sprt.playAnim("swell") ;
            let enmy = new Enemys(pWv.level, sprt) ;
            enmy.sprite.x = pWv.x ;
            enmy.sprite.y = pWv.y ;
            enmy.moove = pWv.number ;
            pWv.enemys.push(enmy) ;
            if (pWv.number == 1) {
                effsmanager.playClonedSound("bell") ;
            } ;
        } else {
            for (let n = 0 ; n < pWv.number ; n++) {
                let sprt = new Sprites(pWv.img) ;
                Object.assign(sprt, pWv.sprite) ;
                sprt.addAnim("swell", [1,2,1,0], rand(15,25)/100, true) ;
                sprt.playAnim("swell") ;
                let enmy = new Enemys(pWv.level, sprt) ;
                enmy.sprite.x = pWv.x ;
                switch (pWv.type) {
                    case "line" :
                        enmy.sprite.y = lane(n+1, pWv.number) ;
                        break ;
                    case "wave" :
                        enmy.sprite.y = pWv.y ;
                        enmy.pending += pWv.dt*n ;
                        break ;
                    case "obliqueup" :
                        enmy.sprite.y = lane(n+1, pWv.number) ;
                        enmy.pending += pWv.dt*n ;
                        break ;
                    case "obliquedown" :
                        enmy.sprite.y = lane(n+1, pWv.number) ;
                        enmy.pending += (pWv.number-n-1)*pWv.dt ;
                        break ;
                } ;
                pWv.enemys.push(enmy) ;
            } ;
        };
    } ;

    update(dt) {

        for (let e = this.waves.length-1 ; e >= 0 ; e--) {

            let wv = this.waves[e] ;

            if (bg.scrolldist >= wv.startdist && level == wv.level && !wv.done) {
                this.startWave(wv) ;
            } ;

            if (wv.done) {

                for (let n = wv.enemys.length-1; n>=0; n--) {

                    let enmy = wv.enemys[n] ;

                    // Enemys shoots
                    if (enmy.appeared) {
                        enmy.shttimer -= dt ;
                        if (enmy.shttimer <= 0) {
                            bullsmanager.genBullet("opponent", enmy.sprite.x-20, enmy.sprite.y+50) ;
                            switch (enmy.type) {
                                case 1 :
                                    effsmanager.startEffect("firanimenmy1", enmy.sprite.x-61, enmy.sprite.y+17, enmy) ;
                                    enmy.shttimer = (rand(175,226))/100 ;
                                    break ;
                                case 2 :
                                    effsmanager.startEffect("firanimenmy2", enmy.sprite.x-64, enmy.sprite.y+13, enmy) ;
                                    enmy.shttimer = (rand(125,176))/100 ;
                                    break ;
                                case 3 :
                                    effsmanager.startEffect("firanimenmy3", enmy.sprite.x-62, enmy.sprite.y+21, enmy) ;
                                    enmy.shttimer = (rand(75,126))/100 ;
                                    break ;
                            } ;
                            let rdn = rand(0,3) ;
                            if (rdn == 0 || rdn == 1) {
                                effsmanager.replaySound("fire_enemy") ;
                            } else if (rdn == 2) {
                                effsmanager.playClonedSound("fire_enemy") ;
                            } ;
                        } ;
                    } ;

                    // Delete after limits
                    if (enmy.sprite.x <= -200) {
                        wv.enemys.splice(n, 1) ;
                    } ;

                } ;

                // Delete empty waves
                if (wv.enemys.length == 0) {
                    this.waves.splice(e, 1) ;
                } else {
                    wv.update(dt) ;
                } ;

            } ;
        } ;

    } ;

    loadLevels() {

        // Level 1
        bg.addCase(1)
        //
        wvsmanager.addWave(new Waves(1, (Width*2)+200, "single", 0, lane(2,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*2)+800, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*3)+200, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*3)+800, "single", 0, lane(4,4))) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*4)+200, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*4)+600, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*4)+1000, "single", 0, lane(4,4))) ;
        wvsmanager.addWave(new Waves(1, (Width*5)+200, "single", 0, lane(2,4))) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*5)+600, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(1, (Width*5)+1000, "wave", 2, midy+1, 1)) ;
        wvsmanager.addWave(new Waves(1, (Width*6)+400, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(1, (Width*6)+600, "wave", 2, midy-1, 1)) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*7), "obliquedown", 3, 0, 1)) ;
        wvsmanager.addWave(new Waves(1, (Width*7)+800, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(1, (Width*8), "obliqueup", 3, 0, 1)) ;
        wvsmanager.addWave(new Waves(1, (Width*8)+800, "single", 1, midy)) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*8)+1000, "wave", 2, midy-1, 1)) ;
        wvsmanager.addWave(new Waves(1, (Width*9)+50, "wave", 2, midy+1, 1)) ;
        wvsmanager.addWave(new Waves(1, (Width*9)+450, "line", 3)) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*9)+1100, "single", 0, lane(1,5))) ;
        wvsmanager.addWave(new Waves(1, (Width*9)+1100, "single", 0, lane(3,5))) ;
        wvsmanager.addWave(new Waves(1, (Width*9)+1100, "single", 0, lane(5,5))) ;
        wvsmanager.addWave(new Waves(1, (Width*10), "single", 0, lane(2,5))) ;
        wvsmanager.addWave(new Waves(1, (Width*10), "single", 0, lane(4,5))) ;
        //
        wvsmanager.addWave(new Waves(1, (Width*10)+600, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(1, (Width*10)+800, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(1, (Width*11), "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(1, (Width*11)+200, "single", 1, boty)) ;

        // Level 2
        bg.addCase(2)
        //
        wvsmanager.addWave(new Waves(2, (Width*2)+200, "single", 0, lane(2,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*2)+800, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*3)+200, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*3)+800, "single", 0, lane(4,4))) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*4)+200, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*4)+300, "single", 0, lane(2,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*4)+600, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*4)+700, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*4)+1000, "single", 0, lane(4,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*4)+1100, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*5)+200, "single", 0, lane(2,4))) ;
        wvsmanager.addWave(new Waves(2, (Width*5)+300, "single", 0, lane(3,4))) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*5)+600, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(2, (Width*5)+1000, "wave", 4, midy+1, 0.8)) ;
        wvsmanager.addWave(new Waves(2, (Width*6)+400, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(2, (Width*6)+600, "wave", 4, midy-1, 0.8)) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*7), "obliquedown", 4, 0, 0.8)) ;
        wvsmanager.addWave(new Waves(2, (Width*7)+800, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(2, (Width*8), "obliqueup", 4, 0, 0.8)) ;
        wvsmanager.addWave(new Waves(2, (Width*8)+800, "single", 1, midy)) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*8)+1000, "wave", 4, midy-1, 0.8)) ;
        wvsmanager.addWave(new Waves(2, (Width*9)+250, "wave", 4, midy+1, 0.8)) ;
        wvsmanager.addWave(new Waves(2, (Width*9)+800, "line", 4)) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*10)+200, "single", 0, lane(1,5))) ;
        wvsmanager.addWave(new Waves(2, (Width*10)+200, "single", 0, lane(3,5))) ;
        wvsmanager.addWave(new Waves(2, (Width*10)+200, "single", 0, lane(5,5))) ;
        wvsmanager.addWave(new Waves(2, (Width*10)+300, "single", 0, lane(2,5))) ;
        wvsmanager.addWave(new Waves(2, (Width*10)+300, "single", 0, lane(4,5))) ;
        //
        wvsmanager.addWave(new Waves(2, (Width*10)+900, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(2, (Width*10)+1100, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(2, (Width*11)+300, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(2, (Width*11)+500, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(2, (Width*11)+900, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(2, (Width*12), "single", 1, boty)) ;

        // Level 3
        bg.addCase(3)
        //
        wvsmanager.addWave(new Waves(3, (Width*2)+200, "single", 0, lane(2,4))) ;
        wvsmanager.addWave(new Waves(3, (Width*2)+800, "single", 0, lane(3,4))) ;
        wvsmanager.addWave(new Waves(3, (Width*3)+200, "single", 0, lane(1,4))) ;
        wvsmanager.addWave(new Waves(3, (Width*3)+800, "single", 0, lane(4,4))) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*4)+200, "single", 0, lane(3,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+300, "single", 0, lane(2,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+400, "single", 0, lane(5,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+600, "single", 0, lane(1,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+700, "single", 0, lane(3,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+800, "single", 0, lane(6,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+1000, "single", 0, lane(4,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*4)+1100, "single", 0, lane(1,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*5), "single", 0, lane(5,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*5)+200, "single", 0, lane(2,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*5)+300, "single", 0, lane(3,6))) ;
        wvsmanager.addWave(new Waves(3, (Width*5)+400, "single", 0, lane(6,6))) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*5)+600, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(3, (Width*5)+1000, "wave", 6, midy+1, 0.7)) ;
        wvsmanager.addWave(new Waves(3, (Width*6)+400, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(3, (Width*6)+600, "wave", 6, midy-1, 0.7)) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*7)+200, "obliquedown", 6, 0, 0.6)) ;
        wvsmanager.addWave(new Waves(3, (Width*7)+800, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(3, (Width*8), "obliqueup", 6, 0, 0.6)) ;
        wvsmanager.addWave(new Waves(3, (Width*8)+800, "single", 1, midy)) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*8)+1000, "wave", 6, midy-1, 0.6)) ;
        wvsmanager.addWave(new Waves(3, (Width*9)+350, "wave", 6, midy+1, 0.6)) ;
        wvsmanager.addWave(new Waves(3, (Width*9)+1100, "line", 6)) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*10)+400, "single", 0, lane(1,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+400, "single", 0, lane(3,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+400, "single", 0, lane(5,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+400, "single", 0, lane(7,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+500, "single", 0, lane(2,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+500, "single", 0, lane(4,7))) ;
        wvsmanager.addWave(new Waves(3, (Width*10)+500, "single", 0, lane(6,7))) ;
        //
        wvsmanager.addWave(new Waves(3, (Width*10)+1100, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+100, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+300, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+600, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+800, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+1000, "single", 1, midy)) ;
        wvsmanager.addWave(new Waves(3, (Width*11)+1100, "single", 1, topy)) ;
        wvsmanager.addWave(new Waves(3, (Width*12)+100, "single", 1, boty)) ;
        wvsmanager.addWave(new Waves(3, (Width*12)+400, "single", 1, midy)) ;

    } ;

} ;