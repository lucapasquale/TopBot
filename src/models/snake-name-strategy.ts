import { NamingStrategyInterface, DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import * as pluralize from 'pluralize';

export default class SnakeNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    const snakeName = snakeCase(className);
    return customName ? customName : pluralize(snakeName);
  }

  columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName);
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    const defaultValue = super.joinColumnName(
      relationName,
      referencedColumnName
    );
    return snakeCase(defaultValue);
  }
}
