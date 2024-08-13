import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

import { NeuralNetworkDto } from '../../dto'

import { NeuralNetworkService } from './neural-network.service'

@ApiTags('Neural-network')
@Controller('predict')
export class NeuralNetworkController {
  private readonly neuralNetworkService: NeuralNetworkService

  constructor(neuralNetworkService: NeuralNetworkService) {
    this.neuralNetworkService = neuralNetworkService
  }

  @UseGuards(AuthGuard('api-key'))
  @Post()
  predict(@Body() log: NeuralNetworkDto) {
    return this.neuralNetworkService.predict(log)
  }
}
