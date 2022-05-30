// $('.btn-search').on('click', function(){
//     $.ajax({
//         url:'http://www.omdbapi.com/?apikey=c36d76f8&s=' + $('.input-search').val(),
//         success: response => {
//             const movies = response.Search;
//             let cards ='';
//             movies.forEach(movie => {
//                 cards += moviesCard(movie);
//             });
    
//             $('.container-movies').html(cards);
    
//             $('.btn-detail').on('click', function(){
//                 let imdbid = $(this).data('imdbid');
//                 console.log(imdbid)
     
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=c36d76f8&i=' + imdbid,
//                     success: response => {
//                         let detail = detailMovie(response);
//                         $('.modal-body').html(detail);
//                     }, 
//                     error: (e) => { console.log('Error')}
                    
//                 });
//             })
            
//         }, 
//         error: (e) => { console.log('Error')}
//     });
     
// });









// // // fetch -----------------------------------------------------------------------'

const btnSearch = document.querySelector('.btn-search');
const inputSearch = document.querySelector('.input-search');

btnSearch.addEventListener('click', function(){

 fetch('http://www.omdbapi.com/?apikey=c36d76f8&s=' + (inputSearch.value))
    .then( response => response.json())
    .then( response => {
        let cards = '';
        response.Search.forEach(movie => {
            cards += fMoviesCard(movie);
            document.querySelector('.movie-container').innerHTML = cards;
        })
    })
    .catch( response => console.log(response))



document.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-detail')){
        fetch('http://www.omdbapi.com/?apikey=c36d76f8&i=' + (e.target.dataset.imdbid))
            .then(response => response.json())
            .then(response => {

                document.querySelector('.detail-container').innerHTML = fDetailMovie(response);
            })
    }
});     
});





// // fetch refactoring -----------------------------------------------------------------------'

// const btnSearch = document.querySelector('.btn-search');
// // pencarian video ----------------------------
// btnSearch.addEventListener('click', async function(e){
//     try{
//         const inputSearch = document.querySelector('.input-search');
//         const movies = await getData(inputSearch.value);
//         updateUI(movies);
//     }catch(e){
//         console.log(e.inputSearch)
//     }
    
// })



// Detail movie ( event binding ) -----------------------------------------------------
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-detail')){
       const imdbid = e.target.dataset.imdbid;
       const movieDetail = await getDetail(imdbid);
       updateUIDetail(movieDetail);
    }   
});




// function untuk mendapatkan data video menggunakan fetch lalu diconvert ke json
function getData(keyword){
    return fetch('http://www.omdbapi.com/?apikey=c36d76f8&s=' + keyword)
    .then( response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }else{
            return response.json();
        }
    })
    .then( response => {
        if(response.Response === False){
            throw new Error(response>Error)
        }else{
            return response.Search                                                                                      ;
        }
    } )
    .catch( response => console.log(response))
}




// function untuk looping data video dan memasukkan hasil looping ke html
function updateUI(movies){
    let cards = '';
        movies.forEach(movie => {
            cards += fMoviesCard(movie);
            document.querySelector('.movie-container').innerHTML = cards;
        })
}




// function untuk mendapatkan data video menggunakan fetch lalu diconvert ke json
function getDetail(keyword){
    return fetch('http://www.omdbapi.com/?apikey=c36d76f8&i=' + keyword)
    .then( response => response.json())
    .then( response => response )
    .catch( response => console.log(response))
}



// function untuk mengambil data video detail dan memasukkan data detail ke html
function updateUIDetail(m){
    let movie = fDetailMovie(m)
    document.querySelector('.detail-container').innerHTML = movie;
}





// function untuk manipulasi data dari json dan memasukan ke innerHTML listCard html
function fDetailMovie(md){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${md.Poster}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${md.Title}</h4></li>
                        <li class="list-group-item"><strong>Director : </strong> ${md.Director}</li>
                        <li class="list-group-item"><strong>Actors : </strong> ${md.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong> ${md.Writer}</li>
                        <li class="list-group-item"><strong>Plot : </strong> <br> ${md.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}


// function untuk manipulasi data dari json dan memasukan ke innerHTML
function fMoviesCard(movie){
    return `<div class="col-md-4 my-3">
            <div class="card">          
                <img src= ${movie.Poster} class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                            <a href="#" data-bs-toggle="modal" data-imdbid = "${movie.imdbID}" data-bs-target="#detailMovies" class="btn btn-primary btn-detail">Show details</a>
                    </div>
            </div>
        </div>`;
}

