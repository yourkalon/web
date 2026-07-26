(function() {
    var keyPhase = 'dv_phase_v5';       
    var keyStep = 'dv_step_v5';         
    var keyCycle = 'dv_cycle_v5';       
    var keyTime = 'dv_time_v5';         
    var keyRest = 'dv_rest_v5';         

    var gapSeconds = 20;                
    var phaseTransitionSeconds = 10;    
    var restHours = 2;                  

    // Adsterra Links
    var newDirectLink = 'https://falconhoe.com/pynxydkcf?key=9fcaaab1932732baaffa3314295d33af';
    var link1 = 'https://falconhoe.com/zcvm0rch?key=93b158ea491b4f11e0adbacd15934c67';
    var link2 = 'https://falconhoe.com/pynxydkcf?key=9fcaaab1932732baaffa3314295d33af';
    var link4 = 'https://falconhoe.com/zcvm0rch?key=93b158ea491b4f11e0adbacd15934c67';

    // Competitor 
    var profitonSmartlink = 'https://falconhoe.com/n0p0pxanfp?key=f504717d727b01ed5ff62f49ad219714'; 
    var phase2Link3 = 'https://falconhoe.com/r9fc85kpni?key=28e5d5e23f991a59511d86158066c9a0'; 
    var newPhase2Link1 = 'https://falconhoe.com/n0p0pxanfp?key=f504717d727b01ed5ff62f49ad219714';
    var newPhase2Link2 = 'https://falconhoe.com/r9fc85kpni?key=28e5d5e23f991a59511d86158066c9a0';

    var isTelegram = false;
    try {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) {
            isTelegram = window.Telegram.WebApp.initData.length > 0;
        }
    } catch(e) {}

    if (isTelegram && window.Telegram && window.Telegram.WebApp) { 
        window.Telegram.WebApp.expand(); 
    }

    function isSafeZone(target) {
        if (!target || !target.closest) return false;
        if (target.closest('#customAgeGate') || 
            target.closest('#ageGateOverlay') || 
            target.closest('.age-verify-btn') || 
            target.closest('#sidebar') || 
            target.closest('#sidebarOverlay') || 
            target.closest('header') || 
            target.closest('.nopop') || 
            target.closest('.ts-im-container') ||
            target.closest('iframe[id^="container-"]') || 
            target.closest('div[style*="z-index: 2147483647"]')
        ) { 
            return true; 
        }
        return false; 
    }

    function openSmartPopunder(url, event) {
        if (isTelegram) {
            window.Telegram.WebApp.openLink(url, {try_instant_view: false});
        } else {
            var targetLink = event.target ? event.target.closest('a') : null;

            if (targetLink && targetLink.href) {
                var newContentTab = window.open(targetLink.href, "_blank"); 
                if (newContentTab) {
                    event.preventDefault(); 
                    window.location.href = url;
                } else {
                    window.open(url, "_blank");
                }
            } else {
                window.open(url, "_blank");
            }
        }
    }

    document.addEventListener('click', function(e) {
        if (isSafeZone(e.target)) return;

        var now = Date.now();
        var restUntil = parseInt(localStorage.getItem(keyRest) || 0);

        if (now < restUntil) {
            return;
        }

        var lastTime = parseInt(localStorage.getItem(keyTime) || 0);
        var currentPhase = parseInt(localStorage.getItem(keyPhase) || 1);
        var currentStep = parseInt(localStorage.getItem(keyStep) || 1);
        var cycleCount = parseInt(localStorage.getItem(keyCycle) || 0);

        var isTransitionClick = (currentStep === 1 && cycleCount === 0 && (currentPhase === 2));
        var requiredDelay = isTransitionClick ? (phaseTransitionSeconds * 1000) : (gapSeconds * 1000);

        if (lastTime !== 0 && (now - lastTime) < requiredDelay) {
            return;
        }

        if (currentPhase === 1) {
            if (currentStep === 1) openSmartPopunder(newDirectLink, e); 
            else if (currentStep === 2) openSmartPopunder(link2, e);
            else if (currentStep === 3) openSmartPopunder(link1, e);
            else if (currentStep === 4) openSmartPopunder(link4, e);
        } 
        else if (currentPhase === 2) {
            var phase2Ads = [
                function() { openSmartPopunder(profitonSmartlink, e); },
                function() { openSmartPopunder(phase2Link3, e); },
                function() { openSmartPopunder(newPhase2Link1, e); },
                function() { openSmartPopunder(newPhase2Link2, e); }
            ];

            var randomIndex = Math.floor(Math.random() * phase2Ads.length);
            phase2Ads[randomIndex]();
        }

        localStorage.setItem(keyTime, now);
        currentStep++;

        if (currentPhase === 1) {
            if (currentStep > 4) { currentStep = 1; cycleCount++; }
            if (cycleCount >= 2) { currentPhase = 2; cycleCount = 0; }
        } 
        else if (currentPhase === 2) {
            if (currentStep > 4) { currentStep = 1; cycleCount++; } 
            if (cycleCount >= 3) { 
                var restTimeEnd = now + (restHours * 60 * 60 * 1000);
                localStorage.setItem(keyRest, restTimeEnd);
                
                currentPhase = 1; cycleCount = 0; currentStep = 1;
            }
        }

        localStorage.setItem(keyPhase, currentPhase);
        localStorage.setItem(keyStep, currentStep);
        localStorage.setItem(keyCycle, cycleCount);

    }, true); 

})();
