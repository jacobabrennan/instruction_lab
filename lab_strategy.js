var lab_strategy = {
	current_lab: undefined,
	start: function (){
		var self = this;
		this.nav_frame = document.createElement('div');
        var background_logo = document.createElement('img');
        background_logo.setAttribute('src', 'ignite_embossed_logo.svg')
        background_logo.setAttribute('id', 'logo_background');
		this.nav_frame.appendChild(background_logo)
        this.nav_frame.style.width = '100%';
		this.nav_frame.style.height = '100%';
		var create_button = function (title, container, click){
			var button = main_lab.create_label();
            var icon_img = document.createElement('img');
            icon_img.setAttribute('src', 'ignite_embossed_logo.svg');
            button.label_icon.appendChild(icon_img);
			button.label_title.textContent = title;
			button.addEventListener('click', click);
			container.appendChild(button);
			return button;
		}
        var intro_div = document.createElement('div');
        var diy_div = document.createElement('div');
        var dive_div = document.createElement('div');
        var credits_div = document.createElement('div');
        //var intro_description = document.createElement('span');
        var diy_description = document.createElement('span');
        var dive_description = document.createElement('span');
        //var credits_description = document.createElement('span');
        diy_div.style.textAlign = 'right';
        credits_div.style.textAlign = 'right';
        //intro_description.style.cssFloat = 'right';
        diy_description.style.cssFloat = 'left';
        dive_description.style.cssFloat = 'right';
        //credits_description.style.cssFloat = 'left';
        //intro_description.className = 'section_description';
        diy_description.className = 'section_description';
        dive_description.className = 'section_description';
        //credits_description.className = 'section_description';
        //intro_description.textContent = '';
        diy_description.textContent = 'DIY Software Defined Networking Lab';
        dive_description.textContent = 'More on SND & Openflow';
        //credits_description.textContent = '';
        //intro_div.appendChild(intro_description);
        diy_div.appendChild(diy_description);
        dive_div.appendChild(dive_description);
        //credits_div.appendChild(credits_description);
		var button = create_button(configuration.intro.title, intro_div, function (){
			var intro = self.play_intro();
			main_lab.transition('right');
			intro.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.lab_0.title, diy_div, function (){
			var lab = self.play_lab_setup();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.lab_1.title, diy_div, function (){
			var lab = self.play_lab_1();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.lab_2.title, diy_div, function (){
			var lab = self.play_lab_2();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.lab_3.title, diy_div, function (){
			var lab = self.play_lab_3();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.deep_dive.title, dive_div, function (){
			var lab = self.play_deep_dive();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button(configuration.credits.title, credits_div, function (){
			var lab = self.show_credits();
			main_lab.transition('right');
		});
        this.nav_frame.appendChild(intro_div);
        this.nav_frame.appendChild(document.createElement('hr'));
        this.nav_frame.appendChild(diy_div);
        this.nav_frame.appendChild(document.createElement('hr'));
        this.nav_frame.appendChild(dive_div);
        this.nav_frame.appendChild(document.createElement('hr'));
        this.nav_frame.appendChild(credits_div);
		main_lab.register_frame('left', this.nav_frame);
		this.play_intro();
	},
	play_intro: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var intro = intro_cartridge.setup(configuration.intro);
		this.current_lab = intro;
		return intro;
	},
	play_lab_setup: function (video){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.lab_0);
		this.current_lab = new_lab;
		return new_lab;
	},
	play_lab_1: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.lab_1);
		this.current_lab = new_lab;
		return new_lab;
	},
	play_lab_2: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.lab_2);
		this.current_lab = new_lab;
		return new_lab;
	},
	play_lab_3: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.lab_3);
		this.current_lab = new_lab;
		return new_lab;
	},
	play_deep_dive: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.deep_dive);
		this.current_lab = new_lab;
		return new_lab;
	},
	show_credits: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = {
			dispose: function (){
				
			},
			credits_frame: document.createElement('div')
		}
		new_lab.credits_frame.style.fontSize = '0.8em'
		for(var credit_index = 0; credit_index < configuration.credits.contributors.length; credit_index++){
			var indexed_credit = configuration.credits.contributors[credit_index];
			var credit_label = main_lab.create_label();
			credit_label.label_title.textContent = indexed_credit;
			new_lab.credits_frame.appendChild(credit_label)
		}
		main_lab.register_frame('middle', new_lab.credits_frame);
		this.current_lab = new_lab;
		return new_lab;
	}
};