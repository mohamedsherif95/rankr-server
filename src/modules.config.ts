import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from "./redis.module";

export const redisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisModule');

    return {
      connectionOptions: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        username: configService.get('REDIS_USERNAME'),
        password: configService.get('REDIS_PASSWORD'),
      },
      onClientReady: (client) => {
        logger.log('redis client ready')

        client.on('error', (err) => {
          logger.error('redis client error', err)
        });

        client.on('connect', () => {
          logger.log(`connected to redis on ${client.options.host}:${client.options.port}`)
        })
      }
    }
  },
  inject: [ConfigService]
})