FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source	
COPY server-rental-car.js .    

CMD [ "node", "server-rental-car.js" ]

# sudo usermod -aG docker $USER
# sudo docker build -f Dockerfile -t carrental . (build image)
# sudo docker run --name carrental -d -p 8000:8000 carrental (run container)
# sudo docker exec -it carrental /bin/bash (enter to the container)

# sudo docker ps -a (list all containers)
# sudo docker stop container-name
# sudo docker rm container-name   

# sudo docker images (list all images)
# sudo docker rmi image-name
# sudo docker logs carrental

# Prueba básica para ver si el servidor responde
# curl http://localhost:8080

# Prueba para obtener la lista de rentals
# curl http://localhost:8000/rentals

# Prueba para añadir un nuevo rental
# curl "http://localhost:8000/new?sub_model_vehicle=Hybrid&num_vehicles=1&descompte=10&dies_lloguer=2"
# curl "http://localhost:8000/new?sub_model_vehicle=Hybrid&num_vehicles=1&descompte=10&dies_lloguer=2"