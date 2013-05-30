/* This code written in whole by Jacob A Brennan. */
var mainLab = {
    lab: undefined,
    // Define compatibility flags. This may be expanded in the future.
    compatibility: {
        EVENT: 1,
        DOM: 2,
        HTML5: 4,
        CONTROLS: 8,
        CSS_TRANSITION: 16,
        status: 0, // Not undefined, so that bitwise operations will work.
        check: function (dom_content_event){
            // First check if the event DOMContentLoaded can be listened for and will be fired.
            if(dom_content_event){
                // Test for the ability to listen for events.
                if(document.addEventListener){
                    this.status |= this.EVENT;
                }
            } else{
                /*
                // Test for HTML5 video support by testing for the existence of the main video.
                    // Note: Assumes document.getElementById. Support charts show support back to IE6.
                var video_test = document.getElementById('lab_video');
                if(video_test && video_test.canPlayType){
                    */this.status |= this.HTML5;/*
                }
                /
                // Test for progress bar click support, which requires clientWidth.
                    // Note: event.clientX is not tested here, but support charts show near universal compatibility.
                var progressBar = document.getElementById('control_progress')
                if((progressBar.clientWidth !== undefined) && (progressBar.offsetLeft !== undefined) && progressBar.offsetParent){
                    */this.status |= this.CONTROLS;/*
                }*/
                // Test for DOM manipulation.
                if(document.createElement && document.appendChild){
                    var test_element = document.createElement('div');
                    var test_contents = document.createElement('span');
                    test_contents.innerHTML = 'textContent check';
                    test_element.appendChild(test_contents)
                    if(test_element.setAttribute || test_element.innerHTML){
                        this.status |= this.DOM;
                    }
                    // textContent is used by the svg DOM in the custom controls.
                    if(!test_contents.textContent){
                        this.status &= ~this.CONTROLS;
                    }
                    var test_style = test_element.style;
                    if( 'transition'       in test_style ||
                        'MozTransition'    in test_style ||
                        'WebkitTransition' in test_style ||
                        'OTransition'      in test_style){
                        this.status |= this.CSS_TRANSITION;
                    }
                }
                /* Remaining Tests:
                 * mp4 || webm || theora.ogv
                 * inline SVG
                 * Embedded fonts
                 */
            }
            return this.status;
        },
        notify: function (){
            /* Function must be delayed to allow for page loading,
             * particularly the support_message div.
             */
            var self = this;
            setTimeout(function (){
                document.getElementById("support_message").style.display = "block";
                if(!(self.status & (self.EVENT | self.DOM | self.HTML5))){
                    document.getElementById("support_none").style.display = "block";
                } else if(!(self.status & self.CSS_TRANSITION && self.status & self.CONTROLS)){
                    document.getElementById("support_limited").style.display = "block";
                    document.getElementById("support_button").addEventListener("click", function (){
                        document.getElementById("support_message").style.display = "none";
                    }, false);
                }
            }, 1000);
        }
    },
    create_player: function (media_type){
        // media_type: video | audio
        var player = {
            media: undefined,
            popcorn: undefined,
            controls: undefined,
            currentDuration: 0,
            dispose: function (){
                this.media = null;
                Popcorn.destroy(this.popcorn);
                this.popcorn = null;
                //this.controls.distroy();
                this.controls = null;
            }
        }
        if(media_type){
            player.media = document.createElement(media_type);
        }
        player.popcorn = Popcorn(player.media);
        player.controls = this.create_controls(player);
        return player;
    },
    create_controls: function (player){
        console.log('trying')
        if(!(this.compatibility.status & this.compatibility.CONTROLS)){
            player.popcorn.media.controls = "true";
            return undefined;
        }
        var self = this;
        var controls = document.createElement('div');
        controls.setAttribute('class', 'controls');
        var svgNs = 'http://www.w3.org/2000/svg';
        var controlPanel = document.createElementNS(svgNs, 'svg');
        controlPanel.setAttribute('class', 'control_panel');
        controlPanel.setAttribute('viewBox', '0 0 128 9');
        /*control_panel.setAttributeNS(null, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        control_panel.setAttributeNS(null, 'xmlns:ev', 'http://www.w3.org/2001/xml-events');*/
        //var big_play = document.createElement('svg');
        /*
        big_play.outerHTML = '\
            <svg id="control_big_play" width="100" height="100" viewBox="0 0 100 100"\
                xmlns="http://www.w3.org/2000/svg"\
                xmlns:xlink="http://www.w3.org/1999/xlink"\
                xmlns:ev="http://www.w3.org/2001/xml-events">\
                <style>\
                    #big_play{\
                        fill: grey;\
                    }\
                    #big_play:hover{\
                        fill: red;\
                    }\
                </style>\
                <title>Play</title>\
                <path id="big_play" d="m10,10l80,40l-80,40l0,-80" />\
            </svg>\
        ';*/
        var playPause = document.createElementNS(svgNs, 'svg');
        playPause.setAttribute('class', 'icon toggle_play');
        playPause.setAttribute('stroke-linejoin', 'round');
        playPause.setAttribute('fill', 'rgb(102,102,102)');
        playPause.setAttribute('stroke', '#000000');
        playPause.setAttribute('stroke-width', '0');
        playPause.setAttribute('x', '7');
        playPause.setAttribute('y', '1');
        playPause.setAttribute('width', '7');
        playPause.setAttribute('height', '7');
        playPause.setAttribute('viewBox', '0 0 100 100');
        var play = document.createElementNS(svgNs, 'path');
        play.setAttribute('class', 'play');
        play.setAttribute('d', 'm5,5l81,45l-81,45l0,-90z');
        var pause = document.createElementNS(svgNs, 'path');
        pause.setAttribute('class', 'pause');
        pause.setAttribute('d', 'm12,86 l0,-72 l20,0 l0,71.20879 l-20,0.79121 M45,86 l0,-72 l20,0 l0,71.20879 l-20,0.79121z');
        pause.style.opacity = '0';
        playPause.appendChild(play);
        playPause.appendChild(pause);
        controlPanel.appendChild(playPause);
        /*
            <style>\
                #pause{\
                    opacity: 0;\
                }\
                .icon:hover{\
                    fill: red;\
                }\
            </style>\
        */
        var progressBar = document.createElementNS(svgNs, 'g');
        progressBar.setAttribute('class', 'progress_bar');
        progressBar.setAttribute('transform', 'translate(17,3)');
        progressBar.setAttribute('width', '75');
        progressBar.setAttribute('height', '3');
        var buffered = document.createElementNS(svgNs, 'rect');
        buffered.setAttribute('class', 'buffered');
        buffered.setAttribute('height', '3');
        progressBar.appendChild(buffered);
        var elapsed = document.createElementNS(svgNs, 'rect');
        elapsed.setAttribute('class', 'elapsed');
        elapsed.setAttribute('height', '3');
        progressBar.appendChild(elapsed);
        controlPanel.appendChild(progressBar);
        var mute = document.createElementNS(svgNs, 'svg');
        mute.setAttribute('class', 'icon mute');
        mute.setAttribute('stroke-linejoin', 'round');
        mute.setAttribute('fill', 'rgb(102,102,102)');
        mute.setAttribute('stroke', '#000000');
        mute.setAttribute('stroke-width', '0');
        mute.setAttribute('x', '114');
        mute.setAttribute('y', '1');
        mute.setAttribute('width', '7');
        mute.setAttribute('height', '7');
        mute.setAttribute('viewBox', '0 0 100 100');
        var muteSpeaker = document.createElementNS(svgNs, 'path');
        var muteSound = document.createElementNS(svgNs, 'path');
        muteSpeaker.setAttribute('class', 'mute_speaker');
        muteSpeaker.setAttribute('d', 'm8,30l0,40l20,0l25,25l0,-90l-25,25l-20,0z');
        muteSound.setAttribute('class', 'mute_sound');
        muteSound.setAttribute('d', 'm65,20a50,50 0 0 10,60 M75,10a50,50 0 0 10,80');
        mute.appendChild(muteSpeaker);
        mute.appendChild(muteSound);
        controlPanel.appendChild(mute);
        var timer = document.createElementNS(svgNs, 'svg');
        timer.setAttribute('class', 'timer');
        timer.setAttribute('x', '93');
        timer.setAttribute('y', '1');
        timer.setAttribute('width', '21');
        timer.setAttribute('height', '7');
        timer.setAttribute('viewBox', '0 0 225 100');
        var timeText = document.createElementNS(svgNs, 'text');
        timeText.setAttribute('class', 'time_text');
        timeText.setAttribute('text-anchor', 'left');
        timeText.setAttribute('font-family', 'sans-serif');
        timeText.setAttribute('font-size', '24');
        timeText.setAttribute('y', '22');
        timeText.setAttribute('x', '0');
        timeText.setAttribute('stroke', '#000000');
        timeText.setAttribute('transform', 'matrix(2.0294, 0, 0, 2.0294, 4.73115, 22.9506)');
        timer.appendChild(timeText);
        controlPanel.appendChild(timer);
        /*
        controls.appendChild(big_play);
        */
        // Capture standard play events.
        player.popcorn.media.addEventListener("click", function (){
            if(player.popcorn.paused()){
                player.popcorn.play()
            } else{
                player.popcorn.pause();
            }
        }, false);
        /*
        // Big Play Button
        big_play.addEventListener("click", function (){
            player.popcorn.play();
        }, false)
        */
        // Play/Pause Button
        playPause.addEventListener("click", function (){
            if(player.popcorn.currentTime() == player.popcorn.duration()){
                player.popcorn.currentTime(0);
                player.popcorn.play();
                return;
            }
            if(player.popcorn.paused()){ player.popcorn.play();}
            else{player.popcorn.pause();}
        }, false);
        player.popcorn.on("playing", function (){
            /*big_play.style.opacity = "0";
            setTimeout(function (){
                big_play.style.display = "none";
            }, 1000)*/
            play.style.opacity = "0";
            pause.style.opacity = "1";
        });
        player.popcorn.on("pause", function (){
            play.style.opacity = "1";
            pause.style.opacity = "0";
        });
        player.popcorn.on("ended", function (){
            play.style.opacity = "1";
            pause.style.opacity = "0";
        });
        // Progress Bar and Timer
        progressBar.addEventListener('click', function (event){
            var duration = player.popcorn.duration();
            if(!duration){ return;}
            var progressRect = progressBar.getBoundingClientRect();
            var progressWidth = progressRect.right - progressRect.left;
            var offsetX = event.pageX - progressRect.left;
            var offsetPercent = offsetX / progressWidth;
            var seekTime = duration * offsetPercent;
            elapsed.style.width = ''+(offsetPercent*100)+'%';
            player.popcorn.currentTime(seekTime);
        });
        var maxBarMidth = parseInt(progressBar.getAttribute('width'));
        player.popcorn.on("timeupdate", function (){
            var duration = player.popcorn.duration();
            if(!duration){ return;}
            var currentTime = player.popcorn.currentTime();
            var elapsedPercent = currentTime / duration;
            elapsed.setAttribute('width', ''+(elapsedPercent*maxBarMidth));
            var extra0 = ((currentTime%60) < 10)? "0" : "";
            currentTime = ""+Math.floor(currentTime/60)+":"+extra0+Math.floor(currentTime%60);
            if(player.currentDuration !== undefined){
                timeText.textContent = ""+currentTime+"/"+player.currentDuration;
            } else{
                timeText.textContent = ""+currentTime;
            }
        });
        player.popcorn.on("progress", function (){
            player.currentDuration = player.popcorn.duration();
            if(!player.currentDuration){ return;}
            var bufferedRange = player.popcorn.buffered();
            var bufferEnd = bufferedRange.end(0);
            if(!bufferEnd){ bufferEnd = 0}
            buffered.setAttribute('width', ''+((bufferEnd/player.currentDuration)*maxBarMidth));
            var currentTime = player.popcorn.currentTime()
            var extra0 = ((currentTime%60) < 10)? "0" : "";
            currentTime = ""+Math.floor(currentTime/60)+":"+extra0+Math.floor(currentTime%60);
            player.currentDuration = ""+Math.floor(player.currentDuration/60)+":"+Math.floor(player.currentDuration%60);
            if(player.currentDuration){
                timeText.textContent = ""+currentTime+"/"+player.currentDuration;
            } else{
                timeText.textContent = ""+currentTime;
            }
        });
        // Volume:
        mute.addEventListener("click", function (){
            if(player.popcorn.muted()){
                player.popcorn.unmute();
                muteSound.style.opacity = "1";
            } else{
                player.popcorn.muted(true);
                muteSound.style.opacity = "0";
            }
        }, false);
        return controlPanel;
    },
    setup: function (){
        var self = this;
        //document.title = configuration.title;
        this.seeking = false;
        //this.setup_popcorn(configuration);
        window.addEventListener("resize", function (e){ self.resize()}, false);
        window.addEventListener("keydown", function (e){ self.control_interface.key_down(e);}, false);
        window.addEventListener('mousemove', function (e){ self.control_interface.mouse_control(e);}, false);
        window.addEventListener('mousedown', function (e){ self.control_interface.mouse_control(e);}, false);
        window.addEventListener('mouseup', function (e){ self.control_interface.mouse_control(e);}, false);
        // Setup frame slider:
        this.frame = document.getElementById("frame");
        this.slider = document.getElementById("slider");
        this.middle = document.getElementById("frame_middle");
        this.right  = document.getElementById("frame_right" );
        this.left   = document.getElementById("frame_left"  );
        this.video_width = 1280;
        this.video_height = 720;
        this.slider_state = "middle";
        this.arrow_left  = document.getElementById("arrow_left" );
        this.arrow_right = document.getElementById("arrow_right");
        this.arrow_left.addEventListener("click", function (){
            mainLab.transition("left");
        }, false)
        this.arrow_right.addEventListener("click", function (){
            mainLab.transition("right");
        }, false)
        /*// Setup Instructions + Tips Sections:
        this.tip_manager.setup(configuration);
        this.instructions.setup(configuration);
        //*/
        this.resize();
        /*
        this.popcorn.on("seeked", function (){
            self.seeking = false;
            self.tip_manager.populate(self.popcorn.currentTime());
        });
        this.popcorn.on("seeking", function (){
            self.seeking = true;
            self.tip_manager.clear_tips();
        });
        */
        // Finished
    },
    registerLab: function (labType, configuration){
        this.lab = Object.create(labType);
        this.lab.setup(configuration);
    },
    cancelLab: function (oldLab){
        this.lab = null;
        oldLab.dispose();
    },
    frame_left: undefined,
    frame_middle: undefined,
    frame_right: undefined,
    registerFrame: function (frame_loc, new_frame){
        var container_element;
        switch(frame_loc){
            case 'left': {
                if(this.frame_left){
                    this.left.removeChild(this.frame_left);
                }
                this.frame_left = new_frame;
                container_element = this.left;
                break;
            }
            case 'middle': {
                if(this.frame_middle){
                    this.middle.removeChild(this.frame_middle);
                }
                this.frame_middle = new_frame;
                container_element = this.middle;
                break;
            }
            case 'right': {
                if(this.frame_right){
                    this.right.removeChild(this.frame_right);
                }
                this.frame_right = new_frame;
                container_element = this.right;
                break;
            }
        }
        this.transition(null, true);
        if(!container_element){
            return null;
        } else{
            return container_element.appendChild(new_frame);
        }
    },
    cancelFrame: function (oldFrame){
        var container_element;
        if(oldFrame == this.frame_left){
            this.frame_left = null;
            container_element = this.left;
        }
        if(oldFrame == this.frame_middle){
            this.frame_middle = null;
            container_element = this.middle;
        }
        if(oldFrame == this.frame_right){
            this.frame_right = null;
            container_element = this.right;
        }
        if(container_element){
            container_element.removeChild(oldFrame);
        }
        this.transition(null, true);
    },
    control_interface: {
        focus: undefined,
        dragged_element: undefined,
        last_click: undefined,
        key_down: function (e){
            var key_code;
            if(window.event){ key_code = e.keyCode} // IE 8 and earlier compatibility.
            else{
                key_code = e.which// | e.keyCode;
            }
            switch(key_code){
                case 37:{
                    mainLab.transition("left");
                    break;
                }
                case 39:{
                    mainLab.transition("right");
                    break;
                }/*
                case 38:{
                    mainLab.scroll("up");
                    break;
                }
                case 40:{
                    mainLab.scroll("down");
                    break;
                }*/
            }
        },
        mouse_control: function (e){
            if(window.event){ e = window.event} // IE 8 and earlier compatibility.
            switch(e.type.toLowerCase()){
                case 'mousedown':{
                    this.dragged_element = e.target;
                    this.last_click = {
                        x: e.pageX,
                        y: e.pageY,
                        offset_x: e.pageX - e.target.offsetLeft,
                        offset_y: e.pageY - e.target.offsetTop
                    };
                    break;
                }
                case 'blur':
                case 'mouseup':{
                    this.dragged_element = undefined;
                    mainLab.right.className = '';
                    break;
                }
                case 'mousemove':{
                    if(this.dragged_element && (typeof this.dragged_element.drag === 'function')){
                        this.dragged_element.drag(e);
                    }
                }
            }
        }
    },
    viewport_size: function (){
        var e  = document.documentElement;
        var g  = document.getElementsByTagName('body')[0];
        var _x = window.innerWidth  || e.clientWidth  || g.clientWidth;
        var _y = window.innerHeight || e.clientHeight || g.clientHeight;
        return {width: _x, height: _y};
    },
    resize: function (){
        this.slider.style.transition       = "";
        this.slider.style.MozTransition    = "";
        this.slider.style.WebkitTransition = "";
        this.slider.style.OTransition      = "";
        var size = this.viewport_size();
        var monitor_aspect_ratio = size.width / size.height;
        var video_aspect_ratio = 16 / 9;
        var modified_width;
        var modified_height;
        if(monitor_aspect_ratio >= video_aspect_ratio){
            // Center Horizontally
            modified_height = size.height;
            modified_width = video_aspect_ratio * modified_height;
            this.frame.style.top = "0px";
            this.frame.style.left = ""+Math.floor((size.width-modified_width)/2)+"px";
        } else{
            // Center Vertically
            modified_width = size.width;
            modified_height = modified_width / video_aspect_ratio;
            this.frame.style.top = ""+Math.floor((size.height-modified_height)/2)+"px";
            this.frame.style.left = "0px";
        }
        this.frame.style.width  = modified_width +"px";
        this.frame.style.height = modified_height+"px";
        document.body.style.fontSize = Math.round(modified_height/20)+"px";
        this.left.style.fontSize = Math.round(modified_height/16)+"px";
        this.middle.style.top     = "0px";
        this.left.style.top       = "0px";
        this.right.style.top      = "0px";
        this.slider.style.top     = "0px";
        this.middle.style.left    = ( modified_width  )+"px";
        this.left.style.left      = "0px";
        this.right.style.left     = ( modified_width*2)+"px";
        switch(this.slider_state){
            case "middle":{
                this.slider.style.left = "-100%";
                break;
            }
            case "left":{
                this.slider.style.left = "0%";
                break;
            }
            case "right":{
                this.slider.style.left = "-200%"
                break;
            }
        }
        this.middle.style.width   = modified_width+"px";
        this.left.style.width     = modified_width+"px";
        this.right.style.width    = modified_width+"px";
        this.slider.style.width   = (modified_width*3)+"px";
        this.middle.style.height  = modified_height+"px";
        this.left.style.height    = modified_height+"px";
        this.right.style.height   = modified_height+"px";
        this.slider.style.height  = modified_height+"px";
        if(this.lab && ((typeof this.lab.resize) === 'function')){
            this.lab.resize();
        }
    },
    transition: function (direction, force){
        var self = this;
        if(direction){
            this.slider.style.transition       = "left 1s";
            this.slider.style.MozTransition    = "left 1s";
            this.slider.style.WebkitTransition = "left 1s";
            this.slider.style.OTransition      = "left 1s";
            var destinationFrame = this.slider_state;
            switch(direction){
                case "left":{
                    switch(this.slider_state){
                        case "middle":{
                            destinationFrame = 'left';
                            break;
                        }
                        case "right":{
                            destinationFrame = 'middle';
                            break;
                        }
                    }
                    break;
                }
                case "right":{
                    switch(this.slider_state){
                        case "middle":{
                            destinationFrame = "right";
                            break;
                        }
                        case "left":{
                            destinationFrame = "middle";
                            break;
                        }
                    }
                    break;
                }
            }
            switch(destinationFrame){
                case 'left':{
                    if(this.frame_left){
                        this.slider_state = destinationFrame;
                    }
                    break;
                }
                case 'middle':{
                    if(this.frame_middle){
                        this.slider_state = destinationFrame;
                    }
                    break;
                }
                case 'right':{
                    if(this.frame_right){
                        this.slider_state = destinationFrame;
                    }
                    break;
                }
            }
        }
        switch(this.slider_state){
            case "left":{
                //this.tip_manager.clear_tips();
                this.slider.style.left = "0%";
                this.arrow_left.style.opacity = "0";
                if(this.frame_middle){
                    this.arrow_right.style.opacity = "1";
                } else{
                    this.arrow_right.style.opacity = "0";
                }
                //this.popcorn.pause()
                break;
            }
            case "middle":{
                this.slider.style.left = "-100%";
                if(this.frame_left){
                    this.arrow_left.style.opacity = "1";
                } else{
                    this.arrow_left.style.opacity = "0";
                }
                if(this.frame_right){
                    this.arrow_right.style.opacity = "1";
                } else{
                    this.arrow_right.style.opacity = "0";
                }
                //this.tip_manager.populate();
                break;
            }
            case "right":{
                //this.tip_manager.clear_tips();
                this.slider.style.left = "-200%";
                this.arrow_right.style.opacity = "0";
                if(this.frame_middle){
                    this.arrow_left.style.opacity = "1";
                } else{
                    this.arrow_left.style.opacity = "0";
                }
                //this.popcorn.pause()
                break;
            }
        }
    },
};

