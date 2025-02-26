FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

EXPOSE 8080

# Bundle app source	
COPY server.js .    

CMD [ "node", "server.js" ]

# sudo usermod -aG docker $USER
# kubectl config current-context // kubectl config use-context minikube // minikube start/status/delete
# eval $(minikube docker-env)
# sudo docker build -f Dockerfile -t carrental:1.0 . (build image) // kubectl rollout restart deployment carrental
# sudo docker images # 
# sudo kubectl get nodes/pods # kubectl desribe pod carrental-id
# kubectl create deployment carrental --image=carrental:1.0 --port=8080 --replicas=2 // kubectl rollout restart deployment carrental // kubectl delete deployment carrental
# kubectl get deployments/pods
# kubectl scale deployment carrental --replicas=4 (si necesitamos escalar)
# kubectl expose deployment carrental --type=NodePort --port=8080 
# kubectl describe service carrental && kubectl get svc
# curl $(minikube ip):TCP/rentals #kubectl logs carrental-78455fbb67-m48zw
# curl -X POST -H "Content-Type: application/json" -d '{"sub_model_vehicle": "Hybrid", "num_vehicles": "1", "descompte": "10","dies_lloguer": "2"}' $(minikube ip):31561/new

# 3.2 ------------------------------------

# minikube addons list
# minikube addons enable dashboard
# minikube dashboard

# 3.3 ------------------------------------

# kubectl get deployment carrental -o=yaml > carrentaldeployment.yaml
# kubectl delete deployment carrental
# kubectl apply -f carrentaldeployment.yaml

# kubectl get deployments
# kubectl get pods

# kubectl get service carrental -o=yaml > carrentalservice.yaml
# kubectl delete service carrental
# kubectl apply -f carrentalservice.yaml

# minikube service carrental --url


# -------------------------------------------------------------------------
# sudo docker run --name carrental -d -p 8000:8000 carrental (run container)
# sudo docker exec -it carrental /bin/bash (enter to the container

# sudo docker ps -a (list all containers)
# sudo docker stop container-name
# sudo docker rm container-name   

# sudo docker images (list all images)
# sudo docker rmi (-f) image-name
# sudo docker logs carrental

# Prueba básica para ver si el servidor responde
# curl http://localhost:8080

# Prueba para obtener la lista de rentals
# curl http://localhost:8000/rentals

# Prueba para añadir un nuevo rental
# curl "http://localhost:8000/new?sub_model_vehicle=Hybrid&num_vehicles=1&descompte=10&dies_lloguer=2"
# curl "http://localhost:8000/new?sub_model_vehicle=Hybrid&num_vehicles=1&descompte=10&dies_lloguer=2"