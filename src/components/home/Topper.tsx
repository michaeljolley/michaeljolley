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

				})
				.catch((ex) => console.log(ex));
		})
		 .catch((ex) => console.log(ex));
	}
	catch(ex) {
		console.log(ex)
	}
}

export default Topper;
