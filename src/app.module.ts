import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './Controllers/candidates/entities/candidate.entity';
import { Vote } from './Controllers/votes/entities/vote.entity';
import { CandidatesModule } from './Controllers/candidates/candidates.module';
import { VotesModule } from './Controllers/votes/votes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    VotesModule,
    CandidatesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.102.106',
      port: 3306,
      username: 'root',
      password: 'jks@admin',
      database: 'mpcsurveydb',
      entities: [Candidate, Vote],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
