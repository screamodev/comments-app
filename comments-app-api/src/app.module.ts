import { Module } from "@nestjs/common";
import { CommentsModule } from "./comments/comments.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../db/data-source";
import { ConfigModule } from "@nestjs/config";
import {FilesModule} from "./files/files.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CommentsModule,
    UsersModule,
    FilesModule
  ]
})
export class AppModule {}
