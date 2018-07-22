export const AUTH_URL = `${process.env.API_URL}api/account/`
export const IMDB_MOVIE_URL = `${process.env.API_URL}api/imdb/`
export const TMDB_MOVIE_URL = `${process.env.API_URL}api/tmdb/`
export const REMAKE_URL = `${process.env.API_URL}api/remakes/`

export const TMDB_IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/'
export const TMDB_POSTER_SIZE = 'w185'
export const TMDB_PORTRAIT_SIZE = 'w45'
export const TMDB_ACTOR_PROFILE_PATH = `${TMDB_IMAGE_BASE_URL}${TMDB_PORTRAIT_SIZE}`
export const TMDB_LOGO_URL = 'https://www.themoviedb.org/static_cache/v4/logos/293x302-powered-by-square-green-3ee4814bb59d8260d51efdd7c124383540fc04ca27d23eaea3a8c87bfa0f388d.png'
export const IMDB_LOGO_URL = 'https://ia.media-imdb.com/images/M/MV5BMTczNjM0NDY0Ml5BMl5BcG5nXkFtZTgwMTk1MzQ2OTE@._V1_.png'

export const CHARACTER_NOT_FOUND = 'character_not_found'
export const CHARACTER_LOADING = 'character_loading'
export const CHARACTER_INIT = 'character_init'

export const TMDB_SETTINGS = {
  'backdrop_sizes': [
    'w300',
    'w780',
    'w1280',
    'original'
  ],
  'logo_sizes': [
    'w45',
    'w92',
    'w154',
    'w185',
    'w300',
    'w500',
    'original'
  ],
  'poster_sizes': [
    'w92',
    'w154',
    'w185',
    'w342',
    'w500',
    'w780',
    'original'
  ],
  'profile_sizes': [
    'w45',
    'w185',
    'h632',
    'original'
  ],
  'still_sizes': [
    'w92',
    'w185',
    'w300',
    'original'
  ]
}
