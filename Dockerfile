FROM node:14 as build

ARG BUILDVERSION=0.0.0
ARG GOOGLE_ANALYTICS_ID=TEST
ARG CLOUDINARY_CLOUD_NAME=TEST
ARG CLOUDINARY_API_SECRET=TEST
ARG CLOUDINARY_API_KEY=TEST

ENV GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY


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
