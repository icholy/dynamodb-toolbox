import type { $AnyAttribute } from '../any/index.js'
import type { $AnyOfAttribute } from '../anyOf/index.js'
import type { $BinaryAttribute } from '../binary/index.js'
import type { $ListAttribute } from '../list/index.js'
import type { $MapAttribute } from '../map/index.js'
import type { $NumberAttribute } from '../number/index.js'
import type { $PrimitiveAttribute } from '../primitive/index.js'
import type { $RecordAttribute } from '../record/index.js'
import type { $SetAttribute } from '../set/index.js'
import type { $StringAttribute } from '../string/index.js'

/**
 * Any warm attribute
 */
export type $Attribute =
  | $AnyAttribute
  | $NumberAttribute
  | $StringAttribute
  | $BinaryAttribute
  | $PrimitiveAttribute
  | $SetAttribute
  | $ListAttribute
  | $MapAttribute
  | $RecordAttribute
  | $AnyOfAttribute

/**
 * Any warm schema attributes
 */
export interface $SchemaAttributes {
  [key: string]: $Attribute
}
