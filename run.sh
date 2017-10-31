docker build -t docker.int.bluelabs.io/bluelabsio/shiny-auth0 .
docker run --rm -p 3000:3000 --name shiny-auth0 docker.int.bluelabs.io/bluelabsio/shiny-auth0