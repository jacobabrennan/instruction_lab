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
			if(!display_number){
				display_number = '&nbsp;';
			}
			var instruction_element = document.createElement('div');
            instruction.element = instruction_element;
			instruction_element.setAttribute('class', 'instruction');
            var insert_html  = '<div class="icon">';
            insert_html += display_number;
            insert_html += '</div><div class="content">';
            insert_html += '<div class="header"><span class="title">'+instruction.title+'</span></div>';
            insert_html += '<div class="expander"></div>'
            insert_html += '</div>';
			instruction_element.innerHTML = insert_html;
            var expander = instruction_element.getElementsByClassName('expander')[0];
            var instruction_notes = document.createElement('p');
            instruction_notes.setAttribute('class', 'notes');
            instruction_notes.textContent = instruction.notes;
            expander.appendChild(instruction_notes);
            var create_tip = function (tip_json){
                var tip_template_id = tip_json.type;
                var tip_template = configuration.tip_templates[tip_template_id];
                var tip = document.createElement("a");
                var icon = document.createElement('div');
                var content = document.createElement('div');
                var header = document.createElement('div');
                var title = document.createElement('div');
                tip.appendChild(icon);
                header.appendChild(title);
                content.appendChild(header);
                tip.appendChild(content);
                title.innerHTML = tip_json.title;
                tip.setAttribute("class", "tip");
                tip.setAttribute("target", "_blank");
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
                if(indexed_tip){
                    var new_tip = create_tip(indexed_tip);
                    expander.appendChild(new_tip);
                }
            }
			instruction_lab.instructions.list_element.appendChild(instruction_element);
            instruction_element.addEventListener('click', (function (){
                return function (){
                    instruction_lab.instructions.toggle_highlight(instruction_index);
                };
            })(instruction_index), false);
		};
		instruction_lab.tip_manager.tip_area = document.getElementById('tip_area');
		var step_number = 0;
		for(var step_index = 0; step_index < instructions_list.length; step_index++){
			var indexed_step = instructions_list[step_index];
			if(!indexed_step.unnumbered){
				step_number++;
			}
			display_step(indexed_step, step_index, step_number);
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
                }
                instruction_lab.popcorn.cue(indexed_step.time_in-1, function (){
                    instruction_lab.tip_manager.clear_tips(true);
                });
                instruction_lab.popcorn.cue(indexed_step.time_in, (function (loop_step, loop_index){
                    return function (){
                        var node = instruction_lab.tip_manager.create_step(loop_step, loop_index);
                        instruction_lab.tip_manager.add_tip(node);
                    }
                })(indexed_step, step_index));
            }
		}
    },
    scroll: function (percent){
        var handle_percent = this.scroll_bar.handle.offsetHeight / this.scroll_bar.bar.offsetHeight;
        percent = Math.min(1-handle_percent, Math.max(0, percent));
        this.scroll_percent = percent;
        var inverse_screen_percent = instruction_lab.instructions.list_element.offsetHeight / instruction_lab.slider.offsetHeight;
        instruction_lab.instructions.list_element.style.top = -(percent*inverse_screen_percent*100)+'%';
        this.scroll_bar.handle.style.top = (percent*100)+'%';
    },
    scroll_to: function (step_index){
        // Step index may not be the same as a step's number, do to unnumbered steps.
        var instruction = this.list[step_index];
        if(instruction && instruction.element){
            this.toggle_highlight(step_index, true);
            var top_offset = instruction.element.offsetTop;
            var offset_percent = top_offset / this.list_element.offsetHeight;
            this.scroll(offset_percent);
            instruction_lab.transition('right');
        }
    },
    resize: function (){
        var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.offsetHeight;
        screen_percent = Math.max(0, Math.min(1, screen_percent));
        this.scroll_bar.handle.style.height = Math.floor(screen_percent*this.scroll_bar.bar.offsetHeight)+'px';
    },
    toggle_highlight: function (instruction_index, highlight_state){
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
            this.scroll(this.scroll_percent);
        }
    },
    setup_scrollbar: function (element_id){
        this.scroll_bar = {
            container: document.getElementById(element_id),
            up_button: document.createElement('div'),
            down_button: document.createElement('div'),
            bar: document.createElement('div'),
            handle: document.createElement('div')
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
            var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.offsetHeight;
            var new_percent = instruction_lab.instructions.scroll_percent - screen_percent/2;
            instruction_lab.instructions.scroll(new_percent);
        });
        this.scroll_bar.down_button.addEventListener('click', function (){
            var screen_percent = instruction_lab.slider.offsetHeight / instruction_lab.instructions.list_element.offsetHeight;
            var new_percent = instruction_lab.instructions.scroll_percent + screen_percent/2;
            instruction_lab.instructions.scroll(new_percent);
        });
        this.scroll_bar.container.addEventListener('mousedown', function (){
            instruction_lab.right.className = 'no_select';
        }, false);
        this.scroll_bar.handle.drag = function (e){
            //var active_x = e.pageX - instruction_lab.control_interface.last_click.offset_x;
            var active_y = e.pageY - instruction_lab.control_interface.last_click.offset_y;
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var scroll_top_offset = scroll_bar.bar.offsetTop + scroll_bar.container.offsetTop;
            var scroll_percent = (active_y) / (scroll_bar.bar.offsetHeight);
            instruction_lab.instructions.scroll(scroll_percent);
        };
        this.scroll_bar.bar.addEventListener('mousedown', function (e){
            this.drag(e)
            /* Legacy
            if(e.target !== this){ return};
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var scroll_top_offset = scroll_bar.bar.offsetTop + scroll_bar.container.offsetTop;
            var click_loc = e.pageY - scroll_top_offset;
            var scroll_percent = Math.floor(click_loc - scroll_bar.handle.offsetHeight/2) / scroll_bar.bar.offsetHeight;
            instruction_lab.instructions.scroll(scroll_percent);
            */
        }, false);
            
        this.scroll_bar.bar.drag = function (e){
            var scroll_bar = instruction_lab.instructions.scroll_bar;
            var current_y = e.pageY - (scroll_bar.bar.offsetTop+scroll_bar.container.offsetTop);
            var scroll_percent = (current_y-Math.floor(scroll_bar.handle.offsetHeight/2)) / scroll_bar.bar.offsetHeight;
            instruction_lab.instructions.scroll(scroll_percent);
        };
    }
};