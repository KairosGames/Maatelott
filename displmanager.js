class DisplayManager {


    constructor() {

        this.state = "launcher" ;
        this.alpha = 0 ;
        this.timer = 0 ;
        this.step = 0 ;
        this.switcher = false ;

        this.choice = false ;
        this.choiceswitcher = false ;

        this.alphadisplayIG = 0 ;
        this.liferatio = ship.life ;
        this.lifeswitcher = false ;

        this.np1 = 0 ;
        this.np2 = 0 ;
        this.np3 = 0 ;
        this.nd1 = 0 ;
        this.nd2 = 0 ;
        this.nd3 = 0 ;
        this.nd4 = 0 ;

    } ;


    load() {

        gensprite("launch", "launch") ;
        gensprite("title", "title", Width/2, Height/2, 0, 0) ;
        gensprite("credits", "credits") ;
        gensprite("play", "play") ;
        gensprite("controls", "controls") ;
        gensprite("weapon0", "weapon0") ;
        gensprite("weapon1", "weapon1") ;
        gensprite("weapon2", "weapon2") ;
        gensprite("weapon3", "weapon3") ;
        gensprite("assets", "assets") ;
        gensprite("level", "level") ;
        gensprite("level1", "level1", Width/2, Height/2, 0, 0) ;
        gensprite("level2", "level2", Width/2, Height/2, 0, 0) ;
        gensprite("level3", "level3", Width/2, Height/2, 0, 0) ;
        gensprite("flag1", "flag1", 537, 198) ;
        gensprite("flag2", "flag2", 537, 198) ;
        gensprite("flag3", "flag3", 537, 198) ;
        gensprite("victory", "victory") ;
        gensprite("gameover", "gameover") ;
        gensprite("score", "score") ;
        gensprite("retrymenu", "retrymenu") ;

    } ;


    update(dt) {


        // Launcher
        if (this.state == "launcher") {

            if (bClic) {
                this.state = "menu" ;
            } ;

        } ;
    

        // Menu
        if (this.state == "menu") {

            // Before choice phase
            if (this.step == 0) {

                this.timer += dt ;
                this.alpha += dt/6 ;

                if (!effsmanager.getPlayed("sea_vibe")) {
                    effsmanager.playSound("sea_vibe") ;
                } ;

                if (this.timer < 0.4/(1/6)) {
                    effsmanager.setVolume("sea_vibe", this.alpha) ;
                } else {
                    effsmanager.setVolume("sea_vibe", 0.4) ;
                } ;

                if (this.alpha >= 1) {
                    this.alpha = 1 ;
                } ;

                if (this.timer >= 8) {
                    sprites.title.alpha += dt*4 ;
                    sprites.title.x -= 600*dt*4 ;
                    sprites.title.y -= 300*dt*4 ;
                    sprites.title.scx += dt*4 ;
                    sprites.title.scy += dt*4 ;
                    if (!effsmanager.getPlayed("kaamelott")) {
                        effsmanager.playSound("kaamelott") ;
                    } ;
                    if (sprites.title.alpha >= 1) {
                        sprites.title.alpha = 1 ;
                    } ;
                    if (sprites.title.scx >= 1) {
                        sprites.title.scx = 1 ;
                    } ;
                    if (sprites.title.scy >= 1) {
                        sprites.title.scy = 1 ;
                    } ;
                    if (sprites.title.x <= 0) {
                        sprites.title.x = 0 ;
                    } ;
                    if (sprites.title.y <= 0) {
                        sprites.title.y = 0 ;
                    } ;
                } ;

                if (this.timer >= 9.2) {
                    sprites.credits.alpha += dt*4 ;
                    if (sprites.credits.alpha >= 1) {
                        sprites.credits.alpha = 1 ;
                    } ;
                } ;

                if (this.timer >= 9.9) {
                    rsrcsloader.getSnd("trimartolod").volume += dt ;
                    if (!effsmanager.getPlayed("trimartolod")) {
                        effsmanager.playSound("trimartolod", 11.5) ;
                    } ;
                    if (rsrcsloader.getSnd("trimartolod").volume >= 0.8) {
                        rsrcsloader.getSnd("trimartolod").volume = 0.8 ;
                    } ;
                } ;

                if (this.timer >= 19.9) {
                    sprites.play.alpha += dt ;
                    if (sprites.play.alpha >= 1) {
                        sprites.play.alpha = 1 ;
                        this.choice = true ;
                        this.timer = 0 ;
                        effsmanager.setNotPlayed("kaamelott") ;
                        this.step ++ ;
                    } ;
                } ;

            } ;

            // Choice phase
            if (this.choice) {

                if(mouseX >= 517 && mouseX <= 687 && mouseY >= 388 && mouseY <= 447) {
                    if (!this.choiceswitcher) {
                        effsmanager.replaySound("select") ;
                        this.choiceswitcher = true ;
                    } ;
                    if (bClic) {
                        effsmanager.replaySound("choice") ;
                        this.choice = false ;
                        this.choiceswitcher = false ;
                        this.step ++ ;
                    } ;
                } else {
                    this.choiceswitcher = false ;
                } ;

            } ;

            // After choice phase
            if (this.step == 2) {

                this.timer += dt ;
                sprites.title.alpha -= dt ;
                sprites.credits.alpha -= dt ;
                sprites.play.alpha -= dt ;

                if ( sprites.title.alpha <= 0) {
                    sprites.title.alpha = 0 ;
                    sprites.title.x = Width/2 ;
                    sprites.title.y = Height/2 ;
                    sprites.title.setScale(0,0) ;
                } ;

                if ( sprites.credits.alpha <= 0) {
                    sprites.credits.alpha = 0 ;
                } ;

                if ( sprites.play.alpha <= 0) {
                    sprites.play.alpha = 0 ;
                } ;

                if ( rsrcsloader.getSnd("trimartolod").volume > 0.1) {
                    rsrcsloader.getSnd("trimartolod").volume -= dt/4 ;
                } else {
                    rsrcsloader.getSnd("trimartolod").volume = 0 ;
                } ;

                if (this.timer >= 5 && this.timer < 8) {
                    sprites.controls.alpha += dt ;
                    if (!effsmanager.getPlayed("foghorn")) {
                        effsmanager.playSound("foghorn") ;
                    } ;
                    if (sprites.controls.alpha >= 1) {
                        sprites.controls.alpha = 1 ;
                    } ;
                } ;
                
                if (this.timer >= 12) {
                    if (!effsmanager.getPlayed("engine_ignition")) {
                        effsmanager.playSound("engine_ignition") ;
                    } ;
                } ;

                if (this.timer >= 13) {
                    sprites.controls.alpha -= dt ;
                    if (sprites.controls.alpha <= 0) {
                        sprites.controls.alpha = 0 ;
                    } ;
                } ;

                if (this.timer >= 22.5) {
                    if (!effsmanager.getPlayed("engine_on")) {
                        effsmanager.playSound("engine_on") ;
                    } ;
                    ship.sprite.x += 100*dt ;
                    if  (ship.sprite.x >= Width/4) {
                        ship.sprite.x = Width/4 ;
                        this.state = "ingame" ;
                        this.timer = 0 ;
                        this.step = 0 ;
                    } ;
                } ;

            } ;

        } ;


        // In game
        if (this.state == "ingame") {

            // Life display
            if (this.liferatio > ship.life) {
                this.liferatio -= 4*dt ;
                if (this.liferatio <= ship.life) {
                    this.liferatio = ship.life ;
                } ;
            } ;


            // Ship death
            if (ship.life <= 0 && this.liferatio <= 3) {
                this.alphadisplayIG -= dt ;
                sprites.flag1.alpha -= dt ;
                sprites.flag2.alpha -= dt ;
                sprites.flag3.alpha -= dt ;
                sprites.level.alpha -= dt ;
                sprites.level1.alpha -= dt ;
                sprites.level2.alpha -= dt ;
                sprites.level3.alpha -= dt ;
                if (this.alphadisplayIG <= 0) {
                    this.alphadisplayIG = 0 ;
                } ;
                if (sprites.flag1.alpha <= 0) {
                    sprites.flag1.alpha
                } ;
                if (sprites.flag2.alpha <= 0) {
                    sprites.flag2.alpha = 0 ;
                } ;
                if (sprites.flag3.alpha <= 0) {
                    sprites.flag3.alpha = 0 ;
                } ;
                if (sprites.level.alpha <= 0) {
                    sprites.level.alpha = 0 ;
                } ;
                if (sprites.level1.alpha <= 0) {
                    sprites.level1.alpha = 0 ;
                } ;
                if (sprites.level2.alpha <= 0) {
                    sprites.level2.alpha = 0 ;
                } ;
                if (sprites.level3.alpha <= 0) {
                    sprites.level3.alpha = 0 ;
                } ;
            } ;
            if (ship.dead) {
                this.nd4 = Math.round(this.nd4) ;
            } ;

            // Low life sound
            if (this.liferatio <= 2 && this.liferatio > 0 && ship.life > 0) {
                if (!this.lifeswitcher) {
                    effsmanager.playSound("lowhp") ;
                    this.lifeswitcher = true ;
                }
            } else {
                effsmanager.stopSound("lowhp") ;
                this.switcher = false ;
            } ;

            // Score display
                // Points
            this.np1 = Math.floor(ship.points/100) ;
            this.np2 = Math.floor((ship.points-(this.np1*100))/10) ;
            this.np3 = ship.points-(this.np1*100)-(this.np2*10) ;
                // Travelled distance
            this.nd1 = Math.floor(ship.dist/1000) ;
            this.nd2 = Math.floor((ship.dist-(this.nd1*1000))/100) ;
            this.nd3 = Math.floor((ship.dist-(this.nd1*1000)-(this.nd2*100))/10) ;
            this.nd4 = ship.dist-(this.nd1*1000)-(this.nd2*100)-(this.nd3*10) ;

            if (this.step == 0) {

                // In game display
                if(!ship.dead) {
                    this.alphadisplayIG += dt ;
                    if ( this.alphadisplayIG >= 1) {
                        this.alphadisplayIG = 1 ;
                    } ;
                } ;

                if (level == 0 && bg.scrolldist >= Width+300) {

                    this.timer += dt ;

                    if (this.timer >= 0 && this.timer < 1.2) {
                        sprites.level1.alpha += dt*4 ;
                        sprites.level1.x -= 600*dt*4 ;
                        sprites.level1.y -= 300*dt*4 ;
                        sprites.level1.scx += dt*4 ;
                        sprites.level1.scy += dt*4 ;
                        if (!effsmanager.getPlayed("kaamelott")) {
                            effsmanager.playSound("kaamelott") ;
                        } ;
                        if (sprites.level1.alpha >= 1) {
                            sprites.level1.alpha = 1 ;
                        } ;
                        if (sprites.level1.scx >= 1) {
                            sprites.level1.scx = 1 ;
                        } ;
                        if (sprites.level1.scy >= 1) {
                            sprites.level1.scy = 1 ;
                        } ;
                        if (sprites.level1.x <= 0) {
                            sprites.level1.x = 0 ;
                        } ;
                        if (sprites.level1.y <= 0) {
                            sprites.level1.y = 0 ;
                        } ;
                    } ;

                    if (this.timer >= 1.2 && this.timer < 2.2) {
                        sprites.flag1.alpha += dt*4 ;
                        if (sprites.flag1.alpha >= 1) {
                            sprites.flag1.alpha = 1 ;
                        } ;
                    } ;

                    if (this.timer >= 2.2) {
                        sprites.level1.alpha -= dt ;
                        if (sprites.level1.alpha <= 0) {
                            sprites.level1.alpha = 0 ;
                            sprites.level1.x = Width/2 ;
                            sprites.level1.y = Height/2 ;
                            sprites.level1.setScale(0,0) ;
                        } ;
                        sprites.flag1.x += 582*dt*2 ;
                        sprites.flag1.y += 347*dt*2 ;
                        sprites.flag1.scx -= dt ;
                        sprites.flag1.scy -= dt ;
                        if (sprites.flag1.x >= 1119) {
                            sprites.flag1.x = 1119 ;
                        } ;
                        if (sprites.flag1.y >= 545) {
                            sprites.flag1.y = 545 ;
                        } ;
                        if (sprites.flag1.scx <= 0.5) {
                            sprites.flag1.scx = 0.5 ;
                        } ;
                        if (sprites.flag1.scy <= 0.5) {
                            sprites.flag1.scy = 0.5 ;
                        } ;
                    } ;

                    if (this.timer >= 2.7) {
                        sprites.level.alpha += dt*2 ;
                        if (sprites.level.alpha >= 1) {
                            sprites.level.alpha = 1 ;
                        } ;
                    } ;

                    if (this.timer >= 3.5) {
                        this.step ++ ;
                        effsmanager.setNotPlayed("kaamelott") ;
                        this.timer = 0 ;
                    } ;

                } ;
            
            } ;

            if (this.step == 1) {

                if (level == 1 && bg.scrolldist >= Width*13) {

                    this.timer += dt ;

                    if (this.timer >= 0 && this.timer < 1.2) {
                        sprites.level2.alpha += dt*4 ;
                        sprites.flag1.alpha -= dt ;
                        sprites.level2.x -= 600*dt*4 ;
                        sprites.level2.y -= 300*dt*4 ;
                        sprites.level2.scx += dt*4 ;
                        sprites.level2.scy += dt*4 ;
                        if (!effsmanager.getPlayed("kaamelott")) {
                            effsmanager.playSound("kaamelott") ;
                        } ;
                        if (sprites.level2.alpha >= 1) {
                            sprites.level2.alpha = 1 ;
                        } ;
                        if (sprites.level2.scx >= 1) {
                            sprites.level2.scx = 1 ;
                        } ;
                        if (sprites.level2.scy >= 1) {
                            sprites.level2.scy = 1 ;
                        } ;
                        if (sprites.level2.x <= 0) {
                            sprites.level2.x = 0 ;
                        } ;
                        if (sprites.level2.y <= 0) {
                            sprites.level2.y = 0 ;
                        } ;
                    } ;

                    if (this.timer >= 1.2 && this.timer < 2.2) {
                        if (sprites.flag1.alpha <= 0) {
                            sprites.flag1.alpha = 0 ;
                            sprites.flag1.x = 537 ;
                            sprites.flag1.y = 198 ;
                            sprites.flag1.setScale(1,1) ;
                        } ;
                        sprites.flag2.alpha += dt*4 ;
                        if (sprites.flag2.alpha >= 1) {
                            sprites.flag2.alpha = 1 ;
                        } ;
                    } ;

                    if (this.timer >= 2.2) {
                        sprites.level2.alpha -= dt ;
                        if (sprites.level2.alpha <= 0) {
                            sprites.level2.alpha = 0 ;
                            sprites.level2.x = Width/2 ;
                            sprites.level2.y = Height/2 ;
                            sprites.level2.setScale(0,0) ;
                        } ;
                        sprites.flag2.x += 582*dt*2 ;
                        sprites.flag2.y += 347*dt*2 ;
                        sprites.flag2.scx -= dt ;
                        sprites.flag2.scy -= dt ;
                        if (sprites.flag2.x >= 1119) {
                            sprites.flag2.x = 1119 ;
                        } ;
                        if (sprites.flag2.y >= 545) {
                            sprites.flag2.y = 545 ;
                        } ;
                        if (sprites.flag2.scx <= 0.5) {
                            sprites.flag2.scx = 0.5 ;
                        } ;
                        if (sprites.flag2.scy <= 0.5) {
                            sprites.flag2.scy = 0.5 ;
                        } ;
                    } ;

                    if (this.timer >= 3.5) {
                        this.step ++ ;
                        effsmanager.setNotPlayed("kaamelott") ;
                        this.timer = 0 ;
                    } ;

                } ;

            } ;

            if (this.step == 2) {

                if (level == 2 && bg.scrolldist >= Width*13+700) {

                    this.timer += dt ;

                    if (this.timer >= 0 && this.timer < 1.2) {
                        sprites.level3.alpha += dt*4 ;
                        sprites.flag2.alpha -= dt ;
                        sprites.level3.x -= 600*dt*4 ;
                        sprites.level3.y -= 300*dt*4 ;
                        sprites.level3.scx += dt*4 ;
                        sprites.level3.scy += dt*4 ;
                        if (!effsmanager.getPlayed("kaamelott")) {
                            effsmanager.playSound("kaamelott") ;
                        } ;
                        if (sprites.level3.alpha >= 1) {
                            sprites.level3.alpha = 1 ;
                        } ;
                        if (sprites.level3.scx >= 1) {
                            sprites.level3.scx = 1 ;
                        } ;
                        if (sprites.level3.scy >= 1) {
                            sprites.level3.scy = 1 ;
                        } ;
                        if (sprites.level3.x <= 0) {
                            sprites.level3.x = 0 ;
                        } ;
                        if (sprites.level3.y <= 0) {
                            sprites.level3.y = 0 ;
                        } ;
                    } ;

                    if (this.timer >= 1.2 && this.timer < 2.2) {
                        if (sprites.flag2.alpha <= 0) {
                            sprites.flag2.alpha = 0 ;
                            sprites.flag2.x = 537 ;
                            sprites.flag2.y = 198 ;
                            sprites.flag2.setScale(1,1) ;
                        } ;
                        sprites.flag3.alpha += dt*4 ;
                        if (sprites.flag3.alpha >= 1) {
                            sprites.flag3.alpha = 1 ;
                        } ;
                    } ;

                    if (this.timer >= 2.2) {
                        sprites.level3.alpha -= dt ;
                        if (sprites.level3.alpha <= 0) {
                            sprites.level3.alpha = 0 ;
                            sprites.level3.x = Width/2 ;
                            sprites.level3.y = Height/2 ;
                            sprites.level3.setScale(0,0) ;
                        } ;
                        sprites.flag3.x += 582*dt*2 ;
                        sprites.flag3.y += 347*dt*2 ;
                        sprites.flag3.scx -= dt ;
                        sprites.flag3.scy -= dt ;
                        if (sprites.flag3.x >= 1119) {
                            sprites.flag3.x = 1119 ;
                        } ;
                        if (sprites.flag3.y >= 545) {
                            sprites.flag3.y = 545 ;
                        } ;
                        if (sprites.flag3.scx <= 0.5) {
                            sprites.flag3.scx = 0.5 ;
                        } ;
                        if (sprites.flag3.scy <= 0.5) {
                            sprites.flag3.scy = 0.5 ;
                        } ;
                    } ;

                    if (this.timer >= 3.3) {
                        this.step ++ ;
                        effsmanager.setNotPlayed("kaamelott") ;
                        this.timer = 0 ;
                    } ;

                } ;

            } ;

            if (this.step == 3) {

                if (level == 3 && bg.scrolldist >= Width*13) {

                    this. timer += dt ;

                    ship.won = true ;
                    this.nd4 = Math.round(this.nd4) ;
                    effsmanager.stopSound("lowhp") ;
                    sprites.flag3.alpha -= dt ;
                    sprites.level.alpha -= dt ;
                    if (sprites.level.alpha <= 0) {
                        sprites.level.alpha = 0 ;
                    } ;
                    if (sprites.flag3.alpha <= 0) {
                        sprites.flag3.alpha = 0 ;
                        sprites.flag3.x = 537 ;
                        sprites.flag3.y = 198 ;
                        sprites.flag3.setScale(1,1) ;
                    } ;
                    if (rsrcsloader.getSnd("jument_de_michao").volume >= 0.1) {
                        rsrcsloader.getSnd("jument_de_michao").volume -= dt/6 ;
                    } else {
                        rsrcsloader.getSnd("jument_de_michao").volume = 0 ;
                        effsmanager.stopSound("jument_de_michao") ;
                    } ;

                    if (this.timer >= 4) {
                        this.alphadisplayIG -= dt/4
                        if (this.alphadisplayIG <= 0) {
                            this.alphadisplayIG = 0 ;
                        } ;
                    } ;

                    if (this.timer >= 11) {

                        this.state = "won" ;
                        this.timer = 0 ;
                        this.step = 0 ;
                        this.lifeswitcher = false ;
                        rsrcsloader.getSnd("jument_de_michao").volume = 0.4 ;
                        effsmanager.stopSound("jument_de_michao") ;

                    } ;

                } ;

            } ;

        } ;


        // Game won
        if (this.state == "won") {

            // Before choice phase
            if (this.step == 0) {

                ship.sprite.playAnim("swell_max") ;
                ship.sprite.x += 100*dt ;
                if (ship.sprite.x >= Width) {
                    if (rsrcsloader.getSnd("engine_on").volume >= 0.12) {
                        rsrcsloader.getSnd("engine_on").volume -= dt/6 ;
                    } else {
                        rsrcsloader.getSnd("engine_on").volume = 0 ;
                        this.timer += dt ;
                        if (this.timer >= 1) {
                            this.step ++ ;
                            rsrcsloader.getSnd("engine_on").volume = 0.3 ;
                            effsmanager.stopSound("engine_on") ;
                            this.timer = 0 ;
                        } ;
                    } ;
                } ;

            } ;

            if (this.step == 1) {

                ship.sprite.x = -300 ;
                ship.sprite.y = (Height/2)-50 ;

                if (!effsmanager.getPlayed("valsiau_de_san_andres")) {
                    effsmanager.playSound("valsiau_de_san_andres") ;
                } ;

                sprites.victory.alpha += dt*2 ;
                if (sprites.victory.alpha >= 1) {
                    sprites.victory.alpha = 1 ;
                }

                this.timer += dt ;

                if (this.timer >= 7) {
                    sprites.score.alpha += dt*2 ;
                    if (sprites.score.alpha >= 1) {
                        sprites.score.alpha = 1 ;
                    } ;
                } ;

                if (this.timer >= 21) {
                    sprites.retrymenu.alpha += dt*2
                    if (sprites.retrymenu.alpha >= 1) {
                        this.choice = true ;
                        this.step ++ ;
                        this.timer = 0 ;
                        sprites.retrymenu.alpha = 1 ;
                    } ;
                } ;

            } ;

            //Choice phase
            if (this.choice) {

                if((mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) || (mouseX >= 910 && mouseX <= 1087 && mouseY >= 362 && mouseY <= 436)) {
                    if (!this.choiceswitcher) {
                        effsmanager.replaySound("select") ;
                        this.choiceswitcher = true ;
                    } ;
                    if (bClic) {
                        effsmanager.replaySound("choice") ;
                        this.choice = false ;
                        this.choiceswitcher = false ;
                        this.step ++ ;
                        if (mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) {
                            this.switcher = true ;
                        } ;
                    } ;
                } else {
                    this.choiceswitcher = false ;
                } ; 

            } ;

            // After choice phase
            if (this.step == 3) {

                this.timer += dt ;
                sprites.victory.alpha -= dt*2 ;
                sprites.score.alpha -= dt*2 ;
                sprites.retrymenu.alpha -= dt*2 ;
                if (rsrcsloader.getSnd("valsiau_de_san_andres").volume >= 0.1) {
                    rsrcsloader.getSnd("valsiau_de_san_andres").volume -= dt/6 ;
                } else {
                    rsrcsloader.getSnd("valsiau_de_san_andres").volume = 0 ;
                } ;
                if (sprites.victory.alpha <= 0) {
                    sprites.victory.alpha = 0 ;
                } ;
                if (sprites.score.alpha <= 0) {
                    sprites.score.alpha = 0 ;
                } ;
                if (sprites.retrymenu.alpha <= 0) {
                    sprites.retrymenu.alpha = 0 ;
                } ;

                if (this.timer >= 4) {
                    if (!this.switcher) {
                        this.state = "menu" ;
                        this.timer = 5 ;
                    } else {
                        this.state = "relaunching" ;
                        this.switcher = false ;
                        this.timer = 0 ;
                    } ;
                    rsrcsloader.getSnd("valsiau_de_san_andres").volume = 0.6 ;
                    effsmanager.stopSound("valsiau_de_san_andres") ;
                    this.step = 0 ;
                    this.restartGame() ;
                } ;


            } ;

        } ;


        // Game relauched
        if (this.state == "relaunching") {

            this.timer += dt ;
            if (!effsmanager.getPlayed("engine_ignition")) {
                effsmanager.playSound("engine_ignition") ;
            } ;
            if (this.timer >= 10.5) {
                if (!effsmanager.getPlayed("engine_on")) {
                    effsmanager.playSound("engine_on") ;
                } ;
                ship.sprite.x += 100*dt ;
                    if  (ship.sprite.x >= Width/4) {
                        ship.sprite.x = Width/4 ;
                        this.state = "ingame" ;
                        this.timer = 0 ;
                    } ;
            } ;

        } ;


        // Game lost
        if (this.state == "gameover") {


            // Before choice phase
            if (this.step == 0) {

                this.timer += dt ;
                this.nd4 = Math.round(this.nd4) ;

                if (this.timer >= 5) {
                    sprites.gameover.alpha += dt ;
                    if (sprites.gameover.alpha >= 1) {
                        sprites.gameover.alpha = 1 ;
                    } ;
                } ;

                if (this.timer >= 5.5) {
                    if (!effsmanager.getPlayed("sadistic_laugh")) {
                        effsmanager.playSound("sadistic_laugh") ;
                    } ;
                } ;

                if (this.timer >= 8) {
                    sprites.score.alpha += dt*2 ;
                    if (sprites.score.alpha >= 1) {
                        sprites.score.alpha = 1 ;
                    } ;
                } ;

                if (this.timer >= 11) {
                    sprites.retrymenu.alpha += dt*2 ;
                    if (sprites.retrymenu.alpha >= 1) {
                        sprites.retrymenu.alpha = 1 ;
                    } ;
                } ;

                if (this.timer >= 11.5) {
                    this.step ++ ;
                    this.choice = true ;
                    this.timer = 0 ;
                } ;

            } ;


            // Choice Phase
            if (this.choice == true) {

                if((mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) || (mouseX >= 910 && mouseX <= 1087 && mouseY >= 362 && mouseY <= 436)) {
                    if (!this.choiceswitcher) {
                        effsmanager.replaySound("select") ;
                        this.choiceswitcher = true ;
                    } ;
                    if (bClic) {
                        effsmanager.replaySound("choice") ;
                        this.choice = false ;
                        this.choiceswitcher = false ;
                        this.step ++ ;
                        if (mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) {
                            this.switcher = true ;
                        } ;
                    } ;
                } else {
                    this.choiceswitcher = false ;
                } ; 

            } ;


            // After choice phase
            if (this.step == 2) {

                this.timer += dt ;
                sprites.gameover.alpha -= dt*2 ;
                sprites.score.alpha -= dt*2 ;
                sprites.retrymenu.alpha -= dt*2 ;
                if (sprites.gameover.alpha <= 0) {
                    sprites.gameover.alpha = 0 ;
                } ;
                if (sprites.score.alpha <= 0) {
                    sprites.score.alpha = 0 ;
                } ;
                if (sprites.retrymenu.alpha <= 0) {
                    sprites.retrymenu.alpha = 0 ;
                } ;

                if (this.timer >= 4) {
                    if (!this.switcher) {
                        this.state = "menu" ;
                        this.timer = 5 ;
                    } else {
                        this.state = "relaunching" ;
                        this.switcher = false ;
                        this.timer = 0 ;
                    } ;
                    this.step = 0 ;
                    this.restartGame() ;
                } ;

            } ;


        } ;


    } ;


    draw(pCtx) {
    

        // Launcher
        if (this.state =="launcher") {

            pCtx.globalAlpha = this.alpha ;
            pCtx.globalAlpha = 1 ;
            sprites.launch.draw(pCtx) ;
            pCtx.globalAlpha = this.alpha ;

        } ;
        

        // Menu
        if (this.state == "menu") {

            pCtx.globalAlpha = this.alpha ;
            pCtx.globalAlpha = sprites.title.alpha ;
            sprites.title.draw(pCtx) ;
            pCtx.globalAlpha = sprites.credits.alpha ;
            sprites.credits.draw(pCtx) ;
            pCtx.globalAlpha = sprites.play.alpha ;
            sprites.play.draw(pCtx) ;
            pCtx.globalAlpha = sprites.controls.alpha ;
            sprites.controls.draw(pCtx) ;
            pCtx.globalAlpha = this.alpha ;

            if (this.choice) {
                if(mouseX >= 517 && mouseX <= 687 && mouseY >= 388 && mouseY <= 447) {
                    pCtx.strokeStyle = "rgb(255,196,0)" ;
                    pCtx.strokeRect(517, 388, 168, 59) ;
                    pCtx.strokeStyle = "rgb(255,255,255)" ;
                } ;
            } ;

        } ;


        // In game
        if (this.state == "ingame") {

            pCtx.globalAlpha = this.alphadisplayIG ;

            sprites.assets.draw(pCtx) ;
            
            // Score
            let lcl = rsrcsloader.getImg("littlesnumbers") ;
                // Points
            pCtx.drawImage(lcl.img, 0, this.np1*lcl.h, lcl.w, lcl.h, 855, 10, lcl.w, lcl.h) ;
            pCtx.drawImage(lcl.img, 0, this.np2*lcl.h, lcl.w, lcl.h, 855+26, 10, lcl.w, lcl.h) ;
            pCtx.drawImage(lcl.img, 0, this.np3*lcl.h, lcl.w, lcl.h, 855+(26*2), 10, lcl.w, lcl.h) ;
                // Miles
            pCtx.drawImage(lcl.img, 0, this.nd1*lcl.h, lcl.w, lcl.h, 1063, 10, lcl.w, lcl.h) ;
            pCtx.drawImage(lcl.img, 0, this.nd2*lcl.h, lcl.w, lcl.h, 1063+24, 10, lcl.w, lcl.h) ;
            pCtx.drawImage(lcl.img, 0, this.nd3*lcl.h, lcl.w, lcl.h, 1067+(27*2), 10, lcl.w, lcl.h) ;
            pCtx.drawImage(lcl.img, 0, this.nd4*lcl.h, lcl.w, lcl.h, 1067+(27*3), 10, lcl.w, lcl.h) ;


            // Lifebar
            if (this.liferatio > 2) {
                pCtx.fillStyle = "rgb(10,172,56)" ;
            } else {
                pCtx.fillStyle = "rgb(255,38,52)" ;
            } ;
            pCtx.fillRect(120, 546, 294*(this.liferatio/10), 28) ;
            pCtx.fillStyle = "rgb(255,255,255)" ;

            // Weapon
            switch(ship.level) {
                case 0 :
                    sprites.weapon0.draw(pCtx) ;
                    break ;
                case 1 :
                    sprites.weapon1.draw(pCtx) ;
                    break ;
                case 2 :
                    sprites.weapon2.draw(pCtx) ;
                    break ;
                case 3 :
                    sprites.weapon3.draw(pCtx) ;
                    break ;
            } ;

            pCtx.globalAlpha = sprites.level.alpha ;
            sprites.level.draw(pCtx) ;
            pCtx.globalAlpha = sprites.level1.alpha ;
            sprites.level1.draw(pCtx) ;
            pCtx.globalAlpha = sprites.flag1.alpha ;
            sprites.flag1.draw(pCtx) ;
            pCtx.globalAlpha = sprites.level2.alpha ;
            sprites.level2.draw(pCtx) ;
            pCtx.globalAlpha = sprites.flag2.alpha ;
            sprites.flag2.draw(pCtx) ;
            pCtx.globalAlpha = sprites.level3.alpha ;
            sprites.level3.draw(pCtx) ;
            pCtx.globalAlpha = sprites.flag3.alpha ;
            sprites.flag3.draw(pCtx) ;

            pCtx.globalAlpha = this.alpha ;

        } ;


        // Game won
        if (this.state == "won") {

            pCtx.globalAlpha = sprites.victory.alpha ;
            sprites.victory.draw(pCtx) ;

            // Score display
            pCtx.globalAlpha = sprites.score.alpha ;
            let lcl1 = rsrcsloader.getImg("smallsnumbers") ;
                // Points
            pCtx.drawImage(lcl1.img, this.np1*lcl1.w, 0, lcl1.w, lcl1.h, 123, 89, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.np2*lcl1.w, 0, lcl1.w, lcl1.h, 123+28, 89, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.np3*lcl1.w, 0, lcl1.w, lcl1.h, 123+(28*2), 89, lcl1.w, lcl1.h) ;
                // Miles
            pCtx.drawImage(lcl1.img, this.nd1*lcl1.w, 0, lcl1.w, lcl1.h, 123, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd2*lcl1.w, 0, lcl1.w, lcl1.h, 123+28, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd3*lcl1.w, 0, lcl1.w, lcl1.h, 123+28+36, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd4*lcl1.w, 0, lcl1.w, lcl1.h, 123+(28*2)+36, 126, lcl1.w, lcl1.h) ;
                // Final score
            let lcl2 = rsrcsloader.getImg("scorenumbers") ;
            let ns1 = Math.floor(ship.score/100) ;
            let ns2 = Math.floor((ship.score-(ns1*100))/10) ;
            let ns3 = ship.score-(ns1*100)-(ns2*10) ;
            pCtx.drawImage(lcl2.img, ns1*lcl2.w, 0, lcl2.w, lcl2.h, 621, 475, lcl2.w, lcl2.h) ;
            pCtx.drawImage(lcl2.img, ns2*lcl2.w, 0, lcl2.w, lcl2.h, 621+44, 475, lcl2.w, lcl2.h) ;
            pCtx.drawImage(lcl2.img, ns3*lcl2.w, 0, lcl2.w, lcl2.h, 621+(44*2), 475, lcl2.w, lcl2.h) ;
            sprites.score.draw(pCtx) ;
            pCtx.globalAlpha = sprites.retrymenu.alpha ;
            sprites.retrymenu.draw(pCtx) ;
            pCtx.globalAlpha = this.alpha ;

            if (this.choice) {
                pCtx.strokeStyle = "rgb(255,196,0)" ;
                if(mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) {
                    pCtx.strokeRect(83, 362, 216, 74) ;
                } else if (mouseX >= 910 && mouseX <= 1087 && mouseY >= 362 && mouseY <= 436) {
                    pCtx.strokeRect(910, 362, 177, 74) ;
                } ;
                pCtx.strokeStyle = "rgb(255,255,255)" ;
            } ; 

        } ;


        // Game lost
        if (this.state == "gameover") {
    
            pCtx.globalAlpha = sprites.gameover.alpha ;
            sprites.gameover.draw(pCtx) ;
            // Score display
            pCtx.globalAlpha = sprites.score.alpha ;
            let lcl1 = rsrcsloader.getImg("smallsnumbers") ;
                // Points
            pCtx.drawImage(lcl1.img, this.np1*lcl1.w, 0, lcl1.w, lcl1.h, 123, 89, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.np2*lcl1.w, 0, lcl1.w, lcl1.h, 123+28, 89, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.np3*lcl1.w, 0, lcl1.w, lcl1.h, 123+(28*2), 89, lcl1.w, lcl1.h) ;
                // Miles
            pCtx.drawImage(lcl1.img, this.nd1*lcl1.w, 0, lcl1.w, lcl1.h, 123, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd2*lcl1.w, 0, lcl1.w, lcl1.h, 123+28, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd3*lcl1.w, 0, lcl1.w, lcl1.h, 123+28+36, 126, lcl1.w, lcl1.h) ;
            pCtx.drawImage(lcl1.img, this.nd4*lcl1.w, 0, lcl1.w, lcl1.h, 123+(28*2)+36, 126, lcl1.w, lcl1.h) ;
                // Final score
            let lcl2 = rsrcsloader.getImg("scorenumbers") ;
            let ns1 = Math.floor(ship.score/100) ;
            let ns2 = Math.floor((ship.score-(ns1*100))/10) ;
            let ns3 = ship.score-(ns1*100)-(ns2*10) ;
            pCtx.drawImage(lcl2.img, ns1*lcl2.w, 0, lcl2.w, lcl2.h, 621, 475, lcl2.w, lcl2.h) ;
            pCtx.drawImage(lcl2.img, ns2*lcl2.w, 0, lcl2.w, lcl2.h, 621+44, 475, lcl2.w, lcl2.h) ;
            pCtx.drawImage(lcl2.img, ns3*lcl2.w, 0, lcl2.w, lcl2.h, 621+(44*2), 475, lcl2.w, lcl2.h) ;

            sprites.score.draw(pCtx) ;
            pCtx.globalAlpha = sprites.retrymenu.alpha ;
            sprites.retrymenu.draw(pCtx) ;
            pCtx.globalAlpha = this.alpha ;

            if (this.choice) {
                pCtx.strokeStyle = "rgb(255,196,0)" ;
                if(mouseX >= 83 && mouseX <= 299 && mouseY >= 362 && mouseY <= 436) {
                    pCtx.strokeRect(83, 362, 216, 74) ;
                } else if (mouseX >= 910 && mouseX <= 1087 && mouseY >= 362 && mouseY <= 436) {
                    pCtx.strokeRect(910, 362, 177, 74) ;
                } ;
                pCtx.strokeStyle = "rgb(255,255,255)" ;
            } ; 
    
        } ;

    } ;


    restartGame() {

        ship.sprite = sprites.ship0
        ship.sprite.x = -300 ;
        ship.sprite.y = (Height/2)-50 ;
        ship.won = false ;
        ship.dead = false ;
        ship.deathswitcher = 0 ;
        ship.life = 10 ;
        ship.dist = 0 ;
        ship.points = 0 ;
        ship.score = 0 ;
        ship.level = 0 ;
        this.liferatio = 10 ;
        bg.scrolldist = 1200 ;
        bg.ttscrolldist = 0 ;
        level = 0 ;
        for (let n = wvsmanager.waves.length-1 ; n >= 0 ; n--) {
            wvsmanager.waves.splice(n, 1) ;
        } ;
        for (let n = bg.cases.length-1 ; n >= 0 ; n--) {
            bg.cases.splice(n,1) ;
        } ;
        effsmanager.restartAllSounds() ;
        wvsmanager.loadLevels() ;
        sprites.flag1.x = 537 ;
        sprites.flag1.y = 198 ;
        sprites.flag1.alpha = 0 ;
        sprites.flag1.setScale(1,1) ;
        sprites.flag2.x = 537 ;
        sprites.flag2.y = 198 ;
        sprites.flag2.alpha = 0 ;
        sprites.flag2.setScale(1,1) ;
        sprites.flag3.x = 537 ;
        sprites.flag3.y = 198 ;
        sprites.flag3.alpha = 0 ;
        sprites.flag3.setScale(1,1) ;
        sprites.level1.x = Width/2 ;
        sprites.level1.y = Height/2 ;
        sprites.level1.alpha = 0 ;
        sprites.level1.setScale(0,0) ;
        sprites.level2.x = Width/2 ;
        sprites.level2.y = Height/2 ;
        sprites.level2.alpha = 0 ;
        sprites.level2.setScale(0,0) ;
        sprites.level3.x = Width/2 ;
        sprites.level3.y = Height/2 ;
        sprites.level3.alpha = 0 ;
        sprites.level3.setScale(0,0) ;
        sprites.level.alpha = 0 ;

    } ;


} ;