mainLab.compatibility.check(true);
if((mainLab.compatibility.status & mainLab.compatibility.EVENT)){
    document.addEventListener("DOMContentLoaded", function (){
        mainLab.compatibility.check();
        var full_featured = (
            mainLab.compatibility.CONTROLS |
            mainLab.compatibility.CSS_TRANSITION |
            mainLab.compatibility.DOM |
            mainLab.compatibility.EVENT |
            mainLab.compatibility.HTML5);
        if(mainLab.compatibility.status != full_featured){
            mainLab.compatibility.notify()
            console.log(mainLab.compatibility.CONTROLS)
            console.log(mainLab.compatibility.CSS_TRANSITION)
            console.log(mainLab.compatibility.DOM)
            console.log(mainLab.compatibility.EVENT)
            console.log(mainLab.compatibility.HTML5)
            console.log('Notify: '+mainLab.compatibility.status + ' | '+full_featured)
        }
        if(mainLab.compatibility.status & (mainLab.compatibility.DOM | mainLab.compatibility.HTML5)){
            mainLab.setup();
            mainLab.registerLab(instructionLab, lab_configuration);
        }
    }, false);
} else{
    mainLab.compatibility.notify()
    console.log('notify: '+mainLab.compatibility.status)
}
setTimeout(function (){
    mainLab.cancelLab(mainLab.lab);
}, 3000);
setTimeout(function (){
    mainLab.registerLab(instructionLab, lab_configuration);
}, 5000);
