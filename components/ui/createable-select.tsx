import Select, {
  ActionMeta,
  InputActionMeta,
  MultiValueGenericProps,
  SingleValue as ReactSelectSingleValue,
  components,
  type CSSObjectWithLabel,
} from "react-select";

import Image, { StaticImageData } from "next/image";

import { cn } from "@/lib/utils/css";

import CreatableSelect from "react-select/creatable";
import CreateableAsyncSelect from "react-select/async-creatable";

export type SelectValueBase = { value: string; label: string; img?: string | StaticImageData };
export type SelectValue = Omit<SelectValueBase, 'img'>;

export type SelectProps = {
  name: string;
  placeholder: string;
  options?: SelectValueBase[];
  loadOptions?: (searchVal: string, setOptions: (options: SelectValueBase[]) => void) => void;
  handleChange: (arg: readonly SelectValue[], meta?: ActionMeta<SelectValueBase>) => void;
  handleBlur?: () => void;
  isSearchable?: boolean;
  isCreatable?: boolean;
  isAsync?: boolean;
  className?: string;
  value?: readonly SelectValueBase[];
  inputStyles?: CSSObjectWithLabel;
  controlStyles?: CSSObjectWithLabel;
  menuStyles?: CSSObjectWithLabel;
  menuListStyles?: CSSObjectWithLabel;
  optionStyles?: CSSObjectWithLabel;
  valueContainerStyles?: CSSObjectWithLabel;
  placeholderStyles?: CSSObjectWithLabel;
  singleValueStyles?: CSSObjectWithLabel;
  indicatorsContainerStyles?: CSSObjectWithLabel;
  defaultOptions?: boolean;
  isClearable?: boolean;
  menuPosition?: "absolute" | "fixed";
  menuShouldScrollIntoView?: boolean;
  onInputChange?: (inputValue: string, meta: InputActionMeta) => void;
  onCreateOption?: (inputValue: string) => void;
};

type SelectStyleProps = Pick<
  SelectProps,
  | "inputStyles"
  | "controlStyles"
  | "menuStyles"
  | "menuListStyles"
  | "optionStyles"
  | "valueContainerStyles"
  | "placeholderStyles"
  | "singleValueStyles"
  | "indicatorsContainerStyles"
>;

const MultiValueContainer = (props: MultiValueGenericProps<SelectValueBase>) => {
  return (
    <div className="w-auto">
      <components.MultiValueContainer {...props} />
    </div>
  );
};

const selectStyles = (props: SelectStyleProps) => ({
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#000',
    margin: 0,
    padding: 0,
    ...props.inputStyles,
  }),
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    borderRadius: '8px',
    borderWidth: '2px',
    border: 'none',
    boxShadow: 'none',
    fontSize: 12,
    background: '#fff',
    '&:hover': {
      borderColor: '#045C5D',
    },
    ...props.controlStyles,
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    background: '#fff',
    boxShadow: 'none',
    border: '1px solid color-mix(in oklab, var(--primary) 90%, transparent);',
    borderRadius: '0.1rem',
    ...props.menuStyles,
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: '14px',
    borderRadius: '0.1rem',
    background: '#fff',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    padding: 0,
    ...props.menuListStyles,
  }),
  option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
    ...base,
    color: '#000',
    fontSize: '12px',
    background: state.isFocused ? '#f5f5f5' : '',
    '&:active': {
      backgroundColor: '#f5f5f5',
    },
    ...props.optionStyles,
  }),
  multiValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    background: '#fff',
    color: '#000',
    border: '1px solid #dedcdc',
    borderRadius: '5px',
    justifyContent: 'space-between',
    padding: '4px 6px',
  }),
  multiValueLabel: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#000',
  }),
  multiValueRemove: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#525252',
    '&:hover': {
      backgroundColor: '#dedcdc',
      color: 'gray',
    },
  }),
  valueContainer: (styles: CSSObjectWithLabel) => ({
    ...styles,
    padding: 0,
    ...props.valueContainerStyles,
  }),
  placeholder: (styles: CSSObjectWithLabel) => ({
    ...styles,
    ...props.placeholderStyles,
  }),
  singleValue: (styles: CSSObjectWithLabel) => ({
    ...styles,
    ...props.singleValueStyles,
  }),
  indicatorSeparator: (styles: CSSObjectWithLabel) => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: (styles: CSSObjectWithLabel) => ({
    ...styles,
    ...props.indicatorsContainerStyles,
  }),
  dropdownIndicator: (styles: CSSObjectWithLabel) => ({
    ...styles,
    color: '#8f8b8b',
    '&:hover': {
      color: '#000',
    },
  }),
});

