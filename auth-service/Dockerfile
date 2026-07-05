FROM quay.io/wildfly/wildfly:34.0.1.Final-jdk17

USER root
RUN curl -L https://jdbc.postgresql.org/download/postgresql-42.7.7.jar -o /opt/jboss/wildfly/standalone/deployments/postgresql-42.7.7.jar
USER jboss

COPY web4ds-ds.xml /opt/jboss/wildfly/standalone/deployments/auth-ds.xml

COPY build/libs/*.war /opt/jboss/wildfly/standalone/deployments/auth-service.war

EXPOSE 8080