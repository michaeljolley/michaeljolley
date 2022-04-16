const fs = require('fs/promises');

async function main() {
	await fs.writeFile('.env', `
TWITCH_CLIENT_SECRET=${process.env.TWITCH_CLIENT_SECRET}
TWITCH_CLIENT_ID=${process.env.TWITCH_CLIENT_ID}
GOOGLE_ANALYTICS_ID=${process.env.GOOGLE_ANALYTICS_ID}
CLOUDINARY_CLOUD_NAME=${process.env.CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_SECRET=${process.env.CLOUDINARY_API_SECRET}
CLOUDINARY_API_KEY=${process.env.CLOUDINARY_API_KEY})
}`);
}

main();
