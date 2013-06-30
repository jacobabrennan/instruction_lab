var configuration = {
    tip_templates: {
        video: {
            icon_color: 'transparent', //#058ef8',
            icon_url: urls.tip_icons.youtube
        },
        link:{
            icon_url: urls.tip_icons.link_out
        },
        linux:{
            icon_url: urls.tip_icons.linux
        },
        blog:{
            icon_url: urls.tip_icons.blog
        },
        github:{
            icon_url: urls.tip_icons.github
        },
        code:{
            icon_color: 'transparent',
            icon_url: urls.tip_icons.code,
            code_display: true
        }
    }
};
configuration.intro = {
    title: 'Intro to Software Defined Networking', // Used as the text for the html title.
    shrink_time: 132,
    urls: {
        video: urls.video.intro,
        logo1: urls.logo1,
        logo2: urls.logo2,
    },
};
configuration.lab_0 = {
    title: 'Setup Openflow', // Used as the text for the html title.
    tip_templates: configuration.tip_templates,
    urls: {
        video: urls.video.lab_setup,
        logo1: urls.logo1,
        logo2: urls.logo2,
        time_stamp_play: urls.time_stamp_play
    },
    instructions: [
        {title: 'What You Need to Get Started', short_title: 'What you need', time_in: 15,
            notes: "Here is the link where you can check out the TP Link router we use in this lab. In addition to the router, we're using three separate computers. We're using a Raspberry Pi as our OpenFlow controller, but you can use just about any computer - though we highly suggest a Linux or Mac machine.",
            content: [
                {type: 'link', title: 'Get Router', time_offset: 4, content: {url: 'http://www.amazon.com/TP-LINK-TL-WR1043ND-Ultimate-Wireless-Detachable/dp/B002YLAUU8/ref=sr_1_1?s=electronics&ie=UTF8&qid=1371061220&sr=1-1&keywords=tp-link+tl-wr1043nd'}}
            ]
        },
        {title: 'Prep', short_title: 'Prep', time_in: 50,
            notes: "Once you've downloaded the files from the Mozilla Ignite Github account. Also, make sure you've disconnected all the computers from any possible network connection.",
            content: [
                {type: 'github', title: 'Get the Files', time_offset: 4, content: {url: 'https://github.com/mozilla/mozilla-ignite-learning-lab-demos/tree/master/lab-6-7-openflow'}}
            ]
        },
        {title: 'Upgrade Firmware', short_title: 'Upgrade Firmware', time_in: 94,
            notes: "Take your time with this step and the following; if you move too quickly, it is entirely possible to brick your router! The firmware you're installing is OpenWRT v. 12.09 \"Attitude Adjustment.\"",
            content: [
                {type: 'code', title: 'Browse to', time_offset: 9, content: '192.168.1.1'},
                {type: 'code', title: 'Select File', time_offset: 29, content: 'misc/firmware/ofwrt-attitude-adj-pantou.bin'}
            ]
        },
        {title: 'Set Password', short_title: 'Set Password', time_in: 137,
            notes: "If you're using a Raspberry Pi as an OpenFlow controller as we did, make sure you have telnet installed. We have instructions for that in \"What you need to get started.\" If you're using a windows machine, you should download \"PuTTy.\"",
            content: [
                {type: 'code', title: 'Telnet to Router', time_offset: 8, content: 'telnet 192.168.1.1'},
                {type: 'code', title: 'Set Password', time_offset: 16, content: 'passwd'},
                {type: 'code', title: 'Exit Telnet', time_offset: 20, content: 'exit'},
                {type: 'code', title: 'SSH into Router', time_offset: 25, content: 'ssh root@192.168.1.1'}
            ]
        },
        {title: 'Configure Router', short_title: 'Configure Router', time_in: 173,
            notes: "In case you're having a hard time understanding, Kenny is saying that the controller will be plugged into the WAN port, and the other computers will connect through the usual LAN ports. Also, take your time to understand how to use the VI text editor. You can always choose a different means to edit your files.",
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
}
configuration.lab_1 = {
    title: 'DIY1: Flow Control', // Used as the text for the html title.
    tip_templates: configuration.tip_templates,
    urls: {
        video: urls.video.lab_1,
        logo1: urls.logo1,
        logo2: urls.logo2,
        time_stamp_play: urls.time_stamp_play
    },
    instructions: [
        {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 1,
            notes: "It's totally worth digging into the python scripts and reading Kenny's comments! Take your time navigating to your files.",
            content: [
                {type: 'code', title: 'Project Files', time_offset: 82, content: 'ext/mozilla_flow.py'},
                {type: 'link', title: 'POX wiki', time_offset: 94, content: 'https://openflow.stanford.edu/display/ONL/POX+Wiki'},
            ]
        },
        {title: 'Start Controller', short_title: 'Start Controller', time_in: 100,
            notes: "Kick things off with this command: a flow module will install a flow and facilitate redirection of packets sent from port 10002 to port 10003. From here things are easy, just be sure to be patient!",
            content: [
                {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_flow'}
            ]
        },
        {title: 'Determine IP Addresses', short_title: 'Determine IP Addresses', time_in: 130,
            notes: "You're going to want to keep track of your host's computers IP addresses.",
            content: [
                {type: 'code', title: 'Find IP', time_offset: 4, content: 'Windows:\n    ipconfig\n\nLinux/Mac:\n    ifconfig'}
            ]
        },
        {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 146,
            notes: "We're sending \"Hello OpenFlow\" to the computer listening on port 10002.. but the awesome part is that our flow table is going to make sure that our host listening on 10003 also receives the network traffic!",
            content: [
                {type: 'code', title: 'Example Code', time_offset: 2, content: 'code/mozilla_flow/'},
                {type: 'code', title: 'Listen on 10003', time_offset: 20, content: 'python receive.py'},
                {type: 'code', title: 'Send on 10002', time_offset: 30, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
            ]
        }
    ]
};
configuration.lab_2 = {
    title: 'DIY2: Packet Injection', // Used as the text for the html title.
    tip_templates: configuration.tip_templates,
    urls: {
        video: urls.video.lab_2,
        logo1: urls.logo1,
        logo2: urls.logo2,
        time_stamp_play: urls.time_stamp_play
    },
    instructions: [
        {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 3,
            notes: "This example is pretty cool stuff... we're going to be modifying packets while they're on the move! Be sure to check out the code and its comments, so you've got a chance to learn how the module is accomplishing packet injection.",
            content: [
                {type: 'code', title: 'Controller Code', time_offset: 23, content: 'ext/mozilla_injector.py'}
            ]
        },
        {title: 'Start Controller', short_title: 'Start Controller', time_in: 35,
            notes: "Instead of installing flows, the injector module is going to inspect every packet that comes in, and then modifies it when the conditions are right.",
            content: [
                {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_injector'}
            ]
        },
        {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 55,
            notes: "Both computers are working through port 10002 this time. With the right conditions met, the router modifies the packet and sends it onwards to its intended recipient. Imagine combining flows and packet injection! What are some ways apps could use these new capabilities?",
            content: [
                {type: 'code', title: 'Example Code', time_offset: 4, content: 'code/mozilla_injector/'},
                {type: 'code', title: 'Listen on 10003', time_offset: 25, content: 'python receive.py'},
                {type: 'code', title: 'Send Message', time_offset: 36, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
            ]
        }
    ]
};
configuration.lab_3 = {
    title: 'DIY3: Supercast', // Used as the text for the html title.
    tip_templates: configuration.tip_templates,
    urls: {
        video: urls.video.lab_3,
        logo1: urls.logo1,
        logo2: urls.logo2,
        time_stamp_play: urls.time_stamp_play
    },
    instructions: [
        {unnumbered: true, title: 'More Info', short_title: 'More Info', time_in: 3,
            notes: "With supercast, the router will be able to intelligently direct traffic to other network locations dependent on variables set by the programmer! When combined with flow control, ports and IP addresses can be switched effortlessly. Access Control Lists can now be managed from a single point, and can be dynamically arranged by the software!",
            content: [
                {type: 'code', title: 'Project Files', time_offset: 25, content: 'ext/mozilla_protocol.py'}
            ]
        },
        {title: 'Start Controller', short_title: 'Start Controller', time_in: 36,
            notes: "Instead of flow control or packet injection, now we're inspecting packets for a \"supercast\" header. When the controller finds an appropriate packet, it fires the network traffic off to the recipients listening on the appropriate port: in this case, port 10002.",
            content: [
                {type: 'code', title: 'Run Script', time_offset: 2, content: '/pox.py --verbose mozilla_protocol'}
            ]
        },
        {title: 'Send Openflow Message', short_title: 'Send Openflow Message', time_in: 55,
            notes: "Make sure you've got the right IP addresses, and be sure both hosts are listening on 10002! Theoretically, you could connect more computers than what the lab calls for, and then easily forward network traffic to those computers as well. Since this is the final example and experiment.. we're hoping you learned a bunch, and are ready to build your own killer new app!",
            content: [
                {type: 'code', title: 'Example Code', time_offset: 3, content: 'code/mozilla_protocol/'},
                {type: 'code', title: 'Listen on 10002', time_offset: 20, content: 'python receive.py'},
                {type: 'code', title: 'Run Supercast', time_offset: 42, content: 'python send.py [receiving computer IP] "Hello Openflow!"'}
            ]
        }
    ]
};
configuration.deep_dive = {
    title: 'SDN Deep Dive', // Used as the text for the html title.
    tip_templates: configuration.tip_templates,
    urls: {
        video: urls.video.deep_dive,
        logo1: urls.logo1,
        logo2: urls.logo2,
        time_stamp_play: urls.time_stamp_play,
        ordinals: urls.ordinals
    },
    instructions: [
        {unnumbered: true, title: 'Software Defined Networking', time_in: 41,
            notes: "In this deep dive into software defined networking, we focus strongly on OpenFlow. Get started by checking out OpenFlow.org. Also check out the Open Networking Foundation, the organization that manages the OpenFlow standard. Martin Casado of Stanford University maintains a large list of active OpenFlow projects. Check that out as well!",
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
            notes: "Jason is a student at Marist College. IBM and Marist are involved in a joint study that began in 1988. Learn more about their partnership, and take the time to check out some of Jason's work.",
            content: [
        {type: 'link', title: 'IBM/Marist Joint Study', time_offset: 7, content: {url: 'http://www.marist.edu/community/ibm.html'}},
                {type: 'github', title: 'Github', time_offset: 20, content: {url: 'https://github.com/Sovietaced'}},
        {type: 'link', title: 'Access Control List', time_offset: 66, content: {url: 'http://en.wikipedia.org/wiki/Access_control_list'}}
            ]
        },
        {title: 'OpenFlow Controllers', short_title: 'OpenFlow Controllers', time_in: 338,
            notes: "OpenFlow is currently the defacto standard in Software Defined Networking. There are many good OpenFlow controllers available, so programmers have their pick of resources to get started. We use Pox, a python-based controller, in our DIY SDN Lab.",
            content: [
                {type: 'link', title: 'Floodlight', time_offset: 14, content: {url: 'http://www.projectfloodlight.org/floodlight/'}},
        {type: 'link', title: 'Pox', time_offset: 18, content: {url: 'http://www.noxrepo.org/pox/about-pox/'}}
            ]
        },
        {title: 'Jonathan Heiliger', short_title: 'Jonathan Heiliger', time_in: 365,
            notes: "Jonathan oversaw the expansion of Facebook from forty million to eight-hundred million users. Pay particular attention to his assertion that Ops and Software Engineers will begin to merge.",
            content: [
        {type: 'link', title: 'GENI', time_offset: 73, content: {url: 'http://www.geni.net/'}},
        {type: 'link', title: 'GENI Docs', time_offset: 78, content: {url: 'http://geni-app-developer-documentation.readthedocs.org/en/latest/index.html'}},
        {type: 'link', title: 'Big Switch', time_offset: 118, content: {url: 'http://www.bigswitch.com/'}},
        {type: 'video', title: 'Hyperglance', time_offset: 152, content: {url: 'http://www.youtube.com/watch?v=L-ad0Phy0eI'}}
            ]
        },
        {title: 'Rick Kagan', short_title: 'Rick Kagan', time_in: 526,
            notes: "Rick hammers home the new frontier that SDN and OpenFlow creates by pointing out how dramatically different our experience on Skype could be.",
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
};
configuration.credits = {
    title: 'SDN Lab Credits',
    contributors: [
        'Michael McCarthy',
        'Kenny Katzgrau',
        'Jacob A Brennan',
        'Graham Wheeler',
        'Yiannis Yiakoumis',
        'Jason Parraga',
        'Jonathan Heiliger',
        'Rick Kagan',
        'Tango Desktop Project (iconography)'
    ]
};