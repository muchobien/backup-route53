import {
  setFailed,
  setOutput,
  debug,
  startGroup,
  endGroup,
  info
} from '@actions/core'
import {writeFile, mkdir} from 'fs/promises'
import {Input} from './input'

export class Output {
  input: Input

  private constructor(input: Input) {
    this.input = input
  }

  static async build(input: Input): Promise<Output> {
    startGroup('Creating backup directory')
    await mkdir(input.path, {recursive: true})
    info(`Backup directory created: ${input.path}`)
    endGroup()

    return new Output(input)
  }

  debug = debug
  endGroup = endGroup
  startGroup = startGroup

  static failed(message: string | Error): void {
    setFailed(message)
  }

  set(key: string, value: unknown): void {
    setOutput(key, value)
  }

  async saveToPath(name: string, value: unknown): Promise<void> {
    await writeFile(
      `${this.input.path}/${name}`,
      JSON.stringify(value, null, 2)
    )
  }
}
