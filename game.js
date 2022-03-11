// Variables declarations

    // Objects
let hitbxs = null ;
let bg = new BGs() ;
let ship = new Ship() ;
let wvsmanager = new WavesManager() ;
let bullsmanager = new BulletsManager() ;
let collsmanager = new CollisionsManager() ;
let effsmanager = new EffectsManager() ;
let displmanager = new DisplayManager() ;



    //Keys and mouse
let tD = false ;
let tQ = false ;
let tZ = false ;
let tS = false ;
let tSpc = false ;
let bClic = false ;
let mouseX = 0 ;
let mouseY = 0 ;

    // Levels
let level = 0 ;
function lvlup() {
    level ++ ;
} ;

    // Cheats
function cheat() {
    //bg.scrolldist += 1000 ;
    //ship.life ++ ;
} ;

    // Lane limits
let topy = 25 ;
let boty = 435 ;
let midy = (boty-topy)/2 ;

    // Starts enemys positions
function lane(pLane, pNb) {
    let ln = [] ;
    for (let n = 0 ; n <= pNb-1 ; n++) {
        ln.push(topy +(n*((boty-topy)/(pNb-1)))) ;
    } ;
    return (ln[pLane-1]) ;
} ;

//
//-----------------------------------------------------------------------------------
//

function load() {

    document.addEventListener("keydown", KeyDown, false) ;
    document.addEventListener("keyup", KeyUp, false) ;
    canvas.addEventListener("mousemove", MouseMove, false) ;
    canvas.addEventListener("mousedown", MouseDown, false) ;
    canvas.addEventListener("mouseup", MouseUp, false) ;

    // Keys and mouse functions
        // Key in
    function KeyDown(tch) {
        tch.preventDefault() ;
        if (tch.code == "KeyD" || tch.code == "ArrowRight") {
            tD = true ;
        } ;
        if (tch.code == "KeyA" || tch.code == "ArrowLeft") {
            tQ = true ;
        };
        if (tch.code == "KeyW" || tch.code == "ArrowUp") {
            tZ = true ;
        } ;
        if (tch.code == "KeyS" || tch.code == "ArrowDown") {
            tS = true ;
        };
        if (tch.code == "Space") {
            tSpc = true ;
        } ;
    } ;
        // Key out
    function KeyUp(tch) {
        tch.preventDefault() ;
        if (tch.code == "KeyD" || tch.code == "ArrowRight") {
            tD = false ;
        } ;
        if (tch.code == "KeyA" || tch.code == "ArrowLeft") {
            tQ = false ;
        } ;
        if (tch.code == "KeyW" || tch.code == "ArrowUp") {
            tZ = false ;
        } ;
        if (tch.code == "KeyS" || tch.code == "ArrowDown") {
            tS = false ;
        } ;
        if (tch.code == "Space") {
            tSpc = false ;
        } ;
        if (tch.code == "NumpadAdd") {
            cheat() ;
        } ;
    } ;
        // Mouse cursor location
    function MouseMove(mslc) {
        mslc.preventDefault() ;
        mouseX = mslc.clientX - canvas.getBoundingClientRect().left ;
        mouseY = mslc.clientY - canvas.getBoundingClientRect().top ;
    } ;
        // Button in
    function MouseDown(btn) {
        btn.preventDefault() ; 
        bClic = true ;
    } ;
        // Button out
    function MouseUp(btn) {
        btn.preventDefault() ;
        bClic = false ;
    } ;

    // Resources loader
        // Images to load
            //Display
    rsrcsloader.addImg("launch", "images/display/launch.png") ;
    rsrcsloader.addImg("title", "images/display/title.png") ;
    rsrcsloader.addImg("credits", "images/display/credits.png") ;
    rsrcsloader.addImg("play", "images/display/play.png") ;
    rsrcsloader.addImg("controls", "images/display/controls.png") ;
    rsrcsloader.addImg("weapon0", "images/display/weapon0.png") ;
    rsrcsloader.addImg("weapon1", "images/display/weapon1.png") ;
    rsrcsloader.addImg("weapon2", "images/display/weapon2.png") ;
    rsrcsloader.addImg("weapon3", "images/display/weapon3.png") ;
    rsrcsloader.addImg("assets", "images/display/assets.png") ;
    rsrcsloader.addImg("littlesnumbers", "images/display/littlesnumbers.png", true, 32, 40) ;
    rsrcsloader.addImg("level", "images/display/level.png") ;
    rsrcsloader.addImg("level1", "images/display/level1.png") ;
    rsrcsloader.addImg("level2", "images/display/level2.png") ;
    rsrcsloader.addImg("level3", "images/display/level3.png") ;
    rsrcsloader.addImg("flag1", "images/display/flag1.png") ;
    rsrcsloader.addImg("flag2", "images/display/flag2.png") ;
    rsrcsloader.addImg("flag3", "images/display/flag3.png") ;
    rsrcsloader.addImg("victory", "images/display/victory.png") ;
    rsrcsloader.addImg("gameover", "images/display/gameover.png") ;
    rsrcsloader.addImg("score", "images/display/score.png") ;
    rsrcsloader.addImg("scorenumbers", "images/display/scorenumbers.png", true, 44, 55) ;
    rsrcsloader.addImg("smallsnumbers", "images/display/smallsnumbers.png", true, 32, 40) ;
    rsrcsloader.addImg("retrymenu", "images/display/retrymenu.png") ;
            // Background
    rsrcsloader.addImg("sea1", "images/background/sea1.png", true, Width, Height) ;
    rsrcsloader.addImg("sea2", "images/background/sea2.png", true, Width, Height) ;
            // Materials
    rsrcsloader.addImg("ship0", "images/materials/ship0.png", true, 614/5, 100) ;
    rsrcsloader.addImg("ship1", "images/materials/ship1.png", true, 614/5, 100) ;
    rsrcsloader.addImg("ship2", "images/materials/ship2.png", true, 639/5, 100) ;
    rsrcsloader.addImg("ship3", "images/materials/ship3.png", true, 639/5, 100) ;
    rsrcsloader.addImg("enemy1", "images/materials/enemy1.png", true, 123, 100) ;
    rsrcsloader.addImg("enemy2", "images/materials/enemy2.png", true, 123, 100) ;
    rsrcsloader.addImg("enemy3", "images/materials/enemy3.png", true, 123, 100) ;
    rsrcsloader.addImg("bullet", "images/materials/bullet.png") ;
    rsrcsloader.addImg("case","images/materials/case.png", true, 50, 50) ;
            // Animations
    rsrcsloader.addImg("firanimshp1", "images/animations/fireanim_ship1.png", true, 100, 75) ;
    rsrcsloader.addImg("firanimshp2", "images/animations/fireanim_ship2.png", true, 100, 75) ;
    rsrcsloader.addImg("firanimshp3", "images/animations/fireanim_ship3.png", true, 100, 90) ;
    rsrcsloader.addImg("firanimenmy1", "images/animations/fireanim_enemy1.png", true, 100, 75) ;
    rsrcsloader.addImg("firanimenmy2", "images/animations/fireanim_enemy2.png", true, 100, 75) ;
    rsrcsloader.addImg("firanimenmy3", "images/animations/fireanim_enemy3.png", true, 100, 75) ;
    rsrcsloader.addImg("impact", "images/animations/impact.png", true, 437/5, 75) ;
    rsrcsloader.addImg("debris1", "images/animations/debris1.png", true, 20, 20) ;
    rsrcsloader.addImg("debris2", "images/animations/debris2.png", true, 20, 20) ;
    rsrcsloader.addImg("debris3", "images/animations/debris3.png", true, 20, 20) ;
    rsrcsloader.addImg("ship0death", "images/animations/ship0death.png", true, 860/7, 100) ;
    rsrcsloader.addImg("ship1death", "images/animations/ship1death.png", true, 860/7, 100) ;
    rsrcsloader.addImg("ship2death", "images/animations/ship2death.png", true, 860/7, 100) ;
    rsrcsloader.addImg("ship3death", "images/animations/ship3death.png", true, 860/7, 100) ;
    rsrcsloader.addImg("enemy1death","images/animations/enemy1death.png", true, 123, 100) ;
    rsrcsloader.addImg("enemy2death","images/animations/enemy2death.png", true, 123, 100) ;
    rsrcsloader.addImg("enemy3death","images/animations/enemy3death.png", true, 123, 100) ;
        // Sounds to load
    rsrcsloader.addSnd("sea_vibe", "sounds/sea_vibe.wav", 0, true) ;
    rsrcsloader.addSnd("kaamelott", "sounds/kaamelott.wav") ;
    rsrcsloader.addSnd("trimartolod", "sounds/trimartolod.mp3", 0, true) ;
    rsrcsloader.addSnd("jument_de_michao", "sounds/jument_de_michao.mp3", 0.4, true) ;
    rsrcsloader.addSnd("valsiau_de_san_andres", "sounds/valsiau_de_san_andres.mp3", 0.4, true) ;
    rsrcsloader.addSnd("select", "sounds/select.wav") ;
    rsrcsloader.addSnd("choice", "sounds/choice.wav") ;
    rsrcsloader.addSnd("foghorn", "sounds/foghorn.wav") ;
    rsrcsloader.addSnd("engine_ignition", "sounds/engine_ignition.wav", 0.3) ;
    rsrcsloader.addSnd("engine_on", "sounds/engine_on.mp3", 0.3, true) ;
    rsrcsloader.addSnd("engine_shutdown", "sounds/engine_shutdown.wav", 0.3) ;
    rsrcsloader.addSnd("trigger", "sounds/trigger.wav", 0.5) ;
    rsrcsloader.addSnd("fire_player", "sounds/fire_player.wav", 0.7) ;
    rsrcsloader.addSnd("heavyfire_player", "sounds/heavyfire_player.wav", 0.8) ;
    rsrcsloader.addSnd("fire_enemy", "sounds/fire_enemy.wav", 0.3) ;
    rsrcsloader.addSnd("impact_player", "sounds/impact_player.wav") ;
    rsrcsloader.addSnd("impact_enemy", "sounds/impact_enemy.wav", 0.6) ;
    rsrcsloader.addSnd("case_break", "sounds/case_break.wav", 0.8) ;
    rsrcsloader.addSnd("new_weapon1", "sounds/new_weapon1.wav", 0.8) ;
    rsrcsloader.addSnd("new_weapon2", "sounds/new_weapon2.wav", 0.8) ;
    rsrcsloader.addSnd("new_weapon3", "sounds/new_weapon3.wav", 0.9) ;
    rsrcsloader.addSnd("bell", "sounds/bell.wav", 0.6) ;
    rsrcsloader.addSnd("lowhp", "sounds/lowhp.mp3", 0.8, true) ;
    rsrcsloader.addSnd("sink", "sounds/sink.wav", 0.5) ;
    rsrcsloader.addSnd("crash", "sounds/crash.wav", 0.7) ;
    rsrcsloader.addSnd("game_over", "sounds/game_over.wav") ;
    rsrcsloader.addSnd("sadistic_laugh", "sounds/sadistic_laugh.wav") ;
    rsrcsloader.addSnd("applause", "sounds/applause.wav") ;
    rsrcsloader.addSnd("big_applause", "sounds/big_applause.wav") ;
        // Loading completed
    rsrcsloader.start(startrdy) ;

} ;

