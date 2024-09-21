import type {
  BinaryAttribute,
  NumberAttribute,
  PrimitiveAttribute,
  ResolveBinaryAttribute,
  ResolveNumberAttribute,
  ResolvePrimitiveAttribute,
  ResolveStringAttribute,
  ResolvedBinaryAttribute,
  ResolvedNumberAttribute,
  ResolvedPrimitiveAttribute,
  ResolvedStringAttribute,
  StringAttribute,
  Transformer
} from '~/attributes/index.js'
import { DynamoDBToolboxError } from '~/errors/index.js'
import type { If } from '~/types/index.js'
import { validatorsByPrimitiveType } from '~/utils/validation/validatorsByPrimitiveType.js'

import type { MustBeDefined } from './attribute.js'

export type PrimitiveAttrV2FormattedValue<
  ATTRIBUTE extends PrimitiveAttribute | NumberAttribute | StringAttribute | BinaryAttribute
> = PrimitiveAttribute | NumberAttribute | StringAttribute | BinaryAttribute extends ATTRIBUTE
  ?
      | ResolvedPrimitiveAttribute
      | ResolvedNumberAttribute
      | ResolvedStringAttribute
      | ResolvedBinaryAttribute
  :
      | If<MustBeDefined<ATTRIBUTE>, never, undefined>
      | (ATTRIBUTE extends PrimitiveAttribute
          ? ResolvePrimitiveAttribute<ATTRIBUTE>
          : ATTRIBUTE extends NumberAttribute
            ? ResolveNumberAttribute<ATTRIBUTE>
            : ATTRIBUTE extends StringAttribute
              ? ResolveStringAttribute<ATTRIBUTE>
              : ATTRIBUTE extends BinaryAttribute
                ? ResolveBinaryAttribute<ATTRIBUTE>
                : never)

type PrimitiveAttrRawValueFormatter = <
  ATTRIBUTE extends PrimitiveAttribute | NumberAttribute | StringAttribute | BinaryAttribute
>(
  attribute: ATTRIBUTE,
  rawValue: unknown
) => PrimitiveAttrV2FormattedValue<ATTRIBUTE>

export const formatPrimitiveAttrRawValue: PrimitiveAttrRawValueFormatter = <
  ATTRIBUTE extends PrimitiveAttribute | NumberAttribute | StringAttribute | BinaryAttribute
>(
  attribute: ATTRIBUTE,
  rawValue: unknown
) => {
  type Formatted = PrimitiveAttrV2FormattedValue<ATTRIBUTE>

  const validator = validatorsByPrimitiveType[attribute.type]
  if (!validator(rawValue)) {
    const { path, type } = attribute

    throw new DynamoDBToolboxError('formatter.invalidAttribute', {
      message: `Invalid attribute detected while formatting${
        path !== undefined ? `: '${path}'` : ''
      }. Should be a ${type}.`,
      path,
      payload: {
        received: rawValue,
        expected: type
      }
    })
  }

  const rawPrimitive = rawValue
  const transformer = attribute.transform as Transformer
  const formattedValue = transformer !== undefined ? transformer.format(rawPrimitive) : rawPrimitive

  if (attribute.enum !== undefined && !(attribute.enum as unknown[]).includes(formattedValue)) {
    const { path } = attribute

    throw new DynamoDBToolboxError('formatter.invalidAttribute', {
      message: `Invalid attribute detected while formatting${
        path !== undefined ? `: '${path}'` : ''
      }. Should be one of: ${attribute.enum.map(String).join(', ')}.`,
      path,
      payload: { received: formattedValue, expected: attribute.enum }
    })
  }

  return formattedValue as Formatted
}
