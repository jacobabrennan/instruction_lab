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
            icon_color: 'transparent', //#058ef8',
            icon_url: 'youtube_logo.svg'
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
            icon_url: 'beaglebone_dog.svg'
        },
        email:{
            icon_url: 'mail-forward.svg'
        },
        code:{
            icon_color: 'transparent',
            icon_url: 'utilities-terminal.svg'/*,
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
                var last_tip = instructionLab.tip_manager.current_tips[instructionLab.tip_manager.current_tips.length-1];
                if(last_tip && last_tip.json && last_tip.json.title == tip_json.title){
                    if(last_tip.json.type === tip_json.type){
                        last_tip.dispose = undefined;
                        instructionLab.tip_manager.remove_tip(last_tip);
                    }
                }
                var icon_image = this.getElementsByTagName('img')[0];
                icon_image.style.width = 'auto';
                icon_image.style.height = '100%';
                var code_area = document.getElementById('code_display');
                if(!code_area){
                    code_area = document.createElement('pre');
                    code_area.setAttribute('id', 'code_display');
                    code_area.setAttribute('class', 'hidden');
                    instructionLab.middle.appendChild(code_area);
                }
                setTimeout(function (){
                    code_area.setAttribute('class', 'displayed');
                }, 100);
                code_area.tip = this;
                code_area.textContent = '\n'+tip_json.content+'\n\n';
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
            }*/
            /*
            displayInstructions: function (tipJSON, element){
                // this = labInstance.instructions
                var iconImage = element.getElementsByTagName('img')[0];
                iconImage.style.width = 'auto';
                iconImage.style.height = '100%';
                this.className = element.className + ' double';
                var content = element.getElementsByClassName('content')[0];
                var expander = document.createElement('pre');
                expander.setAttribute('class', 'code');
                expander.textContent = tipJSON.content;
                content.appendChild(expander);
            },
            displayTipArea: function (tipJSON, element){
                // this = labInstance.tip_manager
                var lastTip = this.current_tips[this.current_tips.length-1];
                if(lastTip && lastTip.json && lastTip.json.title == tipJSON.title){
                    if(lastTip.json.type === tipJSON.type){
                        last_Tip.dispose = undefined;
                        this.remove_tip(lastTip);
                    }
                }
                var iconImage = element.getElementsByTagName('img')[0];
                iconImage.style.width = 'auto';
                iconImage.style.height = '100%';
                var codeArea = document.getElementById('code_display');
                if(!codeArea){
                    codeArea = document.createElement('pre');
                    codeArea.setAttribute('id', 'code_display');
                    codeArea.setAttribute('class', 'hidden');
                    middle.appendChild(codeArea);
                }
                setTimeout(function (){
                    codeArea.setAttribute('class', 'displayed');
                }, 100);
                codeArea.tip = element;
                codeArea.textContent = '\n'+tipJSON.content+'\n\n';
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
            }*/
        }
    },
    instructions: [
        {unnumbered: true, logo_linked: true, time_in: 13,
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
