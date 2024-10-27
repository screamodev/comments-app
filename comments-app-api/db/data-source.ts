import 'dotenv/config';
import {DataSource, DataSourceOptions} from "typeorm";
import {User} from "../src/users/entities/user.entity";
import {Comment} from "../src/comments/entities/comment.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host:  process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.POSTGRES_DB}`,
    entities: [User, Comment],
    migrations: ['dist/db/migrations/*.js'],
    logging: true
}

const AppDataSource = new DataSource(dataSourceOptions)

export default AppDataSource;