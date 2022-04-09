(function($) {
    'use strict';
    $.fn.dnDrop = function(options) {
        var settings = $.extend({
                target: '.target',
                finishText: 'Complete!',
                width: 0,
                columns: false,
                multipleAnswers: false,
                background: '#dddddd',
                color: 'initial',
                border: 'none',
                hoverColor: '#e9e9e9',
                mixedTypes: false,
                mixedClass: '.dragger'
            },
            options);
        var hoverStyle = $('<style>.hovered { background:' + settings.hoverColor + '; }</style>');
        $('html > head').append(hoverStyle);
        var dragsCont = this;
        var drags = this.children();
        var drops = settings.target;
        var dragArray = [];
        var dragsTotal = 0;
        if (settings.mixedTypes === true) {
            dragsTotal = settings.mixedClass.length;
        } else {
            dragsTotal = drags.length;
        }
        var score = 0;
        var dragsTallest = 0;
        $(drags).css('width', settings.width);
        var dragWidth = $(drags).outerWidth();
        $(drops).css('width', dragWidth);
        drags.each(function() {
            dragArray.push($(this));
            var dragsHeight = $(this).outerHeight();
            if (dragsHeight > dragsTallest) {
                dragsTallest = dragsHeight;
            }
            $(this).css({
                "background-color": settings.background,
                "color": settings.color,
                "border": settings.border
            });

        });
        shuffle(dragArray);
        for (var i = dragsTotal; i >= 0; i--) {
            if (window.CP.shouldStopExecution(0)) break;
            this.append(dragArray[i]);
        }
        window.CP.exitedLoop(0);
        if (settings.columns === true) {
            var containerHeight = $(this).parent().height();
            $(drops).css('height', containerHeight);
        } else {
            $(drops).css('height', dragsTallest);
        }
        if (settings.multipleAnswers === true) {
            drags.draggable({
                revert: true,
                disabled: false,
                helper: 'clone',
                start: function(event, ui) {
                    $(this).css('z-index', '999');
                }
            });

        } else {
            drags.draggable({
                revert: true,
                disabled: false,
                start: function(event, ui) {
                    $(this).css('z-index', '999');
                }
            });

        }
        var containerwidth = this.width();
        this.css('width', containerwidth);
        if (settings.columns !== true) {
            $(drops).css("border", "1px dotted #000");
        } else {
            $(drops).css("border", "none");
        }
        $(drops).css("margin", "auto auto");
        $(drops).droppable({
            hoverClass: 'hovered',
            drop: function(event, ui) {
                if (ui.draggable.attr('data-drag') == $(this).attr('data-drop')) {
                    score++;
                    if (settings.columns === true) {
                        $("<li style='list-style: none;margin: 0 0 12px;padding: 0 0 12px;border-bottom-width: 1px;border-bottom-style: dotted;border-bottom-color: #999'></li>").text(ui.draggable.text()).appendTo(this);
                        ui.draggable.draggable('disable');
                        ui.draggable.remove();
                    } else if (settings.multipleAnswers === true) {
                        $("<span></span>").text(ui.draggable.text()).appendTo(this);
                        $(ui.helper).remove();
                        $(this).droppable('disable');
                        $(this).css("border", "1px dotted #fff");
                    } else {
                        $("<span></span>").text(ui.draggable.text()).appendTo(this);
                        ui.draggable.draggable('disable');
                        ui.draggable.remove();
                        $(this).droppable('disable');
                        $(this).css("border", "1px dotted #fff");
                    }
                    if (score === dragsTotal) {
                        $(dragsCont).append("<div style='font-weight:bold;text-align:center'>" + settings.finishText + "</div>");
                    }
                }
            }
        });

        return this;
    };

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            if (window.CP.shouldStopExecution(1)) break;
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        window.CP.exitedLoop(1);
    }
})(jQuery);

$(document).ready(function() {

    var stringNext = "Complete!.";
    $('#options01').dnDrop({
        target: ".target01",
        columns: true,
        finishText: stringNext,
        background: '#ffc0cc'
    });

    var tabWidth = 0;
    $(".tabCont > table").each(function() {
        var tab = $(this);
        if (tab.width() > tabWidth) {
            tabWidth = tab.outerWidth();
            $("#game").css("width", tabWidth);
        }
    });


});