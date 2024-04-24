Docker:
 - build an image:
 - docker build -t <foldername> .

 - run the image
 - docker run -p <portNum>:<portNum> -v "$(pwd):/app" -v /app/node_modules <foldername>
