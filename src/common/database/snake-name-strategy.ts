import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'
import * as pluralize from 'pluralize'

export default class SnakeNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  public tableName(className: string, customName: string): string {
    const snakeName = snakeCase(className)
    return customName ? customName : pluralize(snakeName)
  }

  public columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName)
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }

  public joinColumnName(
    relationName: string,
    referencedColumnName: string
  ): string {
    const defaultValue = super.joinColumnName(
      relationName,
      referencedColumnName
    )
    return snakeCase(defaultValue)
  }
}
