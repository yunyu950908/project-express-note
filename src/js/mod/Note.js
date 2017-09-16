import "scss/note.scss";
import {Toast} from "./Toast"
import {EventCenter} from "./EventCenter"

const Note = (function () {
    function Note(opts) {
        this.opts = opts;
        this.timer = null;
        this.initOpts(opts);
        this.createNote();
        this.setStyle();
        this.bindEvent();
    }

    Note.prototype = {
        colors: [
            ['#ea9b35', '#efb04e'], // headColor, containerColor
            ['#dd598b', '#e672a2'],
            ['#eee34b', '#f2eb67'],
            ['#c24226', '#d15a39'],
            ['#c1c341', '#d0d25c'],
            ['#3f78c3', '#5591d2']
        ],

        // default setting
        // note id , note container , note context
        defaultOpts: {
            id: '',
            $ct: $('#content').length > 0 ? $('#content') : $('body'),
            context: 'input here'
        },

        // init note
        initOpts: function (opts) {
            this.opts = $.extend({}, this.defaultOpts, opts || {});
            if (this.opts.id) {
                this.id = this.opts.id;
            }
            // console.log(opts)
        },

        // create DOM HTML element
        // set new note position
        createNote: function () {
            let tpl = '<div class="note">'
                + '<div class="note-head"><span class="delete fa fa-ban"></span></div>'
                + '<div class="note-ct" contenteditable="true"></div>'
                + '</div>';
            this.$note = $(tpl);
            this.$note.find('.note-ct').html(this.opts.context);
            this.opts.$ct.append(this.$note);
            if (!this.id) this.$note.animate({
                top: ((Math.random() + 1) * $(window).height()) * 0.3,
                left: ((Math.random() + 1) * $(window).width()) * 0.3,
            }, 100)
        },

        // set note style
        setStyle: function () {
            let color = this.colors[Math.floor(Math.random() * 6)];
            this.$note.find('.note-head').css('background-color', color[0]);
            this.$note.find('.note-ct').css('background-color', color[1]);
        },

        // call waterfall layout
        setLayout: function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                EventCenter.fire('waterfall');
            }, 100);
        },

        // bind note event
        bindEvent: function () {
            let $note = this.$note,
                $noteHead = $note.find('.note-head'),
                $noteCt = $note.find('.note-ct'),
                $delete = $note.find('.delete');

            $delete.on('click', () => {
                this.delete();
            });

            // contenteditable ==> no change event
            // try focus / blur, copy / paste
            $noteCt.on('focus', () => {
                if ($noteCt.html() == 'input here') $noteCt.html('');
                $noteCt.data('before', $noteCt.html());
            }).on('blur paste', () => {
                if ($noteCt.data('before') !== $noteCt.html()) {
                    $noteCt.data('before', $noteCt.html());
                    this.setLayout();
                    if (this.id) {
                        this.edit($noteCt.html())
                    } else {
                        this.add($noteCt.html())
                    }
                }
            });

            // note move ==> mouse down
            // note fixed ==> mouse up
            $noteHead.on('mousedown', function (e) {
                let evtX = e.pageX - $note.offset().left,
                    evtY = e.pageY - $note.offset().top;
                $note.addClass('draggable').data('evtPos', {x: evtX, y: evtY});
            }).on('mouseup', function () {
                $note.removeClass('draggable').removeData('pos');
            });

            // set position ==> mouse move
            $('body').on('mousemove', function (e) {
                $('.draggable').length && $('.draggable').offset({
                    top: e.pageY - $('.draggable').data('evtPos').y,
                    left: e.pageX - $('.draggable').data('evtPos').x
                });
            });
        },

        // add note
        add: function (msg) {
            console.log('add...');
            $.post('/api/notes/add', {
                note: msg
            })
                .done((ret) => {
                    if (ret.status === 0) {
                        Toast.init('add success');
                    } else {
                        this.$note.remove();
                        EventCenter.fire('waterfall')
                        Toast.init(ret.errorMsg);
                    }
                });
        },

        // edit note
        edit: function (msg) {
            $.post('/api/notes/edit', {
                id: this.id,
                note: msg
            }).done((ret) => {
                if (ret.status === 0) {
                    Toast.init('update success');
                } else {
                    Toast.init(ret.errorMsg);
                }
            })
        },

        // delete note
        delete: function () {
            console.log(this.id)
            $.post('/api/notes/delete', {id: this.id})
                .done((ret) => {
                    if (ret.status === 0) {
                        Toast.init('delete success');
                        this.$note.remove();
                        EventCenter.fire('waterfall')
                    } else {
                        Toast.init(ret.errorMsg);
                    }
                });
        }
    };

    return {
        init: function (opts) {
            new Note(opts)
        }
    }
})();

export {Note}