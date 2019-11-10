$(document).ready(function () {
    $("#motors").load("Motor.html");
    $("#means").load("Mean.html");
    $("#artists").load("artists.html")

    //Load artists column
    $.getJSON("artists.json", function (data) {
        for (var key in data) {
            var year = key;
            var artistsOfTheYear = data[key];

            var container = $("#artistsContainer");
            container.append('<tr> <td></td> <td class="year"> ' + year + '</td><td></td></tr>');

            artistsOfTheYear.forEach(function (artist) {
                container.append('<tr> <td class="artist-motor"> ' + artist.motorId + '</td> <td> <a href="' + artist.link + '" target="_blank" class="artist-name ' + (artist.isKnown ? "bold" : "") + '">' + artist.Name + '</a></td><td class="artist-mean">' + artist.meanId + '</td></tr>');
            });

            $(".artist-mean").click(function () {
                var meanId = $(this).html();
                console.log(meanId)
                var row = $('#means [data-id="' + meanId + '"]');
                row[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                row.addClass("hover")
                var stopHover = handleRowHover.call(row, "meansDialog")
                setTimeout(() => {
                    row.removeClass("hover");
                    stopHover();
                }, 2000);
            })

            $(".artist-motor").click(function () {
                var motorId = $(this).html();
                console.log(motorId)
                var row =$('#motors [data-id="'+ motorId.trim() + '"]');
                row[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                console.log(row);
                row.addClass("hover");
                var stopHover = handleRowHover.call(row, "motorsDialog")

                setTimeout(() => {
                    row.removeClass("hover");
                    stopHover();
                }, 2000);
            })
        }
    });
})



function handleRowHover(tabId) {
    console.log(" tr hover")
    var index = $(this).index();
    var categIndex = Math.floor(index / 8) * 8 + 1;
    var scategIndex = Math.floor(index / 4) * 4 + 1;
    var sscategIndex = Math.floor(index / 2) * 2 + 1;

    var categElem = $("#"+ tabId +" tr:nth-child(" + categIndex + ")  :first-child");
    categElem.addClass("hover");
    var tdscategIndex = 1;
    if (categIndex == scategIndex) tdscategIndex++;
    var scategElem = $("#"+ tabId +" tr:nth-child(" + scategIndex + ") td:nth-child(" + tdscategIndex + ")");
    scategElem.addClass("hover");
    var tdsscategIndex = 1;
    if (categIndex == sscategIndex) tdsscategIndex++;
    if (scategIndex == sscategIndex) tdsscategIndex++;
    var sscategElem = $("#"+ tabId +" tr:nth-child(" + sscategIndex + ") td:nth-child(" + tdsscategIndex + ")");
    sscategElem.addClass("hover");

    var libelleElem = $("#"+ tabId +" tr:nth-child(" + (index + 1) + ") td.libelle");
    libelleElem.addClass("hover");
    var stopHover= function () {
        categElem.removeClass("hover");
        scategElem.removeClass("hover");
        sscategElem.removeClass("hover");
        libelleElem.removeClass("hover");
    }
    $(this).mouseleave(stopHover);
    return stopHover;
}

