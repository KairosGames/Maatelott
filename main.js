// Tools

    // Recover canvas and context
let canvas = document.getElementById("canvas") ;
let ctx = canvas.getContext("2d") ;

    // Ms seizure since 01/01/1970 for dt calculation
let lastupdt = Date.now() ;

// Focus on keys for export
function preventUseOfDefaultKeys(event) {
    if (event.code == "KeyA" || event.code == "KeyW" || event.code == "KeyS" || event.code == "KeyD" || event.code == "Space" || event.code == "ArrrowUp" || event.code == "ArrrowDown" || event.code == "ArrrowLeft" || event.code == "ArrrowRight") {
        event.preventDefault() ;
    } ;
} ;

    // Resources loader
let loadrdy = false ;
let rsrcsloader = new ResourcesLoader() ;
let sprites = [] ;
function startrdy() {
    loadrdy = true ;
    build() ;
} ;

    // Sprites bank
function gensprite(pName, pImg, pX=0, pY=0, pScX = 1, pScY = 1, pL=0) {
    let lcl_img = rsrcsloader.getImg(pImg) ;
    let sprite = new Sprites(lcl_img.img, pX, pY, pScX, pScY, pL) ;
    if (lcl_img.ts == true) {
        sprite.setTS(lcl_img.w, lcl_img.h) ;
    } ;
    sprites[pName] = sprite ;
} ;

    // Width and height canvas
let Width = canvas.width ;
let Height = canvas.height ;

    // Random function
function rand(min,max) {
    return Math.floor((Math.random()*(max-min))+min) ;
} ;

    // Distance calculation function
function dist(x1,y1,x2,y2) {
    return (((x2-x1)**2)+((y2-y1)**2))**0.5 ;
} ;

    // Angle calculation function  
function angle(x1,y1,x2,y2) {
    return Math.atan2(y2-y1, x2-x1) ;
} ;

//
//-----------------------------------------------------------------------------------
//

function run () {

    requestAnimationFrame(run) ;
    let now = Date.now() ;
    let dt = (now - lastupdt)/1000 ;
    lastupdt = now ;
    update(dt) ;
    ctx.clearRect(0, 0, Width, Height) ;
    draw(ctx) ;

} ;

//
//-----------------------------------------------------------------------------------
//

function init() {

    ctx.imageSmoothingEnabled = false ;
    ctx.msImageSmoothingEnabled = false ;
    ctx.webkitImageSmoothingEnabled = false ;
    ctx.mozImageSmootingEnabled = false ;

    ctx.strokeStyle = "rgb(255,255,255)" ;
    ctx.fillStyle = "rgb(255,255,255)" ;

    load() ;
    run() ;
    //frag = setInterval(run, 1000/240) ;

} ;

//
//-----------------------------------------------------------------------------------
//

init() ;

//