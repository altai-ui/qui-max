import { computed, ComputedRef, Ref } from 'vue'

interface ComputeDisabled {
  componentDisabled: boolean,
  formDisabled: boolean,
}

const computeDisabled = ({ componentDisabled, formDisabled }: ComputeDisabled): ComputedRef => computed(() => componentDisabled || (formDisabled ?? false));
const computeSymbolLimitVisibility = (
  { showSymbolLimit, passwordSwitch }: { showSymbolLimit: boolean, passwordSwitch: boolean },
  { maxlength, readonly }: { maxlength: unknown, readonly: unknown }, isDisabled: Ref): ComputedRef =>
    computed(() => (
      showSymbolLimit &&
      maxlength &&
      !isDisabled.value &&
      !readonly &&
      !passwordSwitch
    ));

export { computeDisabled, computeSymbolLimitVisibility };