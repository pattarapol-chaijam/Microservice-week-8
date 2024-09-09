import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('math')
export class MathController {
  private logger = new Logger('MathController');
  constructor(private readonly mathservice: MathService) {}
  @Post('sum')
  sum(@Body('numbers') numbers: number[]): number {
    this.logger.log('sum ' + numbers);
    return this.mathservice.accumulate(numbers);
  }

  @MessagePattern({ cmd: 'sum' })
  sum2(numbers: number[]): number {
    this.logger.log('sum2 ' + numbers);
    return this.mathservice.accumulate(numbers);
  }
}
