import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentsService} from "./services/comments.service";
import {CommentsController} from "./controllers/comments.controller";
import {Comment} from "./entities/comment.entity";
import {FileService} from "../files/services/file.service";
import {FilesModule} from "../files/files.module";
import {CommentsGateway} from './gateways/comments.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), FilesModule],
    controllers: [CommentsController],
    providers: [CommentsService, FileService, CommentsGateway],
})
export class CommentsModule {
}
