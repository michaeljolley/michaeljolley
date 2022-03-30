import './Topper.scss';

async function Topper() {
	
	let isLive = false;

	try {
		const response = await fetch(
			`https://baldbeardedbuilder.com/.netlify/functions/twitch`
		);
		const { isOnline } = await response.json();
		isLive = isOnline;
	} catch (ex) {} 

	return (
		<section>
			<div class={ isLive ? 'twitch intro' : 'intro' }>
				<iframe
					v-if="isOnline"
					src="https://player.twitch.tv/?channel=baldbeardedbuilder&parent=baldbeardedbuilder.com&autoplay=true"
					scrolling="no"
					allow="autoplay"
					allowfullscreen="false"
				>
				</iframe>
			</div>
		</section>
	);
}

export default Topper;