//
//-----------------------------------------------------------------------------------
//

function build() {

    bg.load() ;
    wvsmanager.load() ;
    ship.load() ;
    bullsmanager.load() ;
    collsmanager.load() ;
    effsmanager.load() ;
    displmanager.load() ;

    wvsmanager.loadLevels() ;

} ;

//
//-----------------------------------------------------------------------------------
//

function update(dt) {
    
    if (!loadrdy) {
        return ;
    } ;

    // Images loaded
    bg.update(dt) ;
    wvsmanager.update(dt) ;
    ship.update(dt) ;
    bullsmanager.update(dt) ;
    if (!ship.dead) {
        collsmanager.update(dt) ;
    } ;
    effsmanager.update(dt) ;
    displmanager.update(dt) ;

    if (bClic) {
        effsmanager.startDebris(2, mouseX, mouseY) ;
    } ;
} ;

//
//-----------------------------------------------------------------------------------
//

function draw(pCtx) {

    if (!loadrdy) {
        let ratio = rsrcsloader.getLoading() ;
        pCtx.strokeRect(20, Height-50, Width-40, 30) ;
        pCtx.fillStyle = "rgb(255,0,0)" ;
        pCtx.fillRect(20, Height-50, (Width-40)*ratio, 30) ;
        pCtx.fillStyle = "rgb(255,255,255)" ;
        return ;
    } ;

    // Images loaded

    bg.draw(pCtx) ;
    
        // Perspectives
    bullsmanager.draw(pCtx) ;
        //-----------
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y >= eff.y && eff.layer == 0) {
            eff.draw(pCtx) ;
        } ;
    }) ;
    wvsmanager.waves.forEach(wv => {
        wv.enemys.forEach(enmy => {
            if (ship.sprite.y >= enmy.sprite.y) {
                enmy.draw(pCtx) ;
            } ;
        }) ;
    }) ;
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y >= eff.y && eff.layer == 1) {
            eff.draw(pCtx) ;
        } ;
    }) ;
    effsmanager.debris.forEach(e => {
        if (ship.sprite.y >= e.refy) {
            e.draw(pCtx) ;
        } ;
    }) ;
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y >= eff.y && eff.layer == 2) {
            eff.draw(pCtx) ;
        } ;
    }) ;
        //-----------
    ship.draw(pCtx) ;
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y < eff.y && eff.layer == "ship") {
            eff.draw(pCtx) ;
        } ;
    }) ;
        //-----------
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y < eff.y && eff.layer == 0) {
            eff.draw(pCtx) ;
        } ;
    }) ;
    wvsmanager.waves.forEach(wv => {
        wv.enemys.forEach(enmy => {
            if (ship.sprite.y < enmy.sprite.y) {
                enmy.draw(pCtx) ;
            } ;
        }) ;
    }) ;
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y < eff.y && eff.layer == 1) {
            eff.draw(pCtx) ;
        } ;
    }) ;
    effsmanager.debris.forEach(e => {
        if (ship.sprite.y < e.refy) {
            e.draw(pCtx) ;
        } ;
    }) ;
    effsmanager.effects.forEach(eff => {
        if (ship.sprite.y < eff.y && eff.layer == 2) {
            eff.draw(pCtx) ;
        } ;
    }) ;
        //-----------

    displmanager.draw(pCtx) ;

    //Debugger
    deBugger(pCtx) ;
    //drawHitbxs(pCtx) ;

} ;

