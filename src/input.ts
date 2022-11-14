import {getInput} from '@actions/core'

export class Input {
  get excludes(): string[] {
    const input = getInput('excludes')
    return input === '' ? [] : input.split(',')
  }

  get path(): string {
    return getInput('path')
  }
}
