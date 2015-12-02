//Audio Context
var context = new AudioContext();
//Object that stores all the node objects in the program
var nodes = {};

//Get the current time
function now() {
    return context.currentTime;
}

//Initialize the page
function init() {
    //Create nodes
    nodes.oscillator = [new Oscillator(), new Oscillator(), new Oscillator()];
    nodes.filter = new Filter();
    nodes.amplifier = new Amplifier;

    nodes.ampEnvelope = new Envelope();
    nodes.ampEnvelope.name = "Amp Envelope";
    nodes.ampLFO = new LFO(100);
    nodes.ampLFO.name = "Amp LFO";

    nodes.filterEnvelope = new Envelope();
    nodes.filterEnvelope.name = "Filter Envelope";
    nodes.filterLFO = new LFO(1000);
    nodes.filterLFO.name = "Filter LFO";

    //Connect nodes
    nodes.amplifier.connectToDest();
    nodes.amplifier.envelope = nodes.ampEnvelope;
    nodes.amplifier.lfo = nodes.ampLFO;
    nodes.ampLFO.connectToAmp(nodes.amplifier);

    nodes.filter.connect(nodes.amplifier);
    nodes.filter.envelope = nodes.filterEnvelope;
    nodes.filter.lfo = nodes.filterLFO;
    nodes.filterLFO.connectToFilter(nodes.filter);

    for (var i in nodes.oscillator)
        nodes.oscillator[i].connect(nodes.filter);

    //Create control panel
    createControlPanel();

    nodes.oscillator[0].start();
    nodes.oscillator[1].setFrequency(0);
    nodes.oscillator[2].setFrequency(0);
    nodes.amplifier.setGain(0);
}

//Create the control panel on the page
function createControlPanel() {
    $("#container").append(nodes.oscillator[0].toHTML()
        + "<br/><br/>"
        + nodes.filter.toHTML()
        + "<br/>"
        + nodes.filterEnvelope.toHTML()
        + "<br/>"
        + nodes.filterLFO.toHTML()
        + "<br/><br/>"
        + nodes.amplifier.toHTML()
        + "<br/>"
        + nodes.ampEnvelope.toHTML()
        + "<br/>"
        + nodes.ampLFO.toHTML());
}

//Play a note
function play() {
    //Get the duration of the note
    var duration = parseFloat($("#duration").val());

    //Read settings for all nodes
    nodes.oscillator[0].read();
    nodes.filter.read();
    nodes.amplifier.read();
    nodes.filterLFO.read();
    nodes.filterEnvelope.read();
    nodes.ampEnvelope.read();
    nodes.ampLFO.read();

    //Play the note
    nodes.filter.playNote(duration);
    nodes.amplifier.playNote(duration);
}
