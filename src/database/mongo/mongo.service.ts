import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';

@Injectable()
export class MongoService {
    readonly className = `MongoService`;

    constructor( readonly loggerService : LoggerService) {}

    async create(model){
        const methodName = `create`;
        this.loggerService.log('Saving the data in database', this.className, methodName);
        const result = await model.save();
        return result
    };

    async findOne(model, filter){
        const methodName = `findOne`;
        this.loggerService.log('Fetching the data form Databse', this.className, methodName);
        const result = await model.findOne(filter);
        return result;
    };

    async findOneAndUpdate(model, filter, update){
        const methodName = `findOneAndUpdate`;
        this.loggerService.log('findOne and updating in the database', this.className,methodName);
        const result = await model.findOneAndUpdate(filter, update, { new: true })
        return result;
    };

    async findAll(model){
        const methodName = `findAll`;
        this.loggerService.log(`fetching all the information from database`, this.className, methodName);
        const result = await model.find();
        return result
    };

    async count(model){
        const methodName = 'count';
        this.loggerService.log('counting the number of documents', this.className, methodName);
        const result = await model.count();
        return result
    }

    async aggregation(model, pipeline){
        const methodName = 'aggregation';
        this.loggerService.log('Perform Aggregration query', this.className, methodName);
        const result = await model.aggregate(pipeline);
        return result;
    }
}
