import type { $AnyAttributeState, FreezeAnyAttribute } from './any/index.js'
import type { $AnyOfAttributeState, FreezeAnyOfAttribute } from './anyOf/index.js'
import type { $BinaryAttributeState, FreezeBinaryAttribute } from './binary/index.js'
import type { $ListAttributeState, FreezeListAttribute } from './list/index.js'
import type { $MapAttributeState, FreezeMapAttribute } from './map/index.js'
import type { $NumberAttributeState, FreezeNumberAttribute } from './number/index.js'
import type { $PrimitiveAttributeState, FreezePrimitiveAttribute } from './primitive/index.js'
import type { $RecordAttributeState, FreezeRecordAttribute } from './record/index.js'
import type { $SetAttributeState, FreezeSetAttribute } from './set/index.js'
import type { $StringAttributeState, FreezeStringAttribute } from './string/index.js'
import type { $AttributeState } from './types/index.js'

export type FreezeAttribute<$ATTRIBUTE extends $AttributeState> =
  $ATTRIBUTE extends $AnyAttributeState
    ? FreezeAnyAttribute<$ATTRIBUTE>
    : $ATTRIBUTE extends $NumberAttributeState
      ? FreezeNumberAttribute<$ATTRIBUTE>
      : $ATTRIBUTE extends $StringAttributeState
        ? FreezeStringAttribute<$ATTRIBUTE>
        : $ATTRIBUTE extends $BinaryAttributeState
          ? FreezeBinaryAttribute<$ATTRIBUTE>
          : $ATTRIBUTE extends $PrimitiveAttributeState
            ? FreezePrimitiveAttribute<$ATTRIBUTE>
            : $ATTRIBUTE extends $SetAttributeState
              ? FreezeSetAttribute<$ATTRIBUTE>
              : $ATTRIBUTE extends $ListAttributeState
                ? FreezeListAttribute<$ATTRIBUTE>
                : $ATTRIBUTE extends $MapAttributeState
                  ? FreezeMapAttribute<$ATTRIBUTE>
                  : $ATTRIBUTE extends $RecordAttributeState
                    ? FreezeRecordAttribute<$ATTRIBUTE>
                    : $ATTRIBUTE extends $AnyOfAttributeState
                      ? FreezeAnyOfAttribute<$ATTRIBUTE>
                      : never
