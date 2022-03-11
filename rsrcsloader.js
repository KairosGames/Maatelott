class ResourcesLoader {

    constructor() {
        this.imgspaths = [] ;
        this.sndspaths = [] ;
        this.imgs = [] ;
        this.snds = [] ;
        this.callbck = null ;
        this.toload = 0 ;
        this.loaded = 0 ;
    } ;

    addImg(pName, pPth, pTS=false, pW=0, pH=0) {
        this.toload ++ ;
        let data = [] ;
        data.src = pPth ;
        data.ts = pTS ;
        data.w = pW ;
        data.h = pH ;
        this.imgspaths[pName] = data ;
    } ;

    addSnd(pName, pPth, pVol=1, pLoop=false) {
        this.toload ++ ;
        let data = [] ;
        data.src = pPth ;
        data.volume = pVol ;
        data.loop = pLoop ;
        this.sndspaths[pName] = data ;
    } ;

    getImg(pName) {
        return this.imgs[pName] ;
    } ;

    getImgPath(pName) {
        return this.imgspaths[pName].src ;
    } ;

    getSnd(pName) {
        return this.snds[pName] ;
    } ;

    getSndPath(pName) {
        return this.sndspaths[pName].src ;
    } ;

    getToLoad() {
        return this.toload ;
    } ;

    getLoaded() {
        return this.loaded ;
    } ;

    getLoading() {
        return this.getLoaded()/this.getToLoad() ;
    } ;

    start(pCallbck) {
        this.callbck = pCallbck ;
        for (let e in this.imgspaths) {
            let ref = this.imgspaths[e] ;
            let img = new Image() ;
            img.src = ref.src ;
            img.ts = ref.ts ;
            img.w = ref.w ;
            img.h = ref.h ;
            img.onload = this.rsrcloaded.bind(this) ;
            this.imgs[e] = [] ;
            this.imgs[e].img = img ;
            this.imgs[e].ts = img.ts ;
            this.imgs[e].w = img.w ;
            this.imgs[e].h = img.h ;
        } ;
        for (let e in this.sndspaths) {
            let ref = this.sndspaths[e] ;
            let snd = new Audio() ;
            snd.src = ref.src ;
            snd.volume = ref.volume ;
            snd.loop = ref.loop ;
            snd.done = false ;
            snd.oncanplaythrough = this.rsrcloaded.bind(this) ;
            this.snds[e] = snd ;
        } ;
    } ;

    rsrcloaded(e) {
        this.loaded ++ ;
        if (this.getLoading() == 1) {
            this.callbck() ;
        } ;
    } ;

} ;