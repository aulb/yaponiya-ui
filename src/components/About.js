import React from 'react';

function About() {
  return (
    <div>
      <h1>About</h1>
      <hr />

      <p> Welcome to yaponiya ~ Russian word for Japan.
          The purpose of this web application is to visualize the realtime kanji
          usage by Japanese twitter users. We have only listed the common use kanji
          (also known as jouyou kanji) from the Japanese governments 2010 official list
          to cut down the amount of kanjis on the page. You can sort and reorder kanjis
          in various ways to see which are more common.</p>

      <p>
        This website was inspired and made possible by the help of these sources. <a href="https://kaisuu.herokuapp.com" target="_blank" rel="noopener noreferrer">Kaisuu</a> for idea and source of inspiration. <a href="http://kanjivg.tagaini.net/" target="_blank" rel="noopener noreferrer">KanjiVG</a> for providing open sourced kanji data.
      </p>

      <p>Built by <a href="https://github.com/reblws" rel="noopener noreferrer" target="_blank">reblws</a> and <a href="https://github.com/aulb" rel="noopener noreferrer" target="_blank">aulb</a> 2017.</p>
    </div>
  );
}

export default About;
