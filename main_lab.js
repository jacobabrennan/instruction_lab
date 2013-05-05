/*
 * This code written in whole by Jacob A Brennan.
 *
 */
main_lab = {
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
                var progress_bar = document.getElementById('control_progress')
                if((progress_bar.clientWidth !== undefined) && (progress_bar.offsetLeft !== undefined) && progress_bar.offsetParent){
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
    create_player: function (){
        var player = {
            video: undefined,
            popcorn: undefined,
            controls: undefined,
            current_duration: 0
        }
        player.video = document.createElement('video');
        player.popcorn = Popcorn(video);
        player.controls = this.create_controls(player);
    },
    create_controls: function (player){
        if(!(this.compatibility.status & this.compatibility.CONTROLS)){
            player.popcorn.media.controls = "true";
            return undefined;
        }
        var self = this;
        var controls = document.createElement('div');
        controls.setAttribute('id', 'controls');
        var big_play = document.createElement('svg');
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
        ';
        var panel = document.createElement('div');
        panel.setAttribute('id', 'control_panel');
        var play = document.createElement('svg');
        play.outerHTML = '\
            <svg id="control_play" width="100" height="100" viewBox="0 0 100 100"\
                xmlns="http://www.w3.org/2000/svg"\
                xmlns:xlink="http://www.w3.org/1999/xlink"\
                xmlns:ev="http://www.w3.org/2001/xml-events">\
                <title>Play / Pause</title>\
                <style>\
                    #pause{\
                        opacity: 0;\
                    }\
                    .icon:hover{\
                        fill: red;\
                    }\
                </style>\
                <g class="icon" stroke-linejoin="round" fill="rgb(102, 102, 102)" stroke="#000000" stroke-width="0">\
                    <g id="play">\
                        <path id="play" d="m5,5l81,45l-81,45l0,-90z" />\
                    </g>\
                    <g id="pause">\
                        <path d="m12,86l0,-72l20,0l0,71.20879l-20,0.79121z" />\
                        <path d="m45,86l0,-72l20,0l0,71.20879l-20,0.79121z" />\
                    </g>\
                </g>\
            </svg>\
        ';
        var progress = document.createElement('div');
        control_progress.setAttribute('id', 'control_progress');
        var buffered_time = document.createElement('div');
        var elapsed_time = document.createElement('div');
        buffered_time.setAttribute('id', 'control_buffered_time');
        elapsed_time.setAttribute('id', 'control_elapsed_time');
        progress.appendChild(buffered_time);
        progress.appendChild(elapsed_time);
        var mute = document.createElement('svg');
        mute.outerHTML = '\
            <svg id="control_mute" width="100" height="100" viewBox="0 0 100 100"\
                xmlns="http://www.w3.org/2000/svg"\
                xmlns:xlink="http://www.w3.org/1999/xlink"\
                xmlns:ev="http://www.w3.org/2001/xml-events">\
                <title>Mute / Unmute</title>\
                <style>\
                    .icon:hover{\
                        fill: red;\
                    }\
                </style>\
                <g stroke="#000000" stroke-width="0" stroke-linejoin="round">\
                    <path class="icon" d="m8,30l0,40l20,0l25,25l0,-90l-25,25l-20,0z" fill="rgb(102, 102, 102)" />\
                    <g id="sound" fill="none" stroke="rgb(102, 102, 102)" stroke-width="8">\
                        <path d="m65,20a50,50 0 0 10,60" id="svg_6"/>\
                        <path d="m75,10a50,50 0 0 10,80" id="svg_7"/>\
                    </g>\
                </g>\
            </svg>\
        ';
        var timer = document.createElement('svg');
        timer.outerHTML = '\
            <svg id="control_timer" width="300" height="100" viewBox="0 0 225 100"\
                xmlns="http://www.w3.org/2000/svg"\
                xmlns:xlink="http://www.w3.org/1999/xlink"\
                xmlns:ev="http://www.w3.org/2001/xml-events">\
                <title>Timer</title>\
                <text id="svg_timer" transform="matrix(2.0294, 0, 0, 2.0294, 4.73115, 22.9506)" text-anchor="left"\
                    font-family="sans-serif" font-size="24" y="22" x="0" stroke="#000000"></text>\
            </svg>\
        ';
        panel.appendChild(play);
        panel.appendChild(progress);
        panel.appendChild(timer);
        panel.appendChild(mute);
        controls.appendChild(big_play);
        controls.appendChild(panel);
        // Capture standard play events.
        player.popcorn.media.addEventListener("click", function (){
            if(player.popcorn.paused()){
                player.popcorn.play()
            } else{
                player.popcorn.pause();
            }
        }, false);
        // Big Play Button
        big_play.addEventListener("click", function (){
            player.popcorn.play();
        }, false)
        // Play/Pause Button
        play.addEventListener("click", function (){
            if(player.popcorn.currentTime() == player.popcorn.duration()){
                player.popcorn.currentTime(0);
                player.popcorn.play();
                return;
            }
            if(player.popcorn.paused()){ player.popcorn.play();}
            else{player.popcorn.pause();}
        }, false);
        player.popcorn.on("playing", function (){
            big_play.style.opacity = "0";
            setTimeout(function (){
                big_play.style.display = "none";
            }, 1000)
            play.getElementById("play" ).style.opacity = "0";
            play.getElementById("pause").style.opacity = "1";
        });
        player.popcorn.on("pause", function (){
            play.getElementById("play" ).style.opacity = "1";
            play.getElementById("pause").style.opacity = "0";
        });
        player.popcorn.on("ended", function (){
            play.getElementById("play" ).style.opacity = "1";
            play.getElementById("pause").style.opacity = "0";
        });
        // Progress Bar and Timer
        progress.addEventListener("click", function (event){
            var duration = player.popcorn.duration();
            if(!duration){ return;}
            var resized_width = progress.clientWidth;
            var actual_left = 0;
            var offset_element = progress;
            while(offset_element){
                actual_left += offset_element.offsetLeft;
                offset_element = offset_element.offsetParent;
            }
            var click_percent = (event.clientX-actual_left) / resized_width;
            var seek_time = duration * click_percent;
            elapsed_time.style.width = ""+(click_percent*100)+"%";
            player.popcorn.currentTime(seek_time);
        });
        player.popcorn.on("timeupdate", function (){
            var duration = player.popcorn.duration();
            if(!duration){ return;}
            var current_time = player.popcorn.currentTime();
            var elapsed_percent = current_time / duration;
            elapsed_time.style.width = ""+(elapsed_percent*100)+"%";
            var extra_0 = ((current_time%60) < 10)? "0" : "";
            current_time = ""+Math.floor(current_time/60)+":"+extra_0+Math.floor(current_time%60);
            if(player.current_duration){
                timer.textContent = ""+current_time+"/"+self.current_duration;
            } else{
                timer.textContent = ""+current_time;
            }
        });
        player.popcorn.on("progress", function (){
            player.current_duration = player.popcorn.duration();
            if(!player.current_duration){ return;}
            var buffered_range = player.popcorn.buffered();
            var buffer_end = buffered_range.end(0);
            if(!buffer_end){ buffer_end = 0}
            buffered_time.style.width = ""+((buffer_end/player.current_duration)*100)+"%";
            var current_time = player.popcorn.currentTime()
            var extra_0 = ((current_time%60) < 10)? "0" : "";
            current_time = ""+Math.floor(current_time/60)+":"+extra_0+Math.floor(current_time%60);
            player.current_duration = ""+Math.floor(player.current_duration/60)+":"+Math.floor(player.current_duration%60);
            if(player.current_duration){
                timer.textContent = ""+current_time+"/"+player.current_duration;
            } else{
                timer.textContent = ""+current_time;
            }
        });
        // Volume:
        mute.addEventListener("click", function (){
            if(player.popcorn.muted()){
                player.popcorn.unmute();
                mute.getElementById("sound" ).style.opacity = "1";
            } else{
                player.popcorn.muted(true);
                mute.getElementById("sound" ).style.opacity = "0";
            }
        }, false);
        return controls;
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
        //this.setup_controls(configuration);
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
            main_lab.transition("left");
        }, false)
        this.arrow_right.addEventListener("click", function (){
            main_lab.transition("right");
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
    register_lab: function (new_lab, configuration){
        this.lab = new_lab;
        new_lab.setup(configuration);
    },
    frame_left: undefined,
    frame_middle: undefined,
    frame_right: undefined,
    register_frame: function (frame_loc, new_frame){
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
        return container_element.appendChild(new_frame);
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
                    main_lab.transition("left");
                    break;
                }
                case 39:{
                    main_lab.transition("right");
                    break;
                }/*
                case 38:{
                    main_lab.scroll("up");
                    break;
                }
                case 40:{
                    main_lab.scroll("down");
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
                    main_lab.right.className = '';
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
        //this.instructions.resize();
    },
    transition: function (direction, force){
        var self = this;
        this.slider.style.transition       = "left 1s";
        this.slider.style.MozTransition    = "left 1s";
        this.slider.style.WebkitTransition = "left 1s";
        this.slider.style.OTransition      = "left 1s";
        switch(direction){
            case "left":{
                switch(this.slider_state){
                    case "middle":{
						break;/*
                        this.slider_state = "left";
                        break;*/
                    }
                    case "right":{
                        this.slider_state = "middle";
                        break;
                    }
                }
                break;
            }
            case "right":{
                switch(this.slider_state){
                    case "middle":{
                        this.slider_state = "right";
                        break;
                    }
                    case "left":{
                        this.slider_state = "middle";
                        break;
                    }
                }
                break;
            }
        }
        switch(this.slider_state){
            case "left":{
                //this.tip_manager.clear_tips();
                this.slider.style.left = "0%";
                this.arrow_left.style.opacity = "0";
                this.arrow_right.style.opacity = "1";
                //this.popcorn.pause()
                break;
            }
            case "middle":{
                this.slider.style.left = "-100%";
                this.arrow_left.style.opacity = "0";
                this.arrow_right.style.opacity = "1";
                //this.tip_manager.populate();
                break;
            }
            case "right":{
                //this.tip_manager.clear_tips();
                this.slider.style.left = "-200%";
                this.arrow_left.style.opacity = "1";
                this.arrow_right.style.opacity = "0";
                //this.popcorn.pause()
                break;
            }
        }
    }
};
main_lab.compatibility.check(true);
if((main_lab.compatibility.status & main_lab.compatibility.EVENT)){
    document.addEventListener("DOMContentLoaded", function (){
        main_lab.compatibility.check();
        var full_featured = (
            main_lab.compatibility.CONTROLS |
            main_lab.compatibility.CSS_TRANSITION |
            main_lab.compatibility.DOM |
            main_lab.compatibility.EVENT |
            main_lab.compatibility.HTML5);
        if(main_lab.compatibility.status != full_featured){
            main_lab.compatibility.notify()
            console.log(main_lab.compatibility.CONTROLS)
            console.log(main_lab.compatibility.CSS_TRANSITION)
            console.log(main_lab.compatibility.DOM)
            console.log(main_lab.compatibility.EVENT)
            console.log(main_lab.compatibility.HTML5)
            console.log('Notify: '+main_lab.compatibility.status + ' | '+full_featured)
        }
        if(main_lab.compatibility.status & (main_lab.compatibility.DOM | main_lab.compatibility.HTML5)){
            main_lab.setup(instruction_lab, lab_configuration);
        }
    }, false);
} else{
    main_lab.compatibility.notify()
    console.log('notify: '+main_lab.compatibility.status)
}