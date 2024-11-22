import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullModule } from "@nestjs/bull";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { join } from "path";
import { CommentsModule } from "./comments/comments.module";
import { dataSourceOptions } from "../db/data-source";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "db/uploads"),
      serveRoot: "/app/dist/db/uploads",
    }),
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379,
      },
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    CommentsModule,
    FilesModule,
  ],
})
export class AppModule {}
