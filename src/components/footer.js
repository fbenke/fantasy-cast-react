import React from 'react'
import {TMDB_LOGO_URL, IMDB_LOGO_URL} from '../helpers/constants.js'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="text-muted">
        <img src={ IMDB_LOGO_URL } className="brand-logo" /> Information courtesy of IMDb <a href="http://www.imdb.com">(http://www.imdb.com)</a>. Used with permission.<br/>
        <img src={ TMDB_LOGO_URL } className="brand-logo" />This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
    </footer>
  )
}

export default Footer
