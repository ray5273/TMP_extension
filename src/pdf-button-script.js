    //Creating Elements
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("CLICK ME");
    btn.setAttribute('width',300);
    btn.setAttribute('height', 150);
    btn.appendChild(t);
    //Appending to DOM
    document.body.appendChild(btn);
