import { useEffect, useState} from 'preact/hooks';

function WebMentions(props) {
	const [mentions, setMentions] = useState([]);

    const { url, displayQuantity, displayLink } = props;

    let displayedAvatars = [];
    let remainingAvatars = 0;

    const filterMentions = () => {
        
        const slugMentions = mentions.filter(entry => entry['wm-target'] === url);
            
        const avatars = [... new Set(slugMentions.map(f => {
            return {
                avatar: f.author.photo,
                url: f.url,
            }
        }))];

        const uniqueAvatars = Array.from(new Set(avatars.map(s => s.avatar)))
            .map(avatar => {
                return {
                    avatar: avatar,
                    url: avatars.find(s => s.avatar === avatar).url
                }
            })

        displayedAvatars = uniqueAvatars.slice(0, parseInt(displayQuantity));

        remainingAvatars = (uniqueAvatars.length - displayedAvatars.length);
    }

    filterMentions();

    useEffect(() => {
        if (mentions.length === 0) {
            fetch(
                '/.netlify/functions/mentions'
                ).then((response) => {
                    response.json()
                        .then((json) => {
                            const mentions = json;
                            setMentions(mentions);
                        })
                    .catch((ex) => console.log(ex));
                })
            .catch((ex) => console.log(ex));
        } 
    }, []);

	return (
		displayedAvatars.length > 0 && (
            <div className="webmentions">
                <p class="small likes" >
                    <span class="svg-icon">
                        <svg class="fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 25.3-19.5 46-44.3 47.9c7.7 8.5 12.3 19.8 12.3 32.1c0 23.4-16.8 42.9-38.9 47.1c4.4 7.2 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/>
                        </svg>
                    </span>
                    Likes, retweets, & replies</p>
                <div class="avatars">
    
                    {
                        displayedAvatars.map((avatar: any) => 
                            <div class="avatar">
                                {
                                    displayLink && 
                                    <a href={avatar.url} target="_blank">
                                        <img src={avatar.avatar} />
                                    </a>
                                }

                                {
                                    !displayLink && 
                                    <img src={avatar.avatar} />
                                }
                                
                            </div>
                        )
                    }

                    {
                        remainingAvatars > 0 &&
                            <div class="extra">
                                <span>+{remainingAvatars}</span>
                            </div>
                    }
                </div>
            </div>
		)
	);
}

export default WebMentions;
