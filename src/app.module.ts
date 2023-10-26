import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact/entities/contact.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://root:example@localhost/contactsDb',
      entities: [Contact],
      synchronize: true,
      logger: 'debug',
    }),
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
