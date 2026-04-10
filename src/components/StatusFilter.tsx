import {Checkbox} from "./ui/checkbox";
import {Field, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "./ui/field";

interface StatusFilterProps {
  unMember: boolean;
  independent: boolean;
  onToggleUnMember: () => void;
  onToggleIndependent: () => void;
}

export function StatusFilter({unMember, independent, onToggleUnMember, onToggleIndependent}: StatusFilterProps) {
  return (
    <FieldSet>
      <FieldLegend variant="label">Status</FieldLegend>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-hard-disks-ljj-checkbox"
            name="finder-pref-9k2-hard-disks-ljj-checkbox"
            checked={unMember}
            onCheckedChange={onToggleUnMember}
          />
          <FieldLabel htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox" className="font-normal">
            Member of the United Nations
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-external-disks-1yg-checkbox"
            name="finder-pref-9k2-external-disks-1yg-checkbox"
            checked={independent}
            onCheckedChange={onToggleIndependent}
          />
          <FieldLabel htmlFor="finder-pref-9k2-external-disks-1yg-checkbox" className="font-normal">
            Independent
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
