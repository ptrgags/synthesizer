//Number of oscillators created to date, for ID purposes
var oscillators = 0;

/*
 * Oscillator node. An oscillator is an audio node that generates
 * a tone in one of the basic wave forms
 */
var Oscillator = function () {
    this.id = "OSC" + oscillators++;            //ID of the oscillaor
    this.name = "Oscillator";                   //Title of the oscillator
    this.node = context.createOscillator();     //Underlying HTML5 oscillator
    this.typeIndex = 0;                         //Waveform type, the default is sine wave

    //HTML code for the oscillator control panel
    this.toHTML = function () {
        return "<div class=\"node oscillator\">"
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
            + "</div>";
    }

    //Read the settings from the control panel for this oscillator
    this.read = function () {
        var frequency = parseFloat($("#" + this.id + "-frequency").val());
        var type = parseInt($("#" + this.id + "-type").prop("selectedIndex"));
        this.setFrequency(frequency);
        this.node.type = type;
        this.typeIndex = type;
    }

    //Update the control panel based on the current settings
    this.update = function () {
        $("#" + this.id + "-frequency").val(this.getFrequency());
        $("#" + this.id + "-type").prop("selectedIndex", this.typeIndex);
    }

    //Set the frequency
    this.setFrequency = function (frequency) {
        this.node.frequency.setValueAtTime(frequency, now());
        //this.node.frequency.value = frequency;
    }

    //Get the current frequency
    this.getFrequency = function () {
        return this.node.frequency.value;
    }

    //Start playing a note
    this.start = function () {
        this.node.start(now());
    }


    //Stop playing a note
    this.stop = function () {
        this.setFrequency(0);
    }

    //Connect to the destination node
    this.connectToDest = function () {
        this.node.connect(context.destination);
    }


    //Disconnect from another node
    this.disconnect = function (node) {
        this.node.disconnect(node.node);
    }


    //Connect to another node
    this.connect = function (node) {
        this.node.connect(node.node);
    }
}