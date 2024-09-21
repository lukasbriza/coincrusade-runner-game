import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { NeuralNetworkDto } from '../../dto'

import { NeuralNetworkService } from './neural-network.service'
import { NeuralNetworkResponse } from './types'

@ApiTags('Neural-network')
@Controller('predict')
export class NeuralNetworkController {
  private readonly neuralNetworkService: NeuralNetworkService

  constructor(neuralNetworkService: NeuralNetworkService) {
    this.neuralNetworkService = neuralNetworkService
  }

  @ApiResponse({ status: 201, type: NeuralNetworkResponse })
  @UseGuards(AuthGuard('api-key'))
  @Post()
  async predict(@Body() log: NeuralNetworkDto): Promise<NeuralNetworkResponse> {
    return this.neuralNetworkService.predict(log)
  }
}
