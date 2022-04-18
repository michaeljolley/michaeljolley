function Topper() {
	
	let isLive = false;

	try {
		const response = fetch(
			`/functions/twitch`
		).then((response) => {
			response.json()
				.then((json) => {
					const { isOnline } = json;
					isLive = isOnline;
				})
				.catch((ex) => {});
		})
		.catch((ex) => { });
	} catch (err) {

	}

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
