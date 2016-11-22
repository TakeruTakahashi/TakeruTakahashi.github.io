
$(window).load(function() {
    $('.pauseBtn').hide();
    $('.resumeBtn').hide();

    $.keyframe.define([{
        name: 'ripen',
        '0%' : { 'background-color': '#59a404' },
        '100%' : { 'background-color': '#F74c3c' }
    }]);
})
        
function start(){
    $('.startBtn').hide();
    $('.pauseBtn').show();
    $('.tormato').resetKeyframe();
    $('.tormato').playKeyframe({
        name: 'ripen',
        duration: '1500s',
        complete: function(){
            complete()
        }
    });
}

function pause(){
    $('.startBtn').hide();
    $('.pauseBtn').hide();
    $('.resumeBtn').show();
    $('.tormato').pauseKeyframe();
}

function resume(){
    $('.pauseBtn').show();
    $('.resumeBtn').hide();
    $('.tormato').resumeKeyframe({
        name: 'ripen',
        complete: function(){
            complete()
        }
    });
}

function reset(){
    $('.finished').hide();
    $('.startBtn').show();
    $('.pauseBtn').hide();
    $('.resumeBtn').hide();
    $('.tormato').resetKeyframe();
    
    finish($('#task').val() + ' (reset)');
}

function complete(){
    $('.finished').fadeIn();
    $('.startBtn').show();
    $('.pauseBtn').hide();
    $('.resumeBtn').hide();
    
    finish($('#task').val());
}

function finish(task) {
    $('#finished-tasks').append('<li>' + task + '</li>');
}
