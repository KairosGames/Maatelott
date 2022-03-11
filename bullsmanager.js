class Bullets {


    constructor(pCmp, pSprt, pOptn=0) {
        
        this.camp = pCmp ;
        this.option = pOptn ;
        this.sprite = pSprt ;
        this.speedx = 700 ;
        this.speedy = 125 ;
        this.trail = [] ;

    } ;


    update(dt) {

        let trl = {} ;
        trl.sprite = new Sprites(sprites.bullet.img) ;
        trl.sprite.x = this.sprite.x ;
        trl.sprite.y = this.sprite.y ;
        trl.dt = 0.3 ;
        this.trail.push(trl) ;

        for (let n = this.trail.length-1 ; n >= 0 ; n--) {
            let trl = this.trail[n] ;
            trl.dt -= dt*2 ;
            if (trl.dt <= 0) {
                this.trail.splice(n,1) ;
            } ;
        } ;

    } ;


    draw(pCtx) {

        this.sprite.draw(pCtx) ;

        this.trail.forEach(e => {
            pCtx.globalAlpha = e.dt ;
            e.sprite.draw(pCtx) ;
            pCtx.globalAlpha = displmanager.alpha ;
        }) ;

    } ;

}

//
//-----------------------------------------------------------------------------------
//

class BulletsManager {


    constructor() {

        this.bullets = [] ;

    } ;


    load() {

        // References bullets sprites for cloning
        gensprite("bullet", "bullet") ;

    } ;

    genBullet(pCmp, pX, pY, pOptn=0) {
        let sprt = new Sprites() ;
        Object.assign(sprt, sprites.bullet) ;
        let bull = new Bullets(pCmp, sprt, pOptn) ;
        bull.sprite.x = pX ;
        bull.sprite.y = pY ;
        this.bullets.push(bull) ;
    } ;

    update(dt) {

        for (let n = this.bullets.length-1 ; n >= 0 ; n--) {

            let bull = this.bullets[n] ;

            switch (bull.camp) {
                case "player" :
                    bull.sprite.x += bull.speedx*dt ;
                    switch (bull.option) {
                        case 0 :
                            break ;
                        case 1 :
                            bull.sprite.x -= (bull.speedx/20)*dt ;
                            bull.sprite.y -= bull.speedy*dt ;
                            break ;
                        case 2 :
                            bull.sprite.x -= (bull.speedx/20)*dt ;
                            bull.sprite.y += bull.speedy*dt ;
                            break ;
                    }
                    if (bull.sprite.x >= Width) {
                        this.bullets.splice(n, 1) ;
                    } ;
                    break ;
            
                case "opponent" :
                    bull.sprite.x -= bull.speedx*dt ;
                    if (bull.sprite.x <= 0-20) {
                        this.bullets.splice(n, 1) ;
                    } ;
                    break ;
            } ;

            bull.update(dt) ;

        } ;

    } ;

    draw(pCtx) {

        this.bullets.forEach (bull => {
            bull.draw(pCtx) ;
        }) ;

    } ;

} ;