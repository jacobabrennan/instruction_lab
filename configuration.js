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
            icon_color: 'red'
		},
        link:{
            icon_color: 'grey'
        }
	},
	instructions: [
		{notes: 'intro', title:'Hi!', unnumbered: true, content: [
			
		]},
		{notes: 'Step 1', time_in: 1, content: [
			{type: 'video', title: 'SuperSoaker13', time_offset: 1, content: {time: 330}},
			{type: 'purchase', title: 'The DOOM bringer! Yeah man!', time_offset: 2, content: {price: '$3.30'}},
			{type: 'link', title: "Yup, I'm still here.", time_offset: 3, content: {icon: 'http://penguin.png'}},
		]},
		{notes: 'Step 2', time_in: 25, content: [
			{type: 'video', title: 'SuperSoaker13', time_offset: 5, content: {time: 330}},
			{type: 'purchase', title: 'The DOOM bringer! Yeah man!', time_offset: 8, content: {price: '$3.30'}},
		]},
		{notes: 'Last', time_in: 25, title: 'Last', content: []}
	]
}
