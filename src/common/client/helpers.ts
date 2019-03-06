import * as fs from 'fs'
import * as path from 'path'
import { Command } from '../../types'

export function getAllCommands(commandsPath: string): Command[] {
  const cmds = [] as string[]

  fs.readdirSync(commandsPath).forEach(folder => {
    if (hasHandler(commandsPath, folder)) {
      cmds.push(folder)
      return
    }

    const folderPath = path.join(commandsPath, folder)
    fs.readdirSync(folderPath).forEach(subFolder => {
      if (hasHandler(folderPath, subFolder)) {
        cmds.push(path.join(folder, subFolder))
      }
    })
  })

  return cmds.map(job => {
    const definition = module.require(path.join(commandsPath, job)).default
    return definition
  })
}

function hasHandler(basePath: string, folderName: string): boolean {
  return ['js', 'ts'].some(fileType => {
    const filePath = path.join(basePath, folderName, `handler.${fileType}`)
    return fs.existsSync(filePath)
  })
}
