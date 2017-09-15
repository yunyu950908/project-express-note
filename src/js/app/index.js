import {NoteManager} from "../mod/Note-manger"
import {EventCenter} from "../mod/EventCenter"
import {Waterfall} from "../mod/Waterfall"

import "scss/index.scss"

const noteWaterfall = Waterfall.init($('#content'));

NoteManager.load();

$('.add-note').on('click', function () {
    NoteManager.add();
});

EventCenter.on('waterfall', function () {
    noteWaterfall.render();
});

setInterval(() => {
    EventCenter.fire("waterfall")
}, 60000);