import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
import { BaseEmbeddings } from '@cherrystudio/embedjs-interfaces'

interface BedrockEmbeddingsConfig {
  modelId: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

export class BedrockEmbeddings extends BaseEmbeddings {
  private client: BedrockRuntimeClient
  private modelId: string

  constructor(config: BedrockEmbeddingsConfig) {
    super()
    this.modelId = config.modelId
    this.client = new BedrockRuntimeClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      }
    })
  }

  async getDimensions(): Promise<number> {
    const embedding = await this.embedQuery('test')
    return embedding.length
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = []
    for (const text of texts) {
      const embedding = await this.embedQuery(text)
      embeddings.push(embedding)
    }
    return embeddings
  }

  async embedQuery(text: string): Promise<number[]> {
    let requestBody: any
    if (this.modelId.startsWith('cohere.embed')) {
      requestBody = {
        texts: [text],
        input_type: 'search_document',
        embedding_types: ['float']
      }
    } else {
      // Amazon Titan
      requestBody = { inputText: text }
    }

    const command = new InvokeModelCommand({
      modelId: this.modelId,
      body: JSON.stringify(requestBody),
      contentType: 'application/json',
      accept: 'application/json'
    })

    const response = await this.client.send(command)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))

    if (this.modelId.startsWith('cohere.embed')) {
      return responseBody.embeddings?.float?.[0] || responseBody.embeddings?.[0]?.values || []
    }
    return responseBody.embedding || []
  }
}
