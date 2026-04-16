(function () {

    // Create main container
    var container = document.createElement("div");
    container.id = "floatingAd";
    container.style.position = "fixed";
    container.style.bottom = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.zIndex = "9999";

    // Inner box
    var inner = document.createElement("div");
    inner.style.position = "relative";
    inner.style.width = "728px";
    inner.style.maxWidth = "100%";

    // Close button
    var closeBtn = document.createElement("span");
    closeBtn.innerHTML = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "-10px";
    closeBtn.style.right = "-10px";
    closeBtn.style.background = "#000";
    closeBtn.style.color = "#fff";
    closeBtn.style.padding = "2px 8px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.fontSize = "14px";
    closeBtn.onclick = function () {
        container.remove();
    };

    // Ad container
    var adBox = document.createElement("div");
    adBox.id = "adsterra-ad-box";

    // Append elements
    inner.appendChild(closeBtn);
    inner.appendChild(adBox);
    container.appendChild(inner);
    document.body.appendChild(container);

    // Adsterra options (IMPORTANT)
    window.atOptions = {
        'key': '14b10a40214e13c734e0c36e4f3c34cc',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
    };

    // Load Adsterra script
    var adScript = document.createElement("script");
    adScript.src = "https://motortape.com/14b10a40214e13c734e0c36e4f3c34cc/invoke.js";
    adScript.async = true;

    adBox.appendChild(adScript);

})();
