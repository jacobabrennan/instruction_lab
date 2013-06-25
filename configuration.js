var configuration = {
    intro: {
        title: 'Test Lab', // Used as the text for the html title.
        shrink_time: 10,
        urls: {
            video: {
                'mp4': 'video/sdn_intro.mp4',
                'ogv': 'video/sdn_intro.ogv',
                'webm': 'video/sdn_intro.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
        }
    },
	
	
	
	/*
            {title: '', short_title: '', time_in: 30,
                notes: "",
                content: [
                    {type: 'link', title: '', time_offset: 4, content: {url: ''}},
                    {type: 'link', title: '', time_offset: 10, content: {url: ''}}
                ]
            }
	*/
	
	
	
	
    lab_0: {
        title: 'Test Lab', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_setup.mp4',
                'ogv': 'video/sdn_diy_setup.ogv',
                'webm': 'video/sdn_diy_setup.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
        },
        tip_templates: {
            link:{
                icon_url: 'linkbox_padding.svg'
            },
            github:{
                icon_url: 'octocatvector.svg'
            },
            code:{
                icon_color: 'transparent',
                icon_url: 'utilities-terminal.svg',
                code_display: true
            }
        },
        instructions: [
            {title: 'What You Need to Get Started', short_title: 'What you need', time_in: 15,
                notes: "",
                content: [
                    {type: 'link', title: 'Get Router', time_offset: 4, content: {url: 'http://www.amazon.com/TP-LINK-TL-WR1043ND-Ultimate-Wireless-Detachable/dp/B002YLAUU8/ref=sr_1_1?s=electronics&ie=UTF8&qid=1371061220&sr=1-1&keywords=tp-link+tl-wr1043nd'}}
                ]
            },
            {title: 'Prep', short_title: 'Prep', time_in: 50,
                notes: "",
                content: [
                    {type: 'github', title: 'Get the Files', time_offset: 4, content: {url: 'https://github.com/mozilla/mozilla-ignite-learning-lab-demos/tree/master/lab-6-7-openflow'}}
                ]
            },
            {title: 'Upgrade Firmware', short_title: 'Upgrade Firmware', time_in: 94,
                notes: "",
                content: [
                    {type: 'code', title: 'Browse to', time_offset: 9, content: '192.168.1.1'},
                    {type: 'code', title: 'Select File', time_offset: 29, content: 'misc/firmware/ofwrt-attitude-adj-pantou.bin'}
                ]
            },
            {title: 'Set Password', short_title: 'Set Password', time_in: 137,
                notes: "",
                content: [
                    {type: 'code', title: 'Telnet to Router', time_offset: 8, content: 'telnet 192.168.1.1'},
                    {type: 'code', title: 'Set Password', time_offset: 16, content: 'passwd'},
                    {type: 'code', title: 'Exit Telnet', time_offset: 20, content: 'exit'},
                    {type: 'code', title: 'SSH into Router', time_offset: 25, content: 'ssh root@192.168.1.1'}
                ]
            },
            {title: 'Configure Router', short_title: 'Configure Router', time_in: 173,
                notes: "",
                content: [
                    {type: 'code', title: 'Copy Config Files', time_offset: 194, content: 'scp network root@192.168.1.1'},
                    {type: 'code', title: 'Run Command on Router', time_offset: 0, content: 'sudo cp network /etc/config'},
                    {type: 'code', title: 'Restart Networking', time_offset: 1, content: '/etc/init.d/network restart'},
                    {type: 'code', title: 'Find IP Address', time_offset: 2, content: 'ifconfig\n(ip config on windows)'},
                    {type: 'code', title: 'SSH Into Router', time_offset: 3, content: 'ssh root@192.168.1.1'},
                    {type: 'code', title: 'Edit Openflow Config', time_offset: 4, content: 'vim /etc/config/openflow'},
                    {type: 'code', title: 'Restart Openflow', time_offset: 5, content: '/etc/init.d/openflow restart'}
                ]
            }
        ]
    },
    lab_1: {
        title: 'Test Lab', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_01.mp4',
                'ogv': 'video/sdn_diy_01.ogv',
                'webm': 'video/sdn_diy_01.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg'//,
            /*time_stamp_play: 'play_button.svg'*/
        },
        tip_templates: {
            github:{
                icon_url: 'octocatvector.svg'
            },
            code:{
                icon_color: 'transparent',
                icon_url: 'utilities-terminal.svg',
                code_display: true
            }
        },
        instructions: [
			{title: 'More Info', short_title: 'More Info', time_in: 30,
                notes: "",
                content: [
					{type: 'link', title: 'POX wiki', time_offset: 0, content: 'https://openflow.stanford.edu/display/ONL/POX+Wiki'},
					{type: 'code', title: '', time_offset: 0, content: 'ext/mozilla_flow.py'},
				]
			},
			{title: 'Start Controller', short_title: 'Start Controller', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: '/poy.py --verbose mozilla_flow'}
				]
			},
			{title: 'Determine IP Addresses', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'ipconfig\n--------\nifconfig'}
				]
			},
			{title: 'Send Openflow Message', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'code/mozilla_flow/'},
					{type: 'code', title: '', time_offset: 0, content: 'python receive.py'},
					{type: 'code', title: '', time_offset: 0, content: 'python send.py [IP address of receiving computer] "Hello Openflow!"'}
                ]
            }
        ]
    },
    lab_2: {
        title: 'Test Lab', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_02.mp4',
                'ogv': 'video/sdn_diy_02.ogv',
                'webm': 'video/sdn_diy_02.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg'//,
            /*time_stamp_play: 'play_button.svg'*/
        },
        tip_templates: {
            github:{
                icon_url: 'octocatvector.svg'
            },
            code:{
                icon_color: 'transparent',
                icon_url: 'utilities-terminal.svg',
                code_display: true
            }
        },
        instructions: [
			{title: 'More Info', short_title: 'More Info', time_in: 30,
                notes: "",
                content: [
					{type: 'code', title: '', time_offset: 0, content: 'ext/mozilla_injector.py'}
				]
			},
			{title: 'Start Controller', short_title: 'Start Controller', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: '/poy.py --verbose mozilla_injector'}
				]
			},
			{unnumbered: true, title: 'Determine IP Addresses', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'ipconfig\n--------\nifconfig'}
				]
			},
			{title: 'Send Openflow Message', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'code/mozilla_injector/'},
					{type: 'code', title: '', time_offset: 0, content: 'python receive.py'},
					{type: 'code', title: '', time_offset: 0, content: 'python send.py [IP address of receiving computer] "Hello Openflow!"'}
                ]
            }
		]
    },
    lab_3: {
        title: 'Test Lab', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_03.mp4',
                'ogv': 'video/sdn_diy_03.ogv',
                'webm': 'video/sdn_diy_03.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg'//,
            /*time_stamp_play: 'play_button.svg'*/
        },
        tip_templates: {
            github:{
                icon_url: 'octocatvector.svg'
            },
            code:{
                icon_color: 'transparent',
                icon_url: 'utilities-terminal.svg',
                code_display: true
            }
        },
        instructions: [
			{title: 'More Info', short_title: 'More Info', time_in: 30,
                notes: "",
                content: [
					{type: 'code', title: '', time_offset: 0, content: 'ext/mozilla_protocol.py'}
				]
			},
			{title: 'Start Controller', short_title: 'Start Controller', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: '/poy.py --verbose mozilla_protocol'}
				]
			},
			{unnumbered: true, title: 'Determine IP Addresses', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'ipconfig\n--------\nifconfig'}
				]
			},
			{title: 'Send Openflow Message', short_title: 'Determine IP Addresses', time_in: 0,
				notes: "",
				content: [
					{type: 'code', title: '', time_offset: 0, content: 'code/mozilla_protocol/'},
					{type: 'code', title: '', time_offset: 0, content: 'python receive.py'},
					{type: 'code', title: '', time_offset: 0, content: 'python send.py [IP address of receiving computer] "Hello Openflow!"'}
                ]
            }
		]
    },
    deep_dive: {
        title: 'Test Lab', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_deepdive.mp4',
                'ogv': 'video/sdn_deepdive.ogv',
                'webm': 'video/sdn_deepdive.webm'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg'//,
            /*time_stamp_play: 'play_button.svg'*/
        },
        tip_templates: {
            video: {
                icon_color: 'transparent', //#058ef8',
                icon_url: 'youtube_logo.svg'
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
            code:{
                icon_color: 'transparent',
                icon_url: 'utilities-terminal.svg',
                code_display: true
            }
        },
        instructions: [
            {unnumbered: true, title: 'Software Defined Networking', time_in: 13,
                notes: "Your Beaglebone is a microcontroller. If you don't have one already, you can score one in the Makershed. It's customary to get started with a microcontroller by making an LED blink, just like in the Arduino video below. It's kind of like the \"Hello World\" of microcontrollers.",
                content: [
                    {type: 'makershed', title: 'GET A BEAGLEBONE', time_offset: 2, content: {url: 'http://www.makershed.com/ProductDetails.asp?ProductCode=MKCCE1&Click=37845'}},
                    {type: 'video', title: 'ARDUINO EXAMPLE', time_offset: 10, content: {url: 'http://www.youtube-nocookie.com/embed/pMV2isNm8JU?rel=0'}},
                    
                ]
            },
            {title: 'Update Your BeagleBone\'s Operating System', short_title: 'Update your OS', time_in: 30,
                notes: "Your Beaglebone runs on Angstrom, a distribution of Linux that is made for embedded devices and microcontrollers. Here's the Angstrom manual, along with resources to learn how to update your Beaglebone's OS.",
                content: [
                    {type: 'link', title: 'More About Angstrom', time_offset: 4, content: {url: 'http://www.linuxtogo.org/gowiki/AngstromManual'}},
                    {type: 'link', title: 'Updating Angstrom', time_offset: 10, content: {url: 'http://www.angstrom-distribution.org/demo/beaglebone/'}}
                ]
            },
            {title: 'CHOOSE A METHOD, THEN CONNECT TO YOUR BEAGLEBONE', short_title: 'CONNECT YOUR BEAGLEBONE', time_in: 45,
                notes: "If connecting via USB, eject the disk image, then look in your router's settings for a list of <b>DHCP clients</b> to determine your BeagleBone's IP address. Connecting to your Beaglebone via SSH depends on your computer's operating system. If you're using Mac OSX or Linux, you can use the command below in the terminal. If you're on a Windows machine, you can use PuTTY, a free TelNet/SSH client.",
                content: [
                    {type: 'code', title: 'MAC & LINUX: USE THIS COMMAND IN THE TERMINAL', short_title: 'MAC AND LINUX COMMAND', time_offset: 17, content: 'ssh root@[your BeagleBone\'s IP]'},
                    {type: 'link', title: 'PuTTY FOR WINDOWS', time_offset: 19, content: {url: 'http://www.chiark.greenend.org.uk/~sgtatham/putty/'}}
                ]
            },
            {title: 'HOOK UP YOUR LED & LOCATE ITS NUMBER IN LINUX', short_title: 'HOOK UP AND LOCATE LED', time_in: 80,
                notes: "Watch the video carefully and set up your LED. Next, use the Beaglebone manual to discover your pin's default configuration. If you want to set up your own configuration or learn more about pinmuxing on the Beaglebone in general, check out these additional resources.",
                content: [
                    {type: 'beaglebone', title: 'REFERENCE MANUAL', time_offset: 9, content: {url: 'http://beagleboard.org/static/beaglebone/latest/Docs/Hardware/BONE_SRM.pdf'}},
                    {type: 'blog', title: 'ELINUX\'S GUIDE TO PINMUXING', time_offset: 17, content: {url: 'http://elinux.org/BeagleBoardPinMux'}},
                    {type: 'blog', title: 'PIN NUMBERING IN LINUX', time_offset: 39, content: {url: 'http://www.nathandumont.com/node/250'}}
                ]
            },
            {title: 'CHECK YOUR CONFIGURATION BY LIGHTING YOUR LED', short_title: 'LED TEST', time_in: 150,
                notes: "The commands below are typed into the Linux console to read and write files in the Linux file system.",
                content: [
                    {type: 'code', title: 'EXPORT A PIN', time_offset: 4, time_out_offset: 13, content: 'echo 38 > /sys/class/gpio/export'},
                    {type: 'code', title: 'SET THE DIRECTION', time_offset: 14, time_out_offset: 24, content: 'echo out > /sys/class/gpio/gpio38/direction'},
                    {type: 'code', title: 'SET THE PIN HIGH', time_offset: 25, time_out_offset: 38, content: 'echo 1 > /sys/class/gpio/gpio38/value'},
                    {type: 'code', title: 'SET THE PIN LOW', time_offset: 39, time_out_offset: 46, content: 'echo 0 > /sys/class/gpio/gpio38/value'},
                    {type: 'code', title: 'UNEXPORT A PIN', time_offset: 47, time_out_offset: 56, content: 'echo 38 > /sys/class/gpio/unexport'}
                ]
            },
            {title: 'DOWNLOAD MATT\'S PYTHON MODULE', short_title: 'GET PYTHON MODULE', time_in: 225,
                notes: "If you want, you can browse Matt's Github account below. Otherwise, use these commands in the comand line to download the Python Module directly from Matt's site.",
                content: [
                    {type: 'github', title: 'MRBBIO ON GITHUB', time_offset: 5, content: {url: 'https://github.com/mrichardson23/mrBBIO'}},
                    {type: 'code', title: 'CREATE A NEW DIRECTORY', time_offset: 14, content: 'mkdir ~/blinkLed'},
                    {type: 'code', title: 'CHANGE DIRECTORY', time_offset: 21, content: 'cd ~/blinkLed'},
                    {type: 'code', title: 'USE WGET TO DOWNLOAD', time_offset: 26, content: 'wget http://mattrichardson.com/mrbbio.py'}
                ]
            },
            {title: 'USE PYTHON SCRIPTING TO MAKE THE LED BLINK', short_title: 'CREATE THE PYTHON SCRIPT', time_in: 260,
                notes: "After using the nano command to create a new file, you're going to need to do some Python scripting. Here's a good video below if you're just getting a start and need some help. From here, use this script, typed in the exact way that Matt describes.",
                content: [
                    {type: 'code', title: 'CREATE A NEW FILE', time_offset: 1, time_out_offset: 6, content: 'nano blinkLed.py'},
                    {type: 'video', title: 'LEARNING PYTHON', time_offset: 7, content: {url: 'http://www.youtube-nocookie.com/embed/tKTZoB2Vjuk?rel=0'}},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 8, content: 'from mrbbio import *'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 14, content: 'from mrbbio import *\ndef setup():'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 20, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 31, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 39, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():\n\tdigitalWrite("P8.3", HIGH)'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 45, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():\n\tdigitalWrite("P8.3", HIGH)\n\tdelay(1000)'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 49, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():\n\tdigitalWrite("P8.3", HIGH)\n\tdelay(1000)\n\tdigitalWrite("P8.3", LOW)'},
                    {type: 'code', title: 'File Contents', display_instructions: false, time_offset: 55, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():\n\tdigitalWrite("P8.3", HIGH)\n\tdelay(1000)\n\tdigitalWrite("P8.3", LOW)\n\tdelay(1000)'},
                    {type: 'code', title: 'File Contents', time_offset: 63, content: 'from mrbbio import *\ndef setup():\n\tpinMode("P8.3", OUTPUT)\ndef loop():\n\tdigitalWrite("P8.3", HIGH)\n\tdelay(1000)\n\tdigitalWrite("P8.3", LOW)\n\tdelay(1000)\nrun(setup, loop)'},
                ]
            },
            {title: 'EXECUTE THE PYTHON SCRIPT', short_title: 'RUN THE SCRIPT', time_in: 336,
                notes: "If everything's right, with this one command below, you should have a blinking LED! Did you do it? If so, awesome! If not, check your work and try again.",
                content: [
                    {type: 'code', title: 'EXECUTE YOUR SCRIPT', time_offset: 1, content: 'python blinkLed.py'},
                ]
            },
            {short_title: 'Join The Community', title: 'JOIN THE COMMUNITY, AND SHOW OFF YOUR WORK', time_in: 360,
                notes: "If you need help with your project, try the BeagleBone Google Group, or visit the really great IRC chat on BeagleBoard.org. Remember, when you've got something cool built, show us what you're doing by sending Matt an email!",
                content: [
                    {type: 'beaglebone', title: 'BeagleBone Chat Room', time_offset: 6, content: {url: 'http://beagleboard.org/chat'}},
                    {type: 'email', title: 'Email Matt', time_offset: 6, content: {url: 'mailto:mattr@makezine.com'}},
                    {type: 'link', title: 'BEAGLEBONE GOOGLE GROUP', time_offset: 6, content: {url: 'http://groups.google.com/group/beagleboard/topics'}}
                ]
            }
        ]
    }
}