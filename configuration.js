var lab_configuration = {
	title: 'Test Lab', // Used as the text for the html title.
	urls: {
		logo1: 'logo1.png',
		logo2: 'logo2.png',
		resource_background: 'resources/svg/ignite_embossed_logo.svg',
	},
	tip_templates: {
		video: {
            icon_color: '#058ef8',
            icon_url: 'test_template_logo_1.png'
		},
		purchase: {
            icon_color: '#ffffff',
            icon_url: 'test_template_logo_2.png'
		},
        link:{
            icon_color: '#ffffff',
            icon_url: 'test_template_logo_2.png'
        },
		code:{
			icon_color: 'darkgreen',
            icon_url: 'test_template_logo_3.png',
            display_instructions: function (tip_json){
				// this = an html element; a tip.
				this.className = this.className + ' double';
				var content = this.getElementsByClassName('content')[0];
				var expander = document.createElement('pre');
                expander.setAttribute('class', 'code');
				expander.textContent = tip_json.content;
				content.appendChild(expander);
			},
			display_tip_area: function (tip_json){
				// this = an html element; a tip.
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
		{title:'Hi!', unnumbered: true, logo_linked: true,
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title:'Got the right hardware?', time_in: 2,
            notes: "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
            content: [
                {type: 'video', title: 'SuperSoaker13', time_offset: 1, content: {time: 330}},
                {type: 'code', title: 'The DOOM bringer! Yeah man!', time_offset: 2, content: '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>\n<div class="crazy_idea" largeString=\'Hello\nThis is long!\'></div>\n<script type="text/javascript">\n    alert($(".crazy_idea").attr("largeString"));\n</script>'},
                {type: 'link', title: "Yup, I'm still here.", time_offset: 3, content: {icon: 'http://penguin.png'}},
                {type: 'link', title: "Gestures. Gestures. Gestures. Gestures. Gestures. Gestures. Gestures. Gestures. Gestures.", time_offset: 4, content: {icon: 'http://penguin.png'}},
                {type: 'link', title: "Yup, I'm still here.", time_offset: 5, content: {icon: 'http://penguin.png'}},
                {type: 'code', title: 'The DOOM bringer! Yeah man!', time_offset: 6, content: 'echo out > /sys/class/gyio/gpio38/direction'},
            ]
		},
		{title:'Another Step', time_in: 9,
            notes: 'Instruction Notes',
            content: [
                {type: 'video', title: 'SuperSoaker13', time_offset: 1, content: {time: 330}},
                {type: 'purchase', title: 'The DOOM bringer! Yeah man!', time_offset: 3, content: {price: '$3.30'}}
            ]
        },
		{title: 'Last', time_in: 13, 
            notes: 'Instruction Notes',
            content: [
            ]
        }
	]
}
