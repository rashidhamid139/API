$(document).ready(function() {

    var csrf_token = $("input[name=csrfmiddlewaretoken]").val();
    $("#createButton").click(function() {
        var serializedData = $("#createTaskForm").serialize();
        $.ajax({
            url: $("#createTaskForm").data('url'),
            data: serializedData,
            type: 'post',
            success: function(response) {
                $("#taskList").append('<div class="card mb-1" id="taskCard" data-id="' + response.task.id + '"><div class="card-body">' + response.task.title +'<button class="close float-right" data-id="' +response.task.id + '" type="button"><span aria-hidden="true">&times;</span></div></div></div>')
            }
        });

        $("#createTaskForm")[0].reset();
    });


    $("#taskList").on('click', '.card', function() {
        alert(this)
        var data_id = $(this).data('id');
        console.log(data_id);
        $.ajax({
            url: '/tasks/' + data_id + '/completed/',
            data: {
                csrfmiddlewaretoken: csrf_token,
                id: data_id
            },
            type: 'post',
            success: function(response) {
                var cardItem = $('taskCard[data-id="' + data_id + '"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();
                $("#taskList").append(cardItem)
            }
        })
    }).on('click', 'button.close', function(event) {
        event.stopPropogation();

        var dataId = $(this).data('id');
        $.ajax({
            url: '/tasks/' + dataId + '/delete/',
            data: {
                csrfmiddlewaretoken: csrf_token,
                id: dataId
            },
            type: 'post',
            dataType: 'json',
            success: function(response) {
                $('#taskCard[data-id="' + dataId + '"]').remove();
            }
        })
    })
})

