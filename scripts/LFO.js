//Number of LFOs created to date, for ID purposes
var lfos = 0;


var LFO = function (maxGain) {
    this.id = "LFO" + oscillators++;
    this.name = "LFO";
    this.node = context.createOscillator();
    this.gain = context.createGainNode();
    this.gain.gain.value = maxGain;
    this.maxGain = maxGain;
    this.node.connect(this.gain);
    this.typeIndex = 0;

    this.toHTML = function () {
        return "<div class=\"node lfo\">"
            + "<h3>" + this.name + "</h3>"
            + "Wave Type:&nbsp;"
            + "<select id=\"" + this.id + "-type\">"
            + "<option>Sine</option>"
            + "<option>Square</option>"
            + "<option>Sawtooth</option>"
            + "<option>Triangle</option>"
            + "</select><br />"
            + "Frequency:&nbsp;"
            + "0<input id=\"" + this.id + "-frequency\" type=\"range\" min=\"0\" max=\"1000\" step=\"10\" value=\"" + this.getFrequency() + "\" />1000 Hz<br />"
            + "Amount:&nbsp;"
            + "0<input id=\"" + this.id + "-gain\" type=\"range\" min=\"0\" max=\"" + this.maxGain + "\" step=\"" + (this.maxGain / 100) + "\" value=\"" + this.gain.gain.value + "\" />" + this.maxGain + "<br />"
            + "</div>";
    }

    this.read = function () {
        var frequency = parseFloat($("#" + this.id + "-frequency").val());
        var gain = parseFloat($("#" + this.id + "-gain").val());
        var type = parseInt($("#" + this.id + "-type").prop("selectedIndex"));
        this.setFrequency(frequency);
        this.gain.gain.value = gain;
        this.node.type = type;
        this.typeIndex = type;
    }

    this.update = function () {
        $("#" + this.id + "-frequency").val(this.getFrequency());
        $("#" + this.id + "-gain").val(this.gain.gain.value);
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

    this.connectToFilter = function (filter) {
        this.gain.connect(filter.node.frequency);
    }

    this.connectToAmp = function (amp) {
        this.gain.connect(amp.node.gain);
    }

    this.release = function (duration) {
        this.node.frequency.linearRampToValueAtTime(0, duration);
    }
}