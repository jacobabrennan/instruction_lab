var intro_cartridge = {
    video_frame: undefined,
    setup: function (configuration){
		var new_lab = Object.create(this);
		document.title = configuration.title;
        new_lab.seeking = false;
        // Create Frames:
            // Create Middle Frame:
        var middle_frame_html = '\
            <div id="tip_area"></div>\
            <img id="logo1" alt="Make Logo" />\
            <img id="logo2" alt="Lab Specific Logo" />\
            ';
        new_lab.video_frame = document.createElement('div');
        new_lab.video_frame.innerHTML = middle_frame_html;
        var success = main_lab.register_frame('middle', new_lab.video_frame);
        // Configure html urls:
        new_lab.logo1 = document.getElementById("logo1");
        new_lab.logo1.src = configuration.urls.logo1;
        new_lab.logo2 = document.getElementById("logo2");
        new_lab.logo2.src = configuration.urls.logo2;
        // Request Media Player
		new_lab.video_frame.player = main_lab.create_player('video');
        var video_sources = configuration.urls.video;
        for(var codex in video_sources){
            var source = document.createElement('source');
            source.setAttribute('src', video_sources[codex]);
            new_lab.video_frame.player.media.appendChild(source);
        }
		new_lab.video_frame.player.media.setAttribute('id', 'lab_video');
		new_lab.video_frame.player.media.className = 'full_screen';
        new_lab.video_frame.appendChild(new_lab.video_frame.player.media);
        new_lab.video_frame.appendChild(new_lab.video_frame.player.controls);
        // Setup frame slider:
        new_lab.video_width = 1280;
        new_lab.video_height = 720;
		new_lab.video_frame.transition_away = function (){
			new_lab.video_frame.player.popcorn.pause();
		};
		// Setup Popcorn events
		new_lab.video_frame.player.popcorn.cue(configuration.shrink_time, function (){
			new_lab.video_frame.player.media.className = '';
		});
		new_lab.video_frame.player.popcorn.cue(configuration.shrink_time+2, function (){
			new_lab.video_frame.player.popcorn.currentTime(new_lab.video_frame.player.popcorn.duration()-2);
		});
		new_lab.video_frame.player.popcorn.on('ended', function (){
			var old_video = new_lab.video_frame.player.media;
			new_lab.video_frame.player.media.className = '';
			var newer_lab = lab_strategy.play_lab_setup(old_video);
			/*new_lab.dispose();
			newer_lab = instruction_lab.setup(lab_configuration, old_video);*/
			newer_lab.video_frame.player.popcorn.play();
		});
        // Finished
		return new_lab;
    },
	dispose: function (){
		main_lab.cancel_frame(this.video_frame);
		this.video_frame.removeChild(this.video_frame.player.media);
		this.video_frame.removeChild(this.video_frame.player.controls);
		this.video_frame.style.display = 'none';
		this.video_frame.player.media.className = '';
		this.video_frame.player.dispose();
        this.video_frame = null;
        this.logo1 = null;
        this.logo2 = null;
	}
};