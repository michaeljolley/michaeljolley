FROM node:14 as build

ARG BUILDVERSION=0.0.0

ARG ARG_CLOUDINARY_CLOUD_NAME
ARG ARG_CLOUDINARY_API_SECRET
ARG ARG_CLOUDINARY_API_KEY
ARG ARG_TWITCH_CLIENT_ID
ARG ARG_TWITCH_CLIENT_SECRET
ARG ARG_TWITCH_CHANNEL_ID

ENV CLOUDINARY_CLOUD_NAME=$ARG_CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_SECRET=$ARG_CLOUDINARY_API_SECRET
ENV CLOUDINARY_API_KEY=$ARG_CLOUDINARY_API_KEY
ENV TWITCH_CLIENT_ID=$ARG_TWITCH_CLIENT_ID
ENV TWITCH_CLIENT_SECRET=$ARG_TWITCH_CLIENT_SECRET
ENV TWITCH_CHANNEL_ID=$ARG_TWITCH_CHANNEL_ID

RUN echo ${CLOUDINARY_CLOUD_NAME}

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install depdenencies
RUN npm i --silent

# Copy the rest of the files
COPY ./ .

# Update the build version and build the application
# RUN npm version $BUILDVERSION --allow-same-version
RUN npm run build

# Put together the release image with the just build artifacts
FROM node:14

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install production-only dependencies
RUN npm i --silent --only=production

# Copy built project
COPY --from=build /app/dist ./

EXPOSE 80

CMD [ "node", "index.js" ]
