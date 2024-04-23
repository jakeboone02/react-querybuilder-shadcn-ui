import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "./multiselect";
import { toSelectOptions } from "./utils";

export const ShadcnUiValueSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
  disabled,
  // Props that should not be in extraProps
  testID: _testID,
  rule: _rule,
  rules: _rules,
  level: _level,
  path: _path,
  context: _context,
  validation: _validation,
  operator: _operator,
  field: _field,
  fieldData: _fieldData,
  multiple: _multiple,
  listsAsArrays: _listsAsArrays,
  schema: _schema,
  ...extraProps
}) => {
  console.log(_listsAsArrays, toSelectOptions(options));
  return _multiple ? (
    <MultiSelect
      className={className}
      options={options}
      value={value}
      onValueChange={handleOnChange}
    />
  ) : (
    <Select
      className={className}
      value={value}
      disabled={disabled}
      onValueChange={handleOnChange}
      {...extraProps}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>{toSelectOptions(options)}</SelectContent>
    </Select>
  );
};

ShadcnUiValueSelector.displayName = "ShadcnUiValueSelector";
