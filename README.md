# Build image

```sh
docker build -t jaakkytt/7day-to-die-time-bot:latest .
```

```sh
docker push jaakkytt/7day-to-die-time-bot:latest
```

# Example usage via compose

```
services:
  game:
    container_name: 7d2d
    image: didstopia/7dtd-server:latest
    restart: unless-stopped
    ports:
      - "26900:26900/tcp"
      - "26900:26900/udp"
      - "26901:26901/udp"
      - "26902:26902/udp"
    volumes:
      - ./game:/steamcmd/7dtd
      - ./data:/app/.local/share/7DaysToDie
    environment:
      - SEVEN_DAYS_TO_DIE_UPDATE_CHECKING=0
      - SEVEN_DAYS_TO_DIE_BRANCH=public
      - SEVEN_DAYS_TO_DIE_TELNET_PORT=8081
      - SEVEN_DAYS_TO_DIE_TELNET_PASSWORD=
  bot:
    container_name: time-bot
    image: jaakkytt/7day-to-die-time-bot:latest
    restart: unless-stopped
    depends_on:
      - game
    environment:
      - DISCORD_TOKEN=
      - DISCORD_LOGIN_TIMEOUT=60000
      - DISCORD_UPDATE_INTERVAL=20000
      - TELNET_HOST=game
      - TELNET_PORT=8081
      - TELNET_PASSWORD=
```
