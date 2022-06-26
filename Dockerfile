FROM bitnami/nginx
COPY docker/nginx-vhost.conf /opt/bitnami/nginx/conf/server_blocks/

COPY build/ /app/

EXPOSE 8080

HEALTHCHECK --interval=5s --timeout=1s \
  CMD curl -f http://localhost:8080 || exit 1