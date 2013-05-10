/*
 * This code written in whole by Jacob A Brennan.
 *
 */
instruction_lab = {
    video_frame: undefined,
    instruction_frame: undefined,
    setup: function (configuration){
		document.title = configuration.title;
        this.seeking = false;
        // Create Frames:
            // Create Middle Frame:
        var middle_frame_html = '\
            <div id="tip_area"></div>\
            <img id="logo1" alt="Make Logo" />\
            <img id="logo2" alt="Lab Specific Logo" />\
            ';
        this.video_frame = document.createElement('div');
        this.video_frame.innerHTML = middle_frame_html;
        var success = main_lab.register_frame('middle', this.video_frame);
        var right_frame_html = '\
            <div id="instructions_list"></div>\
            <div id="instructions_slider"></div>\
            ';
        this.instruction_frame = document.createElement('div');
        this.instruction_frame.innerHTML = right_frame_html;
        success = main_lab.register_frame('right', this.instruction_frame);
        // Configure html urls:
        this.logo1 = document.getElementById("logo1");
        this.logo1.src = configuration.urls.logo1;
        this.logo2 = document.getElementById("logo2");
        this.logo2.src = configuration.urls.logo2;
        // Request Media Player
        this.video_frame.player = main_lab.create_player('video');
        var video_sources = configuration.urls.video;
        for(var codex in video_sources){
            var source = document.createElement('source');
            source.setAttribute('src', video_sources[codex]);
            this.video_frame.player.media.appendChild(source);
        }
        this.video_frame.appendChild(this.video_frame.player.media);
        this.video_frame.appendChild(this.video_frame.player.controls);
        /*
        // Configure Custom Controls:
        var controls = document.getElementById("controls");
        if(this.compatibility.status & this.compatibility.CONTROLS){
            // Capture standard play events.
            this.popcorn.media.addEventListener("click", function (){
                if(instruction_lab.popcorn.paused()){
                    instruction_lab.popcorn.play()
                } else{
                    instruction_lab.popcorn.pause();
                }
            }, false);
            // Big Play Button
            document.getElementById("control_big_play").addEventListener("click", function (){
                instruction_lab.popcorn.play();
            }, false)
            // Play/Pause Button
            var play_button = document.getElementById("control_play")
            play_button.addEventListener("click", function (){
                if(instruction_lab.popcorn.currentTime() == instruction_lab.popcorn.duration()){
                    instruction_lab.popcorn.currentTime(0);
                    instruction_lab.popcorn.play();
                    return;
                }
                if(instruction_lab.popcorn.paused()){ instruction_lab.popcorn.play();}
                else{ instruction_lab.popcorn.pause();}
            }, false);
            this.popcorn.on("playing", function (){
                document.getElementById("control_big_play").style.opacity = "0";
                setTimeout(function (){
                    document.getElementById("control_big_play").style.display = "none";
                }, 1000)
                play_button.getElementById("play" ).style.opacity = "0";
                play_button.getElementById("pause").style.opacity = "1";
            });
            this.popcorn.on("pause", function (){
                var play_button = document.getElementById("control_play")
                play_button.getElementById("play" ).style.opacity = "1";
                play_button.getElementById("pause").style.opacity = "0";
            });
            this.popcorn.on("ended", function (){
                var play_button = document.getElementById("control_play")
                play_button.getElementById("play" ).style.opacity = "1";
                play_button.getElementById("pause").style.opacity = "0";
            });
            // Progress Bar and Timer
            var progress_bar = document.getElementById("control_progress");
            var buffered_bar = document.getElementById("control_buffered_time");
            var elapsed_bar = document.getElementById("control_elapsed_time");
            var timer = document.getElementById("control_timer");
            progress_bar.addEventListener("click", function (event){
                var duration = instruction_lab.popcorn.duration();
                if(!duration){ return;}
                var resized_width = progress_bar.clientWidth;
                var actual_left = 0;
                var offset_element = progress_bar;
                while(offset_element){
                    actual_left += offset_element.offsetLeft;
                    offset_element = offset_element.offsetParent;
                }
                var click_percent = (event.clientX-actual_left) / resized_width;
                var seek_time = duration * click_percent;
                elapsed_bar.style.width = ""+(click_percent*100)+"%";
                instruction_lab.popcorn.currentTime(seek_time);
            });
            this.popcorn.on("timeupdate", function (){
                var duration = instruction_lab.popcorn.duration();
                if(!duration){ return;}
                var current_time = instruction_lab.popcorn.currentTime();
                var elapsed_percent = current_time / duration;
                elapsed_bar.style.width = ""+(elapsed_percent*100)+"%";
                var extra_0 = ((current_time%60) < 10)? "0" : "";
                current_time = ""+Math.floor(current_time/60)+":"+extra_0+Math.floor(current_time%60);
                var timer_text = timer.getElementById("svg_timer");
                if(instruction_lab.current_duration){
                    timer_text.textContent = ""+current_time+"/"+instruction_lab.current_duration;
                } else{
                    timer_text.textContent = ""+current_time;
                }
            });
            this.popcorn.on("progress", function (){
                instruction_lab.current_duration = instruction_lab.popcorn.duration();
                if(!instruction_lab.current_duration){ return;}
                var buffered_range = instruction_lab.popcorn.buffered();
                var buffer_end = buffered_range.end(0);
                if(!buffer_end){ buffer_end = 0}
                buffered_bar.style.width = ""+((buffer_end/instruction_lab.current_duration)*100)+"%";
                var current_time = instruction_lab.popcorn.currentTime()
                var extra_0 = ((current_time%60) < 10)? "0" : "";
                current_time = ""+Math.floor(current_time/60)+":"+extra_0+Math.floor(current_time%60);
                instruction_lab.current_duration = ""+Math.floor(instruction_lab.current_duration/60)+":"+Math.floor(instruction_lab.current_duration%60);
                var timer_text = timer.getElementById("svg_timer");
                if(instruction_lab.current_duration){
                    timer_text.textContent = ""+current_time+"/"+instruction_lab.current_duration;
                } else{
                    timer_text.textContent = ""+current_time;
                }
            });
            // Volume:
            var mute_button = document.getElementById("control_mute");
            mute_button.addEventListener("click", function (){
                if(instruction_lab.popcorn.muted()){
                    instruction_lab.popcorn.unmute();
                    mute_button.getElementById("sound" ).style.opacity = "1";
                } else{
                    instruction_lab.popcorn.muted(true);
                    mute_button.getElementById("sound" ).style.opacity = "0";
                }
            }, false);
        } else{
            this.popcorn.media.controls = "true";
            controls.style.display = "none";
        }*/
        
        
        
        
        
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
            instruction_lab.transition("left");
        }, false)
        this.arrow_right.addEventListener("click", function (){
            instruction_lab.transition("right");
        }, false)
        // Setup Instructions + Tips Sections:
        this.tip_manager.setup(configuration);
        this.instructions.setup(configuration);
        //
        this.resize();
        /*
        this.popcorn.on("seeked", function (){
            instruction_lab.seeking = false;
            instruction_lab.tip_manager.populate(instruction_lab.popcorn.currentTime());
        });
        this.popcorn.on("seeking", function (){
            instruction_lab.seeking = true;
            instruction_lab.tip_manager.clear_tips();
        });
        */
        // Finished
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
                    instruction_lab.transition("left");
                    break;
                }
                case 39:{
                    instruction_lab.transition("right");
                    break;
                }/*
                case 38:{
                    instruction_lab.scroll("up");
                    break;
                }
                case 40:{
                    instruction_lab.scroll("down");
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
                    instruction_lab.right.className = '';
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
        this.instructions.resize();
    },
    transition: function (direction, force){
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
                instruction_lab.tip_manager.clear_tips();
                this.slider.style.left = "0%";
                this.arrow_left.style.opacity = "0";
                this.arrow_right.style.opacity = "1";
                this.popcorn.pause()
                break;
            }
            case "middle":{
                this.slider.style.left = "-100%";
                this.arrow_left.style.opacity = "0";
                this.arrow_right.style.opacity = "1";
                this.tip_manager.populate();
                break;
            }
            case "right":{
                instruction_lab.tip_manager.clear_tips();
                this.slider.style.left = "-200%";
                this.arrow_left.style.opacity = "1";
                this.arrow_right.style.opacity = "0";
                this.popcorn.pause()
                break;
            }
        }
    }
};