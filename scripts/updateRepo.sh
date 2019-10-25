 #!/usr/bin/env bash

LC_PROJECT_NAME=lud
FILE_TO_SEND={${PWD}/../build,${PWD}/../server,${PWD}/../package*,${PWD}/../Dockerfile,${PWD}/../docker-composer.yml}
ssh -tt -o StrictHostKeyChecking=no suilabs@suilabs.com <<< "mkdir -p Projects/${LC_PROJECT_NAME}; exit" && \
rsync -rpulz --verbose ${FILE_TO_SEND} suilabs@suilabs.com:./Projects/${LC_PROJECT_NAME}/. && \
ssh -tt -o SendEnv=PROJECT_NAME -o StrictHostKeyChecking=no suilabs@suilabs.com <<< "
cd Projects/${LC_PROJECT_NAME}
docker-compose up -d --build;
exit"
