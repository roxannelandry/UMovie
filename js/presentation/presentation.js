/**
 * Created by RoxanneLandry on 15-09-15.
 */


function afficherSearch(TextFieldId) {
    var searchBar = document.getElementById(TextFieldId);
    if (searchBar.style.display == 'none') {
        searchBar.style.display = 'inline';
        searchBar.focus();
    } else {
        searchBar.style.display = 'none';
    }
}
function AddMovieRow(NumberOfRow) {
    if ($('tr').is(":hidden")) {
        $("tr").show();
    }
    else {
        for (i = 10; i <= NumberOfRow; i++) {
            $("#" + i).hide();
        }
    }
}

function inputIsValidWatchlist(input) {
    if (!input) {
        $('#errorDivEmptyWatchlist').html(" The name of the watchlist can't be empty!").fadeIn('fast').delay(3000).fadeOut('slow');
        return false;
    }
    return true;
}

function inputIsValidSearch(input) {
    if (!input) {
        $("#errorDivEmptySearch").fadeIn('fast').delay(3000).fadeOut('slow');
        return false;
    }
    return true;
}

function goToRechercheURL(e) {
    if (e.keyCode == 13) {
        var queryString = $("#inputSearch").val();
        if (!queryString) {
            return false;
        }
        window.location.href = "#/search?q=" + queryString + '&limit=15';
        $("#inputSearch").val("").blur();
        return false;
    }
}

function findMovie(liste, movieId) {
    var x;
    var i = 0;
    for (x in liste) {
        if (liste[i].trackId === movieId) {
            return liste[i];
        }
        i++;
    }
}

function setType(liste) {
    var x;
    var i = 0;
    for (x in liste) {
        if (liste[i].collectionType !== undefined) {
            liste[i].icone = "./imgs/Tv-Show-icon.png";
            liste[i].trackId = liste[i].collectionId;
            liste[i].trackName = liste[i].collectionName;
            liste[i].type = '#/tvshow/';
        } else if (liste[i].kind !== undefined) {
            liste[i].icone = "./imgs/Movies-icon.png";
            liste[i].type = '#/movies/';
        }else{
            delete liste[i];
        }
        i++;
    }
}

function filterListe(liste,genre){

    var x;
    var nbGenreEqual;
    for (x in liste){
        nbGenreEqual = 0;
        for(nomGenre in genre) {
            if (liste[x] !== undefined) {
                if (liste[x].primaryGenreName === genre[nomGenre]) {
                    nbGenreEqual ++;
                }
            }
        }
        if (nbGenreEqual === 0){
            delete liste[x];
        }
    }
}

