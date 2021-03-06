instruction_lab.tip_manager = {
    max_tips: 4,
    current_tips: new Array(),
    tip_templates: undefined,
    setup: function (configuration){
        this.tip_templates = configuration.tip_templates;
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
        if(tip_json.unnumbered){ return undefined;}
        var tip = this.create_tip(tip_json);
        tip.className += " step";
        tip.addEventListener('click', function (){
            instruction_lab.instructions.scroll_to(step_index);
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
                instruction_lab.tip_manager.tip_area.removeChild(tip);
            }, 900);
        } else{
            instruction_lab.tip_manager.tip_area.removeChild(tip);
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
            time_code = instruction_lab.popcorn.currentTime();
        }
        // Clear tip area:
        this.clear_tips();
        var display_step;
        var display_tips = new Array();
        var display_step_index;
        for(var step_index = 0; step_index < instruction_lab.instructions.list.length; step_index++){
            var time_in;
            var time_out = time_code+1;
            var indexed_step = instruction_lab.instructions.list[step_index];
            if(indexed_step.time_in === undefined){ continue;} // Allow for time_in = 0
            time_in = indexed_step.time_in;
            for(var next_step_index = step_index+1; next_step_index < instruction_lab.instructions.list.length; next_step_index++){
                var next_step = instruction_lab.instructions.list[next_step_index];
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
};