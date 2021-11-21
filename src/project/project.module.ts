import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { Project } from './project.model';
import { AccountModule } from 'src/account/account.module';
import { ReportService } from './report.service';

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([Project])],
  providers: [ProjectService, ProjectResolver, ReportService],
})
export class ProjectModule {}
