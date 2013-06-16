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
		var create_button = function (title, click){
			var button = main_lab.create_label();
            var icon_img = document.createElement('img');
            icon_img.setAttribute('src', 'ignite_embossed_logo.svg');
            button.label_icon.appendChild(icon_img);
			button.label_title.textContent = title;
			button.addEventListener('click', click);
			self.nav_frame.appendChild(button);
			return button;
		}
		var button = create_button('Intro', function (){
			var intro = self.play_intro();
			main_lab.transition('right');
			intro.video_frame.player.popcorn.play();
		});
		var button = create_button('Setup Open Flow', function (){
			var lab = self.play_lab_setup();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button('Open Flow Example 1', function (){
			var lab = self.play_lab_1();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button('Open Flow Example 2', function (){
			var lab = self.play_lab_2();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button('Open Flow Example 3', function (){
			var lab = self.play_lab_3();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button('Open Flow Exit', function (){
			var lab = self.play_lab_exit();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
		var button = create_button('Deep Dive', function (){
			var lab = self.play_deep_dive();
			main_lab.transition('right');
			lab.video_frame.player.popcorn.play();
		});
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
	play_lab_exit: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = instruction_lab.setup(configuration.lab_0);
		this.current_lab = new_lab;
		return new_lab;
	},
	play_deep_dive: function (){
		if(this.current_lab){
			this.current_lab.dispose();
		}
		var new_lab = intro_cartridge.setup(configuration.intro);
		this.current_lab = new_lab;
		return new_lab;
	}
};