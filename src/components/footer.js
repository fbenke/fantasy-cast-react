import React from 'react'
import {TMDB_LOGO_URL, IMDB_LOGO_URL} from '../helpers/constants.js'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <img src={ IMDB_LOGO_URL } className="brand-logo" />
          <a href="http://www.imdb.com" target="_blank" rel="noopener noreferrer">
            Information courtesy of IMDb. Used with permission.
          </a>
        </div>
        <div className="col-xs-12 col-md-6">
          <img src={ TMDB_LOGO_URL } className="brand-logo" />
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
