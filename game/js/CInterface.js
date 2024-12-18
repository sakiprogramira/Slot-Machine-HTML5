function CInterface(iCurBet,iTotBet,oContainerSlot){
    var _bShowingLine;
    var _aLinesBut;
    var _aPayline;
    var _oSpinBut;
    var _oInfoBut;
    var _oAddLineBut;
    var _oBetCoinBut;
    var _oAutoSpinBut;
    var _oButExit;
    
    var _pStartPosSpin;
    var _pStartPosAutoSpin;
    var _pStartPosCoin;
    var _pStartPosLines;
    var _pStartPosInfo;
    var _pStartPosMoney;
    var _pStartPosFreespinText;
    var _pStartPosWinFreespinText;
    
    var _oContainerFreespin;
    var _oContainerWinFreespin;
    var _oMoneyText;
    var _oTotalBetText;
    var _oWinText;
    var _oFreeSpinNumText;
    var _oFreeSpinWinText;
    var _oAudioToggle;	
    var _oButFullscreen;
    
    var _oAreYouSurePanel;	
    	
    var _pStartPosAudio;	
    var _pStartPosFullscreen;	
    var _pStartPosExit;	
    	
    var _fRequestFullScreen = null;	
    var _fCancelFullScreen = null;
    
    this._init = function(iCurBet,iTotBet,oContainerSlot){

        this._initPaylines(oContainerSlot);

        var oSprite = s_oSpriteLibrary.getSprite('but_text');
        _pStartPosInfo = {x:272,y:CANVAS_HEIGHT - oSprite.height/2 - 170};
        _oInfoBut = new CSpriteSheetTextButton(_pStartPosInfo.x,_pStartPosInfo.y,oSprite,TEXT_PAYTABLE,FONT_GAME_1,"#8d4402",34,oContainerSlot);        
        _oInfoBut.addEventListener(ON_MOUSE_UP, this._onInfo, this);

        _pStartPosCoin = {x:520,y:CANVAS_HEIGHT - oSprite.height/2 - 170};
        _oBetCoinBut = new CSpriteSheetTextButton(_pStartPosCoin.x, _pStartPosCoin.y,oSprite,TEXT_COIN +" " + formatEntries(iCurBet),FONT_GAME_1,"#8d4402",34,oContainerSlot);      
        _oBetCoinBut.addEventListener(ON_MOUSE_UP, this._onBet, this);
        
        _pStartPosLines = {x:758,y:CANVAS_HEIGHT - oSprite.height/2 - 170};
        _oAddLineBut = new CSpriteSheetTextButton(_pStartPosLines.x,_pStartPosLines.y,oSprite,TEXT_LINES + " " + NUM_PAYLINES,FONT_GAME_1,"#8d4402",34,oContainerSlot);
        _oAddLineBut.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        
        _pStartPosAutoSpin = {x:996 ,y:CANVAS_HEIGHT - oSprite.height/2 - 170};
        _oAutoSpinBut = new CSpriteSheetTextButton(_pStartPosAutoSpin.x,_pStartPosAutoSpin.y,oSprite,TEXT_AUTO_SPIN,FONT_GAME_1,"#8d4402",34,oContainerSlot);
        _oAutoSpinBut.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
        
        _pStartPosSpin = {x:1234,y:CANVAS_HEIGHT - oSprite.height/2 -170};
        _oSpinBut = new CSpriteSheetTextButton(_pStartPosSpin.x,_pStartPosSpin.y,oSprite,TEXT_SPIN,FONT_GAME_1,"#8d4402",34,oContainerSlot);
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);


        _pStartPosMoney = {x:148,y:CANVAS_HEIGHT - 290};
	_oMoneyText = new CTLText(oContainerSlot, 	
                    _pStartPosMoney.x, _pStartPosMoney.y, 278, 30, 	
                    30, "left", "#ffba00", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_MONEY +": " + formatEntries(TOTAL_MONEY)+TEXT_CURRENCY,	
                    true, true, false,	
                    false );	

        
	_oTotalBetText = new CTLText(oContainerSlot, 	
                    776, _pStartPosMoney.y, 278, 30, 	
                    30, "left", "#ffba00", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_BET +": "+formatEntries(iTotBet)+TEXT_CURRENCY,	
                    true, true, false,	
                    false );		
        	
        _oWinText = new CTLText(oContainerSlot, 	
                    1086, _pStartPosMoney.y, 278, 30, 	
                    30, "left", "#ffba00", FONT_GAME_1, 1,	
                    0, 0,	
                    TEXT_WIN + ": 0.00"+TEXT_CURRENCY,	
                    true, true, false,	
                    false );	

        var oSpriteFreespinBg = s_oSpriteLibrary.getSprite("amount_freespins");
        
        _pStartPosFreespinText = {x:400,y:-25};
        _oContainerFreespin = new createjs.Container();
        _oContainerFreespin.visible = false;
        _oContainerFreespin.x = _pStartPosFreespinText.x;
        _oContainerFreespin.y = _pStartPosFreespinText.y;
        _oContainerFreespin.regX = oSpriteFreespinBg.width/2;
        _oContainerFreespin.regY = oSpriteFreespinBg.height/2;
        oContainerSlot.addChild(_oContainerFreespin);

        var oBg = createBitmap(oSpriteFreespinBg);
        _oContainerFreespin.addChild(oBg);
        
        _oFreeSpinNumText = new CTLText(_oContainerFreespin, 	
                    20, oSpriteFreespinBg.height/2, oSpriteFreespinBg.width-40, oSpriteFreespinBg.height/2-10, 	
                    48, "center", "#fce0ab", FONT_GAME_1, 1,	
                    0, 0,	
                    "0",	
                    true, true, false,	
                    false );  
        
        
        var oSpriteFreespinWinBg = s_oSpriteLibrary.getSprite("amount_freespin_win");
        _pStartPosWinFreespinText = {x:1100,y:-25};
        _oContainerWinFreespin = new createjs.Container();
        _oContainerWinFreespin.visible = false;
        _oContainerWinFreespin.x = _pStartPosWinFreespinText.x;
        _oContainerWinFreespin.y = _pStartPosWinFreespinText.y;
        _oContainerWinFreespin.regX = oSpriteFreespinWinBg.width/2;
        _oContainerWinFreespin.regY = oSpriteFreespinWinBg.height/2;
        oContainerSlot.addChild(_oContainerWinFreespin);
        
        
        var oBg = createBitmap(oSpriteFreespinWinBg);
        _oContainerWinFreespin.addChild(oBg);

        
        _oFreeSpinWinText = new CTLText(_oContainerWinFreespin, 	
                   20, oSpriteFreespinWinBg.height/2, oSpriteFreespinWinBg.width-40, oSpriteFreespinWinBg.height/2-10, 	
                    48, "center", "#fce0ab", FONT_GAME_1, 1,	
                    0, 0,	
                    "0",	
                    true, true, false,	
                    false );   
        
        var oSpriteExit = s_oSpriteLibrary.getSprite("but_exit");	
        _pStartPosExit = {x: CANVAS_WIDTH - (oSpriteExit.width/2) - 4, y: (oSpriteExit.height/2)+ 4};   	
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSpriteExit,s_oAttachSection);	
        _oButExit.addEventListener(ON_MOUSE_UP,this._onExit,this);	
        	
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){	
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');	
            _pStartPosAudio = {x:oSprite.width/4+4,y:_pStartPosExit.y};	
            	
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oAttachSection);	
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);	
            	
            _pStartPosFullscreen = {x: _pStartPosAudio.x + oSprite.width/2 + 4,y:_pStartPosAudio.y};	
        }else{	
            _pStartPosFullscreen = {x:oSprite.width/2+4,y:_pStartPosExit.y};	
        }	
        	
        var doc = window.document;	
        var docEl = doc.documentElement;	
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;	
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;	
        	
        if(ENABLE_FULLSCREEN === false){	
            _fRequestFullScreen = false;	
        }	
        	
        if (_fRequestFullScreen && screenfull.isEnabled){	
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');	
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oAttachSection);	
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);	
        }	
        	
        _oAreYouSurePanel = new CAreYouSurePanel();	
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,this._onExitYes,this);	
        	
        if(!s_bMobile){	
            document.onkeyup   = this.onKeyUp;	
        }	
        	
        this.refreshButtonPos();
    };
    
    this.onKeyUp = function(evt) {
        if(!evt){ 
            evt = window.event; 
        } 
        
        if(evt.keyCode === 13){
            s_oInterface._onSpin();
        }

        evt.preventDefault();
        return false;
    };
    
   this.refreshButtonPos = function(){	
        if( (_pStartPosSpin.x - s_iOffsetX )> CANVAS_WIDTH - 210){	
            _oSpinBut.setPosition(_pStartPosSpin.x - s_iOffsetX,_pStartPosSpin.y - s_iOffsetY);	
        }	
        	
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){	
            _oAudioToggle.setPosition(_pStartPosAudio.x + s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);	
        }	
        if (_fRequestFullScreen && screenfull.isEnabled){	
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX,_pStartPosFullscreen.y + s_iOffsetY);	
        }	
        	
        _oButExit.setPosition(_pStartPosExit.x-s_iOffsetX,_pStartPosExit.y + s_iOffsetY);	
    };      
    
    this.unload = function(){
        _oSpinBut.unload();
        _oSpinBut = null;
        _oInfoBut.unload();
        _oInfoBut = null;
        _oAddLineBut.unload();
        _oAddLineBut = null;
        _oBetCoinBut.unload();
        _oBetCoinBut = null;
        _oAutoSpinBut.unload();
        _oAutoSpinBut = null;
        _oButExit.unload();
        _oAreYouSurePanel.unload();
        
         	
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){	
            _oAudioToggle.unload();	
            _oAudioToggle = null;	
        }	
        	
        if (_fRequestFullScreen && screenfull.isEnabled){	
            _oButFullscreen.unload();	
        }
        
        for(var i=0;i<NUM_PAYLINES;i++){
            _aLinesBut[i].unload();
        }
      
        s_oInterface = null;
    };

    this._initPaylines = function(oContainerSlot){
        var oSprite = s_oSpriteLibrary.getSprite('bet_but');
        _aLinesBut = new Array();

        var iPadding = -14;
        var iSpriteHeight = 82;
        var iHalfButHeight = iSpriteHeight/2;
        var iYOffset = iHalfButHeight+50;
        
        
        //LINE 4
        var oBut = new CBetBut(-oSprite.width/4 + 70, iYOffset,'bet_but4',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,4);
        _aLinesBut[3] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
                
        //LINE 2
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but2',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,2);
        _aLinesBut[1] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 20
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but20',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,20);
        _aLinesBut[19] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 16
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but16',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,16);
        _aLinesBut[15] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 10
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but10',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,10);
        _aLinesBut[9] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 1
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but1',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,1);
        _aLinesBut[0] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding +1;
        
        //LINE 11
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but11',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,11);
        _aLinesBut[10] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding ;
        
        
        //LINE 17
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but17',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,17);
        _aLinesBut[16] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        
        //LINE 3
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but3',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,3);
        _aLinesBut[2] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 5
        oBut = new CBetBut( -oSprite.width/4 + 70, iYOffset,'bet_but5',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,5);
        _aLinesBut[4] = oBut;
        
        iYOffset = iHalfButHeight+50;
        
        
        //RIGHT COLUMN
        //LINE 14
        var oBut = new CBetBut(  1434 -oSprite.width/4, iYOffset,'bet_but14',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,14);
        _aLinesBut[13] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 12
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but12',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,12);
        _aLinesBut[11] = oBut;

        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 9
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but9',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,9);
        _aLinesBut[8] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 18
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but18',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,18);
        _aLinesBut[17] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 6;
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but6',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,6);
        _aLinesBut[5] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding+1;
        
        //LINE 7;
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but7',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,7);
        _aLinesBut[6] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 19;
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but19',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,19);
        _aLinesBut[18] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 8
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but8',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,8);
        _aLinesBut[7] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 13
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but13',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,13);
        _aLinesBut[12] = oBut;
        
        iYOffset+= iSpriteHeight + iPadding;
        
        //LINE 15
        oBut = new CBetBut( 1434 -oSprite.width/4, iYOffset,'bet_but15',oContainerSlot);
        oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,15);
        _aLinesBut[14] = oBut;
        
        
       
       
        var aPos = [{x:122,y:470},{x:122,y:200},{x:122,y:678},{x:122,y:126},{x:122,y:180},{x:122,y:122},{x:122,y:460},{x:122,y:198},{x:122,y:130},{x:122,y:228},
                    {x:122,y:214},{x:122,y:190},{x:122,y:420},{x:122,y:126},{x:122,y:422},{x:122,y:230},{x:122,y:470},{x:122,y:148},{x:122,y:120},{x:122,y:260}];
        _aPayline = new Array();
        for(var k = 0;k<NUM_PAYLINES;k++){
            var oBmp = new createBitmap(s_oSpriteLibrary.getSprite("payline_"+(k+1)));
            oBmp.x = aPos[k].x;
            oBmp.y = aPos[k].y;
            oBmp.visible = false;

            oContainerSlot.addChild(oBmp);
            _aPayline[k] = oBmp;
        }
    };

    this.refreshMoney = function(iMoney){	
        _oMoneyText.refreshText(TEXT_MONEY +": " + formatEntries(iMoney) + TEXT_CURRENCY);	
    };
    
    this.refreshBet = function(iBet){	
        _oBetCoinBut.setText(TEXT_COIN +" " + formatEntries(iBet));	
    };	
    	
    this.refreshTotalBet = function(iTotBet){	
        _oTotalBetText.refreshText(TEXT_BET +": "+ formatEntries(iTotBet) +TEXT_CURRENCY);	
    };
    
    this.refreshNumLines = function(iLines){
        _bShowingLine = true;
        _oAddLineBut.setText(TEXT_LINES + " " + iLines);
        
        for(var i=0;i<NUM_PAYLINES;i++){
            if(i<iLines){
                _aLinesBut[i].setOn();
                _aPayline[i].visible = true;
            }else{
                _aLinesBut[i].setOff();
            }
        }
        
        
        setTimeout(function(){
                            for(var i=0;i<NUM_PAYLINES;i++){
                                _aPayline[i].visible = false;
                            }
                            _bShowingLine = false;
        },1000);
    };
    
    this.resetWin = function(){	
        _oWinText.refreshText(TEXT_WIN+": "+ formatEntries(0) );	
    };	
    	
    this.refreshWinText = function(iWin){	
        _oWinText.refreshText(TEXT_WIN + ": "+ formatEntries(iWin) );	
    };
    
    this.refreshFreeSpinNum = function(iNum){
        _oFreeSpinNumText.refreshText(iNum);
        
        if(iNum === ""){
            _oContainerFreespin.visible = false;
            _oContainerWinFreespin.visible = false;
        }else{
            _oContainerFreespin.visible = true;
            _oContainerWinFreespin.visible = true;
        }
    };
    
    this.refreshFreeSpinAmount = function(iAmount){
        if(iAmount === ""){
            _oFreeSpinWinText.refreshText(iAmount);	
        }else{
            _oFreeSpinWinText.refreshText(formatEntries(iAmount));	
        }
    };	
    	
    this.showLine = function(iLine){	
        if(iLine > 0){	
            _aPayline[iLine-1].visible = true;	
        }	
    };	
    	
    this.hideLine = function(iLine){	
        if(iLine > 0){	
            _aPayline[iLine-1].visible = false;	
        }	
    };
    
    this.hideAllLines = function(){
        for(var i=0;i<NUM_PAYLINES;i++){
            _aPayline[i].visible = false;
        }
    };
    
    this.disableBetBut = function(bDisable){
        for(var i=0;i<NUM_PAYLINES;i++){
            _aLinesBut[i].disable(bDisable);
        }
    };
    
    this.enableGuiButtons = function(){
        _oSpinBut.enable();
        _oAutoSpinBut.enable();
        _oBetCoinBut.enable();
        _oAddLineBut.enable();
        _oInfoBut.enable();
        
        if(!s_bMobile){
            document.onkeyup   = this.onKeyUp;
        }
    };
	
    this.enableSpin = function(bAutoSpin){
        _oSpinBut.enable();
        if(bAutoSpin){
            _oAutoSpinBut.enable();
        }
        
        if(!s_bMobile){
            document.onkeyup   = this.onKeyUp;
        }
    };

    this.disableSpin = function(bAutoSpin){
        _oSpinBut.disable();
        
        if(bAutoSpin){
            _oAutoSpinBut.disable();
        }
        
        if(!s_bMobile){
            document.onkeyup   = null;
        }
    };
    
    this.disableGuiButtons = function(bAutoSpin,bFreespin){	
        if(!s_bMobile){	
            document.onkeyup   = null;	
        }	
        	
        if(!bFreespin){	
            if(bAutoSpin){	
                _oSpinBut.disable();	
                _oAutoSpinBut.setText(TEXT_STOP_AUTO);	
            }else{	
                _oAutoSpinBut.disable();	
                _oSpinBut.setText(TEXT_SKIP)	
            }	
            	
        }else{	
            _oAutoSpinBut.disable();	
            this.disableSpin(true);	
        }	
        	
        	
        _oBetCoinBut.disable();	
        _oAddLineBut.disable();	
        _oInfoBut.disable();	
    };
    
    this.setAutoSpinState = function(szText){
        _oAutoSpinBut.setText(szText);
    };
    
    this.setSpinState = function(szText){	
        _oSpinBut.setText(szText);	
    };
    
    this._onBetLineClicked = function(iLine){
        if(_bShowingLine){
            return;
        }
        
        this.refreshNumLines(iLine);
        
        s_oGame.activateLines(iLine);
    };
    
    this._onSpin = function(){
        if(_oSpinBut.getText() === TEXT_SKIP){	
            s_oGame.forceStopReel();	
            _oSpinBut.setText(TEXT_SPIN);	
        }else{	
            s_oGame.onSpin();	
        }	
            
    };
    
    this._onAddLine = function(){
        s_oGame.addLine();
    };
    
    this._onInfo = function(){
        s_oGame.onInfoClicked();
    };
    
    this._onBet = function(){
        s_oGame.changeCoinBet();
    };
    
    this._onAutoSpin = function(){
        if(_oAutoSpinBut.getText() === TEXT_STOP_AUTO){	
            _oAutoSpinBut.setText(TEXT_AUTO_SPIN);	
            s_oGame.onAutoSpin(false);	
        }else{	
            _oAutoSpinBut.setText(TEXT_STOP_AUTO);	
            s_oGame.onAutoSpin(true);	
        }
        
    };
    
    this.resetFullscreenBut = function(){	
	if (_fRequestFullScreen && screenfull.isEnabled){	
		_oButFullscreen.setActive(s_bFullscreen);	
	}	
    };	
    this._onFullscreenRelease = function(){	
        if(s_bFullscreen) { 	
		_fCancelFullScreen.call(window.document);	
	}else{	
		_fRequestFullScreen.call(window.document.documentElement);	
	}	
		
	sizeHandler();	
    };	
    	
    this._onAudioToggle = function(){	
        Howler.mute(s_bAudioActive);	
        s_bAudioActive = !s_bAudioActive;	
    };	
    	
    this._onExit = function(){	
        _oAreYouSurePanel.show(TEXT_ARE_SURE);	
    };	
    	
    this._onExitYes = function(){	
        s_oGame.onExit();  	
    };
    
    s_oInterface = this;
    
    this._init(iCurBet,iTotBet,oContainerSlot);

}

var s_oInterface = null;