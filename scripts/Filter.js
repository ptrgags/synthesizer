var filters = 0;
var Filter = function () {
    this.id = "FIL" + filters++;
    this.name = "Filter";
    this.node = context.createBiquadFilter();
    this.node.frequency.value = 440;
    this.node.gain.value = 0;
    this.typeIndex = 0;

    this.toHTML = function () {
        return "<div class=\"node filter\">"
            + "<h3>" + this.name + "</h3>"
            + "Filter Type:"
            + "<select id=\"" + this.id + "-type\">"
            + "<option>Lowpass</option>"
            + "<option>Highpass</option>"
            + "<option>Bandpass</option>"
            + "<option>Lowshelf</option>"
            + "<option>Highshelf</option>"
            + "<option>Peaking</option>"
            + "<option>Notch</option>"
            + "<option>Allpass</option>"
            + "</select><br />"
            + "Frequency:&nbsp;"
            + "0<input id=\"" + this.id + "-frequency\" type=\"range\" min=\"0\" max=\"2400\" step=\"10\" value=\"" + this.getFrequency() + "\" />2400 Hz<br />"
            + "</div>";
    }

    this.read = function () {
        var frequency = parseFloat($("#" + this.id + "-frequency").val());
        var type = $("#" + this.id + "-type").val().toLowerCase();
        this.setFrequency(frequency);
        this.node.type = type;
        this.typeIndex = type;
    }

    this.update = function () {
        $("#" + this.id + "-frequency").val(this.getFrequency());
        $("#" + this.id + "-type").prop("selectedIndex", this.typeIndex);
    }

    this.setFrequency = function (frequency) {
        this.node.frequency.value = frequency;
    }

    this.getFrequency = function () {
        return this.node.frequency.value;
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
        this.node.frequency.linearRampToValueAtTime(2400, now() + this.envelope.attack);
        //Decay
        this.node.frequency.linearRampToValueAtTime(2400 * this.envelope.sustain, now() + this.envelope.attack + this.envelope.decay);
        //Release
        this.node.frequency.linearRampToValueAtTime(0, now() + sustainLength + this.envelope.attack + this.envelope.decay + this.envelope.release);
    }
}
