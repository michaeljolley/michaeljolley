// import { Context } from "https://edge.netlify.com";
// import qs from "querystring";
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// export default async (request, context) => {

//   console.log("Check streaming status");

//   const response = await context.next();
//   const page = await response.text();

//   // Search for the placeholder
//   const regex = /<!-- TWITCH_STATUS -->/i;

//   // Replace the content
//   let twitchEmbed = "";

//   const isLive = await isLiveOnTwitch();
//   if (!isLive) {
//     twitchEmbed = `<div class="twitchEmbed">
//       <iframe
//         src="https://player.twitch.tv/?channel=baldbeardedbuilder&parent=baldbeardedbuilder.com&autoplay=true"
//         scrolling="no" allow="autoplay" allowfullscreen="false">
//       </iframe>
//     </div>`;
//   }

//   const updatedPage = page.replace(regex, twitchEmbed);
//   return new Response(updatedPage, response);
// };

// const isLiveOnTwitch = async () => {
//   const opts = {
//     client_id: process.env.TWITCH_CLIENT_ID,
//     client_secret: process.env.TWITCH_CLIENT_SECRET,
//     grant_type: 'client_credentials',
//     scopes: '',
//   }
//   const params = qs.stringify(opts)

//   const { data } = await axios.post(
//     `https://id.twitch.tv/oauth2/token?${params}`
//   )

//   const {
//     data: { data: streams },
//   } = await axios.get(
//     `https://api.twitch.tv/helix/streams?user_login=baldbeardedbuilder`,
//     {
//       headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         Authorization: `Bearer ${data.access_token}`,
//       },
//     }
//   )

//   return !!streams.length
// }