var amps = 0;
var Amplifier = function () {
    this.id = "AMP" + amps++;
    this.name = "Amplifier";
    this.node = context.createGain();
    this.node.gain.value = 0.5;

    this.toHTML = function () {
        return "<div class=\"node amplifier\">"
            + "<h3>" + this.name + "</h3>"
            + "Gain:&nbsp;"
            + "0<input id=\"" + this.id + "-gain\" type=\"range\" min=\"0\" max=\"1\" step=\"0.1\" value=\"" + this.getGain() + "\" />100%<br />"
            + "</div>";
    }

    this.read = function () {
        var gain = parseFloat($("#" + this.id + "-gain").val());
        this.setGain(gain);
    }

    this.update = function () {
        $("#" + this.id + "-gain").val(this.getGain());
    }

    this.setGain = function (gain) {
        this.node.gain.value = gain;
    }

    this.getGain = function () {
        return this.node.gain.value;
    }

    this.connectToDest = function () {
        this.node.connect(context.destination);
    }

    this.disconnect = function (node) {
        this.node.disconnect(node.node);
    }

    this.connect = function (node) {
        this.node.connect(node.node);
    }

    this.playNote = function (sustainLength) {
        //Attack
        this.node.gain.linearRampToValueAtTime(1, now() + this.envelope.attack);
        //Decay
        this.node.gain.linearRampToValueAtTime(this.envelope.sustain, now() + this.envelope.attack + this.envelope.decay);
        //Release
        this.node.gain.linearRampToValueAtTime(0, now() + sustainLength + this.envelope.attack + this.envelope.decay + this.envelope.release);
    }
}
