var envelopes = 0;
var Envelope = function () {
    this.id = "ENV" + envelopes++;
    this.name = "ADSR Envelope";
    this.attack = 0.0;
    this.decay = 3.0;
    this.sustain = 0.75;
    this.release = 1.0;

    this.toHTML = function () {
        return "<div class=\"node adsr\">"
            + "<h3>" + this.name + "</h3>"
            + "A 0<input id=\"" + this.id + "-attack\" type=\"range\" min=\"0.0\" max=\"3.0\" step=\"0.01\" value=\"" + this.attack + "\" />3 sec<br />"
            + "D 0<input id=\"" + this.id + "-decay\" type=\"range\" min=\"0.0\" max=\"3.0\" step=\"0.01\" value=\"" + this.decay + "\" />3 sec<br />"
            + "S 0<input id=\"" + this.id + "-sustain\" type=\"range\" min=\"0.0\" max=\"1.0\" step=\"0.01\" value=\"" + this.sustain + "\" />1<br />"
            + "R 0<input id=\"" + this.id + "-release\" type=\"range\" min=\"0.0\" max=\"3.0\" step=\"0.01\" value=\"" + this.release + "\" />3 sec<br />"
            + "</div>";
    }

    this.read = function () {
        this.attack = parseFloat($("#" + this.id + "-attack").val());
        this.decay = parseFloat($("#" + this.id + "-decay").val());
        this.sustain = parseFloat($("#" + this.id + "-sustain").val());
        this.release = parseFloat($("#" + this.id + "-release").val());
    }

    this.update = function () {
        $("#" + this.id + "-attack").val(this.attack);
        $("#" + this.id + "-decay").val(this.decay);
        $("#" + this.id + "-sustain").val(this.sustain);
        $("#" + this.id + "-release").val(this.release);
    }
}