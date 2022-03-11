class Ship {

    constructor() {

        this.sprite = null ;
        this.dist = 0 ;
        this.points = 0 ;
        this.score = 0 ;

        this.speedx = 150 ;
        this.speedy = 250 ;
        this.acc_u = 0 ;
        this.acc_d = 0 ;
        this.acc_r = 0 ;
        this.acc_l = 0 ;
        this.iner = 4 ;

        this.level = 0 ;
        this.reload = true ;
        this.rldtimer = 0 ;
        this.shttimer = 0 ;
        this.nshoots = 0 ;

        this.life = 10 ;
        this.dead = false ;
        this.deathtimer = 0 ;
        this.deathswitcher = 0 ;
        this.won = false ;


    } ;

    //
    //-----------------------------------------------------------------------------------
    //

    load() {

        // Ship sprites
        gensprite("ship0", "ship0", -300, (Height/2)-50) ;
        sprites.ship0.addAnim("swell_min",[4,3,2,3], 0.3, true) ;
        sprites.ship0.addAnim("swell_slow",[2,3,2,1], 0.2, true) ;
        sprites.ship0.addAnim("swell_max",[0,1,2,1], 0.1, true) ;
        gensprite("ship1", "ship1", -300, (Height/2)-50) ;
        sprites.ship1.addAnim("swell_min",[4,3,2,3], 0.3, true) ;
        sprites.ship1.addAnim("swell_slow",[2,3,2,1], 0.2, true) ;
        sprites.ship1.addAnim("swell_max",[0,1,2,1], 0.1, true) ;
        gensprite("ship2", "ship2", -300, (Height/2)-50) ;
        sprites.ship2.addAnim("swell_min",[4,3,2,3], 0.3, true) ;
        sprites.ship2.addAnim("swell_slow",[2,3,2,1], 0.2, true) ;
        sprites.ship2.addAnim("swell_max",[0,1,2,1], 0.1, true) ;
        gensprite("ship3", "ship3", -300, (Height/2)-50) ;
        sprites.ship3.addAnim("swell_min",[4,3,2,3], 0.3, true) ;
        sprites.ship3.addAnim("swell_slow",[2,3,2,1], 0.2, true) ;
        sprites.ship3.addAnim("swell_max",[0,1,2,1], 0.1, true) ;
        this.sprite = sprites.ship0 ;

    } ;

    lvlup() {
        this.level ++ ;
        switch(this.level) {
            case 1 :
                sprites.ship1.x = this.sprite.x ;
                sprites.ship1.y = this.sprite.y ;
                this.sprite = sprites.ship1 ;
                break ;
            case 2 :
                sprites.ship2.x = this.sprite.x ;
                sprites.ship2.y = this.sprite.y ;
                this.sprite = sprites.ship2 ;
                break ;
            case 3 :
                sprites.ship3.x = this.sprite.x ;
                sprites.ship3.y = this.sprite.y ;
                this.sprite = sprites.ship3 ;
                break ;
        } ;
    } ;

    //
    //-----------------------------------------------------------------------------------
    //

    update(dt) {

        let shp = this.sprite ;

        // General ship animation
        this.sprite.update(dt)

        // Starting ship animation
        if (displmanager.state == "menu" || displmanager.state == "relaunching") {
            shp.playAnim("swell_max") ;
        } ;
            
        if (displmanager.state == "ingame" && !this.dead) {

            // Travelled distance and score
            this.dist = (Math.floor(bg.ttscrolldist))/10 ;
            this.score = this.points + (Math.round(this.dist/100)*2) ;
            if (ship.dead) {
                this.dist = Math.round(ship.dist) ;
            } ;

            // Mooves controls
                // Up
            if (tZ && !tS) {
                this.acc_u += this.iner*dt ;
                if (this.acc_u >= 1) {
                    this.acc_u = 1 ;
                } ;
                shp.y -= this.speedy*this.acc_u*dt ;
            } else {
                this.acc_u -= this.iner*dt ;
                if (this.acc_u <= 0) {
                    this.acc_u = 0 ;
                } ;
                shp.y -= this.speedy*this.acc_u*dt ;
            } ;
                // Down
            if (tS && !tZ) {
                this.acc_d += this.iner*dt ;
                if (this.acc_d >= 1) {
                    this.acc_d = 1 ;
                } ;
                shp.y += this.speedy*this.acc_d*dt ;
            } else {
                this.acc_d -= this.iner*dt ;
                if (this.acc_d <= 0) {
                    this.acc_d = 0 ;
                } ;
                shp.y += this.speedy*this.acc_d*dt ;
            } ;
                // Right
            if (tD && !tQ) {
                shp.playAnim("swell_max") ;
                this.acc_r += this.iner*dt ;
                if (this.acc_r >= 1) {
                    this.acc_r = 1 ;
                } ;
                shp.x += this.speedx*this.acc_r*dt ;
            } else {
                this.acc_r -= this.iner*dt ;
                if (this.acc_r <= 0) {
                    this.acc_r = 0 ;
                } ;
                shp.x += this.speedx*this.acc_r*dt ;
            } ;
                // Left
            if (tQ && !tD) {
                shp.playAnim("swell_min") ;
                this.acc_l += this.iner*dt ;
                if (this.acc_l >= 1) {
                    this.acc_l = 1 ;
                } ;
                shp.x -= this.speedx*this.acc_l*dt ;
            } else {
                this.acc_l -= this.iner*dt ;
                if (this.acc_l <= 0) {
                    this.acc_l = 0 ;
                } ;
                shp.x -= this.speedx*this.acc_l*dt ;
            } ;
                // No horizontals keys animation
            if (!tQ && !tD) {
                shp.playAnim("swell_slow") ;
            } ;

            // Mooves limits
                // Up/down
            if (shp.y <= topy) {
                shp.y = topy ;
            } else if (shp.y >= boty) {
                shp.y = boty ;
            } ;
                // Right/left
            if (shp.x >= Width-shp.w+10) {
                shp.x = Width-shp.w+10 ;
            } else if (shp.x <= 0-30) {
                shp.x = 0-30 ;
            } ;
        
            // Shoots
            if (tSpc || this.nshoots>0) {
                if (this.reload) {
                    switch (ship.level) {
                        case 0 :
                            effsmanager.playClonedSound("trigger") ;
                            this.reload = false ;
                            break ;
                        case 1 :
                            bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                            effsmanager.startEffect("firanimshp1", shp.x+59, shp.y+10, "ship") ;
                            effsmanager.playClonedSound("trigger") ;
                            effsmanager.playClonedSound("fire_player") ;
                            this.reload = false ;
                            break ;
                        case 2 :
                            this.shttimer += dt ;
                            switch (this.nshoots) {
                                case 0 :
                                    bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                    effsmanager.startEffect("firanimshp2", shp.x+69, shp.y+7, "ship") ;
                                    effsmanager.playClonedSound("trigger") ;
                                    effsmanager.playClonedSound("fire_player") ;
                                    this.nshoots ++ ;
                                    break ;
                                case 1 :
                                    if (this.shttimer >= 0.1) {
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                        effsmanager.startEffect("firanimshp2", shp.x+69, shp.y+7, "ship") ;
                                        effsmanager.playClonedSound("trigger") ;
                                        effsmanager.playClonedSound("fire_player") ;
                                        this.nshoots ++ ;
                                        this.shttimer = 0 ;
                                    } ;
                                    break ;
                                case 2 :
                                    if (this.shttimer >= 0.1) {
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                        effsmanager.startEffect("firanimshp2", shp.x+69, shp.y+7, "ship") ;
                                        effsmanager.playClonedSound("trigger") ;
                                        effsmanager.playClonedSound("fire_player") ;
                                        this.nshoots ++ ;
                                        this.shttimer = 0 ;
                                    } ;
                                    break ;
                            } ;
                            if (this.nshoots >= 3) {
                                this.reload = false ;
                                this.nshoots = 0 ;
                                this.shttimer = 0 ;
                            } ;
                            break ;
                        case 3 :
                            this.shttimer += dt ;
                            switch (this.nshoots) {
                                case 0 :
                                    bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 1) ;
                                    bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                    bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 2) ;
                                    effsmanager.startEffect("firanimshp3", shp.x+97, shp.y+2, "ship") ;
                                    effsmanager.playClonedSound("trigger") ;
                                    effsmanager.playClonedSound("heavyfire_player") ;
                                    this.nshoots ++ ;
                                    break ;
                                case 1 :
                                    if (this.shttimer >= 0.1) {
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 1) ;
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 2) ;
                                        effsmanager.startEffect("firanimshp3", shp.x+95, shp.y+2, "ship") ;
                                        effsmanager.playClonedSound("trigger") ;
                                        effsmanager.playClonedSound("heavyfire_player") ;
                                        this.nshoots ++ ;
                                        this.shttimer = 0 ;
                                    } ;
                                    break ;
                                case 2 :
                                    if (this.shttimer >= 0.1) {
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 1) ;
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48) ;
                                        bullsmanager.genBullet("player", ship.sprite.x+ship.sprite.w, ship.sprite.y+48, 2) ;
                                        effsmanager.startEffect("firanimshp3", shp.x+95, shp.y+2, "ship") ;
                                        effsmanager.playClonedSound("trigger") ;
                                        effsmanager.playClonedSound("heavyfire_player") ;
                                        this.nshoots ++ ;
                                        this.shttimer = 0 ;
                                    } ;
                                    break ;
                            } ;
                            if (this.nshoots >= 3) {
                                this.reload = false ;
                                this.nshoots = 0 ;
                                this.shttimer = 0 ;
                            } ;
                            break ;
                    } ;
                } ;
            } ;
        } ;

        // Reload
        if (!this.reload) {
            this.rldtimer += dt ;
            if (this.rldtimer >= 0.3) {
                this.reload = true ;
                this.rldtimer = 0 ;
            } ;
        } ;

        // Death
        if (displmanager.state == "ingame") {
            if (this.life <= 0) {
                this.life = 0 ;
                this.dead = true ;
                if (this.deathswitcher == 0) {
                    this.death() ;
                } ;
                if (rsrcsloader.getSnd("jument_de_michao").volume >= 0.12) {
                    rsrcsloader.getSnd("jument_de_michao").volume -= dt/4 ;
                } else {
                    rsrcsloader.getSnd("jument_de_michao").volume = 0 ;
                } ;
                this.deathtimer += dt ;
                if (this.deathtimer >= 2) {
                    if (!effsmanager.getPlayed("game_over")){
                        effsmanager.playSound("game_over") ;
                    } ;
                } ;
                if (this.deathtimer >= 5) {
                    displmanager.state = "gameover" ;
                    displmanager.step = 0 ;
                    this.deathtimer = 0 ;
                    rsrcsloader.getSnd("jument_de_michao").volume = 0.4 ;
                    effsmanager.stopSound("jument_de_michao") ;
                } ;
            } ;
        } ;

    } ;

    //
    //-----------------------------------------------------------------------------------
    //

    draw(pCtx) {

        if (!ship.dead) {
            this.sprite.draw(pCtx) ;
        } ;

    } ;

    //
    //-----------------------------------------------------------------------------------
    //

    death() {

        this.deathswitcher ++ ;
        effsmanager.stopSound("engine_on") ;
        effsmanager.playClonedSound("crash") ;
        effsmanager.playClonedSound("engine_shutdown") ;
        effsmanager.startDebris(15, 0.2, this.sprite.x+50, this.sprite.y+69, "ship") ;
        effsmanager.startDebris(20, 0.35, this.sprite.x+58, this.sprite.y+69, "ship") ;
        switch (this.level) {
            case 0 :
                effsmanager.startEffect("ship0death", this.sprite.x, this.sprite.y) ;
                break ;
            case 1 :
                effsmanager.startEffect("ship1death", this.sprite.x, this.sprite.y) ;
                break ;
            case 2 :
                effsmanager.startEffect("ship2death", this.sprite.x, this.sprite.y) ;
                break ;
            case 3 :
                effsmanager.startEffect("ship3death", this.sprite.x, this.sprite.y) ;
                break ;
        } ;

    } ;

} ;