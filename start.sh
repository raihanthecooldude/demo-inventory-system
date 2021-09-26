docker ps -a | egrep 'inventory_server' | awk '{print $1}'| xargs docker kill
docker ps -a | egrep 'inventory_server' | awk '{print $1}'| xargs docker rm

docker run --restart=always -d --name inventory_server -p 3000:3000 \
    -e NODE_ENV="development" \
    -v $(pwd)/config:/usr/src/app/config \
    -v $(pwd)/src:/usr/src/app/src \
    -v $(pwd)/test:/usr/src/app/test \
    -v $(pwd)/uploads:/usr/src/app/uploads \
    -v $(pwd)/.eslintrc.js:/usr/src/app/.eslintrc.js \
    -v $(pwd)/.prettierrc:/usr/src/app/.prettierrc \
    -v $(pwd)/nest-cli.json:/usr/src/app/nest-cli \
    -v $(pwd)/tsconfig.build.json:/usr/src/app/tsconfig.build.json \
    -v $(pwd)/tsconfig.json:/usr/src/app/tsconfig.json \
inventory/server:latest