class EffectsManager {


    constructor() {

        this.effects = [] ;
        this.debris = [] ;

    } ;


    load() {

        // Ship fires animations
        gensprite("firanimshp1", "firanimshp1", 0, 0, 1, 1, "ship") ;
        sprites.firanimshp1.addAnim("temp", [0,1,2,3], 0.05) ;
        gensprite("firanimshp2", "firanimshp2", 0, 0, 1, 1, "ship") ;
        sprites.firanimshp2.addAnim("temp", [0,1,2,3], 0.05) ;
        gensprite("firanimshp3", "firanimshp3", 0, 0, 1, 1, "ship") ;
        sprites.firanimshp3.addAnim("temp", [0,1,2,3], 0.05) ;
        // Enemys fires animations
        gensprite("firanimenmy1","firanimenmy1", 0, 0, 1, 1, 1) ;
        sprites.firanimenmy1.addAnim("temp", [0,1,2,3], 0.05) ;
        gensprite("firanimenmy2","firanimenmy2", 0, 0, 1, 1, 1) ;
        sprites.firanimenmy2.addAnim("temp", [0,1,2,3], 0.05) ;
        gensprite("firanimenmy3","firanimenmy3", 0, 0, 1, 1, 1) ;
        sprites.firanimenmy3.addAnim("temp", [0,1,2,3], 0.05) ;
        // Impacts
        gensprite("impact", "impact", 0, 0, 1, 1, 2) ;
        sprites.impact.addAnim("temp", [0,1,2,3,4], 0.05) ;
        gensprite("debris1", "debris1", 0, 0, 1, 1) ;
        sprites.debris1.addAnim("temp", [0,1,2,3,4,5,6,7,8], 0.02, true) ;
        gensprite("debris2", "debris2", 0, 0, 1, 1) ;
        sprites.debris2.addAnim("temp", [0,1,2,3,4,5,6,7,8], 0.02, true) ;
        gensprite("debris3", "debris3", 0, 0, 1, 1) ;
        sprites.debris3.addAnim("temp", [0,1,2,3,4,5,6,7,8], 0.02, true) ;
        // Ships wrecks
        gensprite("ship0death","ship0death", 0, 0, 1, 1, 0) ;
        sprites.ship0death.addAnim("temp", [0,1,2,3,4,5,6], 0.15) ;
        gensprite("ship1death","ship1death", 0, 0, 1, 1, 0) ;
        sprites.ship1death.addAnim("temp", [0,1,2,3,4,5,6], 0.15) ;
        gensprite("ship2death","ship2death", 0, 0, 1, 1, 0) ;
        sprites.ship2death.addAnim("temp", [0,1,2,3,4,5,6], 0.15) ;
        gensprite("ship3death","ship3death", 0, 0, 1, 1, 0) ;
        sprites.ship3death.addAnim("temp", [0,1,2,3,4,5,6], 0.15) ;
        gensprite("enemy1death","enemy1death", 0, 0, 1, 1, 0) ;
        sprites.enemy1death.addAnim("temp", [0,1,2,3,4,5,6], 0.1) ;
        gensprite("enemy2death","enemy2death", 0, 0, 1, 1, 0) ;
        sprites.enemy2death.addAnim("temp", [0,1,2,3,4,5,6], 0.1) ;
        gensprite("enemy3death","enemy3death", 0, 0, 1, 1, 0) ;
        sprites.enemy3death.addAnim("temp", [0,1,2,3,4,5,6], 0.1) ;

    } ;


    startEffect(pName, pX, pY, pGld=null) {
        
        let eff = new Sprites() ;
        Object.assign(eff, sprites[pName]) ;
        eff.x = pX ;
        eff.y = pY ;
        eff.glued = pGld ;
        eff.playAnim("temp") ;
        this.effects.push(eff) ;

    } ;


    startDebris(pNb, pDt, pX, pY, pGld=null) {

        for (let n = 0 ; n < pNb ; n ++) {
            let angl = rand(0, 360) ;
            let rnd = rand(1,4) ;
            let sprt = new Sprites() ;
            Object.assign(sprt, sprites["debris"+rnd]) ;
            sprt.playAnim("temp") ;
            let deb = new Debris(sprt, pX+(rand(-5,6)), pY+(rand(-5,6)), angl, pY, pDt, pGld) ;
            this.debris.push(deb) ;
        } ;

    } ;


