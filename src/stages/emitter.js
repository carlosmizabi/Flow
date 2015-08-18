/**
 * Created by tautalos on 11/07/15.
 */
var hasOwnProp = {}.hasOwnProperty;

function createName (name) {
    return '$' + name;
}

function Emitter() {
    this.subjects = {};
}

Emitter.prototype.emit = function (name, data) {
    var fnName = createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
    this.subjects[fnName].onNext(data);
};

Emitter.prototype.on = function (name, handler) {
    var fnName = createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
    this.subjects[fName].subscribe(handler);
};

Emitter.prototype.off = function (name, handler ) {
    var fnName = createName(name);
    if (this.subjects[fnName]) {
        this.subjects[fName].dispose();
        delete this.subjects[fName];
    }
};

Emitter.prototype.listen = function (name, handler) {
    var fnName = createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
    return this.subjects[fnName].subscribe(handler);
};


Emitter.prototype.dispose = function() {
    var subjects = this.subjects;
    for (var prop in subjects) {
        if (hasOwnProp.call(subjects, prop)) {
            subjects[prop].dispose();
        }
    }
    this.subjects = {};
};