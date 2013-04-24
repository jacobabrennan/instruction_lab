/*
 * This code written in whole by Jacob A Brennan.
 *
 * This work is licensed under the Creative Commons Attribution 3.0 Unported
 * License. To view a copy of this license, visit
 * http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative
 * Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
 */
instruction_lab = {
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
                // Test for HTML5 video support by testing for the existence of the main video.
                    // Note: Assumes document.getElementById. Support charts show support back to IE6.
				var video_test = document.getElementById('lab_video');
				if(video_test && video_test.canPlayType){
					this.status |= this.HTML5;
				}
                // Test for progress bar click support, which requires clientWidth.
                    // Note: event.clientX is not tested here, but support charts show near universal compatibility.
                var progress_bar = document.getElementById("control_progress")
                if((progress_bar.clientWidth !== undefined) && (progress_bar.offsetLeft !== undefined) && progress_bar.offsetParent){
                    this.status |= this.CONTROLS;
                }
                // Test for DOM manipulation.
                if(document.createElement && document.appendChild){
                    var test_element = document.createElement("div");
                    var test_contents = document.createElement("span");
                    test_contents.innerHTML = "textContent check";
                    test_element.appendChild(test_contents)
                    if(test_element.setAttribute || test_element.innerHTML){
                        this.status |= this.DOM;
                    }
                    // textContent is used by the svg DOM in the custom controls.
                    if(!test_contents.textContent){
                        this.status &= ~this.CONTROLS;
                    }
                    var test_style = test_element.style;
                    if( "transition"       in test_style ||
                        "MozTransition"    in test_style ||
                        "WebkitTransition" in test_style ||
                        "OTransition"      in test_style){
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
            setTimeout(function (){
                document.getElementById("support_message").style.display = "block";
                if(!(instruction_lab.compatibility.status & (instruction_lab.compatibility.EVENT | instruction_lab.compatibility.DOM | instruction_lab.compatibility.HTML5))){
                    document.getElementById("support_none").style.display = "block";
                } else if(!(instruction_lab.compatibility.status & instruction_lab.compatibility.CSS_TRANSITION && instruction_lab.compatibility.status & instruction_lab.compatibility.CONTROLS)){
                    document.getElementById("support_limited").style.display = "block";
                    document.getElementById("support_button").addEventListener("click", function (){
                        document.getElementById("support_message").style.display = "none";
                    }, false);
                }
            }, 1000);
        }
    },
    setup: function (configuration){
		document.title = configuration.title;
        this.seeking = false;
        this.popcorn = Popcorn("#lab_video");
        window.addEventListener("resize", function (){ instruction_lab.resize()}, false);
        window.addEventListener("keydown", function (e){ instruction_lab.key_down(e);}, false);
        // Configure html urls:
        var logo1 = document.getElementById("logo1");
        logo1.src = configuration.urls.logo1;
        var logo2 = document.getElementById("logo2");
        logo2.src = configuration.urls.logo2;
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
        }
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
        this.arrow_up  = document.getElementById("arrow_up" );
        this.arrow_down = document.getElementById("arrow_down");
        this.arrow_left.addEventListener("click", function (){
            instruction_lab.transition("left");
        }, false)
        this.arrow_right.addEventListener("click", function (){
            instruction_lab.transition("right");
        }, false)
        this.arrow_up.addEventListener("click", function (){
            instruction_lab.scroll("up");
        }, false)
        this.arrow_down.addEventListener("click", function (){
            instruction_lab.scroll("down");
        }, false)
        this.resize();
        // Setup Resource Section:
        /*var setup_instruction = function (tip){
            for(var I = 0; I < tip.content.length; I++){
                var resource = tip.content[I];
                if(resource.display == "none"){
                    continue;
                }
                var container_li = document.createElement("li");
                // A separate block container is needed to prevent our resources
                // from having an ancestor positioned absolutely. Otherwise
                // percentage sizing would be based on that ancestor instead of
                // the frame.
                tip.list.appendChild(container_li)
                var r_element
                var logo_text;
                if(typeof(resource.content) == "string"){
                    r_element = document.createElement("a");
                    resource.element = r_element;
                    r_element.setAttribute("id", "rsc_"+resource.title)
                    r_element.setAttribute("class", TODO);
                    r_element.setAttribute("href", resource.content);
                    r_element.setAttribute("target", "_blank");
                    logo_text = ' link"><img src="'+instruction_lab.url.tip_linkbox+'" />';
                    r_element.innerHTML = '<div class="title">'+resource.title+'</div><div class="icon'+logo_text+'</div>';
                }
                else{
                    r_element = document.createElement("div");
                    resource.element = r_element;
                    r_element.setAttribute("id", "rsc_"+resource.title)
                    r_element.setAttribute("class", TODO);
                    r_element.addEventListener("click",
                        (function (resource_replacement){
                            return function (){
                                instruction_lab.instructions.highlight(resource_replacement);
                            }
                        })(resource),
                    false);
                    logo_text = '"><img src="'+instruction_lab.url.tip_logo+'" />';
                    r_element.innerHTML = '<div class="title">'+resource.title+'</div><div class="icon'+logo_text+'</div>';
                    resource.list = document.createElement("ul");
                    container_li.appendChild(resource.list);
                    setup_tip(resource);
                }
                container_li.appendChild(r_element);
                r_element.style.top = (20+I*10)+"%";
            }
        }*/
        this.instructions.list = document.getElementById("instructions_list");
		var instructions_list = configuration.instructions;
        this.instructions.max_scroll = instructions_list.length;
		var display_step = function (instruction, display_number){
			if(!display_number){
				display_number = '&nbsp;';
			}
			var instruction_element = document.createElement('div');
			instruction_element.setAttribute('class', 'instruction');
            var insert_html  = '<div class="icon">';
            insert_html += display_number;
            insert_html += '</div><div class="content">';
            insert_html += '<div class="header"><span class="title">'+'Whatever'+'</span></div>';
            insert_html += '<div class="expander">Nodes!</div>'
            insert_html += '</div>';
			instruction_element.innerHTML = insert_html;
			instruction_lab.instructions.list.appendChild(instruction_element);
		};
		instruction_lab.tip_manager.tip_area = document.getElementById('tip_area');
		var step_number = 0;
		for(var step_index = 0; step_index < instructions_list.length; step_index++){
			var indexed_step = instructions_list[step_index];
			if(!indexed_step.unnumbered){
				step_number++;
			}
			display_step(indexed_step, step_number);
			//setup_instruction(indexed_step);
			for(var tip_index = 0; tip_index < indexed_step.content.length; tip_index++){
				var indexed_tip = indexed_step.content[tip_index];
				var cue_function = (function (tip){
					return function (){
						if(instruction_lab.seeking){ return;}
						var node = instruction_lab.tip_manager.create_tip(tip);
						instruction_lab.tip_manager.add_tip(node);
					};
				})(indexed_tip);
				this.popcorn.cue(indexed_step.time_in + indexed_tip.time_offset, cue_function);
			}
		}
        this.popcorn.on("seeked", function (){
            instruction_lab.seeking = false;
            instruction_lab.tip_manager.setup_at(instruction_lab.popcorn.currentTime());
        });
        this.popcorn.on("seeking", function (){
            instruction_lab.seeking = true;
            instruction_lab.tip_manager.clear_tips();
        });
        // Finished
    },
    viewport_size: function (){
        var e  = document.documentElement;
        var g  = document.getElementsByTagName('body')[0];
        var _x = window.innerWidth  || e.clientWidth  || g.clientWidth;
        var _y = window.innerHeight || e.clientHeight || g.clientHeight;
        return {width: _x, height: _y};
    },
    key_down: function (e){
        var key_code;
        if(window.event){ key_code = e.keyCode} // IE 8 and earlier compatibility.
        else{
            key_code = e.which// | e.keyCode;
        }
        switch(key_code){
            case 37:{
                this.transition("left");
                break;
            }
            case 39:{
                this.transition("right");
                break;
            }
            case 38:{
                this.scroll("up");
                break;
            }
            case 40:{
                this.scroll("down");
                break;
            }
        }
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
    },
    scroll: function (direction){
        switch(this.slider_state){
            case "right":{
                instruction_lab.instructions.scroll(direction);
            }
        }
    },
    tip_manager: {
		max_nodes: 4,
        current_tips: new Array(),
        add_tip: function (tip){
            this.tip_area.appendChild(tip);
			var position;
			for(var I = 0; I < this.current_tips.length; I++){
				if(!this.current_tips[I]){
					position = I;
					break;
				}
			}
			if(position === undefined){
				position = Math.min(this.current_tips.length, this.max_nodes-1)
			}
			if(this.current_tips.length > position && this.current_tips[position]){
				this.bump_tip(this.current_tips[position]);
			}
			this.current_tips[position] = tip;
			/*tip.style.transition       = "opacity 1s, left 2s, top 1s";
			tip.style.MozTransition    = "opacity 1s, left 2s, top 1s";
			tip.style.WebkitTransition = "opacity 1s, left 2s, top 1s";
			tip.style.OTransition      = "opacity 1s, left 2s, top 1s";*/
            /* The following statement must be delayed from the other settings
             * to ensure that the transition happens.
             */
            setInterval(function (){tip.style.opacity = "1";}, 100);
        },
        bump_tip: function (){
			var tip = this.current_tips[1]
			tip.style.visibility = "hidden";
			tip.style.height = "0%";
			tip.style.margin_bottom = "0em";
			tip.style.margin = "0em"
            this.remove_tip(tip);
        },
        create_tip: function (tip_json){
            var tip = document.createElement("a");
			switch(tip_json.type){
				case 'not_sure': { break;}
				default: {
					tip.setAttribute("class", "tip");
					tip.setAttribute("href", "TODO");
					tip.setAttribute("target", "_blank");
					tip.innerHTML = '<div class="icon"><img src="" /></div><div class="title">'+tip_json.title+'</div>';
				}
			}
			/*
            } else{
				tip.setAttribute("class", "tip tip_group");
                tip.innerHTML = '<div class="title">'+tip_json.title+'</span></div><div class="icon"><img src="'+instruction_lab.url.tip_logo+'" /></div>';
				tip.addEventListener("click", function (){
					instruction_lab.transition("right");
					setTimeout(function (){
						instruction_lab.instructions.navigate_id(tip_json.resource_id);
					}, 500);
				}, false);
            }*/
            return tip;
        },
        remove_tip: function (tip){
            var position = this.current_tips.indexOf(tip);
            if(position != -1){
				tip = this.current_tips.splice(position, 1)[0];
            }
            setTimeout(function (){
				this.tip_area.removeChild(tip);
            }, 900);
        },
        clear_tips: function (){
            if(this.custom_tip){
                this.remove_tip(this.custom_tip);
            }
            for(var I = 0; I < this.current_tips.length; I++){
                var tip = this.current_tips[I];
                if(tip){
                    this.remove_tip(tip);
                }
            }
        },
        setup_at: function (time_code){
            // Setup current link tip group:
            var display_group;
            var display_tips = new Array();
            for(var I = 1 ; I < this.content.length; I++){
                // This index starts at 1 so as to skip the global group at position 0.
                var group = this.content[I];
                if(group.time_in <= time_code && group.time_out > time_code){
                    display_group = group;
                    break;
                }
            }
            if(!display_group){ return;}
            for(var tip_index = display_group.content.length-1; tip_index >= 0; tip_index--){
                var indexed_tip = display_group.content[tip_index];
                if(indexed_tip.time_in > time_code){
                    continue;
                }
                display_tips.push(indexed_tip);
                if(display_tips.length >= this.max_nodes){
                    break;
                }
            }
            if(display_tips.length <= 0){ return;}
            for(var I = display_tips.length-1; I >= 0; I--){
                var indexed_tip = display_tips[I];
                var new_tip = this.create_tip(indexed_tip);
                var custom;
                if(indexed_tip.position){
                    custom = indexed_tip.position;
                }
                this.add_tip(new_tip, custom)
            }
        }
    }
};
instruction_lab.instructions = {
    list: undefined, // an html element
    scroll_number: 1,
    max_scroll: undefined,
    scroll: function (direction, number){
        switch(direction){
            case 'up':{
                this.scroll_number--;
                break;
            }
            case 'down':{
                this.scroll_number++;
                break;
            }
            default:{
                if(number){
                    this.scroll_number = number;
                }
            }
        }
        this.scroll_number = Math.max(1, Math.min(this.max_scroll, this.scroll_number));
        this.list.style.top = (-4*(this.scroll_number-1))+'em';
    }
};
instruction_lab.compatibility.check(true);
if((instruction_lab.compatibility.status & instruction_lab.compatibility.EVENT)){
    document.addEventListener("DOMContentLoaded", function (){
        instruction_lab.compatibility.check();
        var full_featured = (
            instruction_lab.compatibility.CONTROLS |
            instruction_lab.compatibility.CSS_TRANSITION |
            instruction_lab.compatibility.DOM |
            instruction_lab.compatibility.EVENT |
            instruction_lab.compatibility.HTML5);
        if(instruction_lab.compatibility.status != full_featured){
            instruction_lab.compatibility.notify()
        }
        if(instruction_lab.compatibility.status & (instruction_lab.compatibility.DOM | instruction_lab.compatibility.HTML5)){
            instruction_lab.setup(lab_configuration);
        }
    });
} else{
    instruction_lab.compatibility.notify()
}