    playClonedSound(pName) {

        let snd = rsrcsloader.getSnd(pName).cloneNode(false) ;
        snd.volume = rsrcsloader.getSnd(pName).volume ;
        snd.play() ;

    } ;


    replaySound(pName) {

        let snd = rsrcsloader.getSnd(pName) ;
        snd.currentTime = 0 ;
        snd.play() ;

    } ;


    playSound(pName, pTime=0) {

        let snd = rsrcsloader.getSnd(pName) ;
        snd.currentTime = pTime ;
        snd.play() ;
        snd.done = true ;

    } ;

    stopSound(pName) {

        let snd = rsrcsloader.getSnd(pName) ;
        snd.pause() ;
        snd.currentTime = 0 ;

    } ;


    setVolume(pName, pVol=1) {

        rsrcsloader.getSnd(pName).volume = pVol ;

    } ;


    getPlayed(pName) {

        return rsrcsloader.getSnd(pName).done ;

    } ;


    setPlayed(pName) {

        rsrcsloader.getSnd(pName).done = true ;

    } ;


    setNotPlayed(pName) {

        rsrcsloader.getSnd(pName).done = false ;

    } ;


    restartAllSounds() {

        for (let e in rsrcsloader.snds) {
            rsrcsloader.snds[e].done = false ;
        } ;

    } ;


    update(dt) {

        // Effects
        for (let n = this.effects.length-1 ; n >= 0 ; n--) {
            let eff = this.effects[n] ;
            if (eff.glued == null) {
                eff.x -= bg.scrollspeed*dt ;
            } else if (eff.glued == "ship") {
                switch (ship.level) {
                    case 1 :
                        eff.x = ship.sprite.x + 59 ;
                        eff.y = ship.sprite.y + 10 ;
                        break ;
                    case 2 :
                        eff.x = ship.sprite.x + 69 ;
                        eff.y = ship.sprite.y + 7 ;
                        break ;
                    case 3 :
                        eff.x = ship.sprite.x + 94 ;
                        eff.y = ship.sprite.y + 2 ;
                        break ;
                } ;
            } else {
                switch (eff.glued.type) {
                    case 1 :
                        eff.x = eff.glued.sprite.x - 61 ;
                        eff.y = eff.glued.sprite.y + 17 ;
                        break ;
                    case 2 :
                        eff.x = eff.glued.sprite.x - 64 ;
                        eff.y = eff.glued.sprite.y + 13 ;
                        break ;
                    case 3 :
                        eff.x = eff.glued.sprite.x - 62 ;
                        eff.y = eff.glued.sprite.y + 21 ;
                        break ;
                } ;
            } ;
            eff.update(dt) ;
            if (eff.finished) {
                this.effects.splice(n,1) ;
            } ;
        } ;
        // Debris
        for (let n = this.debris.length-1 ; n >= 0 ; n--) {
            let deb = this.debris[n] ;
            deb.update(dt) ;
            if (deb.dt <= 0) {
                this.debris.splice(n,1) ;
            } ;
        } ;

    } ;


} ;

//
//-----------------------------------------------------------------------------------
//

class Debris {

    constructor(pSprt, pX, pY, pAngl, pRefY, pDt, pGld) {

        this.sprite = pSprt ;
        this.sprite.x = pX ;
        this.sprite.y = pY ;
        this.refy = pRefY ;
        this.angle = (Math.PI/180)*pAngl ;
        this.vx = rand(100,251) ;
        this.vy = rand(100,251) ;
        this.dt = pDt ;
        this.glued = pGld ;

    } ;

    update(dt) {

        this.sprite.x += this.vx*(Math.cos(this.angle))*dt ;
        this.sprite.y += this.vy*(Math.sin(this.angle))*dt ;
        this.vy *= 0.99 ;
        this.vx += 2 ;
        this.dt -= dt ;
        if (this.glued == "ship") {
            this.sprite.x -= bg.scrollspeed*dt ;
        } ;
        this.sprite.update(dt) ;

    } ;

    draw(pCtx) {

        this.sprite.draw(pCtx) ;

    } ;

} ;