//
//-----------------------------------------------------------------------------------
//

// Debugger

function deBugger(pCtx) {

    //pCtx.font = "20px arial"
    //pCtx.fillText("ScrllDist : "+bg.scrolldist, 20, 20) ;
    //pCtx.fillText("ShpDist : "+ship.dist, 20, 40) ;
    //pCtx.fillText("Lvl : "+level, 20, 60) ;
    //pCtx.fillText("Life : "+ship.life, 20, 80) ;
    //pCtx.fillText("MousX : "+mouseX, 20, 100) ;
    //pCtx.fillText("MousY : "+mouseY, 20, 120) ;
    //pCtx.fillText("WinWidth : "+window.innerWidth, 20, 140) ;
    //pCtx.fillText("WinHeight : "+window.innerHeight, 20, 160) ;
    //pCtx.fillText("Shiplvl : "+ship.level, 20, 100) ;
    //pCtx.fillText("State : "+displmanager.state, 20, 120) ;
    //pCtx.fillText("Step : "+displmanager.step, 20, 140) ;
    //pCtx.fillText("Score : "+ship.score, 20, 160) ;
    //pCtx.fillText("AlphVic : "+sprites.victory.alpha, 20, 180) ;
    //pCtx.fillText("AlphScr : "+sprites.score.alpha, 20, 200) ;
    //pCtx.fillText("AlphRtm : "+sprites.retrymenu.alpha, 20, 220) ;
    //pCtx.fillText("DsplTimer : "+displmanager.timer, 20, 240) ;
    //pCtx.fillText("Choice : "+displmanager.choice, 20, 260) ;

} ;