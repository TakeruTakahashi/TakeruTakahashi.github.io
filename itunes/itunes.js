$(function () {
    var audio = document.getElementById("audio");

    function play(previewUrl) {
        audio.volume = 0.5;
        audio.src = previewUrl;
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 3000);
    }

    function resume() {
        audio.play();
        setTimeout(function () {
            audio.pause();
        }, 3000)
    }

    function search() {
        var src = "https://itunes.apple.com/search";
        var term = $("#query").val();
        var country = "jp";
        var limit = 200;

        $.ajax({
            type: "get",
            crossDomain: true,
            dataType: "jsonp",
            url: src,
            data: {
                term: term,
                country: country,
                limit: limit
            }
        }).done(function (response) {
            var items = response.results;
            if (items.length < 5) {
                alert("too few search results!");
                return;
            }

            var candidates = selectCandidates(items.length - 1);
            $("#0").html(items[candidates[0]].trackName);
            $("#1").html(items[candidates[1]].trackName);
            $("#2").html(items[candidates[2]].trackName);
            $("#3").html(items[candidates[3]].trackName);
            $("#4").html(items[candidates[4]].trackName);
            $("#candidates").show();

            var random = Math.round(Math.random() * 4);
            answer = random;
            var index = candidates[random];

            play(items[index].previewUrl);
        });
    }

    function selectCandidates(maxIndex) {
        var candidates = [];

        while (candidates.length < 5) {
            var tryValue = Math.round(Math.random() * maxIndex);
            if (candidates.indexOf(tryValue) === -1) {
                candidates.push(tryValue);
            }
        }

        return candidates;
    }

    $("[data-candidate]").click(function (arg) {
        if (arg.currentTarget.id == answer) {
            swal({
                title: "Correct!",
                type: "success",
            }, search);
        } else {
            swal("Incorrect!", "", "error")
        }
    });

    $("#search-button").click(search);

    $("#resume").click(resume);

    $("#query").keypress(function (e) {
        if (e.which == 13) {
            search();
        }
    });
});