const MultiSelect = ({
  name,
  options,
  value,
  placeholder,
  handleChange,
  handleBlur,
  isSearchable = true,
  isCreatable = false,
  isAsync=false,
  defaultOptions = true,
  isClearable = true,
  ...props
}: SelectProps) => {
  const Comp = isAsync ? CreateableAsyncSelect : isCreatable ? CreatableSelect : Select;
  return (
    <Comp
      className={cn("text-capitalize px-0 ring-1 ring-neutral-300", props.className)}
      components={{ MultiValueContainer }}
      name={name}
      options={options}
      styles={selectStyles(props)}
      value={value}
      isSearchable={isSearchable}
      isClearable={isClearable}
      menuPosition={props.menuPosition}
      menuShouldScrollIntoView={props.menuShouldScrollIntoView}
      placeholder={placeholder}
      onChange={(opt, meta) => {
        handleChange(opt, meta);
      }}
      onBlur={handleBlur}
      onInputChange={props.onInputChange}
      onCreateOption={props.onCreateOption}
      formatOptionLabel={option => (
        <div className="flex items-center gap-2">
          {option.img && (
            <Image
              src={option.img}
              alt={"option-img"}
              style={{ width: "20px", borderRadius: "4px" }}
            />
          )}
          <span>{option.label}</span>
        </div>
      )}
      isMulti
      loadOptions={(inputValue, setOptions) => props.loadOptions?.(inputValue, setOptions)}
      cacheOptions={true}
      defaultOptions={defaultOptions}
    />
  );
};

type SingleSelectProps = Omit<SelectProps, 'handleChange' | 'value'> & {
  handleChange: (
    arg: ReactSelectSingleValue<SelectValueBase>,
    meta?: ActionMeta<SelectValueBase>,
  ) => void;
  value?: SelectValueBase | null;
};

const SingleSelect = ({
  name,
  options,
  value,
  placeholder,
  handleChange,
  handleBlur,
  isSearchable = true,
  isCreatable = false,
  isAsync = false,
  defaultOptions = false,
  isClearable = true,
  ...props
}: SingleSelectProps) => {
  const Comp = isAsync ? CreateableAsyncSelect : isCreatable ? CreatableSelect : Select;

  return (
    <Comp
      className={cn("px-0", props.className)}
      name={name}
      options={options}
      styles={selectStyles(props)}
      value={value}
      isSearchable={isSearchable}
      isClearable={isClearable}
      menuPosition={props.menuPosition}
      menuShouldScrollIntoView={props.menuShouldScrollIntoView}
      placeholder={placeholder}
      onChange={(opt, meta) => {
        handleChange(opt as ReactSelectSingleValue<SelectValueBase>, meta);
      }}
      onBlur={handleBlur}
      onInputChange={props.onInputChange}
      onCreateOption={props.onCreateOption}
      formatOptionLabel={option => (
        <div className="flex items-center gap-2">
          {option.img && (
            <Image
              src={option.img}
              alt={"option-img"}
              style={{ width: "20px", borderRadius: "4px" }}
            />
          )}
          <span>{option.label}</span>
        </div>
      )}
      isMulti={false}
      loadOptions={(inputValue, setOptions) => props.loadOptions?.(inputValue, setOptions)}
      cacheOptions={true}
      defaultOptions={defaultOptions}
    />
  );
};

export { MultiSelect, SingleSelect };
