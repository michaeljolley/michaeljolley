function SocialSharing(props) {

	const { title, description, tags, permalink } = props;

	const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${permalink}&title=${title}&description=${description}&quote=${description}&hashtag=%23${tags.join(',%23')}`;
	const twLink = `https://twitter.com/intent/tweet?text=${title}&url=${permalink}&hashtags=${tags.join(',')}&via=baldbeardbuild`;
	const rdLink = `https://www.reddit.com/submit?url=${permalink}&title=${title}`;
	const liLink = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;

	const openSocial = (e, network) => {
		e.preventDefault();
		let socialUrl="";
		switch (network) {
			case 'twitter':
				socialUrl = twLink;
				break;
			case 'facebook':
				socialUrl = fbLink;
				break;
			case 'linkedin':
				socialUrl = liLink;
				break;
			case 'reddit':
				socialUrl = rdLink;
				break;
		}

		window.open(socialUrl, `bbbsocial${network}`, "height=500,width=600,menubar=0,toolbar=0");
	}

	return (
		<ul>
			<li>
				<a class="facebook" onClick={(e) => openSocial(e, 'facebook')} title="Share of Facebook" href={fbLink} target="_blank">
					<span class="svg-icon">
						<svg class="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path
								fill="currentColor"
								d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
							></path>
						</svg>
					</span>
				</a>
			</li>
			<li>
				<a class="twitter" onClick={(e) => openSocial(e, 'twitter')} title="Share on Twitter" href={twLink} target="_blank">
					<span class="svg-icon">
						<svg class="fill" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
							/>
						</svg>
					</span>
				</a>
			</li>
			<li>
				<a class="linkedin" onClick={(e) => openSocial(e, 'linkedin')} title="Share on LinkedIn" href={liLink} target="_blank">
					<span class="svg-icon">
						<svg class="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path
								fill="currentColor"
								d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
							></path>
						</svg>
					</span>
				</a>
			</li>
			<li>
				<a class="reddit" onClick={(e) => openSocial(e, 'reddit')} title="Share on Reddit" href={rdLink} target="_blank">
					<span class="svg-icon">
						<svg class="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path
								fill="currentColor"
								d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"
							></path>
						</svg>
					</span>
				</a>
			</li>
		</ul>
	);
}

export default SocialSharing
