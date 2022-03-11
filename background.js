class Cases {


    constructor(pSprt, pLvl) {

        this.sprite = pSprt ;
        this.level = pLvl ;

    } ;


    update(dt) {

        if (level == this.level) {
            this.sprite.x -= bg.scrollspeed*dt ;
        } ;
        this.sprite.update(dt) ;

    } ;


    draw(pCtx) {

        this.sprite.draw(pCtx) ;

    } ;
    

} ;

//
//-----------------------------------------------------------------------------------
//

class BGs {


    constructor() {
        this.scrolldist = 1200 ;
        this.scrollspeed = 150 ;
        this.ttscrolldist = 0 ;
        this.scrollx = 0 ;
        this.bgtimer = 0 ;
        this.quad = 0 ;
        this.cases = [] ;
    } ;


    load() {

        gensprite("case", "case", Width, (Height/2)-25) ;
        sprites.case.addAnim("swell", [0,1,2,3,4,3,2,1], 0.2, true) ;
        sprites.case.playAnim("swell") ;

    } ;


    addCase(pLvl) {

        let sprt = new Sprites() ;
        Object.assign(sprt, sprites.case) ;
        sprt.y = rand(topy+50, boty) ;
        let cse = new Cases(sprt, pLvl) ;
        this.cases.push(cse) ;

    } ;


    update(dt) {

        // Background
            // Scrolling
        this.scrollx -= this.scrollspeed*dt ;
        if (!ship.dead && !ship.won && displmanager.state == "ingame") {
            this.scrolldist += this.scrollspeed*dt ;
            this.ttscrolldist += this.scrollspeed*dt ;
        } ;
        if (this.scrollx <= 0-(Width*2)) {
            this.scrollx = 0 ;
        } ;
            //Animation
        this.bgtimer += 5*dt ;
        if (this.bgtimer >= 3) {
            this.bgtimer = 0 ;
        } ;
        this.quad = Math.floor(this.bgtimer) ;

        // Cases
        this.cases.forEach(cs => {
            cs.update(dt) ;
            if (cs.sprite.x <= 0-100) {
                this.cases.splice(0,1) ;
            } ;
        }) ;

        // Levels
        switch (level) {
            case 0 :
                if (this.scrolldist >= Width+900) {
                    lvlup() ;
                    effsmanager.playSound("jument_de_michao") ;
                    this.scrolldist = Width ;
                } ;
                break ;
            case 1 :
                if (this.scrolldist >= Width*11+860) {
                    if (!effsmanager.getPlayed("applause")) {
                        effsmanager.playSound("applause") ;
                    } ;
                } ;
                if (this.scrolldist >= Width*13+600) {
                    lvlup() ;
                    effsmanager.setNotPlayed("applause") ;
                    this.scrolldist = Width ;
                } ;
                break ;
            case 2 :
                if (this.scrolldist >= Width*12+590) {
                    if (!effsmanager.getPlayed("applause")) {
                        effsmanager.playSound("applause") ;
                    } ;
                } ;
                if (this.scrolldist >= Width*14) {
                    lvlup() ;
                    effsmanager.setNotPlayed("applause") ;
                    this.scrolldist = Width ;
                } ;
                break ;
            case 3 :
                if (this.scrolldist >= Width*12+930) {
                    if (!effsmanager.getPlayed("applause")) {
                        effsmanager.playSound("applause") ;
                        effsmanager.playSound("big_applause") ;
                    } ;
                } ;
                break ;
        }

    } ;


    draw(pCtx) {

        // Background
        let lcl1 = rsrcsloader.getImg("sea1") ;
        let lcl2 = rsrcsloader.getImg("sea2") ;
        pCtx.drawImage(lcl1.img, this.quad*Width, 0, lcl1.w, lcl1.h, this.scrollx, 0, Width, Height) ;
        pCtx.drawImage(lcl2.img, this.quad*Width, 0, lcl2.w, lcl2.h, this.scrollx + Width, 0, Width, Height) ;
        pCtx.drawImage(lcl1.img, this.quad*Width, 0, lcl1.w, lcl1.h, this.scrollx + (2*Width), 0, Width, Height) ;

        // Cases
        this.cases.forEach(cs => {
            cs.draw(pCtx) ;
        }) ;

    } ;


} ;