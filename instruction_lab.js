/*
 * This code written in whole by Jacob A Brennan.
 *
 */
var instructionLab = {
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
        var success = mainLab.registerFrame('middle', this.video_frame);
        var right_frame_html = '\
            <div id="instructions_list"></div>\
            <div id="instructions_slider"></div>\
            ';
        this.instruction_frame = document.createElement('div');
        this.instruction_frame.innerHTML = right_frame_html;
        success = mainLab.registerFrame('right', this.instruction_frame);
        // Configure html urls:
        this.logo1 = document.getElementById("logo1");
        this.logo1.src = configuration.urls.logo1;
        this.logo2 = document.getElementById("logo2");
        this.logo2.src = configuration.urls.logo2;
        // Request Media Player
        this.video_frame.player = mainLab.create_player('video');
        var video_sources = configuration.urls.video;
        for(var codex in video_sources){
            var source = document.createElement('source');
            source.setAttribute('src', video_sources[codex]);
            this.video_frame.player.media.appendChild(source);
        }
		this.video_frame.player.media.setAttribute('id', 'lab_video');
        this.video_frame.appendChild(this.video_frame.player.media);
        this.video_frame.appendChild(this.video_frame.player.controls);
        // Setup frame slider:
        this.video_width = 1280;
        this.video_height = 720;
        // Setup Instructions + Tips Sections:
		this.tip_manager.tempInstructionLab = this;
		this.instructions.tempInstructionLab = this;
        this.tip_manager.setup(configuration);
        this.instructions.setup(configuration);
        /*
        this.popcorn.on("seeked", function (){
            instructionLab.seeking = false;
            instructionLab.tip_manager.populate(instructionLab.video_frame.player.popcorn.currentTime());
        });
        this.popcorn.on("seeking", function (){
            instructionLab.seeking = true;
            instructionLab.tip_manager.clear_tips();
        });
        */
        // Finished
    },
	dispose: function (){
		mainLab.cancelFrame(this.video_frame);
		mainLab.cancelFrame(this.instruction_frame);
        this.video_frame.player.dispose()
        this.video_frame = null;
        this.instruction_frame = null;
        this.logo1 = null;
        this.logo2 = null;
        this.tip_manager.dispose();
        this.instructions.dispose();
		this.tip_manager.tempInstructionLab = null;
		this.instructions.tempInstructionLab = null;
	},
	resize: function (){
		this.instructions.resize();
		this.tip_manager.resize();
	},
	instructions: {
		tempInstructionLab: undefined,
		list: undefined,
		list_element: undefined, // an html element
		scroll_bar: undefined,
		scroll_percent: 0,
		setup: function (configuration){
			var self = this;
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
					self.tempInstructionLab.logo2.style.cursor = 'pointer';
					self.tempInstructionLab.logo2.addEventListener('click', function (){
						self.scroll_to(instruction_index);
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
						self.tempInstructionLab.video_frame.player.popcorn.currentTime(Math.max(0, instruction.time_in-2));
						mainLab.transition('left');
						setTimeout(function (){
							self.tempInstructionLab.video_frame.player.popcorn.play();
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
				self.list_element.appendChild(instruction_element);
				var expander_function = (function (){
					return function (){
						self.toggle_highlight(instruction_index);
					};
				})(instruction_index);
				icon.addEventListener('click', expander_function, false);
				title.addEventListener('click', expander_function, false);
			};
			this.tempInstructionLab.tip_manager.tip_area = document.getElementById('tip_area');
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
								if(self.tempInstructionLab.seeking){ return;}
								var node = self.tempInstructionLab.tip_manager.create_tip(tip);
								self.tempInstructionLab.tip_manager.add_tip(node);
							};
						};
						self.tempInstructionLab.video_frame.player.popcorn.cue(indexed_step.time_in + indexed_tip.time_offset, cue_function(indexed_tip));
						if(indexed_tip.time_out_offset){
							var cut_function = function (tip){
								return function (){
									var node = self.tempInstructionLab.tip_manager.find_tip(tip);
									self.tempInstructionLab.tip_manager.bump_tip(node, true);
								}
							}
							self.tempInstructionLab.video_frame.player.popcorn.cue(indexed_step.time_in + indexed_tip.time_out_offset, cut_function(indexed_tip));
						}
					}
					self.tempInstructionLab.video_frame.player.popcorn.cue(indexed_step.time_in-1, function (){
						self.tempInstructionLab.tip_manager.clear_tips(true);
					});
					self.tempInstructionLab.video_frame.player.popcorn.cue(indexed_step.time_in, (function (loop_step, loop_index){
						return function (){
							var node = self.tempInstructionLab.tip_manager.create_step(loop_step, loop_index);
							if(node){
								self.tempInstructionLab.tip_manager.add_tip(node);
							}
						}
					})(indexed_step, step_index));
				}
			};
			this.resize();
			this.list_element.addEventListener('scroll', function (){
				self.scroll_percent = self.list_element.scrollTop / self.list_element.scrollHeight;
				self.scroll_bar.reposition()
			});
		},
		dispose: function (){
			/* Further disposing?
			 * this.list = configuration.instructions; // 
			 * this.setup_scrollbar('instructions_slider');
			 */
			this.list = null;
			this.scroll_bar.dispose();
			this.list_element = null;
			this.tempInstructionLab.tip_manager.tip_area = null;
		},
		scroll: function (percent){
			var handle_percent = this.scroll_bar.handle.offsetHeight / this.scroll_bar.bar.offsetHeight;
			percent = Math.min(1-handle_percent, Math.max(0, percent));
			this.scroll_percent = percent;
			this.scroll_bar.handle.style.top = (percent*100)+'%';
			this.list_element.scrollTop = (percent*this.list_element.scrollHeight);
		},
		scroll_to: function (step_index){
			// Step index may not be the same as a step's number, do to unnumbered steps.
			var instruction = this.list[step_index];
			if(instruction && instruction.element){
				this.toggle_highlight(step_index, true);
				var top_offset = instruction.element.offsetTop-20;
				var offset_percent = top_offset / this.list_element.scrollHeight;
				this.scroll(offset_percent);
				mainLab.transition('right');
			}
		},
		resize: function (){
			var screen_percent = mainLab.slider.offsetHeight / this.list_element.scrollHeight;
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
			var scroll_percent = old_scroll_pos / this.list_element.scrollHeight;
			this.scroll(scroll_percent);
		},
		setup_scrollbar: function (element_id){
			var self = this;
			this.scroll_bar = {
				container: document.getElementById(element_id),
				up_button: document.createElement('div'),
				down_button: document.createElement('div'),
				bar: document.createElement('div'),
				handle: document.createElement('div'),
				reposition: function (){
					this.handle.style.top = (self.scroll_percent*100)+'%';
				},
				dispose: function (){
					this.container = null;
					this.up_button = null;
					this.down_button = null;
					this.bar = null;
					this.handle = null;
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
				var screen_percent = mainLab.slider.offsetHeight / instructionLab.instructions.list_element.scrollHeight;
				var new_percent = self.scroll_percent - screen_percent/2;
				self.scroll(new_percent);
			});
			this.scroll_bar.down_button.addEventListener('click', function (){
				var screen_percent = mainLab.slider.offsetHeight / self.list_element.scrollHeight;
				var new_percent = self.scroll_percent + screen_percent/2;
				self.scroll(new_percent);
			});
			this.scroll_bar.container.addEventListener('mousedown', function (){
				self.tempInstructionLab.instruction_frame.className = 'no_select';
			}, false);
			var find_offset = function (offset_object){
				var parent_offset = (offset_object.offsetParent)? find_offset(offset_object.offsetParent) : 0
				return offset_object.offsetTop + parent_offset;
			}
			this.scroll_bar.handle.drag = function (e){
				//var active_x = e.pageX - mainLab.control_interface.last_click.offset_x;
				var active_y = e.pageY - mainLab.control_interface.last_click.offset_y;
				var scroll_bar = self.scroll_bar;
				var scroll_top_offset = find_offset(scroll_bar.bar);
				var scroll_percent = (active_y) / (scroll_bar.bar.offsetHeight);
				self.scroll(scroll_percent);
			};
			this.scroll_bar.bar.addEventListener('mousedown', function (e){
				//this.drag(e)
				/* Legacy*/
				if(e.target !== this){ return};
				var scroll_bar = self.scroll_bar;
				var scroll_top_offset = find_offset(scroll_bar.bar);
				var click_loc = e.pageY - scroll_top_offset;
				var scroll_percent = Math.floor(click_loc - scroll_bar.handle.offsetHeight/2) / scroll_bar.bar.offsetHeight;
				self.scroll(scroll_percent);
				/**/
			}, false);
				
			this.scroll_bar.bar.drag = function (e){
				var scroll_bar = self.scroll_bar;
				var current_y = e.pageY - find_offset(scroll_bar.bar);
				var scroll_percent = (current_y-Math.floor(scroll_bar.handle.offsetHeight/2)) / scroll_bar.bar.offsetHeight;
				self.scroll(scroll_percent);
			};
		}
	},
	tip_manager: {
		tempInstructionLab: undefined,
		max_tips: 4,
		current_tips: new Array(),
		tip_templates: undefined,
		setup: function (configuration){
			this.tip_templates = configuration.tip_templates;
		},
		dispose: function (){
			this.tip_templates = null;
		},
		resize: function (){
			
		},
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
				position = Math.min(this.current_tips.length, this.max_tips-1)
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
			setInterval(function (){tip.style.opacity = 1;}, 100);
		},
		bump_tip: function (tip){
			if(!tip){
				tip = this.current_tips[1]
			}
			tip.style.visibility = "hidden";
			tip.style.height = "0%";
			tip.style.margin_bottom = "0em";
			tip.style.margin = "0em"
			this.remove_tip(tip, true);
		},
		create_step: function (tip_json, step_index){
			var self = this;
			if(tip_json.unnumbered){ return undefined;}
			var tip = this.create_tip(tip_json);
			tip.className += " step";
			tip.addEventListener('click', function (){
				self.tempInstructionLab.instructions.scroll_to(step_index);
			}, false);
			var step_number_display = document.createElement('span');
			step_number_display.textContent = step_index;
			step_number_display.setAttribute('class', 'number');
			var icon = tip.getElementsByClassName('icon')[0];
			icon.appendChild(step_number_display);
			return tip;
		},
		create_tip: function (tip_json){
			var tip_template_id = tip_json.type;
			var tip_template = this.tip_templates[tip_template_id];
			var tip = document.createElement('a');
			tip.json = tip_json;
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
			if(tip_json.content.url)
			tip.setAttribute('href', tip_json.content.url);
			tip.setAttribute('target', '_blank');
			icon.setAttribute('class', 'icon');
			content.setAttribute('class', 'content');
			header.setAttribute('class', 'header');
			title.setAttribute('class', 'title');
			if(tip_template){
				if(tip_template.icon_url){
					var icon_image = document.createElement('img');
					icon_image.src = tip_template.icon_url;
					icon.appendChild(icon_image);
				}
				if(tip_template.icon_color){
					icon.style.background = tip_template.icon_color;
				}
				if(tip_template.display_tip_area){
					tip.display = tip_template.display_tip_area;
				}
				if(tip_template.dispose){
					tip.dispose = tip_template.dispose;
				}
			}
			if(tip.display){
				tip.display(tip_json);
			}
			return tip;
		},
		remove_tip: function (tip, delay){
			var self = this;
			tip.json = undefined;
			var position = this.current_tips.indexOf(tip);
			if(typeof tip.dispose === 'function'){
				tip.dispose()
			}
			if(position != -1){
				tip = this.current_tips.splice(position, 1)[0];
			}
			if(delay){
				setTimeout(function (){
					self.tip_area.removeChild(tip);
				}, 900);
			} else{
				self.tip_area.removeChild(tip);
			}
		},
		clear_tips: function (delay){
			var max_removals = this.current_tips.length;
			var safety_index = 0;
			while(this.current_tips.length && (safety_index++) <= max_removals){
				var tip = this.current_tips[0];
				if(tip){
					this.remove_tip(tip, delay);
				}
			}
		},
		find_tip: function (tip_json){
			for(var tip_index = 0; tip_index < this.current_tips.length; tip_index++){
				var indexed_tip = this.current_tips[tip_index];
				if(indexed_tip && indexed_tip.json === tip_json){
					return indexed_tip;
				}
			}
			return undefined;
		},
		populate: function (time_code){
			if(!time_code){
				time_code = this.tempInstructionLab.video_frame.player.popcorn.currentTime();
			}
			// Clear tip area:
			this.clear_tips();
			var display_step;
			var display_tips = new Array();
			var display_step_index;
			for(var step_index = 0; step_index < this.tempInstructionLab.instructions.list.length; step_index++){
				var time_in;
				var time_out = time_code+1;
				var indexed_step = this.tempInstructionLab.instructions.list[step_index];
				if(indexed_step.time_in === undefined){ continue;} // Allow for time_in = 0
				time_in = indexed_step.time_in;
				for(var next_step_index = step_index+1; next_step_index < this.tempInstructionLab.instructions.list.length; next_step_index++){
					var next_step = this.tempInstructionLab.instructions.list[next_step_index];
					if(next_step.time_in === undefined){ continue;} // Allow for time_in = 0
					time_out = next_step.time_in;
					break;
				}
				if(time_in <= time_code && time_out > time_code){
					display_step = indexed_step;
					display_step_index = step_index;
					break;
				}
			}
			if(!display_step){ return;}
			for(var tip_index = display_step.content.length-1; tip_index >= 0; tip_index--){
				var indexed_tip = display_step.content[tip_index];
				if(indexed_tip.time_offset + display_step.time_in > time_code){
					continue;
				}
				if(indexed_tip.time_out_offset + display_step.time_in < time_code){
					continue;
				}
				display_tips.unshift(indexed_tip);
				if(display_tips.length >= this.max_tips-1){ // Account for the step tip to be added last.
					break;
				}
			}
			display_tips.unshift(display_step);
			for(var display_index = 0; display_index < display_tips.length; display_index++){
				var indexed_tip = display_tips[display_index];
				var new_tip;
				if(display_index == 0){
					new_tip = this.create_step(indexed_tip, display_step_index);
				} else{
					new_tip = this.create_tip(indexed_tip);
				}
				if(new_tip){
					this.add_tip(new_tip)
				}
			}
		}
	}
};