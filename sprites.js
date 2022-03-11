class Sprites {

    constructor(pImg, pX=0, pY=0, pScX = 1, pScY = 1, pL=0) {

        this.img = pImg ;
        this.x = pX ;
        this.y = pY ;
        this.scx = pScX ;
        this.scy = pScY ;
        this.layer = pL ;
        this.glued = null ;
        this.alpha = 0 ;

        this.ts = false ;
        this.w = 0 ;
        this.h = 0 ;
        this.frame = 0 ;
        this.quad = 0 ;
        this.anims = [] ;
        this.current = null ;
        this.frmtimer = 0 ;
        this.finished = false ;
    } ;

    setTS(pW, pH) {
        this.ts = true ;
        this.w = pW ;
        this.h = pH ;
    } ;

    setScale(pScX, pScY) {
        this.scx = pScX ;
        this.scy = pScY ;
    } ;

    addAnim(pName, pFrms, pDT, pLoop = false) {
        let anm = {
            frms  : pFrms,
            dt : pDT,
            loop : pLoop
        } ;
        this.anims[pName] = anm ;
    } ;

    playAnim(pName) {
        if (this.current != null) {
            if (this.current == this.anims[pName]) {
                return ;
            } ;
        } ;
        this.current = this.anims[pName] ;
        this.quad = 0 ;
        this.frame = this.current.frms[this.quad] ;
    } ;

    update(dt) {
        if (this.current != null) {
            this.frmtimer += dt ;
            if (this.frmtimer >= this.current.dt) {
                this.quad ++ ;
                if (this.quad >= this.current.frms.length) {
                    if (this.current.loop == true) {
                        this.quad = 0 ;
                        this.frame = this.current.frms[this.quad] ;
                        this.frmtimer = 0 ;
                    } else {
                        this.frame = this.current.frms[this.current.frms.length-1] ;
                        this.finished = true ;
                    } ;
                } else {
                    this.frame = this.current.frms[this.quad] ;
                    this.frmtimer = 0 ;
                } ;
            } ;
        } ;
    } ;

    draw(pCtx) {
        if (!this.ts) {
            pCtx.drawImage(this.img, this.x, this.y, this.img.width*this.scx, this.img.height*this.scy) ;
        } else {
            let nCol = this.img.width/this.w ;
            let nLig = this.img.height/this.h ;
            let l = Math.floor(this.frame/nCol) ;
            let c = Math.floor(this.frame-(l*nCol)) ;
            let xq = c*this.w ;
            let yq = l*this.h ;
            pCtx.drawImage(this.img, xq, yq, this.w, this.h, this.x, this.y, this.w*this.scx, this.h*this.scy)
        };
    } ;

} ;