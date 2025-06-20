# Instructions for installation in WSL 2

```
https://www.linkedin.com/posts/%F0%9F%8E%97%EF%B8%8Fyuval-avidani-87081474_%D7%A8%D7%92%D7%A2-%D7%9E%D7%9B%D7%95%D7%A0%D7%9F-%D7%99%D7%A6%D7%A8%D7%AA%D7%99-boilerplate-%D7%97%D7%93%D7%A9-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-ugcPost-7329875391228067840-w5-2?utm_source=share&utm_medium=member_ios&rcm=ACoAABATxdUBfHGmS6TyiBt6O1P5vO7Xo2mzXyI
```

```
sudo apt install docker.io
sudo apt install docker-compose
```

```
nvm install 20
nvm use 20
npm run dev
npm install -g next
```


```
npm run dev
```

## Pull the image
```
gh auth login -s read:packages
echo $(gh auth token) | docker login ghcr.io -u yanivpaz --password-stdin
docker pull ghcr.io/yanivpaz/tenants-manager:main
```

## Run 
```
docker-compose --env-file ./.env.local up --build
docker-compose --env-file ./.env.local up -d
```

## Cleanup
```
docker rmi -f $(docker images -q)
```


## View MongDB
```
docker run -d --name mongo-express -p 8081:8081 --network tenants-manager_app-network -e ME_CONFIG_MONGODB_SERVER=mongodb -e ME_CONFIG_MONGODB_URL=mongodb://mongodb:27017/ -e ME_CONFIG_MONGODB_ENABLE_ADMIN=true -e ME_CONFIG_BASICAUTH_USERNAME=admin -e ME_CONFIG_BASICAUTH_PASSWORD=pass mongo-express
```