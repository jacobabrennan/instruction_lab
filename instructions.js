instruction_lab.instructions = {
    list: undefined,
    list_element: undefined, // an html element
    scroll_bar: undefined,
    scroll_percent: 0,
    setup: function (configuration){
        this.list = configuration.instructions;
        this.setup_scrollbar('instructions_slider');
        this.list_element = document.getElementById("instructions_list");
		var instructions_list = configuration.instructions;
		var display_step = function (instruction, instruction_index, display_number){
			var instruction_element = document.createElement('div');
            instruction.element = instruction_element;
			instruction_element.setAttribute('class', 'instruction');
            var icon = document.createElement('div');
            var content = document.createElement('div');
            var header = document.createElement('div');
            var title = document.createElement('span');
            var expander = document.createElement('div');
            var instruction_notes = document.createElement('p');
            icon.setAttribute('class', 'icon');
            content.setAttribute('class', 'content');
            header.setAttribute('class', 'header');
            title.setAttribute('class', 'title');
            expander.setAttribute('class', 'expander');
            instruction_notes.setAttribute('class', 'notes');
            instruction_notes.textContent = instruction.notes;
            expander.appendChild(instruction_notes);
            var display_title = instruction.title;
            if(display_title){
                title.innerHTML = display_title.toUpperCase();
            }
            header.appendChild(title);
            content.appendChild(header);
            content.appendChild(expander);
            instruction_element.appendChild(icon);
            instruction_element.appendChild(content);
			if(!display_number){
				display_number = '&nbsp;';
                icon.style.background = '#058ef8';
			} else{
                var step_number_display = document.createElement('span');
                step_number_display.textContent = display_number;
                step_number_display.setAttribute('class', 'number');
                icon.appendChild(step_number_display);
            }
            if(instruction.logo_linked){
                icon.style.visibility = 'hidden';
                //icon.style.background = 'transparent';
                //icon.style.boxShadow = 'none';
                instruction_lab.logo2.style.cursor = 'pointer';
                instruction_lab.logo2.addEventListener('click', function (){
                    instruction_lab.instructions.scroll_to(instruction_index);
                }, false);
                if(configuration.urls.logo2){
                    var title_logo = document.createElement('img');
                    title_logo.src = configuration.urls.logo2;
                    title.insertBefore(title_logo, title.firstChild);
                }
            }
            if(instruction.time_in && !(instruction.unnumbered)){
                var time_stamp = document.createElement('a');
                var time_stamp_play = document.createElement('img');
                time_stamp.setAttribute('class', 'time_stamp');
                var first_digit  = Math.floor( instruction.time_in    /60);
                var second_digit = Math.floor((instruction.time_in%60)/10);
                var third_digit  = Math.floor( instruction.time_in%10    );
                time_stamp_play.src = configuration.urls.time_stamp_play;
                time_stamp.textContent = ''+first_digit+':'+second_digit+third_digit;
                time_stamp.insertBefore(time_stamp_play, time_stamp.firstChild);
                header.appendChild(time_stamp);
                time_stamp.addEventListener('click', function (){
                    instruction_lab.popcorn.currentTime(Math.max(0, instruction.time_in-2));
                    instruction_lab.transition('left');
                    setTimeout(function (){
                        instruction_lab.popcorn.play();
                    }, 1000);
                }, false)
            }
            var create_tip = function (tip_json){
                var tip_template_id = tip_json.type;
                var tip_template = configuration.tip_templates[tip_template_id];
                var tip = document.createElement('a');
                if(tip_json.content.url){
                    tip.setAttribute('href', tip_json.content.url);
                    tip.setAttribute('target', '_blank');
                }
                var icon = document.createElement('div');
                var content = document.createElement('div');
                var header = document.createElement('div');
                var title = document.createElement('div');
                tip.appendChild(icon);
                header.appendChild(title);
                content.appendChild(header);
                tip.appendChild(content);
                var display_title = tip_json.short_title;
                if(!display_title){
                    display_title = tip_json.title;
                }
                if(display_title){
                    title.innerHTML = display_title.toUpperCase();
                }
                tip.setAttribute('class', 'tip');
                tip.setAttribute('target', '_blank');
                icon.setAttribute('class', 'icon');
                content.setAttribute('class', 'content');
                header.setAttribute('class', 'header');
                title.setAttribute('class', 'title');
                if(tip_template){
                    if(tip_template.icon_url){
                        // TODO: html insertion. Parse for valid url.
                        icon.innerHTML = '<img src="'+tip_template.icon_url+'" />';
                    }
                    if(tip_template.icon_color){
                        icon.style.background = tip_template.icon_color;
                    }
					if(tip_template.display_instructions){
						tip.display = tip_template.display_instructions;
						tip.display(tip_json);
					}
                }
                return tip;
            }
            for(var tip_index = 0; tip_index < instruction.content.length; tip_index++){
                var indexed_tip = instruction.content[tip_index];
                if(indexed_tip && (indexed_tip.display_instructions !== false)){
                    var new_tip = create_tip(indexed_tip);
                    expander.appendChild(new_tip);
                }
            }
			instruction_lab.instructions.list_element.appendChild(instruction_element);
            var expander_function = (function (){
                return function (){
                    instruction_lab.instructions.toggle_highlight(instruction_index);
                };
            })(instruction_index);
            icon.addEventListener('click', expander_function, false);
            title.addEventListener('click', expander_function, false);
		};
		instruction_lab.tip_manager.tip_area = document.getElementById('tip_area');
		var step_number = 0;
		for(var step_index = 0; step_index < instructions_list.length; step_index++){
			var indexed_step = instructions_list[step_index];
			if(!indexed_step.unnumbered){
				step_number++;
                display_step(indexed_step, step_index, step_number);
			} else{
                display_step(indexed_step, step_index);
            }
			//setup_instruction(indexed_step);
            if(indexed_step.time_in){
                for(var tip_index = 0; tip_index < indexed_step.content.length; tip_index++){
                    var indexed_tip = indexed_step.content[tip_index];
                    var cue_function = function (tip){
                        return function (){
                            if(instruction_lab.seeking){ return;}
                            var node = instruction_lab.tip_manager.create_tip(tip);
                            instruction_lab.tip_manager.add_tip(node);
                        };
                    };
                    instruction_lab.popcorn.cue(indexed_step.time_in + indexed_tip.time_offset, cue_function(indexed_tip));
                    if(indexed_tip.time_out_offset){
                        var cut_function = function (tip){
                            return function (){
                                var node = instruction_lab.tip_manager.find_tip(tip);
                                instruction_lab.tip_manager.bump_tip(node, true);
                            }
                        }
                        instruction_lab.popcorn.cue(indexed_step.time_in + indexed_tip.time_out_offset, cut_function(indexed_tip));
                    }
                }
                instruction_lab.popcorn.cue(indexed_step.time_in-1, function (){
                    instruction_lab.tip_manager.clear_tips(true);
                });
                instruction_lab.popcorn.cue(indexed_step.time_in, (function (loop_step, loop_index){
                    return function (){
                        var node = instruction_lab.tip_manager.create_step(loop_step, loop_index);
                        if(node){
                            instruction_lab.tip_manager.add_tip(node);
                        }
                    }
                })(indexed_step, step_index));
            }
		}
        this.list_element.addEventListener('scroll', function (){
            instruction_lab.instructions.scroll_percent = instruction_lab.instructions.list_element.scrollTop / instruction_lab.instructions.list_element.scrollHeight;
            instruction_lab.instructions.scroll_bar.reposition()
        });
    },
    scroll: function (percent){
        var handle_percent = this.scroll_bar.handle.offsetHeight / this.scroll_bar.bar.offsetHeight;
        percent = Math.min(1-handle_percent, Math.max(0, percent));
        this.scroll_percent = percent;
        this.scroll_bar.handle.style.top = (percent*100)+'%';
        instruction_lab.instructions.list_element.scrollTop = (percent*instruction_lab.instructions.list_element.scrollHeight);
    },
    scroll_to: function (step_index){
        // Step index may not be the same as a step's number, do to unnumbered steps.
        var instruction = this.list[step_index];
        if(instruction && instruction.element){
            this.toggle_highlight(step_index, true);
            var top_offset = instruction.element.offsetTop-20;
            var offset_percent = top_offset / this.list_element.scrollHeight;
            this.scroll(offset_percent);
            instruction_lab.transition('right');
        }
    },
    resize: function (){
        var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.scrollHeight;
        screen_percent = Math.max(0, Math.min(1, screen_percent));
        this.scroll_bar.handle.style.height = Math.floor(screen_percent*this.scroll_bar.bar.offsetHeight)+'px';
		this.scroll(this.scroll_percent);
    },
    toggle_highlight: function (instruction_index, highlight_state){
		var old_scroll_pos = this.list_element.scrollTop;
        var instruction = this.list[instruction_index];
        var instruction_element = instruction.element;
        var expander = instruction_element.getElementsByClassName('expander')[0];
        var toggle_command = undefined;
        if(highlight_state != undefined){
            toggle_command = highlight_state
        } else if(!instruction.highlight){
            toggle_command = true;
        } else{
            toggle_command = false;
        }
        if(toggle_command){
            instruction.highlight = true;
            expander.style.display = 'block';
            setTimeout(function (){
                expander.style.opacity = 1;
            }, 1)
            this.resize();
        } else{
            instruction.highlight = false;
            expander.style.display = 'none';
            setTimeout(function (){
                expander.style.opacity = 0;
            }, 1)
            this.resize();
        }
		var scroll_percent = old_scroll_pos / instruction_lab.instructions.list_element.scrollHeight;
		instruction_lab.instructions.scroll(scroll_percent);
    },
    setup_scrollbar: function (element_id){
        this.scroll_bar = {
            container: document.getElementById(element_id),
            up_button: document.createElement('div'),
            down_button: document.createElement('div'),
            bar: document.createElement('div'),
            handle: document.createElement('div'),
            reposition: function (){
                this.handle.style.top = (instruction_lab.instructions.scroll_percent*100)+'%';
            }
        }
        this.scroll_bar.up_button.setAttribute('class', 'scroll_up');
        this.scroll_bar.container.appendChild(this.scroll_bar.up_button);
        this.scroll_bar.down_button.setAttribute('class', 'scroll_down');
        this.scroll_bar.container.appendChild(this.scroll_bar.down_button);
        this.scroll_bar.bar.setAttribute('class', 'scroll_bar');
        this.scroll_bar.container.appendChild(this.scroll_bar.bar);
        this.scroll_bar.handle.setAttribute('class', 'scroll_handle');
        this.scroll_bar.bar.appendChild(this.scroll_bar.handle);
        //
        this.scroll_bar.up_button.addEventListener('click', function (){
            var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.scrollHeight;
            var new_percent = instruction_lab.instructions.scroll_percent - screen_percent/2;
            instruction_lab.instructions.scroll(new_percent);
        });
        this.scroll_bar.down_button.addEventListener('click', function (){
            var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.scrollHeight;
            var new_percent = instruction_lab.instructions.scroll_percent + screen_percent/2;
            instruction_lab.instructions.scroll(new_percent);
        });
        this.scroll_bar.container.addEventListener('mousedown', function (){
            instruction_lab.right.className = 'no_select';
        }, false);
        var find_offset = function (offset_object){
            var parent_offset = (offset_object.offsetParent)? find_offset(offset_object.offsetParent) : 0
            return offset_object.offsetTop + parent_offset;
        }
        this.scroll_bar.handle.drag = function (e){
            //var active_x = e.pageX - instruction_lab.control_interface.last_click.offset_x;
            var active_y = e.pageY - instruction_lab.control_interface.last_click.offset_y;
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var scroll_top_offset = find_offset(scroll_bar.bar);
            var scroll_percent = (active_y) / (scroll_bar.bar.offsetHeight);
            instruction_lab.instructions.scroll(scroll_percent);
        };
        this.scroll_bar.bar.addEventListener('mousedown', function (e){
            //this.drag(e)
            /* Legacy*/
            if(e.target !== this){ return};
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var scroll_top_offset = find_offset(scroll_bar.bar);
            var click_loc = e.pageY - scroll_top_offset;
            var scroll_percent = Math.floor(click_loc - scroll_bar.handle.offsetHeight/2) / scroll_bar.bar.offsetHeight;
            instruction_lab.instructions.scroll(scroll_percent);
            /**/
        }, false);
            
        this.scroll_bar.bar.drag = function (e){
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var current_y = e.pageY - find_offset(scroll_bar.bar);
            var scroll_percent = (current_y-Math.floor(scroll_bar.handle.offsetHeight/2)) / scroll_bar.bar.offsetHeight;
            instruction_lab.instructions.scroll(scroll_percent);
        };
    }
};