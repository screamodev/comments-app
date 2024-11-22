import 'dotenv/config';
import {DataSource, DataSourceOptions} from "typeorm";
import {Comment} from "../src/comments/entities/comment.entity";
import {File} from "../src/files/entities/file.entity";
import {User} from "../src/users/entities/user.entity";


export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host:  process.env.POSTGRES_HOST || "localhost",
    port: +process.env.POSTGRES_PORT || 5433,
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB}`,
    entities: [Comment, User, File],
    migrations: ['dist/db/migrations/*.js'],
    logging: true
}

const AppDataSource = new DataSource(dataSourceOptions)

export default AppDataSource;