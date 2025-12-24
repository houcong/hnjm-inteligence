import type { BaseEmbeddings } from '@cherrystudio/embedjs-interfaces'
import { OllamaEmbeddings } from '@cherrystudio/embedjs-ollama'
import { OpenAiEmbeddings } from '@cherrystudio/embedjs-openai'
import type { ApiClient } from '@types'
import { net } from 'electron'

import { BedrockEmbeddings } from './BedrockEmbeddings'
import { VoyageEmbeddings } from './VoyageEmbeddings'

export default class EmbeddingsFactory {
  static create({ embedApiClient, dimensions }: { embedApiClient: ApiClient; dimensions?: number }): BaseEmbeddings {
    const batchSize = 10
    const { model, provider, apiKey, baseURL } = embedApiClient
    if (provider === 'voyageai') {
      return new VoyageEmbeddings({
        modelName: model,
        apiKey,
        outputDimension: dimensions,
        batchSize: 8
      })
    }
    if (provider === 'ollama') {
      return new OllamaEmbeddings({
        model: model,
        baseUrl: baseURL.replace(/\/api$/, ''),
        requestOptions: {
          // @ts-ignore expected
          'encoding-format': 'float'
        }
      })
    }
    if (provider === 'aws-bedrock') {
      // apiKey format: accessKeyId:secretAccessKey
      // baseURL format: region (e.g., us-east-1)
      const [accessKeyId, secretAccessKey] = apiKey.split(':')
      return new BedrockEmbeddings({
        modelId: model,
        region: baseURL || 'us-east-1',
        accessKeyId,
        secretAccessKey
      })
    }
    // NOTE: Azure OpenAI 也走 OpenAIEmbeddings, baseURL是https://xxxx.openai.azure.com/openai/v1
    return new OpenAiEmbeddings({
      model,
      apiKey,
      dimensions,
      batchSize,
      configuration: { baseURL, fetch: net.fetch as typeof fetch }
    })
  }
}
