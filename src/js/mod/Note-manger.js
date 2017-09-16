import {Toast} from "./Toast"
import {Note} from "./Note"
import {EventCenter} from "./EventCenter"

const NoteManager = (function () {

    function load() {
        $.get('/api/notes')
            .done(ret => {
                // console.log(ret)
                if (ret.status === 0) {
                    $.each(ret.data, (idx, article) => {
                        Note.init({
                            id: article.id,
                            context: article.text
                        });
                    });
                    EventCenter.fire('waterfall');
                } else {
                    Toast.init(ret.errorMsg);
                }
            })
            .fail(() => {
                Toast.init('网络异常');
            });
    }

    function add() {
        Note.init();
    }

    return {
        load: load,
        add: add
    }

})();

export {NoteManager}

