import { useEffect, useState} from 'preact/hooks';

function Topper() {
	const [isLive, setIsLive] = useState(false);

  useEffect(() => {
		fetch(
				`/functions/twitch`
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
		<section class="topper">
			<div class={ isLive ? 'twitch intro' : 'intro' }>
				{ isLive && (
						<iframe
							src="https://player.twitch.tv/?channel=baldbeardedbuilder&parent=baldbeardedbuilder.com&autoplay=true"
							scrolling="no"
							allow="autoplay"
							allowfullscreen="false"
						>
						</iframe>
					)
				}
			</div>
		</section>
	);
}

export default Topper;
