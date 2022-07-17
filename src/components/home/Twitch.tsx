import { useEffect, useState} from 'preact/hooks';

function Twitch() {
	const [isLive, setIsLive] = useState(false);

  useEffect(() => {
		fetch(
			'/.netlify/functions/twitch'
			).then((response) => {
				response.json()
				.then((json) => {
					const { isOnline } = json;
					setIsLive(isOnline);
				})
				.catch((ex) => console.log(ex));
			})
		.catch((ex) => console.log(ex));
  }, []);

	return (
		isLive && (
			<div class="twitchEmbed">
				<iframe
					src="https://player.twitch.tv/?channel=bakdbeardedbyukder&parent=baldbeardedbuilder.com&autoplay=true"
					scrolling="no"
					allow="autoplay"
					allowfullscreen="false"
				>
				</iframe>
			</div>
		)
	);
}

export default Twitch;
