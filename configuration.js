var configuration = {
    intro: {
        title: 'Intro to Software Defined Networking', // Used as the text for the html title.
        shrink_time: 10,
        urls: {
            video: {
                'mp4': 'video/sdn_intro.mp4',
                'webm': 'video/sdn_intro.webm',
                'ogv': 'video/sdn_intro.ogv'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
        }
    },
    lab_0: {
        title: 'Setup Openflow', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_setup.mp4',
                'webm': 'video/sdn_diy_setup.webm',
                'ogv': 'video/sdn_diy_setup.ogv'
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
        title: 'DIY1: Flow Control', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_01.mp4',
                'webm': 'video/sdn_diy_01.webm',
                'ogv': 'video/sdn_diy_01.ogv'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
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
            {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 1,
                notes: "",
                content: [
                    {type: 'code', title: 'Project Files', time_offset: 82, content: 'ext/mozilla_flow.py'},
                    {type: 'link', title: 'POX wiki', time_offset: 94, content: 'https://openflow.stanford.edu/display/ONL/POX+Wiki'},
                ]
            },
            {title: 'Start Controller', short_title: 'Start Controller', time_in: 100,
                notes: "",
                content: [
                    {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_flow'}
                ]
            },
            {title: 'Determine IP Addresses', short_title: 'Determine IP Addresses', time_in: 130,
                notes: "",
                content: [
                    {type: 'code', title: 'Find IP', time_offset: 4, content: 'Windows:\n    ipconfig\n\nLinux/Mac:\n    ifconfig'}
                ]
            },
            {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 146,
                notes: "",
                content: [
                    {type: 'code', title: 'Example Code', time_offset: 2, content: 'code/mozilla_flow/'},
                    {type: 'code', title: 'Listen on 10003', time_offset: 20, content: 'python receive.py'},
                    {type: 'code', title: 'Send on 10002', time_offset: 30, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
                ]
            }
        ]
    },
    lab_2: {
        title: 'DIY2: Packet Injection', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_02.mp4',
                'webm': 'video/sdn_diy_02.webm',
                'ogv': 'video/sdn_diy_02.ogv'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
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
            {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 3,
                notes: "",
                content: [
                    {type: 'code', title: 'Controller Code', time_offset: 23, content: 'ext/mozilla_injector.py'}
                ]
            },
            {title: 'Start Controller', short_title: 'Start Controller', time_in: 35,
                notes: "",
                content: [
                    {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_injector'}
                ]
            },
            {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 55,
                notes: "",
                content: [
                    {type: 'code', title: 'Example Code', time_offset: 4, content: 'code/mozilla_injector/'},
                    {type: 'code', title: 'Listen on 10003', time_offset: 25, content: 'python receive.py'},
                    {type: 'code', title: 'Send Message', time_offset: 36, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
                ]
            }
        ]
    },
    lab_3: {
        title: 'DIY3: Supercast', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_diy_03.mp4',
                'webm': 'video/sdn_diy_03.webm',
                'ogv': 'video/sdn_diy_03.ogv'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
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
            {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 3,
                notes: "",
                content: [
                    {type: 'code', title: 'Project Files', time_offset: 25, content: 'ext/mozilla_protocol.py'}
                ]
            },
            {title: 'Start Controller', short_title: 'Start Controller', time_in: 36,
                notes: "",
                content: [
                    {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_protocol'}
                ]
            },
            {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 55,
                notes: "",
                content: [
                    {type: 'code', title: 'Example Code', time_offset: 3, content: 'code/mozilla_protocol/'},
                    {type: 'code', title: 'Listen on 10002', time_offset: 20, content: 'python receive.py'},
                    {type: 'code', title: 'Run Supercast', time_offset: 42, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
                ]
            }
        ]
    },
    deep_dive: {
        title: 'SDN Deep Dive', // Used as the text for the html title.
        urls: {
            video: {
                'mp4': 'video/sdn_deepdive.mp4',
                'webm': 'video/sdn_deepdive.webm',
                'ogv': 'video/sdn_deepdive.ogv'
            },
            logo1: 'ignite_logo.svg',
            logo2: 'sdn_logo.svg',
            time_stamp_play: 'play_button.svg'
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
            {unnumbered: true, title: 'Software Defined Networking', time_in: 41,
                notes: "In this deep dive into software defined networking, we focus strongly on OpenFlow. Get started by checking out OpenFlow.org. Also, it will be helpful to learn more about the Open Networking Foundation, the organization that manages the OpenFlow standard. Martin Casado of Stanford University maintains a large list of active OpenFlow projects. Check that out as well!",
                content: [
                    {type: 'link', title: 'OpenFlow.org', time_offset: 2, content: {url: 'http://www.openflow.org/'}},
		    {type: 'link', title: 'Open Networking Foundation', time_offset: 7, content: {url: 'https://www.opennetworking.org/'}},
		    {type: 'link', title: "Martin Casado's OpenFlow List", time_offset: 14, content: {url: 'http://yuba.stanford.edu/~casado/of-sw.html/'}}
                ]
            },
            {title: 'Yiannis Yiakoumis', short_title: 'Yiannis Yiakoumis', time_in: 63,
                notes: "Yiannis is a PhD candidate at the Department of Electrical Engineering at Stanford University. Stanford is very active in OpenFlow and SDN research, and a link to their OpenFlow Dashboard is enclosed.",
                content: [
		    {type: 'link', title: 'Stanford Research', time_offset: 2, content: {url: 'http://www.stanford.edu/~yiannisy/cgi-bin/research.php'}},
		    {type: 'link', title: 'OpenFlow at Stanford', time_offset: 5, content: {url: 'https://openflow.stanford.edu/dashboard.action'}},
		    {type: 'link', title: 'Home Authentication', time_offset: 12, content: {url: 'http://www.multichannel.com/mobile/cable-show-2012-stanford-team-wins-app-challenge-bandwidth-priority-system/125686'}},
                    {type: 'github', title: 'Github', time_offset: 18, content: {url: 'https://github.com/yiannisy'}}
                ]
            },
            {title: 'Jason Parraga', short_title: 'Jason Parraga', time_in: 256,
                notes: "Jason is a student at Marist College. IBM and Marist are involved in an ongoing joint study that began in 1988. Learn more about their partnership, and check out some of Jason's work.",
                content: [
		    {type: 'link', title: 'IBM/Marist Joint Study', time_offset: 7, content: {url: 'http://www.marist.edu/community/ibm.html'}},
                    {type: 'github', title: 'Github', time_offset: 20, content: {url: 'https://github.com/Sovietaced'}},
		    {type: 'link', title: 'Access Control List', time_offset: 66, content: {url: 'http://en.wikipedia.org/wiki/Access_control_list'}}
                ]
            },
            {title: 'OpenFlow Controllers', short_title: 'OpenFlow Controllers', time_in: 338,
                notes: "OpenFlow is currently the defacto standard in Software Defined Networking. There are already many good OpenFlow controllers available, so programmers have their pick of resources. Two good examples are Floodlight and Pox. We use Pox, a python-based controller, in our Do-it-yourself SDN Lab.",
                content: [
                    {type: 'link', title: 'Floodlight', time_offset: 14, content: {url: 'http://www.projectfloodlight.org/floodlight/'}},
		    {type: 'link', title: 'Pox', time_offset: 18, content: {url: 'http://www.noxrepo.org/pox/about-pox/'}}
                ]
            },
            {title: 'Jonathan Heiliger', short_title: 'Jonathan Heiliger', time_in: 365,
                notes: "Jonathan successfully oversaw the expansion of Facebook from forty million, to eight-hundred million users. Pay particular attention to Jonathan's assertion that Ops and Software Engineer disciplines will begin to merge and shift thanks to SDN. Below, you'll find links to help you explore more resources to scaffold your SDN and Gigabit software development.",
                content: [
		    {type: 'link', title: 'GENI', time_offset: 73, content: {url: 'http://www.geni.net/'}},
		    {type: 'link', title: 'GENI Docs', time_offset: 78, content: {url: 'http://geni-app-developer-documentation.readthedocs.org/en/latest/index.html'}},
		    {type: 'link', title: 'Big Switch', time_offset: 118, content: {url: 'http://www.bigswitch.com/'}},
		    {type: 'video', title: 'Hyperglance', time_offset: 152, content: {url: 'http://www.youtube.com/watch?v=L-ad0Phy0eI'}}
                ]
            },
            {title: 'Rick Kagan', short_title: 'Rick Kagan', time_in: 526,
                notes: "Rick's points regarding the inefficiencies of current networking technology should hammer home the new frontier that SDN and OpenFlow creates. Be sure to check out the DIY Software Defined Networking Lab!",
                content: [
                    {type: 'link', title: 'Skype Protocol', time_offset: 43, content: {url: 'http://en.wikipedia.org/wiki/Skype_protocol'}}
                ]
            },
            {unnumbered: true, title: 'Dive In!', short_title: '', time_in: 619,
                notes: "",
                content: [
                    {type: 'github', title: 'Learning Labs', time_offset: 21, content: {url: 'https://github.com/mozilla/mozilla-ignite-learning-lab-demos'}},
		    {type: 'link', title: 'Mozilla Ignite Twitter', time_offset: 23, content: {url: 'https://twitter.com/MozillaIgnite'}},
		    {type: 'link', title: 'Email: Mozilla Ignite', time_offset: 24, content: {url: 'ignite@mozillafoundation.org'}}
                ]
            }
        ]
    },
	credits: {
		title: 'SDN Lab Credits'
	}
}