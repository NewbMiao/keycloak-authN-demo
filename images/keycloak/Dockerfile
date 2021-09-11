FROM jboss/keycloak:15.0.2

COPY realm-export.json /tmp/realm-export.json

ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD admin
ENV KEYCLOAK_IMPORT /tmp/realm-export.json

RUN /opt/jboss/keycloak/bin/add-user-keycloak.sh  -r myrealm -u myuser -p myuser

EXPOSE 8080