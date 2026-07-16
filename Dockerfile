FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install --no-install-recommends -y libpq5 \
    && rm -rf /var/lib/apt/lists/*

COPY . /tmp/build-context

RUN if [ -f /tmp/build-context/requirements.txt ]; then \
        cp /tmp/build-context/requirements.txt /app/requirements.txt; \
    elif [ -f /tmp/build-context/backend/requirements.txt ]; then \
        cp /tmp/build-context/backend/requirements.txt /app/requirements.txt; \
    fi && \
    if [ -d /tmp/build-context/backend ]; then \
        cp -r /tmp/build-context/backend/. /app/; \
    else \
        cp -r /tmp/build-context/. /app/; \
    fi && \
    rm -rf /tmp/build-context

RUN pip install --no-cache-dir -r requirements.txt && chmod +x /app/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
