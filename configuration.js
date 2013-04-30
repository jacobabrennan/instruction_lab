var lab_configuration = {
	title: 'Test Lab', // Used as the text for the html title.
	urls: {
		node_linkbox: 'resources/svg/linkbox_padding.svg',
		node_logo: 'resources/svg/ignite_embossed_logo.svg',
		logo1: 'logo1.png',
		logo2: 'logo2.png',
		resource_background: 'resources/svg/ignite_embossed_logo.svg',
		hackable_demo: 'https://github.com/mozilla/mozilla-ignite-learning-lab-demos/tree/master/lab-5-spdy'
	},
	tip_templates: {
		video: {
            icon_color: 'blue'
		},
		purchase: {
            icon_color: 'green'
		},
        link:{
            icon_color: 'purple'
        }
	},
	instructions: [
		{title:'Hi!', unnumbered: true,
            notes: 'Instruction Notes',
            content: [
            ]
        },
		{title:'Step One', time_in: 2,
            notes: "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
            content: [
                {type: 'video', title: 'SuperSoaker13', time_offset: 1, content: {time: 330}},
                {type: 'code', title: 'The DOOM bringer! Yeah man!', time_offset: 2, content: 'price: $3.30 <h1><b>37 Guinnie Pigs</b></h1>'},
                {type: 'link', title: "Yup, I'm still here.", time_offset: 3, content: {icon: 'http://penguin.png'}},
                {type: 'link', title: "Gestures. Gestures. Gestures. Gestures. Gestures.", time_offset: 4, content: {icon: 'http://penguin.png'}},
                {type: 'link', title: "Yup, I'm still here.", time_offset: 5, content: {icon: 'http://penguin.png'}},
                {type: 'link', title: "Yup, I'm still here.", time_offset: 6, content: {icon: 'http://penguin.png'}},
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
