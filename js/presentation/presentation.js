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

function signUpInformationValid(name){
    if (!name) {
        $('#errorSignUp').html(" Some login information are empty? That's sad!").fadeIn('fast').delay(5000).fadeOut('slow');
        return false;
    }
    return true;
}


function loginInformationValid(name){
    if (!name) {
        $('#errorLogin').html(" Some login information are empty? That's sad!").fadeIn('fast').delay(5000).fadeOut('slow');
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
    for (x in liste) {
        if (liste[x].trackId === movieId) {
            return liste[x];
        }
    }
}

function setType(liste) {
    var x;
    for (x in liste) {
        if (liste[x].collectionType !== undefined) {
            liste[x].icone = "./imgs/Tv-Show-icon.png";
            liste[x].trackId = liste[x].collectionId;
            liste[x].trackName = liste[x].collectionName;
            liste[x].type = '#/tvshow/';
        } else if (liste[x].kind !== undefined) {
            liste[x].icone = "./imgs/Movies-icon.png";
            liste[x].type = '#/movies/';
            liste[x].isMovie = true;
        }else{
            delete liste[x];
        }
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

function hideMenu(){
    $('#navbarSmall').hide();
}
