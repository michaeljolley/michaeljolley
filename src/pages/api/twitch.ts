export async function get() {

	let isOnline = false;

	try {

		const authResp = await fetch(
			`https://id.twitch.tv/oauth2/token?client_id=${import.meta.env.TWITCH_CLIENT_ID}&client_secret=${import.meta.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
		)
		const authData = await authResp.json();
		
		const streamResp = await fetch(
			`https://api.twitch.tv/helix/streams?user_login=baldbeardedbuilder`,
			{
				headers: {
					'Client-ID': import.meta.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${authData.access_token}`,
				},
			}
		)
		const streamData = await streamResp.json();
		isOnline = !!streamData.data.streams.length;
	}
	catch (err) {
		console.log(err)
	}

	return {
		body: JSON.stringify({
			isOnline
		})
	};
}
