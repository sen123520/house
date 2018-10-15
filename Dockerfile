FROM registry.fangyou.com/basis/alpine-rewrite-nginx:1.12.1

MAINTAINER Leon liufengnian@ehousechina.com

COPY dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]