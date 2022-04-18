import { useState } from 'preact/hooks';

const positiveMessages = [
  'he believes in you.',
  "he thinks you're awesome.",
  'he thinks you belong here.',
  'he knows you belong here.',
  "he thinks you've got this.",
  'he knows you can.',
]
const images = [5, 6, 7, 8, 10]

function About() {
	
  const [michaelImage, setMichaelImage] = useState('');
  const [positiveMessage, setPositiveMessage] = useState('');

	const recycle = () => {
		const randomMessage = Math.floor(Math.random() * positiveMessages.length);
		const randomImage = Math.floor(Math.random() * images.length);
		setPositiveMessage(positiveMessages[randomMessage]);
		setMichaelImage(`https://res.cloudinary.com/dk3rdh3yo/image/upload/g_auto,f_auto/v1607302424/ograph_${images[randomImage]}.png`);
	}

	recycle();

	return (
	  <section class="about stripe">
    <div class="aboutBody">
      <img src={michaelImage} alt="Michael making faces" onClick={recycle} />
      <div>
        <h2>About <span>Michael</span></h2>
        <p>
          At work, he leads the Developer Relations team at&nbsp;
          <a href="https://deepgram.com">Deepgram</a> where he gets to play with
          awesome APIs. You can also catch him giving talks at various events,
          sharing videos on&nbsp;
          <a href="https://youtube.com/baldbeardedbuilder">YouTube</a>, or
          streaming on&nbsp;
          <a href="https://twitch.tv/baldbeardedbuilder">Twitch</a>.
        </p>
        <p>
          But more importantly,<span>{positiveMessage}</span>
        </p>
      </div>
    </div>
  </section>
	);
}

export default About;
