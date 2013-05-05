var lab_configuration = {
	title: 'Test Lab', // Used as the text for the html title.
	urls: {
        video: {
            'mp4': 'vids/make_beaglebone_480.mp4',
            'ogv': 'vids/make_beaglebone_480.ogv',
            'webm': 'vids/make_beaglebone_480.webm'
        },
		logo1: 'makelogo.svg',
		logo2: 'beaglebone_logo.svg',
		resource_background: 'resources/svg/ignite_embossed_logo.svg',
        time_stamp_play: 'play_button.svg'
	},
	tip_templates: {
		video: {
            icon_color: '#058ef8',
            icon_url: 'video-x-generic.svg'
		},
		makershed: {
            icon_color: '#ffffff',
            icon_url: 'makershed.svg'
		},
        link:{
            icon_url: 'linkbox_padding.svg'
        },
        linux:{
            icon_url: 'linux-tux.svg'
        },
        blog:{
            icon_url: 'text-x-generic.svg'
        },
        github:{
            icon_url: 'octocatvector.svg'
        },
        beaglebone:{
            icon_url: 'beaglebone_icon.svg'
        },
		code:{
			//icon_color: 'transparent',
            icon_url: 'utilities-terminal.svg',
            display_instructions: function (tip_json){
				// this = an html element; a tip.
                var icon_image = this.getElementsByTagName('img')[0];
                icon_image.style.width = 'auto';
                icon_image.style.height = '100%';
				this.className = this.className + ' double';
				var content = this.getElementsByClassName('content')[0];
				var expander = document.createElement('pre');
                expander.setAttribute('class', 'code');
				expander.textContent = tip_json.content;
				content.appendChild(expander);
			},
			display_tip_area: function (tip_json){
				// this = an html element; a tip.
                var icon_image = this.getElementsByTagName('img')[0];
                icon_image.style.width = 'auto';
                icon_image.style.height = '100%';
				var code_area = document.getElementById('code_display');
				if(!code_area){
					code_area = document.createElement('pre');
					code_area.setAttribute('id', 'code_display');
					code_area.setAttribute('class', 'hidden');
					instruction_lab.middle.appendChild(code_area);
				}
				setTimeout(function (){
					code_area.setAttribute('class', 'displayed');
				}, 100);
				code_area.tip = this;
				code_area.textContent = 'Code:\n'+tip_json.content;
			},
			dispose: function (){
				// this = an html element; a tip.
				var self = this;
				var code_area = document.getElementById('code_display');
				if((!code_area) || (code_area.tip != self)){ return}
				code_area.setAttribute('class', 'hidden');
				setTimeout(function (){
					if(code_area.tip != self){ return}
					code_area.parentNode.removeChild(code_area);
				}, 900);
			}
		}
	},
	instructions: [
		{title: undefined, unnumbered: true, logo_linked: true,
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title:'Got the right hardware?', short_title: 'Hardware', time_in: 2,
            notes: "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
            content: [
                {type: 'video', title: 'SuperSoaker13', short_title: '', time_offset: 1, content: '{}'},
            ]
		},
		{title:'Another Step', time_in: 9,
            notes: 'Instruction Notes',
            content: [
                {type: 'link', title: 'SuperSoaker13', time_offset: 1, content: {time: 330}},
                {type: 'link', title: 'The DOOM bringer! Yeah man!', time_offset: 3, content: {price: '$3.30'}}
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title: 'Last', time_in: 15, 
            notes: 'Instruction Notes',
            content: [
            ]
        }
	]
}
